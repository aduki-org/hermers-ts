# Quotas

## POST /tenant/quotas

Auth: Key or Bearer (scope: `quotas:write`)

Body:

```json
{
  "metric": "string",
  "ceiling": "i64",
  "reason": "string?",
  "granted": "string? (user hex)",
  "expires": "datetime?"
}
```

Response 200: `Quota` model *(tenant, metric, ceiling, expires?, created)*

## GET /tenant/quotas

Auth: Key or Bearer (scope: `quotas:read`)

Query: `?after={hex}&limit=N`

Response 200: `Page<Quotas>`

**Quotas:**

| Field | Type |
|---|---|
| tenant | string |
| metric | string |
| ceiling | i64 |
| expires | datetime? |
| created | datetime |
| total | i64 |

## GET /tenant/quotas/{metric}

Response 200: `Quota` model.

## PATCH /tenant/quotas/{metric}/ceiling

Body: `{ "ceiling": i64 }`. Response: `{ "ok": true }`

## PATCH /tenant/quotas/{metric}/expires

Body: `{ "expires": "datetime" }`. Response: `{ "ok": true }`

## PATCH /tenant/quotas/{metric}/reason

Body: `{ "reason": "string" }`. Response: `{ "ok": true }`

## DELETE /tenant/quotas/{metric}

Response 200: `{ "ok": true }`
