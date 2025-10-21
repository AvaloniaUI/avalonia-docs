// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  documentationSidebar: [
    'welcome', 
    'installation',
    {
      'type': 'category',
      'label': 'Dev Tools',
      'items': [
        'tools/dev-tools/getting-started',        
        'tools/dev-tools/settings',
        {
          'type': 'category',
          'label': 'Tools',
          'items': [
            {
              'type': 'category',
              'label': 'Elements',
              'items': [
                'tools/dev-tools/tools/elements/elements',
                'tools/dev-tools/tools/elements/properties',
                'tools/dev-tools/tools/elements/overlay',
                'tools/dev-tools/tools/elements/3d-viewer',
              ]
            },  
            'tools/dev-tools/tools/assets',
            'tools/dev-tools/tools/resources',
            'tools/dev-tools/tools/logs',
            'tools/dev-tools/tools/events',
            'tools/dev-tools/tools/breakpoints',
            'tools/dev-tools/tools/metrics',
          ]
        }, 
        {
          'type': 'category',
          'label': 'Advanced Tools',
          'items': [
            'tools/dev-tools/advanced/options-reference', 
            'tools/dev-tools/advanced/attaching-browser-or-mobile',      
            'tools/dev-tools/advanced/attaching-to-the-previewer', 
            'tools/dev-tools/advanced/attaching-to-the-remote-tool', 
            'tools/dev-tools/advanced/attaching-wsl',        
          ]
        }, 
        'tools/dev-tools/faq',
        'tools/dev-tools/reporting-issues',
      ]
    },
    {
      'type': 'category',
      'label': 'Parcel',
      'items': [
        'tools/parcel/getting-started',
        'tools/parcel/cli-reference',
        'tools/parcel/mcp',
        {
          'type': 'category',
          'label': 'macOS',
          'link' : {
            'type' : 'doc',
            'id': 'tools/parcel/apple/index'
          },
          'items': [
            'tools/parcel/apple/packaging',
            'tools/parcel/apple/signing',
            'tools/parcel/apple/notary'
          ]
        }, 
        {
          'type': 'category',
          'label': 'Windows',
          'link' : {
            'type' : 'doc',
            'id': 'tools/parcel/windows/index'
          },
          'items': [
            'tools/parcel/windows/signing',
            'tools/parcel/windows/installer'
          ]
        },
        {
          'type': 'category',
          'label': 'Linux',
          'link' : {
            'type' : 'doc',
            'id': 'tools/parcel/linux/index'
          },
          'items': [
            'tools/parcel/linux/packaging'
          ]
        },
      ]
    },
    {
      'type': 'category',
      'label': 'VS Extension',
      'items': [
        'tools/vs-extension/getting-started',
        'tools/vs-extension/settings',
        'tools/vs-extension/previewer',
      ]
    },    
    {
      'type': 'category',
      'label': 'Media Player',
      'items': [
        'components/media-player/quickstart',
        'components/media-player/mediaplayer',
        'components/media-player/mediaplayercontrol',
        'components/media-player/mediasource',
      ]
    },    
    {
      'type': 'category',
      'label': 'TreeDataGrid',
      'items': [
        'components/treedatagrid/quickstart',
        'components/treedatagrid/quickstart-flat',
        'components/treedatagrid/quickstart-hierarchical',
        'components/treedatagrid/column-types',
        'components/treedatagrid/selection',
        'components/treedatagrid/expanding-collapsing',
        'components/treedatagrid/sorting',
        'components/treedatagrid/faq',
      ]
    },    
    {
      'type': 'category',
      'label': 'Web View',
      'items': [
        'components/webview/quickstart',
        'components/webview/nativewebview',
        'components/webview/nativewebdialog',
        'components/webview/webauthenticationbroker',
        'components/webview/faq',
        {
          'type': 'category',
          'label': 'Interop',
          'items': [
            'components/webview/interop/environment-options',
            'components/webview/interop/native-browser-interop',
          ]
        }, 
      ]
    },    
    {
      'type': 'category',
      'label': 'Virtual Keyboard',
      'items': [
        'components/virtual-keyboard/getting-started',
        'components/virtual-keyboard/virtual-keyboard-scope',
        'components/virtual-keyboard/virtual-keyboard',
        'components/virtual-keyboard/input-method-identifiers',
      ]
    },
    
     {
      'type': 'category',
      'label': 'Markdown',
      'items': [
        'components/markdown/quickstart',
        'components/markdown/markdown',
        {
          'type': 'category',
          'label': 'Advanced Markdown',
          'items': [
            'components/markdown/styling',
            'components/markdown/custom-image-loader'
          ]
        }, 
      ]
    }
  ],
};

module.exports = sidebars;
