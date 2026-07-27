# Mail Service

Package: `hermes.mail`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

## ListMailboxes

`rpc ListMailboxes(ListMailboxesReq) returns (ListMailboxesResp)`

**ListMailboxesReq:** tenant (string), owner (string)

## ListMessages

`rpc ListMessages(ListMessagesReq) returns (ListMessagesResp)`

**ListMessagesReq:** mailbox (string), cursor? (string), limit? (uint32)

## GetMessage

`rpc GetMessage(GetMessageReq) returns (Message)`

**GetMessageReq:** hex (string)

## Send

`rpc Send(SendReq) returns (SendResp)`

**SendReq:** tenant (string), from (string), to ([]string), raw (bytes)

## Move

`rpc Move(MoveReq) returns (MoveResp)`

**MoveReq:** hex (string), dest (string)

## SetFlags

`rpc SetFlags(SetFlagsReq) returns (SetFlagsResp)`

**SetFlagsReq:** hex (string), add ([]Flag), remove ([]Flag)

## Expunge

`rpc Expunge(ExpungeReq) returns (ExpungeResp)`

**ExpungeReq:** mailbox (string), uids ([]uint32)

## CreateMailbox

`rpc CreateMailbox(CreateMailboxReq) returns (Mailbox)`

**CreateMailboxReq:** tenant (string), owner (string), name (string), role (string)

## DeleteMailbox

`rpc DeleteMailbox(DeleteMailboxReq) returns (DeleteMailboxResp)`

**DeleteMailboxReq:** hex (string)

## UpdateMailbox

`rpc UpdateMailbox(UpdateMailboxReq) returns (Mailbox)`

**UpdateMailboxReq:** hex (string), name (string), role (string)

---

## Types

**Mailbox:** hex, tenant, owner, name, uidnext, uidvalidity, exists, unseen

**Message:** hex, mailbox, uid, flags ([]Flag), subject, from, to ([]string), blob, size, date/created (Timestamp)

**Flag enum:** FLAG_SEEN=0, FLAG_ANSWERED=1, FLAG_FLAGGED=2, FLAG_DELETED=3, FLAG_DRAFT=4

**ListMailboxesResp:** items ([]Mailbox)

**ListMessagesResp:** items ([]Message), next (string)

**SendResp:** hex (string)

**MoveResp:** hex (string), uid (uint32)

**ExpungeResp:** expunged ([]uint32)

**DeleteMailboxResp:** empty
