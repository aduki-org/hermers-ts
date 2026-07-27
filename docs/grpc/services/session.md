# Session (`client.session`)

Wraps `hermes.session.SessionService` for API-key clients.

**Exposed:** `whoami`, `load`, `revoke`, `list`.  
**Not exposed:** Login, Issue, Refresh, Patch (server/admin only).

```ts
const client = new HermesGrpc(process.env.HERMERS_API_KEY!);
await client.ready();
const sessions = await client.session.list({ limit: 20 });
client.close();
```

Prefer root `client.ready()` / `client.whoami()` / `client.me` for identity. `session.whoami()` returns the underlying `Session` message.

## Methods

| Method | Signature | RPC | Returns |
| --- | --- | --- | --- |
| `whoami` | `() => Promise<Session>` | `Whoami` | Session (from cache `raw` when available) |
| `load` | `(jti: string) => Promise<Session>` | `Load` | Session |
| `revoke` | `(jti: string) => Promise<void>` | `Revoke` | Empty |
| `list` | `(opts?) => Promise<ListSessionsResp>` | `List` | Page of sessions |

### `list` options

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `page` | `number` | `1` | |
| `limit` | `number` | `50` | |
| `after` | `string` | `''` | Cursor |

SDK fills `user` from whoami — callers never pass it.

## Return types

### `Session`

| Field | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Session / JTI |
| `user` | `string` | User hex |
| `tenant` | `string` | Tenant hex |
| `owner` | `boolean` | Owner flag |
| `scopes` | `string[]` | Allow scopes |
| `deny` | `string[]` | Deny scopes |
| `tier` | `string` | Plan slug |
| `ip` | `string` | Client IP (may be empty) |
| `agent` | `string` | User-agent (may be empty) |
| `created` | `Date?` | |
| `expires` | `Date?` | |
| `refreshed` | `Date?` | |

### Identity cache (`client.me`)

Mapped from Whoami into:

| Field | Type |
| --- | --- |
| `hex` | `string?` |
| `user` | `string` |
| `tenant` | `string` |
| `owner` | `boolean?` |
| `scopes` | `string[]?` |
| `deny` | `string[]?` |
| `tier` | `string?` |
| `raw` | `Session?` |

### `list` response

```ts
{
  items: Session[];
  total: number;
  page: number;
  pages: number;
}
```

### Example whoami / Session JSON (conceptual)

```json
{
  "hex": "A0S7FD3DE3BE81271F48",
  "user": "U0X3BFF58E91EC7",
  "tenant": "T0X9E68DD4B15C6",
  "owner": true,
  "scopes": ["tenant:tenant.**", "user:user.**"],
  "deny": [],
  "tier": "free",
  "ip": "",
  "agent": ""
}
```

## Errors

Throws `HermesGrpcError` (`UNAUTHENTICATED`, `NOT_FOUND`, `PERMISSION_DENIED`, …). See [Types](../../types/index.md).
