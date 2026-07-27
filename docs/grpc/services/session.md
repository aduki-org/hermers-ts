# Session (`client.session`)

Wraps `hermes.session.SessionService` for API-key clients.

**Exposed:** `whoami`, `load`, `revoke`, `list`.  
**Not exposed:** Login, Issue, Refresh, Patch.

## Methods

| Method | RPC |
| --- | --- |
| `whoami()` | `Whoami` (usually use root `client.ready()` / `client.whoami()`) |
| `load(jti)` | `Load` |
| `revoke(jti)` | `Revoke` |
| `list({ page?, limit?, after? })` | `List` — `user` filled from whoami |

## Example

```ts
const client = new HermesGrpc(process.env.HERMERS_API_KEY!);
await client.ready();
const sessions = await client.session.list({ limit: 20 });
client.close();
```

API reference: [guide/grpc/session.md](../../../guide/grpc/session.md).
