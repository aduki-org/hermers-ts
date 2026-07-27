# Mailbox

## POST /user/mailbox

Auth: Key or Bearer (scope: `mailbox:write`)

Body: `{ "name": "string", "role": "string?", "child": "string?", "unread": "i64?", "empty": "bool?", "messages": "i64?", "search": "string?", "uidnext": "i64?", "flags": ["string"]?, "subscribed": "bool?", "parent": "string?", "quota": "i64?", "acl": "object?", "meta": "object?" }`

Response 200: `Mailbox` model

**Mailbox:**

| Field | Type |
|---|---|
| hex | string |
| name | string |
| delimiter | string |
| flags | [string?] |
| uidvalidity | i64 |
| uidnext | i64 |
| messages | i64 |
| unread | i64 |
| size | i64 |
| created | datetime |
| total | i64 |

## GET /user/mailbox

Query: `?after={hex}&limit=N`. Response: `Page<Mailboxes>`

## GET /user/mailbox/unread

Same type.

## GET /user/mailbox/empty

Same type.

## GET /user/mailbox/name/{name}

Same type.

## GET /user/mailbox/messages/{mailbox}

Same type.

## GET /user/mailbox/search/{q}

Same type.

## PATCH /user/mailbox/{hex}/basic

Body: partial mail fields. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/role

Body: `{ "role": "string" }`. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/name

Body: `{ "name": "string" }`. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/uidnext

Body: `{ "uidnext": "i64" }`. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/flags

Body: `{ "flags": ["string"] }`. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/subscribed

Body: `{ "subscribed": "bool" }`. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/parent

Body: `{ "parent": "string" }`. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/quota

Body: `{ "quota": "i64" }`. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/acl

Body: `{ "acl": "object" }`. Response: `Mailbox`

## PATCH /user/mailbox/{hex}/meta

Body: `{ "meta": "object" }`. Response: `Mailbox`

## DELETE /user/mailbox/{hex}

Response: `Json<()>`
