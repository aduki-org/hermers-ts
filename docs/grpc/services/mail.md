# Mail Service (`@hermers/grpc`)

Package: `hermes.mail`  
Property: `grpc.mail`

Provides high-performance gRPC operations for mailboxes and email messages.

---

## Methods & Signatures

### `listMailboxes(data?: { tenant?: string; owner?: string }): Promise<{ items: Mailbox[] }>`

Lists mailboxes owned by the user. `tenant` and `owner` are auto-filled from identity cache when omitted.

- **RPC Method:** `rpc ListMailboxes(ListMailboxesReq) returns (ListMailboxesResp)`
- **Return Type:** `Promise<{ items: Mailbox[] }>`

---

### `listMessages(data: { mailbox: string; cursor?: string; limit?: number }): Promise<{ items: Message[]; next: string }>`

Lists messages in a mailbox.

- **RPC Method:** `rpc ListMessages(ListMessagesReq) returns (ListMessagesResp)`
- **Return Type:** `Promise<{ items: Message[]; next: string }>`

---

### `getMessage(hex: string): Promise<Message>`

Fetches a message by hex ID.

- **RPC Method:** `rpc GetMessage(GetMessageReq) returns (Message)`
- **Return Type:** `Promise<Message>`

---

### `send(data: { tenant?: string; from: string; to: string[]; raw: Uint8Array | string }): Promise<{ hex: string }>`

Sends a raw email message. `tenant` is auto-filled when omitted.

- **RPC Method:** `rpc Send(SendReq) returns (SendResp)`
- **Return Type:** `Promise<{ hex: string }>`

---

### `move(data: { hex: string; dest: string }): Promise<{ hex: string; uid: number }>`

Moves a message to a destination mailbox.

- **RPC Method:** `rpc Move(MoveReq) returns (MoveResp)`
- **Return Type:** `Promise<{ hex: string; uid: number }>`

---

### `setFlags(data: { hex: string; add: Flag[]; remove: Flag[] }): Promise<void>`

Updates message flags (`SEEN`, `FLAGGED`, `DELETED`, etc.).

- **RPC Method:** `rpc SetFlags(SetFlagsReq) returns (SetFlagsResp)`
- **Return Type:** `Promise<void>`

---

### `createMailbox(data: { tenant?: string; owner?: string; name: string; role?: string }): Promise<Mailbox>`

Creates a new mailbox folder.

- **RPC Method:** `rpc CreateMailbox(CreateMailboxReq) returns (Mailbox)`
- **Return Type:** `Promise<Mailbox>`

---

### `deleteMailbox(hex: string): Promise<void>`

Deletes a mailbox folder by hex ID.

- **RPC Method:** `rpc DeleteMailbox(DeleteMailboxReq) returns (DeleteMailboxResp)`
- **Return Type:** `Promise<void>`
