# Mail (`hermes.mail`)

Messages and mailboxes under `/user/mail` and `/user/mailbox`.

**Sources:** `crates/api/src/handlers/tenant/user/mail/*`, `mailbox/*`, `crates/api/src/data/tenant/user/mailbox.rs`, `crates/db/src/views/mail/{messages,mailboxes,threads}.rs`, `crates/db/src/models/mail/mailboxes.rs`.

```ts
const page = await hermes.mail.inbox({ limit: 50 });
// page.items[0].internaldate — not `.date`
const boxes = await hermes.mail.listMailboxes();
```

## Message list endpoints

All return `Page<Messages>` (`db::views::mail::messages::Messages`).

| SDK | HTTP |
| --- | --- |
| `inbox` / `unread` / `flagged` / `attachments` | `GET /user/mail/inbox[…]` |
| `bySender(sender)` | `GET /user/mail/inbox/sender/{sender}` |
| `sent` / `byRecipient` | `GET /user/mail/sent[…]` |
| `drafts` / `trash` / `starred` / `spam` / `scored` | `GET /user/mail/…` |
| `folder` / `search` | `GET /user/mail/folder|search/…` |
| `searchAdvanced(q, body)` | `POST /user/mail/search/{q}/advanced` |
| `threads` | `GET /user/mail/threads` → `Page<Threads>` |
| `thread(id)` | `GET /user/mail/thread/{thread}` → `Page<Messages>` |

### `Messages` (list row)

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` | string | no |
| `uid` | number | no |
| `subject` | string | yes |
| `sender` | string | yes |
| `size` | number | no |
| `flags` | (string\|null)[] | no |
| `thread` | string | yes |
| `spam` | number | yes |
| `internaldate` | datetime | no |
| `mailbox` | object | no → `{ "hex": string, "name": string }` |
| `total` | number | no |

```json
{
  "items": [
    {
      "hex": "M0X…",
      "uid": 42,
      "subject": "Hello",
      "sender": "ada@example.com",
      "size": 1024,
      "flags": ["\\\\Seen"],
      "thread": null,
      "spam": null,
      "internaldate": "2026-07-28T12:00:00",
      "mailbox": { "hex": "MB0X…", "name": "INBOX" },
      "total": 1
    }
  ],
  "total": 1,
  "next": null
}
```

### `Threads`

| Field | Type |
| --- | --- |
| `thread` | string |
| `subject` | string? |
| `count` / `unread` / `total` | number |
| `latest` | datetime |
| `mailbox` | `{ hex, name }` |

## Send

`POST /user/mail/send` — body `{ from, to, subject, text }` (`to` is a **single string**).

Response: `{ "hex": "…" }`.

## Flags / delete

| SDK | HTTP | Returns |
| --- | --- | --- |
| `updateFlags(hex, { add?, remove? })` | `PATCH /user/mail/{hex}/flags` | empty / `null` |
| `del(hex)` | `DELETE /user/mail/{hex}` | empty / `null` |
| `clearMailbox(mailbox)` | `DELETE /user/mail/mailbox/{mailbox}` | empty / `null` |

**No `GET /user/mail/{hex}`** on the REST API — `@hermers/sdk` does not expose `retrieve`. **gRPC** `MailService.GetMessage` does (`client.mail.retrieve`) and returns the proto `Message` (`date`, `from`, `to[]`, `flags: Flag[]`, `blob`, …) — not the REST list row (`internaldate`, `sender`, `mailbox: {hex,name}`).

## Mailboxes

### Create — `MailboxData` request

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | **yes** | max 255 |
| `role` | string | no | `inbox`\|`sent`\|`drafts`\|`trash`\|`junk`\|`archive`\|`flagged`\|`all`\|`important`\|`templates` |
| `child` | string | no | |
| `unread` | number | no | |
| `empty` | boolean | no | |
| `messages` | number | no | |
| `search` | boolean | no | |
| `uidnext` | number | no | |
| `flags` | string[] | no | |
| `subscribed` | boolean | no | |
| `parent` | string | no | parent mailbox hex |
| `quota` | number | no | |
| `acl` | object | no | |
| `meta` | object | no | |

### Create response — `Mailbox` model

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `user` / `name` / `delimiter` | string | no |
| `flags` | (string\|null)[] | no |
| `uidvalidity` / `uidnext` / `modseq` | number | no |
| `meta` / `acl` | object | no |
| `role` | string | yes (lowercase) |
| `subscribed` | boolean | no |
| `parent` | string | yes |
| `quota` | number | yes |
| `created` / `updated` | datetime | no |

### List — `Mailboxes` (`Page<Mailboxes>`)

| Field | Type |
| --- | --- |
| `hex` / `name` / `delimiter` | string |
| `flags` | (string\|null)[] |
| `uidvalidity` / `uidnext` / `messages` / `unread` / `total` | number |
| `created` | datetime |

No `size` on list rows.

| SDK | HTTP |
| --- | --- |
| `createMailbox` | `POST /user/mailbox` |
| `listMailboxes` / `unreadMailboxes` / `emptyMailboxes` | `GET /user/mailbox[…]` |
| `mailboxByName` / `searchMailboxes` | `GET …/name|search/…` |
| `updateMailbox` | `PATCH /user/mailbox/{hex}/basic` |
| `renameMailbox` | `PATCH /user/mailbox/{hex}/name` |
| `deleteMailbox` | `DELETE /user/mailbox/{hex}` → `null` |

## Errors

`{ "error": "…", "message": "…" }` — see [Types](../../types/index.md).
