# Feed Service

Package: `hermes.feeds`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

## Create

`rpc Create(CreateReq) returns (Feed)`

**CreateReq:** connection (string), remote (string), name (string), color? (string), block (bool)

## List

`rpc List(ListReq) returns (ListResp)`

**ListReq:** empty

## Get

`rpc Get(GetReq) returns (Feed)`

**GetReq:** hex (string)

## Update

`rpc Update(UpdateReq) returns (Feed)`

**UpdateReq:** hex (string), color? (string), block? (bool), active? (bool), name? (string)

## Remove

`rpc Remove(RemoveReq) returns (RemoveResp)`

**RemoveReq:** hex (string)

## Sync

`rpc Sync(SyncReq) returns (SyncResp)`

**SyncReq:** hex (string)

---

## Types

**Feed:** hex, tenant, user, connection, remote, name, color?, block, active, last? (ISO-8601)

**ListResp:** items ([]Feed)

**RemoveResp:** removed (bool)

**SyncResp:** ok (bool), inserted (uint32), updated (uint32)
