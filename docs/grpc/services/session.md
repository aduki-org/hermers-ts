# Session Service (`@hermers/grpc`)

Package: `hermes.session`  
Property: `grpc.session`

Provides session management, token issuance, scope patching, and session identity lookups.

---

## Methods & Signatures

### `login(data: { email: string; password: string; ip?: string; agent?: string }): Promise<{ token: string; refresh: string; session: Session }>`

Performs email/password authentication.

- **RPC Method:** `rpc Login(LoginReq) returns (IssueResp)`
- **Return Type:** `Promise<{ token: string; refresh: string; session: Session }>`

---

### `issue(data: { user: string; tenant: string; ip?: string; agent?: string }): Promise<{ token: string; refresh: string; session: Session }>`

Issues a new session token pair for a user & tenant.

- **RPC Method:** `rpc Issue(IssueReq) returns (IssueResp)`
- **Return Type:** `Promise<{ token: string; refresh: string; session: Session }>`

---

### `refresh(token: string): Promise<{ token: string; refresh: string; session: Session }>`

Refreshes an existing session using a refresh token.

- **RPC Method:** `rpc Refresh(RefreshReq) returns (IssueResp)`
- **Return Type:** `Promise<{ token: string; refresh: string; session: Session }>`

---

### `load(jti: string): Promise<Session>`

Loads session details by JTI hex ID.

- **RPC Method:** `rpc Load(LoadReq) returns (Session)`
- **Return Type:** `Promise<Session>`

---

### `revoke(jti: string): Promise<void>`

Revokes an active session by JTI hex ID.

- **RPC Method:** `rpc Revoke(RevokeReq) returns (RevokeResp)`
- **Return Type:** `Promise<void>`

---

### `patch(data: { user: string; tenant: string; scopes: string[]; deny: string[] }): Promise<void>`

Patches session scopes and deny lists.

- **RPC Method:** `rpc Patch(PatchReq) returns (PatchResp)`
- **Return Type:** `Promise<void>`

---

### `list(data: { user: string; page: number; limit: number; after?: string }): Promise<{ items: Session[]; total: number; page: number; pages: number }>`

Lists active sessions for a user.

- **RPC Method:** `rpc List(ListSessionsReq) returns (ListSessionsResp)`
- **Return Type:** `Promise<{ items: Session[]; total: number; page: number; pages: number }>`

---

### `whoami(): Promise<Session>`

Returns current session identity details.

- **RPC Method:** `rpc Whoami(WhoamiReq) returns (Session)`
- **Return Type:** `Promise<Session>`
