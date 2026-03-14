import React from 'react';

interface FooterCopyrightProps {
  copyright: string;
}

export default function FooterCopyright({copyright}: FooterCopyrightProps): JSX.Element {
  return (
    <div
      className="footer__copyright"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: copyright}}
    />
  );
}
