# Changelog

## 2.0.0

Breaking redesign (Stripe/Square-style):

- Root client: `new Hermes('hm_live_…')` with resource namespaces (`contacts`, `mail`, `keys`, …)
- API-key auth only — login/password/JWT helpers removed
- Hardcoded production base `https://hermers.aduki.pro/v1` (`apiBase` override for tests)
- Typed `HermesError` from API error envelopes
- Client-side key hashing via `keys.create()`
