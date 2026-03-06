import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    'getting-started',
    'faq',
    {
      'type': 'category',
      'label': 'Migration',
      'items': [
        'migration/known-differences',
        'migration/clipboard',
        'migration/key-mapping',
        'migration/removing-the-titlebar',
      ]
    },
    {
      'type': 'category',
      'label': 'Third-Party Libraries',
      'items': [
        'third-party/win32-api-shims',
        'third-party/compatibility',
        'third-party/winapi-reference',
      ]
    },
    {
      'type': 'category',
      'label': 'Interop',
      'items': [
        'interop/embedding-avalonia-in-xpf',
        'interop/using-xpf-in-avalonia',
        'interop/native-window-handles',
        'interop/web-content',
      ]
    },
    {
      'type': 'category',
      'label': 'Configuration',
      'items': [
        'configuration/customizing-initialization',
        'configuration/centralizing-multiple-xpf-projects',
        'configuration/performance',
      ]
    },
    {
      'type': 'category',
      'label': 'Platforms',
      'items': [
        'platforms/windows',
        'platforms/macos',
        'platforms/linux',
        'platforms/mobile-and-browser',
      ]
    },
    {
      'type': 'category',
      'label': 'Testing',
      'items': [
        'testing/headless-testing',
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
