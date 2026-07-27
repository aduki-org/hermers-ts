# Session Service

Package: `hermes.session`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

> **SDK note (`@hermers/grpc`):** the client exposes `whoami`, `load`, `revoke`, and `list`
> only. Login / Issue / Refresh / Patch are server RPCs for admin/browser flows and are
> **not** wrapped by the SDK.

## Whoami

`rpc Whoami(WhoamiReq) returns (Session)`

**WhoamiReq:** token? (string) — unused for API-key auth; identity comes from metadata.

Used by `@hermers/grpc` on construct to cache `user` / `tenant` (`ready()` / `me`).

## Load

`rpc Load(LoadReq) returns (Session)`

**LoadReq:** jti (string)

## Revoke

`rpc Revoke(RevokeReq) returns (RevokeResp)`

**RevokeReq:** jti (string)

## List

`rpc List(ListSessionsReq) returns (ListSessionsResp)`

**ListSessionsReq:** user (string), page (uint32), limit (uint32), after? (string)

SDK fills `user` from whoami.

---

## Server-only RPCs (not in `@hermers/grpc`)

### Login

`rpc Login(LoginReq) returns (IssueResp)`

**LoginReq:** email (string), password (string), ip? (string), agent? (string)

### Issue

`rpc Issue(IssueReq) returns (IssueResp)`

**IssueReq:** user (string), tenant (string), ip? (string), agent? (string)

### Refresh

`rpc Refresh(RefreshReq) returns (IssueResp)`

**RefreshReq:** token (string)

### Patch

`rpc Patch(PatchReq) returns (PatchResp)`

**PatchReq:** user (string), tenant (string), scopes ([]string), deny ([]string)

---

## Types

**IssueResp:** token (string), refresh (string), session (Session)

**Session:** hex, user, tenant, owner (bool), scopes ([]string), deny ([]string), tier, ip, agent, created/expires/refreshed (Timestamp)

**ListSessionsResp:** items ([]Session), total (int64), page (uint32), pages (uint32)

**RevokeResp:** empty
