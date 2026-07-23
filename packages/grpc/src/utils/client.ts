export const BASE_ENDPOINT = 'http://hermers.aduki.pro:8444';

export interface ClientOptions {
  endpoint?: string;
  key?: string;
  token?: string;
}

export interface Identity {
  user?: string;
  tenant?: string;
  email?: string;
  name?: string;
  owner?: boolean;
  raw?: unknown;
}

export class Client {
  private endpoint: string;
  private key?: string;
  private token?: string;
  private identityCache?: Identity;
  private whoamiPromise?: Promise<Identity>;

  constructor(options: string | ClientOptions = {}) {
    if (typeof options === 'string') {
      this.endpoint = BASE_ENDPOINT;
      this.key = options;
    } else {
      this.endpoint = options.endpoint ?? BASE_ENDPOINT;
      this.key = options.key;
      this.token = options.token;
    }

    if (this.key || this.token) {
      // Trigger eager whoami identity fetch upon construction
      this.whoamiPromise = this.whoami();
    }
  }

  get cachedTenant(): string | undefined {
    return this.identityCache?.tenant;
  }

  get cachedUser(): string | undefined {
    return this.identityCache?.user;
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

  async whoami(): Promise<Identity> {
    if (this.identityCache) {
      return this.identityCache;
    }
    if (this.whoamiPromise && this.whoamiPromise !== Promise.resolve(this.identityCache!)) {
      try {
        const cached = await this.whoamiPromise;
        if (cached && (cached.tenant || cached.user)) {
          return cached;
        }
      } catch {
        // Fall through to retry fetch below
      }
    }

    this.whoamiPromise = (async () => {
      try {
        const res = await this.call<Record<string, never>, any>('hermes.session', 'SessionService', 'Whoami', {});
        const tenantHex =
          typeof res?.tenant === 'string'
            ? res.tenant
            : res?.tenant?.hex ?? res?.session?.tenant ?? res?.session?.tenant?.hex;
        const userHex =
          typeof res?.user === 'string'
            ? res.user
            : res?.user?.hex ?? res?.session?.user ?? res?.session?.user?.hex ?? res?.hex;

        const identity: Identity = {
          tenant: tenantHex,
          user: userHex,
          email: res?.email ?? res?.session?.email,
          name: res?.name ?? res?.session?.name,
          owner: res?.owner ?? res?.session?.owner,
          raw: res,
        };
        this.identityCache = identity;
        return identity;
      } catch {
        return {};
      }
    })();

    return this.whoamiPromise;
  }

  async resolveTenant(tenant?: string): Promise<string | undefined> {
    if (tenant) return tenant;
    const id = await this.whoami();
    return id.tenant;
  }

  async resolveUser(user?: string): Promise<string | undefined> {
    if (user) return user;
    const id = await this.whoami();
    return id.user;
  }

  async call<Req, Resp>(pkg: string, service: string, method: string, payload: Req): Promise<Resp> {
    const path = `/${pkg}.${service}/${method}`;
    const url = new URL(path, this.endpoint);

    const headers: Record<string, string> = {
      'Content-Type': 'application/grpc-web+json',
      'X-Grpc-Web': '1',
    };

    if (this.key) {
      headers['authorization'] = `Key ${this.key}`;
    } else if (this.token) {
      headers['authorization'] = `Bearer ${this.token}`;
    }

    try {
      const res = await fetch(url.toString(), {
        method: 'POST',
        headers,
        body: JSON.stringify(payload ?? {}),
      });

      if (!res.ok) {
        throw new Error(`gRPC call failed with status ${res.status}: ${res.statusText}`);
      }

      const text = await res.text();
      if (!text) {
        return {} as Resp;
      }
      return JSON.parse(text) as Resp;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error(`gRPC transport error on ${path}`);
    }
  }
}
