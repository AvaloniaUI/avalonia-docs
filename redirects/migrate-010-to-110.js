function createRedirects(existingPath) {
    if (!existingPath.includes('/0.10.x/') && existingPath.includes('/docs/')) {
        let redirects = [];

        // 0.10 migration to 11.0
        var from010 = existingPath
            .replace('/docs/reference/controls/detailed-reference/', '/docs/controls/')
            .replace('/docs/reference/controls/', '/docs/controls/')
            .replace('/docs/get-started/wpf/', '/docs/misc/wpf/')
            .replace('/docs/get-started/wpf/', '/docs/wpf-developer-tips/')
            .replace('/docs/guides/platforms/', '/docs/tutorials/developing-for-mobile/')
            .replace('/docs/concepts/reactiveui/', '/docs/guides/deep-dives/reactiveui/');
        if (from010 !== existingPath) {
          redirects.push(from010);
        }

        return redirects;
    }
    return undefined; // Return a falsy value: no redirect created
};

const redirects = [
    {
        "from": "/docs/animations/",
        "to": "/docs/basics/user-interface/animations"
    },
    {
        "from": [
            "/docs/animations/PageTransitions",
            "/docs/animations/page-transitions"
        ],
        "to": "/docs/guides/graphics-and-animation/page-transitions/cross-fade-page-transition"
    },
    {
        "from": "/docs/animations/keyframe-animations",
        "to": "/docs/guides/graphics-and-animation/keyframe-animations"
    },
    {
        "from": "/docs/animations/transitions",
        "to": "/docs/guides/graphics-and-animation/transitions"
    },
    {
        "from": "/docs/authoring-controls/",
        "to": "/docs/guides/custom-controls/types-of-control"
    },
    {
        "from": "/docs/authoring-controls/defining-properties",
        "to": "/docs/basics/user-interface/controls/creating-controls/defining-properties"
    },
    {
        "from": "/docs/authoring-controls/types-of-control",
        "to": "/docs/basics/user-interface/controls/creating-controls/choosing-a-custom-control-type"
    },
    {
        "from": "/docs/controls/SplitButton",
        "to": "/docs/reference/controls/buttons/splitbutton"
    },
    {
        "from": "/docs/controls/ToggleSplitButton",
        "to": "/docs/reference/controls/buttons/togglesplitbutton"
    },
    {
        "from": "/docs/controls/button",
        "to": "/docs/reference/controls/buttons/button"
    },
    {
        "from": "/docs/controls/buttonspinner",
        "to": "/docs/reference/controls/buttons/buttonspinner"
    },
    {
        "from": "/docs/controls/calendardatepicker",
        "to": "/docs/reference/controls/calendar/calendar-date-picker"
    },
    {
        "from": "/docs/controls/radiobutton",
        "to": "/docs/reference/controls/buttons/radiobutton"
    },
    {
        "from": "/docs/controls/repeatbutton",
        "to": "/docs/reference/controls/buttons/repeatbutton"
    },
    {
        "from": "/docs/controls/togglebutton",
        "to": "/docs/reference/controls/buttons/togglebutton"
    },
    {
        "from": [
            "/docs/controls/tray-icon",
            "/docs/controls/trayicon"
        ],
        "to": "/docs/reference/controls/tray-icon"
    },
    {
        "from": [
            "/docs/controls/treeview-1",
            "/docs/controls/treeview"
        ],
        "to": "/docs/reference/controls/treeview-1"
    },
    {
        "from": "/docs/data-binding/",
        "to": "/docs/basics/data/data-binding/"
    },
    {
        "from": "/docs/data-binding/binding-classes",
        "to": "/docs/guides/data-binding/binding-classes"
    },
    {
        "from": "/docs/data-binding/binding-to-controls",
        "to": "/docs/guides/data-binding/binding-to-controls"
    },
    {
        "from": "/docs/data-binding/binding-from-code",
        "to": "/docs/guides/data-binding/binding-from-code"
    },
    {
        "from": "/docs/data-binding/binding-to-commands",
        "to": "/docs/guides/data-binding/how-to-bind-to-a-command-with-reactiveui"
    },
    {
        "from": "/docs/data-binding/binding-to-tasks-and-observables",
        "to": "/docs/guides/data-binding/how-to-bind-to-a-task-result"
    },
    {
        "from": "/docs/data-binding/bindings",
        "to": "/docs/basics/data/data-binding/"
    },
    {
        "from": [
            "/docs/data-binding/compiledbindings",
            "/docs/data-binding/compiled-bindings"
        ],
        "to": "/docs/basics/data/data-binding/compiled-bindings"
    },
    {
        "from": "/docs/data-binding/converting-binding-values",
        "to": "/docs/guides/data-binding/how-to-create-a-custom-data-binding-converter"
    },
    {
        "from": "/docs/data-binding/creating-and-binding-attached-properties",
        "to": "/docs/guides/custom-controls/how-to-create-attached-properties"
    },
    {
        "from": "/docs/data-binding/data-validation",
        "to": "/docs/guides/development-guides/data-validation"
    },
    {
        "from": "/docs/data-binding/the-datacontext",
        "to": "/docs/basics/data/data-binding/data-context"
    },
    {
        "from": [ "/docs/distribution-publishing/macos", "/docs/distribution-publishing/" ],
        "to": "/docs/deployment/macOS"
    },
    {
        "from": "/docs/getting-started/",
        "to": "/docs/get-started/"
    },
    {
        "from": [
            "/docs/getting-started/UnhandledExceptions",
            "/docs/getting-started/unhandled-exceptions"
        ],
        "to": "/docs/concepts/unhandledexceptions"
    },
    {
        "from": "/docs/getting-started/application-lifetimes",
        "to": "/docs/concepts/application-lifetimes"
    },
    {
        "from": "/docs/getting-started/assets",
        "to": "/docs/basics/user-interface/assets"
    },
    {
        "from": "/docs/getting-started/developer-tools",
        "to": "/docs/guides/implementation-guides/developer-tools"
    },
    {
        "from": "/docs/getting-started/ide-support",
        "to": "/docs/get-started/"
    },
    {
        "from": [
            "/docs/getting-started/ide-support/jetbrains-rider-setup",
            "/docs/getting-started/jetbrains-rider-setup"
        ],
        "to": "/docs/get-started/"
    },
    {
        "from": "/docs/getting-started/logging-errors-and-warnings",
        "to": "/docs/guides/implementation-guides/logging-errors-and-warnings"
    },
    {
        "from": "/docs/getting-started/programming-with-avalonia/",
        "to": "/docs/get-started/"
    },
    {
        "from": "/docs/getting-started/programming-with-avalonia/controls-and-layouts",
        "to": "/docs/basics/user-interface/controls/"
    },
    {
        "from": [
            "/docs/getting-started/programming-with-avalonia/data-binding",
            "/docs/data-binding/change-notifications"
        ],
        "to": "/docs/guides/data-binding/inotifypropertychanged"
    },
    {
        "from": "/docs/getting-started/programming-with-avalonia/graphics-and-animations",
        "to": "/docs/guides/graphics-and-animation/graphics-and-animations"
    },
    {
        "from": "/docs/getting-started/programming-with-avalonia/the-model-view-viewmodel-pattern-mvvm",
        "to": "/docs/concepts/the-mvvm-pattern/"
    },
    {
        "from": "/docs/getting-started/usercontrols",
        "to": "/docs/basics/user-interface/controls/creating-controls/choosing-a-custom-control-type"
    },
    {
        "from": "/docs/getting-started/windows",
        "to": "/docs/reference/controls/window"
    },
    {
        "from": "/docs/guides/basics/",
        "to": "/docs/basics/"
    },
    {
        "from": "/docs/guides/basics/accessing-the-ui-thread",
        "to": "/docs/guides/development-guides/accessing-the-ui-thread"
    },
    {
        "from": "/docs/guides/basics/code-behind",
        "to": "/docs/basics/user-interface/code-behind"
    },
    {
        "from": "/docs/guides/basics/introduction-to-xaml",
        "to": "/docs/basics/user-interface/introduction-to-xaml"
    },
    {
        "from": "/docs/guides/basics/mvvm",
        "to": "/docs/concepts/the-mvvm-pattern/"
    },
    {
        "from": "/docs/guides/deep-dives/",
        "to": "/docs/concepts/"
    },
    {
        "from": "/docs/guides/deep-dives/running-on-raspbian-lite-via-drm",
        "to": "/docs/guides/platforms/rpi/running-on-raspbian-lite-via-drm"
    },
    {
        "from": "/docs/guides/deep-dives/running-your-app-on-a-raspberry-pi",
        "to": "/docs/guides/platforms/rpi/running-your-app-on-a-raspberry-pi"
    },
    {
        "from": "/docs/guides/developer-guides/",
        "to": "/docs/guides/"
    },
    {
        "from": "/docs/guides/developer-guides/comparison-of-avalonia-with-wpf-and-uwp",
        "to": "/docs/get-started/wpf/comparison-of-avalonia-with-wpf-and-uwp"
    },
    {
        "from": "/docs/input/",
        "to": "/docs/concepts/input/"
    },
    {
        "from": "/docs/input/clipboard",
        "to": "docs/concepts/services/clipboard"
    },
    {
        "from": "/docs/input/hotkeys",
        "to": "/docs/concepts/input/hotkeys"
    },
    {
        "from": "/docs/input/pointer",
        "to": "/docs/concepts/input/pointer"
    },
    {
        "from": "/docs/input/routed-events",
        "to": "/docs/concepts/input/routed-events"
    },
    {
        "from": "/docs/layout/",
        "to": "/docs/basics/user-interface/building-layouts/"
    },
    {
        "from": "/docs/layout/alignment-margins-and-padding",
        "to": "/docs/basics/user-interface/building-layouts/alignment-margins-and-padding"
    },
    {
        "from": "/docs/layout/create-a-custom-panel",
        "to": "/docs/guides/custom-controls/create-a-custom-panel"
    },
    {
        "from": "/docs/layout/panels-overview",
        "to": "/docs/basics/user-interface/building-layouts/panels-overview"
    },
    {
        "from": "/docs/misc/community",
        "to": "/docs/community"
    },
    {
        "from": "/docs/misc/community",
        "to": "/docs/community"
    },
    {
        "from": "/docs/misc/faq",
        "to": "/docs/faq"
    },
    {
        "from": "/docs/styling/",
        "to": "/docs/basics/user-interface/styling/"
    },
    {
        "from": "/docs/styling/resources",
        "to": "/docs/guides/styles-and-resources/resources"
    },
    {
        "from": "/docs/styling/selectors",
        "to": "/docs/guides/styles-and-resources/selectors"
    },
    {
        "from": "/docs/styling/styles",
        "to": "/docs/guides/styles-and-resources/how-to-use-included-styles"
    },
    {
        "from": "/docs/styling/troubleshooting",
        "to": "/docs/guides/styles-and-resources/troubleshooting"
    },
    {
        "from": "/docs/templates/",
        "to": "/docs/basics/data/data-templates"
    },
    {
        "from": "/docs/templates/creating-data-templates-in-code",
        "to": "/docs/concepts/templates/creating-data-templates-in-code"
    },
    {
        "from": "/docs/templates/data-templates",
        "to": "/docs/basics/data/data-templates"
    },
    {
        "from": [
            "/docs/templates/implement-IDataTemplate",
            "/docs/templates/implement-idatatemplates"
        ],
        "to": "/docs/concepts/templates/implement-idatatemplate"
    },
    {
        "from": "/docs/tutorials/running-in-the-browser",
        "to": "/docs/guides/platforms/how-to-use-web-assembly"
    },
    {
        "from": "/docs/tutorials/developing-for-mobile/create-a-cross-platform-solution",
        "to": "/docs/guides/building-cross-platform-applications/solution-setup"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/border",
        "to": "/docs/reference/controls/border"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/calendar",
        "to": "/docs/reference/controls/calendar/"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/calendar/calendar-date-picker",
        "to": "/docs/reference/controls/calendar/calendar-date-picker"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/datagrid/data-grid-template-columns",
        "to": "/docs/reference/controls/datagrid/data-grid-template-columns"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/drawing-image",
        "to": "/docs/reference/controls/drawing-image"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/label",
        "to": "/docs/reference/controls/label"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/menu-flyout",
        "to": "/docs/reference/controls/menu-flyout"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/path-icon",
        "to": "/docs/reference/controls/path-icon"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/selectable-textblock",
        "to": "/docs/reference/controls/selectable-textblock"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/tabcontrol",
        "to": "/docs/reference/controls/tabcontrol"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/tabstrip",
        "to": "/docs/reference/controls/tabstrip"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/textblock",
        "to": "/docs/reference/controls/textblock"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/textbox",
        "to": "/docs/reference/controls/textbox"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/timepicker",
        "to": "/docs/reference/controls/timepicker"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/tooltip",
        "to": "/docs/reference/controls/tooltip"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/transitioningcontentcontrol",
        "to": "/docs/reference/controls/transitioningcontentcontrol"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/tray-icon",
        "to": "/docs/reference/controls/tray-icon"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/treedatagrid",
        "to": "/docs/reference/controls/treedatagrid/"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/treedatagrid/creating-a-flat-treedatagrid",
        "to": "/docs/reference/controls/treedatagrid/creating-a-flat-treedatagrid"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/treedatagrid/creating-a-hierarchical-treedatagrid",
        "to": "/docs/reference/controls/treedatagrid/creating-a-hierarchical-treedatagrid"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/treedatagrid/treedatagrid-column-types",
        "to": "/docs/reference/controls/treedatagrid/treedatagrid-column-types"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/treeview-1",
        "to": "/docs/reference/controls/treeview-1"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/uniform-grid",
        "to": "/docs/reference/controls/uniform-grid"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/viewbox",
        "to": "/docs/reference/controls/viewbox"
    },
    {
        "from": "/docs/reference/controls/detailed-reference/wrappanel",
        "to": "/docs/reference/controls/wrappanel"
    },


    // Can't be redirected, as plugin treats it as the same file
    // { '/docs/controls/TransitioningContentControl' },

    // Can't be redirected by the plugin, as it's not a part of documentation anymore.
    // { from: '/misc/projects-that-are-using-avalonia' }

    // Not needed anymore.    
    // { from: '/docs/misc/wpf/itemscontrol' },
    // { from: '/docs/guides/developer-guides/build-avalonia-from-source', to: '111111' },
    // { from: '/docs/guides/developer-guides/debugging-previewer', to: '111111' },
    // { from: '/docs/guides/developer-guides/debugging-xamlil', to: '111111' },
    // { from: '/docs/guides/developer-guides/macos-development', to: '111111' },
    // { from: '/docs/guides/developer-guides/release-process', to: '111111' },
    // { from: '/docs/guides/developer-guides/maintaining-stable-branch-pr-merge-process', to: '111111' },

    // Missing:
    // { from: '/docs/guides/developer-guides/testing-with-ncrunch' },
    // { from: '/docs/data-binding/binding-in-a-control-template', to: '111111' },
];

export const from10to11 = { createRedirects, redirects };