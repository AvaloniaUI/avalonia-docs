import type { ClientModule } from '@docusaurus/types';

const ATTRIBUTION_COOKIE = 'av_attribution';
const ATTRIBUTION_STORAGE_KEY = 'av_attribution';
const ATTRIBUTION_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;
const HANDOFF_STORAGE_KEY = 'av_handoff';

interface AttributionTouch {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  gclid?: string;
  landing_page: string;
  referrer_host?: string;
  captured_at: string;
}

interface AttributionState {
  first: AttributionTouch;
  last: AttributionTouch;
}

/**
 * Which internal link carried the visitor here, from the `av_*` parameters the
 * marketing site mints. Kept separate from attribution on purpose: an internal
 * hop must never overwrite the campaign that acquired the visitor, which is
 * exactly what would happen if these links used `utm_*`.
 */
interface HandoffContext {
  source?: string;
  medium?: string;
  content?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  if (!match) return null;
  try {
    return decodeURIComponent(match.slice(prefix.length));
  } catch {
    return null;
  }
}

function queryValue(params: URLSearchParams, name: string, maxLength = 200): string | undefined {
  const value = params.get(name)?.trim();
  return value ? value.slice(0, maxLength) : undefined;
}

function classifyReferrer(host?: string): { source?: string; medium?: string } {
  if (!host) return {};
  const normalized = host.toLowerCase().replace(/^www\./, '');
  if (/(^|\.)google\.[a-z.]+$/.test(normalized)) return { source: 'google', medium: 'organic' };
  if (/(^|\.)bing\.com$/.test(normalized)) return { source: 'bing', medium: 'organic' };
  if (/(^|\.)duckduckgo\.com$/.test(normalized)) return { source: 'duckduckgo', medium: 'organic' };
  if (/(^|\.)search\.yahoo\.[a-z.]+$/.test(normalized)) return { source: 'yahoo', medium: 'organic' };
  return { source: normalized, medium: 'referral' };
}

function readAttribution(): AttributionState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = getCookie(ATTRIBUTION_COOKIE) ?? window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttributionState;
    return parsed?.first && parsed?.last ? parsed : null;
  } catch {
    return null;
  }
}

function writeAttribution(state: AttributionState): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const raw = JSON.stringify(state);
  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, raw);
  } catch {
    // Cookies remain the cross-subdomain source of truth when storage is unavailable.
  }

  const hostname = window.location.hostname;
  const domain =
    hostname.endsWith('.avaloniaui.net') || hostname === 'avaloniaui.net' ? '; Domain=.avaloniaui.net' : '';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${ATTRIBUTION_COOKIE}=${encodeURIComponent(raw)}; Path=/; Max-Age=${ATTRIBUTION_MAX_AGE_SECONDS}; SameSite=Lax${domain}${secure}`;
}

function currentTouch(): { touch: AttributionTouch; isNonDirect: boolean } {
  const params = new URLSearchParams(window.location.search);
  const gclid = queryValue(params, 'gclid', 255);
  const source = queryValue(params, 'utm_source') ?? (gclid ? 'google' : undefined);
  const medium = queryValue(params, 'utm_medium') ?? (gclid ? 'cpc' : undefined);
  const campaign = queryValue(params, 'utm_campaign');
  const hasCampaign = Boolean(source || medium || campaign || gclid);

  let referrerHost: string | undefined;
  try {
    referrerHost = document.referrer ? new URL(document.referrer).hostname : undefined;
  } catch {
    referrerHost = undefined;
  }

  const isInternalReferrer =
    referrerHost === 'avaloniaui.net' || Boolean(referrerHost?.endsWith('.avaloniaui.net'));
  const referrer = isInternalReferrer ? {} : classifyReferrer(referrerHost);
  return {
    isNonDirect: hasCampaign || Boolean(referrer.source),
    touch: {
      source: source ?? referrer.source ?? '(direct)',
      medium: medium ?? referrer.medium ?? '(none)',
      campaign,
      content: queryValue(params, 'utm_content'),
      term: queryValue(params, 'utm_term'),
      gclid,
      landing_page: window.location.pathname,
      referrer_host: referrerHost,
      captured_at: new Date().toISOString(),
    },
  };
}

function captureAttribution(): AttributionState | null {
  if (typeof window === 'undefined') return null;
  const existing = readAttribution();
  const { touch, isNonDirect } = currentTouch();
  const next = existing
    ? { first: existing.first, last: isNonDirect ? touch : existing.last }
    : { first: touch, last: touch };
  writeAttribution(next);
  return next;
}

/**
 * Read the `av_*` handoff parameters and remember them for the session.
 *
 * They only exist on the landing URL — Docusaurus client-side navigation drops
 * them — so without session storage the handoff would be lost after the first
 * click, which is most of the docs journey.
 */
function handoffContext(): HandoffContext {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const current: HandoffContext = {
    source: queryValue(params, 'av_source', 100),
    medium: queryValue(params, 'av_medium', 100),
    content: queryValue(params, 'av_content', 100),
  };

  if (current.source || current.medium || current.content) {
    try {
      window.sessionStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify(current));
    } catch {
      // Private-mode storage failure just means the handoff is landing-page only.
    }
    return current;
  }

  try {
    const raw = window.sessionStorage.getItem(HANDOFF_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HandoffContext) : {};
  } catch {
    return {};
  }
}

function attributionParams(): Record<string, unknown> {
  const state = captureAttribution();
  if (!state) return {};
  const handoff = handoffContext();
  return {
    handoff_source: handoff.source ?? '(not set)',
    handoff_medium: handoff.medium ?? '(not set)',
    handoff_content: handoff.content ?? '(not set)',
    first_source: state.first.source,
    first_medium: state.first.medium,
    first_campaign: state.first.campaign ?? '(not set)',
    first_content: state.first.content ?? '(not set)',
    first_term: state.first.term ?? '(not set)',
    first_gclid: state.first.gclid ?? '(not set)',
    first_landing_page: state.first.landing_page,
    last_source: state.last.source,
    last_medium: state.last.medium,
    last_campaign: state.last.campaign ?? '(not set)',
    last_content: state.last.content ?? '(not set)',
    last_term: state.last.term ?? '(not set)',
    last_gclid: state.last.gclid ?? '(not set)',
  };
}

function contentProduct(pathname: string): string {
  if (pathname.startsWith('/xpf')) return 'xpf';
  if (pathname.startsWith('/tools') || pathname.startsWith('/controls')) return 'accelerate';
  return 'avalonia';
}

let lastTrackedPath = '';

function trackPageView(): void {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname + window.location.search;
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    analytics_surface: 'docs',
    page_location: window.location.origin + window.location.pathname,
    page_title: document.title,
    content_product: contentProduct(window.location.pathname),
    page_type: 'docs',
    content_stage: 'consideration',
    ...attributionParams(),
  });
}

const analyticsClient: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (
      previousLocation &&
      location.pathname === previousLocation.pathname &&
      location.search === previousLocation.search
    ) {
      return;
    }
    setTimeout(trackPageView, 0);
  },
};

export default analyticsClient;
