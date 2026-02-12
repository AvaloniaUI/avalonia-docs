---
id: embedding-web-content
title: Embedding web content
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## Overview

The Avalonia WebView component provides native web browser functionality for your Avalonia applications. Unlike embedded WebView solutions that require bundling Chromium, this implementation leverages the platform's native web rendering capabilities, resulting in smaller application size and better performance.

The WebView component includes three main APIs:

- [`NativeWebView`](/controls/web/nativewebview) - A control for embedding web content directly in your application UI
- [`NativeWebDialog`](/controls/web/nativewebdialog) - A separate dialog window that hosts web content
- [`WebAuthenticationBroker`](/reference/classes/webauthenticationbroker) - A utility for handling OAuth and web-based authentication flows


## Installation

See the [Installation Guide](/docs/development-optimization/installing-accelerate) for step-by-step instructions on how to install Accelerate components.

Add the WebView package to your project:

```bash
dotnet add package Avalonia.Controls.WebView
```

## Basic Usage

### Using NativeWebView

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    
    <NativeWebView Source="https://avaloniaui.net/"
                   NavigationCompleted="WebView_NavigationCompleted" />
</Window>
```

```csharp
private void WebView_NavigationCompleted(object? sender, WebViewNavigationCompletedEventArgs args)
{
    if (args.IsSuccess)
    {
        // Navigation completed successfully
    }
}
```

### Using NativeWebDialog

```csharp
var dialog = new NativeWebDialog
{
    Title = "Avalonia Docs",
    CanUserResize = true,
    Source = new Uri("https://docs.avaloniaui.net/")
};

dialog.NavigationCompleted += (s, e) => 
{
    if (e.IsSuccess)
    {
        // Navigation completed successfully
    }
};

dialog.Show();
```

### Using WebAuthenticationBroker

```csharp
var authOptions = new WebAuthenticatorOptions(
    RequestUri: new Uri("https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost&scope=openid"),
    RedirectUri: new Uri("http://localhost")
);

var result = await WebAuthenticationBroker.AuthenticateAsync(mainWindow, authOptions);

