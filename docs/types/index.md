# Types & enums

Shared shapes used by `@hermers/sdk` and `@hermers/grpc`. Prefer TypeScript types exported from each package over copying these snippets.

## Identity (both clients)

Cached on `client.me` after `ready()` / `whoami()`. Built from REST `GET /auth/whoami` or gRPC `SessionService.Whoami`.

```ts
interface Identity {
  hex?: string;      // session / JTI
  user: string;      // user hex (U0X…)
  tenant: string;    // tenant hex (T0X…)
  owner?: boolean;   // true if key/session is a tenant owner
  scopes?: string[]; // granted permission patterns
  deny?: string[];   // denied permission patterns
  tier?: string;     // plan slug, e.g. "free"
  email?: string;    // present on some REST responses
  name?: string;     // present on some REST responses
  raw?: unknown;     // REST: full whoami JSON; gRPC: Session message
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hex` | `string` | no | Session / JTI identifier (`A0S…`) |
| `user` | `string` | yes | Authenticated user hex |
| `tenant` | `string` | yes | Authenticated tenant hex |
| `owner` | `boolean` | no | Owner vs member |
| `scopes` | `string[]` | no | Allow-list of scope patterns |
| `deny` | `string[]` | no | Deny-list of scope patterns |
| `tier` | `string` | no | Billing / plan tier slug |
| `email` | `string` | no | REST only when returned by API |
| `name` | `string` | no | REST only when returned by API |
| `raw` | `unknown` / `Session` | no | Original wire payload |

Resource methods never accept tenant/user hex from callers — they read `user` / `tenant` from this cache.

### Example (owner, REST)

```json
{
  "hex": "A0S1C3905B195668274E",
  "user": "U0X3BFF58E91EC7",
  "tenant": "T0X9E68DD4B15C6",
  "owner": true,
  "scopes": ["user.user.**", "tenant.tenant.**"],
  "deny": [],
  "tier": "free",
  "ip": "",
  "agent": ""
}
```

Wire whoami may also include `ip` / `agent` (stored under `raw`, not promoted on the Identity interface for gRPC).

## Page envelope (REST)

List endpoints return a page envelope:

```ts
interface Page<T> {
  items: T[];
  total: number;
  next?: string;   // cursor for next page (hex)
  page?: number;   // 1-based page when using page/limit
  pages?: number;  // total pages when using page/limit
}
```

### List query

```ts
type ListQuery = {
  after?: string;  // cursor hex
  limit?: number;
  page?: number;
  group?: string;
  search?: string;
};
```

## REST resource types (`@hermers/sdk`)

Exported from `@hermers/sdk` (`export type * from './types'`).

### Contact / ContactDetail

| Field | Type | Notes |
| --- | --- | --- |
| `hex` | `string` | Contact id |
| `etag` | `string` | Concurrency token |
| `name` | `string?` | Display name |
| `emails` | `string[]?` | |
| `phones` | `string[]?` | |
| `groups` | `string[]?` | |
| `created` | `string` | ISO-8601 |
| `total` | `number?` | Present on list rows |
| `vcard` | `string?` | Detail only |
| `meta` | `Record<string, unknown>?` | Detail only |
| `user` | `object?` | Detail only |

### Message / MessageDetail

| Field | Type | Notes |
| --- | --- | --- |
| `hex` | `string` | Message id |
| `uid` | `number` | IMAP UID |
| `subject` | `string?` | |
| `sender` | `string?` | |
| `size` | `number` | Bytes |
| `flags` | `string[]?` | e.g. `\Seen` |
| `thread` | `string?` | Thread id |
| `spam` | `number?` | Score |
| `date` | `string` | ISO-8601 |
| `mailbox` | `object` | Nested mailbox summary |
| `blob` | `string?` | Detail: blob hex |
| `structure` | `object?` | Detail: MIME structure |

### Mailbox

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `name` | `string` |
| `delimiter` | `string` |
| `flags` | `string[]?` |
| `uidvalidity` | `number` |
| `uidnext` | `number` |
| `messages` | `number` |
| `unread` | `number` |
| `size` | `number` |
| `created` | `string` |

