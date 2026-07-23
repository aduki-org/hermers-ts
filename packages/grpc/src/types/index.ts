export enum Flag {
  SEEN = 0,
  ANSWERED = 1,
  FLAGGED = 2,
  DELETED = 3,
  DRAFT = 4,
}

export enum Verdict {
  CLEAN = 0,
  SPAM = 1,
  BULK = 2,
}

export enum Plan {
  FREE = 0,
  STARTER = 1,
  PRO = 2,
  BUSINESS = 3,
  ENTERPRISE = 4,
}

export interface Contact {
  hex: string;
  tenant: string;
  owner: string;
  vcard: string;
  etag: string;
  created: string;
  updated: string;
}

export interface Feed {
  hex: string;
  tenant: string;
  user: string;
  connection: string;
  remote: string;
  name: string;
  color?: string;
  block: boolean;
  active: boolean;
  last?: string;
}

export interface Mailbox {
  hex: string;
  tenant: string;
  owner: string;
  name: string;
  uidnext: number;
  uidvalidity: number;
  exists: number;
  unseen: number;
}

export interface Message {
  hex: string;
  mailbox: string;
  uid: number;
  flags: Flag[];
  subject: string;
  from: string;
  to: string[];
  blob: string;
  size: number;
  date: string;
}

export interface Session {
  hex: string;
  user: string;
  tenant: string;
  owner: boolean;
  scopes: string[];
  deny: string[];
  tier: string;
  ip?: string;
  agent?: string;
  created: string;
  expires: string;
  refreshed?: string;
}

export interface BlobRef {
  hex: string;
  tenant: string;
  backend: string;
  bucket: string;
  key: string;
  size: number;
  hash: string;
}

export interface Limits {
  sends_day: number;
  sends_month: number;
  mailboxes: number;
  domains: number;
  members: number;
  storage_mb: number;
  api_keys: number;
  webhooks: number;
  ml_enabled: boolean;
}

export interface TierInfo {
  tenant: string;
  plan: Plan;
  limits: Limits;
  trial: boolean;
  trial_ends: string;
}

export interface Usage {
  tenant: string;
  metric: string;
  value: number;
  window: string;
}

export interface IncrResp {
  value: number;
  over_limit: boolean;
}

export interface CheckResp {
  used: number;
  limit: number;
  over: boolean;
}

export interface ResetResp {
  ok: boolean;
}
