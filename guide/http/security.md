# Security

## GET /tenant/security

Auth: Key or Bearer (scope: `security:read`)

Response: object with four arrays:
- `mtasts`: `[{domain, policy, expires}]`
- `tlsa`: `[{host, port, records, expires}]`
- `bimi`: `[{domain, location?, vmc?, expires}]`
- `reports`: `[{hex, kind, domain, period (date), received}]`