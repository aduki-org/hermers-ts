# REST cheatsheet (`@hermers/sdk`)

```ts
import Hermes, { BASE_URL, HermesError, generateKey, hashKey } from '@hermers/sdk';

const hermes = new Hermes(process.env.HERMERS_API_KEY!);
await hermes.ready();

// Identity
hermes.me;           // { user, tenant, ... } | undefined
await hermes.whoami();

// Contacts — no tenant/user args
await hermes.contacts.create({ vcard: 'BEGIN:VCARD...', name: 'Ada' });
await hermes.contacts.list({ limit: 50 });
await hermes.contacts.retrieve(hex);
await hermes.contacts.del(hex);

// Mail
await hermes.mail.inbox();
await hermes.mail.listMailboxes();

// Keys (hash stays client-side)
const { hex: keyId, key } = await hermes.keys.create({
  name: 'ci',
  scopes: ['contacts:read'],
});
// show `key` once; store only in a secret manager
```

Defaults: `BASE_URL === 'https://hermers.aduki.pro/v1'`. Auth header: `Authorization: Key …`.

Errors: `HermesError`. Full guide: [sdk/index.md](sdk/index.md).
