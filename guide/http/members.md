# Members

## GET /tenant/members

Auth: Key or Bearer (scope: `tenant:read`)

Query: `?after={hex}&limit=N` or `?page=N&limit=M`

Response 200: `Page<Members>`

**Members:**
| Field | Type |
|---|---|
| hex | string |
| email | string |
| name | string |
| avatar | string? |
| owner | bool |
| state | string |
| last | datetime? |
| created | datetime |
| tenant | object |
| role | object |
| total | i64 |

## GET /tenant/members/active

Same type. Scope: `members:read`

## GET /tenant/members/owners

Same type.

## GET /tenant/members/search/{q}

Same type.

## POST /tenant/invite

Auth: Key or Bearer (scope: `tenant:write`)

Body: `{ "email": "string", "role": "string?" }`

Response 200: `{ "invite": "string (hex)", "token": "string" }`

## DELETE /tenant/members/{user}

Auth: Key or Bearer (scope: `tenant:write`)

Response 200: `{ "ok": true }`

## POST /tenant/transfer/{tenant}/{from}/{to}

Auth: Key or Bearer (owner)

Response 200: `{ "ok": true }`