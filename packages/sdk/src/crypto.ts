import { createHash, randomBytes } from 'node:crypto';

/** Generate a raw API key: `hm_live_` + 64 hex chars. */
export function generateKey(): string {
  return `hm_live_${randomBytes(32).toString('hex')}`;
}

/** SHA-256 hex digest of the raw key (what the server stores). */
export function hashKey(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex');
}

/** First 16 characters of the raw key (server-side index only). */
export function prefixKey(rawKey: string): string {
  return rawKey.slice(0, 16);
}
