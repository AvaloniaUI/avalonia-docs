import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const SOURCE_HOST = 'docs.avaloniaui.net';
const TARGET_ORIGIN = 'https://docs.avaloniaui.net';

function toSourceUrl(maybePathOrUrl) {
  const s = String(maybePathOrUrl).trim();
  if (!s) return s;
  if (s.startsWith('/')) return `${SOURCE_HOST}${s}`;
  if (s.startsWith('http://')) return s.slice('http://'.length);
  if (s.startsWith('https://')) return s.slice('https://'.length);
  if (s.startsWith('//')) return s.slice(2);
  return s;
}

function toTargetUrl(maybePathOrUrl) {
  const s = String(maybePathOrUrl).trim();
  if (!s) return s;
  if (s.startsWith('/')) return `${TARGET_ORIGIN}${s}`;
  if (s.startsWith('//')) return `https:${s}`;
  return s;
}

function stripTrailingSlash(s) {
  if (s.length > 1 && s.endsWith('/')) {
    return s.slice(0, -1);
  }
  return s;
}

function toKvKey(sourceUrl) {
  // sourceUrl is like "docs.avaloniaui.net/some/path" — extract path part
  let p = sourceUrl.replace(/^docs\.avaloniaui\.net/, '');
  if (!p.startsWith('/')) p = '/' + p;
  // Normalise: lowercase, strip trailing slash
  p = p.toLowerCase();
  return stripTrailingSlash(p);
}

function toKvValue(targetUrl) {
  return stripTrailingSlash(targetUrl);
}

function findRedirectsArrayLiteral(tsText, fileNameForErrors) {
  const typedDecl = /const\s+redirects\s*:\s*Redirect\s*\[\s*\]\s*=\s*/g;
  const typedMatch = typedDecl.exec(tsText);

  const fallbackDecl = /const\s+redirects\s*=\s*/g;
  const fallbackMatch = typedMatch ? null : fallbackDecl.exec(tsText);

  const declMatch = typedMatch || fallbackMatch;
  if (!declMatch || typeof declMatch.index !== 'number') {
    throw new Error(`${fileNameForErrors}: could not find a redirects const declaration`);
  }

  const searchFrom = declMatch.index + declMatch[0].length;
  const openBracketIdx = tsText.indexOf('[', searchFrom);
  if (openBracketIdx === -1) {
    throw new Error(`${fileNameForErrors}: could not find '[' after redirects declaration`);
  }

  let i = openBracketIdx;
  let bracketDepth = 0;
  let inString = false;
  let stringQuote = null;
  let inLineComment = false;
  let inBlockComment = false;

  for (; i < tsText.length; i++) {
    const ch = tsText[i];
    const next = tsText[i + 1];

    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      if (ch === '\\') {
        i++;
        continue;
      }
      if (ch === stringQuote) {
        inString = false;
        stringQuote = null;
      }
      continue;
    }

    if (ch === '/' && next === '/') {
      inLineComment = true;
      i++;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    if (ch === '\'' || ch === '"') {
      inString = true;
      stringQuote = ch;
      continue;
    }

    if (ch === '[') {
      bracketDepth++;
      continue;
    }

    if (ch === ']') {
      bracketDepth--;
      if (bracketDepth === 0) {
        return tsText.slice(openBracketIdx, i + 1);
      }
      continue;
    }
  }

  throw new Error(`${fileNameForErrors}: failed to find matching ']' for redirects array`);
}

function evalArrayLiteral(arrayLiteral, fileNameForErrors) {
  const context = vm.createContext(Object.create(null));
  const result = vm.runInContext(arrayLiteral, context, { filename: fileNameForErrors });
  if (!Array.isArray(result)) {
    throw new Error(`${fileNameForErrors}: redirects literal did not evaluate to an array`);
  }
  return result;
}

