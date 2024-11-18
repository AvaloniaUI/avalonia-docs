// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.vsDark;

const fs = require('fs');
const resourcesHTML = fs.readFileSync('./src/snippets/resources.html', 'utf-8');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Avalonia Docs',
  tagline: 'Developer Documentation Portal',
  url: 'https://docs.avaloniaui.net',
  baseUrl: '/',
  organizationName: 'avaloniaui', // Usually your GitHub org/user name.
  projectName: 'avalonia', // Usually your repo name.
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'zh-Hans'],
  },
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
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
          editLocalizedFiles: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: "11.0.x",
              banner: "none"
            },
            "0.10.x": {
              banner: "none"
            }
          }
        },
        
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
          ],
      
        },
      }),
    ],
  ],
  plugins: [
    require('./plugins/tailwind-plugin.cjs'),
    require.resolve('docusaurus-plugin-image-zoom'),
    [
      '@docusaurus/plugin-client-redirects',
      require("./redirects"),
    ],
    [
      "@gracefullight/docusaurus-plugin-microsoft-clarity",
      { projectId: "hqhy3ac3l1" },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'xpf',
        path: 'xpf',
        routeBasePath: 'xpf',
        sidebarPath: require.resolve('./xpf-sidebar.js'),
        // Maintain consistency with main docs features
        editUrl: 'https://github.com/AvaloniaUI/avalonia-docs/tree/main',
        editLocalizedFiles: true,
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.png',
      announcementBar: {
        id: 'support_us',
        content:
          'Get the help you need with our <a target="_blank" rel="noopener noreferrer" href="https://avaloniaui.net/support?utm_source=docs&utm_medium=referral&utm_content=header_link">Enhanced Support!</a>',
        backgroundColor: '#0d6efd',
        textColor: '#ffffff',
        isCloseable: false,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true
        }
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(196, 196, 196)',
          dark: 'rgb(22, 28, 45)'
        },
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          margin: 50,
        }
      },
      navbar: {
        title: 'Avalonia UI',
        logo: {
          alt: 'Avalonia Logo',
          src: 'img/purple-border-gradient-icon.png',
          srcDark: "img/white-border-gradient-icon.png"
        },
        items: [
          {
            label: 'Avalonia Docs',
            to: '/docs/welcome'
          },
          {
            label: 'XPF Docs',
            to: '/xpf/welcome',
          },
          {
              label: 'Resources',
              type: 'dropdown',
              className: 'avalonia-dropdown resources-dropdown',
              items: [
                {
                  type: 'html',
                  value: resourcesHTML,
                  className: 'avalonia-dropdown',
                },
              ],
          },
          {
            label: 'Support',
            to: 'https://avaloniaui.net/support?utm_source=docs&utm_medium=referral&utm_content=nav_link',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/get-started/test-drive/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/avaloniaui',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/Avalonia',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/avaloniaui',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://avaloniaui.net/blog?utm_source=docs&utm_medium=referral&utm_content=nav_link',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/avaloniaui/avalonia',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AvaloniaUI OÜ (14839404)`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp'],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'V9UF6750GH',
        // Public API key: it is safe to commit it
        apiKey: '028e3dad834905a2a2c2a7ad9da9e666',
        indexName: 'avaloniaui_docs',
      },
    }),
};

module.exports = config;

