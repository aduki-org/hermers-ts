import { Auth, Calendar, Client, Contacts, Events, Feeds, Mail, Scheduling, Tenant, User } from '../src/index.js';

async function testSdk() {
  const client = new Client({ key: 'hm_live_testkey' });

  const auth = new Auth(client);
  const tenant = new Tenant(client);
  const user = new User(client);
  const mail = new Mail(client);
  const contacts = new Contacts(client);
  const calendar = new Calendar(client);
  const events = new Events(client);
  const feeds = new Feeds(client);
  const scheduling = new Scheduling(client);

  console.log('SDK initialized successfully with all services:');
  console.log('- Auth:', typeof auth.login);
  console.log('- Tenant:', typeof tenant.get);
  console.log('- User:', typeof user.get);
  console.log('- Mail:', typeof mail.inbox);
  console.log('- Contacts:', typeof contacts.list);
  console.log('- Calendar:', typeof calendar.list);
  console.log('- Events:', typeof events.list);
  console.log('- Feeds:', typeof feeds.list);
  console.log('- Scheduling:', typeof scheduling.services);
}

testSdk().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
