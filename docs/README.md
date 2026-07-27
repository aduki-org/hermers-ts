# Hermers TypeScript SDKs

Official Node.js / TypeScript clients for Hermes (**`@hermers/*`**).

| Package | Transport | Default endpoint |
| --- | --- | --- |
| [`@hermers/sdk`](../packages/sdk) | REST / JSON | `https://hermers.aduki.pro/v1` |
| [`@hermers/grpc`](../packages/grpc) | Native gRPC (TLS) | `grpc.aduki.pro:443` |

## Install

```bash
npm install @hermers/sdk
npm install @hermers/grpc
```

## Quickstart

```ts
import Hermes from '@hermers/sdk';

const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await hermes.ready(); // GET /auth/whoami — caches user + tenant

console.log(hermes.me?.tenant, hermes.me?.user);
const contacts = await hermes.contacts.list(); // never pass tenant/user hex
```

```ts
import { HermesGrpc } from '@hermers/grpc';

const client = new HermesGrpc('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await client.ready(); // SessionService.Whoami

const { items } = await client.contacts.list();
client.close();
```

## Authentication

**API key only.** Every REST request sends:

```http
Authorization: Key hm_live_…
```

gRPC metadata: `authorization: Key hm_live_…`.

There are **no** login, password, or JWT refresh helpers in either package. Browser login (`POST /auth/login`) exists on the HTTP API for admin UIs only — not in the SDKs.

On construction each client starts whoami and caches identity. Prefer `await client.ready()` before the first resource call (or rely on lazy await inside resource methods).

## Hosts

| Host | Role |
| --- | --- |
| `hermers.aduki.pro` | REST `/v1`, MCP, CardDAV (Cloudflare proxied) |
| `grpc.aduki.pro:443` | Native gRPC over TLS (DNS-only — not Cloudflare HTTP proxy) |

Override endpoints only for local/dev (see package READMEs).

## Testing

```bash
npm test                         # unit + live (live skips without a key)
export HERMERS_API_KEY=hm_live_… # never commit secrets
npm test                         # live suites hit production
```

Without `HERMERS_API_KEY`, unit/mocks still run.

## Documentation

Developer docs for SDK consumers live in this folder (`docs/`) and are what the published mdBook serves.

### This site

- [REST client (`@hermers/sdk`)](sdk/index.md)
- [gRPC client (`@hermers/grpc`)](grpc/index.md)
- [Types & enums](types/index.md)
- [REST cheatsheet](http.md)
- [gRPC cheatsheet](grpc.md)

### REST resources

- [Contacts](sdk/services/contacts.md) · [Mail](sdk/services/mail.md) · [User](sdk/services/user.md) · [Tenant](sdk/services/tenant.md)
- [Keys](sdk/services/auth.md) · [Calendar](sdk/services/calendar.md) · [Events](sdk/services/events.md) · [Scheduling](sdk/services/scheduling.md)

### gRPC resources

- [Session](grpc/services/session.md) · [Contact](grpc/services/contact.md) · [Mail](grpc/services/mail.md) · [Feed](grpc/services/feed.md)
- [Storage](grpc/services/storage.md) · [Sync](grpc/services/sync.md) · [Security](grpc/services/security.md) · [Spam](grpc/services/spam.md)
- [Tier](grpc/services/tier.md) · [Usage](grpc/services/usage.md)

### Package READMEs

- [`@hermers/sdk`](../packages/sdk/README.md)
- [`@hermers/grpc`](../packages/grpc/README.md)
