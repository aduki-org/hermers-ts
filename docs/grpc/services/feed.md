# Feed Service (`@hermers/grpc`)

Package: `hermes.feeds`  
Property: `grpc.feed`

Manages external calendar feeds and sync status.

---

## Methods & Signatures

### `create(data: { connection: string; remote: string; name: string; color?: string; block: boolean }): Promise<Feed>`

Creates a new calendar feed integration.

- **RPC Method:** `rpc Create(CreateReq) returns (Feed)`
- **Return Type:** `Promise<Feed>`

---

### `list(): Promise<{ items: Feed[] }>`

Lists active feeds.

- **RPC Method:** `rpc List(ListReq) returns (ListResp)`
- **Return Type:** `Promise<{ items: Feed[] }>`

---

### `get(hex: string): Promise<Feed>`

Retrieves feed details by hex ID.

- **RPC Method:** `rpc Get(GetReq) returns (Feed)`
- **Return Type:** `Promise<Feed>`

---

### `update(data: { hex: string; color?: string; block?: boolean; active?: boolean; name?: string }): Promise<Feed>`

Updates feed properties.

- **RPC Method:** `rpc Update(UpdateReq) returns (Feed)`
- **Return Type:** `Promise<Feed>`

---

### `remove(hex: string): Promise<{ removed: boolean }>`

Deletes a feed by hex ID.

- **RPC Method:** `rpc Remove(RemoveReq) returns (RemoveResp)`
- **Return Type:** `Promise<{ removed: boolean }>`

---

### `sync(hex: string): Promise<{ ok: boolean; inserted: number; updated: number }>`

Triggers an immediate sync for a feed.

- **RPC Method:** `rpc Sync(SyncReq) returns (SyncResp)`
- **Return Type:** `Promise<{ ok: boolean; inserted: number; updated: number }>`
