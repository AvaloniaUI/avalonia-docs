---
id: welcome
title: Welcome
description: Get started with the Avalonia cross-platform .NET UI framework. Find installation guides, tutorials, migration paths, and API references.
doc-type: overview
---

<head>
  <title>Avalonia documentation</title>
  <meta
    name="description"
    content="Documentation for Avalonia, the cross-platform .NET UI framework. Build apps for Windows, macOS, Linux, iOS, Android, and WebAssembly from a single codebase."
  />
</head>

Welcome to the Avalonia documentation. Whether you are building your first app or migrating an existing project, these docs cover everything from installation to deployment.

:::info

These docs cover Avalonia 12. For Avalonia 11 documentation, visit [v11.docs.avaloniaui.net](https://v11.docs.avaloniaui.net/).

:::

## What is Avalonia?

Avalonia is an open-source, cross-platform UI framework for building applications with .NET. It uses its own rendering engine to draw controls, so your app looks and behaves the same on every platform. Write your UI once in C# or F# with XAML, and deploy to:

- **Windows** (10, 11)
- **macOS** (Apple Silicon and Intel)
- **Desktop Linux** (X11 and Wayland)
- **Embedded Linux** (framebuffer on Raspberry Pi and similar devices)
- **iOS** and **Android**
- **WebAssembly**

For exact version and architecture details, see [Supported platforms](supported-platforms).

## Key capabilities

| Capability | Description |
|---|---|
| **Cross-platform rendering** | Avalonia's own rendering engine produces pixel-identical output on every platform. Skia is the default backend, and the team is collaborating with Google's Flutter team to bring the [Impeller](https://avaloniaui.net/blog/avalonia-partners-with-google-s-flutter-t-eam-to-bring-impeller-rendering-to-net) rendering engine to .NET. No native control wrappers, no platform-specific quirks. |
| **XAML and code-behind** | Describe your UI declaratively with XAML or build it entirely in code. Avalonia XAML will feel familiar if you have worked with WPF or UWP. |
| **Styling system** | A CSS-inspired styling system with selectors, style classes, pseudoclasses, and control themes. See [Styles](styling/styles). |
| **Data binding** | Compiled bindings checked at build time, full MVVM support, and integration with CommunityToolkit.Mvvm. See [Data binding](data-binding/introduction-to-data-binding). |
| **Rich control library** | 60+ built-in controls including DataGrid, TreeView, TabControl, Calendar, and more. Fully styleable and templatable. |
| **Accessibility** | Built-in support for screen readers and keyboard navigation across platforms. |
| **DevTools** | Press <kbd>F12</kbd> at runtime to inspect the visual tree, properties, styles, and layout. |

## Choose your path

### New to Avalonia?

1. [Install Avalonia](get-started/install-avalonia) and [set up your IDE](get-started/set-up-your-ide)
2. [Create your first project](get-started/create-your-first-project)
3. [Follow the starter tutorial](get-started/starter-tutorial/index.mdx) to build a temperature converter app
4. [Learn the fundamentals](fundamentals/avalonia-xaml): XAML, controls, layout, and the visual tree

### Coming from WPF?

Avalonia's API is intentionally close to WPF, but there are important differences in styling, templates, and the property system.

- [WPF migration guide](migration/wpf/index.md): a section-by-section comparison
- [WPF cheat sheet](migration/wpf/cheat-sheet): quick mapping of WPF concepts to Avalonia equivalents

If you need to run an existing WPF application cross-platform without rewriting it, [Avalonia XPF](/xpf) provides binary-compatible WPF support on top of Avalonia's rendering engine.

### Upgrading from Avalonia 11?

Avalonia 12 includes compiled bindings by default, a new clipboard API, updated window decorations, and more.

- [Breaking changes in Avalonia 12](avalonia12-breaking-changes): full list with migration guidance for each change

### Looking for samples?

- [Samples and tutorials](samples-tutorials/index.md): starter apps, real-world examples, and video walkthroughs

## Need help?

If you get stuck, check the [Troubleshooting](/troubleshooting) pages or connect with the community on [GitHub Discussions](https://github.com/AvaloniaUI/Avalonia/discussions).

To report a bug, open an issue on [GitHub](https://github.com/AvaloniaUI/Avalonia).

## See also

- [Supported platforms](supported-platforms)
- [Samples and tutorials](samples-tutorials/index.md)
- [Avalonia GitHub repository](https://github.com/AvaloniaUI/Avalonia)
