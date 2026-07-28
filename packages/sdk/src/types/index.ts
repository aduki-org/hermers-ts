/**
 * REST DTO shapes matching Hermes API crate Serialize output
 * (`crates/api` handlers, `crates/db` models/views, `crates/core::Page`).
 *
 * Timestamps are naive datetime strings (`"2026-07-28T12:00:00"`).
 * Enums use lowercase serde names. Freeform jsonb stays `Json`.
 */

export type Json = Record<string, unknown> | unknown[] | string | number | boolean | null;

export interface Page<T> {
  items: T[];
  total: number;
  next?: string;
  page?: number;
  pages?: number;
}

export type ListQuery = {
  after?: string;
  limit?: number;
  page?: number;
  group?: string;
  search?: string;
};

/** Nested hex refs used in list/detail jsonb. */
export interface HexName {
  hex: string;
  name: string;
}

export interface HexNameEmail {
  hex: string;
  name: string;
  email: string;
}

export interface HexNameSlug {
  hex: string;
  name: string;
  slug: string;
}

// —— User ——

/** Full `User` model from `GET /user` / edits / email lookup (`password` omitted). */
export interface User {
  id: number;
  hex: string;
  tenant: string;
  email: string;
  phone?: string | null;
  name: string;
  bio?: string | null;
  avatar?: string | null;
  owner: boolean;
  state: 'active' | 'suspended' | 'pending' | 'deleted' | string;
  totp?: string | null;
  timezone: string;
  locale: string;
  contacts?: Json | null;
  meta: Json;
  last?: string | null;
  created: string;
  updated: string;
}

/** `POST /user/lookup/profile` view only. */
export interface UserProfile {
  hex: string;
  email: string;
  phone?: string | null;
  name: string;
  bio?: string | null;
  avatar?: string | null;
  owner: boolean;
  state: string;
  timezone: string;
  locale: string;
  last?: string | null;
  created: string;
  tenant: {
    hex: string;
    name: string;
    slug: string;
    plan: string;
    kind: string;
  };
  role:
    | {
        hex: string;
        label: string;
        owner: boolean;
        privileges: Json;
        kind: string;
      }
    | Record<string, never>;
}

/** Full preferences row returned by preference PATCH handlers. */
export interface Preference {
  id: number;
  hex: string;
  user: string;
  language: string;
  timezone: string;
  currency: string;
  theme: 'light' | 'dark' | 'auto' | string;
  /** Freeform jsonb sections — no fixed Rust schema. */
  notifications: Json;
  communication: Json;
  privacy: Json;
  display: Json;
  regional: Json;
  created: string;
  updated: string;
}

export interface PreferenceInfoBody {
  language: string;
  timezone: string;
  currency: string;
  theme: 'light' | 'dark' | 'auto';
}

// —— Tenant ——

export interface TenantProfile {
  hex: string;
  kind: string;
  name: string;
  slug: string;
  plan: string;
  state: string;
  domain?: string | null;
  customer?: string | null;
  subscription?: string | null;
  trial?: string | null;
  meta: Json;
  created: string;
  users: number;
  domains: number;
  storage: number;
}

/** Full tenant model (e.g. slug lookup / edit). */
export interface Tenant {
  id: number;
  hex: string;
  kind: string;
  name: string;
  slug: string;
  plan: string;
  state: string;
  domain?: string | null;
  customer?: string | null;
  subscription?: string | null;
  billed?: string | null;
  renews?: string | null;
  trial?: string | null;
  meta: Json;
  created: string;
  updated: string;
}

export interface TenantSummary {
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
  avatar?: string | null;
  owner: boolean;
  state: string;
  last?: string | null;
  created: string;
  tenant: HexNameSlug;
  role: { label: string; kind: string } | Record<string, never>;
  total?: number;
}

export interface Domain {
  hex: string;
  name: string;
  kind: string;
  status: string;
  selector?: string | null;
  dkim?: string | null;
  spf?: Json;
  dmarc?: Json;
  verified?: string | null;
  created: string;
  tenant: HexNameSlug;
  mailboxes?: number;
  total?: number;
}

export interface Invitation {
  hex: string;
  email: string;
  label: string;
  status: string;
  expires: string;
  created: string;
  inviter: HexNameEmail;
  total?: number;
}

export interface InvitationDetail extends Omit<Invitation, 'total'> {
  privileges: Json;
  message?: string | null;
  tenant: HexNameSlug;
}