function extractRedirectPairsFromFile(filePath) {
  const tsText = readFileSync(filePath, 'utf8');
  const arrayLiteral = findRedirectsArrayLiteral(tsText, path.basename(filePath));
  const redirects = evalArrayLiteral(arrayLiteral, path.basename(filePath));

  const normalized = redirects.map((r) => ({ from: r.from, to: r.to }));
  const rows = [];

  for (const r of normalized) {
    if (!r || typeof r.to !== 'string' || (!Array.isArray(r.from) && typeof r.from !== 'string')) {
      throw new Error(`${path.basename(filePath)}: unexpected redirect shape: ${JSON.stringify(r)}`);
    }

    const sources = Array.isArray(r.from) ? r.from : [r.from];
    for (const source of sources) {
      if (typeof source !== 'string') {
        throw new Error(`${path.basename(filePath)}: non-string source in from: ${JSON.stringify(source)}`);
      }
      rows.push({
        source_url: toSourceUrl(source),
        target_url: toTargetUrl(r.to),
        origin: path.basename(filePath),
      });
    }
  }

  return rows;
}

function extractIndexLiteralRedirects(indexFilePath) {
  const tsText = readFileSync(indexFilePath, 'utf8');
  const rows = [];

  const re = /\{\s*from\s*:\s*(['"])(.*?)\1\s*,\s*to\s*:\s*(['"])(.*?)\3\s*\}/gms;
  for (const match of tsText.matchAll(re)) {
    rows.push({
      source_url: toSourceUrl(match[2]),
      target_url: toTargetUrl(match[4]),
      origin: path.basename(indexFilePath),
    });
  }
  return rows;
}

function main() {
  const redirectsDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

  const sourceFiles = [
    'get-started-redirects.ts',
    'music-store-redirects.ts',
    'v12-docs-redirects.ts',
    'restructure-redirects.ts',
  ].map((f) => path.join(redirectsDir, f));

  let rows = [];
  for (const filePath of sourceFiles) {
    const extracted = extractRedirectPairsFromFile(filePath);
    console.log(`${path.basename(filePath)}: ${extracted.length}`);
    rows = rows.concat(extracted);
  }

  const indexRows = extractIndexLiteralRedirects(path.join(redirectsDir, 'index.ts'));
  console.log(`index.ts (explicit literals only): ${indexRows.length}`);
  rows = rows.concat(indexRows);

  // De-dupe by KV key (normalized source), keep first (stable).
  const byKey = new Map();
  const duplicates = [];

  for (const row of rows) {
    const key = toKvKey(row.source_url);
    const value = toKvValue(row.target_url);
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, { key, value, origin: row.origin });
    } else if (existing.value !== value) {
      duplicates.push({
        key,
        kept_value: existing.value,
        dropped_value: value,
        kept_origin: existing.origin,
        dropped_origin: row.origin,
      });
    }
  }

  const entries = [...byKey.values()].sort((a, b) => a.key.localeCompare(b.key));

  // Filter out self-referencing redirects
  const selfRedirects = entries.filter((e) => {
    const normKey = e.key;
    const normValue = e.value.replace(/^https?:\/\/[^/]*/, '').toLowerCase();
    return normKey === normValue;
  });
  if (selfRedirects.length) {
    console.warn(`WARNING: Skipping ${selfRedirects.length} self-referencing redirect(s):`);
    for (const e of selfRedirects) {
      console.warn(`  ${e.origin}: ${e.key} -> ${e.value}`);
    }
  }
  const filtered = entries.filter((e) => {
    const normKey = e.key;
    const normValue = e.value.replace(/^https?:\/\/[^/]*/, '').toLowerCase();
    return normKey !== normValue;
  });

  // Output format for `wrangler kv bulk put`
  const kvEntries = filtered.map((e) => ({ key: e.key, value: e.value }));

  const outPath = path.join(redirectsDir, 'kv-redirects.json');
  writeFileSync(outPath, JSON.stringify(kvEntries, null, 2) + '\n', 'utf8');

  console.log(`Wrote ${kvEntries.length} KV entries to ${path.relative(process.cwd(), outPath)}`);
  if (duplicates.length) {
    console.warn(`WARNING: ${duplicates.length} duplicate keys had differing targets (kept first).`);
  }
}

main();
