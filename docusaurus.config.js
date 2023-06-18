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
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
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
          includeCurrentVersion: false,
          lastVersion: '0.10.x',
        },
        
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      announcementBar: {
        id: 'support_us',
        content:
          '⭐️ If you like Avalonia UI, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/avaloniaui/avalonia">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/AvaloniaUI">Twitter</a>',
        backgroundColor: '#4D72DA',
        textColor: '#ffffff',
        isCloseable: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true
        }
      },
      navbar: {
        title: 'Avalonia UI',
        logo: {
          alt: 'Avalonia UI Logo',
          src: 'img/purple-border-gradient-icon.png',
          srcDark: "img/white-border-gradient-icon.png"
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            type: 'search',
            position: 'left',
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
                to: '/docs/intro',
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
