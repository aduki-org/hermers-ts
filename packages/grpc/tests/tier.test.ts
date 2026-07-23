import { Client, TierService } from '../src/index.js';

async function testTier() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new TierService(client);

  if (typeof service.resolve !== 'function') throw new Error('resolve missing');
  if (typeof service.change !== 'function') throw new Error('change missing');

  console.log('gRPC TierService tests passed!');
}

testTier().catch((err) => {
  console.error(err);
  process.exit(1);
});
