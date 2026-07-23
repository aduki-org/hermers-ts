import { Client, Tenant } from '../src/index.js';

async function testTenant() {
  const client = new Client({ key: 'hm_live_test' });
  const tenant = new Tenant(client);

  if (typeof tenant.get !== 'function') throw new Error('get missing');
  if (typeof tenant.members !== 'function') throw new Error('members missing');
  if (typeof tenant.domains !== 'function') throw new Error('domains missing');
  if (typeof tenant.quotas !== 'function') throw new Error('quotas missing');
  if (typeof tenant.rules !== 'function') throw new Error('rules missing');
  if (typeof tenant.webhooks !== 'function') throw new Error('webhooks missing');

  console.log('SDK Tenant tests passed!');
}

testTenant().catch((err) => {
  console.error(err);
  process.exit(1);
});
