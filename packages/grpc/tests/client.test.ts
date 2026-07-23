import HermesGrpc from '../src/index.js';

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function testRootGrpcClient() {
  // Test String API key constructor
  const grpc = new HermesGrpc('hm_live_testkey_123456');

  assert(typeof grpc.session === 'object', 'session attached');
  assert(typeof grpc.mail === 'object', 'mail attached');
  assert(typeof grpc.contact === 'object', 'contact attached');
  assert(typeof grpc.feed === 'object', 'feed attached');
  assert(typeof grpc.security === 'object', 'security attached');
  assert(typeof grpc.spam === 'object', 'spam attached');
  assert(typeof grpc.storage === 'object', 'storage attached');
  assert(typeof grpc.sync === 'object', 'sync attached');
  assert(typeof grpc.tier === 'object', 'tier attached');
  assert(typeof grpc.usage === 'object', 'usage attached');
  assert(typeof grpc.whoami === 'function', 'whoami function attached');

  const identity = await grpc.whoami();
  assert(typeof identity === 'object', 'whoami returns identity object');

  console.log('Root HermesGrpc client tests passed!');
}

testRootGrpcClient().catch((err) => {
  console.error('Root gRPC client test error:', err);
  process.exit(1);
});
