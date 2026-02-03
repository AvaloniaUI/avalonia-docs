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
      type: 'category',
      label: 'Styles',
      collapsed: false,
      items: [
        'styles/style-selectors',
        'styles/property-setters',
      ],
    },
  ],
};

export default sidebars;
