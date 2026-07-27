# Tier Service

Package: `hermes.tier`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

## Resolve

`rpc Resolve(ResolveReq) returns (TierInfo)`

**ResolveReq:** tenant (string)

## Change

`rpc Change(ChangeReq) returns (ChangeResp)`

**ChangeReq:** tenant (string), plan (Plan), payment_method? (string)

---

## Types

**Plan enum:** FREE=0, STARTER=1, PRO=2, BUSINESS=3, ENTERPRISE=4

**Limits:** sends_day, sends_month, mailboxes, domains, members, storage_mb, api_keys, webhooks (int64), ml_enabled (bool)

**TierInfo:** tenant, plan (Plan), limits (Limits), trial (bool), trial_ends (string)

**ChangeResp:** info (TierInfo)
