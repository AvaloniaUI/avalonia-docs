import {useEffect, useState} from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {Badge, Link} from '@avaloniaui/web-ds';

declare global {
  interface Window {
    __webDsCompatibilityHydrated?: boolean;
  }
}

/**
 * Opt-in release fixture. It is routed only when
 * WEB_DS_COMPATIBILITY_FIXTURE=true and is never part of the public docs site.
 */
export default function WebDSCompatibilityFixture() {
  const [dark, setDark] = useState(false);
  const [interactions, setInteractions] = useState(0);
  const brokenLinks = useBrokenLinks();

  brokenLinks.collectAnchor('web-ds-anchor-target');

  useEffect(() => {
    window.__webDsCompatibilityHydrated = true;

    return () => {
      delete window.__webDsCompatibilityHydrated;
    };
  }, []);

  return (
    <main id="web-ds-compatibility-fixture">
      <h1>WebDS Docusaurus compatibility</h1>

      <section
        className="font-ava-saans"
        data-theme={dark ? 'dark' : 'light'}>
        <Badge id="web-ds-compatibility-badge" size="sm" tone="success">
          React 18.3 fixture
        </Badge>
        <span id="web-ds-tailwind-token" className="text-ava-brand-600">
          Tailwind token adapter
        </span>
        <span
          id="docs-tailwind-gray"
          className="bg-gray-200 text-gray-700">
          Documentation gray palette
        </span>
        <span
          id="web-ds-tailwind-gray"
          className="bg-ava-gray-200 text-ava-gray-700">
          Namespaced WebDS gray palette
        </span>
        <button
          id="web-ds-compatibility-theme"
          type="button"
          onClick={() => setDark((value) => !value)}>
          Use {dark ? 'light' : 'dark'} theme
        </button>
        <button
          id="web-ds-compatibility-hydration"
          type="button"
          onClick={() => setInteractions((value) => value + 1)}>
          Hydration interactions: {interactions}
        </button>
      </section>

      <nav aria-label="WebDS compatibility links">
        <Link id="web-ds-link-internal" href="/docs/welcome">
          Internal docs route
        </Link>
        <Link
          id="web-ds-link-versioned"
          href="/api/12.0.5/avalonia/controls/button"
          data-noBrokenLinkCheck>
          Versioned API route
        </Link>
        <Link id="web-ds-link-anchor" href="#web-ds-anchor-target">
          Same-page anchor
        </Link>
        <Link id="web-ds-link-download" href="/assets/web-ds-fixture.txt" download>
          Download fixture
        </Link>
        <Link id="web-ds-link-external" href="https://avaloniaui.net/">
          External route
        </Link>
        <Link
          id="web-ds-link-target"
          href="/docs/welcome"
          target="_blank">
          Targeted internal route
        </Link>
      </nav>

      <div id="web-ds-anchor-target">Anchor target</div>
    </main>
  );
}
