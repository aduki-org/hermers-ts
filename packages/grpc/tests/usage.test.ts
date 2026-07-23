import { Client, UsageService, window as validateWindow } from '../src/index.js';

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function testUsage() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new UsageService(client);

  assert(typeof service.incr === 'function', 'incr method exists');
  assert(typeof service.check === 'function', 'check method exists');
  assert(typeof service.get === 'function', 'get method exists');
  assert(typeof service.reset === 'function', 'reset method exists');

  // Test date window validator
  assert(validateWindow('2026-04-28') === '2026-04-28', 'valid YYYY-MM-DD');
  assert(validateWindow('2026-04') === '2026-04', 'valid YYYY-MM');

  try {
    validateWindow('invalid-date');
    assert(false, 'should reject invalid window date');
  } catch (err: unknown) {
    assert((err as Error).message.includes('Invalid date window'), 'window validation catch');
  }

  // Test tenant hex validation on incr
  try {
    await service.incr({ tenant: '', metric: 'sends' });
    assert(false, 'should reject empty tenant');
  } catch (err: unknown) {
    assert((err as Error).message.includes('tenant'), 'tenant validation catch');
  }

  console.log('gRPC UsageService tests passed!');
}

testUsage().catch((err) => {
  console.error('Usage test error:', err);
  process.exit(1);
});
