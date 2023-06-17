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
  ],
  
};

module.exports = sidebars;
