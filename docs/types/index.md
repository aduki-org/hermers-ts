# Data Models & Type Reference

Comprehensive type reference for `@hermers/sdk` and `@hermers/grpc`.

---

## Enums

### `Flag` (Mail Message Flags)

```ts
export enum Flag {
  SEEN = 0,
  ANSWERED = 1,
  FLAGGED = 2,
  DELETED = 3,
  DRAFT = 4,
}
```

---

### `Verdict` (Spam Classification Result)

```ts
export enum Verdict {
  CLEAN = 0,
  SPAM = 1,
  BULK = 2,
}
```

---

### `Plan` (Subscription Tier Plan)

```ts
export enum Plan {
  FREE = 0,
  STARTER = 1,
  PRO = 2,
  BUSINESS = 3,
  ENTERPRISE = 4,
}
```

---

## Core Interfaces & DTOs

### `Identity`
```ts
export interface Identity {
  user?: string;
  tenant?: string;
  email?: string;
  name?: string;
  owner?: boolean;
  raw?: unknown;
}
```

### `Token`
```ts
export interface Token {
  token: string;
  refresh: string;
  expires: string;
}
```

### `TenantProfile`
```ts
export interface TenantProfile {
  hex: string;
  kind: string;
  name: string;
  slug: string;
  plan: string;
  state: string;
  domain?: string;
  created: string;
  users: number;
  domains: number;
  storage: number;
}
```

### `UserProfile`
```ts
export interface UserProfile {
  hex: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  state?: string;
  totp?: boolean;
  created: string;
}
```

### `Mailbox`
```ts
export interface Mailbox {
  hex: string;
  name: string;
  delimiter: string;
  uidvalidity: number;
  uidnext: number;
  messages: number;
  unread: number;
  size: number;
  created: string;
}
```

### `Message`
```ts
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
}
```

### `Contact`
```ts
export interface Contact {
  hex: string;
  etag: string;
  name?: string;
  emails?: string[];
  phones?: string[];
  groups?: string[];
  created: string;
}
```

### `Calendar`
```ts
export interface Calendar {
  hex: string;
  name: string;
  color?: string;
  created: string;
}
```

### `Event`
```ts
export interface Event {
  hex: string;
  uid: string;
  start?: string;
  end?: string;
  summary?: string;
  description?: string;
  location?: string;
  attendees?: string[];
  recurring?: boolean;
  created: string;
}
```

### `BlobRef`
```ts
export interface BlobRef {
  hex: string;
  tenant: string;
  backend: string;
  bucket: string;
  key: string;
  size: number;
  hash: string;
}
```

### `TierInfo`
```ts
export interface TierInfo {
  tenant: string;
  plan: Plan;
  limits: Limits;
  trial: boolean;
  trial_ends: string;
}
```

### `Usage`
```ts
export interface Usage {
  tenant: string;
  metric: string;
  value: number;
  window: string;
}
```
