import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.scss";

export default function Comments() {
  const { colorMode } = useColorMode();

  // Use giscus themes that better match our site
  // light_protanopia and dark_protanopia have cleaner styling
  const giscusTheme = colorMode === 'dark' ? 'dark_dimmed' : 'light';

  return (
    <div className={styles.commentsContainer}>
      <h3 className={styles.commentsHeader}>
        <svg
          className={styles.commentsIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Comments
      </h3>
      <div className={styles.giscusWrapper}>
        <Giscus
          id="comments"
          repo="AvaloniaUI/avalonia-docs"
          repoId="R_kgDOJarc8w"
          category="General"
          categoryId="DIC_kwDOJarc884CbUsp"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={giscusTheme}
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  );
}