# `@hermers/sdk`

Official Hermes HTTP client for Node.js & TypeScript.

## Install

```bash
npm install @hermers/sdk
```

## Usage

```ts
import { Client, Auth, Tenant, User, Mail, Contacts, Calendar, Events, Feeds, Scheduling } from '@hermers/sdk';

const client = new Client({ key: 'hm_live_xxxxxxxxxxxxxxxxxxxxxxxx' });

const auth = new Auth(client);
const tenant = new Tenant(client);
const mail = new Mail(client);
```

## Features

- Complete coverage of all Hermes HTTP REST endpoints
- Data validators for dates (UTC ISO-8601), hex IDs, emails, and pagination parameters
- Automatic authorization header injection (`Key ...` or `Bearer ...`)
- Idempotency key support and structured error handling
