import React from 'react';

/* ── Social icons (matching marketing site FooterAlt) ── */

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/avaloniaui/avalonia',
    icon: (props: { className?: string }) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/AvaloniaUI',
    icon: (props: { className?: string }) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/avaloniaui.net',
    icon: (props: { className?: string }) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.769,3.618C8.291,5.512,11.004,9.352,12,11.412c0.996-2.06,3.709-5.9,6.231-7.793C20.051,2.252,23,1.195,23,4.559c0,0.672-0.385,5.644-0.611,6.451c-0.785,2.806-3.647,3.522-6.192,3.089c4.449,0.757,5.581,3.265,3.137,5.774c-4.643,4.764-6.672-1.195-7.193-2.722c-0.095-0.28-0.14-0.411-0.14-0.3c-0.001-0.112-0.045,0.019-0.14,0.3c-0.521,1.527-2.55,7.486-7.193,2.722c-2.445-2.509-1.313-5.017,3.137-5.774c-2.546,0.433-5.407-0.282-6.192-3.089C1.385,10.203,1,5.231,1,4.559C1,1.195,3.949,2.252,5.769,3.618L5.769,3.618z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/avaloniaui/',
    icon: (props: { className?: string }) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UC54i4ILpN7JKUhP6liNYxkA',
    icon: (props: { className?: string }) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.com/channels/732297728826277939/736701158487490664',
    icon: (props: { className?: string }) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/Avalonia',
    icon: (props: { className?: string }) => (
      <svg className={props.className} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <path d="M32,10c12.15,0,22,9.85,22,22s-9.85,22-22,22s-22-9.85-22-22S19.85,10,32,10z M39.589,40.968c0.404-1.241,2.301-13.615,2.534-16.054c0.071-0.738-0.163-1.229-0.619-1.449c-0.553-0.265-1.371-0.133-2.322,0.21c-1.303,0.47-17.958,7.541-18.92,7.951c-0.912,0.388-1.775,0.81-1.775,1.423c0,0.431,0.256,0.673,0.96,0.924c0.732,0.261,2.577,0.82,3.668,1.121c1.05,0.29,2.243,0.038,2.913-0.378c0.709-0.441,8.901-5.921,9.488-6.402c0.587-0.48,1.056,0.135,0.576,0.616c-0.48,0.48-6.102,5.937-6.844,6.693c-0.901,0.917-0.262,1.868,0.343,2.249c0.689,0.435,5.649,3.761,6.396,4.295c0.747,0.534,1.504,0.776,2.198,0.776C38.879,42.942,39.244,42.028,39.589,40.968z" />
      </svg>
    ),
  },
];

/* ── Legal links ── */

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: 'https://avaloniaui.net/legal/privacy-policy' },
  { label: 'Terms of Service', href: 'https://avaloniaui.net/legal/terms-of-service' },
  { label: 'Legal Center', href: 'https://avaloniaui.net/legal' },
];

/* ── Footer link column data ── */

