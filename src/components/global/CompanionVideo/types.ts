import type {EmbedProvider} from '../Video/utils';

/** A page's companion video, normalised from front matter. */
export interface CompanionVideo {
  /** Ready-to-use embed URL, or a media file URL for `kind: 'file'`. */
  embedSrc: string;
  kind: 'embed' | 'file';
  provider?: EmbedProvider;
  /** Absent when no poster was given and none could be derived. */
  posterUrl?: string;
  /** Always set: falls back to the page title so the dialog is never unlabelled. */
  title: string;
  /** Display string only, e.g. `"9:12"`. Never parsed. */
  duration?: string;
  /** Eyebrow above the title on the card. */
  label: string;
  /** The original front matter value, for warning messages. */
  rawSrc: string;
}

/** The shape authors write in front matter. Every field arrives as `unknown`. */
export interface CompanionVideoFrontMatter {
  src?: unknown;
  title?: unknown;
  poster?: unknown;
  duration?: unknown;
  label?: unknown;
}
