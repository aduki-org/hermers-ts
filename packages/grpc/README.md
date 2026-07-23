# `@hermers/grpc`

Official Hermes gRPC-Web client package for Node.js and TypeScript.

## Installation

```bash
npm install @hermers/grpc
```

---

## Quickstart

Initialize a single root gRPC client instance passing your API key string:

```ts
import HermesGrpc from '@hermers/grpc';

// Initialize single root gRPC client (Default endpoint: http://hermers.aduki.pro:8444)
const grpc = new HermesGrpc('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');

// Auto-fills tenant & owner parameters from cached identity when omitted:
const mailboxes = await grpc.mail.listMailboxes();
const blob = await grpc.storage.put({ key: 'document.pdf', data: pdfBuffer });
const usage = await grpc.usage.incr({ metric: 'sends' });
const identity = await grpc.whoami();
```

---

## Services Overview

| Service | Property | gRPC Package | Description |
|---|---|---|---|
| `SessionService` | `grpc.session` | `hermes.session` | Session issue, refresh, load, revoke, patch, whoami |
| `MailService` | `grpc.mail` | `hermes.mail` | Mailboxes, messages, send, move, flags, expunge |
| `ContactService` | `grpc.contact` | `hermes.contact` | CardDAV contacts & sync |
| `FeedService` | `grpc.feed` | `hermes.feeds` | External calendar feeds & integrations |
| `SecurityService` | `grpc.security` | `hermes.security` | Domain security protocol status checks |
| `SpamService` | `grpc.spam` | `hermes.spam` | Spam classification & user reporting |
| `StorageService` | `grpc.storage` | `hermes.storage` | Binary blob upload & streaming download |
| `SyncService` | `grpc.sync` | `hermes.sync` | Delta sync for contacts and mailboxes |
| `TierService` | `grpc.tier` | `hermes.tier` | Subscription tier limits & plan changes |
| `UsageService` | `grpc.usage` | `hermes.usage` | Real-time metric increments, checks & resets |

---

## Features

- **Eager Identity Fetching**: Automatically resolves `whoami()` on construction to auto-fill omitted `tenant` and `owner` parameters across service calls.
- **Port 8444 Plaintext HTTP/2**: Connected directly to `http://hermers.aduki.pro:8444`.
- **Zero Third-Party Transport Overhead**: Light, high-performance fetch-based gRPC-Web transport.