if (result.CallbackUri != null)
{
    // Process authentication result
    var code = HttpUtility.ParseQueryString(result.CallbackUri.Query)["code"];
}
```

Replace `YOUR_CLIENT_ID` with the client ID for your application.

## Platform Prerequisites

The WebView component relies on native web rendering implementations that must be available on the user's machine.

#### Summary

| Component | Windows | macOS | Linux | iOS | Android | Browser |
|-----------|---------|-------|-------|-----|---------|---------|
| NativeWebView | ✔ | ✔ | ✖* | ✔ | ✔ | ✖ |
| NativeWebDialog | ✔ | ✔ | ✔ | ✖ | ✖ | ✖ |
| WebAuthenticationBroker | ✔** | ✔ | ✔** | ✔ | ✔*** | ✔**** |

\* For Linux, use NativeWebDialog instead of NativeWebView  
\** Uses NativeWebDialog implementation  
\*** Android support is experimental  
\**** Requires CORS configuration for the redirect page. .NET 10 is also necessary to run this library in browser.

#### Windows

Uses Microsoft Edge WebView2, which is:

- Pre-installed on Windows 11
- May need installation on Windows 10

For Windows 10 users, you can include the WebView2 runtime with your installer:

- [WebView2 Runtime Download](https://developer.microsoft.com/en-us/microsoft-edge/webview2?form=MA13LH#download)
- [Distribution Guide](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution?tabs=dotnetcsharp)

#### macOS/iOS

Uses `WKWebView` which is pre-installed on all modern macOS/iOS devices.

- No additional setup required
- For WebAuthenticationBroker: macOS 10.15+ or iOS 12.0+ required

#### Linux

Requires GTK 3.0 and WebKitGTK 4.1:

Debian/Ubuntu:

```bash
apt install libgtk-3-0 libwebkit2gtk-4.1-0
```

Fedora:

```bash
dnf install gtk3 webkit2gtk4.1
```

:::note
NativeWebDialog also supports libwebkit2gtk-4.0 and soup-2.4 for older Ubuntu distributives. But it is recommended to use libwebkit2gtk-4.1.
:::

#### Android

Requires Android API 21 or higher.

## Native Browser interop

The Avalonia WebView component provides cross-platform web content rendering capabilities by utilizing native platform web view.
However, sometimes you need to access platform-specific APIs that aren't exposed through the Avalonia WebView abstraction layer.

This document explains how to obtain native handles and perform interop with the underlying browser implementations on each supported platform.

### Getting handle

To access native browser functionality, you first need to obtain the platform-specific handle from your WebView control.

#### For WebView Controls

Use the `TryGetPlatformHandle()` method on your WebView instance:

```csharp
if (myWebView.TryGetPlatformHandle() is IWindowsWebView2PlatformHandle handle)
{
    // Cast to platform-specific interface and use
}
```

#### For WebView Dialogs

Use the `TryGetWebViewPlatformHandle()` method on your WebView dialog instance:

```csharp
if (myWebViewDialog.TryGetWebViewPlatformHandle() is IWindowsWebView2PlatformHandle handle)
{
    // Cast to platform-specific interface and use
}
```

### Interop

#### Windows

Avalonia's WebView on Windows supports two adapters:

- **WebView2**: Modern Chromium-based Edge (recommended)
- **WebView1**: Legacy Edge (fallback for older Windows 10 installations without WebView2)

Both adapters operate with classic COM interop.
*IDL* definition files can be found in the `Microsoft.Web.WebView2` nuget package (in case of WebView2), Windows SDK (in case of WebView1) or on the internet.

**Recommended Approach**: Use the new [`[GeneratedComInterface]`](https://learn.microsoft.com/en-us/dotnet/standard/native-interop/comwrappers-source-generation) attribute for fast, trimmer/AOT-friendly COM interop.

**Alternative Solutions**:

- [CsWin32 generators](https://github.com/microsoft/CsWin32)
- [Legacy `[ComImport]`](https://learn.microsoft.com/en-us/dotnet/standard/native-interop/cominterop)

```csharp
public interface IWindowsWebView2PlatformHandle : IPlatformHandle
{
    /// Returns COM handle to the ICoreWebView2 [76ECEACB-0462-4D94-AC83-423A6793775E] COM interface
    IntPtr CoreWebView2 { get; }
    /// Returns COM handle to the ICoreWebView2 [4D00C0D1-9434-4EB6-8078-8697A560334F] COM interface
    IntPtr CoreWebView2Controller { get; }
}
```

```csharp
public interface IWindowsWebView1PlatformHandle : IPlatformHandle
{
    /// Returns COM handle to the IWebViewControl [3F921316-BC70-4BDA-9136-C94370899FAB] COM interface.
    IntPtr WebViewControl { get; }
}
```

#### MacOS/iOS

**Recommended Approach**: Use official .NET Xamarin.Native macOS/iOS bindings for strongly-typed wrappers. Typically using [NSObject.GetNSObject\<WKWebView\>(IntPtr, false)](https://learn.microsoft.com/en-us/dotnet/api/objcruntime.runtime.getnsobject?view=xamarin-ios-sdk-12#objcruntime-runtime-getnsobject-1(system-intptr-system-boolean)).

```csharp
var wkWebView = NSObject.GetNSObject<WKWebView>(handle.WKWebView, false);
```

**Alternative**: Use `objc_msgSend` P/Invokes for direct native API access (more control but harder to maintain).

```csharp
public interface IAppleWKWebViewPlatformHandle : IPlatformHandle
{
    IntPtr WKWebView { get; }
    IntPtr GetWKWebViewRetained();
}
```

#### GTK Linux

GTK interop provides direct access to WebKitWebView but requires careful thread synchronization.

**Important**: All GTK calls must be executed on the GTK thread. Use [`GtkInteropHelper.RunOnGlibThread`](https://api-docs.avaloniaui.net/docs/M_Avalonia_X11_Interop_GtkInteropHelper_RunOnGlibThread__1) from the `Avalonia.X11` assembly (included with `Avalonia.Desktop`).

The provided `WebKitWebView` IntPtr can be used directly with WebKit P/Invokes from the [official WebKit reference](https://webkitgtk.org/reference/webkit2gtk/2.5.1/WebKitWebView.html).

```csharp
public interface IGtkWebViewPlatformHandle : IPlatformHandle
{
    IntPtr WebKitWebView { get; }
}
```

**Example Usage**:

```csharp
GtkInteropHelper.RunOnGlibThread(() =>
{
    // Your WebKit P/Invoke calls here
});
```

#### Android

Use official .NET Xamarin.Android bindings for the easiest managed wrapper access.

Refer to the [Android.Webkit.WebView documentation](https://learn.microsoft.com/en-us/dotnet/api/android.webkit.webview.-ctor?view=net-android-35.0#android-webkit-webview-ctor(system-intptr-android-runtime-jnihandleownership)) for usage details.

```csharp
public interface IAndroidWebViewPlatformHandle : IPlatformHandle
{
    IntPtr WebKitWebView { get; }
}
```

## See also

- [NativeWebView](/controls/web/nativewebview)
- [NativeWebDialog](/controls/web/nativewebdialog)
- [WebAuthenticationBroker](/reference/classes/webauthenticationbroker)
- [WebView environment options](reference/classes/webview-environment)
- [FAQ](/tools/faq#webview)
