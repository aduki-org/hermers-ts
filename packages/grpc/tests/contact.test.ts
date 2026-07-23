import { Client, ContactService } from '../src/index.js';

async function testContact() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new ContactService(client);

  if (typeof service.list !== 'function') throw new Error('list missing');
  if (typeof service.create !== 'function') throw new Error('create missing');
  if (typeof service.sync !== 'function') throw new Error('sync missing');

  console.log('gRPC ContactService tests passed!');
}

testContact().catch((err) => {
  console.error(err);
  process.exit(1);
});
