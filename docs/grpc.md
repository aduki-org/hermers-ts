# gRPC cheatsheet (`@hermers/grpc`)

```ts
import { HermesGrpc, BASE_ENDPOINT } from '@hermers/grpc';

const client = new HermesGrpc(process.env.HERMERS_API_KEY!);
await client.ready();

await client.contacts.list({ limit: 50 });
await client.contacts.create({ vcard: 'BEGIN:VCARD...' }); // tenant/owner injected
await client.mail.listMailboxes();
await client.session.whoami();

client.close();
```

Defaults: `BASE_ENDPOINT === 'grpc.aduki.pro:443'` (TLS). Metadata: `authorization: Key …`.

No login/password RPCs on the client. Full guide: [grpc/index.md](grpc/index.md).
