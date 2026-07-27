# Mail (`client.mail`)

Wraps `hermes.mail.MailService`. Tenant/owner are injected from whoami where required.

```ts
const { items: boxes } = await client.mail.listMailboxes();
const { items, next } = await client.mail.listMessages({
  mailbox: boxes[0].hex,
  limit: 50,
});
```

## Methods

| Method | Signature | Returns |
| --- | --- | --- |
| `listMailboxes` | `() => Promise<ListMailboxesResp>` | `{ items: Mailbox[] }` |
| `listMessages` | `({ mailbox, cursor?, limit? }) => Promise<ListMessagesResp>` | `{ items, next }` |
| `retrieve` | `(hex) => Promise<Message>` | Message |
| `send` | `({ from, to, raw }) => Promise<SendResp>` | `{ hex }` |
| `move` | `({ hex, dest }) => Promise<MoveResp>` | `{ hex, uid }` |
| `setFlags` | `({ hex, add?, remove? }) => Promise<void>` | Empty |
| `expunge` | `({ mailbox, uids }) => Promise<{ expunged: number[] }>` | UIDs removed |
| `createMailbox` | `({ name, role? }) => Promise<Mailbox>` | Mailbox |
| `updateMailbox` | `({ hex, name?, role? }) => Promise<Mailbox>` | Mailbox |
| `deleteMailbox` | `(hex) => Promise<void>` | Empty |

### Injected fields

| Method | Injected |
| --- | --- |
| `listMailboxes`, `createMailbox` | `tenant`, `owner` |
| `send` | `tenant` |

### `send` params

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Envelope from |
| `to` | `string[]` | Recipients |
| `raw` | `Uint8Array` | Raw RFC822 bytes |

### `setFlags` params

`add` / `remove`: `MailFlag[]` (`FLAG_SEEN`, `FLAG_ANSWERED`, `FLAG_FLAGGED`, `FLAG_DELETED`, `FLAG_DRAFT`).

## Return types

### `Mailbox`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `tenant` | `string` |
| `owner` | `string` |
| `name` | `string` |
| `uidnext` | `number` |
| `uidvalidity` | `number` |
| `exists` | `number` |
| `unseen` | `number` |

### `Message`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `mailbox` | `string` |
| `uid` | `number` |
| `flags` | `Flag[]` |
| `subject` | `string` |
| `from` | `string` |
| `to` | `string[]` |
| `blob` | `string` |
| `size` | `number` |
| `date` | `Date?` |
| `created` | `Date?` |

### List responses

```ts
// ListMailboxesResp
{ items: Mailbox[] }

// ListMessagesResp
{ items: Message[]; next: string }

// SendResp
{ hex: string }

// MoveResp
{ hex: string; uid: number }
```

## Errors

`HermesGrpcError` for auth, missing mailbox, or invalid flags.
