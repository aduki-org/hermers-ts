# Hermes API guide (mirror)

Language-agnostic HTTP and gRPC reference shipped with the TypeScript SDK repo.
Canonical copy in the Hermes monorepo: `sdk/`.

## TypeScript clients

| Package | Default endpoint |
| --- | --- |
| [`@hermers/sdk`](../packages/sdk) | `https://hermers.aduki.pro/v1` |
| [`@hermers/grpc`](../packages/grpc) | `grpc.aduki.pro:443` |

Auth is **API key only** in the SDKs (`Authorization: Key …`). Whoami on construct; callers never pass tenant/user hex.

```ts
import Hermes from '@hermers/sdk';
const hermes = new Hermes('hm_live_…');
await hermes.ready();
```

Consumer guides: [docs/README.md](../docs/README.md). Package READMEs: [`@hermers/sdk`](../packages/sdk/README.md), [`@hermers/grpc`](../packages/grpc/README.md).

## Layout

| Path | Description |
| --- | --- |
| [`http/`](http/) | HTTP/JSON conventions and endpoints |
| [`http/user/`](http/user/) | User-scoped HTTP endpoints |
| [`grpc/`](grpc/) | gRPC services (`hermes.*`) |
| [`whoami/`](whoami/) | Example whoami JSON fixtures |

## Auth

SDK clients:

```http
Authorization: Key hm_live_…
```

Browser/admin sessions may use `Bearer` JWTs from `POST /auth/login` — **not** wrapped by `@hermers/*`.

Keys: `POST /tenant/keys` with client-side SHA-256 `hash` + `prefix`. See [`http/keys.md`](http/keys.md).

## Conventions

- Pagination: `Page<T>` (`items`, `total`, `next?`, `page?`, `pages?`)
- Dates: UTC ISO-8601
- IDs: opaque hex strings
- Errors: `{ error: { code, message, field?, request_id } }`
