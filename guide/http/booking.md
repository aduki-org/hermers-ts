# Booking (public)

## GET /book/{slug}

Auth: none

Response: `Service` model

## POST /book/{slug}

Auth: none

Request body: `{ "name": "string", "email": "string", "start": "string", "end": "string" }` — start/end in `YYYY-MM-DD HH:MM:SS` format.

Response 200:

```json
{
  "appt": {
    "hex": "string",
    "tenant": "string",
    "service": "string",
    "host": "string",
    "start": "datetime",
    "end": "datetime",
    "timezone": "string",
    "status": "string",
    "uid": "string",
    "sequence": "i32",
    "method": "string",
    "event": "string?",
    "location": "object",
    "notes": "string?",
    "cancelled": "datetime?",
    "rescheduled": "string?",
    "meta": "object",
    "created": "datetime",
    "updated": "datetime"
  },
  "guest": {
    "hex": "string",
    "tenant": "string",
    "appointment": "string",
    "user": "string?",
    "name": "string",
    "email": "string",
    "phone": "string?",
    "status": "string",
    "answers": "object",
    "token": "string",
    "notified": "datetime?",
    "created": "datetime",
    "updated": "datetime"
  }
}
```

## GET /book/guest/{token}

Auth: none

Same response as POST (appt + guest).

## POST /book/guest/{token}/cancel

Auth: none

Response: `{ "status": "canceled" }`
