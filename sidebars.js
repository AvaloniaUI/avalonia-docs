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
        'get-started/introduction',
        'get-started/install-the-avalonia-extension',
        'get-started/choose-a-solution-template',
        'get-started/the-main-window',
        'get-started/add-a-control',
        'get-started/add-some-layout',
        'get-started/input-controls',
        'get-started/the-design-preview',
        'get-started/respond-to-an-event',
        'get-started/code-with-controls',
        'get-started/getting-started',
        'get-started/conclusion',
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
  ],
  
};

module.exports = sidebars;
