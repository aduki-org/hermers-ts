# Mail (`client.mail`)

Wraps `hermes.mail.MailService`. Tenant/owner are injected from whoami where required.

## Methods

| Method | Notes |
| --- | --- |
| `listMailboxes()` | no caller hex |
| `listMessages({ mailbox, cursor?, limit? })` | |
| `retrieve(hex)` | |
| `send({ from, to, raw })` | `to: string[]`, raw bytes |
| `move` / `setFlags` / `expunge` | |
| `createMailbox` / `updateMailbox` / `deleteMailbox` | |

```ts
const boxes = await client.mail.listMailboxes();
```
