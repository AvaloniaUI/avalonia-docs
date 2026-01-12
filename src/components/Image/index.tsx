import React, { CSSProperties, ImgHTMLAttributes } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';
import clsx from 'clsx';

type Position = 'start' | 'end' | 'center';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  light?: string;
  dark?: string;
  alt: string;
  position?: Position;
  cornerRadius?: boolean;
  className?: string;
  maxWidth?: string | number;
  margin?: string | number;
  style?: CSSProperties;
}

const positionMap: Record<Position, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
};

function Image({
  light,
  dark,
  alt,
  position = 'center',
  cornerRadius = false,
  className,
  maxWidth,
  margin,
  style,
  ...rest
}: ImageProps): JSX.Element {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const src = isDark ? dark || light : light || dark;

  let resolvedMargin: string | undefined;
  if (typeof margin === 'number') {
    resolvedMargin = `${margin}px`;
  } else if (typeof margin === 'string' && margin.includes(',')) {
    resolvedMargin = margin.split(',').map(val => `${val.trim()}px`).join(' ');
  } else if (typeof margin === 'string') {
    resolvedMargin = margin;
  }

  const image = (
    <img
      src={src}
      alt={alt}
      className={clsx(
        styles.image,
        cornerRadius && styles.cornerRadius,
        className
      )}
      style={{ maxWidth, margin: resolvedMargin, ...style }}
      {...rest}
    />
  );

  if (position in positionMap) {
    return (
      <div style={{ display: 'flex', justifyContent: positionMap[position] }}>
        {image}
      </div>
    );
  }

  return image;
}

export default Image;
