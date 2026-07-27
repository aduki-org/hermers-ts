# `@hermers/sdk` — REST client

Stripe/Square-style root client. Pass an API key; call resource methods. Tenant and user come from whoami — never pass hex IDs.

Field tables and JSON examples describe the **HTTP wire shapes** the API returns.

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

## Identity

| API | Behavior |
| --- | --- |
| `ready()` / `whoami()` | `GET /auth/whoami` → cache |
| `me` | Cached identity or `undefined` |

Whoami fields: `hex`, `user`, `tenant`, `owner`, `scopes`, `deny`, `tier`, `ip`, `agent` — see [Auth](services/auth.md).

## Resources

| Property | Docs |
| --- | --- |
| `contacts` | [Contacts](services/contacts.md) |
| `mail` | [Mail](services/mail.md) |
| `keys` | [Authentication & keys](services/auth.md) |
| `user` | [User](services/user.md) |
| `tenant` | [Tenant](services/tenant.md) |
| `calendar` | [Calendar](services/calendar.md) |
| `events` | [Events](services/events.md) |
| `feeds` | [Feeds](services/feeds.md) |
| `scheduling` | [Scheduling](services/scheduling.md) |

## Common envelopes

**Page:** `{ items, total, next? }` or `{ items, total, page?, pages? }`.

**Empty ack:** many PATCH/DELETE endpoints return JSON `null`, not `{ ok: true }`.

**Errors:**

```json
{ "error": "forbidden", "message": "…" }
```

See [Types](../types/index.md).

## See also

Package README: [`packages/sdk/README.md`](../../packages/sdk/README.md)
