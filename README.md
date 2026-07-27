# Hermers TypeScript SDKs

Open-source Node.js / TypeScript clients for **Hermers** (**`@hermers/*`**).

| Package | Path | Transport | Default endpoint |
| --- | --- | --- | --- |
| [`@hermers/sdk`](./packages/sdk) | `packages/sdk` | REST / JSON | `https://hermers.aduki.pro/v1` |
| [`@hermers/grpc`](./packages/grpc) | `packages/grpc` | Native gRPC (TLS) | `grpc.aduki.pro:443` |

The Hermers / Hermes **server is private / proprietary**. These packages are the public TypeScript SDKs — they are **not** a source drop of the server, and developer docs here do not cite or depend on private server source trees.

## Install

```bash
npm install @hermers/sdk
npm install @hermers/grpc
```

## Usage

```ts
import Hermes from '@hermers/sdk';

const hermes = new Hermes('hm_live_…');
await hermes.ready(); // whoami — caches user + tenant
const contacts = await hermes.contacts.list();
```

```ts
import { HermesGrpc } from '@hermers/grpc';

const client = new HermesGrpc('hm_live_…');
await client.ready();
const { items } = await client.contacts.list();
client.close();
```

Auth is **API key only** (`Authorization: Key …` / gRPC metadata). No login or password flows. Defaults are the production hosts above; override only for local/dev.

## Develop

```bash
npm install
npm run generate   # regenerate gRPC stubs from proto definitions
npm run build
npm test           # unit + live (live skips unless HERMERS_API_KEY is set)
```

Live against production:

```bash
export HERMERS_API_KEY=hm_live_…   # never commit this
npm test
```

**Developer documentation** for SDK consumers: [`docs/`](./docs/) (plus package READMEs). That is what mdBook publishes.

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
