import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import VideoLightbox from './VideoLightbox';
import type {CompanionVideo, CompanionVideoVariant} from './types';
import styles from './styles.module.css';

interface VideoCardProps {
  video: CompanionVideo;
  variant: CompanionVideoVariant;
  className?: string;
}

const PlayGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5.5 3.5L12.5 8L5.5 12.5V3.5Z" fill="currentColor" />
  </svg>
);

/**
 * The companion-video thumbnail. Lives in the TOC panel on desktop and at the
 * top of the article below 997px, where there is no TOC column.
 *
 * The card itself is `position: relative` with no z-index on purpose: the TOC's
 * "Open in" dropdown panel is `absolute z-40` and sits later in DOM order, so
 * leaving the stacking to document order keeps it on top.
 */
export default function VideoCard({
  video,
  variant,
  className,
}: VideoCardProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldRestoreFocus = useRef(false);

  const close = useCallback(() => {
    shouldRestoreFocus.current = true;
    setIsOpen(false);
  }, []);

  // Focus has to be restored from an effect rather than inside close(): while
  // the dialog is open it marks #__docusaurus as `inert`, and focus() on an
  // element inside an inert subtree is a no-op. By the time this runs the
  // dialog has unmounted and its cleanup has lifted the attribute.
  useEffect(() => {
    if (isOpen || !shouldRestoreFocus.current) return;
    shouldRestoreFocus.current = false;
    triggerRef.current?.focus({preventScroll: true});
  }, [isOpen]);

  return (
    <div
      className={clsx(
        styles.card,
        variant === 'toc' ? styles.tocVariant : styles.articleVariant,
        className,
      )}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
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
