export interface Page<T> {
  items: T[];
  total: number;
  next?: string;
  page?: number;
  pages?: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    field?: string;
    request?: string;
  };
}

export interface ClientOptions {
  key?: string;
  token?: string;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  idempotency?: string;
  match?: string;
}

export interface Token {
  token: string;
  refresh: string;
  expires: string;
}

export interface Session {
  hex: string;
  ip?: string;
  agent?: string;
  device?: Record<string, unknown>;
  location?: Record<string, unknown>;
  seen?: string;
  expires?: string;
  created: string;
  user: Record<string, unknown>;
  total?: number;
}

export interface TenantProfile {
  hex: string;
  kind: string;
  name: string;
  slug: string;
  plan: string;
  state: string;
  domain?: string;
  customer?: string;
  subscription?: string;
  trial?: string;
  meta?: Record<string, unknown>;
  created: string;
  users: number;
  domains: number;
  storage: number;
}

export interface Tenant {
  hex: string;
  name: string;
  slug: string;
  kind: string;
  state: string;
  created: string;
}

export interface Member {
  hex: string;
  email: string;
  name: string;
  avatar?: string;
  owner: boolean;
  state: string;
  last?: string;
  created: string;
  tenant: Record<string, unknown>;
  role: Record<string, unknown>;
  total?: number;
}

export interface Domain {
  hex: string;
  name: string;
  kind: string;
  status: string;
  selector?: string;
  dkim?: string;
  spf?: Record<string, unknown>;
  dmarc?: Record<string, unknown>;
  verified?: string;
  created: string;
  tenant: Record<string, unknown>;
  mailboxes?: number;
}

export interface Invitation {
  hex: string;
  email: string;
  label: string;
  status: string;
  expires: string;
  created: string;
  inviter: Record<string, unknown>;
  total?: number;
}

export interface Quota {
  tenant: string;
  metric: string;
  ceiling: number;
  expires?: string;
  created: string;
  total?: number;
}

export interface Rule {
  hex: string;
  target: string;
  pattern: string;
  score: number;
  active: boolean;
  name: string;
  meta?: Record<string, unknown>;
  created: string;
  tenant?: Record<string, unknown>;
  total?: number;
}

export interface RuleDetail extends Rule {
  meta: Record<string, unknown>;
}

export interface Webhook {
  hex: string;
  url: string;
  active: boolean;
  created: string;
  tenant: Record<string, unknown>;
  total?: number;
}

export interface WebhookDetail extends Webhook {
  secret?: string;
  events?: string[];
  domains?: string[];
  meta?: Record<string, unknown>;
}

export interface Audit {
  hex: string;
  action: string;
  user: Record<string, unknown>;
  ip?: string;
  agent?: string;
  created: string;
}

export interface Usage {
  tenant: string;
  metric: string;
  window: string;
  value: number;
  ceiling: number;
  total?: number;
}

export interface Security {
  mtasts: Array<{ domain: string; policy: Record<string, unknown>; expires: string }>;
  tlsa: Array<{ host: string; port: number; records: Record<string, unknown>; expires: string }>;
  bimi: Array<{ domain: string; location?: string; vmc?: string; expires: string }>;
  reports: Array<{ hex: string; kind: string; domain: string; period: string; received: string }>;
}

export interface UserProfile {
  hex: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  state?: string;
  totp?: boolean;
  meta?: Record<string, unknown>;
  created: string;
}

export interface Key {
  hex: string;
  name: string;
  key: string;
  scopes: string[];
  created: string;
  last?: string;
}

export interface PreferenceDetail {
  info?: Record<string, unknown>;
  notifications?: Record<string, unknown>;
  communication?: Record<string, unknown>;
  privacy?: Record<string, unknown>;
  display?: Record<string, unknown>;
  regional?: Record<string, unknown>;
}

export interface Message {
  hex: string;
  uid: number;
  subject?: string;
  sender?: string;
  size: number;
  flags?: string[];
  thread?: string;
  spam?: number;
  date: string;
  mailbox: Record<string, unknown>;
  total?: number;
}

export interface MessageDetail extends Message {
  blob?: string;
  structure?: Record<string, unknown>;
}

export interface Thread {
  thread: string;
  subject?: string;
  count: number;
  unread: number;
  latest: string;
  mailbox: Record<string, unknown>;
  total?: number;
}

export interface Mailbox {
  hex: string;
  name: string;
  delimiter: string;
  flags?: string[];
  uidvalidity: number;
  uidnext: number;
  messages: number;
  unread: number;
  size: number;
  created: string;
  total?: number;
}

export interface Contact {
  hex: string;
  etag: string;
  name?: string;
  emails?: string[];
  phones?: string[];
  groups?: string[];
  created: string;
  total?: number;
}

export interface ContactDetail extends Contact {
  vcard?: string;
  meta?: Record<string, unknown>;
  user?: Record<string, unknown>;
}

export interface Calendar {
  hex: string;
  name: string;
  color?: string;
  created: string;
  total?: number;
}

export interface Event {
  hex: string;
  uid: string;
  start?: string;
  end?: string;
  created: string;
  total?: number;
  ical?: string;
  href?: string;
  summary?: string;
  description?: string;
  location?: string;
  attendees?: string[];
  recurring?: boolean;
  kind?: string;
  rrule?: string;
  timezone?: string;
}

export interface Service {
  hex: string;
  tenant?: string;
  user?: string;
  name: string;
  slug: string;
  description?: string;
  duration: number;
  buffer?: number;
  notice?: number;
  horizon?: number;
  increment?: number;
  max?: number;
  location?: Record<string, unknown>;
  questions?: string[];
  active?: boolean;
  meta?: Record<string, unknown>;
  created?: string;
  updated?: string;
}

export interface Appointment {
  hex: string;
  tenant: string;
  service: string;
  host: string;
  start: string;
  end: string;
  timezone: string;
  status: string;
  uid: string;
  sequence: number;
  method: string;
  event?: string;
  location: Record<string, unknown>;
  notes?: string;
  cancelled?: string;
  rescheduled?: string;
  meta: Record<string, unknown>;
  created: string;
  updated: string;
}

export interface Guest {
  hex: string;
  tenant: string;
  appointment: string;
  user?: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  answers: Record<string, unknown>;
  token: string;
  notified?: string;
  created: string;
  updated: string;
}

export interface Window {
  hex: string;
  day: number;
  start: string;
  end: string;
}

export interface Override {
  hex: string;
  date: string;
  available: boolean;
}

export interface Availability {
  slots: Array<{ start: string; end: string }>;
}

export interface Feed {
  hex: string;
  tenant?: string;
  user?: string;
  connection: string;
  remote: string;
  name: string;
  color?: string;
  block: boolean;
  active: boolean;
  last?: string;
}
