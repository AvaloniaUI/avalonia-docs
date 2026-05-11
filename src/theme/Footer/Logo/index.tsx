import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import styles from './styles.module.scss';

interface Logo {
  src: string;
  srcDark?: string;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  href?: string;
  target?: string;
}

interface LogoImageProps {
  logo: Logo;
}

interface FooterLogoProps {
  logo: Logo;
}

function LogoImage({logo}: LogoImageProps): JSX.Element {
  const {withBaseUrl} = useBaseUrlUtils();
  const sources = {
    light: withBaseUrl(logo.src),
    dark: withBaseUrl(logo.srcDark ?? logo.src),
  };
  return (
    <ThemedImage
      className={clsx('footer__logo', logo.className)}
      alt={logo.alt}
      sources={sources}
      width={logo.width}
      height={logo.height}
      style={logo.style}
    />
  );
}

export default function FooterLogo({logo}: FooterLogoProps): JSX.Element {
  return logo.href ? (
    <Link
      href={logo.href}
      className={styles.footerLogoLink}
      target={logo.target}>
      <LogoImage logo={logo} />
    </Link>
  ) : (
    <LogoImage logo={logo} />
  );
}
