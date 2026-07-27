# Calendars

## GET /user/calendars

Auth: Key or Bearer. Response: `Page<Calendars>` *(hex, name, description?, color?, timezone, created, total)*

## GET /user/calendars/search/{q}

Same type.

## GET /user/calendars/events

Same paginated type.

## POST /user/calendars

Body: `{ "name": "string", "description": "string?", "color": "string?", "timezone": "string?" }`. Response: `{ "hex": "string" }`

## PATCH /user/calendars/{hex}

Body: partial calendar fields. Response: `{ "ok": true }`

## DELETE /user/calendars/{hex}

Response: `{ "ok": true }`

## POST /user/events

Create event on calendar. Response: `{ "hex": "string" }`

## PATCH /user/events/{hex}

Edit event. Response: `{ "ok": true }`

## DELETE /user/events/{hex}

Response: `{ "ok": true }`