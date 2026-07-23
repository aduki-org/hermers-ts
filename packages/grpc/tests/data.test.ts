import { bytes, email, hex, limit, timestamp } from '../src/data/index.js';

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function testGrpcData() {
  const ts = timestamp('2026-04-28T14:00:00Z', 'time');
  assert(ts === '2026-04-28T14:00:00.000Z', 'timestamp formatting');

  const h = hex('msg_123', 'id');
  assert(h === 'msg_123', 'hex parsing');

  const e = email('TEST@DOMAIN.COM', 'user');
  assert(e === 'test@domain.com', 'email lowercasing');

  const b = bytes('hello', 'raw');
  assert(b instanceof Uint8Array && b.length === 5, 'bytes encoding');

  const l = limit(100);
  assert(l === 100, 'limit validation');

  console.log('gRPC data validation tests passed!');
}

testGrpcData().catch((err) => {
  console.error(err);
  process.exit(1);
});
