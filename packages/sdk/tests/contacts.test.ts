import { Client, Contacts } from '../src/index.js';

async function testContacts() {
  const client = new Client({ key: 'hm_live_test' });
  const contacts = new Contacts(client);

  if (typeof contacts.create !== 'function') throw new Error('create missing');
  if (typeof contacts.list !== 'function') throw new Error('list missing');
  if (typeof contacts.search !== 'function') throw new Error('search missing');

  console.log('SDK Contacts tests passed!');
}

testContacts().catch((err) => {
  console.error(err);
  process.exit(1);
});
