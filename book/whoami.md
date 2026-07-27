# Whoami

Both SDKs resolve identity with **whoami** on construct and cache it. Prefer `await client.ready()` before the first resource call.

## REST (`@hermers/sdk`)

```http
GET /v1/auth/whoami
Authorization: Key hm_live_…
```

```ts
import Hermes from '@hermers/sdk';

const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await hermes.ready(); // GET /auth/whoami

console.log(hermes.me?.tenant, hermes.me?.user, hermes.me?.owner);
```

Resource methods never take tenant/user hex — they use the cached identity.

See [Authentication & API keys](sdk/services/auth.md) and the [Session](grpc/services/session.md) client docs for SDK usage.

## gRPC (`@hermers/grpc`)

```ts
import { HermesGrpc } from '@hermers/grpc';

const client = new HermesGrpc('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await client.ready(); // SessionService.Whoami

console.log(client.me?.tenant, client.me?.user);
client.close();
```

Metadata: `authorization: Key hm_live_…`. See [Session](grpc/services/session.md).

## Example fixtures

JSON samples (owner vs member, REST vs gRPC) live in the Hermes monorepo under `sdk/whoami/` (mirrored in this repo at `guide/whoami/` for the server protocol tree — not part of this developer book):

| File | Role |
| --- | --- |
| `owner.api.json` | Owner identity from REST whoami |
| `member.api.json` | Member identity from REST whoami |
| `owner.grpc.json` | Owner identity from gRPC Whoami |
| `member.grpc.json` | Member identity from gRPC Whoami |

## Auth model

**API key only** in the published SDKs. There is no login, password, or JWT refresh helper in `@hermers/sdk` or `@hermers/grpc`. Browser/admin `POST /auth/login` exists on the HTTP API for UIs only — not wrapped by these packages.
