import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['index'],
    },
    {
      type: 'doc',
      label: 'Installation',
      id: 'installation'
    },
    {
      type: 'category',
      label: 'UI development',
      collapsed: false,
      items: [
        'ui-development/styles'
      ],
    },
  ],
};

export default sidebars;
