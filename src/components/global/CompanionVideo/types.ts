// A page's companion video, specified in the front matter.

import type {EmbedProvider} from '../Video/utils';

export interface CompanionVideo {
  // Embed URL, or a media file for `kind: 'file'`.
  embedSrc: string;
  kind: 'embed' | 'file';
  provider?: EmbedProvider;
  // Can be derived from the embedded URL or explicitly provided, otherwise blank.
  posterUrl?: string;
  // Falls back to the page title so the dialog is never unlabelled.
  title: string;
  // Text display only. Never used to compute anything.
  duration?: string;
  // Eyebrow above the title on the card.
  label: string;
  // The original front matter value, for warning messages.
  rawSrc: string;
}

// The shape authors write in front matter.
export interface CompanionVideoFrontMatter {
  src?: unknown;
  title?: unknown;
  poster?: unknown;
  duration?: unknown;
  label?: unknown;
}
