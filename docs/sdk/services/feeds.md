# Feeds (`hermes.feeds`)

External calendar ICS feeds under `/user/feeds`.

**Sources:** `crates/api/src/handlers/tenant/user/feeds/*`, `crates/db/src/models/scheduling/feeds.rs`.

```ts
const feeds = await hermes.feeds.list();
const feed = await hermes.feeds.create({
  connection: 'L0X…',
  remote: 'https://example.com/calendar.ics',
  name: 'Holidays',
  color: '#336699',
  block: false,
});
```

## Methods

| SDK | HTTP | Returns |
| --- | --- | --- |
| `create(data)` | `POST /user/feeds` | `Feed` model |
| `list()` | `GET /user/feeds` | `Feed[]` |
| `retrieve(hex)` | `GET /user/feeds/{hex}` | `Feed` model |
| `del(hex)` | `DELETE /user/feeds/{hex}` | `null` |

(gRPC also has `update` / `sync` — see [gRPC Feed](../../grpc/services/feed.md).)

## Create request

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `connection` | string | yes | target calendar hex |
| `remote` | string | yes | HTTPS `.ics` URL |
| `name` | string | yes | |
| `color` | string | no | |
| `block` | boolean | no | `false` |

## Response — `Feed` model

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `user` / `connection` / `remote` / `name` | string | no |
| `color` | string | yes |
| `block` / `active` | boolean | no |
| `sync` | string | yes |
| `meta` | object | no |
| `last` | datetime | yes |
| `created` / `updated` | datetime | no |

```json
{
  "id": 1,
  "hex": "F0X…",
  "tenant": "T0X…",
  "user": "U0X…",
  "connection": "L0X…",
  "remote": "https://example.com/calendar.ics",
  "name": "Holidays",
  "color": "#336699",
  "block": false,
  "sync": null,
  "active": true,
  "meta": {},
  "last": null,
  "created": "2026-07-28T12:00:00",
  "updated": "2026-07-28T12:00:00"
}
```

## Errors

`{ "error": "…", "message": "…" }` — see [Types](../../types/index.md).
