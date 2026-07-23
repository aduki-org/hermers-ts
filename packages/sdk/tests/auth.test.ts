import { Auth, Client } from '../src/index.js';

async function testAuth() {
  const client = new Client();
  const auth = new Auth(client);

  if (typeof auth.login !== 'function') throw new Error('login missing');
  if (typeof auth.refresh !== 'function') throw new Error('refresh missing');
  if (typeof auth.logout !== 'function') throw new Error('logout missing');
  if (typeof auth.sessions !== 'function') throw new Error('sessions missing');

  console.log('SDK Auth tests passed!');
}

testAuth().catch((err) => {
  console.error(err);
  process.exit(1);
});
