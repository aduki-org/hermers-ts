# Appointments

## POST /user/appointments

Auth: Key or Bearer (scope: `appointments:write`)

Body: `{ "service": "string", "start": "string (YYYY-MM-DD HH:MM:SS)", "end": "string", "timezone": "string?", "uid": "string?", "method": "string?", "event": "string?", "location": "string?", "notes": "string?", "rescheduled": "string?", "meta": "object?" }`

Response: `Appointment` model

**Appointment:**

| Field | Type |
| --- | --- |
| hex | string |
| tenant | string |
| service | string |
| host | string |
| start | datetime |
| end | datetime |
| timezone | string |
| status | string |
| uid | string |
| sequence | i32 |
| method | string |
| event | string? |
| location | object |
| notes | string? |
| cancelled | datetime? |
| rescheduled | string? |
| meta | object |
| created | datetime |
| updated | datetime |

## GET /user/appointments

Query: `?after={hex}&limit=N`

## GET /user/appointments/active

Same type.

## GET /user/appointments/{hex}

Single appointment.

## PATCH /user/appointments/{hex}/status

Body: `{ "status": "string" }`.

## PATCH /user/appointments/{hex}/cancel

Body: `{}`

## DELETE /user/appointments/{hex}

Auth required.
