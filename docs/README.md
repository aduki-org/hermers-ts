# Hermes Platform SDK Documentation

Official Node.js & TypeScript SDK monorepo for Hermes platform services.

## Packages

- **`@hermers/sdk`**: Client library wrapping HTTP REST JSON APIs (`https://hermers.aduki.pro/v1`).
- **`@hermers/grpc`**: Client library wrapping proto3 gRPC-Web APIs (`http://hermers.aduki.pro:8444`).

## Installation

```bash
npm install @hermers/sdk @hermers/grpc
```

---

## Single Root Client Initialization (Stripe/Square Style)

Both SDK packages export a single root client class initialized with your API key:

### HTTP Client (`@hermers/sdk`)

```ts
import Hermes from '@hermers/sdk';

// Initialize single root client with API key string
const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');

// Access services directly as properties:
const profile = await hermes.user.get();
const mailboxes = await hermes.mail.mailboxes();
const identity = await hermes.whoami();
```

### gRPC Client (`@hermers/grpc`)

```ts
import HermesGrpc from '@hermers/grpc';

// Initialize single root gRPC client with API key string
const grpc = new HermesGrpc('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');

// Access services directly as properties with auto-filled tenant & owner:
const mailboxes = await grpc.mail.listMailboxes();
const storage = await grpc.storage.put({ key: 'file.txt', data: new Uint8Array([1, 2, 3]) });
const identity = await grpc.whoami();
```

---

## Documentation Navigation

### 1. HTTP SDK (`@hermers/sdk`)
- [HTTP Overview & Configuration](file:///home/femar/A10B/hermers/docs/sdk/index.md)
- [Auth Service](file:///home/femar/A10B/hermers/docs/sdk/services/auth.md)
- [Tenant Service](file:///home/femar/A10B/hermers/docs/sdk/services/tenant.md)
- [User Service](file:///home/femar/A10B/hermers/docs/sdk/services/user.md)
- [Mail Service](file:///home/femar/A10B/hermers/docs/sdk/services/mail.md)
- [Contacts Service](file:///home/femar/A10B/hermers/docs/sdk/services/contacts.md)
- [Calendar Service](file:///home/femar/A10B/hermers/docs/sdk/services/calendar.md)
- [Events Service](file:///home/femar/A10B/hermers/docs/sdk/services/events.md)
- [Scheduling Service](file:///home/femar/A10B/hermers/docs/sdk/services/scheduling.md)

### 2. gRPC Client (`@hermers/grpc`)
- [gRPC Overview & Configuration](file:///home/femar/A10B/hermers/docs/grpc/index.md)
- [Session Service](file:///home/femar/A10B/hermers/docs/grpc/services/session.md)
- [Mail Service](file:///home/femar/A10B/hermers/docs/grpc/services/mail.md)
- [Contact Service](file:///home/femar/A10B/hermers/docs/grpc/services/contact.md)
- [Feed Service](file:///home/femar/A10B/hermers/docs/grpc/services/feed.md)
- [Security Service](file:///home/femar/A10B/hermers/docs/grpc/services/security.md)
- [Spam Service](file:///home/femar/A10B/hermers/docs/grpc/services/spam.md)
- [Storage Service](file:///home/femar/A10B/hermers/docs/grpc/services/storage.md)
- [Sync Service](file:///home/femar/A10B/hermers/docs/grpc/services/sync.md)
- [Tier Service](file:///home/femar/A10B/hermers/docs/grpc/services/tier.md)
- [Usage Service](file:///home/femar/A10B/hermers/docs/grpc/services/usage.md)

### 3. Data Models & Types
- [Type Reference & Enums](file:///home/femar/A10B/hermers/docs/types/index.md)
