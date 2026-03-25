import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    {
      type: 'doc',
      label: 'Home',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Data display',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Collections',
          collapsed: true,
          items:[
              'data-display/collections/carousel',
              'data-display/collections/itemscontrol',
              'data-display/collections/itemsrepeater',
              'data-display/collections/listbox',
          ],
        },
        'data-display/contentcontrol',
        {
          type: 'category',
          label: 'Structured data',
          collapsed: true,
          items:[
              'data-display/structured-data/datagrid',
              {
                type: 'category',
                label: 'TreeDataGrid',
                link: {
                  type: 'doc',
                  id: 'data-display/structured-data/treedatagrid/index'
                },
                items: [
                  'data-display/structured-data/treedatagrid/column-types',
                  'data-display/structured-data/treedatagrid/selection-modes',
                  'data-display/structured-data/treedatagrid/expand-and-collapse',
                  'data-display/structured-data/treedatagrid/sorting',
                  'data-display/structured-data/treedatagrid/filtering',
                ],
              },
              'data-display/structured-data/treeview',
          ],
        },
        {
          type: 'category',
          label: 'Text display',
          collapsed: true,
          items:[
              'data-display/text-display/label',
              {
                type: 'category',
                label: 'Markdown',
                link: {
                  type: 'doc',
                  id: 'data-display/text-display/markdown',
                },
                items: [
                  'data-display/text-display/markdown-styling',
                  'data-display/text-display/codehighlighter',
                  'data-display/text-display/imageloader',
                ],
              },
              'data-display/text-display/selectabletextblock',
              {
                type: 'category',
                label: 'TextBlock',
                link: {
                  type: 'doc',
                  id: 'data-display/text-display/textblock',
                },
                items: [
                  'data-display/text-display/texttrimming',
                ],
              },
          ],
        },
        'data-display/transitioningcontentcontrol',
      ],
    },
    {
      type: 'category',
      label: 'Feedback',
      collapsed: true,
      items:[
        'feedback/notification',
        'feedback/popup',
        'feedback/progressbar',
        'feedback/tooltip',
      ],
    },
    {
      type: 'category',
      label: 'Input',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Buttons',
          collapsed: true,
          items:[
              'input/buttons/button',
              'input/buttons/buttonspinner',
              'input/buttons/hyperlinkbutton',
              'input/buttons/radiobutton',
              'input/buttons/repeatbutton',
              'input/buttons/splitbutton',
              'input/buttons/togglebutton',
              'input/buttons/togglesplitbutton',
          ],
        },
        {
          type: 'category',
          label: 'Date and time',
          collapsed: true,
          items:[
            'input/date-and-time/calendar',
            'input/date-and-time/calendardatepicker',
            'input/date-and-time/datepicker',
            'input/date-and-time/timepicker',
          ],
        },
        {
          type: 'category',
          label: 'Selectors',
          collapsed: true,
          items:[
              'input/selectors/checkbox',
              'input/selectors/colorpicker',
              'input/selectors/colorview',
              'input/selectors/combobox',
              'input/selectors/numericupdown',
              'input/selectors/slider',
              'input/selectors/toggleswitch',
          ],
        },
        {
          type: 'category',
          label: 'Text input',
          collapsed: true,
          items:[
              'input/text-input/autocompletebox',
              'input/text-input/maskedtextbox',
              'input/text-input/textbox',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Layout',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Containers',
          collapsed: true,
          items:[
              'layout/containers/border',
              'layout/containers/expander',
              'layout/containers/flyout',
              'layout/containers/groupbox',
              'layout/containers/refreshcontainer',
              'layout/containers/scrollviewer',
              'layout/containers/splitview',
              'layout/containers/viewbox',
              {
                type: 'category',
                label: 'VirtualKeyboardScope',
                link: {
                  type: 'doc',
                  id: 'layout/containers/virtualkeyboardscope',
                },
                items: [
                  'input/text-input/virtualkeyboard',
                ],
              },
          ],
        },
        'layout/decorator',
        'layout/layouttransformcontrol',
        {
          type: 'category',
          label: 'Panels',
          collapsed: true,
          items:[
              'layout/panels/canvas',
              'layout/panels/dockpanel',
              'layout/panels/grid',
              'layout/panels/gridsplitter',
              'layout/panels/panel',
              'layout/panels/relativepanel',
              'layout/panels/stackpanel',
              'layout/panels/uniformgrid',
              'layout/panels/wrappanel',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Media',
      collapsed: true,
      items:[
        'media/drawingimage',
        'media/image',
        {
          type: 'category',
          label: 'MediaPlayerControl',
          link: {
            type: 'doc',
            id: 'media/mediaplayercontrol',
          },
          items: [
            'media/mediaplayer',
            'media/mediasource',
            'media/media-playback',
          ],
        },
        'media/pathicon',
      ],
    },
    {
      type: 'category',
      label: 'Menus',
      collapsed: true,
      items:[
        'menus/contextmenu',
        'menus/menu',
        'menus/menuflyout',
        'menus/nativemenu',
        'menus/separator',
      ],
    },
    {
      type: 'category',
      label: 'Navigation',
      collapsed: true,
      items:[
        'navigation/commandbar',
        'navigation/contentpage',
        'navigation/drawerpage',
        'navigation/navigationpage',
        'navigation/tabbedpage',
        'navigation/tabcontrol',
        'navigation/tabstrip',
      ],
    },
    {
      type: 'category',
      label: 'Primitives',
      collapsed: true,
      items:[
        'primitives/scrollbar',
        'primitives/themevariantscope',
        'primitives/usercontrol',
      ],
    },
    {
      type: 'category',
      label: 'System',
      collapsed: true,
      items:[
        'navigation/trayicon',
        'primitives/window',
        'primitives/windowdrawndecorations',
      ],
    },
    {
      type: 'category',
      label: 'Web',
      collapsed: true,
      items:[
        'web/nativewebdialog',
        {
          type: 'category',
          label: 'NativeWebView',
          link: {
            type: 'doc',
            id: 'web/nativewebview',
          },
          items: [
            'web/webview-environment',
            'web/webauthenticationbroker',
          ],
        },
      ],
    }
  ],
};

export default sidebars;
