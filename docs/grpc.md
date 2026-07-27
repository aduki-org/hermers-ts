# gRPC cheatsheet (`@hermers/grpc`)

```ts
import { HermesGrpc, BASE_ENDPOINT, HermesGrpcError, MailFlag, SpamVerdict, TierPlan } from '@hermers/grpc';

const client = new HermesGrpc(process.env.HERMERS_API_KEY!);
await client.ready(); // Identity cache from SessionService.Whoami

const { items, next } = await client.contacts.list({ limit: 50 }); // ListResp
await client.contacts.create({ vcard: 'BEGIN:VCARD...' });         // Contact
const { items: boxes } = await client.mail.listMailboxes();        // ListMailboxesResp
await client.session.whoami();                                     // Session

client.close();
```

Defaults: `BASE_ENDPOINT === 'grpc.aduki.pro:443'` (TLS). Metadata: `authorization: Key …`.

**Identity:** `{ hex?, user, tenant, owner?, scopes?, deny?, tier?, raw?: Session }`.

**Errors:** `HermesGrpcError` (`code`, `grpcCode?`, `details?`).

No login/password RPCs on the client. Full guides: [grpc/index.md](grpc/index.md) · [Session](grpc/services/session.md) · [Types](types/index.md).
