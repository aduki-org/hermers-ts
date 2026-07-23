import { Client, ClientOptions, Identity } from './utils/client.js';
import { Auth } from './services/auth.js';
import { Tenant } from './services/tenant.js';
import { User } from './services/user.js';
import { Mail } from './services/mail.js';
import { Contacts } from './services/contacts.js';
import { Calendar } from './services/calendar.js';
import { Events } from './services/events.js';
import { Feeds } from './services/feeds.js';
import { Scheduling } from './services/scheduling.js';

export class Hermes {
  public readonly client: Client;
  public readonly auth: Auth;
  public readonly tenant: Tenant;
  public readonly user: User;
  public readonly mail: Mail;
  public readonly contacts: Contacts;
  public readonly calendar: Calendar;
  public readonly events: Events;
  public readonly feeds: Feeds;
  public readonly scheduling: Scheduling;

  constructor(options?: string | ClientOptions) {
    this.client = new Client(options);
    this.auth = new Auth(this.client);
    this.tenant = new Tenant(this.client);
    this.user = new User(this.client);
    this.mail = new Mail(this.client);
    this.contacts = new Contacts(this.client);
    this.calendar = new Calendar(this.client);
    this.events = new Events(this.client);
    this.feeds = new Feeds(this.client);
    this.scheduling = new Scheduling(this.client);
  }

  whoami(): Promise<Identity> {
    return this.client.whoami();
  }
}
