/**
 * Swizzled CopyButton component to match Customer Portal styling
 * Shows "Copy" text that changes to "Copied!" when clicked
 */
import React, { useCallback, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import copy from 'copy-text-to-clipboard';
import { translate } from '@docusaurus/Translate';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import styles from './styles.module.scss';

function useCopyButton() {
  const {
    metadata: { code },
  } = useCodeBlockContext();
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | undefined>(undefined);

  const copyCode = useCallback(() => {
    copy(code);
    setIsCopied(true);
    copyTimeout.current = window.setTimeout(() => {
      setIsCopied(false);
    }, 1500); // Show "Copied!" for 1.5 seconds
  }, [code]);

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);
  return { copyCode, isCopied };
}

// Copy icon matching Customer Portal design
function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.85442 4.12576C5.85442 3.83581 6.08947 3.60076 6.37942 3.60076H13.8739C14.1638 3.60076 14.3989 3.83581 14.3989 4.12576L14.3989 11.6217C14.3989 11.9117 14.1638 12.1467 13.8739 12.1467H6.37942C6.08947 12.1467 5.85442 11.9117 5.85442 11.6217V4.12576ZM6.37942 2.40076C5.42673 2.40076 4.65442 3.17307 4.65442 4.12576V4.65991H4.12649C3.1738 4.65991 2.40149 5.43222 2.40149 6.38491V13.8747C2.40149 14.8273 3.1738 15.5997 4.12649 15.5997H11.6162C12.5689 15.5997 13.3412 14.8273 13.3412 13.8747V13.3467H13.8739C14.8266 13.3467 15.5989 12.5744 15.5989 11.6217L15.5989 4.12575C15.5989 3.17306 14.8266 2.40076 13.8739 2.40076H6.37942ZM12.1412 13.3467H6.37942C5.42673 13.3467 4.65442 12.5744 4.65442 11.6217V5.85991H4.12649C3.83654 5.85991 3.60149 6.09496 3.60149 6.38491V13.8747C3.60149 14.1646 3.83654 14.3997 4.12649 14.3997H11.6162C11.9062 14.3997 12.1412 14.1646 12.1412 13.8747L12.1412 13.3467Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CopyButton({ className }: { className?: string }) {
  const { copyCode, isCopied } = useCopyButton();

  const label = isCopied
    ? translate({
        id: 'theme.CodeBlock.copied',
        message: 'Copied!',
        description: 'The copied button label on code blocks',
      })
    : translate({
        id: 'theme.CodeBlock.copy',
        message: 'Copy',
        description: 'The copy button label on code blocks',
      });

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={clsx(styles.copyButton, className, isCopied && styles.copied)}
      onClick={copyCode}
    >
      <CopyIcon />
      <span className={styles.copyText}>{label}</span>
    </button>
  );
}
