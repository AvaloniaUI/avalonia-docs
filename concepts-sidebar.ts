import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    {
      type: 'doc',
      label: 'Home',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Core concepts',
      collapsed: false,
      items: [
        'core-concepts/avalonia-xaml',
        'core-concepts/code-behind',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture/cross-platform-architecture',
        'architecture/the-mvvm-pattern',
      ],
    },
    {
      type: 'category',
      label: 'UI concepts',
      collapsed: false,
      items: [
        'ui-concepts/layout',
        {
          type: 'category',
         label: 'Styling',
          collapsed: true,
          items: [
            'ui-concepts/styling/styles',
            'ui-concepts/styling/style-classes',
            'ui-concepts/styling/control-themes',
            'ui-concepts/styling/container-queries',
            'ui-concepts/styling/themes',
         ],
        },
      ],
    },
  ],
};

export default sidebars;
