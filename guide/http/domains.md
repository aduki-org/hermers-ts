# Domains

## POST /tenant/domains

Auth: Key or Bearer (scope: `domains:write`)

Body:

```json
{
  "name": "string",
  "kind": "string (primary|sending|receiving|alias)",
  "selector": "string?",
  "meta": "object?"
}
```

Response 200: `{ "hex": "string" }`

## GET /tenant/domains

Auth: Key or Bearer

Query: `?after={hex}&limit=N`

Response 200: `Page<Domains>`

**Domains:**

| Field | Type |
|---|---|
| hex | string |
| name | string |
| kind | string |
| status | string |
| verified | datetime? |
| created | datetime |
| tenant | object |
| total | i64 |

## GET /tenant/domains/active

Same type.

## GET /tenant/domains/pending

Same type.

## GET /tenant/domains/status

Body: `{ "status": "string" }`. Same response type.

## GET /tenant/domains/name/{name}

Response 200: `Domain` *(model — hex, name, kind, status, selector, dkim?, spf, dmarc, verified?, created, tenant, mailboxes)*

## GET /tenant/domains/lookup/name

Query: `?name={domain}`. Same response.

## GET /tenant/domains/{hex}

Response 200: `Domain` model.

## PATCH /tenant/domains/{hex}/kind

Body: `{ "kind": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/domains/{hex}/name

Body: `{ "name": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/domains/{hex}/status

Body: `{ "status": "string", "verified": "datetime?" }`. Response: `{ "ok": true }`

## PATCH /tenant/domains/{hex}/dkim

Body: `{ "dkim": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/domains/{hex}/selector

Body: `{ "selector": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/domains/{hex}/auth

Body: `{ "spf": object, "dmarc": object, "mta_sts": object?, "bimi": object? }`. Response: `{ "ok": true }`

## PATCH /tenant/domains/{hex}/meta

Body: `{ "meta": object }`. Response: `{ "ok": true }`

## DELETE /tenant/domains/{hex}

Response 200: `{ "ok": true }`
