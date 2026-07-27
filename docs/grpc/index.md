# `@hermers/grpc` — native gRPC client

Native `@grpc/grpc-js` over TLS. Types/stubs are generated from `proto/*.proto` via `ts-proto`.

## Install

```bash
npm install @hermers/grpc
```

```ts
import { HermesGrpc, HermesGrpcError, BASE_ENDPOINT } from '@hermers/grpc';

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

| API | Signature | Behavior |
| --- | --- | --- |
| `ready()` | `(): Promise<Identity>` | Awaits `SessionService.Whoami` |
| `whoami()` | `(): Promise<Identity>` | Cached after first success |
| `me` | `Identity \| undefined` | Sync snapshot |

```ts
interface Identity {
  hex?: string;
  user: string;
  tenant: string;
  owner?: boolean;
  scopes?: string[];
  deny?: string[];
  tier?: string;
  raw?: Session; // full proto Session
}
```

Resource methods that need tenant/owner call `requireTenant()` / `requireUser()` internally — callers never pass those hex fields.

See [Session](services/session.md) and [Types](../types/index.md).

## Resources

| Property | Proto service | Docs |
| --- | --- | --- |
| `contacts` | `hermes.contact.ContactService` | [Contact](services/contact.md) |
| `mail` | `hermes.mail.MailService` | [Mail](services/mail.md) |
| `feeds` | `hermes.feeds.FeedService` | [Feed](services/feed.md) |
| `storage` | `hermes.storage.StorageService` | [Storage](services/storage.md) |
| `sync` | `hermes.sync.SyncService` | [Sync](services/sync.md) |
| `security` | `hermes.security.SecurityService` | [Security](services/security.md) |
| `spam` | `hermes.spam.SpamService` | [Spam](services/spam.md) |
| `tier` | `hermes.tier.TierService` | [Tier](services/tier.md) |
| `usage` | `hermes.usage.Usageervice` | [Usage](services/usage.md) |
| `session` | `hermes.session.SessionService` | [Session](services/session.md) |

Login / Issue / Refresh / Patch RPCs exist on the server but are **not** exposed.

## Errors

```ts
class HermesGrpcError extends Error {
  code: string;       // e.g. UNAUTHENTICATED
  grpcCode?: number;
  details?: string;
  metadata?: Metadata;
}
```

## Regenerating stubs

From `sdks/ts` (requires monorepo `proto/` and `protoc`):

```bash
npm run generate
```

## See also

- [Session](services/session.md) · [Contact](services/contact.md) · [Mail](services/mail.md)
- Package README: [`packages/grpc/README.md`](../../packages/grpc/README.md)
