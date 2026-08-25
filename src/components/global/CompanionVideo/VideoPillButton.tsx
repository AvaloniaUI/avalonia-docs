import React from 'react';
import clsx from 'clsx';
import PlayGlyph from './PlayGlyph';
import VideoLightbox from './VideoLightbox';
import {useVideoLightbox} from './useVideoLightbox';
import type {CompanionVideo} from './types';
import styles from './styles.module.css';

interface VideoPillButtonProps {
  video: CompanionVideo;
  className?: string;
}

/**
 * The in-article companion video: a bordered thumbnail-and-label button that
 * opens the same lightbox as the TOC panel's thumbnail card. Rendered below the
 * page title by the DocItem/Content swizzle, and hidden at desktop widths on
 * pages whose TOC column already hosts the card — which makes this the only
 * place a portrait reader ever sees the thumbnail.
 *
 * Everything is one `<button>`: the thumbnail and the label are plain spans, so
 * a click anywhere in the border opens the dialog and the whole thing is a
 * single tab stop. It keeps the brand-fill hover of `.github-sample-link`, so
 * the two in-article calls to action still read as a set.
 */
export default function VideoPillButton({
  video,
  className,
}: VideoPillButtonProps): React.JSX.Element {
  const {isOpen, open, close, triggerRef} = useVideoLightbox<HTMLButtonElement>();

  return (
    <div className={clsx(styles.pillWrapper, className)}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.pill}
        onClick={open}
        aria-haspopup="dialog"
      >
        {/* `.thumbEmpty` is the fallback for a video with no derivable poster:
            Vimeo needs an oEmbed round trip, and self-hosted files have none. */}
        <span
          className={clsx(styles.pillThumb, !video.posterUrl && styles.thumbEmpty)}
        >
          {video.posterUrl && (
            <img
              // `no-zoom` is a plain global class, not a module one: the site's
              // medium-zoom selector is a static string in docusaurus.config.ts
              // and cannot name a hashed class. Without it the zoom claims this
              // image — it sits inside `div.markdown` — and fights the lightbox
              // for the same click, leaving its overlay behind afterwards.
              className={clsx(styles.thumbImage, 'no-zoom')}
              src={video.posterUrl}
              // The thumbnail is the only third-party request this component
              // makes before a click. Withholding the referrer keeps the
              // originating doc page out of the provider's logs.
              referrerPolicy="no-referrer"
              alt=""
              width={480}
              height={360}
              loading="lazy"
              decoding="async"
            />
          )}
          <span className={styles.pillPlayBadge} aria-hidden="true">
            <PlayGlyph />
          </span>
        </span>
        <span className={styles.pillLabel}>Watch the video guide</span>
      </button>

      {isOpen && <VideoLightbox video={video} onClose={close} />}
    </div>
  );
}
