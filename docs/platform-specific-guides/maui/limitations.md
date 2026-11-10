---
id: limitations
title: Avalonia.Controls.Maui limitations
description: .NET MAUI features, APIs, and properties that Avalonia.Controls.Maui does not support, with workarounds where they exist.
doc-type: reference
---

This page lists the .NET MAUI features that Avalonia.Controls.Maui does not support, and the workarounds where they exist.

## Platforms

- **Full hosting on the native .NET MAUI target frameworks**: `UseAvaloniaApp` is not supported on `net11.0-android`, `net11.0-ios`, `net11.0-maccatalyst`, or `net11.0-windows`. On these target frameworks, use the native .NET MAUI handlers, and use `UseAvaloniaEmbedding<TApp>` to add Avalonia controls. See [Embedding Avalonia controls](/docs/platform-specific-guides/maui/embedding).
- **Native views in an Avalonia app**: In full hosting mode, you cannot put native platform views, such as an Android `View` or a WinUI control, in a .NET MAUI page. Embedding works in one direction only: Avalonia controls in a native .NET MAUI app.

## Features

| Feature | Status | Workaround |
|---|---|---|
| Blazor Hybrid (`BlazorWebView`) | Not supported. | None. |
| `Microsoft.Maui.Controls.Maps` | Not supported. | Use [Mapsui.Maui](https://www.nuget.org/packages/Mapsui.Maui/) with `UseAvaloniaSkiaSharp`. See the [MapApp sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/MapApp). |
| `IWindowOverlay` | Not supported. | None. |
| Accessibility | Limited. `AutomationId` and the `SemanticProperties` description and hint are passed to Avalonia, but other accessibility information is not. | None. |

## Essentials

`UseAvaloniaEssentials` implements some `Microsoft.Maui.Essentials` APIs. For the list, see [Use .NET MAUI Essentials](/docs/platform-specific-guides/maui/configuration#use-net-maui-essentials). The other APIs use the portable .NET MAUI implementation, which usually throws `NotImplementedInReferenceAssemblyException`.

- **APIs that cannot be replaced**: Some Essentials APIs, such as `MainThread`, do not let a library supply an implementation. Calls to these APIs throw an exception. Instead of `MainThread`, use the .NET MAUI `Dispatcher`:

  ```csharp
  // Instead of MainThread.BeginInvokeOnMainThread(...)
  Dispatcher.Dispatch(() => StatusLabel.Text = "Done");
  ```

- **`FileResult.OpenReadAsync`**: Works only when you call it through the `AvaloniaFileResult` type that `FilePicker` and `MediaPicker` return. Through a `FileResult` reference, the base .NET MAUI implementation runs and fails. See [Use .NET MAUI Essentials](/docs/platform-specific-guides/maui/configuration#use-net-maui-essentials).
- **Camera capture**: `MediaPicker` can select photos and videos, but camera capture throws `NotSupportedException`.
- **Haptic feedback**: `HapticFeedback.IsSupported` is `false`.

## Control properties

Most properties of the built-in controls are supported. These properties have no effect:

| Control | Property or event | Notes |
|---|---|---|
| `Label` | `TextType` | Text with `TextType="Html"` shows as plain text. Use `FormattedText` for styled text. |
| `Label` | `FontAutoScalingEnabled` | Not supported. |
| `Entry`, `Editor` | `IsSpellCheckEnabled` | Avalonia has no spell checking. |
| `Image` | `IsOpaque` | Not supported. |
| `CarouselView` | `IsBounceEnabled` | Not supported. |
| `WebView` | `ProcessTerminated` | Not raised, because the Avalonia web view has no equivalent event. |

For the status of each control property, see [STATUS.md](https://github.com/AvaloniaUI/Avalonia.Controls.Maui/blob/main/STATUS.md) in the Avalonia.Controls.Maui repository.

## See also

- [.NET MAUI with Avalonia](/docs/platform-specific-guides/maui)
- [Configuration](/docs/platform-specific-guides/maui/configuration)
- [Avalonia.Controls.Maui issues on GitHub](https://github.com/AvaloniaUI/Avalonia.Controls.Maui/issues)
