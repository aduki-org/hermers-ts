# Events (`hermes.events`)

Calendar events under `/user/events`.

**Sources:** `crates/api/src/handlers/tenant/user/events/*`, `crates/db/src/views/dav/events.rs`.

```ts
const page = await hermes.events.list({ limit: 50 });
const created = await hermes.events.create({
  calendar: 'L0X…',
  uid: 'evt-1@example.com',
  ical: 'BEGIN:VCALENDAR\n…\nEND:VCALENDAR',
  summary: 'Sync',
  start: '2026-08-01T10:00:00',
  end: '2026-08-01T11:00:00',
});
// { hex, etag, uid }
```

## Methods

| SDK | HTTP | Returns |
| --- | --- | --- |
| `list` / `range` / `recurring` / `search` / `upcoming` / `past` | `GET /user/events…` | `Page<Events>` |
| `create(data)` | `POST /user/events` | `{ hex, etag, uid }` |
| `update(hex, data)` | `PATCH /user/events/{hex}` | `{ hex, etag, uid }` |
| `del(hex)` | `DELETE /user/events/{hex}` | `null` |

## Create request

| Field | Type | Required |
| --- | --- | --- |
| `calendar` | string | yes |
| `uid` | string | yes |
| `ical` | string | yes |
| `href` | string | no |
| `start` / `end` | datetime string | no |
| `summary` / `description` / `location` / `kind` / `rrule` / `timezone` | string | no |
| `attendees` | string[] | no |
| `recurring` | boolean | no |

## List item (`Events`)

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `uid` | string | no |
| `start` / `end` | datetime | yes |
| `created` | datetime | no |
| `total` | number | no |

List rows do **not** include `summary` / `ical` / `attendees`. Those appear on create body and on `EventDetail` (`ical`, `etag`, `calendar: { hex, name }`) when a detail route is used.

## Create / update response

```json
{ "hex": "E0X…", "etag": "\"1\"", "uid": "evt-1@example.com" }
```

## Errors

`{ "error": "…", "message": "…" }` — see [Types](../../types/index.md).
