# Usage Service

Package: `hermes.usage`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

## Increment

`rpc Increment(IncrReq) returns (IncrResp)`

**IncrReq:** tenant (string), metric (string), by (int64)

## Check

`rpc Check(CheckReq) returns (CheckResp)`

**CheckReq:** tenant (string), metric (string)

## Get

`rpc Get(GetReq) returns (Usage)`

**GetReq:** tenant (string), metric (string), window (string: YYYY-MM-DD or YYYY-MM)

## Reset

`rpc Reset(ResetReq) returns (ResetResp)`

**ResetReq:** tenant (string), metric (string), window (string)

---

## Types

**Usage:** tenant (string), metric (string), value (int64), window (string)

**IncrResp:** value (int64), over_limit (bool)

**CheckResp:** used (int64), limit (int64), over (bool)

**ResetResp:** empty
