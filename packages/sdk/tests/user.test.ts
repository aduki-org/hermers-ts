import { Client, User } from '../src/index.js';

async function testUser() {
  const client = new Client({ key: 'hm_live_test' });
  const user = new User(client);

  if (typeof user.get !== 'function') throw new Error('get missing');
  if (typeof user.info !== 'function') throw new Error('info missing');
  if (typeof user.audits !== 'function') throw new Error('audits missing');
  if (typeof user.keys !== 'function') throw new Error('keys missing');

  console.log('SDK User tests passed!');
}

testUser().catch((err) => {
  console.error(err);
  process.exit(1);
});
