# Security Service (`@hermers/grpc`)

Package: `hermes.security`  
Property: `grpc.security`

Provides MTA-STS, TLSA, BIMI, and DMARC security status checks.

---

## Methods & Signatures

### `status(): Promise<{ mtasts: boolean; tlsa: boolean; bimi: boolean; dmarc: boolean }>`

Fetches domain security protocol status flags.

- **RPC Method:** `rpc Status(StatusReq) returns (StatusResp)`
- **Return Type:** `Promise<{ mtasts: boolean; tlsa: boolean; bimi: boolean; dmarc: boolean }>`

- **Example:**
```ts
const secStatus = await grpc.security.status();
console.log('MTA-STS enabled:', secStatus.mtasts);
```
