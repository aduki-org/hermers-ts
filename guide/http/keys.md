# Keys

## Client-side key creation

1. Generate raw key: `crypto.getRandomValues(new Uint8Array(32))` → base64/hex. Show it to user once.
2. Compute `hash = SHA-256(raw_key)` → hex string. SDK MUST do this locally.
3. Compute `prefix = raw_key.slice(0, 16)`. SDK MUST do this locally.
4. Send ONLY `name`, `hash`, `prefix`, `scopes`, `meta?`, `expires?` to `POST /tenant/keys`.

> **Security:** never transmit or store raw key server-side. Server stores only `hash`. `prefix` is index-only; it is NOT used for verification.

## POST /tenant/keys

Auth: tenant admin (`keys:write`)

Body:

```json
{
  "name": "string",
  "hash": "string (SHA-256 hex of raw API key)",
  "prefix": "string (first 1-16 chars of raw key)",
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

Body: `{ "prefix": "string" }`. Response: `KeyDetail` (matches first 16 chars)

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
