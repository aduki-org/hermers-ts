# Contacts (`hermes.contacts`)

CardDAV contacts via `POST/GET/PATCH/DELETE /user/contacts`.

Tenant and user come from the session (whoami). **Never pass tenant/user hex.**

## Methods

| Method | HTTP |
| --- | --- |
| `create({ vcard, name?, emails?, phones?, groups?, meta? })` | `POST /user/contacts` |
| `list(query?)` | `GET /user/contacts` |
| `group(group)` | `GET /user/contacts/group/{group}` |
| `search(q)` | `GET /user/contacts/search/{q}` |
| `retrieve(hex)` | `GET /user/contacts/{hex}` |
| `updateVcard(hex, vcard)` | `PATCH …/vcard` |
| `updateEmails` / `updatePhones` / `updateGroups` / `updateMeta` | `PATCH …` |
| `del(hex)` | `DELETE /user/contacts/{hex}` |

## Example

```ts
await hermes.ready();
const created = await hermes.contacts.create({
  name: 'Ada Lovelace',
  emails: ['ada@example.com'],
  vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Ada Lovelace\nEND:VCARD',
});
const page = await hermes.contacts.list({ limit: 50 });
```

API reference: [guide/http/user/contacts.md](../../../guide/http/user/contacts.md).
