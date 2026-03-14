import { ReactNode, Children, isValidElement, ReactElement } from 'react';

export interface CodeBlock {
  language: string;
  code: string;
}

/**
 * Extract code blocks from MDX children.
 * In Docusaurus/MDX, code fences may become themed CodeBlock components or <pre><code>
 */
export function extractCodeBlocks(children: ReactNode): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  
  const processChild = (child: ReactNode) => {
    if (!isValidElement(child)) return;
    
    const childType = child.type as any;
    const typeName = typeof childType === 'function' ? childType.name || childType.displayName : childType;
    
    // Case 1: Raw <pre><code>
    if (typeName === 'pre' && child.props?.children) {
      const codeElement = child.props.children as ReactElement<{ className?: string; children?: ReactNode }>;
      if (isValidElement(codeElement)) {
        const codeType = codeElement.type as any;
        const codeTypeName = typeof codeType === 'function' ? codeType.name : codeType;
        if (codeTypeName === 'code') {
          const className = codeElement.props?.className || '';
          const match = className.match(/language-(\w+)/);
          const language = match ? match[1] : '';
          const code = extractText(codeElement.props?.children);
          if (code) {
            blocks.push({ language, code: code.trim() });
          }
          return;
        }
      }
    }
    
    // Case 2: Docusaurus CodeBlock component - look for props with code/language
    if (child.props?.children && typeof child.props.children === 'string') {
      const className = child.props?.className || child.props?.language || '';
      const match = className.match?.(/language-(\w+)/) || [null, child.props?.language];
      const language = match?.[1] || '';
      if (language) {
        blocks.push({ language, code: child.props.children.trim() });
        return;
      }
    }
    
    // Case 3: MDX code element with metastring
    if (child.props?.originalType === 'code' || child.props?.mdxType === 'code') {
      const className = child.props?.className || '';
      const match = className.match(/language-(\w+)/);
      const language = match ? match[1] : '';
      const code = extractText(child.props?.children);
      if (code) {
        blocks.push({ language, code: code.trim() });
      }
      return;
    }
    
    // Recurse into wrapper elements
    if (child.props?.children) {
      Children.forEach(child.props.children, processChild);
    }
  };
  
  Children.forEach(children, processChild);
  
  return blocks;
}

/**
 * Recursively extract text content from React children
 */
export function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (!children) return '';
  
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  
  if (isValidElement(children) && children.props?.children) {
    return extractText(children.props.children);
  }
  
  return '';
}
