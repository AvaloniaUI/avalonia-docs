import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    'installation',
    'app-performance-issues',
    {
      type: 'category',
      label: 'Controls',
      collapsed: true,
      items: [
        'controls/groupbox',
        'controls/mediaplayer',
        'controls/messagebox'
      ],
    },
    {
      type: 'category',
      label: 'Platform-specific issues',
      collapsed: true,
      items: [
        'platform-specific-issues/macos',
        'platform-specific-issues/windows'
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      collapsed: true,
      items: [
        'tools/developer-tools'
      ],
    },
    {
      type: 'category',
      label: 'UI development',
      collapsed: true,
      items: [
        'ui-development/styles',
        'ui-development/themes'
      ],
    },
    'xpf',
  ],
};

export default sidebars;
