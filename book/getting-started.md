# Hosts & testing

## Hosts

| Host | Role |
| --- | --- |
| `hermers.aduki.pro` | REST `/v1`, MCP, CardDAV (Cloudflare proxied) |
| `grpc.aduki.pro:443` | Native gRPC over TLS (DNS-only — not Cloudflare HTTP proxy) |

Default SDK endpoints:

| Package | Default |
| --- | --- |
| `@hermers/sdk` | `https://hermers.aduki.pro/v1` |
| `@hermers/grpc` | `grpc.aduki.pro:443` |

Override endpoints only for local/dev (see package READMEs).

## Authentication

Every REST request:

```http
Authorization: Key hm_live_…
```

gRPC metadata: `authorization: Key hm_live_…`.

## Testing

```bash
npm test                         # unit + live (live skips without a key)
export HERMERS_API_KEY=hm_live_… # never commit secrets
npm test                         # live suites hit production
```

Without `HERMERS_API_KEY`, unit/mocks still run. Do not use a misspelled env var name — the prefix is **Hermers** (`HERMERS_API_KEY`).
