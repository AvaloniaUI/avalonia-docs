import {useCallback, useEffect, useRef, useState} from 'react';
import type {RefObject} from 'react';

interface VideoLightboxState<T extends HTMLElement> {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  // Attach to the element that opens the dialog, so focus can return to it.
  triggerRef: RefObject<T>;
}

/**
 * Open/close state for a trigger that shows the companion-video lightbox,
 * shared by the TOC thumbnail card and the in-article pill button.
 */
export function useVideoLightbox<
  T extends HTMLElement = HTMLButtonElement,
>(): VideoLightboxState<T> {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<T>(null);
  const shouldRestoreFocus = useRef(false);

  const open = useCallback(() => setIsOpen(true), []);

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

  return {isOpen, open, close, triggerRef};
}
