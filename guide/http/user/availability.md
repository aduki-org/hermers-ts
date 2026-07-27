# Availability

## GET /user/availability/{start}/{end}

Auth: Key or Bearer (scope: `appointments:read`)

start/end: ISO datetime path segments `YYYY-MM-DDTHH:MM:SS`

Response 200: `Availability` — availability object for the range.
