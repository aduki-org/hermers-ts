# `@hermers/sdk` — REST client

Stripe/Square-style root client. Pass an API key; call resource methods. Tenant and user come from whoami — never pass hex IDs.

## Install

```bash
npm install @hermers/sdk
```

```ts
import Hermes from '@hermers/sdk';

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

| API | Behavior |
| --- | --- |
| `ready()` | Awaits `GET /auth/whoami`, caches identity |
| `whoami()` | Same as `ready()` (returns cache after first success) |
| `me` | Cached `Identity` or `undefined` until ready |

```ts
export interface Identity {
  hex?: string;
  user: string;
  tenant: string;
  owner?: boolean;
  scopes?: string[];
  deny?: string[];
  tier?: string;
  email?: string;
  name?: string;
}
```

## Resources

| Property | Notes |
| --- | --- |
| `contacts` | CardDAV contacts CRUD (`/user/contacts`) |
| `mail` | Messages + mailboxes |
| `keys` | List / create / revoke (create hashes secret client-side) |
| `user` | Profile, sessions, audits, preferences |
| `tenant` | Profile, members, domains, quotas, rules, webhooks, usage |
| `calendar` / `events` | Calendars and events |
| `feeds` | External calendar feeds |
| `scheduling` | Booking services and appointments |

There is **no** `hermes.auth` login surface. Use an API key from the dashboard / `hermes.keys.create()`.

## Errors

Failed responses throw `HermesError` with `status`, `code`, `message`, and optional `field` / `requestId`.

## See also

- [Contacts](services/contacts.md) · [Mail](services/mail.md) · [User](services/user.md) · [Tenant](services/tenant.md)
- [Authentication & keys](services/auth.md)
- Package README: [`packages/sdk/README.md`](../../packages/sdk/README.md)
- HTTP API reference: [`guide/http/`](../../guide/http/)
