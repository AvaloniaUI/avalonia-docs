import React, { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useEditable } from 'use-editable';
import { useColorMode } from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import { extractCodeBlocks } from './utils';
import styles from './XamlPreview.module.css';

const IFRAME_TIMEOUT_MS = 20000; // 20 seconds

interface XamlPreviewProps {
  xaml?: string;
  csharp?: string;
  showCSharp?: boolean;
  fallbackImage?: string;
  fallbackAlt?: string;
  children?: ReactNode;
}

interface EditableCodeBlockProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
}

// Wait for the avalonia-preview custom element to be defined
let customElementPromise: Promise<void> | null = null;

function waitForAvaloniaElement(): Promise<void> {
  // Check if already defined
  if (customElements.get('avalonia-preview')) {
    return Promise.resolve();
  }

  if (customElementPromise) {
    return customElementPromise;
  }

  // Wait for the custom element to be defined (script loaded via docusaurus.config.js)
  customElementPromise = customElements.whenDefined('avalonia-preview').then(() => {});
  
  return customElementPromise;
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
  const isBrowser = useIsBrowser();
  const { colorMode } = useColorMode();

  // Extract code from children (code fences) or use props
  const codeBlocks = children ? extractCodeBlocks(children) : [];
  const xamlBlock = codeBlocks.find(b => b.language === 'xml' || b.language === 'xaml');
  const csharpBlock = codeBlocks.find(b => b.language === 'csharp' || b.language === 'cs');
  
  const initialXaml = propXaml || xamlBlock?.code || '';
  const initialCSharp = propCSharp || csharpBlock?.code;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const [xaml, setXaml] = useState(initialXaml);
  const [csharp, setCSharp] = useState(initialCSharp || '');
  const previewElementRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasCSharp = showCSharp && initialCSharp;

  // Load script and create the custom element
  useEffect(() => {
    if (!isBrowser) return;

    let mounted = true;

    const initializePreview = async () => {
      try {
        // Wait for the Avalonia custom element to be defined (loaded via script tag)
        await waitForAvaloniaElement();
        
        if (!mounted || !containerRef.current) return;

        // Create the custom element if it doesn't exist
        if (!previewElementRef.current) {
          const element = document.createElement('avalonia-preview');
          element.style.width = '100%';
          element.style.height = '100%';
          element.style.display = 'block';
          
          // Set up event listeners
          element.addEventListener('viewcreated', () => {
            if (mounted) {
              setError(null);
              setIsLoading(false);
              setIsReady(true);
            }
          });

          element.addEventListener('compiled', () => {
            if (mounted) {
              setError(null);
            }
          });

          element.addEventListener('error', (e: CustomEvent) => {
            if (mounted) {
              const errorMessage = e.detail?.error?.message || String(e.detail?.error) || 'An error occurred';
              setError(errorMessage);
            }
          });

          containerRef.current.appendChild(element);
          previewElementRef.current = element;
        }

        // Set initial attributes
        const element = previewElementRef.current;
        if (element) {
          element.setAttribute('xaml', xaml);
          if (csharp) {
            element.setAttribute('csharp', csharp);
          }
          element.setAttribute('dark-mode', colorMode === 'dark' ? 'true' : 'false');
        }
      } catch (err) {
        console.error('Failed to load Avalonia preview:', err);
        if (mounted) {
          setError(`Failed to load preview: ${err instanceof Error ? err.message : String(err)}`);
          setIsLoading(false);
        }
      }
    };

    initializePreview();

    return () => {
      mounted = false;
      // Clean up the element on unmount
      if (previewElementRef.current && containerRef.current) {
        containerRef.current.removeChild(previewElementRef.current);
        previewElementRef.current = null;
      }
    };
  }, [isBrowser]); // Only run once on mount

  // Update XAML when it changes
  useEffect(() => {
    if (previewElementRef.current && isReady) {
      previewElementRef.current.setAttribute('xaml', xaml);
    }
  }, [xaml, isReady]);

  // Update C# when it changes
  useEffect(() => {
    if (previewElementRef.current && isReady) {
      if (csharp) {
        previewElementRef.current.setAttribute('csharp', csharp);
      } else {
        previewElementRef.current.removeAttribute('csharp');
      }
    }
  }, [csharp, isReady]);

  // Update dark mode when it changes
  useEffect(() => {
    if (previewElementRef.current && isReady) {
      previewElementRef.current.setAttribute('dark-mode', colorMode === 'dark' ? 'true' : 'false');
    }
  }, [colorMode, isReady]);

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
          
          {isBrowser && (
            <div 
              ref={containerRef} 
              className={styles.previewContainer}
            />
          )}
        </div>
      </div>
    </div>
  );
}
