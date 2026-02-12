import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    'index',
    {
      type: 'link',
      label: 'Installation',
      href: '/docs/development-optimization/accelerate-tools/installing-accelerate',
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
      ],
    },
    'faq',
  ],
};

export default sidebars;
