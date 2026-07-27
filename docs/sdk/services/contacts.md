# Contacts (`hermes.contacts`)

CardDAV contacts via `/user/contacts`. Tenant and user come from whoami — **never pass tenant/user hex**.

```ts
await hermes.ready();
const created = await hermes.contacts.create({
  name: 'Ada Lovelace',
  emails: ['ada@example.com'],
  vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Ada Lovelace\nEND:VCARD',
});
const page = await hermes.contacts.list({ limit: 50 });
```

## Methods

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `create` | `(data) => Promise<ContactDetail>` | `POST /user/contacts` | Full contact |
| `list` | `(query?: ListQuery) => Promise<Page<Contact>>` | `GET /user/contacts` | Page |
| `group` | `(group: string) => Promise<Page<Contact>>` | `GET /user/contacts/group/{group}` | Page |
| `search` | `(q: string) => Promise<Page<Contact>>` | `GET /user/contacts/search/{q}` | Page |
| `retrieve` | `(hex: string) => Promise<ContactDetail>` | `GET /user/contacts/{hex}` | Detail |
| `updateVcard` | `(hex, vcard) => Promise<{ ok: boolean }>` | `PATCH …/vcard` | Ack |
| `updateEmails` | `(hex, emails) => Promise<{ ok: boolean }>` | `PATCH …/emails` | Ack |
| `updatePhones` | `(hex, phones) => Promise<{ ok: boolean }>` | `PATCH …/phones` | Ack |
| `updateGroups` | `(hex, groups) => Promise<{ ok: boolean }>` | `PATCH …/groups` | Ack |
| `updateMeta` | `(hex, meta) => Promise<{ ok: boolean }>` | `PATCH …/meta` | Ack |
| `del` | `(hex: string) => Promise<{ ok: boolean }>` | `DELETE /user/contacts/{hex}` | Ack |

Typical scopes: `contacts:read` / `contacts:write`.

## Request: `create`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `vcard` | `string` | yes | vCard payload |
| `name` | `string` | no | Display name |
| `emails` | `string[]` | no | |
| `phones` | `string[]` | no | |
| `groups` | `string[]` | no | |
| `meta` | `object` | no | Defaults to `{}` |

## Query: `list`

| Field | Type | Description |
| --- | --- | --- |
| `after` | `string?` | Cursor hex |
| `limit` | `number?` | Page size |
| `page` | `number?` | 1-based page |
| `group` | `string?` | Filter by group |
| `search` | `string?` | Search string |

## Returns

### `Contact` (list rows)

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `etag` | `string` |
| `name` | `string?` |
| `emails` | `string[]?` |
| `phones` | `string[]?` |
| `groups` | `string[]?` |
| `created` | `string` |
| `total` | `number?` |

### `ContactDetail` (create / retrieve)

All `Contact` fields plus:

| Field | Type |
| --- | --- |
| `vcard` | `string?` |
| `meta` | `Record<string, unknown>?` |
| `user` | `Record<string, unknown>?` |

### Page envelope

```ts
{
  items: Contact[];
  total: number;
  next?: string;
  page?: number;
  pages?: number;
}
```

### Example create response

```json
{
  "hex": "C0X…",
  "etag": "\"abc123\"",
  "name": "Ada Lovelace",
  "emails": ["ada@example.com"],
  "phones": [],
  "groups": [],
  "vcard": "BEGIN:VCARD\nVERSION:3.0\nFN:Ada Lovelace\nEND:VCARD",
  "meta": {},
  "created": "2026-07-28T00:00:00Z",
  "user": {}
}
```

### Mutation ack

```json
{ "ok": true }
```

## Errors

| Condition | Typical |
| --- | --- |
| Missing write scope | `403` / `forbidden` |
| Unknown hex | `404` |
| Invalid vCard | `400` with optional `field` |

Throws `HermesError` — see [Types](../../types/index.md).
