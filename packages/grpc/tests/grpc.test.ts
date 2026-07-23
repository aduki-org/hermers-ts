import {
  Client,
  ContactService,
  FeedService,
  MailService,
  SecurityService,
  SessionService,
  SpamService,
  StorageService,
  SyncService,
  TierService,
} from '../src/index.js';

async function testGrpc() {
  const client = new Client({ key: 'hm_live_testkey' });

  const session = new SessionService(client);
  const mail = new MailService(client);
  const contact = new ContactService(client);
  const feed = new FeedService(client);
  const security = new SecurityService(client);
  const spam = new SpamService(client);
  const storage = new StorageService(client);
  const sync = new SyncService(client);
  const tier = new TierService(client);

  console.log('gRPC client initialized successfully with all services:');
  console.log('- SessionService:', typeof session.login);
  console.log('- MailService:', typeof mail.listMailboxes);
  console.log('- ContactService:', typeof contact.list);
  console.log('- FeedService:', typeof feed.list);
  console.log('- SecurityService:', typeof security.status);
  console.log('- SpamService:', typeof spam.classify);
  console.log('- StorageService:', typeof storage.put);
  console.log('- SyncService:', typeof sync.contacts);
  console.log('- TierService:', typeof tier.resolve);
}

testGrpc().catch((err) => {
  console.error('gRPC test error:', err);
  process.exit(1);
});
