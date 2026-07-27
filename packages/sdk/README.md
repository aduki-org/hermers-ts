# `@hermers/sdk`

Open-source **Hermers REST** client for Node.js and TypeScript. Stripe/Square-style API — pass an API key and call resource methods.

The Hermers **server is private / proprietary**. This package is licensed as open source; it does not include or publish server source.

## Install

```bash
npm install @hermers/sdk
```

## Quickstart

```ts
import Hermes from '@hermers/sdk';

const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await hermes.ready(); // GET /auth/whoami — caches user + tenant

console.log(hermes.me?.tenant, hermes.me?.user);

const contacts = await hermes.contacts.list({ limit: 50 }); // no tenant/user args
const profile = await hermes.user.retrieve();
const mailboxes = await hermes.mail.listMailboxes();
```

Auth is **API key only**. Every request sends:

```http
Authorization: Key hm_live_…
```

There are no login/password helpers in this package.

## Defaults

| Setting | Value |
| --- | --- |
| Base URL | `https://hermers.aduki.pro/v1` |
| Auth | `Authorization: Key <apiKey>` |

Override the base URL only for local/dev tests:

```ts
const hermes = new Hermes(process.env.HERMERS_API_KEY!, {
  apiBase: 'http://127.0.0.1:8443/v1',
});
```

## Resources

| Property | Coverage |
| --- | --- |
| `contacts` | CardDAV contacts CRUD |
| `mail` | Messages + mailboxes |
| `keys` | List / create / revoke API keys (create hashes the secret client-side) |
| `user` | Profile, sessions, audits, preferences |
| `tenant` | Tenant profile, members, domains, quotas, rules, webhooks, usage |
| `calendar` / `events` | Calendars and events |
| `feeds` | External calendar feeds |
| `scheduling` | Booking services and appointments |

## Errors

Failed responses throw `HermesError` with `status`, `code`, `message`, and optional `field` / `requestId`.

## Live tests

```bash
# From sdks/ts — key must NOT be committed
export HERMERS_API_KEY=hm_live_…   # or: set -a && source .env.local && set +a
npm test
```

Without `HERMERS_API_KEY`, live suites skip; unit/mocks still run.
