# Changelog

All notable changes to the Hermes SDK monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.1.0] - 2026-07-28

### Added (`@hermers/sdk`)

- Full API-key REST coverage for previously missing routes (~78): tenant audits/domains/quotas/rules/usage filters, invitations filters, key expired/user/prefix/hash/last, calendar update/delete, feeds update/sync, mail folder unread/flagged + mailbox field patches, user audit/session filters, scheduling active/guests/status.
- Types: `AuditDetail`, `FeedSync`.
- Webhooks already complete; docs aligned for `retrieveWebhook` → `WebhookModel` (includes `secret`) vs `detailWebhook` → `WebhookDetail`.

### Fixed (`@hermers/sdk`)

- Sessions list path: `activeSessions` now calls `GET /user/sessions` (was incorrectly `/user/sessions/active`).

### Notes

- `@hermers/grpc` remains **3.0.0** (no gRPC API surface additions in this release).

---

## [3.0.0] - 2026-07-28

### Breaking

- **REST:** Removed `contacts.retrieve` and `mail.retrieve` — those HTTP routes do not exist; use list/search (or gRPC `retrieve` / `Get` where available).

### Changed

- **Types:** Corrected wire-shape documentation and TypeScript types to match live REST/gRPC responses.
- **Docs:** Scrubbed private server path citations from consumer docs; clarified that `@hermers/sdk` / `@hermers/grpc` are open source while the Hermers server is private / proprietary.
- Package versions bumped to `3.0.0`.

---

## [2.1.0] - 2026-07-27

### Added

- **Whoami cache**: Both `@hermers/sdk` and `@hermers/grpc` eagerly call whoami on construct, expose `ready()` / `whoami()` / `me`, and inject tenant/user from cache (callers never pass hex ids).
- **Live tests**: Production integration suites gated on `HERMERS_API_KEY` (skip when unset).

### Changed

- Package versions bumped to `2.1.0`.

---

## [2.0.0] - 2026-07-27

### Changed

- **Docs**: Rewrote consumer guides (`docs/`) and package READMEs for API-key-only auth, whoami/`ready`/`me`, production hosts `https://hermers.aduki.pro/v1` and `grpc.aduki.pro:443`, and `HERMERS_API_KEY` live tests.
- **Docs workflow**: GitHub Pages now builds `site/` via `npm run docs` (includes package READMEs), runs `docs:check` for relative links, and unit tests only (live suites skip without a key).

### Removed (docs)

- Obsolete login-in-SDK, grpc-web, and `http://hermers.aduki.pro:8444` guidance from published documentation.

---

## [1.1.0] - 2026-07-23

### Added

- **Keywords**: Added NPM discovery keywords (`hermes`, `sdk`, `grpc`, `http`, `rest`, `proto3`, `mail`, `contacts`, `storage`, `tenant`, etc.) across both `@hermers/sdk` and `@hermers/grpc`.
- **Package Release**: Bumped package versions to `1.1.0` for official NPM organization release under `@hermers`.

---

## [1.0.0] - 2026-07-23

### Added

- **Single Root Client Architecture**: Introduced `Hermes` (`@hermers/sdk`) and `HermesGrpc` (`@hermers/grpc`) classes accepting an API key string or config object.
- **Identity Auto-Resolution & Caching (`whoami`)**: Integrated eager and lazy `whoami()` caching to automatically fill omitted `tenant` and `user`/`owner` hex parameters.
- **Client-Side SHA-256 Key Hashing**: Implemented `Tenant.createkey()` in `@hermers/sdk` to generate raw API key strings, compute SHA-256 hash & prefix locally, register key on server, and return `{ hex, key }`.
- **10th gRPC Service (`UsageService`)**: Added `UsageService` (`incr`, `check`, `get`, `reset`) under package `hermes.usage` with `YYYY-MM` / `YYYY-MM-DD` window validation.
- **Clean 1-Word Service Exports**: Exported services cleanly (`Auth`, `Tenant`, `User`, `Mail`, `Contacts`, `Calendar`, `Events`, `Scheduling`, `Session`, `Contact`, `Feed`, `Security`, `Spam`, `Storage`, `Sync`, `Tier`, `Usage`).
- **Default Endpoint Configuration**: Set default HTTP base URL to `https://hermers.aduki.pro/v1` and gRPC endpoint to `http://hermers.aduki.pro:8444`.
- **Automated Documentation & CI/CD**: Added comprehensive modular docs suite under `docs/` and GitHub Pages deployment workflow in `.github/workflows/docs.yml`.
