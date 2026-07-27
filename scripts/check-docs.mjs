#!/usr/bin/env node
/**
 * Fail if book markdown contains broken relative links or obsolete strings.
 * Prefers assembled book/ (after docs:prepare); falls back to docs/.
 * Run: `npm run docs:check`
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const book = join(root, 'book');

const FORBIDDEN = [
  /file:\/\/\//i,
  /http:\/\/hermers\.aduki\.pro:8444/i,
  /application\/grpc-web/i,
  /hermes\.auth\.login/i,
  /createkey\(/,
  /HERMES_API_KEY/, // must be HERMERS_API_KEY
  // Private server paths must not appear in published SDK docs
  /crates\//,
  /handlers\/[a-z]/,
  /\.rs[`'\s)]/,
  /\*\*Sources?:\*\*/i,
];

const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'site') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (extname(name) === '.md') out.push(p);
  }
  return out;
}

const scanRoots = existsSync(join(book, 'SUMMARY.md'))
  ? [book]
  : [join(root, 'docs')];

const files = scanRoots.flatMap((d) => walk(d));
let errors = 0;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const re of FORBIDDEN) {
    if (re.test(text)) {
      console.error(`Forbidden pattern ${re} in ${file}`);
      errors++;
    }
  }
  let m;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text))) {
    const raw = m[1].trim();
    if (!raw || raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('#')) continue;
    const target = raw.split('#')[0].split('?')[0];
    if (!target) continue;
    // Directory links / bare paths: try as-is, then README.md, then index.md
    const resolved = resolve(dirname(file), target);
    const candidates = [
      resolved,
      join(resolved, 'README.md'),
      join(resolved, 'index.md'),
    ];
    if (!candidates.some((c) => existsSync(c))) {
      console.error(`Broken link in ${file}: (${raw}) → ${resolved}`);
      errors++;
    }
  }
}

if (errors) {
  console.error(`docs:check failed with ${errors} issue(s)`);
  process.exit(1);
}
console.log(`docs:check ok (${files.length} files under ${scanRoots.join(', ')})`);
