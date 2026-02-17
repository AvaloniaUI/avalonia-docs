import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    'getting-started',
    {
      'type': 'category',
      'label': 'XPF Guides',
      'items': [
        'guides/embedding-avalonia-in-xpf',
        'guides/using-xpf-in-avalonia',
        {
          type: 'link',
          label: 'Embedding web content',
          href: '/docs/app-development/embedding-web-content'
        },
        'guides/centralizing-multiple-xpf-projects',
        'guides/customizing-initialization',
        'guides/removing-the-titlebar',
        'guides/headless-testing',
        'guides/key-mapping',
        'guides/native-window-handles',
      ]
    },
    {
      'type': 'category',
      'label': 'Platforms',
      'items': [
        'platforms/linux',
        'platforms/macos',
      ]
    },
    'third-party-libraries',
    {
      'type': 'category',
      'label': 'Version info',
      'items': [
          'version-info/versioning',
          'version-info/release-notes',
          'version-info/missing-features',
      ]
    },
    {
      type: 'link',
      label: 'Troubleshooting',
      href: '/troubleshooting/xpf'
    },
  ],
};

export default sidebars;
