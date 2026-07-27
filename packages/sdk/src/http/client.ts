import { BASE_URL, type HermesOptions } from '../config.js';
import { HermesError } from '../errors.js';

export interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | null>;
  idempotency?: string;
  match?: string;
}

/**
 * Cached identity from REST `GET /auth/whoami`
 * (`crates/api/src/handlers/auth/whoami.rs`).
 * gRPC Session/Identity is typed separately in `@hermers/grpc`.
 */
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
  /** Present on wire; currently always `""`. */
  ip?: string;
  /** Present on wire; currently always `""`. */
  agent?: string;
  raw?: unknown;
}

interface WhoamiResponse {
  hex?: string;
  user?: string;
  tenant?: string;
  owner?: boolean;
  scopes?: string[];
  deny?: string[];
  tier?: string;
  ip?: string;
  agent?: string;
}

/**
 * Low-level HTTP client. Auth is API key only: `Authorization: Key <key>`.
 * Calls `GET /auth/whoami` on construction and caches user/tenant for the instance.
 */
export class HttpClient {
  readonly apiBase: string;
  readonly apiKey: string;
  private readonly fetchImpl: typeof globalThis.fetch;
  private identityCache?: Identity;
  private identityPromise: Promise<Identity>;

  constructor(apiKey: string, options: HermesOptions = {}) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new HermesError({
        message: 'API key is required (e.g. hm_live_...)',
        status: 0,
        code: 'invalid_api_key',
      });
    }
    this.apiKey = apiKey;
    this.apiBase = (options.apiBase ?? BASE_URL).replace(/\/$/, '');
    this.fetchImpl = options.fetch ?? globalThis.fetch.bind(globalThis);
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
    } catch (err) {
      // Allow a single retry after a failed eager fetch.
      this.identityPromise = this.fetchWhoami();
      return this.identityPromise;
    }
  }

  async requireTenant(): Promise<string> {
    const id = await this.whoami();
    return id.tenant;
  }

  async requireUser(): Promise<string> {
    const id = await this.whoami();
    return id.user;
  }

  private async fetchWhoami(): Promise<Identity> {
    const profile = await this.getRaw<WhoamiResponse>('/auth/whoami');
    if (!profile.user || !profile.tenant) {
      throw new HermesError({
        message: 'whoami response missing user or tenant',
        status: 0,
        code: 'invalid_identity',
        body: profile,
      });
    }
    const identity: Identity = {
      hex: profile.hex,
      user: profile.user,
      tenant: profile.tenant,
      owner: profile.owner,
      scopes: profile.scopes,
      deny: profile.deny,
      tier: profile.tier,
      ip: profile.ip,
      agent: profile.agent,
      raw: profile,
    };
    this.identityCache = identity;
    return identity;
  }

  /** Internal GET that does not await identity (used by whoami itself). */
  private getRaw<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.requestInternal<T>('GET', path, undefined, options);
  }

  async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    // Ensure identity is warm before resource calls (no-op if already cached).
    await this.whoami();
    return this.requestInternal<T>(method, path, body, options);
  }

  private async requestInternal<T>(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = new URL(
      path.startsWith('http') ? path : `${this.apiBase}${path.startsWith('/') ? path : `/${path}`}`
    );
    if (options.query) {
      for (const [k, v] of Object.entries(options.query)) {
        if (v !== undefined && v !== null) {
          url.searchParams.append(k, String(v));
        }
      }
    }

    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: `Key ${this.apiKey}`,
      ...options.headers,
    };
    if (body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }
    if (options.idempotency) {
      headers['Idempotency-Key'] = options.idempotency;
    }
    if (options.match) {
      headers['If-Match'] = options.match;
    }

    let res: Response;
    try {
      res = await this.fetchImpl(url.toString(), {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (err: unknown) {
      const detail =
        err instanceof Error
          ? err.cause instanceof Error
            ? err.cause.message
            : err.message
          : String(err);
      throw new HermesError({
        message: detail || 'Network request failed',
        status: 0,
        code: 'network_error',
      });
    }

    if (res.status === 204) {
      return {} as T;
    }

    const text = await res.text();
    let parsed: unknown = undefined;
    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }
    }

    if (!res.ok) {
      throw HermesError.fromResponse(res.status, res.statusText, parsed ?? text);
    }

    return (parsed ?? {}) as T;
  }

  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, body, options);
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, body, options);
  }

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }
}
