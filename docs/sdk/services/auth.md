# Authentication & API keys

`@hermers/sdk` authenticates with an **API key only**. There is no `auth.login`, password, or JWT refresh surface in the package.

## Constructing the client

```ts
import Hermes, { HermesError } from '@hermers/sdk';

const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await hermes.ready(); // GET /auth/whoami — caches Identity
```

Every request sends:

```http
Authorization: Key hm_live_…
```

Default base URL: `https://hermers.aduki.pro/v1` (`BASE_URL`).

Missing / empty API key throws immediately:

```ts
// HermesError { status: 0, code: 'invalid_api_key' }
```

## Whoami & identity cache

| Method / property | Signature | Returns |
| --- | --- | --- |
| `ready()` | `(): Promise<Identity>` | Awaits whoami; same as `whoami()` |
| `whoami()` | `(): Promise<Identity>` | Cached after first success |
| `me` | `Identity \| undefined` | Sync snapshot; `undefined` until ready |

### `Identity` fields

| Field | Type | Description |
| --- | --- | --- |
| `hex` | `string?` | Session / JTI (`A0S…`) |
| `user` | `string` | User hex (`U0X…`) — required |
| `tenant` | `string` | Tenant hex (`T0X…`) — required |
| `owner` | `boolean?` | Tenant owner |
| `scopes` | `string[]?` | Granted scope patterns |
| `deny` | `string[]?` | Denied scope patterns |
| `tier` | `string?` | Plan slug (`free`, …) |
| `email` | `string?` | When present on response |
| `name` | `string?` | When present on response |
| `raw` | `unknown?` | Full whoami JSON (may include `ip`, `agent`) |

### Wire response (`GET /auth/whoami`)

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

If the body lacks `user` or `tenant`, the client throws `HermesError` with `code: 'invalid_identity'`.

Resource methods never take tenant/user hex — they use this cache.

## Keys (`hermes.keys`)

Maps to `/user/keys` and `/tenant/keys`. Create hashes the secret **client-side**; the server stores only SHA-256 hash + prefix.

### Methods

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `list` | `(query?: ListQuery) => Promise<Page<ApiKey>>` | `GET /user/keys` | Page of keys for the user |
| `listTenant` | `(query?: ListQuery) => Promise<Page<ApiKey>>` | `GET /tenant/keys` | Tenant keys (`keys:read`) |
| `listActive` | `() => Promise<Page<ApiKey>>` | `GET /tenant/keys/active` | Active tenant keys |
| `retrieve` | `(hex: string) => Promise<ApiKey>` | `GET /tenant/keys/{hex}` | Key metadata (no raw secret) |
| `create` | `(data) => Promise<{ hex: string; key: string }>` | `POST /tenant/keys` | Id + **raw secret once** |
| `updateName` | `(hex, name) => Promise<{ ok: boolean }>` | `PATCH …/name` | Ack |
| `updateScopes` | `(hex, scopes) => Promise<{ ok: boolean }>` | `PATCH …/scopes` | Ack |
| `del` | `(hex) => Promise<{ ok: boolean }>` | `DELETE /tenant/keys/{hex}` | Ack |

### `create` request

```ts
{
  name: string;
  scopes: string[];
  key?: string;                      // optional raw key; otherwise generated
  meta?: Record<string, unknown>;
  expires?: string;                  // ISO-8601
}
```

Body sent to the API (never the raw key):

```json
{
  "name": "ci-bot",
  "hash": "<sha256 hex of raw key>",
  "prefix": "<first 1–16 chars>",
  "scopes": ["contacts:read", "mail:read"],
  "meta": {},
  "expires": null
}
```

### `create` return

```ts
{ hex: string; key: string }
```

| Field | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Server-assigned key id |
| `key` | `string` | Raw `hm_live_…` secret — show once; store in a secret manager |

Helpers: `generateKey()`, `hashKey()`, `prefixKey()` from `@hermers/sdk`.

### `ApiKey` (list / retrieve)

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `name` | `string` |
| `prefix` | `string?` |
| `scopes` | `string[]` |
| `active` | `boolean?` |
| `expires` | `string?` |
| `last` | `string?` |
| `created` | `string` |
| `tenant` | `object?` |
| `user` | `object?` |

```ts
const { hex, key } = await hermes.keys.create({
  name: 'ci-bot',
  scopes: ['contacts:read', 'mail:read'],
});
// store `key` securely; never log in production
```

## Errors

| Situation | `HermesError` |
| --- | --- |
| Empty API key | `status: 0`, `code: 'invalid_api_key'` |
| Bad / revoked key | HTTP `401` / `403`, `code` from body |
| Whoami missing ids | `status: 0`, `code: 'invalid_identity'` |
| Network failure | `status: 0`, `code: 'network_error'` |
| Validation | HTTP `4xx` with optional `field` |

See [Types & enums](../../types/index.md) for the full error shape.
