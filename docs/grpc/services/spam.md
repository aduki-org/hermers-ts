# Spam Service (`@hermers/grpc`)

Package: `hermes.spam`  
Property: `grpc.spam`

Provides content spam classification and user reporting.

---

## Methods & Signatures

### `classify(data: { tenant?: string; msg: string; raw: Uint8Array | string; direction: 'inbound' | 'outbound' }): Promise<{ verdict: Verdict; scores: Scores; reason: string }>`

Classifies email message content for spam / bulk detection. `tenant` is auto-filled when omitted.

- **RPC Method:** `rpc Classify(ClassifyReq) returns (ClassifyResp)`
- **Return Type:** `Promise<{ verdict: Verdict; scores: Scores; reason: string }>`

```ts
export enum Verdict {
  CLEAN = 0,
  SPAM = 1,
  BULK = 2,
}

export interface Scores {
  rules: number;
  bayes: number;
  ml: number;
  reputation: number;
  composite: number;
}
```

---

### `report(data: { tenant?: string; msg: string; user?: string; verdict: Verdict; source: string }): Promise<void>`

Submits a spam report or false-positive correction. `tenant` and `user` are auto-filled when omitted.

- **RPC Method:** `rpc Report(ReportReq) returns (ReportResp)`
- **Return Type:** `Promise<void>`
