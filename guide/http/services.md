# Services

## POST /user/services

Auth: Key or Bearer (scope: `services:write`)

Body: `{ "name": "string", "slug": "string", "duration": "i32", "buffer": "i32?", "notice": "i32?", "horizon": "i32?", "increment": "i32?", "max": "i32?", "location": "object?", "questions": ["string"]?, "meta": "object?" }`

Response: `Service` — hex, tenant, user, name, slug, description?, duration, buffer, notice, horizon, increment, max?, location, questions, active, meta, created, updated

## GET /user/services

Response: `Vec<Service>` — array

## GET /user/services/{hex}

Response: `Service`

## DELETE /user/services/{hex}

Response: `Json<()>`
