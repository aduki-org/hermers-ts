# Mail (`hermes.mail`)

Messages and mailboxes under `/user/mail` and `/user/mailbox`.

## Common methods

| Method | HTTP |
| --- | --- |
| `send({ from, to, subject, text })` | `POST /user/mail/send` |
| `inbox` / `unread` / `flagged` / `sent` / `drafts` / `trash` / `starred` / `spam` | `GET /user/mail/…` |
| `threads(query?)` | `GET /user/mail/threads` |
| `retrieve(hex)` | `GET /user/mail/{hex}` |
| `del(hex)` | `DELETE /user/mail/{hex}` |
| `listMailboxes(query?)` | `GET /user/mailbox` |

```ts
const page = await hermes.mail.inbox({ limit: 50 });
const boxes = await hermes.mail.listMailboxes();
```
