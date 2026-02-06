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
          ],
        },
        'data-display/contentcontrol',
        {
          type: 'category',
          label: 'Structured data',
          collapsed: true,
          items:[
              'data-display/structured-data/datagrid',
          ],
        },
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
          ],
        },
        {
          type: 'category',
          label: 'Text input',
          collapsed: true,
          items:[
              'input/text-input/autocompletebox',
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
          ],
        },
        'layout/decorator',
        {
          type: 'category',
          label: 'Panels',
          collapsed: true,
          items:[
              'layout/panels/canvas',
              'layout/panels/dockpanel',
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
      ],
    },
    {
      type: 'category',
      label: 'Menus',
      collapsed: true,
      items:[
        'menus/contextmenu',
      ],
    }
  ],
};

export default sidebars;
