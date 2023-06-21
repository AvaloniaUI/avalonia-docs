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
        {
          'type': 'category',
          'label': 'Coming from WPF?',
          'link': {
            'type': 'doc',
            'id': 'get-started/wpf/index',
          },
          'items': [
            'get-started/wpf/styling',
            'get-started/wpf/datatemplates',
            'get-started/wpf/hierarchicaldatatemplate',
            'get-started/wpf/uielement-frameworkelement-and-control',
            'get-started/wpf/dependencyproperty',
            'get-started/wpf/grid',
            'get-started/wpf/tunnelling-events',
            'get-started/wpf/class-handlers',
            'get-started/wpf/propertychangedcallback',
            'get-started/wpf/rendertransforms-and-rendertransformorigin',
            'get-started/wpf/comparison-of-avalonia-with-wpf-and-uwp',
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
            'tutorials/todo-list-app/creating-a-new-project',
            'tutorials/todo-list-app/creating-a-view',
            'tutorials/todo-list-app/inspect-the-xaml',
            'tutorials/todo-list-app/main-window-content',
            'tutorials/todo-list-app/creating-a-model',
            'tutorials/todo-list-app/creating-a-view-model',
            'tutorials/todo-list-app/wiring-up-the-views',
            'tutorials/todo-list-app/add-a-data-context',
            'tutorials/todo-list-app/adding-new-items',
            'tutorials/todo-list-app/navigate-views',
            'tutorials/todo-list-app/locating-views',
            'tutorials/todo-list-app/add-item-buttons',
            'tutorials/todo-list-app/process-a-new-item',
            'tutorials/todo-list-app/conclusion',
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
            'tutorials/music-store-app/creating-the-project',
            'tutorials/music-store-app/creating-a-modern-looking-window',
            'tutorials/music-store-app/add-and-layout-controls',
            'tutorials/music-store-app/button-command',
            'tutorials/music-store-app/opening-a-dialog',
            'tutorials/music-store-app/add-content-to-dialog',
            'tutorials/music-store-app/mock-search',
            'tutorials/music-store-app/album-view',
            'tutorials/music-store-app/searching-for-albums',
            'tutorials/music-store-app/displaying-images',
            'tutorials/music-store-app/return-from-dialog',
            'tutorials/music-store-app/add-items-to-users-collection',
            'tutorials/music-store-app/add-data-persistence',
            'tutorials/music-store-app/load-data-at-startup',
            'tutorials/music-store-app/summary',
          ],
        },
      ],
    },
    {
      'type': 'category',
      'label': 'Basics',
      'link': {
        'type': 'doc',
        'id': 'basics/index',
      },
      'items': [
        {
          'type': 'category',
          'label': 'User Interface',
          'items': [
            {
              'type': 'category',
              'label': 'Controls',
              'link': {
                'type': 'doc',
                'id': 'basics/user-interface/controls/index',
              },
              'items': [
                'basics/user-interface/controls/builtin-controls',
                {
                  'type': 'category',
                  'label': 'Creating Controls',
                  'items': [
                    'basics/user-interface/controls/creating-controls/choosing-a-custom-contro-type',
                    'basics/user-interface/controls/creating-controls/defining-properties',
                    'basics/user-interface/controls/creating-controls/defining-events',
                    'basics/user-interface/controls/creating-controls/control-themes',
                    'basics/user-interface/controls/creating-controls/tutorial',
                  ],
                },
              ],
            },
            {
              'type': 'category',
              'label': 'Building Layouts',
              'link': {
                'type': 'doc',
                'id': 'basics/user-interface/building-layouts/index',
              },
              'items': [
                'basics/user-interface/building-layouts/alignment-margins-and-padding',
                'basics/user-interface/building-layouts/panels-overview',
              ],
            },
            'basics/user-interface/adding-interactivity',
            'basics/user-interface/assets',
            'basics/user-interface/animations',
            'basics/user-interface/file-dialogs',
          ],
        },
        {
          'type': 'category',
          'label': 'Data',
          'items': [
            {
              'type': 'category',
              'label': 'Data Binding',
              'link': {
                'type': 'doc',
                'id': 'basics/data/data-binding/index',
              },
              'items': [
                'basics/data/data-binding/data-context',
                'basics/data/data-binding/data-binding-syntax',
                'basics/data/data-binding/compiled-bindings',
              ],
            },
          ],
        },
      ],
    },
    {
      'type': 'category',
      'label': 'How-To Guides',
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
        {
          'type': 'category',
          'label': 'Graphics and Animation',
          'items': [
            'guides/graphics-and-animation/graphics-and-animations',
            'guides/graphics-and-animation/how-to-add-menu-icons',
            'guides/graphics-and-animation/how-to-create-a-custom-page-transition',
            'guides/graphics-and-animation/how-to-use-icons',
            'guides/graphics-and-animation/keyframe-animations',
            'guides/graphics-and-animation/transitions',
          ],
        },
        {
          'type': 'category',
          'label': 'Custom Controls',
          'items': [
            'guides/custom-controls/create-a-custom-panel',
            'guides/custom-controls/defining-properties',
            'guides/custom-controls/draw-with-a-property',
            'guides/custom-controls/how-to-create-a-custom-controls-library',
            'guides/custom-controls/how-to-create-a-custom-flyout',
            'guides/custom-controls/how-to-create-advanced-custom-controls',
            'guides/custom-controls/how-to-create-attached-properties',
            'guides/custom-controls/how-to-create-templated-controls',
            'guides/custom-controls/index',
            'guides/custom-controls/types-of-control',
          ],
        },
        {
          'type': 'category',
          'label': 'Development Guides',
          'items': [
            'guides/development-guides/accessing-the-ui-thread',
            'guides/development-guides/data-validation',
            'guides/development-guides/how-to-implement-multi-page-apps',
            'guides/development-guides/how-to-show-and-hide-a-split-view-pane-with-mvvm',
            'guides/development-guides/index',
          ],
        },
        {
          'type': 'category',
          'label': 'Platforms',
          'items': [
            {
              'type': 'category',
              'label': 'Android',
              'items': [
                'guides/platforms/android/build-and-run-your-application-on-a-device',
                'guides/platforms/android/build-and-run-your-application-on-a-simulator',
                'guides/platforms/android/configure-vscode-debug-linux',
                'guides/platforms/android/setting-up-your-developer-environment-for-android',
              ],
            },
            {
              'type': 'category',
              'label': 'iOS',
              'items': [
                'guides/platforms/ios/index',
                'guides/platforms/ios/setting-up-your-developer-environment-for-ios',
                'guides/platforms/ios/build-and-run-your-application-on-your-iphone-or-ipad',
                'guides/platforms/ios/build-and-run-your-application-on-a-simulator',
              ],
            },
            {
              'type': 'category',
              'label': 'Raspberry PI',
              'items': [
                'guides/platforms/rpi/running-your-app-on-a-raspberry-pi',
                'guides/platforms/rpi/running-on-raspbian-lite-via-drm',
              ],
            },
            'guides/platforms/create-a-cross-platform-solution',
            'guides/platforms/how-to-use-web-assembly',
            'guides/platforms/macos-development',
            'guides/platforms/macos-packaging',
          ],
        },
      ],
    },
    {
      'type': 'category',
      'label': 'Advanced Concepts',
      'items': [
        {
          'type': 'autogenerated',
          dirName: 'concepts'
        },
      ],
    },
    {
      'type': 'category',
      'label': 'Reference',
      'items': [
        {
          'type': 'autogenerated',
          dirName: 'reference'
        },
      ],
    },
  ],
};

module.exports = sidebars;
