import { Client, MailService } from '../src/index.js';

async function testMail() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new MailService(client);

  if (typeof service.listMailboxes !== 'function') throw new Error('listMailboxes missing');
  if (typeof service.listMessages !== 'function') throw new Error('listMessages missing');
  if (typeof service.send !== 'function') throw new Error('send missing');

  console.log('gRPC MailService tests passed!');
}

testMail().catch((err) => {
  console.error(err);
  process.exit(1);
});
