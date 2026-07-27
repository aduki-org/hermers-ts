# Guests

## GET /user/appointments/{hex}/guests

Auth: Key or Bearer (scope: `appointments:read`)

Response: `Vec<Guest>` — array. Guest: hex, tenant, appointment, user?, name, email, phone?, status, answers, token, notified?, created, updated