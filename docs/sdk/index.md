# HTTP SDK Guide (`@hermers/sdk`)

Comprehensive guide for `@hermers/sdk` HTTP REST client.

## Installation & Import

```bash
npm install @hermers/sdk
```

```ts
import Hermes from '@hermers/sdk';

// Default export: root Hermes client class
const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
```

---

## Configuration Options

```ts
export interface ClientOptions {
  key?: string;
  token?: string;
}
```

```ts
// Initialize with config object
const hermes = new Hermes({
  key: 'hm_live_xxxxxxxxxxxxxxxxxxxxxxxx'
});
```

---

## Service Properties

| Property | Service Class | Description |
|---|---|---|
| `hermes.auth` | `Auth` | Login, token refresh, and identity operations |
| `hermes.tenant` | `Tenant` | Tenant profiles, API key management, members, domains, webhooks |
| `hermes.user` | `User` | Profile management, preferences, active sessions |
| `hermes.mail` | `Mail` | Mailboxes, threads, messages, send, move, flags |
| `hermes.contacts` | `Contacts` | CardDAV contact cards & groups |
| `hermes.calendar` | `Calendar` | CalDAV calendar collections |
| `hermes.events` | `Events` | CalDAV events & iCalendar objects |
| `hermes.feeds` | `Feeds` | External calendar feeds & integrations |
| `hermes.scheduling` | `Scheduling` | Booking services, appointments, availability slots |

---

## Root Methods

### `whoami(): Promise<Identity>`
Fetches current authenticated identity (cached after first request).

**Return Type:**
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

**Example:**
```ts
const identity = await hermes.whoami();
console.log('Current Tenant:', identity.tenant, 'User:', identity.user);
```
