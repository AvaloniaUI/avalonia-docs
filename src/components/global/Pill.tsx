// Pill.tsx
import React from 'react';

type PillVariant = 'default' | 'primary' | 'success' | 'warning';
type PillSize = 'small' | 'medium' | 'large';

interface PillProps {
  children: React.ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

export default function Pill({ 
  children, 
  variant = 'default', 
  size = 'medium',
  className = '',
  href,
  target,
  rel = target === '_blank' ? 'noopener noreferrer' : undefined
}: PillProps): JSX.Element {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '999px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    border: '1px solid',
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',
  };

  const variants: Record<PillVariant, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--ifm-color-emphasis-200)',
      borderColor: 'var(--ifm-color-emphasis-300)',
      color: 'var(--ifm-color-content)',
    },
    primary: {
      backgroundColor: 'var(--ifm-color-primary-lighter)',
      borderColor: 'var(--ifm-color-primary-light)',
      color: 'var(--ifm-color-primary-darkest)',
    },
    success: {
      backgroundColor: '#d1f4e0',
      borderColor: '#9ee4bd',
      color: '#0d5028',
    },
    warning: {
      backgroundColor: '#fff4db',
      borderColor: '#ffe299',
      color: '#7d4e00',
    },
  };

  const sizes: Record<PillSize, React.CSSProperties> = {
    small: { padding: '0.125rem 0.5rem', fontSize: '0.75rem' },
    medium: { padding: '0.25rem 0.75rem', fontSize: '0.875rem' },
    large: { padding: '0.375rem 1rem', fontSize: '1rem' },
  };

  const styles: React.CSSProperties = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...(href && { cursor: 'pointer' }),
  };

  const hoverStyles = `
    .pill-link:hover {
      opacity: 0.8;
    }
  `;

  if (href) {
    return (
      <>
        <style>{hoverStyles}</style>
        <a 
          href={href} 
          style={styles} 
          className={`pill-link ${className}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      </>
    );
  }

  return (
    <span style={styles} className={className}>
      {children}
    </span>
  );
}