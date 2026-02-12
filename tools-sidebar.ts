import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    {
      type: 'link',
      label: 'Installation',
      href: '/docs/development-optimization/installing-accelerate',
    },
    'community-edition',
    {
      type: 'category',
      label: 'Accelerate controls',
      collapsed: true,
      items: [
        {
          type: 'link',
          label: 'Markdown',
          href: 'controls/data-display/text-display/markdown',
        },
        {
          type: 'link',
          label: 'MediaPlayerControl',
          href: 'controls/media/mediaplayercontrol',
        },
        {
          type: 'link',
          label: 'NativeWebDialog',
          href: 'controls/web/nativewebdialog',
        },
        {
          type: 'link',
          label: 'NativeWebView',
          href: 'controls/web/nativewebview',
        },
        {
          type: 'link',
          label: 'VirtualKeyboard',
          href: 'controls/input/text-input/virtualkeyboard',
        },
        {
          type: 'link',
          label: 'VirtualKeyboardScope',
          href: 'controls/layout/containers/virtualkeyboardscope',
        },
      ],
    },
    'faq',
  ],
};

export default sidebars;
