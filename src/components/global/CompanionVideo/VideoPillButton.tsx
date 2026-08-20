import React from 'react';
import clsx from 'clsx';
import {PlayCircle, Youtube} from 'react-feather';
import VideoLightbox from './VideoLightbox';
import {useVideoLightbox} from './useVideoLightbox';
import type {CompanionVideo} from './types';
import styles from './styles.module.css';

interface VideoPillButtonProps {
  video: CompanionVideo;
  className?: string;
}

/**
 * The in-article companion video: a pill button that opens the same lightbox
 * as the TOC panel's thumbnail card. Rendered below the page title by the
 * DocItem/Content swizzle, and hidden at desktop widths on pages whose TOC
 * column already hosts the card.
 *
 * Styled after `.github-sample-link` so the two in-article pills read as a set.
 */
export default function VideoPillButton({
  video,
  className,
}: VideoPillButtonProps): React.JSX.Element {
  const {isOpen, open, close, triggerRef} = useVideoLightbox<HTMLButtonElement>();

  // `provider` is only set for embeds, so Vimeo and self-hosted files both fall
  // through to the neutral glyph rather than claiming to be YouTube.
  const Icon = video.provider === 'youtube' ? Youtube : PlayCircle;

  return (
    <div className={clsx(styles.pillWrapper, className)}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.pill}
        onClick={open}
        aria-haspopup="dialog"
      >
        <Icon aria-hidden="true" />
        <span>Watch the video guide</span>
      </button>

      {isOpen && <VideoLightbox video={video} onClose={close} />}
    </div>
  );
}
