# `@hermers/grpc`

Official Hermes gRPC client for Node.js & TypeScript.

## Install

```bash
npm install @hermers/grpc
```

## Usage

```ts
import { Client, SessionService, MailService, ContactService, FeedService, SecurityService, SpamService, StorageService, SyncService, TierService } from '@hermers/grpc';

// Short alias imports
import { Session, Mail, Contact, Feed, Security, Spam, Storage, Sync, Tier } from '@hermers/grpc';

const client = new Client({ key: 'hm_live_xxxxxxxxxxxxxxxxxxxxxxxx' });

const mail = new MailService(client);
```

## Features

- Zero external third-party transport dependencies
- Complete gRPC service method coverage (`Session`, `Mail`, `Contact`, `Feed`, `Security`, `Spam`, `Storage`, `Sync`, `Tier`)
- Integrated payload data validation for timestamps, hex IDs, emails, and byte buffers
