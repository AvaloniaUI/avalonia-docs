interface Redirect {
  to: string;
  from: string | string[];
}

function createRedirects(existingPath: string): string[] | undefined {
    if (existingPath.includes('/docs/')) {
        const redirects: string[] = [];

        // Whole-folder redirects for folders that are mostly unchanged
        const v12_redirect = existingPath
            .replace('/docs/guides/data-binding/', '/docs/data-binding/')
            .replace('/docs/basics/data/data-binding/', '/docs/data-binding/')
            .replace('/docs/basics/user-interface/controls/creating-controls/', '/docs/ui-development/custom-controls/')
            .replace('/docs/concepts/input/', '/concepts/ui-concepts/user-input/')
            .replace('/docs/concepts/reactiveui/', '/docs/app-development/reactiveui/')
            .replace('/docs/concepts/services/', '/docs/services/')
            .replace('/docs/concepts/services/storage-provider/', '/docs/services/storage/')
        if (v12_redirect !== existingPath) {
          redirects.push(v12_redirect);
        }

        return redirects;
    }
    return undefined; // Return a falsy value: no redirect created
}

const redirects: Redirect[] = [
    {
        "from": [
            "/docs/next/reference/upgrade-to-v11",
            "/docs/guides/developer-guides/",
            "/docs/overview/what-is-avalonia",
            "/docs/guides/index",
            "/docs/guides/implementation-guides/",
            "/docs/guides/development-guides/how-to-implement-multi-page-apps",
            "/docs/deployment/",
            "/docs/stay-up-to-date/",
            "/docs/stay-up-to-date/breaking-changes",
            "/docs/stay-up-to-date/upgrade-from-0.10",
            "/docs/stay-up-to-date/whats-new",
            "/docs/community",
            "/docs/concepts/",
            "/docs/faq",
            "/docs/guides/",
            "/docs/reference/",
            "/docs/concepts/services/",
            "/docs/reference/gestures/",
            "/docs/reference/properties/index",
            "/docs/reference/styles/index",
            "/docs/reference/properties/",
        ],
        "to": "/docs/welcome"
    },
    {
        "from": "/docs/overview/supported-platforms",
        "to": "/docs/supported-platforms"
    },
    {
        "from": "/docs/get-started/learn-more",
        "to": "/docs/get-started/starter-tutorial/exercises"
    },
    {
        "from": [
            "/docs/get-started/xaml-previewers",
            "/docs/guides/implementation-guides/ide-support",
            "/docs/guides/implementation-guides/how-to-use-design-time-data",
            "/accelerate/tools/vs-extension/previewer"
        ],
        "to": "/docs/app-development/xaml-preview-and-design-settings"
    },
    {
        "from": "/docs/guides/implementation-guides/how-to-implement-dependency-injection",
        "to": "/docs/app-development/dependency-injection"
    },
    {
        "from": [
            "/docs/getting-started/programming-with-avalonia/the-model-view-viewmodel-pattern-mvvm",
            "/docs/guides/implementation-guides/using-avalonia-with-mvvm-frameworks",
            "/docs/concepts/the-mvvm-pattern/index",
            "/docs/concepts/the-mvvm-pattern/avalonia-ui-and-mvvm",
            "/docs/guides/implementation-guides/how-to-use-the-mvvm-pattern",
            "/docs/guides/development-guides/how-to-show-and-hide-a-split-view-pane-with-mvvm",
        ],
        "to": "/docs/fundamentals/the-mvvm-pattern"
    },
    {
        "from": [
            "/docs/tutorials/developing-for-mobile/create-a-cross-platform-solution",
            "/docs/guides/building-cross-platform-applications/architecture",
            "/docs/guides/building-cross-platform-applications/dealing-with-platforms",
            "/docs/guides/building-cross-platform-applications/",
        ],
        "to": "/docs/fundamentals/cross-platform-architecture"
    },
    {
        "from": "/docs/guides/building-cross-platform-applications/solution-setup",
        "to": "/docs/app-development/cross-platform-solution-setup"
    },
    {
        "from": [
            "/docs/getting-started/developer-tools",
            "/docs/guides/implementation-guides/developer-tools",
        ],
        "to": "/tools/legacy-developer-tools"
    },
    {
        "from": [
            "/docs/getting-started/logging-errors-and-warnings",
            "/docs/guides/implementation-guides/logging-errors-and-warnings",
        ],
        "to": "/docs/app-development/logging-errors-and-warnings"
    },
    {
        "from": "/docs/guides/implementation-guides/localizing",
        "to": "/docs/app-development/localizing"
    },
    {
        "from": [
            "/docs/guides/data/how-to-bind-to-a-command-with-reactiveui",
            "/docs/guides/data-binding/how-to-bind-to-a-command-without-reactiveui",
            "/docs/guides/data-binding/how-to-bind-to-a-command-with-reactiveui",
            "/docs/concepts/reactiveui/command-update",
            "/docs/concepts/reactiveui/reactive-command",
        ],
        "to": "/docs/data-binding/binding-to-commands"
    },
    {
        "from": [
            "/docs/styling/selectors",
            "/docs/guides/styles-and-resources/selectors",
        ],
        "to": "/docs/styling/style-selectors"
    },
    {
        "from": [
            "/docs/guides/styles-and-resources/property-setters",
            "/docs/guides/styles-and-resources/setter-precedence"
        ],
        "to": "/docs/styling/property-setters"
    },
    {
        "from": "/docs/guides/styles-and-resources/how-to-use-included-styles",
        "to": "/docs/styling/sharing-styles"
    },
    {
        "from": [
            "/docs/styling/resources",
            "/docs/guides/styles-and-resources/resources",
        ],
        "to": "/docs/app-development/resource-dictionary"
    },
    {
        "from": "/docs/guides/styles-and-resources/how-to-use-theme-variants",
        "to": "/docs/styling/theme-variants"
    },
    {
        "from": "/docs/guides/styles-and-resources/how-to-use-fonts",
        "to": "/docs/styling/custom-fonts"
    },
    {
        "from": [
            "/docs/getting-started/programming-with-avalonia/graphics-and-animations",
            "/docs/guides/graphics-and-animation/graphics-and-animations",
        ],
        "to": "/docs/graphics-animation/drawing-graphics"
    },
    {
        "from": [
            "/docs/guides/graphics-and-animation/how-to-add-menu-icons",
            "/docs/guides/graphics-and-animation/how-to-use-icons"
        ],
        "to": "/docs/graphics-animation/adding-icons"
    },
    {
        "from": [
            "/docs/animations/keyframe-animations",
            "/docs/guides/graphics-and-animation/keyframe-animations",
        ],
        "to": "/docs/graphics-animation/keyframe-animations"
    },
    {
        "from": [
            "/docs/animations/transitions",
            "/docs/guides/graphics-and-animation/transitions",
            "/docs/guides/ui-development/graphics/transitions",
        ],
        "to": "/docs/graphics-animation/control-transitions"
    },
    {
        "from": "/docs/guides/graphics-and-animation/gradients",
        "to": "/docs/graphics-animation/gradients"
    },
    {
        "from": [
            "/docs/next/guides/graphics-and-animation/how-to-use-page-transitions/",
            "/docs/next/guides/graphics-and-animation/how-to-use-page-transitions/cross-fade-page-transition",
            "/docs/next/guides/graphics-and-animation/how-to-use-page-transitions/page-slide-transition",
            "/docs/next/guides/graphics-and-animation/how-to-use-page-transitions/page-transition-combinations",
            "/docs/next/guides/graphics-and-animation/how-to-create-a-custom-page-transition",
            "/docs/animations/PageTransitions",
            "/docs/animations/page-transitions",
            "/docs/guides/graphics-and-animation/page-transitions/cross-fade-page-transition",
            "/docs/guides/graphics-and-animation/page-transitions/page-slide-transition",
            "/docs/guides/graphics-and-animation/page-transitions/page-transition-combinations",
            "/docs/guides/graphics-and-animation/page-transitions/how-to-create-a-custom-page-transition"
        ],
        "to": "/docs/graphics-animation/page-transitions"
    },
    {
        "from": [
            "/docs/next/basics/user-interface/controls/creating-controls/choosing-a-custom-contro-type",
            "/docs/authoring-controls/",
            "/docs/authoring-controls/types-of-control",
            "/docs/guides/custom-controls/",
            "/docs/guides/custom-controls/types-of-control",
            "/docs/guides/custom-controls/how-to-create-advanced-custom-controls",
            "/docs/basics/user-interface/controls/creating-controls/index",
            "/docs/concepts/templated-controls",
            "/docs/basics/user-interface/controls/creating-controls/",
        ],
        "to": "/docs/custom-controls/"
    },
    {
        "from": [
            "/docs/layout/create-a-custom-panel",
            "/docs/guides/custom-controls/create-a-custom-panel",
        ],
        "to": "/docs/custom-controls/custom-panel"
    },
    {
        "from": [
            "/docs/authoring-controls/defining-properties",
            "/docs/guides/custom-controls/defining-properties",
            "/docs/basics/user-interface/controls/creating-controls/defining-properties",
        ],
        "to": "/docs/custom-controls/defining-properties"
    },
    {
        "from": "/docs/basics/user-interface/controls/creating-controls/defining-events",
        "to": "/docs/custom-controls/defining-events"
    },
    {
        "from": "/docs/guides/custom-controls/draw-with-a-property",
        "to": "/docs/custom-controls/drawing-custom-controls"
    },
    {
        "from": "/docs/guides/custom-controls/how-to-create-a-custom-controls-library",
        "to": "/docs/custom-controls/custom-control-library"
    },
    {
        "from": "/docs/guides/custom-controls/how-to-create-a-custom-flyout",
        "to": "/docs/custom-controls/custom-flyout"
    },
    {
        "from": "/docs/guides/custom-controls/how-to-create-attached-properties",
        "to": "/docs/custom-controls/attached-properties"
    },
    {
        "from": "/docs/guides/custom-controls/how-to-create-templated-controls",
        "to": "/docs/custom-controls/templated-controls"
    },
    {
        "from": "/docs/guides/custom-controls/add-custom-control-class",
        "to": "/docs/custom-controls/custom-control-class"
    },
    {
        "from": [
            "/docs/guides/basics/accessing-the-ui-thread",
            "/docs/guides/development-guides/accessing-the-ui-thread",
            "/docs/app-development/accessing-the-ui-thread",
        ],
        "to": "/docs/app-development/threading"
    },
    {
        "from": [
            "/docs/data-binding/data-validation",
            "/docs/guides/development-guides/data-validation",
        ],
        "to": "/docs/app-development/data-validation"
    },
    {
        "from": "/docs/guides/development-guides/improving-performance",
        "to": "/troubleshooting/app-performance-issues"
    },
    {
        "from": "/docs/guides/platforms/platform-specific-code/dotnet",
        "to": "/docs/platform-specific-guides/dotnet"
    },
    {
        "from": "/docs/guides/platforms/platform-specific-code/xaml",
        "to": "/docs/platform-specific-guides/xaml"
    },
    {
        "from": "/docs/guides/platforms/windows/host-avalonia-controls-in-winforms",
        "to": "/docs/platform-specific-guides/windows"
    },
    {
        "from": [
            "/docs/tutorials/running-in-the-browser",
            "/docs/guides/platforms/how-to-use-web-assembly",
        ],
        "to": "/docs/platform-specific-guides/webassembly"
    },
    {
        "from": [
            "/docs/guides/platforms/macos-development",
            "/docs/deployment/macOS"
        ],
        "to": "/docs/deployment/macos"
    },
    {
        "from": [
            "/docs/guides/deep-dives/running-on-raspbian-lite-via-drm",
            "/docs/guides/deep-dives/running-your-app-on-a-raspberry-pi",
            "/docs/guides/platforms/rpi/running-your-app-on-a-raspberry-pi",
            "/docs/guides/platforms/rpi/running-on-raspbian-lite-via-drm",
        ],
        "to": "/docs/platform-specific-guides/embedded-linux/raspberry-pi"
    },
    {
        "from": [
            "/docs/guides/platforms/ios/",
            "/docs/guides/platforms/ios/setting-up-your-developer-environment-for-ios",
            "/docs/guides/platforms/ios/build-and-run-your-application-on-your-iphone-or-ipad",
            "/docs/guides/platforms/ios/build-and-run-your-application-on-a-simulator"
        ],
        "to": "/docs/platform-specific-guides/ios"
    },
    {
        "from": [
            "/docs/guides/platforms/android/",
            "/docs/guides/platforms/android/build-and-run-your-application-on-a-device",
            "/docs/guides/platforms/android/build-and-run-your-application-on-a-simulator",
            "/docs/guides/platforms/android/setting-up-your-developer-environment-for-android"
        ],
        "to": "/docs/platform-specific-guides/android/"
    },
    {
        "from": "/docs/guides/platforms/android/configure-vscode-debug-linux",
        "to": "/tools/visual-studio-code/configure-vscode-debug-linux"
    },
    {
        "from": "/docs/guides/platforms/android/embed-native-views",
        "to": "/docs/platform-specific-guides/android/embed-native-views"
    },
    {
        "from": "/docs/guides/platforms/android/intent-filter",
        "to": "/docs/platform-specific-guides/android/intent-filter"
    },
    {
        "from": "/docs/deployment/debian-ubuntu",
        "to": "/docs/deployment/linux"
    },
    {
        "from": [
            "/docs/guides/developer-guides/comparison-of-avalonia-with-wpf-and-uwp",
            "/docs/get-started/wpf/",
            "/docs/get-started/wpf/comparison-of-avalonia-with-wpf-and-uwp"
        ],
        "to": "/docs/migration/wpf/"
    },
    {
        "from": "/docs/get-started/wpf/styling",
        "to": "/docs/migration/wpf/styling"
    },
    {
        "from": [
            "/docs/get-started/wpf/datatemplates",
            "/docs/get-started/wpf/hierarchicaldatatemplate"
        ],
        "to": "/docs/migration/wpf/data-templates"
    },
    {
        "from": [
            "/docs/get-started/wpf/uielement-frameworkelement-and-control",
            "/docs/get-started/wpf/grid",
            "/docs/get-started/wpf/rendertransforms-and-rendertransformorigin"
        ],
        "to": "/docs/migration/wpf/controls"
    },
    {
        "from": [
            "/docs/get-started/wpf/dependencyproperty",
            "/docs/get-started/wpf/propertychangedcallback"
        ],
        "to": "/docs/migration/wpf/properties"
    },
    {
        "from": [
            "/docs/get-started/wpf/tunnelling-events",
            "/docs/get-started/wpf/class-handlers"
        ],
        "to": "/docs/migration/wpf/events"
    },
    {
        "from": [
            "/docs/getting-started/programming-with-avalonia/controls-and-layouts",
            "/docs/layout/panels-overview",
            "/docs/reference/controls/",
            "/docs/reference/controls/repeating-data-controls",
            "/docs/reference/controls/text-controls",
            "/docs/reference/controls/buttons",
            "/docs/reference/controls/value-selector-controls",
            "/docs/reference/controls/layout-controls",
            "/docs/reference/controls/image-controls",
            "/docs/reference/controls/menu-controls",
            "/docs/reference/controls/popup-controls",
            "/docs/basics/user-interface/controls/",
            "/docs/basics/user-interface/controls/builtin-controls",
            "/docs/basics/user-interface/building-layouts/panels-overview"
        ],
        "to": "/controls"
    },
    {
        "from": "/docs/reference/animation-settings",
        "to": "/docs/graphics-animation/animation-settings"
    },
    {
        "from": "/docs/reference/built-in-data-binding-converters",
        "to": "/docs/data-binding/built-in-data-binding-converters"
    },
    {
        "from": "/docs/reference/controls/autocompletebox",
        "to": "/controls/input/text-input/autocompletebox"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/border",
            "/docs/reference/controls/border",
        ],
        "to": "/controls/layout/containers/border"
    },
    {
        "from": [
            "/docs/controls/button",
            "/docs/reference/controls/buttons/button",
        ],
        "to": "/controls/input/buttons/button"
    },
    {
        "from": [
            "/docs/controls/buttonspinner",
            "/docs/reference/controls/buttons/buttonspinner",
        ],
        "to": "/controls/input/buttons/buttonspinner"
    },
    {
        "from": [
            "/docs/controls/radiobutton",
            "/docs/reference/controls/buttons/radiobutton",
        ],
        "to": "/controls/input/buttons/radiobutton"
    },
    {
        "from": [
            "/docs/controls/repeatbutton",
            "/docs/reference/controls/buttons/repeatbutton",
        ],
        "to": "/controls/input/buttons/repeatbutton"
    },
    {
        "from": [
            "/docs/controls/SplitButton",
            "/docs/reference/controls/buttons/splitbutton",
        ],
        "to": "/controls/input/buttons/splitbutton"
    },
    {
        "from": [
            "/docs/controls/togglebutton",
            "/docs/reference/controls/buttons/togglebutton",
        ],
        "to": "/controls/input/buttons/togglebutton"
    },
    {
        "from": [
            "/docs/controls/ToggleSplitButton",
            "/docs/reference/controls/buttons/togglesplitbutton",
        ],
        "to": "/controls/input/buttons/togglesplitbutton"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/calendar",
            "/docs/reference/controls/calendar",
        ],
        "to": "/controls/input/date-and-time/calendar"
    },
    {
        "from": [
            "/docs/controls/calendardatepicker",
            "/docs/reference/controls/calendar-date-picker",
            "/docs/reference/controls/calendar/calendar-date-picker",
        ],
        "to": "/controls/input/date-and-time/calendardatepicker"
    },
    {
        "from": "/docs/reference/controls/canvas",
        "to": "/controls/layout/panels/canvas"
    },
    {
        "from": "/docs/reference/controls/carousel",
        "to": "/controls/data-display/collections/carousel"
    },
    {
        "from": "/docs/reference/controls/checkbox",
        "to": "/controls/input/selectors/checkbox"
    },
    {
        "from": "/docs/reference/controls/colorpicker",
        "to": "/controls/input/selectors/colorpicker"
    },
    {
        "from": [
            "/docs/reference/controls/colorview",
            "/docs/reference/controls/colorpicker/colorview"
        ],
        "to": "/controls/input/selectors/colorview"
    },
    {
        "from": "/docs/reference/controls/combobox",
        "to": "/controls/input/selectors/combobox"
    },
    {
        "from": "/docs/reference/controls/contentcontrol",
        "to": "/controls/data-display/contentcontrol"
    },
    {
        "from": "/docs/reference/controls/contextmenu",
        "to": "/controls/menus/contextmenu"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/datagrid/data-grid-template-columns",
            "/docs/reference/controls/datagrid",
            "/docs/reference/controls/datagrid/data-grid-template-columns",
            "/docs/reference/controls/datagrid/datagridcolumns"
        ],
        "to": "/controls/data-display/structured-data/datagrid"
    },
    {
        "from": "/docs/reference/controls/datepicker",
        "to": "/controls/input/date-and-time/datepicker"
    },
    {
        "from": "/docs/reference/controls/decorator",
        "to": "/controls/layout/decorator"
    },
    {
        "from": "/docs/reference/controls/dockpanel",
        "to": "/controls/layout/panels/dockpanel"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/drawing-image",
            "/docs/reference/controls/drawing-image",
        ],
        "to": "/controls/media/drawingimage"
    },
    {
        "from": "/docs/reference/controls/expander",
        "to": "/controls/layout/containers/expander"
    },
    {
        "from": "/docs/reference/controls/flyouts",
        "to": "/controls/layout/containers/flyout"
    },
    {
        "from": [
            "/docs/reference/controls/grid",
            "/docs/reference/controls/grid/sharedsizegroup"
        ],
        "to": "/controls/layout/panels/grid"
    },
    {
        "from": "/docs/reference/controls/gridsplitter",
        "to": "/controls/layout/panels/gridsplitter"
    },
    {
        "from": "/docs/reference/controls/image",
        "to": "/controls/media/image"
    },
    {
        "from": "/docs/reference/controls/itemscontrol",
        "to": "/controls/data-display/collections/itemscontrol"
    },
    {
        "from": "/docs/reference/controls/itemsrepeater",
        "to": "/controls/data-display/collections/itemsrepeater"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/label",
            "/docs/reference/controls/label",
        ],
        "to": "/controls/data-display/text-display/label"
    },
    {
        "from": "/docs/reference/controls/layouttransformcontrol",
        "to": "/controls/layout/layouttransformcontrol"
    },
    {
        "from": "/docs/reference/controls/listbox",
        "to": "/controls/data-display/collections/listbox"
    },
    {
        "from": "/docs/reference/controls/maskedtextbox",
        "to": "/controls/input/text-input/maskedtextbox"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/menu-flyout",
            "/docs/reference/controls/menu-flyout",
        ],
        "to": "/controls/menus/menuflyout"
    },
    {
        "from": "/docs/reference/controls/menu",
        "to": "/controls/menus/menu"
    },
    {
        "from": "/docs/reference/controls/nativemenu",
        "to": "/controls/menus/nativemenu"
    },
    {
        "from": "/docs/reference/controls/numericupdown",
        "to": "/controls/input/selectors/numericupdown"
    },
    {
        "from": "/docs/reference/controls/panel",
        "to": "/controls/layout/panels/panel"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/path-icon",
            "/docs/reference/controls/path-icon",
        ],
        "to": "/controls/media/pathicon"
    },
    {
        "from": "/docs/reference/controls/progressbar",
        "to": "/controls/feedback/progressbar"
    },
    {
        "from": "/docs/reference/controls/refreshcontainer",
        "to": "/controls/layout/containers/refreshcontainer"
    },
    {
        "from": "/docs/reference/controls/relativepanel",
        "to": "/controls/layout/panels/relativepanel"
    },
    {
        "from": "/docs/reference/controls/scrollbar",
        "to": "/controls/primitives/scrollbar"
    },
    {
        "from": "/docs/reference/controls/scrollviewer",
        "to": "/controls/layout/containers/scrollviewer"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/selectable-textblock",
            "/docs/reference/controls/selectable-textblock",
        ],
        "to": "/controls/data-display/text-display/selectabletextblock"
    },
    {
        "from": "/docs/reference/controls/separator",
        "to": "/controls/menus/separator"
    },
    {
        "from": "/docs/reference/controls/slider",
        "to": "/controls/input/selectors/slider"
    },
    {
        "from": "/docs/reference/controls/splitview",
        "to": "/controls/layout/containers/splitview"
    },
    {
        "from": "/docs/reference/controls/stackpanel",
        "to": "/controls/layout/panels/stackpanel"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/tabcontrol",
            "/docs/reference/controls/tabcontrol",
        ],
        "to": "/controls/navigation/tabcontrol"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/tabstrip",
            "/docs/reference/controls/tabstrip",
        ],
        "to": "/controls/navigation/tabstrip"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/textblock",
            "/docs/reference/controls/textblock",
        ],
        "to": "/controls/data-display/text-display/textblock"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/textbox",
            "/docs/reference/controls/textbox",
        ],
        "to": "/controls/input/text-input/textbox"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/timepicker",
            "/docs/reference/controls/timepicker",
        ],
        "to": "/controls/input/date-and-time/timepicker"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/tooltip",
            "/docs/reference/controls/tooltip",
        ],
        "to": "/controls/feedback/tooltip"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/transitioningcontentcontrol",
            "/docs/reference/controls/transitioningcontentcontrol",
        ],
        "to": "/controls/data-display/transitioningcontentcontrol"
    },
    {
        "from": [
            "/docs/controls/tray-icon",
            "/docs/controls/trayicon",
            "/docs/reference/controls/tray-icon",
        ],
        "to": "/controls/navigation/trayicon"
    },
    {
        "from": [
            "/docs/reference/controls/treedatagrid/",
            "/docs/reference/controls/detailed-reference/treedatagrid",
            "/docs/reference/controls/detailed-reference/treedatagrid/creating-a-flat-treedatagrid",
            "/docs/reference/controls/detailed-reference/treedatagrid/creating-a-hierarchical-treedatagrid",
            "/docs/reference/controls/detailed-reference/treedatagrid/treedatagrid-column-types",
            "/docs/reference/controls/treedatagrid/index",
            "/docs/reference/controls/treedatagrid/creating-a-flat-treedatagrid",
            "/docs/reference/controls/treedatagrid/creating-a-hierarchical-treedatagrid",
            "/docs/reference/controls/treedatagrid/treedatagrid-column-types",
            "/accelerate/components/treedatagrid/quickstart",
            "/accelerate/components/treedatagrid/quickstart-flat",
            "/accelerate/components/treedatagrid/quickstart-hierarchical",
        ],
        "to": "/controls/data-display/structured-data/treedatagrid/"
    },
    {
        "from": [
            "/docs/controls/treeview-1",
            "/docs/controls/treeview",
            "/docs/reference/controls/treeview-1",
        ],
        "to": "/controls/data-display/structured-data/treeview"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/uniform-grid",
            "/docs/reference/controls/uniform-grid",
        ],
        "to": "/controls/layout/panels/uniformgrid"
    },
    {
        "from": "/docs/reference/controls/usercontrol",
        "to": "/controls/primitives/usercontrol"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/viewbox",
            "/docs/reference/controls/viewbox",
        ],
        "to": "/controls/layout/containers/viewbox"
    },
    {
        "from": [
            "/docs/getting-started/windows",
            "/docs/reference/controls/window",
        ],
        "to": "/controls/primitives/window"
    },
    {
        "from": [
            "/docs/reference/controls/detailed-reference/wrappanel",
            "/docs/reference/controls/wrappanel",
        ],
        "to": "/controls/layout/panels/wrappanel"
    },
    {
        "from": [
            "/docs/tutorials/",
            "/docs/tutorials/samples",
        ],
        "to": "/docs/samples-tutorials"
    },
    {
        "from": [
            "/docs/guides/deep-dives/",
            "/docs/guides/basics/",
            "/docs/concepts/index",
            "/docs/basics/",
        ],
        "to": "/docs/welcome"
    },
    {
        "from": [
            "/guides/basics/introduction-to-xaml",
            "/docs/guides/basics/introduction-to-xaml",
            "/docs/basics/user-interface/introduction-to-xaml",
        ],
        "to": "/docs/fundamentals/avalonia-xaml"
    },
    {
        "from": [
            "/docs/guides/basics/code-behind",
            "/docs/basics/user-interface/code-behind",
            "/docs/guides/implementation-guides/code-behind"
        ],
        "to": "/docs/fundamentals/code-behind"
    },
    {
        "from": [
            "/docs/basics/user-interface/controls/creating-controls/control-themes",
            "/docs/ui-development/custom-controls/control-themes"
        ],
        "to": "/docs/styling/control-themes"
    },
    {
        "from": [
            "/docs/layout/",
            "/docs/basics/user-interface/building-layouts/",
            "/docs/concepts/layout/layout-zones"
        ],
        "to": "/docs/layout/"
    },
    {
        "from": [
            "/docs/layout/alignment-margins-and-padding",
            "/docs/basics/user-interface/building-layouts/alignment-margins-and-padding",
        ],
        "to": "/docs/layout/positioning-controls"
    },
    {
        "from": [
            "/docs/styling/",
            "/docs/reference/styles/",
            "/docs/basics/user-interface/styling/",
            "/docs/basics/user-interface/styling/styles",
        ],
        "to": "/docs/styling/styles"
    },
    {
        "from": "/docs/basics/user-interface/styling/style-classes",
        "to": "/docs/styling/style-classes"
    },
    {
        "from": "/docs/basics/user-interface/styling/control-themes",
        "to": "/docs/styling/control-themes"
    },
    {
        "from": "/docs/basics/user-interface/styling/container-queries",
        "to": "/docs/styling/container-queries"
    },
    {
        "from": [
            "/docs/basics/user-interface/styling/themes/",
            "/docs/basics/user-interface/styling/themes/fluent",
            "/docs/basics/user-interface/styling/themes/simple"
        ],
        "to": "/docs/styling/themes"
    },
    {
        "from": [
            "/docs/styling/troubleshooting",
            "/docs/guides/styles-and-resources/troubleshooting",
        ],
        "to": "/troubleshooting/ui-development/styles"
    },
    {
        "from": "/docs/basics/user-interface/styling/troubleshooting",
        "to": "/troubleshooting/ui-development/themes"
    },
    {
        "from": "/docs/basics/user-interface/adding-interactivity",
        "to": "/docs/input-interaction/adding-interactivity"
    },
    {
        "from": [
            "/docs/getting-started/assets",
            "/docs/basics/user-interface/assets",
        ],
        "to": "/docs/fundamentals/assets"
    },
    {
        "from": [
            "/docs/animations/",
            "/docs/basics/user-interface/animations",
        ],
        "to": "/docs/graphics-animation/animations"
    },
    {
        "from": "/docs/basics/user-interface/file-dialogs",
        "to": "/docs/services/file-dialogs"
    },
    {
        "from": "/docs/basics/user-interface/multi-touch",
        "to": "/docs/input-interaction/gestures"
    },
    {
        "from": "/docs/basics/user-interface/messagebox",
        "to": "/troubleshooting/controls/messagebox"
    },
    {
        "from": "/docs/tutorials/groupbox",
        "to": "/controls/layout/containers/groupbox"
    },
    {
        "from": [
            "/docs/data-binding/",
            "/docs/guides/data-binding/",
            "/docs/data-binding/binding-classes",
            "/docs/data-binding/binding-to-controls",
            "/docs/data-binding/binding-from-code",
            "/docs/data-binding/binding-to-commands",
            "/docs/data-binding/binding-to-tasks-and-observables",
            "/docs/data-binding/bindings",
            "/docs/data-binding/compiledbindings",
            "/docs/basics/data/data-binding/compiled-bindings",
            "/docs/data-binding/converting-binding-values",
            "/docs/data-binding/the-datacontext",
            "/docs/basics/data/data-binding/data-context",
            "/docs/getting-started/programming-with-avalonia/data-binding",
            "/docs/data-binding/change-notifications",
            "/docs/basics/data/data-binding/",
            "/docs/basics/data/data-binding/data-binding-syntax",
            "/docs/concepts/reactiveui/binding-to-sorted-filtered-list",
            "/docs/concepts/reactiveui/data-persistence",
        ],
        "to": "/docs/data-binding/introduction-to-data-binding"
    },
    {
        "from": [
            "/docs/templates/",
            "/docs/templates/creating-data-templates-in-code",
            "/docs/templates/data-templates",
            "/docs/templates/implement-IDataTemplate",
            "/docs/templates/implement-idatatemplates",
            "/docs/basics/data/data-templates",
            "/docs/concepts/templates/",
        ],
        "to": "/docs/data-templates/introduction-to-data-templates"
    },
    {
        "from": "/docs/concepts/templates/reusing-data-templates",
        "to": "/docs/data-templates/reusing-data-templates"
    },
    {
        "from": [
            "/docs/getting-started/application-lifetimes",
            "/docs/concepts/application-lifetimes",
        ],
        "to": "/docs/fundamentals/application-lifetimes"
    },
    {
        "from": [
            "/docs/data-binding/creating-and-binding-attached-properties",
            "/docs/concepts/attached-property",
        ],
        "to": "/docs/custom-controls/attached-properties"
    },
    {
        "from": "/docs/concepts/control-trees",
        "to": "/docs/custom-controls/control-trees"
    },
    {
        "from": "/docs/concepts/custom-itemspanel",
        "to": "/docs/custom-controls/custom-itemspanel"
    },
    {
        "from": "/docs/concepts/templates/data-templates",
        "to": "/docs/data-templates/control-content"
    },
    {
        "from": "/docs/concepts/templates/content-template",
        "to": "/docs/data-templates/content-templates"
    },
    {
        "from": "/docs/concepts/templates/data-templates-collection",
        "to": "/docs/data-templates/data-template-collection"
    },
    {
        "from": [
            "/docs/concepts/templates/creating-data-templates-in-code",
            "/docs/concepts/templates/implement-idatatemplate",
        ],
        "to": "/docs/data-templates/creating-data-templates-in-code"
    },
    {
        "from": "/docs/concepts/view-locator",
        "to": "/docs/data-templates/view-locator"
    },
    {
        "from": [
            "/docs/concepts/headless/",
            "/docs/concepts/headless/headless-custom",
        ],
        "to": "/docs/testing/setting-up-the-headless-platform"
    },
    {
        "from": "/docs/concepts/headless/headless-xunit",
        "to": "/docs/testing/headless-xunit"
    },
    {
        "from": "/docs/concepts/headless/headless-nunit",
        "to": "/docs/testing/headless-nunit"
    },
    {
        "from": "/docs/concepts/the-main-window",
        "to": "/docs/fundamentals/main-window"
    },
    {
        "from": [
            "/docs/input/",
            "/docs/input/pointer",
            "/docs/concepts/input/",
            "/concepts/ui-concepts/user-input/index",
            "/docs/concepts/input/pointer",
        ],
        "to": "/docs/input-interaction/pointer"
    },
    {
        "from": [
            "/docs/input/hotkeys",
            "/docs/concepts/input/hotkeys"
        ],
        "to": "/docs/input-interaction/keyboard-and-hotkeys"
    },
    {
        "from": "/docs/concepts/input/focus",
        "to": "/docs/input-interaction/focus"
    },
    {
        "from": "/docs/concepts/input/gestures",
        "to": "/docs/input-interaction/gestures"
    },
    {
        "from": [
            "/docs/input/routed-events",
            "/docs/concepts/input/routed-events",
        ],
        "to": "/docs/input-interaction/routed-events"
    },
    {
        "from": [
            "/docs/concepts/input/binding-key-and-mouse",
            "/concepts/ui-concepts/user-input/binding-key-and-mouse"
        ],
        "to": "/docs/input-interaction/mouse-and-keyboard-shortcuts"
    },
    {
        "from": [
            "/docs/concepts/markupextensions/",
            "/docs/concepts/markupextensions/options-markup-extensions"
        ],
        "to": "/docs/data-binding/markup-extensions"
    },
    {
        "from": [
            "/docs/concepts/reactiveui/",
            "/docs/app-development/reactiveui/index",
            "/docs/concepts/reactiveui/reactive-view-model",
            "/docs/concepts/reactiveui/routing",
            "/docs/concepts/reactiveui/view-activation",
            "/docs/concepts/the-mvvm-pattern/",
        ],
        "to": "/docs/fundamentals/the-mvvm-pattern"
    },
    {
        "from": [
            "/docs/concepts/services/storage-provider/",
            "/reference/services/storage/index"
        ],
        "to": "/docs/services/storage/storage-provider"
    },
    {
        "from": "/docs/concepts/services/clipboard",
        "to": "/docs/services/clipboard"
    },
    {
        "from": "/docs/concepts/image-interpolation",
        "to": "/docs/graphics-animation/image-interpolation"
    },
    {
        "from": "/docs/concepts/blend-modes",
        "to": "/docs/graphics-animation/bitmap-blend-modes"
    },
    {
        "from": "/docs/concepts/toplevel",
        "to": "/docs/fundamentals/top-level"
    },
    {
        "from": "/docs/concepts/ui-composition",
        "to": "/docs/fundamentals/ui-composition"
    },
    {
        "from": [
            "/docs/getting-started/UnhandledExceptions",
            "/docs/getting-started/unhandled-exceptions",
            "/docs/concepts/unhandledexceptions",
        ],
        "to": "/docs/app-development/setting-unhandled-exceptions"
    },
    {
        "from": "/docs/reference/gestures/pinchgesturerecognizer",
        "to": "/docs/input-interaction/gestures/pinch-gesture-recognizer"
    },
    {
        "from": "/docs/reference/gestures/pullgesturerecognizer",
        "to": "/docs/input-interaction/gestures/pull-gesture-recognizer"
    },
    {
        "from": "/docs/reference/gestures/scrollgesturerecognizer",
        "to": "/docs/input-interaction/gestures/scroll-gesture-recognizer"
    },
    {
        "from": "/docs/reference/properties/texttrimming",
        "to": "/controls/data-display/text-display/texttrimming"
    },
    {
        "from": "/docs/reference/styles/pseudo-classes",
        "to": "/docs/styling/pseudoclasses"
    },
    {
        "from": "/docs/reference/styles/style-selector-syntax",
        "to": "/docs/styling/style-selector-syntax"
    },
    {
        "from": "/accelerate/welcome",
        "to": "/tools"
    },
    {
        "from": "/accelerate/installation",
        "to": "/tools/installing-accelerate"
    },
    {
        "from": "/accelerate/community",
        "to": "/tools/community-edition"
    },
    {
        "from": "/accelerate/components/media-player/quickstart",
        "to": "/controls/media/media-playback"
    },
    {
        "from": "/accelerate/components/media-player/mediaplayercontrol",
        "to": "/controls/media/mediaplayercontrol"
    },
    {
        "from": "/accelerate/components/media-player/mediaplayer",
        "to": "/controls/media/mediaplayer"
    },
    {
        "from": "/accelerate/components/media-player/mediasource",
        "to": "/controls/media/mediasource"
    },
    {
        "from": [
            "/accelerate/components/markdown/quickstart",
            "/accelerate/components/markdown/markdown",
            "/accelerate/components/markdown/",
            "/accelerate/components/markdown/example",
        ],
        "to": "/controls/data-display/text-display/markdown"
    },
    {
        "from": "/accelerate/components/markdown/custom-image-loader",
        "to": "/controls/data-display/text-display/imageloader"
    },
    {
        "from": "/accelerate/components/markdown/code-highlighter",
        "to": "/controls/data-display/text-display/codehighlighter"
    },
    {
        "from": "/accelerate/components/markdown/styling",
        "to": "/controls/data-display/text-display/markdown-styling"
    },
    {
        "from": "/accelerate/components/virtual-keyboard/getting-started",
        "to": "/docs/platform-specific-guides/embedded-linux/virtual-keyboard"
    },
    {
        "from": "/docs/platform-specific-guides/virtual-keyboard",
        "to": "/docs/platform-specific-guides/embedded-linux/virtual-keyboard"
    },
    {
        "from": "/docs/platform-specific-guides/raspberry-pi",
        "to": "/docs/platform-specific-guides/embedded-linux/raspberry-pi"
    },
    {
        "from": "/accelerate/components/virtual-keyboard/virtual-keyboard-scope",
        "to": "/controls/layout/containers/virtualkeyboardscope"
    },
    {
        "from": [
            "/accelerate/components/virtual-keyboard/",
            "/accelerate/components/virtual-keyboard/virtual-keyboard",
            "/accelerate/components/virtual-keyboard/styling",
            "/accelerate/components/virtual-keyboard/input-method-identifiers"
        ],
        "to": "/controls/input/text-input/virtualkeyboard"
    },
    {
        "from": [
            "/accelerate/components/webview/quickstart",
            "/accelerate/components/webview/interop/native-browser-interop",
            "/xpf/embedding/web-view"
        ],
        "to": "/docs/app-development/embedding-web-content"
    },
    {
        "from": "/accelerate/components/webview/nativewebview",
        "to": "/controls/web/nativewebview"
    },
    {
        "from": "/accelerate/components/webview/nativewebdialog",
        "to": "/controls/web/nativewebdialog"
    },
    {
        "from": "/accelerate/components/webview/webauthenticationbroker",
        "to": "/controls/web/webauthenticationbroker"
    },
    {
        "from": "/accelerate/components/webview/interop/environment-options",
        "to": "/controls/web/webview-environment"
    },
    {
        "from": [
            "/accelerate/components/webview/faq",
            "/accelerate/components/treedatagrid/faq",
            "/accelerate/tools/dev-tools/faq",
        ],
        "to": "/tools/faq"
    },
    {
        "from": "/accelerate/components/treedatagrid/column-types",
        "to": "/controls/data-display/structured-data/treedatagrid/column-types"
    },
    {
        "from": "/accelerate/components/treedatagrid/selection",
        "to": "/controls/data-display/structured-data/treedatagrid/selection-modes"
    },
    {
        "from": "/accelerate/components/treedatagrid/expanding-collapsing",
        "to": "/controls/data-display/structured-data/treedatagrid/expand-and-collapse"
    },
    {
        "from": "/accelerate/components/treedatagrid/sorting",
        "to": "/controls/data-display/structured-data/treedatagrid/sorting"
    },
    {
        "from": "/accelerate/components/treedatagrid/filtering",
        "to": "/controls/data-display/structured-data/treedatagrid/filtering"
    },
    {
        "from": "/accelerate/tools/dev-tools/getting-started",
        "to": "/tools/developer-tools/installation"
    },
    {
        "from": "/accelerate/tools/dev-tools/settings",
        "to": "/tools/developer-tools/settings"
    },
    {
        "from": "/accelerate/tools/dev-tools/shortcuts",
        "to": "/tools/developer-tools/shortcuts"
    },
    {
        "from": "/accelerate/tools/dev-tools/tools/assets",
        "to": "/tools/developer-tools/assets-tool"
    },
    {
        "from": "/accelerate/tools/dev-tools/tools/resources",
        "to": "/tools/developer-tools/resources-tool"
    },
    {
        "from": [
            "/accelerate/tools/dev-tools/tools/elements/",
            "/accelerate/tools/dev-tools/tools/elements/elements",
            "/accelerate/tools/dev-tools/tools/elements/properties",
            "/accelerate/tools/dev-tools/tools/elements/overlay",
            "/accelerate/tools/dev-tools/tools/elements/3d-viewer"
        ],
        "to": "/tools/developer-tools/elements-tool"
    },
    {
        "from": "/accelerate/tools/dev-tools/tools/logs",
        "to": "/tools/developer-tools/logs-tool"
    },
    {
        "from": "/accelerate/tools/dev-tools/tools/events",
        "to": "/tools/developer-tools/events-tool"
    },
    {
        "from": "/accelerate/tools/dev-tools/tools/breakpoints",
        "to": "/tools/developer-tools/breakpoints-tool"
    },
    {
        "from": "/accelerate/tools/dev-tools/tools/metrics",
        "to": "/tools/developer-tools/metrics-tool"
    },
    {
        "from": "/accelerate/tools/dev-tools/tools/profiler",
        "to": "/tools/developer-tools/profiler-tool"
    },
    {
        "from": "/accelerate/tools/dev-tools/advanced/options-reference",
        "to": "/tools/developer-tools/options"
    },
    {
        "from": "/accelerate/tools/dev-tools/reporting-issues",
        "to": "/troubleshooting/tools/developer-tools"
    },
    {
        "from": "/accelerate/tools/dev-tools/mcp",
        "to": "/tools/developer-tools/mcp"
    },
    {
        "from": "/accelerate/tools/dev-tools/advanced/attaching-to-the-previewer",
        "to": "/tools/developer-tools/attaching-to-the-previewer"
    },
    {
        "from": "/accelerate/tools/dev-tools/advanced/attaching-to-the-remote-tool",
        "to": "/tools/developer-tools/attaching-to-the-remote-tool"
    },
    {
        "from": [
            "/accelerate/tools/dev-tools/advanced/attaching-wsl",
            "/accelerate/tools/dev-tools/advanced/attaching-browser-or-mobile"
        ],
        "to": "/tools/developer-tools/attaching-applications"
    },
    {
        "from": "/xpf/welcome",
        "to": "/xpf"
    },
    {
        "from": "/xpf/porting-tips",
        "to": "/xpf/getting-started"
    },
    {
        "from": "/xpf/build-feeds",
        "to": "/xpf/version-info/versioning"
    },
    {
        "from": "/xpf/missing-features",
        "to": "/xpf/version-info/missing-features"
    },
    {
        "from": [
            "/xpf/embedding/avalonia-in-xpf/embedding-avalonia-controls-in-XPF",
            "/xpf/embedding/avalonia-in-xpf/adding-style-to-avalonia-control-in-xpf",
            "/xpf/embedding/avalonia-in-xpf/adding-global-style-for-avalonia-controls-in-XPF",
            "/xpf/advanced/avalonia-interop",
        ],
        "to": "/xpf/interop/embedding-avalonia-in-xpf"
    },
    {
        "from": "/xpf/embedding/xpf-in-avalonia",
        "to": "/xpf/interop/using-xpf-in-avalonia"
    },
    {
        "from": "/xpf/advanced/centralized-management",
        "to": "/xpf/configuration/centralizing-multiple-xpf-projects"
    },
    {
        "from": "/xpf/advanced/customizing-init",
        "to": "/xpf/configuration/customizing-initialization"
    },
    {
        "from": "/xpf/advanced/customizing-window-decorations",
        "to": "/xpf/migration/removing-the-titlebar"
    },
    {
        "from": "/xpf/advanced/headless-testing",
        "to": "/xpf/testing/headless-testing"
    },
    {
        "from": "/xpf/advanced/key-mapping",
        "to": "/xpf/migration/key-mapping"
    },
    {
        "from": "/xpf/advanced/window-handles",
        "to": "/xpf/interop/native-window-handles"
    },
    {
        "from": "/xpf/third-party-libraries",
        "to": "/xpf/third-party/compatibility"
    },
    {
        "from": "/xpf/troubleshooting",
        "to": "/xpf/troubleshooting"
    },
    {
        "from": [
            "/accelerate/tools/vs-extension/getting-started",
            "/accelerate/tools/vs-extension/settings"
        ],
        "to": "/tools/visual-studio-extension"
    },
    {
        "from": [
            "/docs/distribution-publishing/",
            "/accelerate/tools/parcel/getting-started",
        ],
        "to": "/tools/parcel/setup"
    },
    {
        "from": "/accelerate/tools/parcel/cli-reference",
        "to": "/tools/parcel/command-line-reference"
    },
    {
        "from": "/accelerate/tools/parcel/mcp",
        "to": "/tools/parcel/mcp"
    },
    {
        "from": [
            "/docs/distribution-publishing/macos",
            "/accelerate/tools/parcel/apple/",
            "/accelerate/tools/parcel/guies/apple-notary",
            "/accelerate/tools/parcel/guies/apple-signing",
            "/accelerate/tools/parcel/apple/packaging",
            "/accelerate/tools/parcel/apple/signing",
            "/accelerate/tools/parcel/apple/notary",
            "/accelerate/tools/parcel/apple/index",
        ],
        "to": "/tools/parcel/packaging-for-macos"
    },
    {
        "from": [
            "/accelerate/tools/parcel/windows/",
            "/accelerate/tools/parcel/windows/signing",
            "/accelerate/tools/parcel/windows/installer",
            "/accelerate/tools/parcel/windows/index",
        ],
        "to": "/tools/parcel/packaging-for-windows"
    },
    {
        "from": [
            "/accelerate/tools/parcel/linux/",
            "/accelerate/tools/parcel/linux/packaging",
            "/accelerate/tools/parcel/linux/index",
        ],
        "to": "/tools/parcel/packaging-for-linux"
    },
];

export const v12_docs_redirects = { createRedirects, redirects };
