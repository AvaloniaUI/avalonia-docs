/**
 * DocItemContent renders the doc's markdown body, plus the "synthetic" page
 * title when the title comes from front matter rather than the content.
 *
 * Original source:
 * @link https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/DocItem/Content/index.tsx
 *
 * Reason for overriding:
 * - Render a page's companion video as a pill button directly below the page
 *   title. It lives here rather than in DocItem/Layout because the <h1> is
 *   rendered here, and the button has to follow it.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type {Props} from '@theme/DocItem/Content';
import {
  CompanionVideoButton,
  useCompanionVideo,
} from '@site/src/components/global/CompanionVideo';
import companionVideoStyles from './companionVideo.module.css';

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle(): string | null {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({children}: Props): ReactNode {
  const syntheticTitle = useSyntheticTitle();
  const companionVideo = useCompanionVideo();
  const {frontMatter, toc} = useDoc();

  // Whether this page gets a TOC column at all. The width half is left to the
  // `hiddenOnDesktop` media query, which is what actually hides the button
  // where the TOC panel's thumbnail card takes over.
  const hasTOCColumn = !frontMatter.hide_table_of_contents && toc.length > 0;

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      {/* Placed after the synthetic title so it reads as part of the page
          header. A page that writes its own `# H1` in the body gets no
          synthetic title, so the button would sit above it. For that reason,
          every page with a companion video should take its title from front matter. */}
      {companionVideo && (
        <CompanionVideoButton
          video={companionVideo}
          className={clsx(hasTOCColumn && companionVideoStyles.hiddenOnDesktop)}
        />
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
