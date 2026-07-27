# `@hermers/grpc`

Official **Hermes gRPC** client for Node.js and TypeScript. Native gRPC over TLS — types and stubs are **generated from** `proto/*.proto` via `ts-proto` + `@grpc/grpc-js`.

## Install

```bash
npm install @hermers/grpc
```

## Quickstart

```ts
import { HermesGrpc } from '@hermers/grpc';

const client = new HermesGrpc('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await client.ready(); // SessionService.Whoami — caches user + tenant

console.log(client.me?.tenant, client.me?.user);

const { items } = await client.contacts.list(); // no tenant/user args
const mailboxes = await client.mail.listMailboxes();
client.close();
```

Auth is **API key only**. Metadata on every call:

```text
authorization: Key hm_live_…
```

Login/password/JWT refresh RPCs are not exposed.

## Defaults

| Setting | Value |
| --- | --- |
| Endpoint | `grpc.aduki.pro:443` (TLS / HTTP2) |
| Auth | metadata `authorization: Key <apiKey>` |

Override only for local/dev:

```ts
const client = new HermesGrpc(process.env.HERMERS_API_KEY!, {
  endpoint: '127.0.0.1:8444',
  insecure: true, // plaintext h2c
});
```

## Resources

| Property | Proto service |
| --- | --- |
| `contacts` | `hermes.contact.ContactService` |
| `mail` | `hermes.mail.MailService` |
| `feeds` | `hermes.feeds.FeedService` |
| `storage` | `hermes.storage.StorageService` |
| `sync` | `hermes.sync.SyncService` |
| `security` | `hermes.security.SecurityService` |
| `spam` | `hermes.spam.SpamService` |
| `tier` | `hermes.tier.TierService` |
| `usage` | `hermes.usage.Usageervice` *(proto service name)* |
| `session` | `hermes.session.SessionService` (whoami / load / revoke / list only) |

Tenant and user IDs are always taken from the whoami cache — callers never pass hex ids.

## Regenerating types

From `sdks/ts`:

```bash
npm run generate
```

This runs `protoc` + `ts-proto` against `../../proto/*.proto` into `packages/grpc/src/generated/`.

## Live tests

```bash
export HERMERS_API_KEY=hm_live_…
npm test
```

Without the env var, live suites skip; unit tests still run.
