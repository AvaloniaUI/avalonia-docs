/**
 * JSX Intrinsic Element declarations for custom web components used in the docs.
 */

import React from 'react';

// Base interface for custom elements that allows both 'class' and 'className'
interface CustomElementProps extends React.HTMLAttributes<HTMLElement> {
  class?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'docs-card': React.DetailedHTMLProps<CustomElementProps, HTMLElement>;
      'docs-cards': React.DetailedHTMLProps<CustomElementProps, HTMLElement>;
      'ion-icon': React.DetailedHTMLProps<CustomElementProps & {
        name?: string;
        size?: string;
        color?: string;
        src?: string;
        icon?: string;
      }, HTMLElement>;
    }
  }
}

export {};
