# Security (`client.security`)

Wraps `hermes.security.SecurityService` — MTA-STS, TLSA, BIMI, and aggregate reports for the authenticated tenant.

```ts
const status = await client.security.status();
console.log(status.mtasts, status.tlsa, status.bimi, status.reports);
```

## Methods

| Method | Signature | RPC | Returns |
| --- | --- | --- | --- |
| `status` | `() => Promise<StatusResp>` | `Status` | Full security snapshot |

No request fields (empty `StatusReq`).

## Return type: `StatusResp`

| Field | Type | Description |
| --- | --- | --- |
| `mtasts` | `MtastsEntry[]` | MTA-STS policies |
| `tlsa` | `TlsaEntry[]` | DANE TLSA records |
| `bimi` | `BimiEntry[]` | BIMI records |
| `reports` | `ReportEntry[]` | Received reports |

### `MtastsEntry`

| Field | Type |
| --- | --- |
| `domain` | `string` |
| `policyJson` | `string` — JSON policy document |
| `expires` | `string` |

### `TlsaEntry`

| Field | Type |
| --- | --- |
| `host` | `string` |
| `port` | `number` |
| `recordsJson` | `string` |
| `expires` | `string` |

### `BimiEntry`

| Field | Type |
| --- | --- |
| `domain` | `string` |
| `location` | `string?` |
| `vmc` | `string?` |
| `expires` | `string` |

### `ReportEntry`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `kind` | `string` |
| `domain` | `string` |
| `period` | `string` |
| `received` | `string` |

### Example shape

```ts
{
  mtasts: [{ domain: 'example.com', policyJson: '{…}', expires: '…' }],
  tlsa: [{ host: 'mail.example.com', port: 25, recordsJson: '[…]', expires: '…' }],
  bimi: [{ domain: 'example.com', location: 'https://…', vmc: undefined, expires: '…' }],
  reports: [{ hex: 'R0X…', kind: 'dmarc', domain: 'example.com', period: '2026-07', received: '…' }],
}
```

## Errors

`PERMISSION_DENIED` if the key lacks security read scope. Throws `HermesGrpcError`.
