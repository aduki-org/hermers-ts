# Contact Service

Package: `hermes.contact`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

> **SDK note (`@hermers/grpc`):** `tenant` and `owner` on Create/List/Sync are filled from
> the whoami cache. Callers pass only business fields (e.g. `vcard`) — never hex IDs for
> tenant/user.

## List

`rpc List(ListReq) returns (ListResp)`

**ListReq:** tenant (string), cursor? (string), limit? (uint32)

## Get

`rpc Get(GetReq) returns (Contact)`

**GetReq:** hex (string)

## Create

`rpc Create(CreateReq) returns (Contact)`

**CreateReq:** tenant (string), owner (string), vcard (string)

Server associates the contact with the session tenant/owner (same as REST). Proto fields are required on the wire; the SDK injects them from whoami.

## Update

`rpc Update(UpdateReq) returns (Contact)`

**UpdateReq:** hex (string), vcard (string), etag (string)

## Remove

`rpc Remove(RemoveReq) returns (RemoveResp)`

**RemoveReq:** hex (string)

## Sync

`rpc Sync(SyncReq) returns (SyncResp)`

**SyncReq:** tenant (string), since (Timestamp)

---

## Types

**Contact:** hex, tenant, owner, vcard, etag, created, updated (Timestamp)

**ListResp:** items ([]Contact), next (string)

**RemoveResp:** empty

**SyncResp:** changed ([]Contact), removed ([]string)
