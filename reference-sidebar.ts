import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    {
      type: 'category',
      label: 'Animations and graphics',
      collapsed: true,
      items: [
        'animations-and-graphics/animation-settings',
        'animations-and-graphics/bitmap-blend-modes',
      ],
    },
    {
      type: 'category',
      label: 'Data',
      collapsed: true,
      items: [
        'data/built-in-data-binding-converters',
      ],
    },
    {
      type: 'category',
      label: 'Gestures',
      collapsed: true,
      items: [
        'gestures/pinch-gesture-recognizer',
        'gestures/pull-gesture-recognizer',
        'gestures/scroll-gesture-recognizer',
      ],
    },
    {
      type: 'category',
      label: 'Media player',
      collapsed: true,
      items: [
        'media-player/mediaplayer',
        'media-player/mediasource',
      ],
    },
    {
      type: 'category',
      label: 'Properties',
      collapsed: true,
      items: [
        'properties/codehighlighter',
        'properties/imageloader',
        'properties/positioning',
        'properties/texttrimming',
      ],
    },
    {
      type: 'category',
      label: 'Services',
      collapsed: true,
      items: [
        'services/activatable-lifetime',
        'services/clipboard',
        'services/focus-manager',
        'services/input-pane',
        'services/insets-manager',
        'services/launcher',
        'services/platform-settings',
        {
          type: 'category',
          label: 'Storage',
          collapsed: true,
          items: [
            'services/storage/storage-provider',
            'services/storage/storage-item',
            'services/storage/bookmarks',
            'services/storage/file-picker-options',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Styles',
      collapsed: true,
      items: [
        'styles/style-selectors',
        'styles/property-setters',
        'styles/pseudoclasses',
        'styles/style-selector-syntax',
        'styles/markdown-styling',
      ],
    },
    {
      type: 'category',
      label: 'WebView',
      collapsed: true,
      items: [
        'webview/webauthenticationbroker',
        'webview/webview-environment',
      ],
    },
  ],
};

export default sidebars;
