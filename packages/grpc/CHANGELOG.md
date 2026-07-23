# Changelog — `@hermers/grpc`

## [1.1.0] - 2026-07-23

### Added
- Added package keywords for NPM search discovery.
- Version bump to 1.1.0 for `@hermers` org release.

## [1.0.0] - 2026-07-23

### Added
- **`HermesGrpc` Root Class**: Single root gRPC client class exposing `session`, `mail`, `contact`, `feed`, `security`, `spam`, `storage`, `sync`, `tier`, and `usage`.
- **Default Endpoint**: Configured default endpoint to `http://hermers.aduki.pro:8444`.
- **Eager Identity Fetching**: Automatically triggers `SessionService.Whoami` on constructor initialization and auto-fills omitted `tenant` and `owner` parameters.
- **10 gRPC Services**: Implemented full RPC bindings for `SessionService`, `MailService`, `ContactService`, `FeedService`, `SecurityService`, `SpamService`, `StorageService`, `SyncService`, `TierService`, and `UsageService`.
