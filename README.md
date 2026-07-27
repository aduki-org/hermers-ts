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

Language-agnostic API reference lives in this repo under [`guide/`](./guide/) (HTTP + gRPC)
and in the Hermes monorepo `sdk/` folder. Consumer guides: [`docs/README.md`](./docs/README.md).

```bash
npm run docs        # build site/ + check links
```
