# Authentication & API keys

`@hermers/sdk` has **no** `auth.login` / password / JWT refresh surface.

## API key

```ts
import Hermes from '@hermers/sdk';

const hermes = new Hermes('hm_live_xxxxxxxxxxxxxxxxxxxxxxxx');
await hermes.ready(); // GET /auth/whoami
```

Header on every request:

```http
Authorization: Key hm_live_…
```

## Creating keys

```ts
const { hex, key } = await hermes.keys.create({
  name: 'ci-bot',
  scopes: ['contacts:read', 'mail:read'],
});
// `key` is the raw secret — show once. Server only stores SHA-256(hash) + prefix.
```

Helpers: `generateKey()`, `hashKey()`, `prefixKey()` from `@hermers/sdk`.

## Whoami

```ts
const id = await hermes.whoami();
// id.user, id.tenant, id.owner, id.scopes, id.tier
hermes.me; // same cache
```

HTTP shape: see [guide/http/auth.md](../../guide/http/auth.md) (`GET /auth/whoami`).
