/**
 * check-redirects.ts
 *
 * Audits redirect coverage after a Docusaurus site migration.
 * For every URL found on the legacy site (v11.docs.avaloniaui.net),
 * it checks whether a corresponding page exists on the current site
 * (docs.avaloniaui.net) — either via a redirect or directly.
 *
 * Usage:
 *   npx tsx check-redirects.ts [options]
 *   # or: tsc && node check-redirects.js [options]
 *
 * Options:
 *   --legacy-origin    Legacy site origin  (default: https://v11.docs.avaloniaui.net)
 *   --current-origin   Current site origin (default: https://docs.avaloniaui.net)
 *   --sitemap-path     Path to sitemap on legacy site (default: /sitemap.xml)
 *   --out              Output file path    (default: redirect-audit.json)
 *   --csv              Also write a CSV summary
 *   --concurrency      Max parallel requests (default: 10)
 *   --timeout          Request timeout ms   (default: 10000)
 *   --ignore-ext       Skip URLs matching these extensions (default: .png,.jpg,.svg,.pdf)
 *
 * Requirements: Node 18+, tsx (or tsc)
 */

import { parseArgs } from 'node:util';
import { writeFileSync } from 'node:fs';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChainEntry {
  url: string;
  status: number | null;
  error?: string;
}

type AuditStatus =
  | 'ok'
  | 'redirected'
  | 'broken'
  | 'loop'
  | 'error'
  | 'wrong_site';

interface AuditResult {
  legacyUrl: string;
  currentUrl: string;
  status: AuditStatus;
  httpChain: ChainEntry[];
  finalUrl: string;
  finalStatus: number | null;
  error: string | null;
}

interface PMapOptions {
  concurrency: number;
}

// ── CLI args ──────────────────────────────────────────────────────────────────

const { values: args } = parseArgs({
  options: {
    'legacy-origin':  { type: 'string',  default: 'https://v11.docs.avaloniaui.net' },
    'current-origin': { type: 'string',  default: 'https://docs.avaloniaui.net' },
    'sitemap-path':   { type: 'string',  default: '/sitemap.xml' },
    out:              { type: 'string',  default: 'redirect-audit.json' },
    csv:              { type: 'boolean', default: false },
    concurrency:      { type: 'string',  default: '10' },
    timeout:          { type: 'string',  default: '10000' },
    'ignore-ext':     { type: 'string',  default: '.png,.jpg,.jpeg,.gif,.svg,.pdf,.ico,.woff,.woff2' },
  },
});

const LEGACY_ORIGIN  = args['legacy-origin'] as string;
const CURRENT_ORIGIN = args['current-origin'] as string;
const SITEMAP_URL    = LEGACY_ORIGIN + (args['sitemap-path'] as string);
const CONCURRENCY    = parseInt(args.concurrency as string, 10);
const TIMEOUT_MS     = parseInt(args.timeout as string, 10);
const IGNORE_EXTS    = new Set(
  (args['ignore-ext'] as string).split(',').map(e => e.trim().toLowerCase())
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function log(msg: string): void  { process.stdout.write(msg + '\n'); }
function warn(msg: string): void { process.stderr.write('[warn] ' + msg + '\n'); }

/** Fetch with a timeout and follow redirects, returning the full status chain. */
async function fetchChain(
  url: string,
  { followRedirects = true }: { followRedirects?: boolean } = {}
): Promise<ChainEntry[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const chain: ChainEntry[] = [];
  let current = url;

  try {
    while (true) {
      const res = await fetch(current, {
        method: 'HEAD',
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'User-Agent': 'AvaloniaDocsRedirectAudit/1.0' },
      });

      chain.push({ url: current, status: res.status });

      if (!followRedirects) break;

      const isRedirect = res.status >= 300 && res.status < 400;
      if (!isRedirect) break;

      const location = res.headers.get('location');
      if (!location) break;

      // Resolve relative redirects
      current = new URL(location, current).href;

      // Safety: stop if we're clearly leaving both known domains
      const host = new URL(current).hostname;
      if (!host.includes('avaloniaui.net')) break;
    }
  } catch (err) {
    chain.push({ url: current, status: null, error: (err as Error).message });
  } finally {
    clearTimeout(timer);
  }

  return chain;
}

