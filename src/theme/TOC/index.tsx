/**
 * This file wraps the original TOC so we don't need to modify the original code.
 *
 * Reasons for modifying:
 * - Add header to the top of the TOC.
 * - Add a `Edit this page` link to the bottom of the TOC.
 * - Add a random internal ad to the bottom of the TOC.
 */

import React, { useState, useEffect } from 'react';
import TOC from '@theme-original/TOC';
import type { Props } from '@theme/TOC';

import EditThisPage from '@theme-original/EditThisPage';
import { useLocation } from '@docusaurus/router';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

interface TOCProps extends Props {
  editUrl: string;
}

export default function TOCWrapper(props: TOCProps): JSX.Element {
  const location = useLocation();
  const { metadata } = useDoc();

  const isEmpty = props.toc.length <= 0;

  useEffect(() => {
  }, [location]);

  if (isEmpty) return null;

  return (
    <div className="toc-wrapper">
      <h2>Contents</h2>
      <TOC {...props} />
      <EditThisPage editUrl={metadata.editUrl} />
    </div>
  );
}
