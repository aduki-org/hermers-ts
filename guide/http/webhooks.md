# Webhooks

## POST /tenant/webhooks

Auth: Key or Bearer (scope: `webhooks:write`)

Body:
```json
{
  "url": "string",
  "secret": "string",
  "events": ["string"],
  "domains": ["string"]?,
  "active": "bool?",
  "meta": "object?"
}
```

Response 200: `{ "hex": "string" }`

## GET /tenant/webhooks

Auth: Key or Bearer (scope: `webhooks:read`)

Query: `?after={hex}&limit=N`

Response 200: `Page<Webhooks>`

**Webhooks:**
| Field | Type |
|---|---|
| hex | string |
| url | string |
| active | bool |
| created | datetime |
| tenant | object |
| total | i64 |

## GET /tenant/webhooks/active

Same type.

## GET /tenant/webhooks/subscribers/{event}

Same type.

## GET /tenant/webhooks/{hex}

Response 200: `WebhookDetail` *(adds events field)*

## GET /tenant/webhooks/{hex}/detail

Response 200: `WebhookDetail` *(full)*

## PATCH /tenant/webhooks/{hex}/active

Body: `{ "active": bool }`. Response: `{ "ok": true }`

## PATCH /tenant/webhooks/{hex}/domains

Body: `{ "domains": ["string"] }`. Response: `{ "ok": true }`

## PATCH /tenant/webhooks/{hex}/events

Body: `{ "events": ["string"] }`. Response: `{ "ok": true }`

## PATCH /tenant/webhooks/{hex}/secret

Body: `{ "secret": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/webhooks/{hex}/url

Body: `{ "url": "string" }`. Response: `{ "ok": true }`

## DELETE /tenant/webhooks/{hex}

Response 200: `{ "ok": true }`