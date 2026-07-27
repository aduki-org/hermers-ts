# Whoami

Both SDKs resolve identity with **whoami** on construct and cache it. Prefer `await client.ready()` before the first resource call. Resource methods never take tenant/user hex.

**REST source:** `crates/api/src/handlers/auth/whoami.rs`.  
**gRPC source:** `SessionService.Whoami` → proto `Session` (`proto/session.proto` / generated types).

## Identity fields (REST wire + SDK cache)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hex` | string | yes (wire) | Session / JTI (`A0S…`) |
| `user` | string | yes | User hex (`U0X…`) — **string, not object** |
| `tenant` | string | yes | Tenant hex (`T0X…`) — **string, not object** |
| `owner` | boolean | yes | Tenant owner |
| `scopes` | string[] | yes | Flattened `"domain.scope"` patterns |
| `deny` | string[] | yes | Deny patterns |
| `tier` | string | yes | Plan slug (e.g. `free`) |
| `ip` | string | yes | Always `""` in current handler |
| `agent` | string | yes | Always `""` in current handler |

SDK `Identity` may also keep `raw` (full payload) and optional `email` / `name` if present on other transports.

## REST example (owner)

```json
{
  "hex": "A0S1C3905B195668274E",
  "user": "U0X3BFF58E91EC7",
  "tenant": "T0X9E68DD4B15C6",
  "owner": true,
  "scopes": ["user.user.**", "tenant.tenant.**"],
  "deny": [],
  "tier": "free",
  "ip": "",
  "agent": ""
}
```

## REST example (member)

```json
{
  "hex": "A0SDFF10B7035B677847",
  "user": "U0XC4DA9167DAD0",
  "tenant": "T0X9E68DD4B15C6",
  "owner": false,
  "scopes": [
    "user.mail.**",
    "user.contacts.**",
    "user.mailboxes.read",
    "user.events.read.self",
    "user.user.**",
    "tenant.mail.**",
    "tenant.contacts.**",
    "tenant.mailboxes.read",
    "tenant.events.read.self"
  ],
  "deny": [],
  "tier": "free",
  "ip": "",
  "agent": ""
}
```

```ts
import Hermes from '@hermers/sdk';
const hermes = new Hermes('hm_live_…');
await hermes.ready();
console.log(hermes.me?.tenant, hermes.me?.user, hermes.me?.scopes);
```

See [Authentication & API keys](sdk/services/auth.md).

## gRPC (`Session`)

| Field | Type |
| --- | --- |
| `hex` / `user` / `tenant` / `tier` / `ip` / `agent` | string |
| `owner` | boolean |
| `scopes` / `deny` | string[] |
| `created` / `expires` / `refreshed` | timestamp / Date? |

```ts
import { HermesGrpc } from '@hermers/grpc';
const client = new HermesGrpc('hm_live_…');
await client.ready();
console.log(client.me?.tenant, client.me?.user);
client.close();
```

See [Session](grpc/services/session.md).

## Auth model

**API key only** in the published SDKs. Browser/admin `POST /auth/login` is not wrapped.
