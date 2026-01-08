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
      label: 'Inputs',
      collapsed: false,
      items: ['autocompletebox', 'textbox'],
    },
  ],
};

export default sidebars;
