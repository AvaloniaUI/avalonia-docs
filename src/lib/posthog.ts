import posthog, { type CaptureResult } from 'posthog-js'
import { CONSENT_CHANGED_EVENT, readCookiePreferences } from './cookieConsent'

// Query parameters whose values we keep. Every other parameter keeps its name,
// but its value is replaced, so an email or token in a link never reaches
// PostHog. When the site starts reading a new parameter, add it here too.
// The docs search page's free-text `q` is deliberately absent.
const ALLOWED_QUERY_KEYS = new Set([
  // Campaign tags and ad click IDs
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id',
  'gclid', 'gbraid', 'wbraid', 'msclkid', 'li_fat_id', 'fbclid',
  // The cross-property handoff parameters minted by avaloniaui.net links
  'av_source', 'av_medium', 'av_content',
])

// Parameters posthog-js copies from the address bar into properties of the
// same name, plus $initial_ and $session_entry_ copies. List from 1.448.0.
const POSTHOG_CAMPAIGN_KEYS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'gad_source', 'mc_cid', 'gclid', 'gclsrc', 'dclid', 'gbraid', 'wbraid', 'fbclid',
  'msclkid', 'twclid', 'li_fat_id', 'igshid', 'ttclid', 'rdt_cid', 'epik', 'qclid',
  'sccid', 'oppref', 'bfcid', 'irclid', '_kx',
])
const COPY_PREFIX = /^\$(initial|session_entry)_/

// Letters, digits, spaces and . _ + - only, so no emails, URLs or free text.
const SAFE_VALUE = /^[A-Za-z0-9 ._+-]{1,256}$/

function cleanValue(key: string, value: string): string {
  if (!ALLOWED_QUERY_KEYS.has(key)) return 'redacted'
  return SAFE_VALUE.test(value) ? value : 'invalid'
}

function cleanUrl(raw: string): string {
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return raw
  }
  const kept = new URLSearchParams()
  url.searchParams.forEach((value, key) => {
    kept.append(key, cleanValue(key, value))
  })
  url.search = kept.toString()
  url.hash = ''
  return url.toString()
}

// Cleans every campaign value PostHog copied out of a URL, and every URL.
// Campaign values come first, so one shaped like a URL is still checked as a
// campaign value, the same way it is inside $current_url.
function cleanProperties(props: Record<string, unknown> | undefined) {
  if (!props) return
  for (const [key, value] of Object.entries(props)) {
    if (typeof value !== 'string') continue
    const baseKey = key.replace(COPY_PREFIX, '')
    if (POSTHOG_CAMPAIGN_KEYS.has(baseKey)) {
      props[key] = cleanValue(baseKey, value)
    } else if (/^https?:\/\//.test(value)) {
      props[key] = cleanUrl(value)
    }
  }
}

function beforeSend(event: CaptureResult): CaptureResult {
  cleanProperties(event.properties)
  cleanProperties(event.$set)
  cleanProperties(event.$set_once)
  return event
}

// Makes PostHog match the cookie banner: full tracking only when Analytics is accepted.
function syncConsent() {
  const accepted = readCookiePreferences()?.analytics === true
  if (accepted && !posthog.has_opted_in_capturing()) posthog.opt_in_capturing()
  if (!accepted && posthog.has_opted_in_capturing()) posthog.opt_out_capturing()
}

// Starts PostHog in the browser. Returns null, and sends nothing, when the build has no project token.
// Set once posthog.init has run, so track() is a no-op on builds without a token.
let started = false

export function initPostHog(token: string | undefined, apiHost: string | undefined) {
  if (!token) return null

  posthog.init(token, {
    api_host: apiHost || 'https://eu.i.posthog.com',
    ui_host: 'https://eu.posthog.com',
    defaults: '2026-08-30',
    cookieless_mode: 'on_reject',
    autocapture: false,
    opt_out_capturing_by_default: true,
    before_send: beforeSend,
    // Replay cleans page URLs with this, not before_send. It also gets every
    // network request, when the project records those. Supplying it switches
    // off PostHog's own body scrubbing, so bodies are dropped here.
    session_recording: {
      // Replay captures rendered text, and a submitted Ask AI question is
      // plain text, not a masked input, so mask the whole search and Ask AI
      // surfaces to keep question text out of recordings too.
      maskTextSelector: '.DocSearch-Modal, .DocSearch-Sidepanel-Container',
      maskCapturedNetworkRequestFn: (request) => ({
        ...request,
        name: cleanUrl(request.name),
        requestBody: null,
        responseBody: null,
      }),
    },
  })

  started = true
  syncConsent()
  window.addEventListener(CONSENT_CHANGED_EVENT, syncConsent)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncConsent()
  })

  return posthog
}

export type AskAiSurface = 'search_modal' | 'side_panel'

interface EventPropertiesMap {
  'ask_ai.opened': { surface: AskAiSurface }
  'ask_ai.asked': { surface: AskAiSurface }
}

export type BrowserEvent = keyof EventPropertiesMap

/**
 * Records a browser event, with exactly the information declared for it.
 * Only for visitors who accepted analytics: everyone else is counted by
 * PostHog's page views alone. Reads the consent cookie each time, so a
 * choice made in another tab still applies.
 */
export function track<Event extends BrowserEvent>(event: Event, properties: EventPropertiesMap[Event]): void {
  if (!started || readCookiePreferences()?.analytics !== true) return
  posthog.capture(event, properties, { send_instantly: true })
}
