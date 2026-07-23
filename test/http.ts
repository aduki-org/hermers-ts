import Hermes from '@hermers/sdk';

const LIVE_API_KEY = '534f5dba59db47c51c354b3a242ac55f485d32fc9fb5f713c7d17d396739d1fc';

async function runLiveHttpApiTests() {
  console.log('=== Live HTTP API Call Integration Test (@hermers/sdk) ===');
  console.log('Target Base URL: https://hermers.aduki.pro/v1\n');

  // Single root client initialized directly with the provided API key
  const hermes = new Hermes(LIVE_API_KEY);

  // 1. Client Identity / whoami via API Key
  try {
    console.log('1. Fetching identity via whoami()...');
    const identity = await hermes.whoami();
    console.log('-> Identity Context:', JSON.stringify(identity));
  } catch (err: unknown) {
    console.error('-> Whoami Error:', (err as Error).message);
  }

  // 2. User API: Get Profile via API Key
  try {
    console.log('\n2. [GET /user] Fetching User Profile...');
    const profile = await hermes.user.get();
    console.log('-> User Profile:', JSON.stringify(profile));
  } catch (err: unknown) {
    console.error('-> User Profile API Error:', (err as Error).message);
  }

  // 3. Tenant API: Get Tenant Details via API Key
  try {
    console.log('\n3. [GET /tenant] Fetching Tenant Profile...');
    const tenantProfile = await hermes.tenant.get();
    console.log('-> Tenant Profile:', JSON.stringify(tenantProfile));
  } catch (err: unknown) {
    console.error('-> Tenant Profile API Error:', (err as Error).message);
  }

  // 4. Tenant API: Create API Key
  try {
    console.log('\n4. [POST /tenant/keys] Creating API Key...');
    const keyRes = await hermes.tenant.createkey({
      name: 'integration_key',
      scopes: ['mail:read', 'mail:send', 'contacts:read', 'tenant:read'],
    });
    console.log('-> Created Key ID:', keyRes.hex, '| Key:', keyRes.key ? `${keyRes.key.slice(0, 15)}...` : 'none');
  } catch (err: unknown) {
    console.error('-> Create API Key Error:', (err as Error).message);
  }

  // 5. Mail API: List Mailboxes
  try {
    console.log('\n5. [GET /user/mailbox] Listing User Mailboxes...');
    const mailboxes = await hermes.mail.mailboxes();
    console.log('-> Mailboxes Result:', JSON.stringify(mailboxes));
  } catch (err: unknown) {
    console.error('-> Mailbox API Error:', (err as Error).message);
  }

  // 6. Mail API: List Inbox Messages
  try {
    console.log('\n6. [GET /user/mail/inbox] Fetching Inbox Messages...');
    const inbox = await hermes.mail.inbox({ limit: 10 });
    console.log('-> Inbox Result:', JSON.stringify(inbox));
  } catch (err: unknown) {
    console.error('-> Inbox API Error:', (err as Error).message);
  }

  // 7. Contacts API: List Contacts
  try {
    console.log('\n7. [GET /user/contacts] Listing Contacts...');
    const contactList = await hermes.contacts.list({ limit: 10 });
    console.log('-> Contacts Result:', JSON.stringify(contactList));
  } catch (err: unknown) {
    console.error('-> Contacts API Error:', (err as Error).message);
  }

  // 8. Calendars API: List Calendars
  try {
    console.log('\n8. [GET /user/calendars] Listing Calendars...');
    const calendarList = await hermes.calendar.list();
    console.log('-> Calendars Result:', JSON.stringify(calendarList));
  } catch (err: unknown) {
    console.error('-> Calendars API Error:', (err as Error).message);
  }

  // 9. Events API: List Events
  try {
    console.log('\n9. [GET /user/events] Listing Events...');
    const eventList = await hermes.events.list();
    console.log('-> Events Result:', JSON.stringify(eventList));
  } catch (err: unknown) {
    console.error('-> Events API Error:', (err as Error).message);
  }

  // 10. Scheduling API: List Services
  try {
    console.log('\n10. [GET /user/services] Listing Services...');
    const serviceList = await hermes.scheduling.services();
    console.log('-> Services Result:', JSON.stringify(serviceList));
  } catch (err: unknown) {
    console.error('-> Services API Error:', (err as Error).message);
  }

  console.log('\n=== Live HTTP API Call Integration Test Completed ===');
}

runLiveHttpApiTests().catch((err) => {
  console.error('Live HTTP API Test Fatal Error:', err);
});
