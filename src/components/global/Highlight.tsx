import React, { ReactNode } from 'react';

interface HighlightProps {
  children: ReactNode;
  color: string;
}

export default function Highlight({ children, color }: HighlightProps) {
  return (
    <span
        style={{
          backgroundColor: color,
          borderRadius: '5px',
          color: '#fff',
          padding: '0.4rem',
        }}>
        {children}
      </span>
  );
}
