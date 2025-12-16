import React, { useState, useRef, useCallback, useEffect, ReactNode, useMemo } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useEditable } from 'use-editable';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import { extractCodeBlocks } from './utils';
import { registerPreview } from './manifest';
import styles from './XamlPreview.module.css';

const IFRAME_TIMEOUT_MS = 20000; // 20 seconds

// Track preview counts per doc for generating unique suffixes
const previewCounters = new Map<string, number>();
let currentDocId = ''; // Track current doc to reset counters on navigation

function getPreviewIndex(docId: string): number {
  // Reset counters when navigating to a different doc
  if (docId !== currentDocId) {
    previewCounters.clear();
    currentDocId = docId;
  }
  const count = (previewCounters.get(docId) || 0) + 1;
  previewCounters.set(docId, count);
  return count;
}

// Reset counters between SSR renders
if (typeof window === 'undefined') {
  // In Node.js/SSR, we need to reset for each build
  previewCounters.clear();
  currentDocId = '';
}

interface XamlPreviewProps {
  xaml?: string;
  csharp?: string;
  showCSharp?: boolean;
  previewId?: string;
  height?: number;
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
  previewId,
  height = 300,
  children,
}: XamlPreviewProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const isBrowser = useIsBrowser();
  const { colorMode } = useColorMode();
  const previewUrl = siteConfig.customFields?.avaloniaPreviewUrl as string;
  
  // Get doc context for auto-generating preview paths
  let docId = '';
  try {
    const doc = useDoc();
    docId = doc?.metadata?.id || '';
  } catch {
    // useDoc() throws if not in a doc context (e.g., on non-doc pages)
    docId = '';
  }

  // Generate stable preview index - computed once per component instance
  const previewIndexRef = useRef<number | null>(null);
  if (previewIndexRef.current === null && docId) {
    previewIndexRef.current = getPreviewIndex(docId);
  }

  // Generate stable preview path based on doc ID
  const fallbackImage = useMemo(() => {
    if (!docId || previewIndexRef.current === null) return null;
    
    const suffix = previewIndexRef.current > 1 ? `-${previewIndexRef.current}` : '';
    return `/preview/${docId}${suffix}.png`;
  }, [docId]);

  const fallbackAlt = `Preview of ${docId.split('/').pop() || 'XAML control'}`;
  
  if (!previewUrl) {
    throw new Error('Avalonia Preview URL is not configured in docusaurus.config.js');
  }

  // Extract code from children (code fences) or use props
  const codeBlocks = children ? extractCodeBlocks(children) : [];
  const xamlBlock = codeBlocks.find(b => b.language === 'xml' || b.language === 'xaml');
  const csharpBlock = codeBlocks.find(b => b.language === 'csharp' || b.language === 'cs');
  
  const initialXaml = propXaml || xamlBlock?.code || '';
  const initialCSharp = propCSharp || csharpBlock?.code;

  // Register preview in manifest during SSR for build-time screenshot generation
  useMemo(() => {
    if (fallbackImage && initialXaml) {
      registerPreview({
        docId,
        previewPath: fallbackImage,
        xaml: initialXaml,
        csharp: initialCSharp,
        height,
      });
    }
  }, [fallbackImage, docId, initialXaml, initialCSharp, height]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [xaml, setXaml] = useState(initialXaml);
  const [csharp, setCSharp] = useState(initialCSharp || '');

  const hasCSharp = showCSharp && initialCSharp;
  const showFallback = fallbackImage && (isLoading || timedOut);
  const showIframe = isBrowser && !timedOut;
  
  // Choose the correct fallback image based on color mode
  const fallbackSrc = useMemo(() => {
    if (!fallbackImage) return null;
    return colorMode === 'dark' 
      ? fallbackImage.replace('.png', '-dark.png')
      : fallbackImage;
  }, [fallbackImage, colorMode]);

  // Send code to the iframe
  const sendCodeToPreview = useCallback(() => {
    if (iframeRef.current?.contentWindow && isReady) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'update', xaml, csharp },
        previewUrl
      );
    }
  }, [xaml, csharp, isReady, previewUrl]);

  // Send dark mode setting to the iframe
  const sendDarkModeToPreview = useCallback(() => {
    if (iframeRef.current?.contentWindow && isReady) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'set-dark-mode', darkMode: colorMode === 'dark' },
        previewUrl
      );
    }
  }, [colorMode, isReady, previewUrl]);

  // Sync dark mode with iframe when color mode or ready state changes
  useEffect(() => {
    sendDarkModeToPreview();
  }, [sendDarkModeToPreview]);

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
          setIframeLoaded(true);
          break;
        case 'error':
          setError(message || 'An error occurred');
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [previewUrl, isBrowser]);

  // Timeout for iframe loading
  useEffect(() => {
    if (!isBrowser || iframeLoaded || !fallbackImage) return;

    const timer = setTimeout(() => {
      if (!iframeLoaded) {
        setTimedOut(true);
        setIsLoading(false);
      }
    }, IFRAME_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [isBrowser, iframeLoaded, fallbackImage]);

  // Send code when ready or when code changes
  useEffect(() => {
    sendCodeToPreview();
  }, [sendCodeToPreview]);

  return (
    <div className={styles.container} style={{ height }}>
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
          {/* Fallback image shown while loading or if timed out */}
          {showFallback && (
            <div className={`${styles.fallbackContainer} ${iframeLoaded ? styles.fadeOut : ''}`}>
              <img 
                src={fallbackSrc} 
                alt={fallbackAlt}
                className={styles.fallbackImage}
              />
              {isLoading && !timedOut && (
                <div className={styles.fallbackLoader}>
                  <div className={styles.spinnerSmall} />
                </div>
              )}
              {timedOut && (
                <div className={styles.fallbackBadge}>
                  Static preview (interactive unavailable)
                </div>
              )}
            </div>
          )}
          
          {/* Loading overlay when no fallback image */}
          {isLoading && !fallbackImage && (
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
          
          {showIframe && (
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className={`${styles.previewIframe} ${!iframeLoaded ? styles.iframeHidden : ''}`}
              title="Avalonia XAML Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    </div>
  );
}
