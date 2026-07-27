# Changelog

## 2.0.0

Breaking redesign (Stripe/Square-style):

- Root client: `new HermesGrpc('hm_live_…')` with resource namespaces (`contacts`, `mail`, `storage`, …)
- Native `@grpc/grpc-js` over TLS to `grpc.aduki.pro:443` (replaces fake grpc-web JSON fetch)
- Types/stubs generated from `proto/*.proto` via `ts-proto` (`npm run generate`)
- API-key metadata only — session login/password/refresh RPCs not exposed
- Typed `HermesGrpcError`
