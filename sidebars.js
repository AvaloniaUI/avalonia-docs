// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  documentationSidebar: [
    'welcome',
    {
      'type': 'category',
      'label': 'Get Started',
      'link': {
        'type': 'doc',
        'id': 'get-started/index',
      },
      'items': [
        'get-started/install',
        'get-started/set-up-an-editor',
        {
          type: 'category',
          label: 'Test Drive',
          items: [
            'get-started/test-drive/introduction',
            'get-started/test-drive/create-a-project',
            'get-started/test-drive/main-window',
            'get-started/test-drive/add-a-control',
            'get-started/test-drive/add-some-layout',
            'get-started/test-drive/input-controls',
            'get-started/test-drive/the-design-preview',
            'get-started/test-drive/respond-to-an-event',
            'get-started/test-drive/code-with-controls',
          ],
        },
        'get-started/learn-more',
      ],
    },
    {
      'type': 'category',
      'label': 'Stay Up-To-Date',
      'link': {
        'type': 'doc',
        'id': 'stay-up-to-date/index',
      },
      'items': [
        'stay-up-to-date/upgrade-from-0.10',
        'stay-up-to-date/whats-new',
        'stay-up-to-date/release-notes',
        'stay-up-to-date/breaking-changes',
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
        'tutorials/introduction',
        {
          'type': 'category',
          'label': 'ToDo List App',
          'link': {
            'type': 'doc',
            'id': 'tutorials/todo-list-app/index',
          },
          'items': [
            
          ],
        },
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
          'label': 'Implementation Guides',
          'items': [
            'guides/implementation-guides/code-behind',
            'guides/implementation-guides/how-to-use-the-mvvm-pattern',
            'guides/implementation-guides/how-to-implement-dependency-injection',
            'guides/implementation-guides/logging-errors-and-warnings',
            'guides/implementation-guides/ide-support',
            'guides/implementation-guides/how-to-use-design-time-data',
          ],
        },      
        {
          'type': 'category',
          'label': 'Data Binding',
          'items': [
            'guides/data-binding/binding-classes',
            'guides/data-binding/binding-to-controls',
            'guides/data-binding/how-to-bind-to-a-collection',
            'guides/data-binding/binding-from-code',
            'guides/data-binding/how-to-create-a-custom-data-binding-converter',
            'guides/data-binding/how-to-bind-tabs',
            'guides/data-binding/how-to-bind-image-files',
            'guides/data-binding/how-to-bind-can-execute',
            'guides/data-binding/how-to-bind-to-a-command-with-reactiveui',
            'guides/data-binding/how-to-bind-to-a-command-without-reactiveui',
            'guides/data-binding/how-to-bind-to-a-task-result',
            'guides/data-binding/how-to-bind-to-an-observable',
          ],
        },      
        {
          'type': 'category',
          'label': 'Styles and Resources',
          'items': [
            'guides/styles-and-resources/index',
            'guides/styles-and-resources/style-classes',
            'guides/styles-and-resources/selectors',
            'guides/styles-and-resources/property-setters',
            'guides/styles-and-resources/how-to-use-included-styles',
            'guides/styles-and-resources/how-to-use-themes',
            'guides/styles-and-resources/resources',
            'guides/styles-and-resources/troubleshooting',
          ],
        },      
      ],
    },
  ],
};

module.exports = sidebars;
