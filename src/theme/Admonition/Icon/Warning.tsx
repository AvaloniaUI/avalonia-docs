import React, {type ReactNode, type ComponentProps} from 'react';

// Warning icon - Triangle with exclamation (traditional warning style)
export default function AdmonitionIconWarning(props: ComponentProps<'svg'>): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.5c-.4 0-.77.21-.97.55L2.1 18.03c-.2.34-.2.76 0 1.1.2.34.57.55.97.55h17.86c.4 0 .77-.21.97-.55.2-.34.2-.76 0-1.1L12.97 3.05A1.12 1.12 0 0012 2.5zm0 1.73L20.13 18H3.87L12 4.23zM11 9v4.5c0 .55.45 1 1 1s1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1zm0 7.5c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"
      />
    </svg>
  );
}
