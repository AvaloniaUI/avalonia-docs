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
