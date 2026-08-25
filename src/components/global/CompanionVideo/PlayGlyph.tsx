import React from 'react';

/**
 * The play triangle inside the circular badge on a video thumbnail, shared by
 * the TOC card and the in-article button.
 *
 * Deliberately propless: the 16px intrinsic size is what the TOC card wants, and
 * the smaller in-article badge overrides it from CSS.
 */
export default function PlayGlyph(): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 3.5L12.5 8L5.5 12.5V3.5Z" fill="currentColor" />
    </svg>
  );
}
