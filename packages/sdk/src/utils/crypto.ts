import { createHash, randomBytes } from 'node:crypto';

/**
 * Generate a random 32-byte raw API key formatted as hm_live_<hex>
 */
export function generateKey(): string {
  const bytes = randomBytes(32).toString('hex');
  return `hm_live_${bytes}`;
}

/**
 * Compute SHA-256 hex digest of raw key
 */
export function hashKey(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex');
}

/**
 * Extract first 16 characters of raw key as prefix index
 */
export function prefixKey(rawKey: string): string {
  return rawKey.slice(0, 16);
}
