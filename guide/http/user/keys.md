# Keys

## POST /tenant/keys

Auth: Key or Bearer (scope: `keys:write`)

Body:

```json
{
  "name": "string",
  "hash": "string",
  "prefix": "string",
  "scopes": ["string"],
  "meta": "object?",
  "expires": "datetime?"
}
```

Response 200: `{ "hex": "string" }`

## GET /tenant/keys

Auth: Key or Bearer (scope: `keys:read`)

Query: `?after={hex}&limit=N`

Response 200: `Page<Keys>`

**Keys:**

| Field | Type |
| --- | --- |
| hex | string |
| name | string |
| prefix | string |
| active | bool |
| expires | datetime? |
| last | datetime? |
| created | datetime |
| tenant | object |
| user | object? |
| total | i64 |

## GET /tenant/keys/active

Same type.

## GET /tenant/keys/expired

Same type.

## GET /tenant/keys/user/{user}

Same type.

## POST /tenant/keys/lookup/prefix

Body: `{ "prefix": "string" }`. Response: `KeyDetail` (adds `scopes` field)

## GET /tenant/keys/{hex}

Response 200: `KeyDetail`

## PATCH /tenant/keys/{hex}/hash

Body: `{ "hash": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/keys/{hex}/last

Body: `{ "last": "datetime" }`. Response: `{ "ok": true }`

## PATCH /tenant/keys/{hex}/name

Body: `{ "name": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/keys/{hex}/scopes

Body: `{ "scopes": ["string"] }`. Response: `{ "ok": true }`

## DELETE /tenant/keys/{hex}

Response 200: `{ "ok": true }`
