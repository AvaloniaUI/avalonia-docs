/**
 * DocBreadcrumbs renders the breadcrumb trail at the top of every doc page.
 *
 * Original source:
 * @link https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/DocBreadcrumbs/index.tsx
 *
 * Reason for overriding:
 * - The upstream root crumb is a house icon hardcoded to `useBaseUrl('/')`, and
 *   src/pages/index.tsx redirects '/' to '/docs/welcome'. So on every section
 *   other than Guides, the house silently took the reader out of the section
 *   they were browsing. Here the root crumb is the *section* instead: it links
 *   to the section landing page and is labelled with the section name.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  useSidebarBreadcrumbs,
  useActivePlugin,
} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarBreadcrumbsItem} from '@docusaurus/plugin-content-docs';
import IconHome from '@theme/Icon/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import styles from './styles.module.css';

type Section = {
  label: string;
  href: string;
};

/**
 * Each docs section is a separate content-docs plugin instance, so the section
 * is keyed by plugin id (the sidebar id can't be used: five of the six sidebars
 * share the id `documentationSidebar`). Keep in sync with the plugin instances
 * and the navbar items in docusaurus.config.ts.
 *
 * Guides points at /docs/welcome rather than /docs, which has no index doc.
 */
function useSections(): Record<string, Section> {
  return {
    default: {
      href: '/docs/welcome',
      label: translate({
        id: 'theme.docs.breadcrumbs.section.guides',
        message: 'Guides',
        description: 'Breadcrumb label for the Guides docs section',
      }),
    },
    controls: {
      href: '/controls',
      label: translate({
        id: 'theme.docs.breadcrumbs.section.controls',
        message: 'Controls',
        description: 'Breadcrumb label for the Controls docs section',
      }),
    },
    tools: {
      href: '/tools',
      label: translate({
        id: 'theme.docs.breadcrumbs.section.tools',
        message: 'Tools',
        description: 'Breadcrumb label for the Tools docs section',
      }),
    },
    api: {
      href: '/api',
      label: translate({
        id: 'theme.docs.breadcrumbs.section.api',
        message: 'APIs',
        description: 'Breadcrumb label for the API reference docs section',
      }),
    },
    troubleshooting: {
      href: '/troubleshooting',
      label: translate({
        id: 'theme.docs.breadcrumbs.section.troubleshooting',
        message: 'Troubleshooting',
        description: 'Breadcrumb label for the Troubleshooting docs section',
      }),
    },
    xpf: {
      href: '/xpf',
      label: translate({
        id: 'theme.docs.breadcrumbs.section.xpf',
        message: 'Avalonia XPF',
        description: 'Breadcrumb label for the Avalonia XPF docs section',
      }),
    },
  };
}

/** Same semantics as theme-common's isSamePath, which is not public API. */
function isSamePath(path1: string | undefined, path2: string | undefined) {
  const normalize = (pathname: string | undefined) =>
    (!pathname || pathname.endsWith('/') ? pathname : `${pathname}/`)?.toLowerCase();
  return normalize(path1) === normalize(path2);
}

function BreadcrumbsItemLink({
  children,
  href,
  isLast,
}: {
  children: React.ReactNode;
  href: string | undefined;
  isLast: boolean;
}): JSX.Element {
  const className = clsx('breadcrumbs__link', styles.breadcrumbLink);
   if (isLast || !href) {
     return (
       <span className={className} aria-current={isLast ? 'page' : undefined}>
         {children}
       </span>
     );
  }
   return (
     <Link className={className} to={href}>
       {children}
    </Link>
  );
}

function BreadcrumbsItem({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}): JSX.Element {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
      {children}
    </li>
  );
}

export default function DocBreadcrumbs(): JSX.Element | null {
  const sidebarBreadcrumbs = useSidebarBreadcrumbs();
  const activePlugin = useActivePlugin();
  const sections = useSections();

  const section = activePlugin ? sections[activePlugin.pluginId] : undefined;
  const sectionHref = useBaseUrl(section?.href ?? '/');

  if (!sidebarBreadcrumbs) {
    return null;
  }

  // A single array drives both the visible trail and the structured data, so
  // the two can't drift apart.
  const breadcrumbs: PropSidebarBreadcrumbsItem[] = section
    ? [
        {type: 'link', label: section.label, href: sectionHref},
        // On a section landing page the sidebar's own first crumb is already
        // the section (/controls yields 'Home', /api yields the index title),
        // which would render as 'Controls > Home'.
        ...sidebarBreadcrumbs.filter(
          (item, idx) => !(idx === 0 && isSamePath(item.href, sectionHref)),
        ),
      ]
    : sidebarBreadcrumbs;

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs">
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const isSection = !!section && idx === 0;
            const href =
              item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {isSection && (
                    <IconHome
                      className={styles.breadcrumbHomeIcon}
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
