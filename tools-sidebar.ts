import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    'installing-accelerate',
    'community-edition',
    {
      type: 'category',
      label: 'Dev Tools',
      collapsed: true,
      items: [
        'developer-tools/installation',
        'developer-tools/attaching-applications',
        'developer-tools/attaching-to-the-previewer',
        'developer-tools/attaching-to-the-remote-tool',
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
        'developer-tools/profiler-tool',
        'developer-tools/resources-tool',
      ],
    },
    {
      type: 'category',
      label: 'Parcel',
      collapsed: true,
      items: [
        'parcel/setup',
        'parcel/command-line-reference',
        'parcel/mcp',
        'parcel/packaging-for-macos',
        'parcel/packaging-for-windows',
        'parcel/packaging-for-linux',
      ],
    },
    'visual-studio-extension',
    {
      type: 'category',
      label: 'Visual Studio Code',
      collapsed: true,
      items: [
        'visual-studio-code/configure-vscode-debug-linux',
      ],
    },
    {
      type: 'category',
      label: 'Accelerate Controls',
      collapsed: true,
      items: [
        {
          type: 'link',
          label: 'Markdown',
          href: '/controls/data-display/text-display/markdown',
        },
        {
          type: 'link',
          label: 'MediaPlayerControl',
          href: '/controls/media/mediaplayercontrol',
        },
        {
          type: 'link',
          label: 'NativeWebDialog',
          href: '/controls/web/nativewebdialog',
        },
        {
          type: 'link',
          label: 'NativeWebView',
          href: '/controls/web/nativewebview',
        },
        {
          type: 'link',
          label: 'TreeDataGrid',
          href: '/controls/data-display/structured-data/treedatagrid',
        },
        {
          type: 'link',
          label: 'VirtualKeyboard',
          href: '/controls/input/text-input/virtualkeyboard',
        },
        {
          type: 'link',
          label: 'VirtualKeyboardScope',
          href: '/controls/layout/containers/virtualkeyboardscope',
        },
      ],
    },
    'legacy-developer-tools',
    'faq',
  ],
};

export default sidebars;
