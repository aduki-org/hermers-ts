# gRPC Client Guide (`@hermers/grpc`)

Comprehensive guide for `@hermers/grpc` gRPC-Web client library.

## Installation & Import

```bash
npm install @hermers/grpc
```

```ts
import HermesGrpc from '@hermers/grpc';

// Default export: root HermesGrpc client class
const grpc = new HermesGrpc('534f5dba59db47c51c354b3a242ac55f485d32fc9fb5f713c7d17d396739d1fc');
```

---

## Transport & Server Details

- **Default Endpoint**: `http://hermers.aduki.pro:8444` (`BASE_ENDPOINT` constant).
- **Transport**: Plaintext HTTP/2 (`application/grpc-web+json`).
- **Authorization Metadata**: Transmitted as `authorization: Key <raw_api_key>` or `authorization: Bearer <jwt>`.
- **Eager `whoami()` Resolution**: Client triggers eager identity fetch on construction so `tenant` and `user`/`owner` fields are auto-filled when omitted in service methods.

---

## Service Properties & Mapped gRPC Packages

| Property | Service Class | gRPC Package | gRPC Service Name |
|---|---|---|---|
| `grpc.session` | `SessionService` | `hermes.session` | `SessionService` |
| `grpc.mail` | `MailService` | `hermes.mail` | `MailService` |
| `grpc.contact` | `ContactService` | `hermes.contact` | `ContactService` |
| `grpc.feed` | `FeedService` | `hermes.feeds` | `FeedService` |
| `grpc.security` | `SecurityService` | `hermes.security` | `SecurityService` |
| `grpc.spam` | `SpamService` | `hermes.spam` | `SpamService` |
| `grpc.storage` | `StorageService` | `hermes.storage` | `StorageService` |
| `grpc.sync` | `SyncService` | `hermes.sync` | `SyncService` |
| `grpc.tier` | `TierService` | `hermes.tier` | `TierService` |
| `grpc.usage` | `UsageService` | `hermes.usage` | `UsageService` |

---

## Root Methods

### `whoami(): Promise<Identity>`

Executes `rpc Whoami` against `hermes.session.SessionService`.

- **Return Type:** `Promise<Identity>`

```ts
export interface Identity {
  user?: string;
  tenant?: string;
  email?: string;
  name?: string;
  owner?: boolean;
}
```
