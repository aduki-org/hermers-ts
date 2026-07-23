import { Auth, Calendar, Client, Contacts, Events, Feeds, Mail, Scheduling, Tenant, User } from '@hermers/sdk';

async function listAllHttpApiCommands() {
  console.log('=== All Available HTTP SDK Services & Methods (No Token Required) ===\n');

  // Initialize client with API key or without token
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

  const services = [
    { name: 'Auth', instance: auth },
    { name: 'Tenant', instance: tenant },
    { name: 'User', instance: user },
    { name: 'Mail', instance: mail },
    { name: 'Contacts', instance: contacts },
    { name: 'Calendar', instance: calendar },
    { name: 'Events', instance: events },
    { name: 'Feeds', instance: feeds },
    { name: 'Scheduling', instance: scheduling },
  ];

  for (const { name, instance } of services) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
      .filter((m) => m !== 'constructor' && typeof (instance as Record<string, unknown>)[m] === 'function');

    console.log(`Service: ${name} (${methods.length} methods)`);
    for (const m of methods) {
      console.log(`  - ${name.toLowerCase()}.${m}()`);
    }
    console.log('');
  }

  console.log('=== Summary: All 9 HTTP Service Modules & Commands Ready ===');
}

listAllHttpApiCommands().catch((err) => {
  console.error('Error listing API commands:', err);
});
