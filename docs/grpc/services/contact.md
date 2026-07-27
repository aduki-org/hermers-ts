# Contact (`client.contacts`)

Wraps `hermes.contact.ContactService`. `tenant` / `owner` on Create, List, and Sync are injected from the whoami cache.

**Unlike REST:** gRPC exposes `retrieve` (`Get`) and create only needs `vcard` (no required `name` / `meta`). The returned `Contact` is the proto message (`tenant`, `owner`, `vcard`, `etag`, `created`/`updated`) — not the REST diesel create model or list row.

```ts
await client.ready();
const { items, next } = await client.contacts.list({ limit: 50 });
const c = await client.contacts.create({
  vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Ada\nEND:VCARD',
});
```

## Methods

| Method | Signature | RPC | Returns |
| --- | --- | --- | --- |
| `list` | `({ cursor?, limit? }?) => Promise<ListResp>` | `List` | Items + cursor |
| `retrieve` | `(hex: string) => Promise<Contact>` | `Get` | Contact |
| `create` | `({ vcard }) => Promise<Contact>` | `Create` | Contact |
| `update` | `({ hex, vcard, etag }) => Promise<Contact>` | `Update` | Contact |
| `del` | `(hex: string) => Promise<void>` | `Remove` | Empty |
| `sync` | `({ since: Date }) => Promise<SyncResp>` | `Sync` | Delta |

### Caller-facing params

| Method | Fields you pass | Injected by SDK |
| --- | --- | --- |
| `list` | `cursor?`, `limit?` (default 50) | `tenant` |
| `create` | `vcard` | `tenant`, `owner` |
| `update` | `hex`, `vcard`, `etag` | — |
| `sync` | `since` | `tenant` |

## Return types

### `Contact`

| Field | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Contact id |
| `tenant` | `string` | Tenant hex |
| `owner` | `string` | Owner user hex |
| `vcard` | `string` | Raw vCard 4.0 |
| `etag` | `string` | Concurrency token |
| `created` | `Date?` | |
| `updated` | `Date?` | |

### `ListResp`

```ts
{ items: Contact[]; next: string }
```

### `SyncResp`

```ts
{ changed: Contact[]; removed: string[] }
```

### Example

```ts
{
  hex: 'C0X…',
  tenant: 'T0X…',
  owner: 'U0X…',
  vcard: 'BEGIN:VCARD\nVERSION:4.0\nFN:Ada\nEND:VCARD',
  etag: '"1"',
  created: new Date('…'),
  updated: new Date('…'),
}
```

## Errors

`HermesGrpcError` — e.g. `NOT_FOUND`, `FAILED_PRECONDITION` (etag mismatch), `PERMISSION_DENIED`.
