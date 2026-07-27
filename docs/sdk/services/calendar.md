# Calendar (`hermes.calendar`)

CalDAV calendars under `/user/calendars`.

```ts
const page = await hermes.calendar.list({ limit: 50 });
const created = await hermes.calendar.create({
  name: 'Work',
  color: '#336699',
  timezone: 'America/New_York',
});
// created: { hex, etag, sync_token }
```

## Methods

| SDK | HTTP | Returns |
| --- | --- | --- |
| `list(query?)` | `GET /user/calendars` | `Page<Calendars>` |
| `search(q)` | `GET /user/calendars/search/{q}` | `Page<Calendars>` |
| `create(data)` | `POST /user/calendars` | `{ hex, etag, sync_token }` |
| `events(query?)` | `GET /user/calendars/events` | `Page<Events>` (list shape) |

## Create request

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | yes | |
| `description` | string | no | |
| `color` | string | no | |
| `timezone` | string | no | server default `Etc/UTC` |

## Create / edit response

```json
{ "hex": "L0X…", "etag": "…", "sync_token": "…" }
```

## List item (`Calendars`)

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `name` / `timezone` | string | no |
| `description` / `color` | string | yes |
| `created` | datetime | no |
| `total` | number | no |

## Detail view (`CalendarDetail` — when exposed)

Adds `etag`, `sync_token`, `user: { hex, name, email }`.

## Errors

`{ "error": "…", "message": "…" }` — see [Types](../../types/index.md).
