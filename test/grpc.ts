import HermesGrpc from '@hermers/grpc';

const LIVE_API_KEY = '534f5dba59db47c51c354b3a242ac55f485d32fc9fb5f713c7d17d396739d1fc';

async function runLiveGrpcApiTests() {
  console.log('=== Live gRPC API Call Integration Test (@hermers/grpc) ===');
  console.log('Target Endpoint: http://hermers.aduki.pro:8444\n');

  // Single root gRPC client initialized directly with the provided API key
  const grpc = new HermesGrpc(LIVE_API_KEY);

  // 1. Fetch identity / whoami via API Key
  try {
    console.log('1. Fetching gRPC whoami() identity via API Key...');
    const id = await grpc.whoami();
    console.log('-> Identity Context:', JSON.stringify(id));
  } catch (err: unknown) {
    console.error('-> Whoami Error:', (err as Error).message);
  }

  // 2. Live gRPC Call: Session list
  try {
    console.log('\n2. [rpc ListSessions] Listing User Sessions...');
    const sessions = await grpc.session.list({ user: 'U0X123456789', page: 1, limit: 10 });
    console.log('-> Sessions Result:', JSON.stringify(sessions));
  } catch (err: unknown) {
    console.error('-> Session List API Error:', (err as Error).message);
  }

  // 3. Live gRPC Call: Mail listMailboxes
  try {
    console.log('\n3. [rpc ListMailboxes] Listing Mailboxes...');
    const mailboxes = await grpc.mail.listMailboxes();
    console.log('-> Mailboxes Result:', JSON.stringify(mailboxes));
  } catch (err: unknown) {
    console.error('-> Mailbox List API Error:', (err as Error).message);
  }

  // 4. Live gRPC Call: Mail listMessages
  try {
    console.log('\n4. [rpc ListMessages] Listing Messages...');
    const messages = await grpc.mail.listMessages({ mailbox: 'mbx_inbox', limit: 10 });
    console.log('-> Messages Result:', JSON.stringify(messages));
  } catch (err: unknown) {
    console.error('-> Message List API Error:', (err as Error).message);
  }

  // 5. Live gRPC Call: Contact list
  try {
    console.log('\n5. [rpc ListContacts] Listing Contacts...');
    const contactList = await grpc.contact.list();
    console.log('-> Contacts Result:', JSON.stringify(contactList));
  } catch (err: unknown) {
    console.error('-> Contact List API Error:', (err as Error).message);
  }

  // 6. Live gRPC Call: Feed list
  try {
    console.log('\n6. [rpc ListFeeds] Listing Feeds...');
    const feedList = await grpc.feed.list();
    console.log('-> Feed List Result:', JSON.stringify(feedList));
  } catch (err: unknown) {
    console.error('-> Feed List API Error:', (err as Error).message);
  }

  // 7. Live gRPC Call: Security status
  try {
    console.log('\n7. [rpc SecurityStatus] Fetching Security Status...');
    const secStatus = await grpc.security.status();
    console.log('-> Security Status Result:', JSON.stringify(secStatus));
  } catch (err: unknown) {
    console.error('-> Security Status API Error:', (err as Error).message);
  }

  // 8. Live gRPC Call: Spam classify
  try {
    console.log('\n8. [rpc ClassifySpam] Classifying Message Content...');
    const spamRes = await grpc.spam.classify({ text: 'Hello, this is a test email message body' });
    console.log('-> Spam Classify Result:', JSON.stringify(spamRes));
  } catch (err: unknown) {
    console.error('-> Spam Classify API Error:', (err as Error).message);
  }

  // 9. Live gRPC Call: Storage put
  try {
    console.log('\n9. [rpc StoragePut] Uploading Storage Blob...');
    const storageRes = await grpc.storage.put({
      key: 'test_upload.txt',
      data: new TextEncoder().encode('Live gRPC storage upload test payload'),
    });
    console.log('-> Storage Put Result:', JSON.stringify(storageRes));
  } catch (err: unknown) {
    console.error('-> Storage Put API Error:', (err as Error).message);
  }

  // 10. Live gRPC Call: Tier resolve
  try {
    console.log('\n10. [rpc ResolveTier] Resolving Tenant Tier...');
    const tierInfo = await grpc.tier.resolve('T0X123456789');
    console.log('-> Tier Info Result:', JSON.stringify(tierInfo));
  } catch (err: unknown) {
    console.error('-> Tier Resolve API Error:', (err as Error).message);
  }

  // 11. Live gRPC Call: Usage incr
  try {
    console.log('\n11. [rpc UsageIncrement] Incrementing Metric...');
    const usageRes = await grpc.usage.incr({ metric: 'sends', by: 1 });
    console.log('-> Usage Incr Result:', JSON.stringify(usageRes));
  } catch (err: unknown) {
    console.error('-> Usage Incr API Error:', (err as Error).message);
  }

  console.log('\n=== Live gRPC API Call Integration Test Completed ===');
}

runLiveGrpcApiTests().catch((err) => {
  console.error('Live gRPC API Test Fatal Error:', err);
});
