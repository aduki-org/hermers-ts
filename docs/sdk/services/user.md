# User Service (`@hermers/sdk`)

Package: `@hermers/sdk`  
Property: `hermes.user`

Manages current user profile, preferences, and active authentication sessions.

---

## Methods & Signatures

### `get(): Promise<UserProfile>`

Fetches the profile details for the authenticated user.

- **Return Type:** `Promise<UserProfile>`

```ts
export interface UserProfile {
  hex: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  state?: string;
  totp?: boolean;
  created: string;
}
```

---

### `update(data: { name?: string; phone?: string; avatar?: string }): Promise<UserProfile>`

Updates user profile fields.

- **Parameters:**
  - `data.name` (`string`, optional): Display name.
  - `data.phone` (`string`, optional): Phone number.
  - `data.avatar` (`string`, optional): Avatar URL.
- **Return Type:** `Promise<UserProfile>`

---

### `preferences(): Promise<PreferenceDetail>`

Retrieves user preferences and configuration settings.

- **Return Type:** `Promise<PreferenceDetail>`

---

### `sessions(): Promise<{ items: Session[] }>`

Lists active sessions for the user across devices.

- **Return Type:** `Promise<{ items: Session[] }>`
