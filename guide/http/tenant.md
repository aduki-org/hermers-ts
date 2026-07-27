# Tenant

## POST /tenants

Auth: none

Body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

Response 200:

```json
{
  "tenant": "string (hex)",
  "user": {
    "hex": "string",
    "email": "string",
    "name": "string"
  }
}
```

## POST /tenants/accept

Auth: none

Body:

```json
{
  "token": "string",
  "name": "string",
  "password": "string"
}
```

Response 200:

```json
{
  "user": "string (hex)",
  "tenant": "string (hex)"
}
```

## GET /tenant

Auth: Key or Bearer (scope: `tenant:read`)

Response 200: `TenantProfile`

**TenantProfile:**

| Field | Type |
|---|---|
| hex | string |
| kind | string |
| name | string |
| slug | string |
| plan | string |
| state | string |
| domain | string? |
| customer | string? |
| subscription | string? |
| trial | datetime? |
| meta | object |
| created | datetime |
| users | i64 |
| domains | i64 |
| storage | i64 |

## PATCH /tenant/edit

Auth: Key or Bearer (scope: `tenant:write`)

Body: `{ "name": "string" }`

Response 200: `TenantProfile`

## POST /tenant/promote

Auth: Key or Bearer (owner only)

Response 200: `{ "ok": true }`

## GET /tenant/view/{hex}

Auth: Key or Bearer (scope: `tenant:read`)

Response 200: `TenantProfile`

## GET /tenant/view/slug/{slug}

Auth: Key or Bearer (scope: `tenant:read`)

Response 200: `Tenant` (model — hex, name, slug, kind, state, created)

## GET /tenant/view/audit/{hex}

Auth: Key or Bearer (scope: `tenant:read`)

Response 200: `AuditDetail`