const FOOTER_COLUMNS = [
  {
    title: 'Products',
    links: [
      { label: 'Avalonia', href: 'https://avaloniaui.net/platforms' },
      { label: 'Avalonia XPF', href: 'https://avaloniaui.net/xpf' },
      { label: 'Avalonia Accelerate', href: 'https://avaloniaui.net/accelerate' },
      { label: 'Enhanced support', href: 'https://avaloniaui.net/support' },
      { label: 'Development services', href: 'https://avaloniaui.net/services' },
      { label: 'Orgs using Avalonia', href: 'https://avaloniaui.net/organisations' },
      { label: 'For startups', href: 'https://avaloniaui.net/startups' },
    ],
  },
  {
    title: 'For Developers',
    links: [
      { label: 'Documentation', href: 'https://docs.avaloniaui.net/' },
      { label: 'Samples', href: 'https://github.com/avaloniaui/avalonia/tree/master/samples' },
      { label: 'GitHub', href: 'https://github.com/avaloniaui/avalonia' },
      { label: 'MVPs', href: 'https://avaloniaui.net/mvps' },
      { label: 'App showcase', href: 'https://avaloniaui.net/showcase' },
      { label: 'Community hub', href: 'https://avaloniaui.community' },
      { label: 'Customer portal', href: 'https://portal.avaloniaui.net' },
    ],
  },
  {
    title: 'Platforms',
    links: [
      { label: 'Windows', href: 'https://avaloniaui.net/platforms/windows' },
      { label: 'macOS', href: 'https://avaloniaui.net/platforms/macos' },
      { label: 'Linux', href: 'https://avaloniaui.net/platforms/linux' },
      { label: 'iOS & Android', href: 'https://avaloniaui.net/platforms/mobile' },
      { label: 'WebAssembly', href: 'https://avaloniaui.net/platforms/wasm' },
    ],
  },
  {
    title: 'Handbook',
    links: [
      { label: 'Why we exist', href: 'https://avaloniaui.net/handbook/why-does-avalonia-ui-exist' },
      { label: 'Our OSS philosophy', href: 'https://avaloniaui.net/handbook/oss-philosophy' },
      { label: 'Values', href: 'https://avaloniaui.net/handbook/our-values' },
      { label: "Who we're building for", href: 'https://avaloniaui.net/handbook/who-we-are-building-for' },
      { label: 'Marketing', href: 'https://avaloniaui.net/handbook/marketing-overview' },
      { label: 'Value proposition', href: 'https://avaloniaui.net/handbook/value-proposition' },
      { label: 'How we "sell"', href: 'https://avaloniaui.net/handbook/how-we-sell' },
      { label: 'Pricing principles', href: 'https://avaloniaui.net/handbook/pricing-principles' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: 'https://avaloniaui.net/about' },
      { label: 'Team', href: 'https://avaloniaui.net/about#team' },
      { label: 'Blog', href: 'https://avaloniaui.net/blog' },
      { label: 'FAQ', href: 'https://avaloniaui.net/faq' },
      { label: 'Brand guidelines', href: 'https://avaloniaui.net/brand' },
      { label: 'Legal center', href: 'https://avaloniaui.net/legal' },
      { label: 'Contact', href: 'https://avaloniaui.net/contact' },
      { label: 'Careers', href: 'https://avaloniaui.net/careers' },
    ],
  },
];

/* ── Column component ── */

function FooterLinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.92)',
          margin: '0 0 14px',
          letterSpacing: '0.01em',
        }}
      >
        {title}
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-alt-link"
              style={{
                fontSize: '13px',
                fontWeight: 380,
                color: 'rgba(255, 255, 255, 0.50)',
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.80)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.50)' }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main Footer Component (matches marketing site FooterAlt) ── */

export default function HomeFooter(): JSX.Element {
  return (
    <footer
      style={{
        backgroundColor: '#05051E',
        color: 'rgba(255, 255, 255, 0.7)',
      }}
    >
      <div
        className="mx-auto px-6 md:px-12 lg:px-20"
        style={{ maxWidth: '1360px' }}
      >
        {/* ── Link columns ── */}
        <div style={{ paddingTop: '48px', paddingBottom: '32px' }}>
          {/* Desktop: all columns in one row */}
          <div
            className="hidden md:grid gap-8"
            style={{
              gridTemplateColumns: `repeat(${FOOTER_COLUMNS.length}, 1fr)`,
            }}
          >
            {FOOTER_COLUMNS.map((col) => (
              <FooterLinkColumn key={col.title} {...col} />
            ))}
          </div>

          {/* Mobile: 2-column grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:hidden">
            {FOOTER_COLUMNS.map((col) => (
              <FooterLinkColumn key={col.title} {...col} />
            ))}
          </div>
        </div>

        {/* ── Social icons row ── */}
        <div
          className="flex items-center gap-5 flex-wrap"
          style={{ padding: '20px 0' }}
        >
          {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              style={{ color: 'rgba(255, 255, 255, 0.40)', transition: 'color 150ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.80)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.40)' }}
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>

        {/* ── Divider ── */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.10)' }} />

        {/* ── Bottom row: legal links + copyright ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ padding: '20px 0 24px' }}
        >
          {/* Legal links */}
          <div className="flex items-center gap-4 flex-wrap">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px',
                  fontWeight: 380,
                  color: 'rgba(255, 255, 255, 0.40)',
                  textDecoration: 'none',
                  transition: 'color 150ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.70)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.40)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p
            style={{
              fontSize: '12px',
              fontWeight: 380,
              color: 'rgba(255, 255, 255, 0.30)',
              margin: 0,
            }}
          >
            Copyright &copy; 2019-{new Date().getFullYear()} AvaloniaUI O&Uuml;.
          </p>
        </div>
      </div>
    </footer>
  );
}
