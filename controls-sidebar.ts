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
      label: 'Input',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Buttons',
          collapsed: true,
          items:[
              'input/buttons/button',
              'input/buttons/buttonspinner',
              'input/buttons/radiobutton',
              'input/buttons/repeatbutton',
              'input/buttons/splitbutton',
              'input/buttons/togglebutton',
              'input/buttons/togglesplitbutton',
          ],
        },
        {
          type: 'category',
          label: 'Text input',
          collapsed: true,
          items:[
              'input/text-input/autocompletebox',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Layout',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Containers',
          collapsed: true,
          items:[
              'layout/containers/border',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
