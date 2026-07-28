# Scheduling (`hermes.scheduling`)

Booking services, appointments, windows, overrides, availability, and public book links.

```ts
const services = await hermes.scheduling.services();
const avail = await hermes.scheduling.availability(
  '2026-08-01T00:00:00',
  '2026-08-07T00:00:00'
);
// avail.slots + avail.busy
```

## Public booking

| SDK | HTTP | Returns |
| --- | --- | --- |
| `view(slug)` | `GET /book/{slug}` | `Service` |
| `book(slug, data)` | `POST /book/{slug}` | `{ appointment, guest }` |
| `guest(token)` | `GET /book/guest/{token}` | `{ guest, appointment }` |
| `cancelGuest(token)` | `POST /book/guest/{token}/cancel` | `{ status: "canceled" }` |

### Book body

| Field | Type | Required | Format |
| --- | --- | --- | --- |
| `name` / `email` | string | yes | |
| `start` / `end` | string | yes | `%Y-%m-%dT%H:%M:%S` |

### Book response

```json
{
  "appointment": { /* Appointment model */ },
  "guest": { /* Guest model */ }
}
```

Key is **`appointment`**, not `appt`.

## Appointments

### Create body (API `Create`)

| Field | Type | Required |
| --- | --- | --- |
| `host` | string | **yes** |
| `service` | string | **yes** |
| `start` / `end` | string | yes — `%Y-%m-%dT%H:%M:%S` |
| `timezone` | string | yes |
| `uid` | string | yes |
| `method` | string | yes |
| `event` | string | no |
| `location` | object | no |
| `notes` | string | no |
| `rescheduled` | string | no |
| `meta` | object | **yes** |

### `Appointment` model

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `service` / `host` | string | no |
| `start` / `end` | datetime | no |
| `timezone` / `uid` / `method` | string | no |
| `status` | `"pending"\|"confirmed"\|"cancelled"\|"completed"\|"noshow"` | no |
| `sequence` | number | no |
| `event` | string | yes |
| `location` | object | yes |
| `notes` | string | yes |
| `cancelled` | datetime | yes |
| `rescheduled` | string | yes |
| `meta` | object | no |
| `created` / `updated` | datetime | no |

## Services — `Service` model

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `user` / `name` / `slug` | string | no |
| `description` | string | yes |
| `duration` / `buffer` / `notice` / `horizon` / `increment` | number | no |
| `max` | number | yes |
| `location` | object | no |
| `questions` | json (often array) | no |
| `active` | boolean | no |
| `meta` | object | no |
| `created` / `updated` | datetime | no |

Create defaults (handler): duration 30, buffer 0, notice 60, horizon 86400, increment 30.

`services()` returns `Service[]` (not a page).

## Windows — `Window` model (`GET /user/windows` → `Window[]`)

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `user` / `name` / `timezone` | string | no |
| `priority` | number | no |
| `start` / `end` | datetime | yes |
| `busytype` | string | no |
| `rrule` | string | yes |
| `slots` | object/array (json) | no |
| `active` | boolean | no |
| `meta` | object | no |
| `created` / `updated` | datetime | no |

This is **not** `{ day, start, end }`.

## Overrides — `Override` model

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `user` | string | no |
| `window` | string | yes |
| `start` / `end` | datetime | no |
| `available` | boolean | no |
| `reason` | string | yes |
| `created` | datetime | no |

## Availability

`GET /user/availability/{start}/{end}` — path datetimes `%Y-%m-%dT%H:%M:%S`.

```json
{
  "slots": [{ "start": "2026-08-01T10:00:00", "end": "2026-08-01T10:30:00" }],
  "busy": [{ "start": "…", "end": "…", "title": null }]
}
```

## Guest model

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `appointment` / `name` / `email` / `token` | string | no |
| `user` / `phone` | string | yes |
| `status` | `"pending"\|"accepted"\|"declined"\|"tentative"` | no |
| `answers` | object | no |
| `notified` | datetime | yes |
| `created` / `updated` | datetime | no |


## Appointment extras

| SDK | HTTP | Returns |
| --- | --- | --- |
| `activeAppointments(query?)` | `GET /user/appointments/active` | `Page<Appointment>` |
| `guests(hex)` | `GET /user/appointments/{hex}/guests` | `Guest[]` |
| `updateAppointmentStatus(hex, status)` | `PATCH /user/appointments/{hex}/status` `{ status }` | `Appointment` |

`status`: `confirmed`\|`canceled`\|`completed`\|`no_show`\|`pending`.

## Errors

`{ "error": "…", "message": "…" }` — see [Types](../../types/index.md).
