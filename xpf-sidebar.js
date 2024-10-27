// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  documentationSidebar: [
    'getting-started',
    'porting-tips',
    'build-feeds',
    'third-party-libraries',
    'missing-features',
    {
      'type': 'category',
      'label': 'Platforms',
      'items': [
        'platforms/linux',
        'platforms/macos'
      ]
    },
    {
      'type': 'category',
      'label': 'Embedding',
      'items': [
       {
         'type': 'category',
         'label': 'Avalonia in XPF',
         'items': [
             'embedding/avalonia-in-xpf/embedding-avalonia-controls-in-XPF',
             'embedding/avalonia-in-xpf/adding-style-to-avalonia-control-in-xpf',
             'embedding/avalonia-in-xpf/adding-global-style-for-avalonia-controls-in-XPF'
         ]
       },
        'embedding/xpf-in-avalonia',
        'embedding/web-view'
      ]
    },
    {
      'type': 'category',
      'label': 'Advanced',
      'items': [
          'advanced/avalonia-interop',
          'advanced/centralized-management',
          'advanced/customizing-init',
          'advanced/customizing-window-decorations',
          'advanced/headless-testing',
          'advanced/key-mapping',
          'advanced/window-handles',
          'advanced/running-on-mobile-and-browser'
      ]
    },
    'troubleshooting',
    'release-notes'
  ],
};

module.exports = sidebars;
