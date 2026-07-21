// see https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
// can be tested with this script https://gist.github.com/maxkatz6/760bc0615b1af2ead4bf1f0582fdcd10

// import { from10to11 } from './migrate-010-to-110'; // No longer in use as of Avalonia v12, but kept for reference and potential future use.
import { music_store_redirects } from './music-store-redirects';
import { get_started_redirects } from './get-started-redirects';
import { v12_docs_redirects } from './v12-docs-redirects';
import { restructure_redirects } from './restructure-redirects';

interface Redirect {
  from: string | string[];
  to: string;
}

interface RedirectConfig {
  redirects: Redirect[];
  createRedirects: (existingPath: string) => string[] | undefined;
}

const config: RedirectConfig = {
  redirects: [

    // Import redirects from other files
    ...music_store_redirects.redirects,
    ...get_started_redirects.redirects,
    ...v12_docs_redirects.redirects,
    ...restructure_redirects.redirects,

    // Redirect release notes to Releases page on GitHub
    { from: '/docs/stay-up-to-date/release-notes', to: 'https://github.com/AvaloniaUI/Avalonia/releases' },

    // richtexteditor-guides folder renamed to richtexteditor
    { from: '/controls/input/text-input/richtexteditor-guides/document-viewer', to: '/controls/input/text-input/richtexteditor/document-viewer' },
    { from: '/controls/input/text-input/richtexteditor-guides/extension-patterns', to: '/controls/input/text-input/richtexteditor/extension-patterns' },
    { from: '/controls/input/text-input/richtexteditor-guides/performance-tuning', to: '/controls/input/text-input/richtexteditor/performance-tuning' },
    { from: '/controls/input/text-input/richtexteditor-guides/thread-safety', to: '/controls/input/text-input/richtexteditor/thread-safety' },
    { from: ['/controls/input/text-input/richtexteditor-guides/toolbar', '/controls/input/text-input/richtexteditor-guides/toolbar-customization'], to: '/controls/input/text-input/richtexteditor/toolbar' },

    // Redirect retired pages from rewrite of Custom Controls docs in June 2026
    { from: '/docs/custom-controls/choosing-a-custom-control-type', to: '/docs/custom-controls/'},
    { from: ['/docs/custom-controls/custom-control-class', '/docs/custom-controls/drawing-custom-controls'], to: '/docs/custom-controls/custom-drawn-controls'},
    { from: '/docs/custom-controls/attached-properties', to: '/docs/custom-controls/defining-properties' },
  ],
  createRedirects(existingPath: string): string[] | undefined {
    const redirects = [
      ...(v12_docs_redirects.createRedirects(existingPath) || []),
      ...(restructure_redirects.createRedirects(existingPath) || []),
    ];
    console.log(existingPath, redirects);
    return redirects.length ? redirects : undefined;
  },
};

export default config;
