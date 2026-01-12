import { Dropdown, DropdownItem } from '@site/src/components/ui/dropdown';
import TOCItems from '@theme/TOCItems';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';

import type { Props } from '@theme/TOC';

import styles from './styles.module.css';
import { anthropic, openai, t3 } from '../TOCItems/icons';

// SVG Icons
const MarkdownIcon = () => (
  <svg className="fill-current" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5.5C3 4.11929 4.11929 3 5.5 3H18.5C19.8807 3 21 4.11929 21 5.5V18.5C21 19.8807 19.8807 21 18.5 21H5.5C4.11929 21 3 19.8807 3 18.5V5.5ZM5.5 4.5C4.94772 4.5 4.5 4.94772 4.5 5.5V18.5C4.5 19.0523 4.94772 19.5 5.5 19.5H18.5C19.0523 19.5 19.5 19.0523 19.5 18.5V5.5C19.5 4.94772 19.0523 4.5 18.5 4.5H5.5ZM6.75 8.25V15.75H8.25V11.5L10 13.75L11.75 11.5V15.75H13.25V8.25H11.75L10 10.75L8.25 8.25H6.75ZM17.25 12V8.25H15.75V12H14.25L16.5 15L18.75 12H17.25Z" fill="currentColor"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="fill-current" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.017C9.521 20.782 9.512 20.082 9.508 19.212C6.726 19.812 6.139 17.846 6.139 17.846C5.685 16.681 5.029 16.378 5.029 16.378C4.121 15.756 5.098 15.769 5.098 15.769C6.101 15.84 6.629 16.796 6.629 16.796C7.521 18.314 8.97 17.876 9.539 17.623C9.631 16.969 9.889 16.531 10.175 16.419C7.954 16.305 5.62 15.418 5.62 11.618C5.62 10.518 6.009 9.618 6.649 8.918C6.545 8.658 6.203 7.631 6.747 6.249C6.747 6.249 7.587 5.972 9.497 7.272C10.313 7.042 11.157 6.927 12 6.923C12.843 6.927 13.687 7.042 14.503 7.272C16.413 5.972 17.253 6.249 17.253 6.249C17.797 7.631 17.455 8.658 17.351 8.918C17.991 9.618 18.38 10.518 18.38 11.618C18.38 15.428 16.043 16.303 13.815 16.413C14.172 16.583 14.495 16.918 14.495 17.446C14.495 18.222 14.483 18.846 14.483 19.017C14.483 19.28 14.662 19.586 15.171 19.487C19.138 18.163 22 14.416 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="fill-current ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`duration-200 ease-in-out stroke-current ${isOpen ? "rotate-180" : ""}`}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.79199 7.396L10.0003 12.6043L15.2087 7.396"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

const getMarkdown = async (link: string) => {
  const response = await fetch(link);
  const mdx = await response.text();
  navigator.clipboard.writeText(mdx);
  return mdx;
}

export default function TOC({ className, ...props }: Props): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Open in");

  // Get doc metadata and current URL
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();

  // Build the full page URL
  const pageUrl = `${siteConfig.url}${location.pathname}`;
  const encodedPageUrl = encodeURIComponent(pageUrl);

  const editUrl = metadata?.editUrl;
  const markdown = editUrl?.replace("github", "raw.githubusercontent").replace("/blob", "").replace("/tree", "");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const getMDX = () => {
    if (!markdown) return;
    getMarkdown(markdown);
    setButtonText("Copied!");
    setTimeout(() => {
      setButtonText("Open in");
    }, 1200);
    closeDropdown();
  };

  const externalProps = {
    target: '_blank' as const,
    rel: 'noopener noreferrer'
  };

  return (
    <div className={styles.tableOfContentsWrapper}>
      {/* Header with title and dropdown */}
      <div className="flex items-center justify-between mb-4 max-[1359px]:flex-col max-[1359px]:items-start max-[1359px]:gap-3">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90 m-0 max-[1359px]:mr-0 mr-4">On this page</h3>
        <div className="relative inline-block max-[1359px]:w-full">
          <button
            onClick={toggleDropdown}
            className={`dropdown-toggle ${styles.tocDropdownButton}`}
          >
          {buttonText}
          <ChevronDownIcon isOpen={isOpen} />
        </button>

        <Dropdown
          className="right-0 top-full min-w-[260px]"
          isOpen={isOpen}
          onClose={closeDropdown}
        >
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            <li>
              <DropdownItem tag="div" onClick={getMDX}>
                <MarkdownIcon />
                Copy as Markdown
              </DropdownItem>
            </li>
            {/* Divider */}
            <li>
              <span className="my-1.5 block h-px w-full bg-gray-200 dark:bg-[#353C49]"></span>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href={`https://claude.ai/new?q=Read%20${encodedPageUrl}%20so%20I%20can%20ask%20questions%20about%20it.`}
                onClick={closeDropdown}
                {...externalProps}
              >
                <span className="flex items-center justify-center w-5 h-5">{anthropic}</span>
                Open in Claude
                <ExternalLinkIcon />
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href={`https://chatgpt.com/?q=Read%20${encodedPageUrl}%20so%20I%20can%20ask%20questions%20about%20it.`}
                onClick={closeDropdown}
                {...externalProps}
              >
                <span className="flex items-center justify-center w-5 h-5">{openai}</span>
                Open in ChatGPT
                <ExternalLinkIcon />
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href={`https://t3.chat/new?q=Read%20${encodedPageUrl}%20so%20I%20can%20ask%20questions%20about%20it.`}
                onClick={closeDropdown}
                {...externalProps}
              >
                <span className="flex items-center justify-center w-5 h-5">{t3}</span>
                Open in T3.chat
                <ExternalLinkIcon />
              </DropdownItem>
            </li>
            {/* Divider + Edit on GitHub */}
            {editUrl && (
              <>
                <li>
                  <span className="my-1.5 block h-px w-full bg-gray-200 dark:bg-[#353C49]"></span>
                </li>
                <li>
                  <DropdownItem
                    tag="a"
                    href={editUrl}
                    onClick={closeDropdown}
                    {...externalProps}
                  >
                    <GitHubIcon />
                    Edit on GitHub
                    <ExternalLinkIcon />
                  </DropdownItem>
                </li>
              </>
            )}
          </ul>
        </Dropdown>
        </div>
      </div>

      <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
        <TOCItems
          {...props}
          linkClassName={LINK_CLASS_NAME}
          linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
        />
      </div>
    </div>
  );
}
