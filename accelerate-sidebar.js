// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  documentationSidebar: [
    'welcome', 
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
          'label': 'Advanced',
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
    
  ],
};

module.exports = sidebars;
