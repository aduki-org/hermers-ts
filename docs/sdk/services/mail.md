# Mail Service (`@hermers/sdk`)

Package: `@hermers/sdk`  
Property: `hermes.mail`

Manages email mailboxes, message retrieval, sending, moving, and flag updates.

---

## Methods & Signatures

### `mailboxes(): Promise<{ items: Mailbox[] }>`

Lists user mailboxes (Inbox, Sent, Drafts, Trash, etc.).

- **Return Type:** `Promise<{ items: Mailbox[] }>`

```ts
export interface Mailbox {
  hex: string;
  name: string;
  delimiter: string;
  uidvalidity: number;
  uidnext: number;
  messages: number;
  unread: number;
  size: number;
  created: string;
}
```

---

### `inbox(options?: { cursor?: string; limit?: number }): Promise<Page<Message>>`

Retrieves paginated messages from the primary Inbox.

- **Parameters:**
  - `options.cursor` (`string`, optional): Pagination cursor.
  - `options.limit` (`number`, optional): Limit (1 to 100). Default `50`.
- **Return Type:** `Promise<Page<Message>>`

```ts
export interface Message {
  hex: string;
  uid: number;
  subject?: string;
  sender?: string;
  size: number;
  flags?: string[];
  thread?: string;
  spam?: number;
  date: string;
  mailbox: Record<string, unknown>;
}
```

---

### `message(hex: string): Promise<MessageDetail>`

Fetches message detail by hex ID including body structure.

- **Parameters:**
  - `hex` (`string`): Message hex ID.
- **Return Type:** `Promise<MessageDetail>`

---

### `send(payload: { from: string; to: string[]; subject: string; body: string }): Promise<{ hex: string }>`

Sends an outgoing email message.

- **Parameters:**
  - `payload.from` (`string`): Sender email address.
  - `payload.to` (`string[]`): Array of recipient email addresses.
  - `payload.subject` (`string`): Message subject.
  - `payload.body` (`string`): Message plain text or HTML body.
- **Return Type:** `Promise<{ hex: string }>`

---

### `move(data: { hex: string; dest: string }): Promise<{ hex: string }>`

Moves a message to a destination mailbox.

- **Parameters:**
  - `data.hex` (`string`): Target message hex ID.
  - `data.dest` (`string`): Destination mailbox hex ID.
- **Return Type:** `Promise<{ hex: string }>`
