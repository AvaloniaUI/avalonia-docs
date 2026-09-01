import React, {useCallback, useEffect, useId, useRef} from 'react';
import {createPortal} from 'react-dom';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {withEmbedParams} from '../Video/utils';
import type {CompanionVideo} from './types';
import styles from './styles.module.css';

interface VideoLightboxProps {
  video: CompanionVideo;
  onClose: () => void;
}

const FOCUSABLE = 'button, [href], iframe, video, [tabindex]:not([tabindex="-1"])';

/**
 * Locks page scroll without the horizontal jump that removing the scrollbar
 * would otherwise cause.
 */
function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return undefined;

    const {body, documentElement: html} = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const gap = window.innerWidth - html.clientWidth;

    html.style.setProperty('--scrollbar-gap', `${gap}px`);
    html.classList.add('lightbox-open');
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      html.classList.remove('lightbox-open');
      html.style.removeProperty('--scrollbar-gap');
    };
  }, [active]);
}

/**
 * Makes the rest of the page unreachable while the dialog is open.
 */
function useInertBackground(active: boolean): void {
  useEffect(() => {
    if (!active) return undefined;

    const root = document.getElementById('__docusaurus');
    if (!root) return undefined;

    const hadInert = root.hasAttribute('inert');
    if (!hadInert) root.setAttribute('inert', '');

    return () => {
      if (!hadInert) root.removeAttribute('inert');
    };
  }, [active]);
}

export default function VideoLightbox({
  video,
  onClose,
}: VideoLightboxProps): React.JSX.Element | null {
  const isBrowser = useIsBrowser();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useScrollLock(isBrowser);
  useInertBackground(isBrowser);

  useEffect(() => {
    closeButtonRef.current?.focus({preventScroll: true});
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // mousedown, not click: a drag that starts on the player and releases over
  // the backdrop would otherwise close the dialog mid-scrub.
  const onBackdropMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  if (!isBrowser) return null;

  const player =
    video.kind === 'embed' ? (
      <iframe
        className={styles.player}
        src={withEmbedParams(video.embedSrc, {autoplay: '1', playsinline: '1'})}
        title={video.title}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ) : (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        className={styles.player}
        src={video.embedSrc}
        aria-label={video.title}
        poster={video.posterUrl}
        controls
        autoPlay
        playsInline
      />
    );

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={onBackdropMouseDown}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles.dialogHeader}>
          <h2 id={titleId} className={styles.dialogTitle}>
            {video.title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close video"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.playerFrame}>{player}</div>
      </div>
    </div>,
    document.body,
  );
}
