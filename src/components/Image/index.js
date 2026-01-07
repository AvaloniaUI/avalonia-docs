import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';
import clsx from 'clsx';

const Image = ({
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
}) => {
  const { isDarkTheme } = useColorMode();
  const src = isDarkTheme ? dark || light : light || dark;

  let resolvedMargin = margin;
  if (typeof margin === 'number') {
    resolvedMargin = `${margin}px`;
  } else if (typeof margin === 'string' && margin.includes(',')) {
    resolvedMargin = margin.split(',').map(val => `${val.trim()}px`).join(' ');
  }

  const positionMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
  };

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
};

export default Image;