/** Run an async function over an array with bounded concurrency. */
async function pMap<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  { concurrency }: PMapOptions
): Promise<R[]> {
  const results: R[] = [];
  let i = 0;

  async function worker(): Promise<void> {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

// ── Step 1: Discover legacy URLs ──────────────────────────────────────────────

async function fetchSitemap(sitemapUrl: string): Promise<string[]> {
  log(`Fetching sitemap: ${sitemapUrl}`);

  const res = await fetch(sitemapUrl, {
    headers: { 'User-Agent': 'AvaloniaDocsRedirectAudit/1.0' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: HTTP ${res.status} at ${sitemapUrl}`);
  }

  const xml = await res.text();

  // Handle sitemap index (points to multiple child sitemaps)
  const indexMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/gs)]
    .map(m => m[1].trim())
    .filter(u => u.endsWith('.xml'));

  if (indexMatches.length > 0) {
    log(`Sitemap index found — fetching ${indexMatches.length} child sitemaps…`);
    const childUrls = await Promise.all(indexMatches.map(fetchSitemap));
    return childUrls.flat();
  }

  // Regular sitemap
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/gs)].map(m => m[1].trim());
}

function shouldSkip(url: string): boolean {
  try {
    const { pathname } = new URL(url);
    const ext = pathname.slice(pathname.lastIndexOf('.')).toLowerCase();
    return IGNORE_EXTS.has(ext);
  } catch {
    return true;
  }
}

// ── Step 2: Derive the expected current-site URL ──────────────────────────────

/**
 * Rewrites a legacy URL to its expected current-site equivalent.
 *
 * Strategy: replace the origin only — path stays the same.
 * If your migration changed paths, add your own mapping table here.
 *
 * You can also load a JSON map from disk:
 *   import pathMap from './path-map.json' assert { type: 'json' };
 *   const mapped = (pathMap as Record<string, string>)[pathname] ?? pathname;
 */
function toCurrentUrl(legacyUrl: string): string {
  const u = new URL(legacyUrl);
  return CURRENT_ORIGIN + u.pathname + u.search;
}

// ── Step 3: Audit ─────────────────────────────────────────────────────────────

const STATUS: Record<string, AuditStatus> = {
  OK:         'ok',         // Final response is 2xx
  REDIRECTED: 'redirected', // 3xx chain ended at a 2xx on the current site
  BROKEN:     'broken',     // 4xx / 5xx on the current site
  LOOP:       'loop',       // Redirect with no Location header
  ERROR:      'error',      // Network / timeout
  WRONG_SITE: 'wrong_site', // Redirect landed outside avaloniaui.net
};

async function auditUrl(legacyUrl: string): Promise<AuditResult> {
  const currentUrl = toCurrentUrl(legacyUrl);
  const chain = await fetchChain(currentUrl);
  const last = chain[chain.length - 1];

  let status: AuditStatus;

  if (last.error) {
    status = STATUS.ERROR;
  } else if (last.status !== null && last.status >= 200 && last.status < 300) {
    status = chain.length > 1 ? STATUS.REDIRECTED : STATUS.OK;
  } else if (last.status !== null && last.status >= 400) {
    status = STATUS.BROKEN;
  } else if (last.status !== null && last.status >= 300) {
    status = STATUS.LOOP;
  } else {
    status = STATUS.ERROR;
  }

  // Check if a redirect landed outside the current site
  if (chain.length > 1) {
    const finalHost = new URL(last.url).hostname;
    if (!finalHost.includes('avaloniaui.net')) status = STATUS.WRONG_SITE;
  }

  return {
    legacyUrl,
    currentUrl,
    status,
    httpChain: chain,
    finalUrl:    last.url,
    finalStatus: last.status ?? null,
    error:       last.error ?? null,
  };
}

// ── Step 4: Report ────────────────────────────────────────────────────────────

function writeCsv(results: AuditResult[], csvPath: string): void {
  const header = 'status,legacyUrl,currentUrl,finalUrl,finalStatus,error';
  const rows = results.map(r =>
    [r.status, r.legacyUrl, r.currentUrl, r.finalUrl, r.finalStatus ?? '', r.error ?? '']
      .map(v => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  );
  writeFileSync(csvPath, [header, ...rows].join('\n'), 'utf8');
}

function printSummary(results: AuditResult[]): void {
  const counts: Partial<Record<AuditStatus, number>> = {};
  for (const r of results) {
    counts[r.status] = (counts[r.status] ?? 0) + 1;
  }

  log('\n── Audit summary ─────────────────────────────────');
  log(`Total URLs checked : ${results.length}`);
  for (const [s, n] of Object.entries(counts) as [AuditStatus, number][]) {
    const icon = (s === 'ok' || s === 'redirected') ? '✓' : '✗';
    log(`  ${icon}  ${s.padEnd(12)} ${n}`);
  }

  const broken = results.filter(r => r.status === 'broken' || r.status === 'wrong_site');
  if (broken.length > 0) {
    log(`\n── Broken / missing redirects (${broken.length}) ──────────────`);
    for (const r of broken) {
      log(`  [${r.finalStatus ?? '???'}] ${r.legacyUrl}`);
      log(`        → ${r.currentUrl}`);
    }
  }
  log('──────────────────────────────────────────────────\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // 1. Discover
  let legacyUrls: string[];
  try {
    legacyUrls = await fetchSitemap(SITEMAP_URL);
  } catch (err) {
    warn(`Could not fetch sitemap: ${(err as Error).message}`);
    warn('Falling back to checking the root URL only. Pass --sitemap-path if your sitemap is elsewhere.');
    legacyUrls = [LEGACY_ORIGIN + '/'];
  }

  legacyUrls = legacyUrls.filter(u => !shouldSkip(u));
  log(`Found ${legacyUrls.length} doc URLs to audit (concurrency: ${CONCURRENCY})`);

  // 2. Audit with progress counter
  let done = 0;
  const results = await pMap(legacyUrls, async (url: string) => {
    const result = await auditUrl(url);
    done++;
    if (done % 25 === 0 || done === legacyUrls.length) {
      process.stdout.write(`\r  Checked ${done}/${legacyUrls.length}…`);
    }
    return result;
  }, { concurrency: CONCURRENCY });
  log('');  // newline after progress

  // 3. Write JSON
  writeFileSync(args.out as string, JSON.stringify(results, null, 2), 'utf8');
  log(`Full results written to: ${args.out}`);

  // 4. Write CSV
  if (args.csv) {
    const csvPath = (args.out as string).replace(/\.json$/, '.csv');
    writeCsv(results, csvPath);
    log(`CSV written to: ${csvPath}`);
  }

  // 5. Print summary
  printSummary(results);

  // Exit with non-zero if any broken redirects found
  const hasBroken = results.some(r =>
    (['broken', 'wrong_site', 'error'] as AuditStatus[]).includes(r.status)
  );
  process.exit(hasBroken ? 1 : 0);
}

main().catch(err => { warn((err as Error).message); process.exit(1); });
