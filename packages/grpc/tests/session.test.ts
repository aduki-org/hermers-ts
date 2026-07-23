import { Client, SessionService } from '../src/index.js';

async function testSession() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new SessionService(client);

  if (typeof service.login !== 'function') throw new Error('login missing');
  if (typeof service.issue !== 'function') throw new Error('issue missing');
  if (typeof service.refresh !== 'function') throw new Error('refresh missing');
  if (typeof service.revoke !== 'function') throw new Error('revoke missing');

  console.log('gRPC SessionService tests passed!');
}

testSession().catch((err) => {
  console.error(err);
  process.exit(1);
});
