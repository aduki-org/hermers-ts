# Mail

## POST /user/mail/send

Auth: Key or Bearer (scope: `mail:send`)

Body: `{ "from": "string", "to": "string", "subject": "string", "text": "string" }`

Response 200: `{ "hex": "string" }`

## GET /user/mail/inbox

Auth: Key or Bearer (scope: `mail:read`)

Query: `?after={hex}&limit=N`

Response 200: `Page<Messages>`

**Messages:**

| Field | Type |
| --- | --- |
| hex | string |
| uid | i64 |
| subject | string? |
| sender | string? |
| size | i64 |
| flags | [string?] |
| thread | string? |
| spam | f32? |
| internaldate | datetime |
| mailbox | object |
| total | i64 |

## GET /user/mail/inbox/unread

Same type.

## GET /user/mail/inbox/flagged

Same type.

## GET /user/mail/inbox/attachments

Same type.

## GET /user/mail/inbox/sender/{sender}

Same type.

## GET /user/mail/sent

Same type.

## GET /user/mail/sent/recipient/{recipient}

Same type.

## GET /user/mail/draft

Same type.

## GET /user/mail/trash

Same type.

## GET /user/mail/starred

Same type.

## GET /user/mail/spam

Same type.

## GET /user/mail/spam/scored/{score}

Same type. Score is f32 path param.

## GET /user/mail/folder/{folder}

Same type.

## GET /user/mail/folder/{folder}/unread

Same type.

## GET /user/mail/folder/{folder}/flagged

Same type.

## GET /user/mail/search/{q}

Same type.

## POST /user/mail/search/{q}/advanced

Body: `{ "mailbox": "string?", "sender": "string?" }`. Same response type.

## GET /user/mail/threads

Response 200: `Page<Threads>` — thread, subject?, count, unread, latest, mailbox, total

## GET /user/mail/thread/{thread}

Response 200: `Page<Messages>`

## GET /user/mail/{hex}

Response 200: `MessageDetail` *(adds structure?, blob)*

## DELETE /user/mail/{hex}

Response: `Json<()>` — empty body

## DELETE /user/mail/mailbox/{mailbox}

Response: `Json<()>`

## PATCH /user/mail/{hex}/flags

Body: `{ "add": ["string"], "remove": ["string"] }`. Response: `Json<()>`