export interface Quota {
  tenant: string;
  metric: string;
  ceiling: number;
  expires?: string | null;
  created: string;
  total?: number;
  reason?: string | null;
  granted?: string | null;
  updated?: string;
}

export interface Rule {
  hex: string;
  target: string;
  pattern: string;
  score: number;
  active: boolean;
  name: string;
  created: string;
  tenant?: HexName | null;
  total?: number;
}

export interface RuleDetail extends Rule {
  meta: Json;
}

export interface ApiKey {
  hex: string;
  name: string;
  prefix: string;
  active: boolean;
  expires?: string | null;
  last?: string | null;
  created: string;
  tenant: HexName;
  user?: HexNameEmail | null;
  total?: number;
  /** Present on detail / some lookups. */
  scopes?: Json;
}

/** List row — `GET /tenant/webhooks`, `/active`, `/subscribers/{event}`. */
export interface Webhook {
  hex: string;
  url: string;
  active: boolean;
  created: string;
  tenant: HexName;
  total?: number;
}

/** Full model — `GET /tenant/webhooks/{hex}`. */
export interface WebhookModel {
  id: number;
  hex: string;
  /** Tenant hex string (not nested). */
  tenant: string;
  url: string;
  secret: string;
  events: (string | null)[];
  domains: (string | null)[];
  active: boolean;
  meta: Json;
  created: string;
  updated: string;
}

/** Detail view — `GET /tenant/webhooks/{hex}/detail` (no secret). */
export interface WebhookDetail {
  hex: string;
  url: string;
  events: Json;
  active: boolean;
  created: string;
  tenant: HexName;
}

export interface Audit {
  hex: string;
  action: string;
  success: boolean;
  reason?: string | null;
  ip?: string | null;
  agent?: string | null;
  device?: Json | null;
  created: string;
  actor?: HexNameEmail | null;
  total?: number;
}

/** Tenant audit detail (`GET /tenant/view/audit/{hex}`) — includes optional `meta`. */
export interface AuditDetail {
  hex: string;
  action: string;
  success: boolean;
  reason?: string | null;
  ip?: string | null;
  agent?: string | null;
  device?: Json | null;
  meta?: Json | null;
  created: string;
  actor?: Json | null;
}

export interface Usage {
  tenant: string;
  metric: string;
  /** Date string `YYYY-MM-DD`. */
  window: string;
  value: number;
  ceiling: number;
  total?: number;
}

export interface Security {
  mtasts: Array<{ domain: string; policy: Json; expires: string }>;
  tlsa: Array<{ host: string; port: number; records: Json; expires: string }>;
  bimi: Array<{ domain: string; location?: string | null; vmc?: string | null; expires: string }>;
  reports: Array<{ hex: string; kind: string; domain: string; period: string; received: string }>;
}

// —— Mail ——

export interface Message {
  hex: string;
  uid: number;
  subject?: string | null;
  sender?: string | null;
  size: number;
  flags: Array<string | null>;
  thread?: string | null;
  spam?: number | null;
  /** Wire field from API — not `date`. */
  internaldate: string;
  mailbox: HexName;
  total?: number;
}

/** DB view shape; HTTP has no GET-by-hex for messages today. */
export interface MessageDetail {
  hex: string;
  uid: number;
  size: number;
  flags: Array<string | null>;
  structure?: string | null;
  subject?: string | null;
  sender?: string | null;
  internaldate: string;
  modseq: number;
  spam?: number | null;
  thread?: string | null;
  created: string;
  mailbox: HexName;
  blob: { hex: string; size: number; mime: string };
}

export interface Thread {
  thread: string;
  subject?: string | null;
  count: number;
  unread: number;
  latest: string;
  mailbox: HexName;
  total?: number;
}

/** List row `Mailboxes` view. */
export interface Mailbox {
  hex: string;
  name: string;
  delimiter: string;
  flags: Array<string | null>;
  uidvalidity: number;
  uidnext: number;
  messages: number;
  unread: number;
  created: string;
  total?: number;
}

/** Create response — full mailbox model. */
export interface MailboxModel {
  id: number;
  hex: string;
  tenant: string;
  user: string;
  name: string;
  delimiter: string;
  flags: Array<string | null>;
  uidvalidity: number;
  uidnext: number;
  modseq: number;
  meta: Json;
  role?: string | null;
  subscribed: boolean;
  parent?: string | null;
  acl: Json;
  quota?: number | null;
  created: string;
  updated: string;
}

