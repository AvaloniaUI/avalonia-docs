import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import HomeFooter from '../../components/page/homepage/HomeFooter';

function Footer(): JSX.Element | null {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  return (
    <HomeFooter />
  );
}

export default React.memo(Footer);
