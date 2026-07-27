import {
  credentials,
  Metadata,
  status as GrpcStatus,
  type ChannelCredentials,
  type ServiceError,
} from '@grpc/grpc-js';
import { BASE_ENDPOINT, type HermesGrpcOptions } from './config.js';
import { HermesGrpcError } from './errors.js';
import { ContactServiceClient } from './generated/contact.js';
import { FeedServiceClient } from './generated/feeds.js';
import { MailServiceClient } from './generated/mail.js';
import { SecurityServiceClient } from './generated/security.js';
import { SessionServiceClient, type Session } from './generated/session.js';
import { SpamServiceClient } from './generated/spam.js';
import { StorageServiceClient } from './generated/storage.js';
import { SyncServiceClient } from './generated/sync.js';
import { TierServiceClient } from './generated/tier.js';
import { UsageerviceClient } from './generated/usage.js';

/** Cached identity from `SessionService.Whoami`. */
export interface Identity {
  /** Session / JTI hex. */
  hex?: string;
  /** Authenticated user hex. */
  user: string;
  /** Authenticated tenant hex. */
  tenant: string;
  owner?: boolean;
  scopes?: string[];
  deny?: string[];
  tier?: string;
  raw?: Session;
}

function channelCreds(options: HermesGrpcOptions): ChannelCredentials {
  if (options.insecure) {
    return credentials.createInsecure();
  }
  return credentials.createSsl();
}

/**
 * Shared gRPC transport: TLS to production by default, API-key metadata only.
 * Calls `SessionService.Whoami` on construction and caches user/tenant.
 */
export class GrpcTransport {
  readonly endpoint: string;
  readonly apiKey: string;
  readonly metadata: Metadata;

  readonly session: SessionServiceClient;
  readonly contacts: ContactServiceClient;
  readonly mail: MailServiceClient;
  readonly feeds: FeedServiceClient;
  readonly storage: StorageServiceClient;
  readonly sync: SyncServiceClient;
  readonly security: SecurityServiceClient;
  readonly spam: SpamServiceClient;
  readonly tier: TierServiceClient;
  readonly usage: UsageerviceClient;

  private identityCache?: Identity;
  private identityPromise: Promise<Identity>;

  constructor(apiKey: string, options: HermesGrpcOptions = {}) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new HermesGrpcError({
        message: 'API key is required (e.g. hm_live_...)',
        code: 'INVALID_ARGUMENT',
      });
    }
    this.apiKey = apiKey;
    this.endpoint = options.endpoint ?? BASE_ENDPOINT;
    this.metadata = new Metadata();
    this.metadata.set('authorization', `Key ${apiKey}`);

    const creds = channelCreds(options);
    this.session = new SessionServiceClient(this.endpoint, creds);
    this.contacts = new ContactServiceClient(this.endpoint, creds);
    this.mail = new MailServiceClient(this.endpoint, creds);
    this.feeds = new FeedServiceClient(this.endpoint, creds);
    this.storage = new StorageServiceClient(this.endpoint, creds);
    this.sync = new SyncServiceClient(this.endpoint, creds);
    this.security = new SecurityServiceClient(this.endpoint, creds);
    this.spam = new SpamServiceClient(this.endpoint, creds);
    this.tier = new TierServiceClient(this.endpoint, creds);
    this.usage = new UsageerviceClient(this.endpoint, creds);

    // Eager whoami — in-flight while the caller prepares the first resource call.
    this.identityPromise = this.fetchWhoami();
    this.identityPromise.catch(() => {
      // Avoid unhandled rejection; ready()/whoami() surface or retry the error.
    });
  }

  /** Synced snapshot after `ready()` / `whoami()` resolves; otherwise `undefined`. */
  get me(): Identity | undefined {
    return this.identityCache;
  }

  get cachedTenant(): string | undefined {
    return this.identityCache?.tenant;
  }

  get cachedUser(): string | undefined {
    return this.identityCache?.user;
  }

  /** Await until identity is cached (same as `whoami()`). */
  ready(): Promise<Identity> {
    return this.whoami();
  }

  async whoami(): Promise<Identity> {
    if (this.identityCache) return this.identityCache;
    try {
      return await this.identityPromise;
    } catch {
      this.identityPromise = this.fetchWhoami();
      return this.identityPromise;
    }
  }

  private async fetchWhoami(): Promise<Identity> {
    const session = await this.unaryRaw<{ token: string }, Session>(
      this.session.whoami.bind(this.session),
      { token: '' }
    );
    if (!session.user || !session.tenant) {
      throw new HermesGrpcError({
        message: 'whoami response missing user or tenant',
        code: GrpcStatus[GrpcStatus.FAILED_PRECONDITION],
        grpcCode: GrpcStatus.FAILED_PRECONDITION,
      });
    }
    const identity: Identity = {
      hex: session.hex,
      user: session.user,
      tenant: session.tenant,
      owner: session.owner,
      scopes: session.scopes,
      deny: session.deny,
      tier: session.tier,
      raw: session,
    };
    this.identityCache = identity;
    return identity;
  }

  /** Promisify a unary call without awaiting identity (used by whoami). */
  private unaryRaw<Req, Res>(
    invoke: (
      request: Req,
      metadata: Metadata,
      callback: (error: ServiceError | null, response: Res) => void
    ) => unknown,
    request: Req
  ): Promise<Res> {
    return new Promise<Res>((resolve, reject) => {
      invoke(request, this.metadata, (err, res) => {
        if (err) {
          reject(HermesGrpcError.fromServiceError(err));
          return;
        }
        resolve(res as Res);
      });
    });
  }

  /** Promisify a unary gRPC client method; ensures identity is cached first. */
  async unary<Req, Res>(
    invoke: (
      request: Req,
      metadata: Metadata,
      callback: (error: ServiceError | null, response: Res) => void
    ) => unknown,
    request: Req
  ): Promise<Res> {
    await this.whoami();
    return this.unaryRaw(invoke, request);
  }

  /** Tenant hex from whoami cache (never passed by callers). */
  async requireTenant(): Promise<string> {
    const id = await this.whoami();
    return id.tenant;
  }

  /** User hex from whoami cache (never passed by callers). */
  async requireUser(): Promise<string> {
    const id = await this.whoami();
    return id.user;
  }

  close(): void {
    this.session.close();
    this.contacts.close();
    this.mail.close();
    this.feeds.close();
    this.storage.close();
    this.sync.close();
    this.security.close();
    this.spam.close();
    this.tier.close();
    this.usage.close();
  }
}
