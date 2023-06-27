// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Avalonia UI',
  tagline: 'Developer Documentation Portal',
  favicon: 'img/favicon.ico',
  url: 'https://docs.avaloniaui.net',
  baseUrl: '/',
  organizationName: 'avaloniaui', // Usually your GitHub org/user name.
  projectName: 'avalonia', // Usually your repo name.
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/AvaloniaUI/Docs',
          //includeCurrentVersion: false,
          //lastVersion: '0.10.x',
          versions: {
            current: {
              label: "11.0.0",
              banner: "none"
            },
            "0.10.x": {
              banner: "none"
            }
          }
        },
        
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
    require.resolve("@cmfcmf/docusaurus-search-local")
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/avaloniaui-social-card.jpg',
      announcementBar: {
        id: 'support_us',
        content:
          '⭐️ If you like Avalonia, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/avaloniaui/avalonia">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/AvaloniaUI">Twitter</a>',
        backgroundColor: '#335EEA',
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
        title: 'Avalonia',
        logo: {
          alt: 'Avalonia Logo',
          src: 'img/purple-border-gradient-icon.png',
          srcDark: "img/white-border-gradient-icon.png"
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/avaloniaui/avalonia',
            position: 'right',
            className: 'navbar-social-link navbar-github-logo',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://twitter.com/AvaloniaUI',
            position: 'right',
            className: 'navbar-social-link navbar-twitter-logo',
            'aria-label': 'Twitter account',
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
                to: '/docs/next/get-started/test-drive/introduction',
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
                href: 'https://avaloniaui.net/Blog',
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
    }),
};

module.exports = config;
