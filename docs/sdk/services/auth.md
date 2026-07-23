# Auth Service (`@hermers/sdk`)

Package: `@hermers/sdk`  
Property: `hermes.auth`

Provides authentication and token management methods.

---

## Methods & Signatures

### `login(credentials: { email: string; password: string }): Promise<Token>`

Authenticates with email and password to receive JWT credentials.

- **Parameters:**
  - `credentials.email` (`string`): Valid email address.
  - `credentials.password` (`string`): Non-empty password string.
- **Return Type:** `Promise<Token>`

```ts
export interface Token {
  token: string;
  refresh: string;
  expires: string;
}
```

- **Example:**
```ts
const tokenData = await hermes.auth.login({
  email: 'owner@aduki.pro',
  password: 'Owner!234'
});
console.log('Access Token:', tokenData.token);
```

---

### `whoami(): Promise<Identity>`

Fetches profile details for the currently authenticated credential.

- **Return Type:** `Promise<Identity>`

```ts
export interface Identity {
  user?: string;
  tenant?: string;
  email?: string;
  name?: string;
  owner?: boolean;
}
```

- **Example:**
```ts
const identity = await hermes.auth.whoami();
```

---

### `logout(): Promise<void>`

Invalidates the current session token.

- **Return Type:** `Promise<void>`

```ts
await hermes.auth.logout();
```

---

### `refresh(token: string): Promise<Token>`

Exchanges a refresh token for a new access token.

- **Parameters:**
  - `token` (`string`): Valid refresh token.
- **Return Type:** `Promise<Token>`

```ts
const newToken = await hermes.auth.refresh(tokenData.refresh);
```
