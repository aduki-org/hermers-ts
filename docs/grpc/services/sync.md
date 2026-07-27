# Sync (`client.sync`)

Wraps `hermes.sync.SyncService` — incremental contact and mailbox sync.

```ts
const contacts = await client.sync.contacts({ since: new Date('2026-01-01') });
const mail = await client.sync.mailboxes({
  mailbox: 'MBOX…',
  knownUidvalidity: 1,
  knownModseq: 0,
});
```

## Methods

| Method | Signature | Returns |
| --- | --- | --- |
| `contacts` | `({ since: Date }) => Promise<ContactSyncResp>` | Contact delta |
| `mailboxes` | `({ mailbox, knownUidvalidity?, knownModseq? }) => Promise<MailboxSyncResp>` | Mailbox delta |

### Params

| Method | You pass | Injected |
| --- | --- | --- |
| `contacts` | `since` | `tenant` |
| `mailboxes` | `mailbox`, optional `knownUidvalidity` (default 0), `knownModseq` (default 0) | — |

## Return types

### `ContactSyncResp`

| Field | Type | Description |
| --- | --- | --- |
| `changed` | `string[]` | Changed contact hexes |
| `removed` | `string[]` | Removed contact hexes |
| `ctag` | `string` | Collection tag |

### `MailboxSyncResp`

| Field | Type | Description |
| --- | --- | --- |
| `newUids` | `number[]` | New UIDs |
| `changedUids` | `number[]` | Changed UIDs |
| `removedUids` | `number[]` | Removed UIDs |
| `modseq` | `number` | Current modseq |
| `uidvalidity` | `number` | Current uidvalidity |

```ts
{
  newUids: [10, 11],
  changedUids: [5],
  removedUids: [],
  modseq: 42,
  uidvalidity: 1,
}
```

## Errors

Unknown mailbox → `NOT_FOUND`. Throws `HermesGrpcError`.
