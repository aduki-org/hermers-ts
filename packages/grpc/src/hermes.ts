import { type HermesGrpcOptions } from './config.js';
import { ContactsResource } from './resources/contacts.js';
import { FeedsResource } from './resources/feeds.js';
import { MailResource } from './resources/mail.js';
import { SecurityResource } from './resources/security.js';
import { SessionResource } from './resources/session.js';
import { SpamResource } from './resources/spam.js';
import { StorageResource } from './resources/storage.js';
import { SyncResource } from './resources/sync.js';
import { TierResource } from './resources/tier.js';
import { UsageResource } from './resources/usage.js';
import { GrpcTransport, type Identity } from './transport.js';

/**
 * Hermes native gRPC client (Stripe/Square style).
 *
 * Default endpoint: `grpc.aduki.pro:443` (TLS).
 * On construction, starts `SessionService.Whoami` and caches user/tenant.
 * Resource methods never require tenant/user hex arguments.
 *
 * @example
 * ```ts
 * import { HermesGrpc } from '@hermers/grpc';
 * const client = new HermesGrpc('hm_live_...');
 * await client.ready();
 * const { items } = await client.contacts.list();
 * ```
 */
export class HermesGrpc {
  readonly transport: GrpcTransport;
  readonly contacts: ContactsResource;
  readonly mail: MailResource;
  readonly feeds: FeedsResource;
  readonly storage: StorageResource;
  readonly sync: SyncResource;
  readonly security: SecurityResource;
  readonly spam: SpamResource;
  readonly tier: TierResource;
  readonly usage: UsageResource;
  readonly session: SessionResource;

  constructor(apiKey: string, options: HermesGrpcOptions = {}) {
    this.transport = new GrpcTransport(apiKey, options);
    this.contacts = new ContactsResource(this.transport);
    this.mail = new MailResource(this.transport);
    this.feeds = new FeedsResource(this.transport);
    this.storage = new StorageResource(this.transport);
    this.sync = new SyncResource(this.transport);
    this.security = new SecurityResource(this.transport);
    this.spam = new SpamResource(this.transport);
    this.tier = new TierResource(this.transport);
    this.usage = new UsageResource(this.transport);
    this.session = new SessionResource(this.transport);
  }

  /** Cached identity after whoami resolves; `undefined` until then. */
  get me(): Identity | undefined {
    return this.transport.me;
  }

  /** Await until `SessionService.Whoami` has populated the identity cache. */
  ready(): Promise<Identity> {
    return this.transport.ready();
  }

  whoami(): Promise<Identity> {
    return this.transport.whoami();
  }

  close(): void {
    this.transport.close();
  }
}

export default HermesGrpc;
