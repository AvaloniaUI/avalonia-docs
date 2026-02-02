const redirects: Redirect[] = [
    {
        "from": "/docs/overview/what-is-avalonia",
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
];

export const v12-docs-redirects = { createRedirects, redirects };