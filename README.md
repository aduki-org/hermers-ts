# Hermes SDK Monorepo (`@hermers/sdk` & `@hermers/grpc`)

Official Node.js & TypeScript SDK client libraries for Hermes platform services. Provides dual transport options adhering to modern developer ergonomics and high-performance communication.

## Packages

| Package | Transport | Base Endpoint | Description |
|---|---|---|---|
| [`@hermers/sdk`](file:///home/femar/A10B/hermers/packages/sdk) | HTTP / JSON | `https://hermers.aduki.pro/v1` | Official HTTP REST SDK |
| [`@hermers/grpc`](file:///home/femar/A10B/hermers/packages/grpc) | gRPC-Web | `http://hermers.aduki.pro:8444` | High-performance gRPC client |

---

## Installation

```bash
# Install HTTP SDK
npm install @hermers/sdk

# Install gRPC Client
npm install @hermers/grpc
```

---

## Developer Ergonomics

### Single Root Client Pattern (Stripe/Square Style)

Initialize a single root client passing your API key string. All services are attached directly as properties, with `whoami()` identity caching automatically filling required `tenant` and `user`/`owner` parameters when omitted:

#### HTTP SDK (`@hermers/sdk`)

```ts
import Hermes from '@hermers/sdk';

// Initialize single root client instance with API Key
const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');

// Access services directly as properties:
const profile = await hermes.user.get();
const mailboxes = await hermes.mail.mailboxes();
const contactList = await hermes.contacts.list();
const identity = await hermes.whoami();
```

#### gRPC Client (`@hermers/grpc`)

```ts
import HermesGrpc from '@hermers/grpc';

// Initialize single root gRPC client instance with API Key
const grpc = new HermesGrpc('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');

// Auto-fills tenant & owner parameters from identity cache when omitted:
const mailboxes = await grpc.mail.listMailboxes();
const blob = await grpc.storage.put({ key: 'file.txt', data: new Uint8Array([1, 2, 3]) });
const usage = await grpc.usage.incr({ metric: 'sends' });
```

---

## Feature Highlights

- **Client-Side SHA-256 Key Hashing**: `Tenant.createkey()` generates a raw API key string, computes SHA-256 hash & prefix locally, registers with the server, and returns the raw key securely.
- **Identity Auto-Filling**: Lazily or eagerly fetches `whoami()` identity to auto-fill `tenant` and `owner` parameters across service calls when omitted.
- **Full Type Safety**: Complete TypeScript typings and interfaces exported for all DTOs and Enums (`Flag`, `Verdict`, `Plan`).

---

## Repository Scripts

```bash
npm run build     # Build all packages via TypeScript project references
npm test          # Run full automated unit test suite (25 suites)
```

---

## Documentation

Full API documentation, service guides, and type references are available in the [`docs/`](file:///home/femar/A10B/hermers/docs/README.md) directory.
