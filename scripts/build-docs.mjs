#!/usr/bin/env node
/**
 * Assemble the GitHub Pages site under site/.
 *
 * In-repo docs live under docs/ with links like ../guide and ../packages.
 * The published site flattens docs/ to the Pages root and rewrites those links.
 *
 * Run from sdks/ts: `npm run docs:build`
 */
import {
  cpSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  readFileSync,
  existsSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { dirname, join, resolve, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');

rmSync(site, { recursive: true, force: true });
mkdirSync(site, { recursive: true });

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function copyDir(from, to) {
  if (!existsSync(from)) throw new Error(`Missing required path: ${from}`);
  cpSync(from, to, { recursive: true });
}

copyDir(join(root, 'docs'), site);
copyDir(join(root, 'guide'), join(site, 'guide'));

mkdirSync(join(site, 'packages', 'sdk'), { recursive: true });
mkdirSync(join(site, 'packages', 'grpc'), { recursive: true });
cpSync(join(root, 'packages', 'sdk', 'README.md'), join(site, 'packages', 'sdk', 'README.md'));
cpSync(join(root, 'packages', 'grpc', 'README.md'), join(site, 'packages', 'grpc', 'README.md'));
cpSync(join(root, 'README.md'), join(site, 'REPO_README.md'));
writeFileSync(join(site, '.nojekyll'), '');

/** Rewrite in-repo relative parents so flattened site links resolve. */
function rewriteLinks(text, filePath) {
  const rel = relative(site, dirname(filePath)).replace(/\\/g, '/');
  const depth = rel === '' ? 0 : rel.split('/').length;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);

  let out = text
    // guide → consumer hub (docs flatten to site root)
    .replace(/\]\(\.\.\/docs\/README\.md\)/g, `](${prefix}README.md)`)
    .replace(/\]\(\.\.\/docs\/?\)/g, `](${prefix}README.md)`)
    .replace(/\]\(\.\/docs\/README\.md\)/g, '](./README.md)')
    .replace(/\]\(\.\/docs\/?\)/g, '](./README.md)')
    .replace(/\]\(\.\/docs\)/g, '](./README.md)');

  out = out.replace(/\]\((\.\/|\.\.\/)+([^)]+)\)/g, (full) => {
    const raw = full.slice(2, -1);
    if (/^(https?:|mailto:|#)/.test(raw)) return full;
    const cleaned = raw.replace(/^(\.\/|\.\.\/)+/, '');
    if (
      cleaned.startsWith('guide/') ||
      cleaned === 'guide' ||
      cleaned.startsWith('packages/') ||
      cleaned.startsWith('REPO_README')
    ) {
      const hashIdx = cleaned.indexOf('#');
      const pathPart = hashIdx >= 0 ? cleaned.slice(0, hashIdx) : cleaned;
      const hash = hashIdx >= 0 ? cleaned.slice(hashIdx) : '';
      return `](${prefix}${pathPart}${hash})`;
    }
    return full;
  });
  return out;
}

for (const file of walk(site)) {
  if (extname(file) !== '.md' && !file.endsWith('index.html')) continue;
  if (extname(file) !== '.md') continue;
  const before = readFileSync(file, 'utf8');
  const after = rewriteLinks(before, file);
  if (after !== before) writeFileSync(file, after);
}

const hub = readFileSync(join(site, 'README.md'), 'utf8');
writeFileSync(
  join(site, 'index.html'),
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Hermers TypeScript SDKs</title>
  <style>
    :root { color-scheme: light dark; font-family: ui-sans-serif, system-ui, sans-serif; }
    body { max-width: 52rem; margin: 2rem auto; padding: 0 1.25rem; line-height: 1.5; }
    a { color: #0b57d0; }
    ul { line-height: 1.8; }
  </style>
</head>
<body>
  <h1>Hermers TypeScript SDKs</h1>
  <ul>
    <li><a href="./README.md">Documentation hub</a></li>
    <li><a href="./sdk/index.md">@hermers/sdk (REST)</a></li>
    <li><a href="./grpc/index.md">@hermers/grpc</a></li>
    <li><a href="./guide/">API reference (HTTP / gRPC)</a></li>
    <li><a href="./packages/sdk/README.md">Package README — sdk</a></li>
    <li><a href="./packages/grpc/README.md">Package README — grpc</a></li>
  </ul>
  <p>Default endpoints: <code>https://hermers.aduki.pro/v1</code> · <code>grpc.aduki.pro:443</code>. Auth: API key only.</p>
</body>
</html>
`
);

console.log(`Docs site written to ${site}`);
