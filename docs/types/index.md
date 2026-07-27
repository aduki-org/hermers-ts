# Types & enums

Shapes below are taken from Hermes **API / DB Serialize types** (`crates/api`, `crates/db`, `crates/core`). The TypeScript SDK may use looser or renamed fields — prefer these wire shapes when reading responses.

Timestamps serialize as naive datetime strings (`"2026-07-28T12:00:00"`). Enums use `#[serde(rename_all = "lowercase")]`.

## Identity (whoami)

**Handler:** `crates/api/src/handlers/auth/whoami.rs` (ad-hoc `json!`).

| Field | JSON type | Notes |
| --- | --- | --- |
| `hex` | string | Session JTI |
| `user` | string | **User hex**, not an object |
| `tenant` | string | **Tenant hex**, not an object |
| `owner` | boolean | |
| `scopes` | string[] | Flattened as `"domain.scope"` |
| `deny` | string[] | Same flattening |
| `tier` | string | Plan slug |
| `ip` | string | Always `""` today |
| `agent` | string | Always `""` today |

Both SDKs cache this as `Identity` (`user` / `tenant` required). gRPC Whoami returns a proto `Session` with the same logical fields plus optional timestamps.

## Page envelope

**Type:** `main::Page<T>` — `crates/core/src/page.rs`

| Field | Type | When present |
| --- | --- | --- |
| `items` | `T[]` | always |
| `total` | number (i64) | always |
| `next` | string | cursor mode only (last item `hex`) |
| `page` | number | page mode only |
| `pages` | number | page mode only |

### Query (`PageRequest`)

| Field | Type | Notes |
| --- | --- | --- |
| `after` | string? | cursor |
| `page` | number? | if set → page mode |
| `limit` | number? | default 50, max 200 |

List SQL views often also put `total` on **each row** (window count).

## REST error envelope

**Type:** `crates/api/src/error.rs`

```json
{ "error": "forbidden", "message": "missing scope contacts:write" }
```

| Field | Type | Description |
| --- | --- | --- |
| `error` | string | Code: `not_found`, `unauthorized`, `forbidden`, `conflict`, `over_limit`, `validation`, `database`, `storage`, `kafka`, `internal` |
| `message` | string | Human-readable detail |

HTTP status: 404 / 401 / 403 / 409 / 429 / 422 / 500. There is **no** nested `{ error: { code, message } }` and no `field` / `request_id` in the API crate today.

`@hermers/sdk` throws `HermesError` after parsing this body. `@hermers/grpc` throws `HermesGrpcError` with gRPC status names.

## Contacts (REST)

### List row — `db::views::dav::contacts::Contacts`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` | string | no |
| `etag` | string | no |
| `name` | string | yes |
| `emails` | (string\|null)[] | no |
| `phones` | (string\|null)[] | no |
| `groups` | (string\|null)[] | no |
| `created` | datetime | no |
| `total` | number | no |

### Create response — `db::models::dav::contacts::Contact`

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` | string | no |
| `tenant` | string | no |
| `user` | string | no |
| `etag` | string | no |
| `vcard` | string | no |
| `name` | string | yes |
| `emails` / `phones` / `groups` | (string\|null)[] | no |
| `meta` | object | no |
| `book` / `href` / `uid` / `version` | string | yes |
| `size` | number | yes |
| `deleted` | datetime | yes |
| `created` / `updated` | datetime | no |

There is **no** `GET /user/contacts/{hex}` route. `ContactDetail` exists in DB views but is unused by HTTP.

Patch / delete handlers return JSON `null` (`Json(())`).

## Mail (REST)

### List message — `Messages`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` | string | no |
| `uid` | number | no |
| `subject` / `sender` / `thread` | string | yes |
| `size` | number | no |
| `flags` | (string\|null)[] | no |
| `spam` | number | yes |
| `internaldate` | datetime | no — **not** `date` |
| `mailbox` | `{ hex, name }` | no |
| `total` | number | no |

### Message detail view — `MessageDetail` (DB; no HTTP GET-by-hex today)

Adds `structure?`, `modseq`, `created`, `blob: { hex, size, mime }`. List endpoints do not return this shape. Routes expose inbox/sent/… lists, send, flags, and delete — **not** `GET /user/mail/{hex}`.

### Thread — `Threads`

| Field | Type |
| --- | --- |
| `thread` | string |
| `subject` | string? |
| `count` / `unread` / `total` | number |
| `latest` | datetime |
| `mailbox` | `{ hex, name }` |

### Mailbox list — `Mailboxes`

| Field | Type |
| --- | --- |
| `hex` / `name` / `delimiter` | string |
| `flags` | (string\|null)[] |
| `uidvalidity` / `uidnext` / `messages` / `unread` / `total` | number |
| `created` | datetime |

List rows do **not** include `size` (that is on `MailboxDetail` / create model).

## User (REST)

### `GET /user` — full `User` model

Password is skipped by serde.

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `email` / `name` | string | no |
| `phone` / `bio` / `avatar` / `totp` | string | yes |
| `owner` | boolean | no |
| `state` | `"active"\|"suspended"\|"pending"\|"deleted"` | no |
| `timezone` / `locale` | string | no |
| `contacts` | object | yes |
| `meta` | object | no |
| `last` | datetime | yes |
| `created` / `updated` | datetime | no |

### `UserProfile` (POST `/user/lookup/profile` only)

