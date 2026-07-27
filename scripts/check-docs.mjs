#!/usr/bin/env node
/**
 * Fail if published markdown contains broken relative links or obsolete strings.
 * Run: `npm run docs:check`
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
const scanRoot = existsSync(site) ? site : join(root, 'docs');

const FORBIDDEN = [
  /file:\/\/\//i,
  /http:\/\/hermers\.aduki\.pro:8444/i,
  /application\/grpc-web/i,
  /hermes\.auth\.login/i,
  /createkey\(/,
  /HERMES_API_KEY/, // must be HERMERS_API_KEY
];

const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (extname(name) === '.md' || name === 'index.html') out.push(p);
  }
  return out;
}

const files = walk(scanRoot);
let errors = 0;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const re of FORBIDDEN) {
    if (re.test(text)) {
      console.error(`Forbidden pattern ${re} in ${file}`);
      errors++;
    }
  }
  if (!file.endsWith('.md')) continue;
  let m;
  while ((m = LINK_RE.exec(text))) {
    const raw = m[1].trim();
    if (!raw || raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('#')) continue;
    const target = raw.split('#')[0].split('?')[0];
    if (!target) continue;
    const resolved = resolve(dirname(file), target);
    if (!existsSync(resolved)) {
      console.error(`Broken link in ${file}: (${raw}) → ${resolved}`);
      errors++;
    }
  }
}

if (errors) {
  console.error(`docs:check failed with ${errors} issue(s)`);
  process.exit(1);
}
console.log(`docs:check ok (${files.length} files under ${scanRoot})`);
