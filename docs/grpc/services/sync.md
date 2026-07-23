# Sync Service (`@hermers/grpc`)

Package: `hermes.sync`  
Property: `grpc.sync`

Provides delta-sync for contact address books and mailbox folders.

---

## Methods & Signatures

### `contacts(data: { tenant?: string; since: string }): Promise<{ changed: string[]; removed: string[]; ctag: string }>`

Fetches changed and removed contact hex IDs since a given timestamp (`since`). `tenant` is auto-filled when omitted.

- **RPC Method:** `rpc Contacts(ContactSyncReq) returns (ContactSyncResp)`
- **Return Type:** `Promise<{ changed: string[]; removed: string[]; ctag: string }>`

---

### `mailboxes(data: { mailbox: string; known_uidvalidity: number; known_modseq: number }): Promise<{ new_uids: number[]; changed_uids: number[]; removed_uids: number[]; modseq: number; uidvalidity: number }>`

Performs IMAP/gRPC delta sync for a mailbox.

- **RPC Method:** `rpc Mailboxes(MailboxSyncReq) returns (MailboxSyncResp)`
- **Return Type:** `Promise<{ new_uids: number[]; changed_uids: number[]; removed_uids: number[]; modseq: number; uidvalidity: number }>`
