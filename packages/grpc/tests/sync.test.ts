import { Client, SyncService } from '../src/index.js';

async function testSync() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new SyncService(client);

  if (typeof service.contacts !== 'function') throw new Error('contacts missing');
  if (typeof service.mailboxes !== 'function') throw new Error('mailboxes missing');

  console.log('gRPC SyncService tests passed!');
}

testSync().catch((err) => {
  console.error(err);
  process.exit(1);
});
