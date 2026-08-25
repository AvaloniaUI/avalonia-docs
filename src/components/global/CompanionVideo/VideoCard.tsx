import React from 'react';
import clsx from 'clsx';
import PlayGlyph from './PlayGlyph';
import VideoLightbox from './VideoLightbox';
import {useVideoLightbox} from './useVideoLightbox';
import type {CompanionVideo} from './types';
import styles from './styles.module.css';

interface VideoCardProps {
  video: CompanionVideo;
  className?: string;
}

/**
 * The companion-video thumbnail, shown only in the desktop TOC panel. Wherever
 * that column is absent — below 997px, or on a page with no TOC at all — the
 * article renders ./VideoPillButton instead.
 *
 * The card itself is `position: relative` with no z-index on purpose: the TOC's
 * "Open in" dropdown panel is `absolute z-40` and sits later in DOM order, so
 * leaving the stacking to document order keeps it on top.
 */
export default function VideoCard({
  video,
  className,
}: VideoCardProps): React.JSX.Element {
  const {isOpen, open, close, triggerRef} = useVideoLightbox<HTMLButtonElement>();

  return (
    <div className={clsx(styles.card, className)}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={open}
        aria-haspopup="dialog"
      >
        {/* Label and title before the thumbnail, in DOM order rather than with
            `column-reverse`, so assistive tech reads what the card is before
            reaching its decorative image. */}
        <span className={styles.meta}>
          <span className={styles.eyebrow}>{video.label}</span>
          <span className={styles.title}>{video.title}</span>
        </span>
        <span className={clsx(styles.thumb, !video.posterUrl && styles.thumbEmpty)}>
          {video.posterUrl && (
            <img
              className={styles.thumbImage}
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
          {video.posterUrl && <span className={styles.scrim} aria-hidden="true" />}
          <span className={styles.playBadge} aria-hidden="true">
            <PlayGlyph />
          </span>
          {video.duration && (
            <span className={styles.duration}>{video.duration}</span>
          )}
        </span>
      </button>

      {isOpen && <VideoLightbox video={video} onClose={close} />}
    </div>
  );
}
