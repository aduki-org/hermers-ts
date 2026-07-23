# `@hermers/sdk`

Official Hermes HTTP REST SDK client for Node.js and TypeScript.

## Installation

```bash
npm install @hermers/sdk
```

---

## Quickstart

Initialize a single root client instance passing your API key string:

```ts
import Hermes from '@hermers/sdk';

// Initialize single root client
const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');

// Access services directly as properties:
const profile = await hermes.user.get();
const mailboxes = await hermes.mail.mailboxes();
const contactList = await hermes.contacts.list();
const identity = await hermes.whoami();
```

---

## Services Overview

| Service | Property | Key Capabilities |
|---|---|---|
| `Auth` | `hermes.auth` | Login, identity resolution, token refresh |
| `Tenant` | `hermes.tenant` | Tenant profile, client-side SHA-256 API key generation (`createkey`), members, domains, webhooks |
| `User` | `hermes.user` | User profile, preferences, active session list |
| `Mail` | `hermes.mail` | Mailbox list, inbox messages, thread details, message send & move |
| `Contacts` | `hermes.contacts` | CardDAV contact cards & groups |
| `Calendar` | `hermes.calendar` | CalDAV calendar collections |
| `Events` | `hermes.events` | iCalendar event objects & scheduling |
| `Scheduling` | `hermes.scheduling` | Public booking services, appointments, availability slots |

---

## Features

- **Client-Side SHA-256 Key Hashing**: `Tenant.createkey()` generates a raw API key, computes SHA-256 hash & prefix locally, registers with the server, and returns `{ hex, key }`.
- **Identity Auto-Filling**: Built-in `whoami()` caching auto-fills tenant and user context.
- **Full Type Safety**: Clean 1-word direct service exports and complete DTO typings.
