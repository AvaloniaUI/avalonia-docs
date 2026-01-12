import React, {type ReactNode, type ComponentProps} from 'react';

// Note icon - Pencil/edit icon for notes
export default function AdmonitionIconNote(props: ComponentProps<'svg'>): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.862 3.487a2.75 2.75 0 0 1 3.889 0l.762.762a2.75 2.75 0 0 1 0 3.889L9.238 20.413a2.75 2.75 0 0 1-1.293.729l-4.473 1.193a.75.75 0 0 1-.92-.92l1.193-4.473a2.75 2.75 0 0 1 .729-1.293L16.862 3.487zm2.828 1.06a1.25 1.25 0 0 0-1.768 0L5.647 16.823a1.25 1.25 0 0 0-.331.588l-.829 3.108 3.108-.829a1.25 1.25 0 0 0 .588-.331L20.458 7.084a1.25 1.25 0 0 0 0-1.768l-.762-.762-.006-.006z"
      />
    </svg>
  );
}
