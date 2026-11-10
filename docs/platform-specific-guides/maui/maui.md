---
id: maui
title: .NET MAUI with Avalonia
description: Run .NET MAUI apps on Linux, WebAssembly, and Avalonia desktop with Avalonia.Controls.Maui, or embed Avalonia controls in a .NET MAUI app.
doc-type: overview
---

Avalonia.Controls.Maui is a set of .NET MAUI handlers that render .NET MAUI controls with Avalonia. A .NET MAUI handler maps a cross-platform control, such as `Button`, to the control that draws it on screen. With Avalonia.Controls.Maui, that control is an Avalonia control instead of a native platform control.

Your .NET MAUI XAML, bindings, Shell navigation, view models, and services do not change. Because Avalonia draws every control itself, your app can run on platforms that .NET MAUI does not target by itself, such as desktop Linux and the browser, and looks the same on each one.

## Hosting modes

Avalonia.Controls.Maui has two modes. You select the mode in `MauiProgram.cs`, and an app uses exactly one mode for each target framework.

| Mode | Builder method | What it does |
|---|---|---|
| Full hosting | `UseAvaloniaApp()` | Replaces the .NET MAUI handlers with Avalonia handlers. Avalonia draws the whole app. |
| Embedding | `UseAvaloniaEmbedding<TApp>()` | Keeps the native .NET MAUI handlers and registers `AvaloniaView`, so you can put Avalonia controls inside native .NET MAUI pages. |

A typical app uses full hosting for the Avalonia desktop and browser target frameworks, and embedding for the native .NET MAUI target frameworks:

```csharp
builder
    .UseMauiApp<App>()
#if !IOS && !MACCATALYST && !ANDROID && !WINDOWS
    .UseAvaloniaApp()
#else
    .UseAvaloniaEmbedding<AvaloniaApp>()
#endif
    ;
```

## Supported platforms

| Target framework | Runs on | Mode |
|---|---|---|
| `net11.0` | Windows, macOS, and Linux, through the Avalonia desktop backends | Full hosting |
| `net11.0-browser` | WebAssembly in the browser | Full hosting, with a single-view lifetime |
| `net11.0-android` | Android | Embedding |
| `net11.0-ios` | iOS | Embedding |
| `net11.0-maccatalyst` | Mac Catalyst | Embedding |
| `net11.0-windows10.0.19041.0` | Windows (WinUI) | Embedding |

On the native .NET MAUI target frameworks, the app uses the .NET MAUI native handlers. Full hosting is not supported on those target frameworks. For more information, see [Limitations](/docs/platform-specific-guides/maui/limitations).

## Packages

| Package | Purpose |
|---|---|
| `Avalonia.Controls.Maui` | Avalonia handlers for the built-in .NET MAUI controls, including `GraphicsView` and `Microsoft.Maui.Graphics`. Also contains the embedding support. |
| `Avalonia.Controls.Maui.Desktop` | Adds `Avalonia.Desktop` and generates the desktop entry point for the `net11.0` target framework. |
| `Avalonia.Controls.Maui.Essentials` | Avalonia implementations of some `Microsoft.Maui.Essentials` APIs, such as `FilePicker` and `Preferences`. |
| `Avalonia.Controls.Maui.Compatibility` | Handlers for the deprecated .NET MAUI controls `Frame`, `ListView`, `TableView`, and the cell types. |
| `Avalonia.Controls.Maui.SkiaSharp.Views` | Avalonia handlers for `SKCanvasView` and `SKGLView` from `SkiaSharp.Views.Maui`. |

## Samples

The [avalonia-maui-samples](https://github.com/AvaloniaUI/avalonia-maui-samples) repository contains .NET MAUI apps that run with Avalonia.Controls.Maui. Most are ports of existing open-source .NET MAUI apps:

- [MauiPlanets](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/MauiPlanets), [WeatherTwentyOne](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/WeatherTwentyOne), and [MyConference](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/MyConference) show complete apps that run on the desktop and in the browser.
- [MapApp](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/MapApp) uses the SkiaSharp views to show an OpenStreetMap map.
- [MauiConverter](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/MauiConverter) uses C# Markup and changes an Avalonia handler mapping.
- [WasmPlusSingleProject](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WasmPlusSingleProject) and [WasmPlusMultiProject](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WasmPlusMultiProject) add a WebAssembly head.
- [WaylandSupport](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Fundamentals/WaylandSupport) uses the native Wayland backend on Linux.

## In this section

- [Getting started](/docs/platform-specific-guides/maui/getting-started): create a new app, or add Avalonia.Controls.Maui to an existing app.
- [Configuration](/docs/platform-specific-guides/maui/configuration): builder methods, fonts, images, assets, and build properties.
- [WebAssembly](/docs/platform-specific-guides/maui/webassembly): run your .NET MAUI app in the browser.
- [Linux and Wayland](/docs/platform-specific-guides/maui/linux): customize the desktop entry point and use Wayland.
- [Embedding Avalonia controls](/docs/platform-specific-guides/maui/embedding): use Avalonia controls in a native .NET MAUI app.
- [Custom handlers](/docs/platform-specific-guides/maui/custom-handlers): write a handler for your own control, or change a built-in handler.
- [Limitations](/docs/platform-specific-guides/maui/limitations): APIs and scenarios that are not supported.

## See also

- [Migrating from .NET MAUI](/docs/migration/maui)
- [Supported platforms](/docs/supported-platforms)
- [Avalonia.Controls.Maui on GitHub](https://github.com/AvaloniaUI/Avalonia.Controls.Maui)
