# Audits

## GET /tenant/audits

Auth: Key or Bearer (scope: `audits:read`)

Query: `?after={hex}&limit=N`

Response: `Page<Audits>` — hex, action, success (bool), reason? (string), ip? (string), agent? (string), device? (object), created (datetime), actor? (object), total (i64)

## GET /tenant/audits/action/{action}

Same type.

## GET /tenant/audits/failed

Same type.

## GET /tenant/audits/successful

Same type.

## GET /tenant/audits/ip/{ip}

Same type.

## GET /tenant/audits/user/{user}

Same type.

## GET /tenant/audits/user/{user}/action/{action}

Same type.

## GET /tenant/audits/user/{user}/failed

Same type.

## GET /tenant/audits/user/{user}/successful

Same type.

## GET /tenant/audits/user/{user}/ip/{ip}

Same type.