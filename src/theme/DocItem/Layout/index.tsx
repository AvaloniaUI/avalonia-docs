/**
 * DocItemLayout is a component that renders the layout of a page like
 * the individual component pages, guide pages, etc.
 *
 * Original source:
 * @link https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/DocItem/Layout/index.tsx
 *
 * Reason for overriding:
 * - Move the version banner above the content row, so it spans the full width
 * - Render a page's companion video in the article when the TOC column that
 *   normally hosts it is not there
 */

import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import type {Props} from '@theme/DocItem/Layout';
import styles from '@docusaurus/theme-classic/lib/theme/DocItem/Layout/styles.module.css';
import {
  CompanionVideoCard,
  useCompanionVideo,
} from '@site/src/components/global/CompanionVideo';
import companionVideoStyles from './companionVideo.module.css';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({children}: Props): JSX.Element {
  const docTOC = useDocTOC();
  const {metadata} = useDoc();
  const companionVideo = useCompanionVideo();

  // The TOC column normally hosts the companion video. It is absent below
  // 997px, and also on any page that sets `hide_table_of_contents` or simply
  // has no headings — which is exactly the kind of landing page most likely to
  // have a companion video. When it is absent the card belongs in the article,
  // at every width, so a declared video is never silently dropped.
  const hasDesktopTOC = Boolean(docTOC.desktop);

  return (
    <>
      {/* ------- CUSTOM CODE -------- */}
      {/* Moved to be on top of the inner content. */}
      {/* The banner is rendered per version based on the versions config on docusaurus.config.js */}
      <DocVersionBanner />
      {/* ------- CUSTOM CODE END -------- */}
      <div className="row">
        <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
          <ContentVisibility metadata={metadata} />
          <div className={styles.docItemContainer}>
            <article>
              <DocBreadcrumbs />
              <DocVersionBadge />
              {docTOC.mobile}
              {companionVideo && (
                <CompanionVideoCard
                  video={companionVideo}
                  variant="article"
                  className={clsx(
                    hasDesktopTOC && companionVideoStyles.hiddenOnDesktop,
                  )}
                />
              )}
              <DocItemContent>{children}</DocItemContent>
              <DocItemFooter />
              <DocItemPaginator />
            </article>
          </div>
        </div>
        {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
      </div>
    </>
  );
}
