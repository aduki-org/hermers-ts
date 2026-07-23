# Tier Service (`@hermers/grpc`)

Package: `hermes.tier`  
Property: `grpc.tier`

Manages tenant subscription plans, quota limits, and tier resolution.

---

## Methods & Signatures

### `resolve(tenant?: string): Promise<TierInfo>`

Resolves subscription tier limits and trial status for a tenant. `tenant` is auto-filled from identity cache when omitted.

- **RPC Method:** `rpc Resolve(ResolveReq) returns (TierInfo)`
- **Return Type:** `Promise<TierInfo>`

```ts
export enum Plan {
  FREE = 0,
  STARTER = 1,
  PRO = 2,
  BUSINESS = 3,
  ENTERPRISE = 4,
}

export interface Limits {
  sends_day: number;
  sends_month: number;
  mailboxes: number;
  domains: number;
  members: number;
  storage_mb: number;
  api_keys: number;
  webhooks: number;
  ml_enabled: boolean;
}

export interface TierInfo {
  tenant: string;
  plan: Plan;
  limits: Limits;
  trial: boolean;
  trial_ends: string;
}
```

---

### `change(data: { tenant?: string; plan: Plan; payment_method?: string }): Promise<{ info: TierInfo }>`

Changes tenant plan subscription. `tenant` is auto-filled when omitted.

- **RPC Method:** `rpc Change(ChangeReq) returns (ChangeResp)`
- **Return Type:** `Promise<{ info: TierInfo }>`
