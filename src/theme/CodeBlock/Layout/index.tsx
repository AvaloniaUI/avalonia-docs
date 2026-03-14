import React from 'react';
import clsx from 'clsx';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import Buttons from '@theme/CodeBlock/Buttons';
import styles from './styles.module.css';

export default function CodeBlockLayout({className}: {className?: string}) {
  const {metadata} = useCodeBlockContext();
  const hasTitle = Boolean(metadata.title);

  return (
    <Container as="div" className={clsx(className, metadata.className)}>
      {hasTitle && (
        <div className={styles.codeBlockTitle}>
          <Title>{metadata.title}</Title>
          <Buttons className={styles.titleButtons} />
        </div>
      )}
      <div className={styles.codeBlockContent}>
        <Content />
        {!hasTitle && <Buttons />}
      </div>
    </Container>
  );
}
