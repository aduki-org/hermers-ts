# Contacts Service (`@hermers/sdk`)

Package: `@hermers/sdk`  
Property: `hermes.contacts`

Manages CardDAV contact cards, search, and group collections.

---

## Methods & Signatures

### `list(options?: { cursor?: string; limit?: number }): Promise<Page<Contact>>`

Lists contact cards for the user.

- **Parameters:**
  - `options.cursor` (`string`, optional): Pagination cursor string.
  - `options.limit` (`number`, optional): Limit (1 to 100). Default `50`.
- **Return Type:** `Promise<Page<Contact>>`

```ts
export interface Contact {
  hex: string;
  etag: string;
  name?: string;
  emails?: string[];
  phones?: string[];
  groups?: string[];
  created: string;
}
```

---

### `get(hex: string): Promise<ContactDetail>`

Retrieves vCard detail for a contact by hex ID.

- **Parameters:**
  - `hex` (`string`): Target contact hex ID.
- **Return Type:** `Promise<ContactDetail>`

---

### `create(data: { name: string; email?: string; phone?: string; vcard?: string }): Promise<Contact>`

Creates a new contact card.

- **Parameters:**
  - `data.name` (`string`): Contact full name.
  - `data.email` (`string`, optional): Primary email.
  - `data.phone` (`string`, optional): Primary phone.
  - `data.vcard` (`string`, optional): Raw vCard payload.
- **Return Type:** `Promise<Contact>`

---

### `remove(hex: string): Promise<void>`

Deletes a contact card by hex ID.

- **Parameters:**
  - `hex` (`string`): Target contact hex ID.
- **Return Type:** `Promise<void>`
