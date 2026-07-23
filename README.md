# Hermes SDK Monorepo

One SDK, two transports: HTTP (JSON) and gRPC (proto3).

## Packages

| Package | Transport | Description |
| --- | --- | --- |
| `@hermers/sdk` | HTTP / JSON | Base URL `https://hermers.aduki.pro/v1` |
| `@hermers/grpc` | gRPC | Endpoint `https://hermers.aduki.pro` |

## Installation

```bash
npm install @hermers/sdk @hermers/grpc
```

## Quickstart

### HTTP Client (`@hermers/sdk`)

```ts
import { Auth, Tenant, Mail, Contacts, Calendar, Events, Scheduling } from '@hermers/sdk';

// Initialize HTTP client
const client = new Client({ key: 'hm_live_xxxxxxxxxxxxxxxxxxxxxxxx' });

// Use services
const mail = new Mail(client);
const inbox = await mail.inbox();
```

### gRPC Client (`@hermers/grpc`)

```ts
import { SessionService, MailService, ContactService } from '@hermers/grpc';

// Grouped aliases also available:
import { Mail, Storage, Sync } from '@hermers/grpc';

const client = new Client({ key: 'hm_live_xxxxxxxxxxxxxxxxxxxxxxxx' });
const session = new SessionService(client);
```

## Repository Scripts

```bash
npm run build     # Build all packages in packages/*
npm run typecheck # Run TypeScript type checking
```
