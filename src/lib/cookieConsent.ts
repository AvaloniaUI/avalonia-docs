const COOKIE_NAME = 'av_cookie_consent'
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60

export const CONSENT_CHANGED_EVENT = 'av:consent-changed'

export interface CookiePreferences {
  analytics: boolean
  messaging: boolean
}

// Reads the visitor's choice from cookie text: document.cookie in the browser,
// or a request's Cookie header on the server. Same format in both.
export function parseCookiePreferences(cookies: string | null | undefined): CookiePreferences | null {
  if (!cookies) return null

  const match = cookies.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`))
  if (!match) return null

  try {
    const prefs = JSON.parse(decodeURIComponent(match[1]))
    if (typeof prefs !== 'object' || prefs === null || Array.isArray(prefs)) return null
    return { analytics: prefs.analytics === true, messaging: prefs.messaging === true }
  } catch {
    return null
  }
}

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof document === 'undefined') return null
  return parseCookiePreferences(document.cookie)
}

export function writeCookiePreferences(prefs: CookiePreferences): void {
  const hostname = window.location.hostname
  const domain = hostname === 'avaloniaui.net' || hostname.endsWith('.avaloniaui.net')
    ? '; Domain=.avaloniaui.net'
    : ''
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  const value = encodeURIComponent(JSON.stringify(prefs))
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${domain}${secure}`

  // The vendor scripts read the saved choice when this fires.
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT))
}
