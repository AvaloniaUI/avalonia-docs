import React, { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useEditable } from 'use-editable';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import { extractCodeBlocks } from './utils';
import styles from './XamlPreview.module.css';

interface XamlPreviewProps {
  xaml?: string;
  csharp?: string;
  showCSharp?: boolean;
  children?: ReactNode;
}

interface PreviewMessage {
  type: 'viewcreated' | 'error' | 'ready' | 'compiled';
  message?: string;
}

interface EditableCodeBlockProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
}

function EditableCodeBlock({ code, language, onChange }: EditableCodeBlockProps) {
  const { colorMode } = useColorMode();
  const editorRef = useRef<HTMLPreElement>(null);
  const theme = colorMode === 'dark' ? themes.vsDark : themes.vsLight;

  const onEditableChange = useCallback((newCode: string) => {
    onChange(newCode.slice(0, -1));
  }, [onChange]);

  useEditable(editorRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ className, style, tokens, getTokenProps }) => (
        <pre
          ref={editorRef}
          className={`${className} ${styles.codeBlock}`}
          style={style}
          spellCheck={false}
        >
          {tokens.map((line, i) => (
            <React.Fragment key={i}>
              {line
                .filter((token) => !token.empty)
                .map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              {"\n"}
            </React.Fragment>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default function XamlPreview({
  xaml: propXaml,
  csharp: propCSharp,
  showCSharp = true,
  children,
}: XamlPreviewProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const isBrowser = useIsBrowser();
  const previewUrl = siteConfig.customFields?.avaloniaPreviewUrl as string;
  
  if (!previewUrl) {
    throw new Error('Avalonia Preview URL is not configured in docusaurus.config.js');
  }

  // Extract code from children (code fences) or use props
  const codeBlocks = children ? extractCodeBlocks(children) : [];
  const xamlBlock = codeBlocks.find(b => b.language === 'xml' || b.language === 'xaml');
  const csharpBlock = codeBlocks.find(b => b.language === 'csharp' || b.language === 'cs');
  
  const initialXaml = propXaml || xamlBlock?.code || '';
  const initialCSharp = propCSharp || csharpBlock?.code;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [xaml, setXaml] = useState(initialXaml);
  const [csharp, setCSharp] = useState(initialCSharp || '');

  const hasCSharp = showCSharp && initialCSharp;

  // Send code to the iframe
  const sendCodeToPreview = useCallback(() => {
    if (iframeRef.current?.contentWindow && isReady) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'update', xaml, csharp },
        previewUrl
      );
    }
  }, [xaml, csharp, isReady, previewUrl]);

  // Handle messages from the iframe
  useEffect(() => {
    if (!isBrowser) return;

    const handleMessage = (event: MessageEvent<PreviewMessage>) => {
      if (!event.origin.startsWith(previewUrl.replace(/\/$/, ''))) return;

      const { type, message } = event.data || {};

      switch (type) {
        case 'ready':
          setIsReady(true);
          break;
        case 'compiled':
          setError(null);
          break;
        case 'viewcreated':
          setError(null);
          setIsLoading(false);
          break;
        case 'error':
          setError(message || 'An error occurred');
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [previewUrl, isBrowser]);

  // Send code when ready or when code changes
  useEffect(() => {
    sendCodeToPreview();
  }, [sendCodeToPreview]);

  return (
    <div className={styles.container}>
      <div className={styles.codePane}>
        <Tabs className={styles.codeTabs}>
          <TabItem value="xaml" label="XAML" default>
            <div className={styles.codeContent}>
              <EditableCodeBlock
                code={xaml}
                language="xml"
                onChange={setXaml}
              />
            </div>
          </TabItem>
          {hasCSharp && (
            <TabItem value="csharp" label="C#">
              <div className={styles.codeContent}>
                <EditableCodeBlock
                  code={csharp}
                  language="csharp"
                  onChange={setCSharp}
                />
              </div>
            </TabItem>
          )}
        </Tabs>
      </div>
      <div className={styles.previewPane}>
        <div className={styles.previewHeader}>Preview</div>
        <div className={styles.previewContent}>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner} />
              <span>Loading Avalonia Preview...</span>
            </div>
          )}
          {error && (
            <div className={styles.errorOverlay}>
              <Admonition type="danger" title="Error">
                {error}
              </Admonition>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={previewUrl}
            className={styles.previewIframe}
            title="Avalonia XAML Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