Adds nested:

```json
"tenant": { "hex", "name", "slug", "plan", "kind" },
"role": { "hex", "label", "owner", "privileges", "kind" } | {}
```

Plus `bio`, `owner`, `timezone`, `locale`, `last` — no `id` / `meta` / `totp`.

## Preferences

Full `Preference` model on every preference PATCH response:

| Field | Type |
| --- | --- |
| `id` | number |
| `hex` / `user` | string |
| `language` / `timezone` / `currency` | string |
| `theme` | `"light"\|"dark"\|"auto"` |
| `notifications` / `communication` / `privacy` / `display` / `regional` | object (freeform jsonb) |
| `created` / `updated` | datetime |

Only `/user/preferences/info` has a typed body: `{ language, timezone, currency, theme }`. Other sections accept **any JSON object** (size/depth validated).

## Tenant, members, invitations

### `TenantProfile`

`hex`, `kind` (`personal`\|`team`), `name`, `slug`, `plan` (`free`…`enterprise`), `state`, `domain?`, `customer?`, `subscription?`, `trial?`, `meta`, `created`, `users`, `domains`, `storage`.

### `Members` nested

```json
"tenant": { "hex", "name", "slug" },
"role": { "label", "kind" } | {}
```

### `Invitations` list

| Field | Type |
| --- | --- |
| `hex` / `email` / `label` / `status` | string (`pending`\|`accepted`\|`rejected`\|`expired`) |
| `expires` / `created` | datetime |
| `inviter` | `{ hex, name, email }` |
| `total` | number |

Detail adds `privileges`, `message?`, `tenant: { hex, name, slug }`.

## Keys list — `Keys`

| Field | Type |
| --- | --- |
| `hex` / `name` / `prefix` | string |
| `active` | boolean |
| `expires` / `last` | datetime? |
| `created` | datetime |
| `tenant` | `{ hex, name }` |
| `user` | `{ hex, name, email }` \| null |
| `total` | number |

Detail adds `scopes` (jsonb). Create HTTP response is `{ "hex": "…" }` only; the SDK returns `{ hex, key }` by keeping the raw secret client-side.

## Calendar / events / feeds

### Calendar list — `Calendars`

`hex`, `name`, `description?`, `color?`, `timezone`, `created`, `total`

Create response: `{ hex, etag, sync_token }`

### Event list — `Events`

`hex`, `uid`, `start?`, `end?`, `created`, `total`

Create/update response: `{ hex, etag, uid }`

### Feed model (HTTP returns diesel model)

`id`, `hex`, `tenant`, `user`, `connection`, `remote`, `name`, `color?`, `block`, `sync?`, `active`, `meta`, `last?`, `created`, `updated`

## Scheduling

### `Service` model

Includes `id`, `hex`, `tenant`, `user`, `name`, `slug`, `description?`, `duration`, `buffer`, `notice`, `horizon`, `increment`, `max?`, `location` (object), `questions` (json), `active`, `meta`, `created`, `updated`.

### `Appointment` model

`status`: `pending`\|`confirmed`\|`cancelled`\|`completed`\|`noshow`.

### `Window` model

Not `{ day, start, end }` — full model: `id`, `hex`, `tenant`, `user`, `name`, `timezone`, `priority`, `start?`, `end?`, `busytype`, `rrule?`, `slots` (json), `active`, `meta`, `created`, `updated`.

### `Override` model

`id`, `hex`, `tenant`, `user`, `window?`, `start`, `end`, `available`, `reason?`, `created` — date range, not a single `date` field.

### Availability

```json
{
  "slots": [{ "start": "…", "end": "…" }],
  "busy": [{ "start": "…", "end": "…", "title": null }]
}
```

### Public book response

```json
{ "appointment": { /* Appointment */ }, "guest": { /* Guest */ } }
```

(Not `appt`.)

## gRPC enums (from proto / ts-proto)

```ts
enum Flag { FLAG_SEEN=0, FLAG_ANSWERED=1, FLAG_FLAGGED=2, FLAG_DELETED=3, FLAG_DRAFT=4 } // MailFlag
enum Verdict { CLEAN=0, SPAM=1, BULK=2 } // SpamVerdict
enum Plan { FREE=0, STARTER=1, PRO=2, BUSINESS=3, ENTERPRISE=4 } // TierPlan
```

See per-service gRPC pages for message field tables.

## REST vs gRPC (intentional differences)

Do **not** share one TypeScript interface across transports. Examples:

| Area | REST (`@hermers/sdk`) | gRPC (`@hermers/grpc`) |
| --- | --- | --- |
| Contact get-by-hex | **no route** | `Get` → proto `Contact` |
| Contact create | body needs `name`+`vcard`+`meta`; returns diesel model | body `vcard` only; returns proto `Contact` |
| Message list | `internaldate`, `sender`, `mailbox:{hex,name}` | N/A list shape; GetMessage uses `date`, `from`, `flags:Flag[]` |
| Message get | **no route** | `GetMessage` exists |
| Feed | diesel model (`id`, `meta`, `sync`, …) | proto `Feed` (no `id`/`meta`) |
| Security status | `policy` / `records` objects | `policyJson` / `recordsJson` strings |
| Whoami | flat JSON + empty `ip`/`agent` | proto `Session` (+ timestamps) |
| Errors | `{ error, message }` JSON | `HermesGrpcError` status codes |
