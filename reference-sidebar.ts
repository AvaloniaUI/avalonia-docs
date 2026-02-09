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
      label: 'Animations',
      collapsed: false,
      items: [
        'animations/animation-settings',
      ],
    },
    {
      type: 'category',
      label: 'Data',
      collapsed: false,
      items: [
        'data/built-in-data-binding-converters',
      ],
    },
    {
      type: 'category',
      label: 'Properties',
      collapsed: false,
      items: [
        'properties/positioning',
      ],
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
