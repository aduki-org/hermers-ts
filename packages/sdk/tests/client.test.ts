import Hermes from '../src/index.js';

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function testRootClient() {
  // Test String API key constructor
  const hermes = new Hermes('hm_live_testkey_123456');

  assert(typeof hermes.auth === 'object', 'auth attached');
  assert(typeof hermes.tenant === 'object', 'tenant attached');
  assert(typeof hermes.user === 'object', 'user attached');
  assert(typeof hermes.mail === 'object', 'mail attached');
  assert(typeof hermes.contacts === 'object', 'contacts attached');
  assert(typeof hermes.calendar === 'object', 'calendar attached');
  assert(typeof hermes.events === 'object', 'events attached');
  assert(typeof hermes.feeds === 'object', 'feeds attached');
  assert(typeof hermes.scheduling === 'object', 'scheduling attached');
  assert(typeof hermes.whoami === 'function', 'whoami function attached');

  const identity = await hermes.whoami();
  assert(typeof identity === 'object', 'whoami returns identity object');

  console.log('Root Hermes client tests passed!');
}

testRootClient().catch((err) => {
  console.error('Root client test error:', err);
  process.exit(1);
});
