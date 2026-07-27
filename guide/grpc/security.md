# Security Service

Package: `hermes.security`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

## Status

`rpc Status(StatusReq) returns (StatusResp)`

**StatusReq:** empty

---

## Types

**StatusResp:**

- mtasts ([]MtastsEntry): domain, policy_json, expires
- tlsa ([]TlsaEntry): host, port, records_json, expires
- bimi ([]BimiEntry): domain, location?, vmc?, expires
- reports ([]ReportEntry): hex, kind, domain, period, received
