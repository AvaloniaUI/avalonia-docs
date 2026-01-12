import React, { ReactNode } from 'react';

import './cards.css';

interface DocsCardsProps {
  className?: string;
  children?: ReactNode;
}

function DocsCards(props: DocsCardsProps): JSX.Element {
  return <docs-cards class={props.className}>{props.children}</docs-cards>;
}

export default DocsCards;
