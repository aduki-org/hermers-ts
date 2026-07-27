# `@hermers/sdk` — REST client

Stripe/Square-style root client. Pass an API key; call resource methods. Tenant and user come from whoami — never pass hex IDs.

## Install

```bash
npm install @hermers/sdk
```

```ts
import Hermes, { HermesError, BASE_URL } from '@hermers/sdk';

const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await hermes.ready();
```

## Defaults

| Setting | Value |
| --- | --- |
| Base URL | `https://hermers.aduki.pro/v1` (`BASE_URL`) |
| Auth | `Authorization: Key <apiKey>` |

Local override:

```ts
const hermes = new Hermes(process.env.HERMERS_API_KEY!, {
  apiBase: 'http://127.0.0.1:8443/v1',
});
```

## Identity

| API | Signature | Behavior |
| --- | --- | --- |
| `ready()` | `(): Promise<Identity>` | Awaits `GET /auth/whoami`, caches identity |
| `whoami()` | `(): Promise<Identity>` | Same; returns cache after first success |
| `me` | `Identity \| undefined` | Sync snapshot until ready |

```ts
export interface Identity {
  hex?: string;       // session / JTI
  user: string;       // user hex — required
  tenant: string;     // tenant hex — required
  owner?: boolean;
  scopes?: string[];
  deny?: string[];
  tier?: string;
  email?: string;
  name?: string;
  raw?: unknown;      // full whoami JSON (may include ip, agent)
}
```

Full field tables and sample JSON: [Authentication & keys](services/auth.md), [Types](../types/index.md).

## Resources

| Property | Class | Notes |
| --- | --- | --- |
| `contacts` | `ContactsResource` | CardDAV CRUD — [docs](services/contacts.md) |
| `mail` | `MailResource` | Messages + mailboxes — [docs](services/mail.md) |
| `keys` | `KeysResource` | List / create / revoke — [docs](services/auth.md) |
| `user` | `UserResource` | Profile, sessions, audits — [docs](services/user.md) |
| `tenant` | `TenantResource` | Members, domains, quotas, … — [docs](services/tenant.md) |
| `calendar` | `CalendarResource` | Calendars — [docs](services/calendar.md) |
| `events` | `EventsResource` | Events — [docs](services/events.md) |
| `feeds` | `FeedsResource` | External calendar feeds |
| `scheduling` | `SchedulingResource` | Booking — [docs](services/scheduling.md) |

There is **no** `hermes.auth` login surface. Use an API key from the dashboard / `hermes.keys.create()`.

### Feeds (brief)

| Method | Returns |
| --- | --- |
| `feeds.create({ connection, remote, name, color?, block? })` | `Promise<Feed>` |
| `feeds.list()` | `Promise<Feed[]>` |
| `feeds.retrieve(hex)` | `Promise<Feed>` |
| `feeds.del(hex)` | `Promise<void>` |

`Feed`: `hex`, `tenant?`, `user?`, `connection`, `remote`, `name`, `color?`, `block`, `active`, `last?`.

## Common return envelopes

**Page:** `{ items: T[]; total: number; next?: string; page?: number; pages?: number }`

**Ack:** `{ ok: boolean }`

**Create hex:** `{ hex: string }` (calendars, domains, webhooks, …)

## Errors

Failed responses throw `HermesError`:

| Property | Type |
| --- | --- |
| `status` | `number` — HTTP status (`0` = client/network) |
| `code` | `string` — API or synthetic code |
| `message` | `string` |
| `field` | `string?` |
| `requestId` | `string?` |
| `body` | `unknown?` |

```ts
try {
  await hermes.contacts.list();
} catch (e) {
  if (e instanceof HermesError) console.error(e.status, e.code, e.message);
}
```

## See also

- [Contacts](services/contacts.md) · [Mail](services/mail.md) · [User](services/user.md) · [Tenant](services/tenant.md)
- [Authentication & keys](services/auth.md)
- Package README: [`packages/sdk/README.md`](../../packages/sdk/README.md)
