import { Client, SecurityService } from '../src/index.js';

async function testSecurity() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new SecurityService(client);

  if (typeof service.status !== 'function') throw new Error('status missing');

  console.log('gRPC SecurityService tests passed!');
}

testSecurity().catch((err) => {
  console.error(err);
  process.exit(1);
});