/** `POST /user/mailbox` body (`MailboxData`). */
export interface MailboxCreate {
  name: string;
  role?: string;
  child?: string;
  unread?: number;
  empty?: boolean;
  messages?: number;
  search?: boolean;
  uidnext?: number;
  flags?: string[];
  subscribed?: boolean;
  parent?: string;
  quota?: number;
  acl?: Json;
  meta?: Json;
}

/** `PATCH /user/mailbox/{hex}/basic` body. */
export type MailboxUpdate = Omit<MailboxCreate, 'name'>;

// —— Contacts ——

/** List row `Contacts` view. */
export interface Contact {
  hex: string;
  etag: string;
  name?: string | null;
  emails: Array<string | null>;
  phones: Array<string | null>;
  groups: Array<string | null>;
  created: string;
  total?: number;
}

/** Create response — full `Contact` diesel model. */
export interface ContactModel {
  id: number;
  hex: string;
  tenant: string;
  user: string;
  etag: string;
  vcard: string;
  name?: string | null;
  emails: Array<string | null>;
  phones: Array<string | null>;
  groups: Array<string | null>;
  meta: Json;
  book?: string | null;
  href?: string | null;
  uid?: string | null;
  version?: string | null;
  size?: number | null;
  deleted?: string | null;
  created: string;
  updated: string;
}

export interface ContactCreate {
  vcard: string;
  /** Required by API validation. */
  name: string;
  emails?: string[];
  phones?: string[];
  groups?: string[];
  meta?: Json;
}

// —— Calendar / events / feeds ——

export interface Calendar {
  hex: string;
  name: string;
  description?: string | null;
  color?: string | null;
  timezone: string;
  created: string;
  total?: number;
}

export interface CalendarCreateResult {
  hex: string;
  etag: string;
  sync_token: string;
}

/** List row — no summary/ical on list. */
export interface Event {
  hex: string;
  uid: string;
  start?: string | null;
  end?: string | null;
  created: string;
  total?: number;
}

export interface FeedSync {
  hex: string;
  ok: boolean;
}

export interface Feed {
  id: number;
  hex: string;
  tenant: string;
  user: string;
  connection: string;
  remote: string;
  name: string;
  color?: string | null;
  block: boolean;
  sync?: string | null;
  active: boolean;
  meta: Json;
  last?: string | null;
  created: string;
  updated: string;
}

// —— Scheduling ——

export interface Service {
  id: number;
  hex: string;
  tenant: string;
  user: string;
  name: string;
  slug: string;
  description?: string | null;
  duration: number;
  buffer: number;
  notice: number;
  horizon: number;
  increment: number;
  max?: number | null;
  location: Json;
  questions: Json;
  active: boolean;
  meta: Json;
  created: string;
  updated: string;
}

export interface Appointment {
  id: number;
  hex: string;
  tenant: string;
  service: string;
  host: string;
  start: string;
  end: string;
  timezone: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'noshow' | string;
  uid: string;
  sequence: number;
  method: string;
  event?: string | null;
  location?: Json | null;
  notes?: string | null;
  cancelled?: string | null;
  rescheduled?: string | null;
  meta: Json;
  created: string;
  updated: string;
}

export interface Guest {
  id: number;
  hex: string;
  tenant: string;
  appointment: string;
  user?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  status: 'pending' | 'accepted' | 'declined' | 'tentative' | string;
  answers: Json;
  token: string;
  notified?: string | null;
  created: string;
  updated: string;
}

export interface Window {
  id: number;
  hex: string;
  tenant: string;
  user: string;
  name: string;
  timezone: string;
  priority: number;
  start?: string | null;
  end?: string | null;
  busytype: string;
  rrule?: string | null;
  slots: Json;
  active: boolean;
  meta: Json;
  created: string;
  updated: string;
}

export interface Override {
  id: number;
  hex: string;
  tenant: string;
  user: string;
  window?: string | null;
  start: string;
  end: string;
  available: boolean;
  reason?: string | null;
  created: string;
}

export interface Availability {
  slots: Array<{ start: string; end: string }>;
  busy: Array<{ start: string; end: string; title?: string | null }>;
}

export interface AppointmentCreate {
  host: string;
  service: string;
  start: string;
  end: string;
  timezone: string;
  uid: string;
  method: string;
  event?: string;
  location?: Json;
  notes?: string;
  rescheduled?: string;
  meta: Json;
}

export interface Session {
  hex: string;
  ip?: string | null;
  agent?: string | null;
  device?: Json | null;
  location?: Json | null;
  seen: string;
  expires: string;
  created: string;
  user: HexNameEmail;
  total?: number;
}
