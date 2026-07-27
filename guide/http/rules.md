# Rules

## POST /tenant/rules

Auth: Key or Bearer (scope: `rules:write`)

Body:
```json
{
  "name": "string",
  "target": "string (sender|recipient|subject|body|header|attachment|ip|domain)",
  "pattern": "string",
  "score": "f32 (-100..100)",
  "active": "bool",
  "meta": "object?"
}
```

Response 200: `Rule` model *(hex, target, pattern, score, active, name, meta, created, tenant?)*

## GET /tenant/rules

Auth: Key or Bearer (scope: `rules:read`)

Query: `?after={hex}&limit=N`

Response 200: `Page<Rules>`

**Rules:**
| Field | Type |
|---|---|
| hex | string |
| target | string |
| pattern | string |
| score | f32 |
| active | bool |
| name | string |
| created | datetime |
| tenant | object? |
| total | i64 |

## GET /tenant/rules/active

Same type.

## GET /tenant/rules/target/{target}

Same type.

## GET /tenant/rules/name/{name}

Response 200: `Rule` model.

## GET /tenant/rules/{hex}

Response 200: `Rule` model.

## GET /tenant/rules/{hex}/detail

Response 200: `RuleDetail` *(adds meta field)*

## PATCH /tenant/rules/{hex}/active

Body: `{ "active": bool }`. Response: `{ "ok": true }`

## PATCH /tenant/rules/{hex}/name

Body: `{ "name": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/rules/{hex}/pattern

Body: `{ "pattern": "string" }`. Response: `{ "ok": true }`

## PATCH /tenant/rules/{hex}/score

Body: `{ "score": f32 }`. Response: `{ "ok": true }`

## PATCH /tenant/rules/{hex}/target

Body: `{ "target": "string" }`. Response: `{ "ok": true }`

## DELETE /tenant/rules/{hex}

Response 200: `{ "ok": true }`