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
    border: 'none',
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',
    letterSpacing: '0.01em',
  };

  const variants: Record<PillVariant, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--ifm-color-emphasis-200)',
      color: 'var(--ifm-color-content)',
    },
    primary: {
      backgroundColor: '#85b6ff',
      color: '#1b3a5c',
    },
    success: {
      backgroundColor: '#d1f4e0',
      color: '#0d5028',
    },
    warning: {
      backgroundColor: '#fff4db',
      color: '#7d4e00',
    },
  };

  const sizes: Record<PillSize, React.CSSProperties> = {
    small: { padding: '0.2rem 0.625rem', fontSize: '0.75rem' },
    medium: { padding: '0.3rem 0.875rem', fontSize: '0.875rem' },
    large: { padding: '0.4rem 1.125rem', fontSize: '1rem' },
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