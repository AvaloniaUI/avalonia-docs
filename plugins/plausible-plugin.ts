/**
 * Custom Plausible plugin with proper null checking for HMR compatibility.
 * Replaces docusaurus-plugin-plausible to avoid "window.plausible is not a function" errors.
 */

import type { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';

interface PlausiblePluginOptions {
  domain: string;
}

export default function plausiblePlugin(
  context: LoadContext,
  options: PlausiblePluginOptions
): Plugin {
  const { domain } = options;

  if (!domain) {
    throw new Error('plausible-plugin requires a domain option');
  }

  return {
    name: 'plausible-plugin',

    getClientModules() {
      return [path.resolve(__dirname, './plausible-client.ts')];
    },

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              defer: true,
              'data-domain': domain,
              src: 'https://plausible.io/js/script.js',
            },
          },
        ],
      };
    },
  };
}
