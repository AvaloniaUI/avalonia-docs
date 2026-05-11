---
id: web-content
title: Web Content Embedding
---

XPF provides several options for embedding web content in your application. The right choice depends on your target platforms and embedding requirements.

## Platform comparison

| Feature | CefSharp | NativeWebView | NativeWebDialog | DotNetBrowser |
|---|---|---|---|---|
| Windows | Supported | Supported | Supported | Supported |
| macOS | Not supported | Supported | Supported | Supported |
| Linux | Not supported | Not supported | Supported | Supported |
| Embedding | In-window control | In-window control | Separate dialog | In-window control |
| Keyboard input | Full | Full | Limited | Full |
| Styling/CSS control | Full | Full | Limited | Full |
| Engine | Chromium | WebView2 / WebKit | WebKit / WebView2 | Chromium |

## XPF WebView (NativeWebView and NativeWebDialog)

The `Avalonia.Xpf.Controls.WebView` NuGet package provides two controls:

- **NativeWebView**: An embeddable web control that renders inline within your window. Supported on Windows and macOS.
- **NativeWebDialog**: A separate browser dialog window. Supported on all platforms including Linux.

See [Embedding Web Content](/docs/app-development/embedding-web-content) for the Avalonia documentation on these controls.

### Linux requirements

`NativeWebDialog` on Linux requires webkit2gtk version 4.1:

**Debian / Ubuntu:**
```bash
sudo apt install libwebkit2gtk-4.1-dev
```

**Fedora:**
```bash
sudo dnf install webkit2gtk4.1-devel
```

**RHEL / CentOS:**
```bash
sudo dnf install webkit2gtk4.1-devel
```

:::note
Version 4.1 of webkit2gtk is required. Older versions (4.0) do not support all features needed by `NativeWebDialog`.
:::

## CefSharp

`CefSharp.Wpf.NetCore` works with XPF on Windows only. It includes Windows-native Chromium binaries and does not work on Linux or macOS.

If CefSharp throws a `NotImplementedException` for `CursorInteropHelper.Create()`, upgrade to XPF 1.6.0 or later, which provides a fallback. As a workaround for older versions, derive from `ChromiumWebBrowser` and override `OnCursorChange` to map CefSharp cursor types to WPF `Cursors`.

## DotNetBrowser

DotNetBrowser from TeamDev is supported in XPF across all platforms. See the [XpfDotNetBrowserApp sample](https://github.com/AvaloniaUI/Avalonia-XPF-Samples/tree/master/src/XpfDotNetBrowserApp) for setup guidance.

## Choosing a web control

- **Windows-only deployment**: CefSharp offers the most complete Chromium integration with full keyboard, styling, and DevTools support.
- **Windows + macOS**: Use `NativeWebView` for in-window embedding, or DotNetBrowser for a Chromium-based option.
- **All platforms including Linux**: Use `NativeWebDialog` if a dialog-based approach is acceptable, or DotNetBrowser for in-window embedding.
