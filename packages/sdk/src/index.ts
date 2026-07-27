export { Hermes } from './hermes.js';
export { default } from './hermes.js';
export { BASE_URL, type HermesOptions } from './config.js';
export { HermesError } from './errors.js';
export { HttpClient, type Identity, type RequestOptions } from './http/client.js';
export { generateKey, hashKey, prefixKey } from './crypto.js';

export { ContactsResource } from './resources/contacts.js';
export { MailResource } from './resources/mail.js';
export { KeysResource } from './resources/keys.js';
export { UserResource } from './resources/user.js';
export { TenantResource } from './resources/tenant.js';
export { CalendarResource } from './resources/calendar.js';
export { EventsResource } from './resources/events.js';
export { FeedsResource } from './resources/feeds.js';
export { SchedulingResource } from './resources/scheduling.js';

export type * from './types/index.js';
