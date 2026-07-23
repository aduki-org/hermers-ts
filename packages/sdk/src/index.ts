import { Hermes } from './client.js';
import { BASE_URL, Client } from './utils/client.js';
import { Auth } from './services/auth.js';
import { Tenant } from './services/tenant.js';
import { User } from './services/user.js';
import { Mail } from './services/mail.js';
import { Contacts } from './services/contacts.js';
import { Calendar } from './services/calendar.js';
import { Events } from './services/events.js';
import { Feeds } from './services/feeds.js';
import { Scheduling } from './services/scheduling.js';

export * from './types/index.js';
export * from './data/index.js';
export { Hermes, BASE_URL, Client };
export { Auth, Tenant, User, Mail, Contacts, Calendar, Events, Feeds, Scheduling };

export default Hermes;
