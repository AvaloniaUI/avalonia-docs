// Associates the `video:` front matter key with a CompanionVideo.

import {parseSource, youTubeThumbnail} from '../Video/utils';
import type {CompanionVideo, CompanionVideoFrontMatter} from './types';

const DEFAULT_LABEL = 'Video guide';

function asString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

function warn(message: string): void {
  console.warn(`[CompanionVideo] ${message}`);
}

/**
 * @param value      the raw `frontMatter.video` value
 * @param pageTitle  used when the author omitted `title`
 * @param withBaseUrl `useBaseUrlUtils().withBaseUrl`, for site-relative posters
 */
export function parseCompanionVideo(
  value: unknown,
  pageTitle: string | undefined,
  withBaseUrl: (url: string) => string,
): CompanionVideo | null {
  if (value === undefined || value === null) return null;

  // `video: https://youtu.be/...` is the shorthand for `video: {src: ...}`.
  const input: CompanionVideoFrontMatter =
    typeof value === 'string'
      ? {src: value}
      : typeof value === 'object'
        ? (value as CompanionVideoFrontMatter)
        : {};

  const rawSrc = asString(input.src);
  if (!rawSrc) {
    warn(
      'front matter `video` needs a non-empty `src`; ignoring it. ' +
        'Use `video: <url>` or `video: {src: <url>, title: ...}`.',
    );
    return null;
  }

  const parsed = parseSource(rawSrc);
  if (parsed.kind === 'unknown') {
    warn(`unrecognised video src, ignoring it: ${rawSrc}`);
    return null;
  }

  const explicitTitle = asString(input.title);
  if (!explicitTitle) {
    warn(
      `front matter \`video\` has no \`title\`, falling back to the page title: ${rawSrc}`,
    );
  }

  const poster = asString(input.poster);
  const derivedPoster =
    parsed.kind === 'embed' && parsed.provider === 'youtube' && parsed.videoId
      ? youTubeThumbnail(parsed.videoId)
      : undefined;

  return {
    embedSrc: parsed.src,
    kind: parsed.kind,
    provider: parsed.kind === 'embed' ? parsed.provider : undefined,
    // An author-supplied poster always wins. Vimeo thumbnails need an oEmbed
    // round trip, so those pages get the no-image card unless `poster` is set.
    posterUrl: poster ? withBaseUrl(poster) : derivedPoster,
    title: explicitTitle ?? pageTitle ?? 'Video guide',
    duration: asString(input.duration),
    label: asString(input.label) ?? DEFAULT_LABEL,
    rawSrc,
  };
}
