# WebView Quick Start Guide

## Overview

The Avalonia WebView component provides native web browser functionality for your Avalonia applications. Unlike embedded WebView solutions that require bundling Chromium, this implementation leverages the platform's native web rendering capabilities, resulting in smaller application size and better performance.

The WebView component includes three main APIs:

- `NativeWebView` - A control for embedding web content directly in your application UI
- `NativeWebDialog` - A separate dialog window that hosts web content
- `WebAuthenticationBroker` - A utility for handling OAuth and web-based authentication flows


## Installation

See the [Installation Guide](/accelerate/installation.md) for step-by-step instructions on how to install Accelerate components.

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

The WebView component relies on native web rendering implementations that must be available on the user's machine:

### Windows

Uses Microsoft Edge WebView2, which is:

- Pre-installed on Windows 11
- May need installation on Windows 10

For Windows 10 users, you can include the WebView2 runtime with your installer:

- [WebView2 Runtime Download](https://developer.microsoft.com/en-us/microsoft-edge/webview2?form=MA13LH#download)
- [Distribution Guide](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution?tabs=dotnetcsharp)

### macOS/iOS

Uses `WKWebView` which is pre-installed on all modern macOS/iOS devices.

- No additional setup required
- For WebAuthenticationBroker: macOS 10.15+ or iOS 12.0+ required

### Linux

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

### Android

Requires Android API 21 or higher.

## Platform Support Summary

| Component | Windows | macOS | Linux | iOS | Android | Browser |
|-----------|---------|-------|-------|-----|---------|---------|
| NativeWebView | ✔ | ✔ | ✖* | ✔ | ✔ | ✖ |
| NativeWebDialog | ✔ | ✔ | ✔ | ✖ | ✖ | ✖ |
| WebAuthenticationBroker | ✔** | ✔ | ✔** | ✔ | ✔*** | ✔**** |

\* For Linux, use NativeWebDialog instead of NativeWebView  
\** Uses NativeWebDialog implementation  
\*** Android support is experimental  
\**** Requires CORS configuration for the redirect page. .NET 10 is also necessary to run this library in browser.

## Next Steps

For detailed API documentation, see:

- [NativeWebView API](nativewebview.md)
- [NativeWebDialog API](nativewebdialog.md)
- [WebAuthenticationBroker API](webauthenticationbroker.md)