### Thread

| Field | Type |
| --- | --- |
| `thread` | `string` |
| `subject` | `string?` |
| `count` | `number` |
| `unread` | `number` |
| `latest` | `string` |
| `mailbox` | `object` |

### UserProfile

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `email` | `string` |
| `name` | `string` |
| `phone` | `string?` |
| `avatar` | `string?` |
| `state` | `string?` |
| `totp` | `boolean?` |
| `meta` | `object?` |
| `created` | `string` |

### TenantProfile

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `kind` | `string` |
| `name` | `string` |
| `slug` | `string` |
| `plan` | `string` |
| `state` | `string` |
| `domain` | `string?` |
| `customer` | `string?` |
| `subscription` | `string?` |
| `trial` | `string?` |
| `meta` | `object?` |
| `created` | `string` |
| `users` | `number` |
| `domains` | `number` |
| `storage` | `number` |

### ApiKey

| Field | Type | Notes |
| --- | --- | --- |
| `hex` | `string` | Key id |
| `name` | `string` | Label |
| `prefix` | `string?` | First chars of raw key |
| `key` | `string?` | Raw secret — only on create path via SDK return |
| `scopes` | `string[]` | |
| `active` | `boolean?` | |
| `expires` | `string?` | |
| `last` | `string?` | Last used |
| `created` | `string` | |

### Other REST types

Also exported: `Member`, `Domain`, `Invitation`, `Quota`, `Rule`, `RuleDetail`, `Webhook`, `WebhookDetail`, `Audit`, `Usage`, `Security`, `PreferenceDetail`, `Calendar`, `Event`, `Service`, `Appointment`, `Guest`, `Window`, `Override`, `Availability`, `Feed`, `Session`, `TenantSummary`.

## Mail flags (gRPC)

```ts
enum Flag {
  FLAG_SEEN = 0,
  FLAG_ANSWERED = 1,
  FLAG_FLAGGED = 2,
  FLAG_DELETED = 3,
  FLAG_DRAFT = 4,
}
```

Exported as `MailFlag` from `@hermers/grpc`.

## Spam verdict (gRPC)

```ts
enum Verdict {
  CLEAN = 0,
  SPAM = 1,
  BULK = 2,
}
```

Exported as `SpamVerdict` from `@hermers/grpc`.

## Tier plan (gRPC)

```ts
enum Plan {
  FREE = 0,
  STARTER = 1,
  PRO = 2,
  BUSINESS = 3,
  ENTERPRISE = 4,
}
```

Exported as `TierPlan` from `@hermers/grpc`.

## Errors

### REST — `HermesError`

Thrown for non-2xx responses and some client-side failures.

| Property | Type | Description |
| --- | --- | --- |
| `message` | `string` | Human-readable error |
| `status` | `number` | HTTP status (`0` for network / client errors) |
| `code` | `string` | API code or `http_error` / `network_error` / `invalid_api_key` / `invalid_identity` |
| `field` | `string?` | Field that failed validation |
| `requestId` | `string?` | From `error.request_id` or `error.request` |
| `body` | `unknown?` | Parsed response body |

Wire envelope:

```json
{
  "error": {
    "code": "forbidden",
    "message": "missing scope contacts:write",
    "field": null,
    "request_id": "…"
  }
}
```

```ts
try {
  await hermes.contacts.create({ vcard: '…' });
} catch (e) {
  if (e instanceof HermesError) {
    console.error(e.status, e.code, e.message, e.requestId);
  }
}
```

### gRPC — `HermesGrpcError`

| Property | Type | Description |
| --- | --- | --- |
| `message` | `string` | Details or status name |
| `code` | `string` | gRPC status name (`UNAUTHENTICATED`, `PERMISSION_DENIED`, …) |
| `grpcCode` | `number?` | Numeric `@grpc/grpc-js` status |
| `details` | `string?` | Server details string |
| `metadata` | `Metadata?` | Trailing metadata |

There is **no** SDK `Token` type for login/refresh — API keys only.
