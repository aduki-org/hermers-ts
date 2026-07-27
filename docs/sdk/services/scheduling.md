# Scheduling (`hermes.scheduling`)

Booking services, appointments, availability windows, and public book links.

```ts
const services = await hermes.scheduling.services();
const slots = await hermes.scheduling.availability(
  '2026-08-01T00:00:00Z',
  '2026-08-07T00:00:00Z'
);
const appts = await hermes.scheduling.appointments({ limit: 20 });
```

## Public booking

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `view` | `(slug) => Promise<Service>` | `GET /book/{slug}` | Service |
| `book` | `(slug, data) => Promise<{ appt; guest }>` | `POST /book/{slug}` | Appointment + guest |
| `guest` | `(token) => Promise<{ appt; guest }>` | `GET /book/guest/{token}` | Appointment + guest |
| `cancelGuest` | `(token) => Promise<{ status: string }>` | `POST /book/guest/{token}/cancel` | Status |

### `book` body

| Field | Type | Required |
| --- | --- | --- |
| `name` | `string` | yes |
| `email` | `string` | yes |
| `start` | `string` | yes |
| `end` | `string` | yes |

## Appointments

| Method | Signature | Returns |
| --- | --- | --- |
| `createAppointment` | `(data) => Promise<Appointment>` | Appointment |
| `appointments` | `(query?) => Promise<Page<Appointment>>` | Page |
| `retrieveAppointment` | `(hex) => Promise<Appointment>` | Appointment |
| `cancelAppointment` | `(hex) => Promise<{ ok: boolean }>` | Ack |
| `deleteAppointment` | `(hex) => Promise<{ ok: boolean }>` | Ack |

### `createAppointment` body

| Field | Type | Required |
| --- | --- | --- |
| `service` | `string` | yes |
| `start` | `string` | yes |
| `end` | `string` | yes |
| `timezone` | `string` | no |
| `uid` | `string` | no |
| `method` | `string` | no |
| `event` | `string` | no |
| `location` | `string` | no |
| `notes` | `string` | no |
| `rescheduled` | `string` | no |
| `meta` | `object` | no |

## Services & availability

| Method | Signature | Returns |
| --- | --- | --- |
| `createService` | `(data) => Promise<Service>` | Service |
| `services` | `() => Promise<Service[]>` | Array (not paged) |
| `retrieveService` | `(hex) => Promise<Service>` | Service |
| `deleteService` | `(hex) => Promise<void>` | Empty |
| `windows` | `() => Promise<Window[]>` | Weekly windows |
| `overrides` | `() => Promise<Override[]>` | Date overrides |
| `availability` | `(start, end) => Promise<Availability>` | Slots |

### `createService` body

| Field | Type | Required |
| --- | --- | --- |
| `name` | `string` | yes |
| `slug` | `string` | yes |
| `duration` | `number` | yes — minutes |
| `buffer` | `number` | no |
| `notice` | `number` | no |
| `horizon` | `number` | no |
| `increment` | `number` | no |
| `max` | `number` | no |
| `location` | `object` | no |
| `questions` | `string[]` | no |
| `meta` | `object` | no |

## Return types

### `Service`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `tenant` | `string?` |
| `user` | `string?` |
| `name` | `string` |
| `slug` | `string` |
| `description` | `string?` |
| `duration` | `number` |
| `buffer` | `number?` |
| `notice` | `number?` |
| `horizon` | `number?` |
| `increment` | `number?` |
| `max` | `number?` |
| `location` | `object?` |
| `questions` | `string[]?` |
| `active` | `boolean?` |
| `meta` | `object?` |
| `created` | `string?` |
| `updated` | `string?` |

### `Appointment`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `tenant` | `string` |
| `service` | `string` |
| `host` | `string` |
| `start` | `string` |
| `end` | `string` |
| `timezone` | `string` |
| `status` | `string` |
| `uid` | `string` |
| `sequence` | `number` |
| `method` | `string` |
| `event` | `string?` |
| `location` | `object` |
| `notes` | `string?` |
| `cancelled` | `string?` |
| `rescheduled` | `string?` |
| `meta` | `object` |
| `created` | `string` |
| `updated` | `string` |

### `Guest`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `tenant` | `string` |
| `appointment` | `string` |
| `user` | `string?` |
| `name` | `string` |
| `email` | `string` |
| `phone` | `string?` |
| `status` | `string` |
| `answers` | `object` |
| `token` | `string` |
| `notified` | `string?` |
| `created` | `string` |
| `updated` | `string` |

### `Availability`

```ts
{ slots: Array<{ start: string; end: string }> }
```

### `Window` / `Override`

| Type | Fields |
| --- | --- |
| `Window` | `hex`, `day` (0–6), `start`, `end` |
| `Override` | `hex`, `date`, `available` |

### Book response

```json
{
  "appt": { "hex": "A0X…", "status": "confirmed", "start": "…", "end": "…" },
  "guest": { "hex": "G0X…", "email": "guest@example.com", "token": "…" }
}
```

## Errors

Slot taken / outside windows → `400` / `409`. Unknown slug/token → `404`. Throws `HermesError`.
