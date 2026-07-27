# Calendar (`hermes.calendar`)

CalDAV calendar collections under `/user/calendars`.

```ts
const page = await hermes.calendar.list({ limit: 50 });
const { hex } = await hermes.calendar.create({ name: 'Work', color: '#336699' });
const events = await hermes.calendar.events();
```

## Methods

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `list` | `(query?: ListQuery) => Promise<Page<Calendar>>` | `GET /user/calendars` | Page |
| `search` | `(q: string) => Promise<Page<Calendar>>` | `GET /user/calendars/search/{q}` | Page |
| `create` | `({ name, color? }) => Promise<{ hex: string }>` | `POST /user/calendars` | New calendar id |
| `events` | `(query?: ListQuery) => Promise<Page<Event>>` | `GET /user/calendars/events` | Page of events |

### `create` body

| Field | Type | Required |
| --- | --- | --- |
| `name` | `string` | yes |
| `color` | `string` | no |

## Returns

### `Calendar`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `name` | `string` |
| `color` | `string?` |
| `created` | `string` |
| `total` | `number?` |

### Create response

```json
{ "hex": "L0X…" }
```

### `Event` (via `events()`)

See [Events](events.md) for the full `Event` field table. Page envelope: `{ items, total, next?, page?, pages? }`.

## Errors

Missing calendar scopes → `403`. Throws `HermesError`.
