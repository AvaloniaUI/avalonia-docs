/**
 * Custom Plausible plugin with proper null checking for HMR compatibility.
 * Replaces docusaurus-plugin-plausible to avoid "window.plausible is not a function" errors.
 */

const path = require('path');

module.exports = function plausiblePlugin(context, options) {
  const { domain } = options;

  if (!domain) {
    throw new Error('plausible-plugin requires a domain option');
  }

  return {
    name: 'plausible-plugin',

    getClientModules() {
      return [path.resolve(__dirname, './plausible-client.js')];
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
};
