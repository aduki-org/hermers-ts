# Changelog

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
