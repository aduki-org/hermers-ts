# Hermes HTTP API

Language-agnostic reference for the Hermes REST JSON API. For the official TypeScript client, see [`@hermers/sdk`](../../packages/sdk) and the [SDK overview](../README.md).

## Base URL

Production (hardcoded default in `@hermers/sdk`):

```text
https://hermers.aduki.pro/v1
```

Same host also serves MCP and CardDAV. Override the base URL only for local/dev stacks.

## Auth

Protected routes require:

```http
Authorization: Key {raw_api_key}
```

Browser/admin sessions may use `Authorization: Bearer {jwt}` from `POST /auth/login`. **Official SDKs are API-key only** — they never implement login/password helpers.

Key scopes restrict endpoints: `resource:action` (e.g. `mail:send`, `tenant:read`). Scope mismatch → `403`.

On connect, clients should call `GET /auth/whoami` and cache `user` / `tenant`. Callers must not invent or pass tenant/user hex for scoped routes — the session already carries them.

## Headers

| Header | Required | For |
| --- | --- | --- |
| `Authorization` | yes (except login/refresh) | `Key {key}` or `Bearer {jwt}` |
| `Content-Type` | body | `application/json` |
| `Idempotency-Key` | no | UUID — dedup on retry |
| `If-Match` | no | ETag for optimistic concurrency |

## Pagination

All list endpoints return `Page<T>`:

```json
{
  "items": [ ... ],
  "total": 42,
  "next": "hex_of_last_item",
  "page": 1,
  "pages": 5
}
```

Cursor mode: `?after={hex}&limit=N`. Offset mode: `?page=N&limit=M`. Max limit 200.

## Dates

UTC ISO-8601: `2026-04-28T14:00:00Z`.

## IDs

Opaque hex strings. Type-prefixed: `U0X...` (users), `T0X...` (tenants), `msg_...` (messages). Never parse.

## Errors

```json
{
  "error": {
    "code": "not_found",
    "message": "Resource not found",
    "field": "id",
    "request_id": "req_..."
  }
}
```

Rate limit headers on every response: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

## User routes

See [`user/index.md`](user/index.md) for `/user/*`: profile, mail, mailbox, contacts, calendars, events, feeds, appointments, guests, services, windows, overrides, availability, sessions, audits, keys, preferences.

## API keys

Created under tenant auth: `POST /tenant/keys` with `name`, `hash`, `prefix`, `scopes`, `meta?`, `expires?`.

- **hash** = SHA-256 hex of the raw key (client-side). Server stores only the hash.
- **prefix** = first 1–16 characters of the raw key (index only).

Clients send the raw key as `Authorization: Key {raw}`. `@hermers/sdk` exposes `hermes.keys.create()` which hashes client-side and returns the raw secret once.

## Services

Top-level: [`auth.md`](auth.md), [`tenant.md`](tenant.md), [`members.md`](members.md), [`domains.md`](domains.md), [`keys.md`](keys.md), [`quotas.md`](quotas.md), [`rules.md`](rules.md), [`webhooks.md`](webhooks.md), [`invitations.md`](invitations.md), [`usage.md`](usage.md), [`security.md`](security.md), [`booking.md`](booking.md).

Misc: [`services.md`](services.md) (user scheduling), [`user/jmap.md`](user/jmap.md) (not implemented).
