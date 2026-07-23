# Contact Service (`@hermers/grpc`)

Package: `hermes.contact`  
Property: `grpc.contact`

Provides gRPC CardDAV contact management and synchronization.

---

## Methods & Signatures

### `list(data?: { tenant?: string; cursor?: string; limit?: number }): Promise<{ items: Contact[]; next: string }>`

Lists contacts. `tenant` is auto-filled from identity cache when omitted.

- **RPC Method:** `rpc List(ListReq) returns (ListResp)`
- **Return Type:** `Promise<{ items: Contact[]; next: string }>`

---

### `get(hex: string): Promise<Contact>`

Retrieves a contact card by hex ID.

- **RPC Method:** `rpc Get(GetReq) returns (Contact)`
- **Return Type:** `Promise<Contact>`

---

### `create(data: { tenant?: string; owner?: string; vcard: string }): Promise<Contact>`

Creates a contact from vCard payload.

- **RPC Method:** `rpc Create(CreateReq) returns (Contact)`
- **Return Type:** `Promise<Contact>`

---

### `update(data: { hex: string; vcard: string; etag: string }): Promise<Contact>`

Updates a contact card.

- **RPC Method:** `rpc Update(UpdateReq) returns (Contact)`
- **Return Type:** `Promise<Contact>`

---

### `remove(hex: string): Promise<void>`

Deletes a contact by hex ID.

- **RPC Method:** `rpc Remove(RemoveReq) returns (RemoveResp)`
- **Return Type:** `Promise<void>`

---

### `sync(data: { tenant?: string; since: string }): Promise<{ changed: Contact[]; removed: string[] }>`

Syncs contacts modified since timestamp (`since`).

- **RPC Method:** `rpc Sync(SyncReq) returns (SyncResp)`
- **Return Type:** `Promise<{ changed: Contact[]; removed: string[] }>`
