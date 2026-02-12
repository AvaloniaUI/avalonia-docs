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
        'core-concepts/main-window',
        'core-concepts/top-level',
        'core-concepts/ui-composition',
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
        {
          type: 'category',
          label: 'Data binding',
          collapsed: true,
          items: [
            'data-concepts/data-binding/introduction-to-data-binding',
            'data-concepts/data-binding/data-binding-syntax',
            'data-concepts/data-binding/compiled-bindings',
            'data-concepts/data-binding/data-context',
         ],
        },
        {
          type: 'category',
          label: 'Data templates',
          collapsed: true,
          items: [
            'data-concepts/data-templates/introduction-to-data-templates',
            'data-concepts/data-templates/control-content',
            'data-concepts/data-templates/content-templates',
            'data-concepts/data-templates/data-template-collection',
         ],
        },
        'data-concepts/markup-extensions',
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
        {
          type: 'category',
         label: 'Controls',
          collapsed: true,
          items: [
            'ui-concepts/controls/attached-properties',
            'ui-concepts/controls/control-trees',
         ],
        },
        'ui-concepts/file-dialogs',
        'ui-concepts/image-interpolation',
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
        {
          type: 'category',
         label: 'User input',
          collapsed: true,
          items: [
            'ui-concepts/user-input/pointer',
            'ui-concepts/user-input/focus',
            'ui-concepts/user-input/gestures',
            'ui-concepts/user-input/keyboard-and-hotkeys',
            'ui-concepts/user-input/routed-events',
         ],
        },
      ],
    },
  ],
};

export default sidebars;
