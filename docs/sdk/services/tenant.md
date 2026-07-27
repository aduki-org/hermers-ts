# Tenant (`hermes.tenant`)

Tenant administration under `/tenant/*`. No signup/password flows.

API keys are created via `hermes.keys.create()` (not on `tenant`).

## Common methods

| Method | HTTP |
| --- | --- |
| `retrieve()` | `GET /tenant` |
| `update({ name })` | `PATCH /tenant/edit` |
| `members` / `domains` / `quotas` / `rules` / `webhooks` / `usage` | list endpoints |
| `security()` | `GET /tenant/security` |

```ts
const tenant = await hermes.tenant.retrieve();
const members = await hermes.tenant.members();
```

For key creation see [Authentication & keys](auth.md).

API reference: [guide/http/tenant.md](../../../guide/http/tenant.md).
