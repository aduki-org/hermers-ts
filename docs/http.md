# REST cheatsheet (`@hermers/sdk`)

```ts
import Hermes, { BASE_URL, HermesError } from '@hermers/sdk';

const hermes = new Hermes(process.env.HERMERS_API_KEY!);
await hermes.ready();

hermes.me; // { hex, user, tenant, owner, scopes, deny, tier, ip, agent }

const contacts = await hermes.contacts.list({ limit: 50 });
// Contacts row: hex, etag, name?, emails, phones, groups, created, total

const inbox = await hermes.mail.inbox({ limit: 50 });
// Messages row uses internaldate (not date); mailbox: { hex, name }

const user = await hermes.user.retrieve();
// Full User model (id, hex, tenant, email, name, state, …)

const { hex, key } = await hermes.keys.create({
  name: 'ci',
  scopes: ['contacts:read'],
});

const hook = await hermes.tenant.createWebhook({
  url: 'https://api.example.com/hooks',
  secret: 'whsec_xxxxxxxxxxxxxxxx',
  events: ['message.sent'],
});
```

Defaults: `BASE_URL === 'https://hermers.aduki.pro/v1'`.

**Page:** `{ items, total, next? | page?/pages? }`.

**Errors:** `{ "error": "<code>", "message": "<text>" }` → `HermesError`.

Guides: [sdk/index.md](sdk/index.md) · [Types](types/index.md) · [Auth](sdk/services/auth.md).
