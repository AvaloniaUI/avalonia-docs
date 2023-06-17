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
      ],
    },
  ],
  
};

module.exports = sidebars;
