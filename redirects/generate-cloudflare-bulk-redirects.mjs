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

function findRedirectsArrayLiteral(tsText, fileNameForErrors) {
  // Prefer the typed top-level redirects array (avoids matching local `const redirects: string[] = []`).
  const typedDecl = /const\s+redirects\s*:\s*Redirect\s*\[\s*\]\s*=\s*/g;
  const typedMatch = typedDecl.exec(tsText);

  // Fall back to any `const redirects = ...` if the typed one isn't present.
  // (Not expected in this repo, but keeps the script resilient.)
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

  // Scan forward to find the matching closing ']'.
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
        i++; // consume '/'
      }
      continue;
    }

    if (inString) {
      if (ch === '\\') {
        i++; // skip escaped char
        continue;
      }
      if (ch === stringQuote) {
        inString = false;
        stringQuote = null;
      }
      continue;
    }

    // Not in comment/string
    if (ch === '/' && next === '/') {
      inLineComment = true;
      i++; // consume second '/'
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++; // consume '*'
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
        const endIdxInclusive = i;
        return tsText.slice(openBracketIdx, endIdxInclusive + 1);
      }
      continue;
    }
  }

  throw new Error(`${fileNameForErrors}: failed to find matching ']' for redirects array`);
}

function evalArrayLiteral(arrayLiteral, fileNameForErrors) {
  // The literal is expected to be a pure array/object/string literal.
  // Run it in an empty VM context to avoid accidental access to Node globals.
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

  /** @type {{ from: string | string[]; to: string }[]} */
  const normalized = redirects.map((r) => ({ from: r.from, to: r.to }));

  /** @type {{ source_url: string; target_url: string; status: number; origin: string }[]} */
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
        status: 301,
        origin: path.basename(filePath),
      });
    }
  }

  return rows;
}

function extractIndexLiteralRedirects(indexFilePath) {
  const tsText = readFileSync(indexFilePath, 'utf8');
  const rows = [];

  // Only pick explicit { from: '...', to: '...' } objects.
  // This intentionally ignores spreads like ...music_store_redirects.redirects.
  const re = /\{\s*from\s*:\s*(['"])(.*?)\1\s*,\s*to\s*:\s*(['"])(.*?)\3\s*\}/gms;
  for (const match of tsText.matchAll(re)) {
    rows.push({
      source_url: toSourceUrl(match[2]),
      target_url: toTargetUrl(match[4]),
      status: 301,
      origin: path.basename(indexFilePath),
    });
  }
  return rows;
}

function csvEscape(value) {
  const s = String(value);
  if (/[\n\r,"]/u.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function main() {
  const redirectsDir = path.resolve(process.cwd());

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

  // De-dupe by exact source_url, keep first (stable).
  /** @type {Map<string, { source_url: string; target_url: string; status: number; origin: string }>} */
  const bySource = new Map();
  /** @type {{ source_url: string; kept_target_url: string; dropped_target_url: string; kept_origin: string; dropped_origin: string }[]} */
  const duplicates = [];

  for (const row of rows) {
    const existing = bySource.get(row.source_url);
    if (!existing) {
      bySource.set(row.source_url, row);
    } else if (existing.target_url !== row.target_url) {
      duplicates.push({
        source_url: row.source_url,
        kept_target_url: existing.target_url,
        dropped_target_url: row.target_url,
        kept_origin: existing.origin,
        dropped_origin: row.origin,
      });
    }
  }

  const uniqueRows = [...bySource.values()].sort((a, b) => a.source_url.localeCompare(b.source_url));

  // Filter out self-referencing redirects (source == target after normalising scheme).
  const selfRedirects = uniqueRows.filter((r) => {
    const normSource = r.source_url.replace(/^https?:\/\//, '');
    const normTarget = r.target_url.replace(/^https?:\/\//, '');
    return normSource === normTarget;
  });
  if (selfRedirects.length) {
    console.warn(`WARNING: Skipping ${selfRedirects.length} self-referencing redirect(s):`);
    for (const r of selfRedirects) {
      console.warn(`  ${r.origin}: ${r.source_url} -> ${r.target_url}`);
    }
  }
  const filteredRows = uniqueRows.filter((r) => {
    const normSource = r.source_url.replace(/^https?:\/\//, '');
    const normTarget = r.target_url.replace(/^https?:\/\//, '');
    return normSource !== normTarget;
  });

  const header = ['source_url', 'target_url', 'status'].join(',');
  const lines = [header];
  for (const r of filteredRows) {
    lines.push([csvEscape(r.source_url), csvEscape(r.target_url), '301'].join(','));
  }

  const outPath = path.join(redirectsDir, 'cloudflare-bulk-redirects-301.csv');
  writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');

  // Diagnostics to stdout (kept minimal so it doesn't spam).
  console.log(`Wrote ${filteredRows.length} redirects to ${path.relative(process.cwd(), outPath)}`);
  if (duplicates.length) {
    console.warn(`WARNING: ${duplicates.length} duplicate source_url entries had differing targets (kept first).`);
  }
}

main();
