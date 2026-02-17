import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'fs';
import redirects from './redirects/index';
import tailwindPlugin from './plugins/tailwind-plugin';
import plausiblePlugin from './plugins/plausible-plugin';
import type { PluginOptions as LlmsTxtPluginOptions } from "@signalwire/docusaurus-plugin-llms-txt/public";

const resourcesHTML = fs.readFileSync('./src/snippets/resources.html', 'utf-8');

const config: Config = {
  title: 'Avalonia Docs',
  tagline: 'Developer Documentation Portal',
  url: 'https://docs.avaloniaui.net',
  baseUrl: '/',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  organizationName: 'avaloniaui',
  projectName: 'avalonia',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicons/apple-touch-icon.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicons/favicon-32x32.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicons/favicon-16x16.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/favicons/favicon.ico",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/favicons/site.webmanifest",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "mask-icon",
        color: "#ffffff",
        href: "/favicons/safari-pinned-tab.svg",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "theme-color",
        content: "#ffffff",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "msapplication-config",
        content: "/favicons/browserconfig.xml",
      },
    },
  ],
  scripts: [
    {
      src: 'https://white-hill-09a5c3303.3.azurestaticapps.net/AvaloniaPreviewElement.js',
      type: 'module',
      async: true,
    },
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
          editLocalizedFiles: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: "11.0.x",
              banner: "none"
            }
          }
        },

        theme: {
          customCss: [
            './node_modules/modern-normalize/modern-normalize.css',
            './node_modules/@ionic-internal/ionic-ds/dist/tokens/tokens.css',
            './src/styles/custom.scss',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    tailwindPlugin,
    function cioPlugin() {
      return {
        name: 'docusaurus-plugin-cio',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
                  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdp-eu.customer.io/v1/analytics-js/snippet/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._writeKey=key;analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.15.3";
                  analytics.load("4fe6898c1dcf35b4fb67");
                  analytics.page();
                  }}();

                  function getCookie(name) {
                      const value = \`; \${document.cookie}\`;
                      const parts = value.split(\`; \${name}=\`);
                      if (parts.length === 2) {
                          return parts.pop().split(';').shift();
                      }
                      return null;
                  }

                  // Wait for DOM content to be loaded
                  document.addEventListener('DOMContentLoaded', function() {
                      const userId = getCookie('user_id');
                      if (userId) {
                          analytics.identify(userId, {});
                      }
                  });
                `,
              }
            ],
          };
        },
      };
    },
    'docusaurus-plugin-image-zoom',
    [
      '@docusaurus/plugin-client-redirects',
      redirects as unknown as Record<string, unknown>,
    ],
    [
      "@gracefullight/docusaurus-plugin-microsoft-clarity",
      { projectId: "hqhy3ac3l1" },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'controls',
        path: 'controls',
        routeBasePath: 'controls',
        sidebarPath: './controls-sidebar.ts',
        editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
        editLocalizedFiles: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'samples',
        path: 'samples',
        routeBasePath: 'samples',
        sidebarPath: './samples-sidebar.ts',
        editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
        editLocalizedFiles: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'concepts',
        path: 'concepts',
        routeBasePath: 'concepts',
        sidebarPath: './concepts-sidebar.ts',
        editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
        editLocalizedFiles: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'xpf',
        path: 'xpf',
        routeBasePath: 'xpf',
        sidebarPath: './xpf-sidebar.ts',
        editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
        editLocalizedFiles: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reference',
        path: 'reference',
        routeBasePath: 'reference',
        sidebarPath: './reference-sidebar.ts',
        editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
        editLocalizedFiles: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tools',
        path: 'tools',
        routeBasePath: 'tools',
        sidebarPath: './tools-sidebar.ts',
        editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
        editLocalizedFiles: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'troubleshooting',
        path: 'troubleshooting',
        routeBasePath: 'troubleshooting',
        sidebarPath: './troubleshooting-sidebar.ts',
        editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
        editLocalizedFiles: true,
      },
    ],
    [
      plausiblePlugin,
      {
        domain: 'docs.avaloniaui.net',
      },
    ],
    [
      "@signalwire/docusaurus-plugin-llms-txt",
      {
        markdown: {
          enableFiles: true,
          includeDocs: true,
          includeBlog: false,
          includePages: false,
        },
        llmsTxt: {
          enableLlmsFullTxt: false,
          includeDocs: true,
          includeBlog: false,
          includePages: false,
          siteTitle: 'Avalonia Docs',
          siteDescription: 'Developer Documentation Portal for Avalonia UI',
        },
      } satisfies LlmsTxtPluginOptions,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(196, 196, 196)',
        dark: 'rgb(22, 28, 45)'
      },
      config: {
        margin: 50,
      }
    },
    navbar: {
      logo: {
        alt: 'Avalonia Logo',
        src: 'logo/docs-logo-light.svg',
        srcDark: "logo/docs-logo-dark.svg",
        height: 28,
        width: 139,
        href: '/',
        target: '_self',
      },
      items: [
        {
          label: 'Guides',
          to: '/docs/welcome',
          activeBasePath: '/docs'
        },
        {
          label: 'Controls',
          to: '/controls',
          activeBasePath: '/controls'
        },
        {
          label: 'Samples',
          to: '/samples',
          activeBasePath: '/samples'
        },
        {
          label: 'Concepts',
          to: '/concepts',
          activeBasePath: '/concepts'
        },
        {
          label: 'Tools',
          to: '/tools',
          activeBasePath: '/tools'
        },
        {
          label: 'More',
          items: [
            {label: 'Reference',
              to: '/reference',
              activeBasePath: '/reference'
            },
            {
              label: 'Troubleshooting',
              to: '/troubleshooting',
              activeBasePath: '/troubleshooting'
            },
            {
              label: 'Enhanced Support',
              to: 'https://avaloniaui.net/support?utm_source=docs&utm_medium=referral&utm_content=nav_link',
            },
            {
              href: 'https://github.com/AvaloniaUI/Avalonia/discussions',
              label: 'GitHub Discussions',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://avaloniaui.net/blog',
              label: 'Blog',
              target: '_blank',
              rel: null,
            },
          ],
          className: 'navbar__link--community',
        },
        {
          type: 'html',
          value: '<div class="separator" aria-hidden></div>',
        },
        {
          label: 'Avalonia XPF',
          to: '/xpf',
          activeBasePath: '/xpf'
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          type: 'html',
          position: 'right',
          value: '<div class="separator" aria-hidden></div>',
        },
        {
          href: "https://github.com/avaloniaui/",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          label: 'Log in',
          href: 'https://portal.avaloniaui.net',
          position: 'right',
          target: '_blank',
        },
      ],
    },
    footer: {
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['csharp', 'bash', 'shell-session', 'diff'],
    },
    algolia: {
      appId: 'V9UF6750GH',
      apiKey: '028e3dad834905a2a2c2a7ad9da9e666',
      indexName: 'avaloniaui_docs',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
