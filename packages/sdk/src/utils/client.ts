import type { ApiError, ClientOptions, RequestOptions } from '../types/index.js';

export type { ClientOptions, RequestOptions };

export const BASE_URL = 'https://hermers.aduki.pro/v1';

export interface Identity {
  user?: string;
  tenant?: string;
  email?: string;
  name?: string;
  owner?: boolean;
  raw?: unknown;
}

export class Client {
  private baseUrl: string = BASE_URL;
  private key?: string;
  private token?: string;
  private identityCache?: Identity;
  private whoamiPromise?: Promise<Identity>;

  constructor(options: string | ClientOptions = {}) {
    if (typeof options === 'string') {
      this.key = options;
    } else {
      this.key = options.key;
      this.token = options.token;
    }

    if (this.key || this.token) {
      this.whoamiPromise = this.whoami();
    }
  }

  get cachedTenant(): string | undefined {
    return this.identityCache?.tenant;
  }

  get cachedUser(): string | undefined {
    return this.identityCache?.user;
  }

  async whoami(): Promise<Identity> {
    if (this.identityCache) {
      return this.identityCache;
    }
    if (this.whoamiPromise) {
      try {
        const cached = await this.whoamiPromise;
        if (cached && (cached.tenant || cached.user)) {
          return cached;
        }
      } catch {
        // Fall through to retry fetch
      }
    }

    this.whoamiPromise = (async () => {
      try {
        const profile = await this.get<{ hex?: string; email?: string; name?: string; tenant?: string }>('/user');
        let tenantHex = profile.tenant;
        if (!tenantHex) {
          try {
            const tenantProfile = await this.get<{ hex?: string }>('/tenant');
            tenantHex = tenantProfile.hex;
          } catch {
            // tenant lookup optional
          }
        }
        this.identityCache = {
          user: profile.hex,
          tenant: tenantHex,
          email: profile.email,
          name: profile.name,
          raw: profile,
        };
        return this.identityCache;
      } catch {
        return {};
      }
    })();

    return this.whoamiPromise;
  }

  setKey(key: string): void {
    this.key = key;
    this.identityCache = undefined;
    this.whoamiPromise = this.whoami();
  }

  setToken(token: string): void {
    this.token = token;
    this.identityCache = undefined;
    this.whoamiPromise = this.whoami();
  }

  async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = new URL(path.startsWith('http') ? path : `${this.baseUrl}${path}`);
    if (options.query) {
      for (const [k, v] of Object.entries(options.query)) {
        if (v !== undefined) {
          url.searchParams.append(k, String(v));
        }
      }
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.key) {
      headers['Authorization'] = `Key ${this.key}`;
    } else if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (options.idempotency) {
      headers['Idempotency-Key'] = options.idempotency;
    }
    if (options.match) {
      headers['If-Match'] = options.match;
    }

    let res: Response;
    try {
      res = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (err: unknown) {
      let detail = 'Request failed';
      if (err instanceof Error) {
        if (err.cause instanceof Error) {
          detail = err.cause.message;
        } else if (err.cause) {
          detail = String(err.cause);
        } else {
          detail = err.message;
        }
      } else if (typeof err === 'string') {
        detail = err;
      }
      throw new Error(detail);
    }

    if (!res.ok) {
      const text = await res.text();
      let msg = text;
      try {
        const parsed = JSON.parse(text) as ApiError;
        if (parsed.error?.message) {
          msg = parsed.error.message;
        }
      } catch {
        // use raw text or status message fallback
      }
      throw new Error(msg || `Request failed with status ${res.status} ${res.statusText}`);
    }

    if (res.status === 204) {
      return {} as T;
    }

    const text = await res.text();
    if (!text) {
      return {} as T;
    }
    return JSON.parse(text) as T;
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

  remove<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }
}
