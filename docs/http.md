# HTTP Client Guide (`@hermers/sdk`)

Complete usage guide for `@hermers/sdk`.

## Client Options

```ts
import { Client } from '@hermers/sdk';

const client = new Client({
  key: 'hm_live_xxxxxxxxxxxxxxxxxxxxxxxx', // API Key
  token: 'jwt_token_string'                // JWT Bearer Token
});
```

Base URL: `https://hermers.aduki.pro/v1` (built-in constant `BASE_URL`).

## Service Modules

### `Auth`

Authentication endpoints.

- `login(credentials)`: Authenticate with email and password (`POST /auth/login`).
- `refresh(token)`: Refresh JWT token (`POST /auth/refresh`).
- `logout()`: Invalidate active session (`POST /auth/logout`).
- `sessions(query?)`: List active user sessions (`GET /auth/sessions`).

### `Tenant`

Tenant and administration endpoints.

- `create(data)`: Create tenant (`POST /tenants`).
- `accept(data)`: Accept tenant invitation (`POST /tenants/accept`).
- `get()`: Get current tenant profile (`GET /tenant`).
- `update(data)`: Update tenant profile (`PATCH /tenant/edit`).
- `promote()`: Promote user to owner (`POST /tenant/promote`).
- `view(hex)`: View tenant by hex ID (`GET /tenant/view/{hex}`).
- `slug(slug)`: View tenant by slug (`GET /tenant/view/slug/{slug}`).
- `members(query?)`: List members (`GET /tenant/members`).
- `domains(query?)`: List domain names (`GET /tenant/domains`).
- `quotas(query?)`: List tenant quotas (`GET /tenant/quotas`).
- `rules(query?)`: List spam/routing rules (`GET /tenant/rules`).
- `webhooks(query?)`: List webhooks (`GET /tenant/webhooks`).
- `security()`: Fetch security records (`GET /tenant/security`).
- `usage(query?)`: Fetch usage metrics (`GET /tenant/usage`).

### `User`

User profile and preferences.

- `get()`: Get current user profile (`GET /user`).
- `email(email)`: Lookup profile by email (`POST /user/lookup/email`).
- `info(data)`: Update user name info (`PATCH /user/info`).
- `setemail(email)`: Update user email (`PATCH /user/email`).
- `password(password)`: Change password (`PATCH /user/password`).
- `audits()`: List user audit logs (`GET /user/audits`).
- `keys()`: List API keys (`GET /user/keys`).
- `prefinfo(data)` / `prefnotifications(data)` / `prefprivacy(data)`: Update user preferences.

### `Mail`

Mail and mailbox endpoints.

- `send(data)`: Send an email message (`POST /user/mail/send`).
- `inbox(query?)`: List inbox messages (`GET /user/mail/inbox`).
- `unread()` / `flagged()` / `attachments()` / `starred()` / `spam()`: Filtered message views.
- `threads(query?)`: List email threads (`GET /user/mail/threads`).
- `get(hex)`: Fetch full message detail (`GET /user/mail/{hex}`).
- `remove(hex)`: Delete a message (`DELETE /user/mail/{hex}`).
- `flags(hex, data)`: Modify message flags (`PATCH /user/mail/{hex}/flags`).
- `mailboxes(query?)`: List mailboxes (`GET /user/mailbox`).

### `Contacts`

Contacts management.

- `create(data)`: Create contact (`POST /user/contacts`).
- `list(query?)`: List contacts (`GET /user/contacts`).
- `group(group)`: Filter contacts by group (`GET /user/contacts/group/{group}`).
- `search(q)`: Search contacts (`GET /user/contacts/search/{q}`).
- `get(hex)`: Get contact detail (`GET /user/contacts/{hex}`).
- `remove(hex)`: Delete contact (`DELETE /user/contacts/{hex}`).

### `Calendar` & `Events`

Calendars and events.

- `Calendar.list(query?)`: List user calendars (`GET /user/calendars`).
- `Calendar.create(data)`: Create calendar (`POST /user/calendars`).
- `Events.list(query?)`: List events (`GET /user/events`).
- `Events.range(start, end)`: Query events by UTC date range (`GET /user/events/range/{start}/{end}`).
- `Events.create(data)`: Create new event (`POST /user/events`).

### `Scheduling`

Public booking and appointments.

- `view(slug)`: View public service (`GET /book/{slug}`).
- `book(slug, data)`: Book appointment (`POST /book/{slug}`).
- `guest(token)`: Fetch guest appointment details (`GET /book/guest/{token}`).
- `cancel(token)`: Cancel guest appointment (`POST /book/guest/{token}/cancel`).
- `appointments(query?)`: List user appointments (`GET /user/appointments`).
- `services()`: List user services (`GET /user/services`).
- `availability(start, end)`: Query availability (`GET /user/availability/{start}/{end}`).

## Data Validation Utilities (`data/`)

```ts
import { date, hex, email, pagination } from '@hermers/sdk';

const validDate = date('2026-04-28T14:00:00Z', 'start');
const validHex = hex('U0X123456', 'user', 'U0X');
const validEmail = email('user@domain.com', 'email');
const query = pagination({ limit: 50, page: 1 });
```
