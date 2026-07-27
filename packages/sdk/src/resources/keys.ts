import { generateKey, hashKey, prefixKey } from '../crypto.js';
import type { HttpClient } from '../http/client.js';
import type { ApiKey, ListQuery, Page } from '../types/index.js';

/** API keys — list (user/tenant) and create (tenant admin). No login flows. */
export class KeysResource {
  constructor(private readonly http: HttpClient) {}

  /** List keys for the authenticated user. */
  list(query?: ListQuery): Promise<Page<ApiKey>> {
    return this.http.get<Page<ApiKey>>('/user/keys', { query });
  }

  /** List tenant keys (requires `keys:read`). */
  listTenant(query?: ListQuery): Promise<Page<ApiKey>> {
    return this.http.get<Page<ApiKey>>('/tenant/keys', { query });
  }

  listActive(): Promise<Page<ApiKey>> {
    return this.http.get<Page<ApiKey>>('/tenant/keys/active');
  }

  retrieve(hex: string): Promise<ApiKey> {
    return this.http.get<ApiKey>(`/tenant/keys/${hex}`);
  }

  /**
   * Create a new API key. Generates a raw `hm_live_…` secret client-side,
   * sends only SHA-256 hash + prefix to the server, and returns the raw key once.
   */
  async create(data: {
    name: string;
    scopes: string[];
    key?: string;
    meta?: Record<string, unknown>;
    expires?: string;
  }): Promise<{ hex: string; key: string }> {
    const rawKey = data.key ?? generateKey();
    const res = await this.http.post<{ hex: string }>('/tenant/keys', {
      name: data.name,
      hash: hashKey(rawKey),
      prefix: prefixKey(rawKey),
      scopes: data.scopes,
      meta: data.meta,
      expires: data.expires,
    });
    return { hex: res.hex, key: rawKey };
  }

  updateName(hex: string, name: string): Promise<null> {
    return this.http.patch<null>(`/tenant/keys/${hex}/name`, { name });
  }

  updateScopes(hex: string, scopes: string[]): Promise<null> {
    return this.http.patch<null>(`/tenant/keys/${hex}/scopes`, { scopes });
  }

  del(hex: string): Promise<null> {
    return this.http.delete<null>(`/tenant/keys/${hex}`);
  }
}
