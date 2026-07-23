# Usage Service (`@hermers/grpc`)

Package: `hermes.usage`  
Property: `grpc.usage`

Manages real-time metric tracking, rate limits, quota enforcement, and usage window resets.

---

## Methods & Signatures

### `incr(data: { tenant?: string; metric: string; by?: number }): Promise<IncrResp>`

Increments a metric counter for the tenant. `tenant` is auto-filled when omitted.

- **RPC Method:** `rpc Increment(IncrReq) returns (IncrResp)`
- **Return Type:** `Promise<IncrResp>`

```ts
export interface IncrResp {
  value: number;
  over_limit: boolean;
}
```

---

### `check(data: { tenant?: string; metric: string }): Promise<CheckResp>`

Checks current metric usage against set ceilings. `tenant` is auto-filled when omitted.

- **RPC Method:** `rpc Check(CheckReq) returns (CheckResp)`
- **Return Type:** `Promise<CheckResp>`

```ts
export interface CheckResp {
  used: number;
  limit: number;
  over: boolean;
}
```

---

### `get(data: { tenant?: string; metric: string; window: string }): Promise<Usage>`

Retrieves usage stats for a specific time window (`YYYY-MM-DD` or `YYYY-MM`). `tenant` is auto-filled when omitted.

- **RPC Method:** `rpc Get(GetReq) returns (Usage)`
- **Return Type:** `Promise<Usage>`

```ts
export interface Usage {
  tenant: string;
  metric: string;
  value: number;
  window: string;
}
```

---

### `reset(data: { tenant?: string; metric: string; window: string }): Promise<ResetResp>`

Resets usage count for a metric and window. `tenant` is auto-filled when omitted.

- **RPC Method:** `rpc Reset(ResetReq) returns (ResetResp)`
- **Return Type:** `Promise<ResetResp>`

```ts
export interface ResetResp {
  ok: boolean;
}
```
