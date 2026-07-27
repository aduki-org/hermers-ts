# Usage

## GET /tenant/usage

Auth: Key or Bearer (scope: `usage:read`)

Query: `?after={hex}&limit=N`

Response: `Page<Usages>` — tenant, metric, window (date), value (i64), ceiling (i64), total (i64)

## GET /tenant/usage/summary

Response: `Vec<Usages>` — array.

## GET /tenant/usage/metric/{metric}

Response: `Page<Usages>`