import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['index'],
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
              'data-display/structured-data/treedatagrid',
              'data-display/structured-data/treeview',
          ],
        },
        {
          type: 'category',
          label: 'Text display',
          collapsed: true,
          items:[
              'data-display/text-display/label',
              'data-display/text-display/markdown',
              'data-display/text-display/selectabletextblock',
              'data-display/text-display/textblock',
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
              'input/text-input/virtualkeyboard',
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
              'layout/containers/refreshcontainer',
              'layout/containers/scrollviewer',
              'layout/containers/splitview',
              'layout/containers/viewbox',
              'layout/containers/virtualkeyboardscope',
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
        'media/mediaplayercontrol',
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
        'navigation/tabcontrol',
        'navigation/tabstrip',
        'navigation/trayicon',
      ],
    },
    {
      type: 'category',
      label: 'Primitives',
      collapsed: true,
      items:[
        'primitives/scrollbar',
        'primitives/usercontrol',
        'primitives/window',
      ],
    },
    {
      type: 'category',
      label: 'Web',
      collapsed: true,
      items:[
        'web/nativewebdialog',
        'web/nativewebview',
      ],
    }
  ],
};

export default sidebars;
