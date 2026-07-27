# Auth

> **SDK note:** `@hermers/sdk` and `@hermers/grpc` authenticate with an API key only.
> They call whoami on construct and do **not** expose login, refresh, or password helpers.
> Login/refresh below are for browser/admin session flows, not the published SDKs.

## GET /auth/whoami

Auth: Key or Bearer

Returns the authenticated session identity. SDKs cache this and expose it as `ready()` / `whoami()` / `me`.

Response 200:

```json
{
  "hex": "string (session / JTI)",
  "user": "string (user hex)",
  "tenant": "string (tenant hex)",
  "owner": true,
  "scopes": ["user.contacts:read"],
  "deny": [],
  "tier": "free",
  "ip": "",
  "agent": ""
}
```

## POST /auth/login

Auth: none (browser/admin only — not used by SDKs)

Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response 200:

```json
{
  "token": "string (JWT)",
  "refresh": "string (refresh token)",
  "expires": "string (ISO-8601)"
}
```

## POST /auth/refresh

Auth: none (browser/admin only — not used by SDKs)

Body: `{ "token": "string" }`

Response 200: same shape as login.

## POST /auth/logout

Auth: Key or Bearer

Response 200: `{ "ok": true }`

## GET /auth/sessions

Auth: Key or Bearer

Query: `?after={hex}&limit=N` or `?page=N&limit=M`

Response 200: `Page<Sessions>`

**Sessions:**

| Field | Type |
| --- | --- |
| hex | string |
| ip | string? |
| agent | string? |
| device | object? |
| location | object? |
| seen | datetime |
| expires | datetime |
| created | datetime |
| user | object |
| total | i64 *(list only)* |
