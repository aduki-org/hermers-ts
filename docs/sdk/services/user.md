# User (`hermes.user`)

Authenticated user under `/user`.

**Sources:** `crates/api/src/handlers/tenant/user/{view,edit,preferences,sessions,audits}.rs`, `crates/db/src/models/platform/{users,preferences}.rs`, `crates/db/src/views/platform/users.rs`, `crates/db/src/views/auth/{sessions,audits}.rs`.

```ts
const user = await hermes.user.retrieve(); // full User model from GET /user
await hermes.user.updateInfo({ name: 'Ada', bio: '' }); // API requires both name + bio
```

## Profile

| SDK | HTTP | Returns |
| --- | --- | --- |
| `retrieve()` | `GET /user` | **`User` model** (not the profile view) |
| `lookupByEmail(email)` | `POST /user/lookup/email` `{ email }` | `User` model |
| — | `POST /user/lookup/profile` `{ hex }` | `UserProfile` view |

### `User` (`GET /user`)

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` | string | no |
| `tenant` | string | no — tenant **hex** |
| `email` / `name` | string | no |
| `phone` / `bio` / `avatar` / `totp` | string | yes |
| `owner` | boolean | no |
| `state` | `"active"\|"suspended"\|"pending"\|"deleted"` | no |
| `timezone` / `locale` | string | no |
| `contacts` | object | yes |
| `meta` | object | no |
| `last` | datetime | yes |
| `created` / `updated` | datetime | no |

`password` is never serialized.

```json
{
  "id": 1,
  "hex": "U0X…",
  "tenant": "T0X…",
  "email": "ada@example.com",
  "phone": null,
  "name": "Ada",
  "bio": null,
  "avatar": null,
  "owner": true,
  "state": "active",
  "totp": null,
  "timezone": "Etc/UTC",
  "locale": "en",
  "contacts": null,
  "meta": {},
  "last": null,
  "created": "2026-01-01T00:00:00",
  "updated": "2026-01-01T00:00:00"
}
```

### `UserProfile` (lookup/profile only)

| Field | Type |
| --- | --- |
| `hex` / `email` / `name` / `state` / `timezone` / `locale` | string |
| `phone` / `bio` / `avatar` | string? |
| `owner` | boolean |
| `last` | datetime? |
| `created` | datetime |
| `tenant` | `{ hex, name, slug, plan, kind }` |
| `role` | `{ hex, label, owner, privileges, kind }` or `{}` |

## Edits

| SDK | HTTP body (API) | Returns |
| --- | --- | --- |
| `updateInfo` | `{ "name": string, "bio": string }` — **both required** | `User` |
| `updateEmail` | JSON **string** `"ada@…"` (SDK may wrap) | `User` |
| `updatePhone` | JSON **string** | `User` |
| `updateAvatar` | JSON **string** | `User` |
| `updateMeta` | JSON **object** (raw) | `User` |

Also on API (not all wrapped by SDK): `PATCH /user/password`, `/user/state`, `/user/totp`, `/user/login`.

## Preferences

| SDK | HTTP | Request | Returns |
| --- | --- | --- | --- |
| `updatePreferences('info', data)` | `PATCH /user/preferences/info` | typed — see below | `Preference` |
| `updatePreferences(section, data)` | `PATCH /user/preferences/{section}` | **any JSON object** | `Preference` |

Sections: `info` \| `notifications` \| `communication` \| `privacy` \| `display` \| `regional`.

### Info body (`PreferenceInfo`)

| Field | Type | Required |
| --- | --- | --- |
| `language` | string | yes |
| `timezone` | string | yes |
| `currency` | string | yes (ISO 4217, 3 chars) |
| `theme` | `"light"\|"dark"\|"auto"` | yes |

Other sections: freeform jsonb (size/depth validated only).

### `Preference` response

| Field | Type |
| --- | --- |
| `id` | number |
| `hex` / `user` | string |
| `language` / `timezone` / `currency` | string |
| `theme` | `"light"\|"dark"\|"auto"` |
| `notifications` / `communication` / `privacy` / `display` / `regional` | object |
| `created` / `updated` | datetime |

## Sessions — `Page<Sessions>`

`GET /user/sessions/active`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` | string | no |
| `ip` / `agent` | string | yes |
| `device` / `location` | object | yes |
| `seen` / `expires` / `created` | datetime | no |
| `user` | `{ hex, name, email }` | no |
| `total` | number | no |

## Audits — `Page<Audits>`

`GET /user/audits`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `action` | string | no |
| `success` | boolean | no |
| `reason` / `ip` / `agent` | string | yes |
| `device` | object | yes |
| `created` | datetime | no |
| `actor` | `{ hex, name, email }` \| null | yes |
| `total` | number | no |

Note: field is **`actor`**, not `user`.

## Errors

`{ "error": "…", "message": "…" }` — see [Types](../../types/index.md).
