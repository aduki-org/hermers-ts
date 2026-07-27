# Feeds

## POST /user/feeds

Auth: Key or Bearer (scope: `calendars:write`)

Body: `{ "connection": "string", "remote": "string", "name": "string", "color": "string?", "block": "bool?" }`

Response: `Feed` model *(hex, tenant, user, connection, remote, name, color?, block, sync?, active, meta, last?, created, updated)*

## GET /user/feeds

Auth: Key or Bearer (scope: `calendars:read`)

Response: `Vec<Feed>` — array, not paged.

## GET /user/feeds/{hex}

Response: `Feed`

## PATCH /user/feeds/{hex}

Auth: Key or Bearer (scope: `calendars:write`)

## DELETE /user/feeds/{hex}

## POST /user/feeds/{hex}/sync

Auth: Key or Bearer