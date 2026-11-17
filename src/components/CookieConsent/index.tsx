import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  readCookiePreferences,
  writeCookiePreferences,
  type CookiePreferences,
} from '../../lib/cookieConsent'
import './styles.css'

export const PREFERENCES_OPEN_EVENT = 'av:open-cookie-preferences'

/** Reopens the banner in its expanded preferences state, e.g. from a footer link. */
export function openCookiePreferences(): void {
  window.dispatchEvent(new Event(PREFERENCES_OPEN_EVENT))
}

// The inline consent-mode script in docusaurus.config.ts only runs at page
// load, so a choice made in the banner has to be pushed to Google tags here.
function gtagConsentUpdate(prefs: CookiePreferences): void {
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  function gtag(..._args: unknown[]) {
    w.dataLayer!.push(arguments)
  }
  gtag('consent', 'update', {
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    personalization_storage: prefs.messaging ? 'granted' : 'denied',
  })
}

/* ── Toggle Switch ──────────────────────────────────────────── */

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      role="switch"
      type="button"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className="cookie-toggle"
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        border: 'none',
        padding: 2,
        cursor: disabled ? 'default' : 'pointer',
        background: disabled
          ? '#007DF9'
          : checked
            ? '#007DF9'
            : '#C1BBB8',
        transition: 'background 200ms ease',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          display: 'block',
          transition: 'transform 200ms ease',
          transform: checked || disabled ? 'translateX(18px)' : 'translateX(0)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }}
      />
    </button>
  )
}

/* ── Close button ───────────────────────────────────────────── */

function ModalCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      style={{
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: 'none',
        background: '#F3F1F0',
        color: '#A09CA6',
        cursor: 'pointer',
        transition: 'background 150ms, color 150ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#E3DFDC'
        e.currentTarget.style.color = '#0E0E33'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#F3F1F0'
        e.currentTarget.style.color = '#A09CA6'
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

const actionButtonBase: React.CSSProperties = {
  borderRadius: 9999,
  border: 'none',
  fontSize: 14,
  fontWeight: 550,
  letterSpacing: '0.02em',
  fontFamily: '"Saans", sans-serif',
  cursor: 'pointer',
  padding: '8px 16px',
  transition: 'background 150ms',
  whiteSpace: 'nowrap',
}

/* ── Main CookieConsent Component ───────────────────────────── */

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [messaging, setMessaging] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  // Check if consent already given on mount
  useEffect(() => {
    const existing = readCookiePreferences()
    if (existing) {
      setAnalytics(existing.analytics)
      setMessaging(existing.messaging)
      // Don't show banner — consent already given
    } else {
      // Small delay so it doesn't flash on page load
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  // "Cookie settings" style links reopen the preferences
  useEffect(() => {
    const open = () => {
      const existing = readCookiePreferences()
      if (existing) {
        setAnalytics(existing.analytics)
        setMessaging(existing.messaging)
      }
      setExpanded(true)
      setVisible(true)
    }
    window.addEventListener(PREFERENCES_OPEN_EVENT, open)
    return () => window.removeEventListener(PREFERENCES_OPEN_EVENT, open)
  }, [])

  // IntersectionObserver on footer to avoid overlapping
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const animateOut = useCallback((cb: () => void) => {
    setAnimatingOut(true)
    setTimeout(() => {
      setAnimatingOut(false)
      setVisible(false)
      setExpanded(false)
      cb()
    }, 250)
  }, [])

  const savePrefs = useCallback((prefs: CookiePreferences) => {
    writeCookiePreferences(prefs)
    gtagConsentUpdate(prefs)
  }, [])

  const handleAcceptAll = useCallback(() => {
    const prefs: CookiePreferences = { analytics: true, messaging: true }
    savePrefs(prefs)
    setAnalytics(true)
    setMessaging(true)
    animateOut(() => undefined)
  }, [animateOut, savePrefs])

  const handleSavePreferences = useCallback(() => {
    savePrefs({ analytics, messaging })
    animateOut(() => undefined)
  }, [analytics, messaging, animateOut, savePrefs])

  const handleMaybe = useCallback(() => {
    setExpanded(true)
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Backdrop overlay for expanded mode */}
      {expanded && (
        <div
          className="cookie-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 5, 30, 0.3)',
            zIndex: 9998,
            animation: animatingOut
              ? 'cookie-fade-out 250ms ease forwards'
              : 'cookie-fade-in 300ms ease forwards',
          }}
          onClick={() => animateOut(() => undefined)}
        />
      )}

      <div
        ref={bannerRef}
        style={{
          position: 'fixed',
          // On mobile: bottom-center full width; on desktop: bottom-left
          bottom: footerVisible ? undefined : 20,
          left: 20,
          right: expanded ? 20 : undefined,
          zIndex: 9999,
          // When footer is visible, push up above it
          ...(footerVisible && {
            bottom: 20,
          }),
          maxWidth: expanded ? 520 : undefined,
          width: expanded ? 'calc(100% - 40px)' : undefined,
          pointerEvents: 'auto',
          animation: animatingOut
            ? 'cookie-slide-out 250ms ease forwards'
            : 'cookie-slide-in 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        className="cookie-banner-position"
      >
        <div
          style={{
            background: '#fff',
            borderRadius: expanded ? 16 : 100,
            boxShadow: '0 8px 40px -8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            fontFamily: '"Saans", "Saans Regular", sans-serif',
          }}
        >
          {!expanded ? (
            /* ── Compact banner ── */
            <div
              className="cookie-compact"
              style={{
                padding: '10px 10px 10px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Text side */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#0E0E33',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  Can we use cookies?
                </p>
                <p
                  style={{
                    margin: '2px 0 0',
                    fontSize: 12.5,
                    color: '#8A8490',
                    fontWeight: 380,
                    letterSpacing: '0.01em',
                  }}
                >
                  Read our{' '}
                  <a
                    href="https://avaloniaui.net/legal/cookie-notice"
                    style={{
                      color: '#8A8490',
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    Cookie Notice
                  </a>
                </p>
              </div>

              {/* Buttons side */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {(['Yes', 'Maybe'] as const).map((label) => {
                  const isYes = label === 'Yes'
                  return (
                    <button
                      key={label}
                      onClick={isYes ? handleAcceptAll : handleMaybe}
                      style={{
                        height: 36,
                        minWidth: 76,
                        borderRadius: 9999,
                        border: isYes ? 'none' : '1px solid #E3DFDC',
                        background: isYes ? '#05051E' : '#fff',
                        color: isYes ? '#F3F1F0' : '#05051E',
                        fontSize: 14,
                        fontWeight: 550,
                        fontFamily: '"Saans", sans-serif',
                        cursor: 'pointer',
                        padding: '0 18px',
                        transition: 'background 150ms, border-color 150ms',
                        letterSpacing: '0.28px',
                      }}
                      onMouseEnter={(e) => {
                        if (isYes) {
                          e.currentTarget.style.background = '#22284A'
                        } else {
                          e.currentTarget.style.background = '#FAF7F5'
                          e.currentTarget.style.borderColor = '#C1BBB8'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isYes) {
                          e.currentTarget.style.background = '#05051E'
                        } else {
                          e.currentTarget.style.background = '#fff'
                          e.currentTarget.style.borderColor = '#E3DFDC'
                        }
                      }}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            /* ── Expanded preferences ── */
            <div>
              {/* Header */}
              <div style={{ padding: '24px 24px 0' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 500,
                      color: '#0E0E33',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Cookie preferences
                  </h2>
                  <ModalCloseButton onClick={() => animateOut(() => undefined)} />
                </div>
                <p
                  style={{
                    margin: '0 0 20px',
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: '#696460',
                    fontWeight: 380,
                    letterSpacing: '0.01em',
                  }}
                >
                  You can choose which non-essential cookies we use. Your choice will not affect the core functionality of the website, and you can change your preferences at any time.
                </p>
              </div>

              {/* Categories */}
              <div
                style={{
                  borderTop: '1px solid #E3DFDC',
                  maxHeight: 340,
                  overflowY: 'auto',
                }}
              >
                {/* Advertising */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #F3F1F0' }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#0E0E33',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    Advertising
                  </p>
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      color: '#8A8490',
                      fontWeight: 380,
                    }}
                  >
                    We don't use advertising cookies — our product speaks for itself.
                  </p>
                </div>

                {/* Strictly necessary */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #F3F1F0' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#0E0E33',
                          letterSpacing: '-0.005em',
                        }}
                      >
                        Strictly necessary
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 550,
                        color: '#007DF9',
                        letterSpacing: '0.02em',
                        flexShrink: 0,
                      }}
                    >
                      Always active
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      color: '#8A8490',
                      fontWeight: 380,
                    }}
                  >
                    These cookies are required for essential site functions such as security, session handling, and remembering your privacy choices.
                  </p>
                </div>

                {/* Analytics */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #F3F1F0' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#0E0E33',
                          letterSpacing: '-0.005em',
                        }}
                      >
                        Analytics and measurement
                      </p>
                    </div>
                    <Toggle checked={analytics} onChange={setAnalytics} />
                  </div>
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      color: '#8A8490',
                      fontWeight: 380,
                    }}
                  >
                    These cookies help us understand how the documentation is used, measure performance, and improve the experience.
                  </p>
                </div>

                {/* Messaging */}
                <div style={{ padding: '16px 24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#0E0E33',
                          letterSpacing: '-0.005em',
                        }}
                      >
                        Messaging and personalisation
                      </p>
                    </div>
                    <Toggle checked={messaging} onChange={setMessaging} />
                  </div>
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      color: '#8A8490',
                      fontWeight: 380,
                    }}
                  >
                    These cookies let avaloniaui.net remember which parts of the site you've visited, so announcements show you the most relevant message.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div
                className="cookie-actions"
                style={{
                  borderTop: '1px solid #E3DFDC',
                  padding: '16px 24px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  gap: 8,
                }}
              >
                <button
                  onClick={handleSavePreferences}
                  style={{
                    ...actionButtonBase,
                    background: '#F3F1F0',
                    color: '#05051E',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E3DFDC'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F3F1F0'
                  }}
                >
                  Save preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  style={{
                    ...actionButtonBase,
                    background: '#05051E',
                    color: '#F3F1F0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#22284A'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#05051E'
                  }}
                >
                  Accept all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
