import { generateKey, hashKey, prefixKey } from '../src/utils/crypto.js';

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function testCrypto() {
  const rawKey = generateKey();
  assert(rawKey.startsWith('hm_live_'), 'rawKey starts with hm_live_');
  assert(rawKey.length === 72, 'rawKey length is 72 (hm_live_ + 64 hex chars)');

  const hash = hashKey(rawKey);
  assert(hash.length === 64, 'hash is 64-char SHA-256 hex string');
  assert(/^[0-9a-f]{64}$/.test(hash), 'hash is valid hex');

  const prefix = prefixKey(rawKey);
  assert(prefix.length === 16, 'prefix is first 16 chars');
  assert(prefix === rawKey.slice(0, 16), 'prefix matches rawKey slice');

  console.log('SDK crypto unit tests passed!');
}

testCrypto().catch((err) => {
  console.error('Crypto test failure:', err);
  process.exit(1);
});
