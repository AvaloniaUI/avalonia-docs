import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface FooterLayoutProps {
  style?: 'dark' | 'light';
  links?: ReactNode;
  logo?: ReactNode;
  copyright?: ReactNode;
}

export default function FooterLayout({style, links, logo, copyright}: FooterLayoutProps): JSX.Element {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
