# Sessions

## GET /user/sessions/active

Auth: Key or Bearer (scope: `users:read`)

Query: `?after={hex}&limit=N`

Response 200: `Page<Sessions>`

**Sessions:**

| Field | Type |
| --- | --- |
| hex | string |
| ip | string? |
| agent | string? |
| device | object? |
| location | object? |
| seen | datetime |
| expires | datetime |
| created | datetime |
| user | object |
| total | i64 |

## GET /user/sessions/method/{method}

Same type. Filter by method string.
