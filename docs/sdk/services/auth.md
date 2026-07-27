# Authentication & API keys

`@hermers/sdk` uses an **API key only**. No login / password / JWT refresh in the package.

## Whoami

```http
GET /v1/auth/whoami
Authorization: Key hm_live_…
```

```ts
const hermes = new Hermes('hm_live_…');
await hermes.ready();
// hermes.me === Identity
```

### Response

| Field | Type | Notes |
| --- | --- | --- |
| `hex` | string | JTI |
| `user` | string | user hex |
| `tenant` | string | tenant hex |
| `owner` | boolean | |
| `scopes` | string[] | `"domain.scope"` flattened |
| `deny` | string[] | same |
| `tier` | string | |
| `ip` | string | always `""` |
| `agent` | string | always `""` |

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

## API keys (`hermes.keys`)

| SDK | HTTP | Returns |
| --- | --- | --- |
| `list` | `GET /user/keys` | `Page<Keys>` |
| `listTenant` | `GET /tenant/keys` | `Page<Keys>` |
| `listActive` | `GET /tenant/keys/active` | `Page<Keys>` |
| `retrieve` | `GET /tenant/keys/{hex}` | key detail / model |
| `create` | `POST /tenant/keys` | SDK: `{ hex, key }`; HTTP body: `{ hex }` |
| `updateName` / `updateScopes` | `PATCH …` | ack / null |
| `del` | `DELETE /tenant/keys/{hex}` | null |

### Create — HTTP body (what the server accepts)

| Field | Type | Required |
| --- | --- | --- |
| `name` | string | yes |
| `hash` | string | yes — SHA-256 of raw key |
| `prefix` | string | yes — ≤16 chars |
| `scopes` | (string\|null)[] | no |
| `meta` | object | no |
| `expires` | datetime string | no |

The SDK generates a raw `hm_live_…` key, sends hash+prefix, and returns `{ hex, key }` once.

### List item (`Keys`)

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `name` / `prefix` | string | no |
| `active` | boolean | no |
| `expires` / `last` | datetime | yes |
| `created` | datetime | no |
| `tenant` | `{ hex, name }` | no |
| `user` | `{ hex, name, email }` \| null | yes |
| `total` | number | no |

Detail adds `scopes` (jsonb array/object as stored).

## Errors

```json
{ "error": "unauthorized", "message": "unauthorized" }
```

| `error` code | HTTP |
| --- | --- |
| `unauthorized` | 401 |
| `forbidden` | 403 |
| `validation` | 422 |
| `not_found` | 404 |
| `over_limit` | 429 |
| `conflict` | 409 |
| `database` / `storage` / `kafka` / `internal` | 500 |

Flat object — not `{ error: { code, message } }`.
