# Events

## GET /user/events

Auth: Key or Bearer (scope: `calendars:read`)

Query: `?after={hex}&limit=N`

Response 200: `Page<Events>` — hex, uid, start?, end?, created, total

## GET /user/events/range/{start}/{end}

Same type. start/end as ISO datetime strings.

## GET /user/events/recurring

Same type.

## GET /user/events/search/{q}

Same type.

## GET /user/events/upcoming

Same type.

## GET /user/events/past

Same type.

## POST /user/events

Auth: Key or Bearer (scope: `calendars:write`)

Body: `{ "calendar": "string", "uid": "string", "ical": "string", "href": "string?", "start": "datetime?", "end": "datetime?", "summary": "string?", "description": "string?", "location": "string?", "attendees": ["string"]?, "recurring": "bool?", "kind": "string?", "rrule": "string?", "timezone": "string?" }`

Response 200: `{ "hex": "string", "etag": "string", "uid": "string" }`

## PATCH /user/events/{hex}

Auth: Key or Bearer (scope: `calendars:write`)

Body: `{ "ical": "string?", "summary": "string?", "description": "string?", "location": "string?" }`

Response 200: `{ "hex": "string", "etag": "string", "uid": "string" }`

## DELETE /user/events/{hex}

Auth: Key or Bearer (scope: `calendars:write`)
