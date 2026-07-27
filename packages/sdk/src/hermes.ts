import { type HermesOptions } from './config.js';
import { HttpClient, type Identity } from './http/client.js';
import { CalendarResource } from './resources/calendar.js';
import { ContactsResource } from './resources/contacts.js';
import { EventsResource } from './resources/events.js';
import { FeedsResource } from './resources/feeds.js';
import { KeysResource } from './resources/keys.js';
import { MailResource } from './resources/mail.js';
import { SchedulingResource } from './resources/scheduling.js';
import { TenantResource } from './resources/tenant.js';
import { UserResource } from './resources/user.js';

/**
 * Hermes REST client (Stripe/Square style).
 *
 * On construction, starts `GET /auth/whoami` and caches user/tenant.
 * Resource methods never require tenant/user hex arguments.
 *
 * @example
 * ```ts
 * import Hermes from '@hermers/sdk';
 * const hermes = new Hermes('hm_live_...');
 * await hermes.ready();
 * console.log(hermes.me?.tenant);
 * const contacts = await hermes.contacts.list();
 * ```
 */
export class Hermes {
  readonly http: HttpClient;
  readonly contacts: ContactsResource;
  readonly mail: MailResource;
  readonly keys: KeysResource;
  readonly user: UserResource;
  readonly tenant: TenantResource;
  readonly calendar: CalendarResource;
  readonly events: EventsResource;
  readonly feeds: FeedsResource;
  readonly scheduling: SchedulingResource;

  constructor(apiKey: string, options: HermesOptions = {}) {
    this.http = new HttpClient(apiKey, options);
    this.contacts = new ContactsResource(this.http);
    this.mail = new MailResource(this.http);
    this.keys = new KeysResource(this.http);
    this.user = new UserResource(this.http);
    this.tenant = new TenantResource(this.http);
    this.calendar = new CalendarResource(this.http);
    this.events = new EventsResource(this.http);
    this.feeds = new FeedsResource(this.http);
    this.scheduling = new SchedulingResource(this.http);
  }

  /** Cached identity after whoami resolves; `undefined` until then. */
  get me(): Identity | undefined {
    return this.http.me;
  }

  /** Await until `GET /auth/whoami` has populated the identity cache. */
  ready(): Promise<Identity> {
    return this.http.ready();
  }

  /** Resolve (and cache) the authenticated identity. */
  whoami(): Promise<Identity> {
    return this.http.whoami();
  }
}

export default Hermes;
