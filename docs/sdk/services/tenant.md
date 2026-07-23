# Tenant Service (`@hermers/sdk`)

Package: `@hermers/sdk`  
Property: `hermes.tenant`

Manages organization profiles, members, domains, webhooks, and client-side SHA-256 API key generation.

---

## Methods & Signatures

### `get(): Promise<TenantProfile>`

Retrieves profile details for the current tenant.

- **Return Type:** `Promise<TenantProfile>`

```ts
export interface TenantProfile {
  hex: string;
  kind: string;
  name: string;
  slug: string;
  plan: string;
  state: string;
  domain?: string;
  created: string;
  users: number;
  domains: number;
  storage: number;
}
```

---

### `createkey(params: { name: string; scopes?: string[] }): Promise<{ hex: string; key: string }>`

Generates a raw API key, computes its SHA-256 hash & prefix locally, registers the key on the server, and returns the raw key to the caller.

- **Parameters:**
  - `params.name` (`string`): Key label/identifier.
  - `params.scopes` (`string[]`, optional): Array of scope strings.
- **Return Type:** `Promise<{ hex: string; key: string }>`

- **Example:**
```ts
const createdKey = await hermes.tenant.createkey({
  name: 'production_api_key',
  scopes: ['mail:read', 'mail:send', 'contacts:read']
});
console.log('Key ID:', createdKey.hex);
console.log('Raw Key (save now):', createdKey.key);
```

---

### `keys(): Promise<{ items: Key[] }>`

Lists active API keys registered for the tenant.

- **Return Type:** `Promise<{ items: Key[] }>`

```ts
export interface Key {
  hex: string;
  name: string;
  key: string;
  scopes: string[];
  created: string;
  last?: string;
}
```

---

### `deletekey(hex: string): Promise<void>`

Revokes an API key by hex ID.

- **Parameters:**
  - `hex` (`string`): Target key hex ID.
- **Return Type:** `Promise<void>`

---

### `members(): Promise<{ items: Member[] }>`

Lists tenant team members.

- **Return Type:** `Promise<{ items: Member[] }>`

```ts
export interface Member {
  hex: string;
  email: string;
  name: string;
  owner: boolean;
  state: string;
  created: string;
}
```

---

### `domains(): Promise<{ items: Domain[] }>`

Lists registered email/web domains for the tenant.

- **Return Type:** `Promise<{ items: Domain[] }>`

---

### `webhooks(): Promise<{ items: Webhook[] }>`

Lists configured webhook endpoints.

- **Return Type:** `Promise<{ items: Webhook[] }>`
