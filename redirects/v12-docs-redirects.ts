interface Redirect {
  to: string;
  from: string | string[];
}

function createRedirects(existingPath: string): string[] | undefined {
    if (existingPath.includes('/docs/')) {
        const redirects: string[] = [];

        // Using whole-folder redirect for folders that are mostly unchanged
        const v12_redirect = existingPath
            .replace('/docs/guides/data-binding/', '/docs/guides/data/')
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
            "/docs/guides/index"
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
        "to": "/docs/guides/ui-development/xaml-previewer"
    },
    {
        "from": "/docs/guides/implementation-guides/how-to-implement-dependency-injection",
        "to": "/docs/guides/app-development/dependency-injection"
    },
    {
        "from": "/docs/guides/implementation-guides",
        "to": "/docs/guides/app-development"
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
        "to": "/docs/guides/app-development/cross-platform-solution-setup"
    },
    {
        "from": "/docs/guides/implementation-guides/developer-tools",
        "to": "/docs/guides/development-optimization/legacy-developer-tools"
    },
    {
        "from": "/docs/guides/implementation-guides/logging-errors-and-warnings",
        "to": "/docs/guides/app-development/logging-errors-and-warnings"
    },
    {
        "from": "/docs/guides/implementation-guides/localizing",
        "to": "/docs/guides/app-development/localizing"
    },
    {
        "from": [
            "/docs/guides/data/how-to-bind-to-a-command-with-reactiveui",
            "/docs/guides/data-binding/how-to-bind-to-a-command-without-reactiveui"
        ],
        "to": "/docs/guides/app-development/reactiveui/binding-commands"
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
        "to": "/docs/guides/ui-development/styling/sharing-styles"
    },
    {
        "from": "/docs/guides/styles-and-resources/resources",
        "to": "/docs/guides/ui-development/resource-dictionary"
    },
    {
        "from": "/docs/guides/styles-and-resources/how-to-use-theme-variants",
        "to": "/docs/guides/ui-development/styling/theme-variants"
    },
    {
        "from": "/docs/guides/styles-and-resources/how-to-use-fonts",
        "to": "/docs/guides/ui-development/styling/custom-fonts"
    },
    {
        "from": "/docs/guides/graphics-and-animation/graphics-and-animations",
        "to": "/docs/guides/ui-development/graphics/drawing-graphics"
    },
    {
        "from": [
            "/docs/guides/ui-development/graphics/how-to-add-menu-icons",
            "/docs/guides/ui-development/graphics/how-to-use-icons"
        ],
        "to": "/docs/guides/ui-development/graphics/adding-icons"
    },
    {
        "from": "/docs/guides/graphics-and-animation/keyframe-animations",
        "to": "/docs/guides/ui-development/graphics/keyframe-animations"
    },
    {
        "from": "/docs/guides/ui-development/graphics/transitions",
        "to": "/docs/guides/ui-development/graphics/control-transitions"
    },
    {
        "from": "/docs/guides/graphics-and-animation/gradients",
        "to": "/docs/guides/ui-development/graphics/gradients"
    },
    {
        "from": [
            "/docs/guides/graphics-and-animation/page-transitions/cross-fade-page-transition",
            "/docs/guides/graphics-and-animation/page-transitions/page-slide-transition",
            "/docs/guides/graphics-and-animation/page-transitions/page-transition-combinations",
            "/docs/guides/graphics-and-animation/page-transitions/how-to-create-a-custom-page-transition"
        ],
        "to": "/docs/guides/ui-development/graphics/page-transitions"
    },
];

export const v12_docs_redirects = { createRedirects, redirects };