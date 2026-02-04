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
            "/docs/guides/implementation-guides",
            "/docs/guides/development-guides/how-to-implement-multi-page-apps",
            "/docs/guides/development-guides/how-to-show-and-hide-a-split-view-pane-with-mvvm",
            "/docs/guides/platforms/android/index",
            "/docs/deployment/index"
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
        "from": "/docs/guides/implementation-guides/using-avalonia-with-mvvm-frameworks",
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
            "/docs/guides/custom-controls/how-to-create-advanced-custom-controls"
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
];

export const v12_docs_redirects = { createRedirects, redirects };