# Contacts (`hermes.contacts`)

CardDAV contacts under `/user/contacts`. Tenant/user come from the session — never send them in the body.

**Sources:** `crates/api/src/handlers/tenant/user/contacts/*`, `crates/api/src/data/tenant/user/contacts.rs`, `crates/db/src/models/dav/contacts.rs`, `crates/db/src/views/dav/contacts.rs`.

```ts
await hermes.ready();
const created = await hermes.contacts.create({
  name: 'Ada Lovelace',
  emails: ['ada@example.com'],
  vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Ada Lovelace\nEND:VCARD',
  meta: {},
});
const page = await hermes.contacts.list({ limit: 50 });
```

## Routes & SDK methods

| SDK | HTTP | Returns |
| --- | --- | --- |
| `create(data)` | `POST /user/contacts` | **`Contact` model** (full row) |
| `list(query?)` | `GET /user/contacts` | `Page<Contacts>` |
| `group(group)` | `GET /user/contacts/group/{group}` | `Page<Contacts>` |
| `search(q)` | `GET /user/contacts/search/{q}` | `Page<Contacts>` |
| `updateVcard` / `updateEmails` / `updatePhones` / `updateGroups` / `updateMeta` | `PATCH …/{hex}/…` | JSON **`null`** |
| `del(hex)` | `DELETE /user/contacts/{hex}` | JSON **`null`** |

There is **no** `GET /user/contacts/{hex}` on REST — the SDK does not expose `retrieve`. **gRPC** `ContactService.Get` does exist (`client.contacts.retrieve`) and returns the proto `Contact` (`hex`, `tenant`, `owner`, `vcard`, `etag`, timestamps) — a different shape from the REST create model / list row.

Scope: `contacts:read` / `contacts:write`.

## Create request (`ContactData`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `vcard` | string | yes | |
| `name` | string | **yes** | non-empty, max 200 |
| `emails` | string[] | no | |
| `phones` | string[] | no | |
| `groups` | string[] | no | |
| `meta` | object | **yes** | any JSON object |

## Create response (`Contact`)

```json
{
  "id": 1,
  "hex": "C0X…",
  "tenant": "T0X…",
  "user": "U0X…",
  "etag": "…",
  "vcard": "BEGIN:VCARD…",
  "name": "Ada Lovelace",
  "emails": ["ada@example.com"],
  "phones": [],
  "groups": [],
  "meta": {},
  "book": null,
  "href": null,
  "uid": null,
  "version": null,
  "size": null,
  "deleted": null,
  "created": "2026-07-28T12:00:00",
  "updated": "2026-07-28T12:00:00"
}
```

| Field | Type | Nullable |
| --- | --- | --- |
| `id` | number | no |
| `hex` / `tenant` / `user` / `etag` / `vcard` | string | no |
| `name` | string | yes |
| `emails` / `phones` / `groups` | (string\|null)[] | no |
| `meta` | object | no |
| `book` / `href` / `uid` / `version` | string | yes |
| `size` | number | yes |
| `deleted` | datetime | yes |
| `created` / `updated` | datetime | no |

## List item (`Contacts`)

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` | string | no |
| `etag` | string | no |
| `name` | string | yes |
| `emails` / `phones` / `groups` | (string\|null)[] | no |
| `created` | datetime | no |
| `total` | number | no (window count; also on `Page.total`) |

### Page envelope

```json
{
  "items": [ /* Contacts */ ],
  "total": 42,
  "next": "C0X…"
}
```

## Patch bodies

| Endpoint | Body |
| --- | --- |
| `…/vcard` | `{ "vcard": string, "name"?: string }` |
| `…/emails` | `{ "emails": string[] }` |
| `…/phones` | `{ "phones": string[] }` |
| `…/groups` | `{ "groups": string[] }` |
| `…/meta` | `{ "meta": object }` |

**Response:** `null` (not `{ "ok": true }`).

## Errors

API: `{ "error": "forbidden"|"validation"|"not_found"|…, "message": "…" }` with status 403 / 422 / 404. See [Types](../../types/index.md).
