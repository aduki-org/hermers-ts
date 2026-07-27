# Mail (`hermes.mail`)

Messages and mailboxes under `/user/mail` and `/user/mailbox`. Identity from whoami; never pass tenant/user hex.

```ts
const page = await hermes.mail.inbox({ limit: 50 });
const detail = await hermes.mail.retrieve(page.items[0].hex);
const boxes = await hermes.mail.listMailboxes();
```

## Messages

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `send` | `(data) => Promise<{ hex: string }>` | `POST /user/mail/send` | New message hex |
| `inbox` | `(query?) => Promise<Page<Message>>` | `GET /user/mail/inbox` | Page |
| `unread` | `(query?) => Promise<Page<Message>>` | `GET …/inbox/unread` | Page |
| `flagged` | `(query?) => Promise<Page<Message>>` | `GET …/inbox/flagged` | Page |
| `attachments` | `(query?) => Promise<Page<Message>>` | `GET …/inbox/attachments` | Page |
| `bySender` | `(sender, query?) => Promise<Page<Message>>` | `GET …/inbox/sender/{sender}` | Page |
| `sent` | `(query?) => Promise<Page<Message>>` | `GET /user/mail/sent` | Page |
| `byRecipient` | `(recipient, query?) => Promise<Page<Message>>` | `GET …/sent/recipient/{…}` | Page |
| `drafts` | `(query?) => Promise<Page<Message>>` | `GET /user/mail/draft` | Page |
| `trash` | `(query?) => Promise<Page<Message>>` | `GET /user/mail/trash` | Page |
| `starred` | `(query?) => Promise<Page<Message>>` | `GET /user/mail/starred` | Page |
| `spam` | `(query?) => Promise<Page<Message>>` | `GET /user/mail/spam` | Page |
| `scored` | `(score: number) => Promise<Page<Message>>` | `GET …/spam/scored/{score}` | Page |
| `folder` | `(folder, query?) => Promise<Page<Message>>` | `GET /user/mail/folder/{folder}` | Page |
| `search` | `(q) => Promise<Page<Message>>` | `GET /user/mail/search/{q}` | Page |
| `searchAdvanced` | `(q, { mailbox?, sender? }) => Promise<Page<Message>>` | `POST …/search/{q}/advanced` | Page |
| `threads` | `(query?) => Promise<Page<Thread>>` | `GET /user/mail/threads` | Page |
| `thread` | `(thread) => Promise<Page<Message>>` | `GET /user/mail/thread/{thread}` | Page |
| `retrieve` | `(hex) => Promise<MessageDetail>` | `GET /user/mail/{hex}` | Detail |
| `del` | `(hex) => Promise<void>` | `DELETE /user/mail/{hex}` | Empty / `{}` |
| `clearMailbox` | `(mailbox) => Promise<void>` | `DELETE /user/mail/mailbox/{mailbox}` | Empty |
| `updateFlags` | `(hex, { add?, remove? }) => Promise<void>` | `PATCH /user/mail/{hex}/flags` | Empty |

### `send` body

| Field | Type | Required |
| --- | --- | --- |
| `from` | `string` | yes |
| `to` | `string` | yes |
| `subject` | `string` | yes |
| `text` | `string` | yes |

Returns `{ hex: string }`.

## Mailboxes

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `createMailbox` | `(data) => Promise<Mailbox>` | `POST /user/mailbox` | Mailbox |
| `listMailboxes` | `(query?) => Promise<Page<Mailbox>>` | `GET /user/mailbox` | Page |
| `unreadMailboxes` | `() => Promise<Page<Mailbox>>` | `GET /user/mailbox/unread` | Page |
| `emptyMailboxes` | `() => Promise<Page<Mailbox>>` | `GET /user/mailbox/empty` | Page |
| `mailboxByName` | `(name) => Promise<Page<Mailbox>>` | `GET …/name/{name}` | Page |
| `searchMailboxes` | `(q) => Promise<Page<Mailbox>>` | `GET …/search/{q}` | Page |
| `updateMailbox` | `(hex, data) => Promise<Mailbox>` | `PATCH …/{hex}/basic` | Mailbox |
| `renameMailbox` | `(hex, name) => Promise<Mailbox>` | `PATCH …/{hex}/name` | Mailbox |
| `deleteMailbox` | `(hex) => Promise<void>` | `DELETE /user/mailbox/{hex}` | Empty |

## Return types

### `Message`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `uid` | `number` |
| `subject` | `string?` |
| `sender` | `string?` |
| `size` | `number` |
| `flags` | `string[]?` |
| `thread` | `string?` |
| `spam` | `number?` |
| `date` | `string` |
| `mailbox` | `object` |
| `total` | `number?` |

### `MessageDetail`

`Message` plus `blob?: string`, `structure?: object`.

### `Thread`

| Field | Type |
| --- | --- |
| `thread` | `string` |
| `subject` | `string?` |
| `count` | `number` |
| `unread` | `number` |
| `latest` | `string` |
| `mailbox` | `object` |

### `Mailbox`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `name` | `string` |
| `delimiter` | `string` |
| `flags` | `string[]?` |
| `uidvalidity` | `number` |
| `uidnext` | `number` |
| `messages` | `number` |
| `unread` | `number` |
| `size` | `number` |
| `created` | `string` |

### Example inbox page

```json
{
  "items": [
    {
      "hex": "M0X…",
      "uid": 42,
      "subject": "Hello",
      "sender": "ada@example.com",
      "size": 1024,
      "flags": ["\\Seen"],
      "date": "2026-07-28T12:00:00Z",
      "mailbox": { "hex": "…", "name": "INBOX" }
    }
  ],
  "total": 1,
  "next": null
}
```

## Errors

Missing `mail:read` / `mail:write` → `403`. Unknown message → `404`. Throws `HermesError`.
