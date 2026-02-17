interface Redirect {
  to: string;
  from: string | string[];
}

function createRedirects(existingPath: string): string[] | undefined {
    if (existingPath.includes('/docs/')) {
        const redirects: string[] = [];

        // Using whole-folder redirect for folders that are mostly unchanged
        const v12_redirect = existingPath
            .replace('/docs/guides/data-binding/', '/docs/data/')
            .replace('/docs/basics/user-interface/controls/creating-controls/', '/docs/ui-development/custom-controls/')
            .replace('/docs/basics/data/data-binding/', '/concepts/data-concepts/data-binding/')
            .replace('/docs/concepts/input/', '/concepts/ui-concepts/user-input/')
            .replace('/docs/concepts/reactiveui/', '/docs/app-development/reactiveui/')
            .replace('/docs/concepts/services/', '/reference/services/')
            .replace('/docs/concepts/services/storage-provider/', '/reference/services/storage/');
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
            "/docs/overview/what-is-avalonia",
            "/docs/guides/index",
            "/docs/guides/implementation-guides/index",
            "/docs/guides/development-guides/how-to-implement-multi-page-apps",
            "/docs/guides/development-guides/how-to-show-and-hide-a-split-view-pane-with-mvvm",
            "/docs/guides/platforms/android/index",
            "/docs/deployment/index",
            "/docs/stay-up-to-date/index",
            "/docs/stay-up-to-date/breaking-changes",
            "/docs/stay-up-to-date/upgrade-from-0.10",
            "/docs/stay-up-to-date/whats-new"
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
        ],
        "to": "/docs/ui-development/xaml-previewer"
    },
    {
        "from": "/docs/guides/implementation-guides/how-to-implement-dependency-injection",
        "to": "/docs/app-development/dependency-injection"
    },
    {
        "from": [
            "/docs/guides/implementation-guides/using-avalonia-with-mvvm-frameworks",
            "/docs/concepts/the-mvvm-pattern/index",
            "/docs/concepts/the-mvvm-pattern/avalonia-ui-and-mvvm"
        ],
        "to": "/concepts/architecture/the-mvvm-pattern"
    },
    {
        "from": [
            "/docs/guides/building-cross-platform-applications/architecture",
            "/docs/guides/building-cross-platform-applications/dealing-with-platforms",
            "/docs/guides/building-cross-platform-applications/index",
        ],
        "to": "/concepts/architecture/cross-platform-architecture"
    },
    {
        "from": "/docs/guides/building-cross-platform-applications/solution-setup",
        "to": "/docs/app-development/cross-platform-solution-setup"
    },
    {
        "from": "/docs/guides/implementation-guides/developer-tools",
        "to": "/docs/development-optimization/legacy-developer-tools"
    },
    {
        "from": "/docs/guides/implementation-guides/logging-errors-and-warnings",
        "to": "/docs/app-development/logging-errors-and-warnings"
    },
    {
        "from": "/docs/guides/implementation-guides/localizing",
        "to": "/docs/app-development/localizing"
    },
    {
        "from": [
            "/docs/guides/data/how-to-bind-to-a-command-with-reactiveui",
            "/docs/guides/data-binding/how-to-bind-to-a-command-without-reactiveui"
        ],
        "to": "/docs/app-development/reactiveui/binding-commands"
    },
    {
        "from": "/docs/guides/styles-and-resources/selectors",
        "to": "/reference/styles/style-selectors"
    },
    {
        "from": [
            "/docs/guides/styles-and-resources/property-setters",
            "/docs/guides/styles-and-resources/setter-precedence"
        ],
        "to": "/reference/styles/property-setters"
    },
    {
        "from": "/docs/guides/styles-and-resources/how-to-use-included-styles",
        "to": "/docs/ui-development/styling/sharing-styles"
    },
    {
        "from": "/docs/guides/styles-and-resources/resources",
        "to": "/docs/ui-development/resource-dictionary"
    },
    {
        "from": "/docs/guides/styles-and-resources/how-to-use-theme-variants",
        "to": "/docs/ui-development/styling/theme-variants"
    },
    {
        "from": "/docs/guides/styles-and-resources/how-to-use-fonts",
        "to": "/docs/ui-development/styling/custom-fonts"
    },
    {
        "from": "/docs/guides/graphics-and-animation/graphics-and-animations",
        "to": "/docs/ui-development/graphics/drawing-graphics"
    },
    {
        "from": [
            "/docs/guides/graphics-and-animation/how-to-add-menu-icons",
            "/docs/guides/graphics-and-animation/how-to-use-icons"
        ],
        "to": "/docs/ui-development/graphics/adding-icons"
    },
    {
        "from": "/docs/guides/graphics-and-animation/keyframe-animations",
        "to": "/docs/ui-development/graphics/keyframe-animations"
    },
    {
        "from": "/docs/guides/ui-development/graphics/transitions",
        "to": "/docs/ui-development/graphics/control-transitions"
    },
    {
        "from": "/docs/guides/graphics-and-animation/gradients",
        "to": "/docs/ui-development/graphics/gradients"
    },
    {
        "from": [
            "/docs/guides/graphics-and-animation/page-transitions/cross-fade-page-transition",
            "/docs/guides/graphics-and-animation/page-transitions/page-slide-transition",
            "/docs/guides/graphics-and-animation/page-transitions/page-transition-combinations",
            "/docs/guides/graphics-and-animation/page-transitions/how-to-create-a-custom-page-transition"
        ],
        "to": "/docs/ui-development/graphics/page-transitions"
    },
    {
        "from": [
            "/docs/guides/custom-controls/index",
            "/docs/guides/custom-controls/types-of-control",
            "/docs/guides/custom-controls/how-to-create-advanced-custom-controls",
            "/docs/basics/user-interface/controls/creating-controls/index",
            "/docs/ui-development/custom-controls/index",
            "/docs/concepts/templated-controls",
        ],
        "to": "/docs/ui-development/custom-controls/creating-custom-controls"
    },
    {
        "from": "/docs/guides/custom-controls/create-a-custom-panel",
        "to": "/docs/ui-development/custom-controls/custom-panel"
    },
    {
        "from": "/docs/guides/custom-controls/defining-properties",
        "to": "/docs/ui-development/custom-controls/defining-properties"
    },
    {
        "from": "/docs/guides/custom-controls/draw-with-a-property",
        "to": "/docs/ui-development/custom-controls/drawing-custom-controls"
    },
    {
        "from": "/docs/guides/custom-controls/how-to-create-a-custom-controls-library",
        "to": "/docs/ui-development/custom-controls/custom-control-library"
    },
    {
        "from": "/docs/guides/custom-controls/how-to-create-a-custom-flyout",
        "to": "/docs/ui-development/custom-controls/custom-flyout"
    },
    {
        "from": "/docs/guides/custom-controls/how-to-create-attached-properties",
        "to": "/docs/ui-development/custom-controls/attached-properties"
    },
    {
        "from": "/docs/guides/custom-controls/how-to-create-templated-controls",
        "to": "/docs/ui-development/custom-controls/templated-controls"
    },
    {
        "from": "/docs/guides/custom-controls/add-custom-control-class",
        "to": "/docs/ui-development/custom-controls/custom-control-class"
    },
    {
        "from": "/docs/guides/development-guides/accessing-the-ui-thread",
        "to": "/docs/development-optimization/accessing-the-ui-thread"
    },
    {
        "from": "/docs/guides/development-guides/data-validation",
        "to": "/docs/data/data-validation"
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
        "to": "/docs/platform-specific-guides/winforms"
    },
    {
        "from": "/docs/guides/platforms/how-to-use-web-assembly",
        "to": "/docs/platform-specific-guides/webassembly"
    },
    {
        "from": "/docs/guides/platforms/macos-development",
        "to": "/docs/platform-specific-guides/macos"
    },
    {
        "from": [
            "/docs/guides/platforms/rpi/running-your-app-on-a-raspberry-pi",
            "/docs/guides/platforms/rpi/running-on-raspbian-lite-via-drm"
        ],
        "to": "/docs/platform-specific-guides/raspberry-pi"
    },
    {
        "from": [
            "/docs/guides/platforms/ios/index",
            "/docs/guides/platforms/ios/setting-up-your-developer-environment-for-ios",
            "/docs/guides/platforms/ios/build-and-run-your-application-on-your-iphone-or-ipad",
            "/docs/guides/platforms/ios/build-and-run-your-application-on-a-simulator"
        ],
        "to": "/docs/platform-specific-guides/ios"
    },
    {
        "from": [
            "/docs/guides/platforms/android/index",
            "/docs/guides/platforms/android/build-and-run-your-application-on-a-device",
            "/docs/guides/platforms/android/build-and-run-your-application-on-a-simulator",
            "/docs/guides/platforms/android/setting-up-your-developer-environment-for-android"
        ],
        "to": "/docs/platform-specific-guides/android/android"
    },
    {
        "from": "/docs/guides/platforms/android/configure-vscode-debug-linux",
        "to": "/docs/platform-specific-guides/android/configure-vscode-debug-linux"
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
        "to": "/docs/platform-specific-guides/linux"
    },
    {
        "from": [
            "/docs/get-started/wpf/index",
            "/docs/get-started/wpf/comparison-of-avalonia-with-wpf-and-uwp"
        ],
        "to": "/docs/migration/wpf/migrating-from-wpf"
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
            "/docs/reference/controls/index",
            "/docs/reference/controls/repeating-data-controls",
            "/docs/reference/controls/text-controls",
            "/docs/reference/controls/buttons",
            "/docs/reference/controls/value-selector-controls",
            "/docs/reference/controls/layout-controls",
            "/docs/reference/controls/image-controls",
            "/docs/reference/controls/menu-controls",
            "/docs/reference/controls/popup-controls",
            "/docs/basics/user-interface/controls/index",
            "/docs/basics/user-interface/controls/builtin-controls",
            "/docs/basics/user-interface/building-layouts/panels-overview"
        ],
        "to": "/controls/index"
    },
    {
        "from": "/docs/reference/animation-settings",
        "to": "/reference/animations-and-graphics/animation-settings"
    },
    {
        "from": [
            "/docs/reference/index",
            "/docs/concepts/services/index",
            "/docs/reference/gestures/",
            "/docs/reference/properties/index",
            "/docs/reference/styles/index",
        ],
        "to": "/reference/index"
    },
    {
        "from": "/docs/reference/built-in-data-binding-converters",
        "to": "/reference/data/built-in-data-binding-converters"
    },
    {
        "from": "/docs/reference/controls/autocompletebox",
        "to": "/controls/input/text-input/autocompletebox"
    },
    {
        "from": "/docs/reference/controls/border",
        "to": "/controls/layout/containers/border"
    },
    {
        "from": "/docs/reference/controls/buttons/button",
        "to": "/controls/input/buttons/button"
    },
    {
        "from": "/docs/reference/controls/buttons/buttonspinner",
        "to": "/controls/input/buttons/buttonspinner"
    },
    {
        "from": "/docs/reference/controls/buttons/radiobutton",
        "to": "/controls/input/buttons/radiobutton"
    },
    {
        "from": "/docs/reference/controls/buttons/repeatbutton",
        "to": "/controls/input/buttons/repeatbutton"
    },
    {
        "from": "/docs/reference/controls/buttons/splitbutton",
        "to": "/controls/input/buttons/splitbutton"
    },
    {
        "from": "/docs/reference/controls/buttons/togglebutton",
        "to": "/controls/input/buttons/togglebutton"
    },
    {
        "from": "/docs/reference/controls/buttons/togglesplitbutton",
        "to": "/controls/input/buttons/togglesplitbutton"
    },
    {
        "from": "/docs/reference/controls/calendar",
        "to": "/controls/input/date-and-time/calendar"
    },
    {
        "from": "/docs/reference/controls/calendar-date-picker",
        "to": "/controls/input/date-and-time/calendardatepicker"
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
        "from": "/docs/reference/controls/colorview",
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
        "from": "/docs/reference/controls/drawing-image",
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
        "from": "/docs/reference/controls/label",
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
        "from": "/docs/reference/controls/menu-flyout",
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
        "from": "/docs/reference/controls/path-icon",
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
        "from": "/docs/reference/controls/selectable-textblock",
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
        "from": "/docs/reference/controls/tabcontrol",
        "to": "/controls/navigation/tabcontrol"
    },
    {
        "from": "/docs/reference/controls/tabstrip",
        "to": "/controls/navigation/tabstrip"
    },
    {
        "from": "/docs/reference/controls/textblock",
        "to": "/controls/data-display/text-display/textblock"
    },
    {
        "from": "/docs/reference/controls/textbox",
        "to": "/controls/input/text-input/textbox"
    },
    {
        "from": "/docs/reference/controls/timepicker",
        "to": "/controls/input/date-and-time/timepicker"
    },
    {
        "from": "/docs/reference/controls/tooltip",
        "to": "/controls/feedback/tooltip"
    },
    {
        "from": "/docs/reference/controls/transitioningcontentcontrol",
        "to": "/controls/data-display/transitioningcontentcontrol"
    },
    {
        "from": "/docs/reference/controls/tray-icon",
        "to": "/controls/navigation/trayicon"
    },
    {
        "from": [
            "/docs/reference/controls/treedatagrid/index",
            "/docs/reference/controls/treedatagrid/creating-a-flat-treedatagrid",
            "/docs/reference/controls/treedatagrid/creating-a-hierarchical-treedatagrid",
            "/docs/reference/controls/treedatagrid/treedatagrid-column-types",
            "/accelerate/components/treedatagrid/quickstart",
            "/accelerate/components/treedatagrid/quickstart-flat",
            "/accelerate/components/treedatagrid/quickstart-hierarchical",
        ],
        "to": "/controls/data-display/structured-data/treedatagrid/index"
    },
    {
        "from": "/docs/reference/controls/treeview-1",
        "to": "/controls/data-display/structured-data/treeview"
    },
    {
        "from": "/docs/reference/controls/uniform-grid",
        "to": "/controls/layout/panels/uniformgrid"
    },
    {
        "from": "/docs/reference/controls/usercontrol",
        "to": "/controls/primitives/usercontrol"
    },
    {
        "from": "/docs/reference/controls/viewbox",
        "to": "/controls/layout/containers/viewbox"
    },
    {
        "from": "/docs/reference/controls/window",
        "to": "/controls/primitives/window"
    },
    {
        "from": "/docs/reference/controls/wrappanel",
        "to": "/controls/layout/panels/wrappanel"
    },
    {
        "from": "/docs/tutorials/samples",
        "to": "/samples/index"
    },
    {
        "from": [
            "/docs/concepts/index",
            "/docs/basics/index",
        ],
        "to": "/concepts/index"
    },
    {
        "from": "/docs/basics/user-interface/introduction-to-xaml",
        "to": "/concepts/core-concepts/avalonia-xaml"
    },
    {
        "from": [
            "/docs/basics/user-interface/code-behind",
            "/docs/guides/implementation-guides/code-behind"
        ],
        "to": "/concepts/core-concepts/code-behind"
    },
    {
        "from": [
            "/docs/basics/user-interface/controls/creating-controls/control-themes",
            "/docs/ui-development/custom-controls/control-themes"
        ],
        "to": "/concepts/ui-concepts/styling/control-themes"
    },
    {
        "from": [
            "/docs/basics/user-interface/building-layouts/index",
            "/docs/concepts/layout/layout-zones"
        ],
        "to": "/concepts/ui-concepts/layout"
    },
    {
        "from": "/docs/basics/user-interface/building-layouts/alignment-margins-and-padding",
        "to": "/reference/properties/positioning"
    },
    {
        "from": [
            "/docs/basics/user-interface/styling/index",
            "/docs/basics/user-interface/styling/styles"
        ],
        "to": "/concepts/ui-concepts/styling/styles"
    },
    {
        "from": "/docs/basics/user-interface/styling/style-classes",
        "to": "/concepts/ui-concepts/styling/style-classes"
    },
    {
        "from": "/docs/basics/user-interface/styling/control-themes",
        "to": "/concepts/ui-concepts/styling/control-themes"
    },
    {
        "from": "/docs/basics/user-interface/styling/container-queries",
        "to": "/concepts/ui-concepts/styling/container-queries"
    },
    {
        "from": [
            "/docs/basics/user-interface/styling/themes/index",
            "/docs/basics/user-interface/styling/themes/fluent",
            "/docs/basics/user-interface/styling/themes/simple"
        ],
        "to": "/concepts/ui-concepts/styling/themes"
    },
    {
        "from": "/docs/basics/user-interface/styling/troubleshooting",
        "to": "/troubleshooting/ui-development/themes"
    },
    {
        "from": "/docs/basics/user-interface/adding-interactivity",
        "to": "/docs/ui-development/adding-interactivity"
    },
    {
        "from": "/docs/basics/user-interface/assets",
        "to": "/concepts/ui-concepts/assets"
    },
    {
        "from": "/docs/basics/user-interface/animations",
        "to": "/concepts/ui-concepts/animations"
    },
    {
        "from": "/docs/basics/user-interface/file-dialogs",
        "to": "/concepts/ui-concepts/file-dialogs"
    },
    {
        "from": "/docs/basics/user-interface/multi-touch",
        "to": "/docs/platform-specific-guides/multi-touch-events"
    },
    {
        "from": "/docs/basics/user-interface/messagebox",
        "to": "/troubleshooting/controls/messagebox"
    },
    {
        "from": "/docs/tutorials/groupbox",
        "to": "/troubleshooting/controls/groupbox"
    },
    {
        "from": [
            "/docs/basics/data/data-binding/index",
            "/concepts/data-concepts/data-binding/index"
        ],
        "to": "/concepts/data-concepts/data-binding/introduction-to-data-binding"
    },
    {
        "from": [
            "/docs/basics/data/data-templates",
            "/docs/concepts/templates/index",
        ],
        "to": "/concepts/data-concepts/data-templates/introduction-to-data-templates"
    },
    {
        "from": "/docs/concepts/application-lifetimes",
        "to": "/concepts/platform-concepts/application-lifetimes"
    },
    {
        "from": "/docs/concepts/attached-property",
        "to": "/concepts/ui-concepts/controls/attached-properties"
    },
    {
        "from": "/docs/concepts/control-trees",
        "to": "/concepts/ui-concepts/controls/control-trees"
    },
    {
        "from": "/docs/concepts/custom-itemspanel",
        "to": "/docs/ui-development/custom-controls/custom-itemspanel"
    },
    {
        "from": "/docs/concepts/templates/data-templates",
        "to": "/concepts/data-concepts/data-templates/control-content"
    },
    {
        "from": "/docs/concepts/templates/content-template",
        "to": "/concepts/data-concepts/data-templates/content-templates"
    },
    {
        "from": "/docs/concepts/templates/data-templates-collection",
        "to": "/concepts/data-concepts/data-templates/data-template-collection"
    },
    {
        "from": [
            "/docs/concepts/templates/creating-data-templates-in-code",
            "/docs/concepts/templates/implement-idatatemplate",
        ],
        "to": "/docs/data/data-templates/creating-data-templates-in-code"
    },
    {
        "from": "/docs/concepts/view-locator",
        "to": "/docs/data/data-templates/view-locator"
    },
    {
        "from": [
            "/docs/concepts/headless/index",
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
        "to": "/concepts/core-concepts/main-window"
    },
    {
        "from": [
            "/docs/concepts/input/index",
            "/concepts/ui-concepts/user-input/index",
            "/docs/concepts/input/pointer",
        ],
        "to": "/concepts/ui-concepts/user-input/pointer"
    },
    {
        "from": [
            "/docs/concepts/input/binding-key-and-mouse",
            "/concepts/ui-concepts/user-input/binding-key-and-mouse"
        ],
        "to": "/docs/ui-development/mouse-and-keyboard-shortcuts"
    },
    {
        "from": [
            "/docs/concepts/markupextensions/index",
            "/docs/concepts/markupextensions/options-markup-extensions"
        ],
        "to": "/concepts/data-concepts/markup-extensions"
    },
    {
        "from": [
            "/docs/concepts/reactiveui/index",
            "/docs/app-development/reactiveui/index"
        ],
        "to": "/docs/app-development/reactiveui/setting-up-reactiveui"
    },
    {
        "from": [
            "/docs/concepts/services/storage-provider/index",
            "/reference/services/storage/index"
        ],
        "to": "/reference/services/storage/storage-provider"
    },
    {
        "from": "/docs/concepts/image-interpolation",
        "to": "/concepts/ui-concepts/image-interpolation"
    },
    {
        "from": "/docs/concepts/blend-modes",
        "to": "/reference/animations-and-graphics/bitmap-blend-modes"
    },
    {
        "from": "/docs/concepts/toplevel",
        "to": "/concepts/core-concepts/top-level"
    },
    {
        "from": "/docs/concepts/ui-composition",
        "to": "/concepts/core-concepts/ui-composition"
    },
    {
        "from": "/docs/concepts/unhandledexceptions",
        "to": "/docs/app-development/setting-unhandled-exceptions"
    },
    {
        "from": "/docs/reference/gestures/pinchgesturerecognizer",
        "to": "/reference/gestures/pinch-gesture-recognizer"
    },
    {
        "from": "/docs/reference/gestures/pullgesturerecognizer",
        "to": "/reference/gestures/pull-gesture-recognizer"
    },
    {
        "from": "/docs/reference/gestures/scrollgesturerecognizer",
        "to": "/reference/gestures/scroll-gesture-recognizer"
    },
    {
        "from": "/docs/reference/properties/texttrimming",
        "to": "/reference/properties/texttrimming"
    },
    {
        "from": "/docs/reference/styles/pseudo-classes",
        "to": "/reference/styles/pseudoclasses"
    },
    {
        "from": "/docs/reference/styles/style-selector-syntax",
        "to": "/reference/styles/style-selector-syntax"
    },
    {
        "from": "/accelerate/welcome",
        "to": "/tools/index"
    },
    {
        "from": "/accelerate/installation",
        "to": "/docs/development-optimization/installing-accelerate"
    },
    {
        "from": "/accelerate/community",
        "to": "/tools/community-edition"
    },
    {
        "from": "/accelerate/components/media-player/quickstart",
        "to": "/docs/guides/media/media-playback"
    },
    {
        "from": "/accelerate/components/media-player/mediaplayercontrol",
        "to": "/controls/media/mediaplayercontrol"
    },
    {
        "from": "/accelerate/components/media-player/mediaplayer",
        "to": "/reference/classes/mediaplayer"
    },
    {
        "from": "/accelerate/components/media-player/mediasource",
        "to": "/reference/classes/mediasource"
    },
    {
        "from": "/accelerate/components/markdown/quickstart",
        "to": "/docs/ui-development/rendering-markdown"
    },
    {
        "from": "/accelerate/components/markdown/markdown",
        "to": "/controls/data-display/text-display/markdown"
    },
    {
        "from": "/accelerate/components/markdown/custom-image-loader",
        "to": "/reference/properties/imageloader"
    },
    {
        "from": "/accelerate/components/markdown/code-highlighter",
        "to": "/reference/properties/codehighlighter"
    },
    {
        "from": "/accelerate/components/markdown/styling",
        "to": "/reference/styles/markdown-styling"
    },
    {
        "from": "/accelerate/components/virtual-keyboard/getting-started",
        "to": "/docs/platform-specific-guides/virtual-keyboard"
    },
    {
        "from": "/accelerate/components/virtual-keyboard/virtual-keyboard-scope",
        "to": "/controls/layout/containers/virtualkeyboardscope"
    },
    {
        "from": [
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
        "to": "/reference/classes/webauthenticationbroker"
    },
    {
        "from": "/accelerate/components/webview/interop/environment-options",
        "to": "/reference/classes/webview-environment"
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
        "to": "/docs/development-optimization/developer-tools/installation"
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
        "to": "/docs/development-optimization/developer-tools/attaching-to-the-previewer"
    },
    {
        "from": "/accelerate/tools/dev-tools/advanced/attaching-to-the-remote-tool",
        "to": "/docs/development-optimization/developer-tools/attaching-to-the-remote-tool"
    },
    {
        "from": [
            "/accelerate/tools/dev-tools/advanced/attaching-wsl",
            "/accelerate/tools/dev-tools/advanced/attaching-browser-or-mobile"
        ],
        "to": "/docs/development-optimization/developer-tools/attaching-applications"
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
        "from": "/xpf/build-feeds",
        "to": "/xpf/version-info/release-notes"
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
        "to": "/xpf/guides/embedding-avalonia-in-xpf"
    },
    {
        "from": "/xpf/embedding/xpf-in-avalonia",
        "to": "/xpf/guides/using-xpf-in-avalonia"
    },
    {
        "from": "/xpf/advanced/centralized-management",
        "to": "/xpf/guides/centralizing-multiple-xpf-projects"
    },
    {
        "from": "/xpf/advanced/customizing-init",
        "to": "/xpf/guides/customizing-initialization"
    },
    {
        "from": "/xpf/advanced/customizing-window-decorations",
        "to": "/xpf/guides/removing-the-titlebar"
    },
    {
        "from": "/xpf/advanced/headless-testing",
        "to": "/xpf/guides/headless-testing"
    },
    {
        "from": "/xpf/advanced/key-mapping",
        "to": "/xpf/guides/key-mapping"
    },
    {
        "from": "/xpf/advanced/window-handles",
        "to": "/xpf/guides/native-window-handles"
    },
    {
        "from": "/xpf/troubleshooting",
        "to": "/troubleshooting/xpf"
    },
];

export const v12_docs_redirects = { createRedirects, redirects };
