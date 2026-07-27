# `@hermers/grpc` — native gRPC client

Native `@grpc/grpc-js` over TLS. Types/stubs are generated from `proto/*.proto` via `ts-proto`.

## Install

```bash
npm install @hermers/grpc
```

```ts
import { HermesGrpc } from '@hermers/grpc';

const client = new HermesGrpc('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await client.ready();
```

## Defaults

| Setting | Value |
| --- | --- |
| Endpoint | `grpc.aduki.pro:443` (`BASE_ENDPOINT`) |
| Transport | TLS / HTTP2 (not grpc-web, not plaintext in production) |
| Auth | metadata `authorization: Key <apiKey>` |

Local override:

```ts
const client = new HermesGrpc(process.env.HERMERS_API_KEY!, {
  endpoint: '127.0.0.1:8444',
  insecure: true, // plaintext h2c for local only
});
```

Always call `client.close()` when finished.

## Identity

| API | Behavior |
| --- | --- |
| `ready()` | Awaits `SessionService.Whoami`, caches identity |
| `whoami()` | Same (cached after first success) |
| `me` | Cached `Identity` or `undefined` until ready |

Resource methods that need tenant/owner call `requireTenant()` / `requireUser()` internally — callers never pass those hex fields.

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
| `usage` | `hermes.usage.UsageService` |
| `session` | `hermes.session.SessionService` — whoami / load / revoke / list only |

Login / Issue / Refresh / Patch RPCs exist on the server but are **not** exposed.

## Regenerating stubs

From `sdks/ts` (requires monorepo `proto/` and `protoc`):

```bash
npm run generate
```

## See also

- [Session](services/session.md) · [Contact](services/contact.md) · [Mail](services/mail.md)
- Package README: [`packages/grpc/README.md`](../../packages/grpc/README.md)
- gRPC API reference: [`guide/grpc/`](../../guide/grpc/)
