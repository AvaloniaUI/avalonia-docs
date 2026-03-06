import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    'getting-started',
    'faq',
    {
      'type': 'category',
      'label': 'Guides',
      'items': [
        'guides/known-differences',
        'guides/embedding-avalonia-in-xpf',
        'guides/using-xpf-in-avalonia',
        'third-party-libraries',
        'guides/clipboard',
        'guides/customizing-initialization',
        'guides/native-window-handles',
        'guides/removing-the-titlebar',
        'guides/key-mapping',
        'guides/centralizing-multiple-xpf-projects',
        'guides/performance',
        {
          type: 'link',
          label: 'Embedding web content',
          href: '/docs/app-development/embedding-web-content'
        },
      ]
    },
    {
      'type': 'category',
      'label': 'Platforms',
      'items': [
        'platforms/windows',
        'platforms/macos',
        'platforms/linux',
      ]
    },
    {
      'type': 'category',
      'label': 'Testing',
      'items': [
        'guides/headless-testing',
      ]
    },
    {
      'type': 'category',
      'label': 'Deployment',
      'items': [
        'deployment/windows',
        'deployment/macos',
        'deployment/linux',
      ]
    },
    'troubleshooting',
    {
      'type': 'category',
      'label': 'Version Info',
      'items': [
          'version-info/versioning',
          'version-info/release-notes',
          'version-info/missing-features',
      ]
    },
  ],
};

export default sidebars;
