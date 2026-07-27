# Events (`hermes.events`)

Calendar events under `/user/events`.

```ts
const page = await hermes.events.list({ limit: 50 });
const upcoming = await hermes.events.upcoming();
const created = await hermes.events.create({
  calendar: 'L0X…',
  uid: 'evt-1@example.com',
  ical: 'BEGIN:VCALENDAR\n…\nEND:VCALENDAR',
  summary: 'Sync',
  start: '2026-08-01T10:00:00Z',
  end: '2026-08-01T11:00:00Z',
});
```

## Methods

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `list` | `(query?) => Promise<Page<Event>>` | `GET /user/events` | Page |
| `range` | `(start, end) => Promise<Page<Event>>` | `GET /user/events/range/{start}/{end}` | Page |
| `recurring` | `() => Promise<Page<Event>>` | `GET /user/events/recurring` | Page |
| `search` | `(q) => Promise<Page<Event>>` | `GET /user/events/search/{q}` | Page |
| `upcoming` | `() => Promise<Page<Event>>` | `GET /user/events/upcoming` | Page |
| `past` | `() => Promise<Page<Event>>` | `GET /user/events/past` | Page |
| `create` | `(data) => Promise<{ hex; etag; uid }>` | `POST /user/events` | Ids |
| `update` | `(hex, data) => Promise<{ hex; etag; uid }>` | `PATCH /user/events/{hex}` | Ids |
| `del` | `(hex) => Promise<void>` | `DELETE /user/events/{hex}` | Empty |

## Request: `create`

| Field | Type | Required |
| --- | --- | --- |
| `calendar` | `string` | yes — calendar hex |
| `uid` | `string` | yes — iCal UID |
| `ical` | `string` | yes — iCalendar payload |
| `href` | `string` | no |
| `start` | `string` | no — ISO-8601 |
| `end` | `string` | no |
| `summary` | `string` | no |
| `description` | `string` | no |
| `location` | `string` | no |
| `attendees` | `string[]` | no |
| `recurring` | `boolean` | no |
| `kind` | `string` | no |
| `rrule` | `string` | no |
| `timezone` | `string` | no |

## Request: `update`

| Field | Type |
| --- | --- |
| `ical` | `string?` |
| `summary` | `string?` |
| `description` | `string?` |
| `location` | `string?` |

## Returns

### `Event`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `uid` | `string` |
| `start` | `string?` |
| `end` | `string?` |
| `created` | `string` |
| `ical` | `string?` |
| `href` | `string?` |
| `summary` | `string?` |
| `description` | `string?` |
| `location` | `string?` |
| `attendees` | `string[]?` |
| `recurring` | `boolean?` |
| `kind` | `string?` |
| `rrule` | `string?` |
| `timezone` | `string?` |
| `total` | `number?` |

### Create / update response

```ts
{ hex: string; etag: string; uid: string }
```

```json
{
  "hex": "E0X…",
  "etag": "\"1\"",
  "uid": "evt-1@example.com"
}
```

## Errors

Unknown calendar/event → `404`. Invalid iCal → `400`. Throws `HermesError`.
