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
      label: 'Dev Tools',
      collapsed: true,
      items: [
        {
          type: 'link',
          label: 'Install Dev Tools',
          href: '/docs/development-optimization/developer-tools/installation',
        },
        'developer-tools/settings',
        'developer-tools/shortcuts',
        'developer-tools/options',
        'developer-tools/mcp',
        'developer-tools/assets-tool',
        'developer-tools/breakpoints-tool',
        'developer-tools/elements-tool',
        'developer-tools/events-tool',
        'developer-tools/logs-tool',
        'developer-tools/metrics-tool',
        'developer-tools/resources-tool',
      ],
    },
    {
      type: 'category',
      label: 'Parcel',
      collapsed: true,
      items: [
        {
          type: 'link',
          label: 'Install Parcel',
          href: '/docs/deployment/parcel/setup',
        },
        'parcel/command-line-reference',
        'parcel/mcp',
        {
          type: 'link',
          label: 'Packaging for macOS',
          href: '/docs/deployment/parcel/packaging-for-macos',
        },
        {
          type: 'link',
          label: 'Packaging for Windows',
          href: '/docs/deployment/parcel/packaging-for-windows',
        },
        {
          type: 'link',
          label: 'Packaging for Linux',
          href: '/docs/deployment/parcel/packaging-for-linux',
        },
      ],
    },
    'visual-studio-extension',
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
          label: 'TreeDataGrid',
          href: 'controls/data-display/structured-data/treedatagrid',
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
