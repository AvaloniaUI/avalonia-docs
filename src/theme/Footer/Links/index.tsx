import React from 'react';
import {isMultiColumnFooterLinks} from '@docusaurus/theme-common';
import FooterLinksMultiColumn from '@theme/Footer/Links/MultiColumn';
import FooterLinksSimple from '@theme/Footer/Links/Simple';
import type {FooterLinkItem} from '@docusaurus/theme-common';

interface FooterLinksProps {
  links: FooterLinkItem[] | Array<{title: string; items: FooterLinkItem[]}>;
}

export default function FooterLinks({links}: FooterLinksProps): JSX.Element {
  return isMultiColumnFooterLinks(links) ? (
    <FooterLinksMultiColumn columns={links} />
  ) : (
    <FooterLinksSimple links={links} />
  );
}
