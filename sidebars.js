// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  documentationSidebar: [
    'welcome',
    'overview/what-is-avalonia',
    'overview/supported-platforms',
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
          'type': 'category',
          'label': 'Test Drive',
          'link' : {
            'type' : 'doc',
            'id': 'get-started/test-drive/index'
          },
          'items': [
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
        'stay-up-to-date/breaking-changes',
        {
          'type': 'link',
          'label': 'Release notes',
          'href': 'https://github.com/AvaloniaUI/Avalonia/releases',
        },
      ],
    },
    {
      'type': 'category',
      'label': 'Samples & Tutorials',
      'link': {
        'type': 'doc',
        'id': 'tutorials/index',
      },
      'items': [
        'tutorials/samples',
        {
          'type': 'link',
          'label': 'ToDo List App',
          'href': 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CompleteApps/SimpleToDoList' ,
        },
        'tutorials/groupbox',
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
            'basics/user-interface/introduction-to-xaml',
            'basics/user-interface/code-behind',
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
                  'link': {
                    'type': 'doc',
                    'id': 'basics/user-interface/controls/creating-controls/index'
                  },
                  'items': [
                    'basics/user-interface/controls/creating-controls/choosing-a-custom-control-type',
                    'basics/user-interface/controls/creating-controls/defining-properties',
                    'basics/user-interface/controls/creating-controls/defining-events',
                    'basics/user-interface/controls/creating-controls/control-themes',
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
            {
              'type': 'category',
              'label': 'Styling',
              'link': {
                'type': 'doc',
                'id': 'basics/user-interface/styling/index',
              },
              'items': [
                'basics/user-interface/styling/styles',
                'basics/user-interface/styling/style-classes',
                'basics/user-interface/styling/control-themes',
                'basics/user-interface/styling/container-queries',
                {
                  'type': 'category',
                  'label': 'Themes',
                  'link': {
                    'type': 'doc',
                    'id': 'basics/user-interface/styling/themes/index',
                  },
                  'items': [
                    'basics/user-interface/styling/themes/fluent',
                    'basics/user-interface/styling/themes/simple',
                  ],
                },
                'basics/user-interface/styling/troubleshooting',
              ],
            },
            'basics/user-interface/adding-interactivity',
            'basics/user-interface/assets',
            'basics/user-interface/animations',
            'basics/user-interface/file-dialogs',
            'basics/user-interface/multi-touch',
            'basics/user-interface/messagebox',
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
            'basics/data/data-templates',
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
          'label': 'Building Cross Platform Applications',
          'link': {
            'type': 'doc',
            'id': 'guides/building-cross-platform-applications/index',
          },
          'items': [
            'guides/building-cross-platform-applications/architecture',
            'guides/building-cross-platform-applications/solution-setup',
            'guides/building-cross-platform-applications/dealing-with-platforms',

          ],
        },
        {
          'type': 'category',
          'label': 'Implementation Guides',
          'link': {
            'type': 'doc',
            'id': 'guides/implementation-guides/index',
          },
          'items': [
            'guides/implementation-guides/how-to-use-the-mvvm-pattern',
            'guides/implementation-guides/how-to-implement-dependency-injection',
            'guides/implementation-guides/developer-tools',
            'guides/implementation-guides/logging-errors-and-warnings',
            'guides/implementation-guides/ide-support',
            'guides/implementation-guides/how-to-use-design-time-data',
            'guides/implementation-guides/localizing',
          ],
        },
        {
          'type': 'category',
          'label': 'Data Binding',
          'items': [
            'guides/data-binding/inotifypropertychanged',
            'guides/data-binding/binding-classes',
            'guides/data-binding/binding-to-controls',
            'guides/data-binding/how-to-bind-to-a-collection',
            'guides/data-binding/binding-from-code',
            'guides/data-binding/how-to-create-a-custom-data-binding-converter',
            'guides/data-binding/how-to-bind-multiple-properties',
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
            'guides/styles-and-resources/selectors',
            'guides/styles-and-resources/property-setters',
            'guides/styles-and-resources/setter-precedence',
            'guides/styles-and-resources/how-to-use-included-styles',
            'guides/styles-and-resources/resources',
            'guides/styles-and-resources/how-to-use-theme-variants',
            'guides/styles-and-resources/how-to-use-fonts',
            'guides/styles-and-resources/troubleshooting',
          ],
        },
        {
          'type': 'category',
          'label': 'Graphics and Animation',
          'items': [
            'guides/graphics-and-animation/graphics-and-animations',
            'guides/graphics-and-animation/how-to-add-menu-icons',
            'guides/graphics-and-animation/how-to-use-icons',
            'guides/graphics-and-animation/keyframe-animations',
            'guides/graphics-and-animation/transitions',
            'guides/graphics-and-animation/gradients',
            {
              'type': 'category',
              'label': 'Page Transitions',
              'items': [
                'guides/graphics-and-animation/page-transitions/cross-fade-page-transition',
                'guides/graphics-and-animation/page-transitions/page-slide-transition',
                'guides/graphics-and-animation/page-transitions/page-transition-combinations',
                'guides/graphics-and-animation/page-transitions/how-to-create-a-custom-page-transition'
              ],
            },
          ],
        },
        {
          'type': 'category',
          'label': 'Custom Controls',
          'items': [
            'guides/custom-controls/types-of-control',
            'guides/custom-controls/create-a-custom-panel',
            'guides/custom-controls/defining-properties',
            'guides/custom-controls/draw-with-a-property',
            'guides/custom-controls/how-to-create-a-custom-controls-library',
            'guides/custom-controls/how-to-create-a-custom-flyout',
            'guides/custom-controls/how-to-create-advanced-custom-controls',
            'guides/custom-controls/how-to-create-attached-properties',
            'guides/custom-controls/how-to-create-templated-controls',
            'guides/custom-controls/index',
            'guides/custom-controls/add-custom-control-class',
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
            'guides/development-guides/improving-performance',

          ],
        },
        {
          'type': 'category',
          'label': 'Platforms',
          'items': [
            {
              'type': 'category',
              'label': 'Platform-Specific Code',
              'items': [
                'guides/platforms/platform-specific-code/dotnet',
                'guides/platforms/platform-specific-code/xaml',
              ],
            },
            {
              'type': 'category',
              'label': 'Android',
              'link': {
                'type': 'doc',
                'id': 'guides/platforms/android/index',
              },
              'items': [
                'guides/platforms/android/build-and-run-your-application-on-a-device',
                'guides/platforms/android/build-and-run-your-application-on-a-simulator',
                'guides/platforms/android/configure-vscode-debug-linux',
                'guides/platforms/android/setting-up-your-developer-environment-for-android',
                'guides/platforms/android/embed-native-views',
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
              'label': 'Windows',
              'items': [
                'guides/platforms/windows/host-avalonia-controls-in-winforms',
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
            'guides/platforms/how-to-use-web-assembly',
            'guides/platforms/macos-development',
          ],
        },
      ],
    },
    {
      'type': 'category',
      'label': 'Deep Dives',
      'link': {
        'type': 'doc',
        'id': 'concepts/index',
      },
      'items': [
        'concepts/application-lifetimes',
        'concepts/attached-property',
        'concepts/control-trees',
        'concepts/custom-itemspanel',
        {
          'type': 'category',
          'label': 'Data Templates',
          'link': {
            'type': 'doc',
            'id': 'concepts/templates/index',
          },
          'items': [
            'concepts/templates/data-templates',
            'concepts/templates/content-template',
            'concepts/templates/data-templates-collection',
            'concepts/templates/reusing-data-templates',
            'concepts/templates/creating-data-templates-in-code',
            'concepts/templates/implement-idatatemplate',
            // Keep old link for backward compatibility, but it belongs in this category
            'concepts/view-locator'
          ],
        },
        {
          'type': 'category',
          'label': 'Headless Platform',
          'link': {
            'type': 'doc',
            'id': 'concepts/headless/index',
          },
          'items': [
            'concepts/headless/headless-xunit',
            'concepts/headless/headless-nunit',
            'concepts/headless/headless-custom',
          ],
        },
        {
          'type': 'category',
          'label': 'Input',
          'link': {
            'type': 'doc',
            'id': 'concepts/input/index',
          },
          'items': [
            'concepts/input/routed-events',
            'concepts/input/pointer',
            'concepts/input/focus',
            'concepts/input/gestures',
            'concepts/input/hotkeys',
            'concepts/input/binding-key-and-mouse',
          ],
        },
        'concepts/the-main-window',
        {
          'type': 'category',
          'label': 'The MVVM Pattern',
          'link': {
            'type': 'doc',
            'id': 'concepts/the-mvvm-pattern/index',
          },
          'items': [
            'concepts/the-mvvm-pattern/avalonia-ui-and-mvvm',
          ],
        },
        'concepts/markupextensions',
        {
          'type': 'category',
          'label': 'ReactiveUI',
          'link': {
            'type': 'doc',
            'id': 'concepts/reactiveui/index',
          },
          'items': [
            'concepts/reactiveui/reactive-view-model',
            'concepts/reactiveui/command-update',
            'concepts/reactiveui/reactive-command',
            'concepts/reactiveui/view-activation',
            'concepts/reactiveui/routing',
            'concepts/reactiveui/data-persistence',
            'concepts/reactiveui/binding-to-sorted-filtered-list',
          ],
        },
        {
          'type': 'category',
          'label': 'Services',
          'link': {
            'type': 'doc',
            'id': 'concepts/services/index',
          },
          'items': [
            'concepts/services/activatable-lifetime',
            'concepts/services/clipboard',
            'concepts/services/launcher',
            'concepts/services/focus-manager',
            'concepts/services/input-pane',
            'concepts/services/insets-manager',
            'concepts/services/platform-settings',
            {
              'type': 'category',
              'label': 'Storage Provider',
              'link': {
                'type': 'doc',
                'id': 'concepts/services/storage-provider/index',
              },
              'items': [
                'concepts/services/storage-provider/storage-item',
                'concepts/services/storage-provider/bookmarks',
                'concepts/services/storage-provider/file-picker-options',
              ],
            },
              ],
        },
        'concepts/image-interpolation',
        'concepts/blend-modes',
        'concepts/templated-controls',
        'concepts/ui-composition',
        'concepts/unhandledexceptions',
        'concepts/toplevel'
      ],
    },
    {
      'type': 'category',
      'label': 'Deployment',
      'link': {
        'type': 'doc',
        'id': 'deployment/index',
      },
      'items': [
        'deployment/macOS',
        'deployment/debian-ubuntu',
        'deployment/native-aot',
      ],
    },
    {
      'type': 'category',
      'label': 'Reference',    
      link: {
        type: 'doc',
        id: 'reference/index'
      },
      'items': [
        {
          'type': 'autogenerated',
          dirName: 'reference'
        },
      ],
    },
    'faq',
    'community',
    {
      type: 'link',
      label: 'API Reference', // The link label
      href: 'https://api-docs.avaloniaui.net/docs/category/avalonia', // The external URL
    },
  ],
};

module.exports = sidebars;
