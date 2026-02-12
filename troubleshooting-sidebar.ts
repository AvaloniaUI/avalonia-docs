import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['index'],
    },
    'installation',
    'app-performance-issues',
    {
      type: 'category',
      label: 'Controls',
      collapsed: false,
      items: [
        'controls/groupbox',
        'controls/mediaplayer',
        'controls/messagebox'
      ],
    },
    {
      type: 'category',
      label: 'Platform-specific issues',
      collapsed: false,
      items: [
        'platform-specific-issues/macos'
      ],
    },
    {
      type: 'category',
      label: 'UI development',
      collapsed: false,
      items: [
        'ui-development/styles',
        'ui-development/themes'
      ],
    },
  ],
};

export default sidebars;
