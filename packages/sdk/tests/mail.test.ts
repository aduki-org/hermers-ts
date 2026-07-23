import { Client, Mail } from '../src/index.js';

async function testMail() {
  const client = new Client({ key: 'hm_live_test' });
  const mail = new Mail(client);

  if (typeof mail.send !== 'function') throw new Error('send missing');
  if (typeof mail.inbox !== 'function') throw new Error('inbox missing');
  if (typeof mail.sent !== 'function') throw new Error('sent missing');
  if (typeof mail.threads !== 'function') throw new Error('threads missing');

  console.log('SDK Mail tests passed!');
}

testMail().catch((err) => {
  console.error(err);
  process.exit(1);
});
