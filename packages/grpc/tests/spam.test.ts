import { Client, SpamService } from '../src/index.js';

async function testSpam() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new SpamService(client);

  if (typeof service.classify !== 'function') throw new Error('classify missing');
  if (typeof service.report !== 'function') throw new Error('report missing');

  console.log('gRPC SpamService tests passed!');
}

testSpam().catch((err) => {
  console.error(err);
  process.exit(1);
});
