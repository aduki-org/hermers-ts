# Hermers TypeScript SDKs

Official Node.js / TypeScript clients for Hermes (**packaged as `@hermers/*`**).

| Package | Path | Transport | Default endpoint |
| --- | --- | --- | --- |
| [`@hermers/sdk`](./packages/sdk) | `packages/sdk` | REST / JSON | `https://hermers.aduki.pro/v1` |
| [`@hermers/grpc`](./packages/grpc) | `packages/grpc` | Native gRPC (TLS) | `grpc.aduki.pro:443` |

## Install

```bash
npm install @hermers/sdk
npm install @hermers/grpc
```

## Usage

```ts
import Hermes from '@hermers/sdk';

const hermes = new Hermes('hm_live_…');
const contacts = await hermes.contacts.list();
```

```ts
import { HermesGrpc } from '@hermers/grpc';

const client = new HermesGrpc('hm_live_…');
const { items } = await client.contacts.list();
client.close();
```

Auth is **API key only** (`Authorization: Key …` / gRPC metadata). No login or password flows.

## Develop

```bash
npm install
npm run generate   # regenerate gRPC stubs from ../../proto
npm run build
npm test           # unit + live (live skips unless HERMERS_API_KEY is set)
```

Live against production:

```bash
export HERMERS_API_KEY=hm_live_…   # never commit this
npm test
```

**Developer documentation** for SDK consumers: [`docs/`](./docs/) (plus package READMEs). That is what mdBook publishes.

[`guide/`](./guide/) mirrors the Hermes monorepo `sdk/` protocol reference for the server team — it is **not** SDK developer docs and is not included in the published book.

Documentation is published with **[mdBook](https://rust-lang.github.io/mdBook/)** (Rust-book UI).
Book root is this package (`book.toml` + `book/`); chapters are assembled from `docs/` and
package READMEs into `book/`, then built to `site/` for GitHub Pages.

Requires [`mdbook`](https://github.com/rust-lang/mdBook) on `PATH` (e.g. `cargo install mdbook`).

```bash
npm run docs:prepare   # sync docs/ + package READMEs → book/
npm run docs:build     # prepare + mdbook build → site/
npm run docs:serve     # prepare + mdbook serve (http://localhost:3000)
npm run docs           # build + link/forbidden-string check
```
