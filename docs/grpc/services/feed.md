# Feed (`client.feeds`)

Wraps `hermes.feeds.FeedService` — external calendar ICS feeds.

```ts
const { items } = await client.feeds.list();
const feed = await client.feeds.create({
  connection: 'L0X…', // calendar hex
  remote: 'https://example.com/calendar.ics',
  name: 'Public holidays',
  color: '#336699',
  block: false,
});
const sync = await client.feeds.sync(feed.hex);
```

## Methods

| Method | Signature | Returns |
| --- | --- | --- |
| `create` | `({ connection, remote, name, color?, block? }) => Promise<Feed>` | Feed |
| `list` | `() => Promise<ListResp>` | `{ items: Feed[] }` |
| `retrieve` | `(hex) => Promise<Feed>` | Feed |
| `update` | `({ hex, color?, block?, active?, name? }) => Promise<Feed>` | Feed |
| `del` | `(hex) => Promise<{ removed: boolean }>` | Ack |
| `sync` | `(hex) => Promise<SyncResp>` | Sync stats |

### `create` params

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `connection` | `string` | yes | Target calendar hex |
| `remote` | `string` | yes | HTTPS URL of `.ics` |
| `name` | `string` | yes | Display name |
| `color` | `string` | no | |
| `block` | `boolean` | no | Default `false` |

## Return types

### `Feed`

| Field | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Feed id |
| `tenant` | `string` | |
| `user` | `string` | |
| `connection` | `string` | Calendar hex |
| `remote` | `string` | ICS URL |
| `name` | `string` | |
| `color` | `string?` | |
| `block` | `boolean` | |
| `active` | `boolean` | |
| `last` | `string?` | ISO-8601 last sync |

### `SyncResp`

```ts
{ ok: boolean; inserted: number; updated: number }
```

### `RemoveResp`

```ts
{ removed: boolean }
```

## Errors

Invalid URL / calendar → `INVALID_ARGUMENT` / `NOT_FOUND`. Throws `HermesGrpcError`.
