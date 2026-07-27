# Tenant (`hermes.tenant`)

Tenant administration under `/tenant/*`. API keys: [`hermes.keys`](auth.md).

```ts
const tenant = await hermes.tenant.retrieve();
const members = await hermes.tenant.members({ limit: 50 });
```

## Profile

| SDK | HTTP | Returns |
| --- | --- | --- |
| `retrieve()` | `GET /tenant` | `TenantProfile` |
| `update({ name })` | `PATCH /tenant/edit` | full `Tenant` model |
| `view(hex)` | `GET /tenant/view/{hex}` | `TenantProfile` |
| `bySlug(slug)` | `GET /tenant/view/slug/{slug}` | `Tenant` model |

### `TenantProfile`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `kind` / `name` / `slug` / `plan` / `state` | string | no |
| `domain` / `customer` / `subscription` | string | yes |
| `trial` | datetime | yes |
| `meta` | object | no |
| `created` | datetime | no |
| `users` / `domains` / `storage` | number | no |

`kind`: `personal`\|`team`. `plan`: `free`\|`starter`\|`pro`\|`business`\|`enterprise`. `state`: `active`\|`suspended`\|`pending`\|`deleted`.

## Members — `Page<Members>`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `email` / `name` / `state` | string | no |
| `avatar` | string | yes |
| `owner` | boolean | no |
| `last` | datetime | yes |
| `created` | datetime | no |
| `tenant` | `{ hex, name, slug }` | no |
| `role` | `{ label, kind }` or `{}` | no |
| `total` | number | no |

```json
{
  "hex": "U0X…",
  "email": "ada@example.com",
  "name": "Ada",
  "avatar": null,
  "owner": false,
  "state": "active",
  "last": null,
  "created": "2026-01-01T00:00:00",
  "tenant": { "hex": "T0X…", "name": "Acme", "slug": "acme" },
  "role": { "label": "member", "kind": "permanent" },
  "total": 3
}
```

| SDK | Returns |
| --- | --- |
| `members` / `activeMembers` / `owners` / `searchMembers` | `Page<Members>` |
| `invite({ email, role? })` | `{ invite: string, token: string }` |
| `removeMember(user)` | typically `null` / ack |

## Invitations — `Page<Invitations>`

| Field | Type |
| --- | --- |
| `hex` / `email` / `label` / `status` | string |
| `expires` / `created` | datetime |
| `inviter` | `{ hex, name, email }` |
| `total` | number |

`status`: `pending`\|`accepted`\|`rejected`\|`expired`.

## Domains

**Create body:** `{ name, kind?, selector?, meta? }` → `{ hex }`.  
`kind`: `primary`\|`sending`\|`receiving`\|`alias`.

**List row:** `hex`, `name`, `kind`, `status`, `verified?`, `created`, `tenant: { hex, name, slug }`, `total`.

## Quotas — `Page<Quotas>`

| Field | Type |
| --- | --- |
| `tenant` / `metric` | string |
| `ceiling` | number |
| `expires` | datetime? |
| `created` | datetime |
| `total` | number |

Create body: `{ metric, ceiling, reason?, granted?, expires? }` → full quota model.

## Rules — `Page<Rules>`

| Field | Type |
| --- | --- |
| `hex` / `target` / `pattern` / `name` | string |
| `score` | number |
| `active` | boolean |
| `created` | datetime |
| `tenant` | `{ hex, name }` \| null |
| `total` | number |

`target` values include `header.from`, `header.to`, `body.text`, `envelope.from`, … (see API data validation).

Detail (`RuleDetail`) adds `meta` object.

## Webhooks

**Create:** `{ url, secret, events?, domains?, active?, meta? }` → `{ hex }`.  
**List:** `hex`, `url`, `active`, `created`, `tenant: { hex, name }`, `total`.  
**Detail:** adds `events` (jsonb); model may include `secret`, `domains`, `meta`.

## Usage — `Page<Usages>` / summary array

| Field | Type |
| --- | --- |
| `tenant` / `metric` | string |
| `window` | date (`YYYY-MM-DD`) |
| `value` / `ceiling` / `total` | number |

## Security — `GET /tenant/security`

```json
{
  "mtasts": [{ "domain": "…", "policy": {}, "expires": "…" }],
  "tlsa": [{ "host": "…", "port": 25, "records": {}, "expires": "…" }],
  "bimi": [{ "domain": "…", "location": null, "vmc": null, "expires": "…" }],
  "reports": [{ "hex": "…", "kind": "…", "domain": "…", "period": "2026-07-01", "received": "…" }]
}
```

Note REST uses `policy` / `records` objects (not `policyJson` / `recordsJson` — those names are gRPC-generated).

## Errors

`{ "error": "…", "message": "…" }` — see [Types](../../types/index.md).
