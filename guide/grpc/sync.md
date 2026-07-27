# Sync Service

Package: `hermes.sync`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

## Contacts

`rpc Contacts(ContactSyncReq) returns (ContactSyncResp)`

**ContactSyncReq:** tenant (string), since (Timestamp)

## Mailboxes

`rpc Mailboxes(MailboxSyncReq) returns (MailboxSyncResp)`

**MailboxSyncReq:** mailbox (string), known_uidvalidity (uint32), known_modseq (uint64)

---

## Types

**ContactSyncResp:** changed ([]string), removed ([]string), ctag (string)

**MailboxSyncResp:** new_uids, changed_uids, removed_uids ([]uint32), modseq (uint64), uidvalidity (uint32)
