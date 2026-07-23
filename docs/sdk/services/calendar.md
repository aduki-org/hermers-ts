# Calendar Service (`@hermers/sdk`)

Package: `@hermers/sdk`  
Property: `hermes.calendar`

Manages CalDAV calendar collections and calendar meta settings.

---

## Methods & Signatures

### `list(): Promise<{ items: Calendar[] }>`

Lists calendar collections owned by the user.

- **Return Type:** `Promise<{ items: Calendar[] }>`

```ts
export interface Calendar {
  hex: string;
  name: string;
  color?: string;
  created: string;
}
```

---

### `create(data: { name: string; color?: string }): Promise<Calendar>`

Creates a new calendar collection.

- **Parameters:**
  - `data.name` (`string`): Calendar name.
  - `data.color` (`string`, optional): Hex color string (e.g. `#3b82f6`).
- **Return Type:** `Promise<Calendar>`

---

### `update(hex: string, data: { name?: string; color?: string }): Promise<Calendar>`

Updates calendar collection attributes.

- **Parameters:**
  - `hex` (`string`): Target calendar hex ID.
  - `data.name` (`string`, optional): New name.
  - `data.color` (`string`, optional): New color.
- **Return Type:** `Promise<Calendar>`

---

### `remove(hex: string): Promise<void>`

Deletes a calendar collection by hex ID.

- **Parameters:**
  - `hex` (`string`): Target calendar hex ID.
- **Return Type:** `Promise<void>`
