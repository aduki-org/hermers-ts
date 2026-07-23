import { Client, StorageService } from '../src/index.js';

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function testStorage() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new StorageService(client);

  assert(typeof service.put === 'function', 'put method exists');
  assert(typeof service.get === 'function', 'get method exists');
  assert(typeof service.remove === 'function', 'remove method exists');

  // Test data validation on put
  try {
    await service.put({ tenant: '', key: 'test.txt', data: 'hello' });
    assert(false, 'should reject empty tenant');
  } catch (err: unknown) {
    assert((err as Error).message.includes('tenant'), 'tenant validation catch');
  }

  // Test hex validation on get
  try {
    await service.get('');
    assert(false, 'should reject empty hex');
  } catch (err: unknown) {
    assert((err as Error).message.includes('hex'), 'hex validation catch');
  }

  console.log('gRPC StorageService tests passed!');
}

testStorage().catch((err) => {
  console.error('Storage test error:', err);
  process.exit(1);
});
