import React from 'react';

export default function Highlight({children, color}) {
  return (
    <span
      style={{
        color: color,
        borderRadius: '2px',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}