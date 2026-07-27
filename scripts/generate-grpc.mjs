#!/usr/bin/env node
/**
 * Generate TypeScript gRPC stubs from ../../proto/*.proto via ts-proto.
 * Run from sdks/ts: `node scripts/generate-grpc.mjs`
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const protoRoot = resolve(root, '../../proto');
const out = join(root, 'packages/grpc/src/generated');
const plugin = join(root, 'node_modules/.bin/protoc-gen-ts_proto');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const protos = readdirSync(protoRoot)
  .filter((f) => f.endsWith('.proto'))
  .map((f) => join(protoRoot, f));

const args = [
  `--plugin=protoc-gen-ts_proto=${plugin}`,
  `--ts_proto_out=${out}`,
  '--ts_proto_opt=outputServices=grpc-js',
  '--ts_proto_opt=esModuleInterop=true',
  '--ts_proto_opt=env=node',
  '--ts_proto_opt=useOptionals=messages',
  '--ts_proto_opt=exportCommonSymbols=false',
  '--ts_proto_opt=snakeToCamel=true',
  '--ts_proto_opt=importSuffix=.js',
  '--ts_proto_opt=outputIndex=false',
  `-I${protoRoot}`,
  '-I/usr/include',
  ...protos,
];

const result = spawnSync('protoc', args, { stdio: 'inherit' });
if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`Generated ${protos.length} proto modules → ${out}`);
