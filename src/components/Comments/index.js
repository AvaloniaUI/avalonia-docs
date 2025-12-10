import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

export default function Comments() {
  const { colorMode } = useColorMode();
  
  return (
    <div>
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
        theme="dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}