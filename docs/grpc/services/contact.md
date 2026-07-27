# Contact (`client.contacts`)

Wraps `hermes.contact.ContactService`.

`tenant` / `owner` on Create, List, and Sync are injected from the whoami cache.

## Methods

| Method | RPC |
| --- | --- |
| `list({ cursor?, limit? })` | `List` |
| `retrieve(hex)` | `Get` |
| `create({ vcard })` | `Create` |
| `update({ hex, vcard, etag })` | `Update` |
| `del(hex)` | `Remove` |
| `sync({ since })` | `Sync` |

## Example

```ts
await client.ready();
const { items } = await client.contacts.list({ limit: 50 });
await client.contacts.create({ vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Ada\nEND:VCARD' });
```
