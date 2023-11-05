// see https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
// can be tested with this script https://gist.github.com/maxkatz6/760bc0615b1af2ead4bf1f0582fdcd10

const config = {
    redirects: [{
            from: '/docs/getting-started/ide-support/jetbrains-rider-setup',
            to: '/docs/getting-started/jetbrains-rider-setup',
        },
        {
            from: '/docs/getting-started/UnhandledExceptions',
            to: '/docs/getting-started/unhandled-exceptions',
        },
        {
            from: '/docs/data-binding/compiledbindings',
            to: '/docs/data-binding/compiled-bindings',
        },
        {
            from: '/docs/basics/user-interface/controls/creating-controls/choosing-a-custom-contro-type',
            to: '/docs/basics/user-interface/controls/creating-controls/choosing-a-custom-control-type',
        },
        {
            from: '/docs/controls/button',
            to: '/docs/controls/buttons/button',
        },
        {
            from: '/docs/controls/radiobutton',
            to: '/docs/controls/buttons/radiobutton',
        },
        {
            from: '/docs/controls/buttonspinner',
            to: '/docs/controls/buttons/buttonspinner',
        },
        {
            from: '/docs/controls/repeatbutton',
            to: '/docs/controls/buttons/repeatbutton',
        },
        {
            from: '/docs/controls/togglebutton',
            to: '/docs/controls/buttons/togglebutton',
        },
        {
            from: '/docs/controls/SplitButton',
            to: '/docs/controls/buttons/splitbutton',
        },
        {
            from: '/docs/controls/ToggleSplitButton',
            to: '/docs/controls/buttons/togglesplitbutton',
        },
        {
            from: '/docs/controls/tray-icon',
            to: '/docs/controls/trayicon',
        },
        {
            from: '/docs/controls/treeview-1',
            to: '/docs/controls/treeview',
        },
        {
            from: '/docs/templates/implement-IDataTemplate',
            to: '/docs/templates/implement-idatatemplates',
        },
        {
            from: '/docs/animations/PageTransitions',
            to: '/docs/animations/page-transitions',
        },
        {
            from: '/docs/misc/community',
            to: '/docs/community'
        },
        {
            from: '/docs/misc/faq',
            to: '/docs/faq'
        },
        {
            from: '/docs/misc/wpf/styling',
            to: '/docs/wpf-developer-tips/styling'
        },
        {
            from: '/docs/misc/wpf/datatemplates',
            to: '/docs/wpf-developer-tips/datatemplates'
        },
        {
            from: '/docs/misc/wpf/hierachicaldatatemplate',
            to: '/docs/wpf-developer-tips/hierachicaldatatemplate'
        },
        {
            from: '/docs/misc/wpf/uielement-frameworkelement-and-control',
            to: '/docs/wpf-developer-tips/uielement-frameworkelement-and-control'
        },
        {
            from: '/docs/misc/wpf/dependencyproperty',
            to: '/docs/wpf-developer-tips/dependencyproperty'
        },
        {
            from: '/docs/misc/wpf/grid',
            to: '/docs/wpf-developer-tips/grid'
        },
        {
            from: '/docs/misc/wpf/itemscontrol',
            to: '/docs/wpf-developer-tips/itemscontrol'
        },
        {
            from: '/docs/misc/wpf/tunnelling-events',
            to: '/docs/wpf-developer-tips/tunnelling-events'
        },
        {
            from: '/docs/misc/wpf/class-handlers',
            to: '/docs/wpf-developer-tips/class-handlers'
        },
        {
            from: '/docs/misc/wpf/propertychangedcallback',
            to: '/docs/wpf-developer-tips/propertychangedcallback'
        },
        {
            from: '/docs/misc/wpf/rendertransforms-and-rendertransformorigin',
            to: '/docs/wpf-developer-tips/rendertransforms-and-rendertransformorigin'
        },
        // Can't be redirected, as plugin treats it as the same file
        // {
        //     from: '/docs/controls/TransitioningContentControl',
        //     to: '/docs/controls/transitioningcontentcontrol',
        // },
        // Can't be redirected by the plugin, as it's not a part of documentation anymore.
        // {
        //     from: '/misc/projects-that-are-using-avalonia',
        //     to: 'https://avaloniaui.net/Showcase'
        // }
    ]
};

module.exports = config;