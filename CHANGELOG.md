# Changelog

All notable changes to the Hermes SDK monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
