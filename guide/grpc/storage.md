# Storage Service

Package: `hermes.storage`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

> **SDK note:** `@hermers/grpc` fills `tenant` from the whoami cache on Put.

## Put

`rpc Put(PutReq) returns (PutResp)`

**PutReq:** tenant (string), key (string), data (bytes)

**PutResp:** ref (BlobRef)

## Get

`rpc Get(GetReq) returns (stream Chunk)`

**GetReq:** hex (string)

## Remove

`rpc Remove(RemoveReq) returns (RemoveResp)`

**RemoveReq:** hex (string)

---

## Types

**BlobRef:** hex, tenant, backend, bucket, key, size, hash

**Chunk:** data (bytes)
