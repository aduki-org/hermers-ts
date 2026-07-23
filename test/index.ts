import { Auth, Calendar, Client as HttpClient, Contacts, Events, Mail, Scheduling, Tenant, User } from '@hermers/sdk';
import { Client as GrpcClient, ContactService, MailService, SessionService } from '@hermers/grpc';

async function main() {
  console.log('--- Testing HTTP SDK Client (@hermers/sdk) ---');

  const httpClient = new HttpClient();
  const auth = new Auth(httpClient);

  let token: string | undefined;

  try {
    console.log('Attempting login to https://hermers.aduki.pro/v1...');
    const authRes = await auth.login({
      email: 'femar@aduki.pro',
      password: 'Femar!234',
    });
    token = authRes.token;
    console.log('HTTP Login Success! Token:', token ? token.substring(0, 20) + '...' : 'none');
  } catch (err: unknown) {
    console.error('HTTP Login Error Details:');
    if (err instanceof Error) {
      console.error('Message:', err.message);
      if (err.cause) {
        console.error('Cause:', err.cause);
      }
      if (err.stack) {
        console.error('Stack:', err.stack);
      }
    } else {
      console.error(err);
    }
  }

  const tenant = new Tenant(httpClient);
  const user = new User(httpClient);
  const mail = new Mail(httpClient);
  const contacts = new Contacts(httpClient);
  const calendar = new Calendar(httpClient);
  const events = new Events(httpClient);
  const scheduling = new Scheduling(httpClient);

  console.log('HTTP Services Instantiated:');
  console.log('- Auth:', typeof auth.login);
  console.log('- Tenant:', typeof tenant.get);
  console.log('- User:', typeof user.get);
  console.log('- Mail:', typeof mail.inbox);
  console.log('- Contacts:', typeof contacts.list);
  console.log('- Calendar:', typeof calendar.list);
  console.log('- Events:', typeof events.list);
  console.log('- Scheduling:', typeof scheduling.services);

  console.log('\n--- Testing gRPC Client (@hermers/grpc) ---');
  const grpcClient = new GrpcClient({ token });
  const sessionService = new SessionService(grpcClient);
  const mailService = new MailService(grpcClient);
  const contactService = new ContactService(grpcClient);

  console.log('gRPC Services Instantiated:');
  console.log('- SessionService:', typeof sessionService.login);
  console.log('- MailService:', typeof mailService.listMailboxes);
  console.log('- ContactService:', typeof contactService.list);
}

main().catch((err) => {
  console.error('Integration test failure:', err);
});
