# Changelog — `@hermers/sdk`

## [1.1.0] - 2026-07-23

### Added
- Added package keywords for NPM search discovery.
- Version bump to 1.1.0 for `@hermers` org release.

## [1.0.0] - 2026-07-23

### Added
- **`Hermes` Root Class**: Single root client class exposing `auth`, `tenant`, `user`, `mail`, `contacts`, `calendar`, `events`, `feeds`, and `scheduling`.
- **API Key String Constructor**: Allows initializing client directly with string: `new Hermes('hm_live_...')`.
- **Client-Side SHA-256 Key Hashing**: Added `Tenant.createkey()` local SHA-256 hashing and prefix calculation.
- **Identity Resolution**: Added `whoami()` caching for automatic user and tenant identity resolution.
- **Service Modules**: Implemented `Auth`, `Tenant`, `User`, `Mail`, `Contacts`, `Calendar`, `Events`, `Feeds`, and `Scheduling` HTTP REST services.
