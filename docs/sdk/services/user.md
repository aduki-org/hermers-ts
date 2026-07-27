# User (`hermes.user`)

Authenticated user profile under `/user`. Uses the whoami session; no tenant/user args.

```ts
const profile = await hermes.user.retrieve();
await hermes.user.updateInfo({ name: 'Ada' });
const sessions = await hermes.user.activeSessions({ limit: 20 });
```

## Methods

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `retrieve` | `() => Promise<UserProfile>` | `GET /user` | Profile |
| `lookupByEmail` | `(email: string) => Promise<UserProfile>` | `POST /user/lookup/email` | Profile |
| `updateInfo` | `({ name? }) => Promise<UserProfile>` | `PATCH /user/info` | Profile |
| `updateEmail` | `(email: string) => Promise<UserProfile>` | `PATCH /user/email` | Profile |
| `updatePhone` | `(phone: string) => Promise<UserProfile>` | `PATCH /user/phone` | Profile |
| `updateMeta` | `(meta) => Promise<UserProfile>` | `PATCH /user/meta` | Profile |
| `updateAvatar` | `(avatar: string) => Promise<UserProfile>` | `PATCH /user/avatar` | Profile |
| `activeSessions` | `(query?) => Promise<Page<Session>>` | `GET /user/sessions/active` | Page |
| `audits` | `(query?) => Promise<Page<Audit>>` | `GET /user/audits` | Page |
| `updatePreferences` | `(section, data) => Promise<PreferenceDetail>` | `PATCH /user/preferences/{section}` | Preferences |

### Preference sections

`'info' | 'notifications' | 'communication' | 'privacy' | 'display' | 'regional'`

## Return types

### `UserProfile`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `email` | `string` |
| `name` | `string` |
| `phone` | `string?` |
| `avatar` | `string?` |
| `state` | `string?` |
| `totp` | `boolean?` |
| `meta` | `Record<string, unknown>?` |
| `created` | `string` |

Example:

```json
{
  "hex": "U0X3BFF58E91EC7",
  "email": "ada@example.com",
  "name": "Ada",
  "phone": null,
  "avatar": null,
  "state": "active",
  "totp": false,
  "meta": {},
  "created": "2026-01-01T00:00:00Z"
}
```

### `Session` (active sessions)

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `ip` | `string?` |
| `agent` | `string?` |
| `device` | `object?` |
| `location` | `object?` |
| `seen` | `string?` |
| `expires` | `string?` |
| `created` | `string` |
| `user` | `object` |

### `Audit`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `action` | `string` |
| `user` | `object` |
| `ip` | `string?` |
| `agent` | `string?` |
| `created` | `string` |

### `PreferenceDetail`

| Field | Type |
| --- | --- |
| `info` | `object?` |
| `notifications` | `object?` |
| `communication` | `object?` |
| `privacy` | `object?` |
| `display` | `object?` |
| `regional` | `object?` |

## Errors

Unauthorized → `401`. Insufficient scope → `403`. Validation → `400` with optional `field`. Throws `HermesError`.
