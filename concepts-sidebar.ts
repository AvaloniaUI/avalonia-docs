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
      collapsed: true,
      items: [
        'core-concepts/avalonia-xaml',
        'core-concepts/code-behind',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: true,
      items: [
        'architecture/cross-platform-architecture',
        'architecture/the-mvvm-pattern',
      ],
    },
    {
      type: 'category',
      label: 'Data concepts',
      collapsed: true,
      items: [
        'data-concepts/data-binding',
        'data-concepts/data-binding-syntax',
        'data-concepts/compiled-bindings',
        'data-concepts/data-context',
        'data-concepts/data-templates',
      ],
    },
    {
      type: 'category',
      label: 'Platform concepts',
      collapsed: true,
      items: [
        'platform-concepts/application-lifetimes',
      ],
    },
    {
      type: 'category',
      label: 'UI concepts',
      collapsed: true,
      items: [
        'ui-concepts/animations',
        'ui-concepts/assets',
        'ui-concepts/file-dialogs',
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
