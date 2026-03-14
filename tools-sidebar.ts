import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    {
      type: 'category',
      label: 'IDE',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'ide/index',
      },
      items: [
        'visual-studio-extension',
        {
          type: 'category',
          label: 'Visual Studio Code',
          collapsed: true,
          items: [
            'visual-studio-code/configure-vscode-debug-linux',
          ],
        },
      ],
    },
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
        {
          type: 'category',
          label: 'Tool reference',
          collapsed: true,
          items: [
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
      ],
    },
    {
      type: 'category',
      label: 'Parcel',
      collapsed: true,
      items: [
        'parcel/setup',
        'parcel/command-line-reference',
        'parcel/packaging-for-macos',
        'parcel/packaging-for-windows',
        'parcel/packaging-for-linux',
      ],
    },
    {
      type: 'category',
      label: 'AI Tools',
      collapsed: true,
      items: [
        'ai-tools/index',
        'ai-tools/build-mcp',
        'developer-tools/mcp',
        'parcel/mcp',
      ],
    },
    'installing-accelerate',
    'community-edition',
    'faq',
  ],
};

export default sidebars;
