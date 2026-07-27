# Changelog

## 2.1.0

- Eager `SessionService.Whoami` on construct with identity cache (`ready()` / `whoami()` / `me`)
- Public methods drop optional tenant/owner/user hex — always use cache
- Live integration tests against `grpc.aduki.pro:443` (`HERMERS_API_KEY`); skip when unset
- Docs: API-key-only usage, whoami cache, live test instructions

## 2.0.0

Breaking redesign (Stripe/Square-style):

- Root client: `new HermesGrpc('hm_live_…')` with resource namespaces (`contacts`, `mail`, `storage`, …)
- Native `@grpc/grpc-js` over TLS to `grpc.aduki.pro:443` (replaces fake grpc-web JSON fetch)
- Types/stubs generated from `proto/*.proto` via `ts-proto` (`npm run generate`)
- API-key metadata only — session login/password/refresh RPCs not exposed
- Typed `HermesGrpcError`
