/**
 * This file wraps the original DocSidebar so we don't need to modify the original code.
 *
 * Reason for modifying:
 * - Add a logo to the top of the sidebar
 * - Scroll to the active item in the sidebar
 */

import React, { useEffect, useRef } from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import type { Props } from '@theme/DocSidebar';

import Logo from '@theme-original/Logo';

export default function DocSidebarWrapper(props: Props): JSX.Element {
  const hasScrolled = useRef(false);

  // Scroll to active item only on initial mount (deep links, page refresh)
  useEffect(() => {
    if (hasScrolled.current) return;
    hasScrolled.current = true;

    setTimeout(() => {
      const activeItem = document.querySelector('.menu__link--active');
      if (!activeItem) return;
      activeItem.scrollIntoView({ block: 'center', behavior: 'auto' });
    }, 100);
  }, []);

  return (
    <>
      <Logo />
      <DocSidebar {...props} />
    </>
  );
}
