# Changelog

## 3.1.0

### Added

- Full API-key REST coverage (~78 previously missing routes): tenant audits/domains/quotas/rules/usage/invitations filters, key expired/user/prefix/hash/last, calendar update/delete, feeds update/sync, mail folder + mailbox field patches, user audit/session filters, scheduling active/guests/status.
- Types: `AuditDetail`, `FeedSync`.
- Webhooks: full surface documented (`activeWebhooks`, `webhookSubscribers`, `detailWebhook`, field updates).

### Fixed

- `activeSessions` → `GET /user/sessions` (not `/user/sessions/active`).

### Changed

- `retrieveWebhook(hex)` is typed as **`WebhookModel`** (includes `secret`). Use `detailWebhook(hex)` for the nested detail view without secret. Callers that assumed a list-row or detail shape should migrate.

## 3.0.0

**BREAKING**

- Removed `contacts.retrieve` and `mail.retrieve` (no matching REST routes). Use list/search, or `@hermers/grpc` get-by-hex where available.

Also:

- Type corrections for live wire shapes
- Docs: open-source SDK vs private server; scrubbed private source path citations

## 2.1.0

- Eager `GET /auth/whoami` on construct with identity cache (`ready()` / `whoami()` / `me`)
- Resource calls no longer take tenant/user hex — filled from cache
- Live integration tests against production (`HERMERS_API_KEY`); skip when unset
- Docs: API-key-only usage, whoami cache, live test instructions

## 2.0.0

Breaking redesign (Stripe/Square-style):

- Root client: `new Hermes('hm_live_…')` with resource namespaces (`contacts`, `mail`, `keys`, …)
- API-key auth only — login/password/JWT helpers removed
- Hardcoded production base `https://hermers.aduki.pro/v1` (`apiBase` override for tests)
- Typed `HermesError` from API error envelopes
- Client-side key hashing via `keys.create()`
