import {useMemo} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {parseCompanionVideo} from './frontMatter';
import type {CompanionVideo} from './types';

/**
 * Reads the optional `video:` front matter key for the current doc.
 *
 * Returns null on every page that does not declare one — which is nearly all
 * of them, including the thousands of generated /api pages that share the TOC
 * swizzle. The early bail and the memo keep that path free.
 */
export function useCompanionVideo(): CompanionVideo | null {
  const {frontMatter, metadata} = useDoc();
  const {withBaseUrl} = useBaseUrlUtils();

  const raw = (frontMatter as Record<string, unknown>).video;
  const pageTitle = metadata?.title;

  return useMemo(() => {
    if (raw === undefined || raw === null) return null;
    return parseCompanionVideo(raw, pageTitle, withBaseUrl);
  }, [raw, pageTitle, withBaseUrl]);
}
