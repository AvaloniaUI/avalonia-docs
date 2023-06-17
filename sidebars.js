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
  ],
  
};

module.exports = sidebars;
