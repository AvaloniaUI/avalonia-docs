// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  documentationSidebar: [
    'welcome',
    {
      'type': 'category',
      'label': 'Getting Started',
      'link': {
        'type': 'doc',
        'id': 'getting-started/index',
      },
      'items': [
        {
          'type': 'category',
          'label': 'IDE Support',
          'link': {
            'type': 'doc',
            'id': 'getting-started/ide-support',
          },
          'items': [
            'getting-started/jetbrains-rider-setup',
          ],
        },

        {
          'type': 'category',
          'label': 'Programming with Avalonia UI',
          'link': {
            'type': 'doc',
            'id': 'getting-started/programming-with-avalonia/index',
          },
          'items': [
            'getting-started/programming-with-avalonia/the-model-view-viewmodel-pattern-mvvm',
            'getting-started/programming-with-avalonia/controls-and-layouts',
            'getting-started/programming-with-avalonia/data-binding',
            'getting-started/programming-with-avalonia/graphics-and-animations',
          ],
        },
        'getting-started/windows',
        'getting-started/usercontrols',
        'getting-started/assets',
        'getting-started/developer-tools',
        'getting-started/logging-errors-and-warnings',
        'getting-started/unhandled-exceptions',
        'getting-started/application-lifetimes'
      ],
    },
    {
      'type': 'category',
      'label': 'Data Binding',
      'link': {
        'type': 'doc',
        'id': 'data-binding/index',
      },
      'items': [
        'data-binding/the-datacontext',
        'data-binding/change-notifications',
        'data-binding/bindings',
        'data-binding/compiled-bindings',
        'data-binding/binding-to-controls',
        'data-binding/converting-binding-values',
        'data-binding/binding-to-commands',
        'data-binding/binding-to-tasks-and-observables',
        'data-binding/binding-from-code',
        'data-binding/binding-in-a-control-template',
        'data-binding/binding-classes',
        'data-binding/creating-and-binding-attached-properties',
        'data-binding/data-validation'
      ],
    },
    {
      'type': 'category',
      'label': 'Styling',
      'link': {
        'type': 'doc',
        'id': 'styling/index',
      },
      'items': [
        'styling/styles',
        'styling/selectors',
        'styling/resources',
        'styling/troubleshooting',
      ],
    },
    {
      'type': 'category',
      'label': 'Controls',
      'link': {
        'type': 'doc',
        'id': 'controls/index',
      },
      'items': [
        'controls/autocompletebox',
        'controls/border',
        {
          'type': 'category',
          'label': 'Buttons',
          'link': {
            'type': 'doc',
            'id': 'controls/buttons/index',
          },
          'items': [
            'controls/buttons/button',
            'controls/buttons/radiobutton',
            'controls/buttons/togglebutton',
            'controls/buttons/buttonspinner',
            'controls/buttons/splitbutton',
            'controls/buttons/togglesplitbutton',
          ],
        },
        'controls/calendar',
        'controls/calendardatepicker',
        'controls/canvas',
        'controls/carousel',
        'controls/checkbox',
        'controls/combobox',
        'controls/contentcontrol',
        'controls/contextmenu',
        'controls/decorator',
        {
          'type': 'category',
          'label': 'DataGrid',
          'link': {
            'type': 'doc',
            'id': 'controls/datagrid/index',
          },
          'items': [
            'controls/datagrid/datagridcolumns',
          ],
        },
        'controls/datepicker',
        'controls/dockpanel',
        'controls/expander',
        'controls/flyouts',
        'controls/grid',
        'controls/gridsplitter',
        'controls/image',
        'controls/itemscontrol',
        'controls/itemsrepeater',
        'controls/layouttransformcontrol',
        'controls/listbox',
        'controls/maskedtextbox',
        'controls/menu',
        'controls/nativemenu',
        'controls/numericupdown',
        'controls/panel',
        'controls/progressbar',
        'controls/relativepanel',
        'controls/scrollbar',
        'controls/scrollviewer',
        'controls/separator',
        'controls/slider',
        'controls/splitview',
        'controls/stackpanel',
        'controls/tabcontrol',
        'controls/tabstrip',
        'controls/textblock',
        'controls/trayicon',
        {
          'type': 'category',
          'label': 'TreeDataGrid',
          'link': {
            'type': 'doc',
            'id': 'controls/treedatagrid/index',
          },
          'items': [
            'controls/treedatagrid/creating-a-hierarchical-treedatagrid',
            'controls/treedatagrid/creating-a-flat-treedatagrid',
            'controls/treedatagrid/treedatagrid-column-types',
          ],
        },
        'controls/timepicker',
        'controls/textbox',
        'controls/tooltip',
        'controls/treeview',
        'controls/transitioningcontentcontrol',
        'controls/usercontrol',
        'controls/viewbox',
        'controls/window',
        'controls/wrappanel',
      ],
    },
    {
      'type': 'category',
      'label': 'Templates',
      'link': {
        'type': 'doc',
        'id': 'templates/index',
      },
      'items': [
        'templates/data-templates',
        'templates/creating-data-templates-in-code',
        'templates/implement-idatatemplates',
      ],
    },
    {
      'type': 'category',
      'label': 'Authoring Controls',
      'link': {
        'type': 'doc',
        'id': 'authoring-controls/index',
      },
      'items': [
        'authoring-controls/types-of-control',
        'authoring-controls/defining-properties',
      ],
    },
    {
      'type': 'category',
      'label': 'Input',
      'link': {
        'type': 'doc',
        'id': 'input/index',
      },
      'items': [
        'input/routed-events',
        'input/clipboard',
        'input/pointer',
        'input/hotkeys',
      ],
    },
    {
      'type': 'category',
      'label': 'Animations',
      'link': {
        'type': 'doc',
        'id': 'animations/index',
      },
      'items': [
        'animations/keyframe-animations',
        'animations/transitions',
        'animations/page-transitions',
      ],
    },
    {
      'type': 'category',
      'label': 'Layout',
      'link': {
        'type': 'doc',
        'id': 'layout/index',
      },
      'items': [
        'layout/panels-overview',
        'layout/alignment-margins-and-padding',
        'layout/create-a-custom-panel',
      ],
    },
    {
      'type': 'category',
      'label': 'Distribution & Publishing',
      'link': {
        'type': 'doc',
        'id': 'distribution-publishing/index',
      },
      'items': [
        'distribution-publishing/macos',
      ],
    },
    {
      'type': 'category',
      'label': 'Guides',
      'link': {
        'type': 'doc',
        'id': 'guides/index',
      },
      'items': [
        {
          'type': 'category',
          'label': 'Basics',
          'link': {
            'type': 'doc',
            'id': 'guides/basics/index',
          },
          'items': [
            'guides/basics/introduction-to-xaml',
            'guides/basics/code-behind',
            'guides/basics/mvvm',
            'guides/basics/accessing-the-ui-thread'
          ],
        },
        {
          'type': 'category',
          'label': 'Deep Dives',
          'link': {
            'type': 'doc',
            'id': 'guides/deep-dives/index',
          },
          'items': [
            'guides/deep-dives/running-your-app-on-a-raspberry-pi',
            'guides/deep-dives/running-on-raspbian-lite-via-drm',
            {
              'type': 'category',
              'label': 'ReactiveUI',
              'link': {
                'type': 'doc',
                'id': 'guides/deep-dives/reactiveui/index',
              },
              'items': [
                'guides/deep-dives/reactiveui/view-activation',
                'guides/deep-dives/reactiveui/routing',
                'guides/deep-dives/reactiveui/data-persistence',
                'guides/deep-dives/reactiveui/binding-to-sorted-filtered-list',
              ],
            },
          ],
        },
        {
          'type': 'category',
          'label': 'Developer Guides',
          'link': {
            'type': 'doc',
            'id': 'guides/developer-guides/index',
          },
          'items': [
            'guides/developer-guides/build-avalonia-from-source',
            'guides/developer-guides/comparison-of-avalonia-with-wpf-and-uwp',
            'guides/developer-guides/debugging-previewer',
            'guides/developer-guides/debugging-xamlil',
            'guides/developer-guides/macos-development',
            'guides/developer-guides/release-process',
            'guides/developer-guides/maintaining-stable-branch-pr-merge-process',
            'guides/developer-guides/testing-with-ncrunch',
          ],
        },
      ],
    },
    {
      'type': 'category',
      'label': 'Tutorials',
      'link': {
        'type': 'doc',
        'id': 'tutorials/index',
      },
      'items': [
        {
          'type': 'category',
          'label': 'ToDo List App',
          'link': {
            'type': 'doc',
            'id': 'tutorials/todo-list-app/index',
          },
          'items': [
            'tutorials/todo-list-app/creating-a-new-project',
            'tutorials/todo-list-app/creating-a-view',
            'tutorials/todo-list-app/creating-a-model-and-viewmodel',
            'tutorials/todo-list-app/wiring-up-the-views',
            'tutorials/todo-list-app/locating-views',
            'tutorials/todo-list-app/adding-new-items',
          ],
        },
        {
          'type': 'category',
          'label': 'Music Store App',
          'link': {
            'type': 'doc',
            'id': 'tutorials/music-store-app/index',
          },
          'items': [
            'tutorials/music-store-app/setup-development-environment',
            'tutorials/music-store-app/creating-the-project',
            'tutorials/music-store-app/creating-a-modern-looking-window',
            'tutorials/music-store-app/add-and-layout-controls',
            'tutorials/music-store-app/opening-a-dialog',
            'tutorials/music-store-app/add-content-to-dialog',
            'tutorials/music-store-app/return-from-dialog',
            'tutorials/music-store-app/searching-for-albums',
            'tutorials/music-store-app/displaying-images',
            'tutorials/music-store-app/add-items-to-users-collection',
            'tutorials/music-store-app/add-data-persistence',
            'tutorials/music-store-app/load-data-at-startup',
            'tutorials/music-store-app/summary',
          ],
        },
      ],
    },
  ],
  
};

module.exports = sidebars;
