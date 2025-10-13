---
id: web-view
title: Using WebView control
---

## Overview

Windows provides several controls to embed native WebView inside of the application.
The same controls can't be supported in cross platform XPF environment, as these browsers are usually tied to a Windows.

Instead, XPF provides a webview control is based on Avalonia Accelerate version of [NativeWebView](https://docs.avaloniaui.net/accelerate/components/webview/nativewebview).
All functionality and configuration documentation can be applied for both.

## Installing WebView package

First of all, make sure you have installed XPF nuget feed as per [instruction](../build-feeds.md).

With nuget feed working, install `Avalonia.Xpf.Controls.WebView` package:
```xml
<PackageReference Include="Avalonia.Xpf.Controls.WebView" Version="11.3.9" />
```

:::note
Please use latest version if available. You can check newer versions in the IDE NuGet Packages window.
On Windows, when WebView2 is not available, legacy Internet Explorer is embedded. It's useful when targeting older Windows versions.
:::

## Using NativeWebView control

Add `xmlns:wpf="clr-namespace:Avalonia.Xpf.Controls;assembly=Avalonia.Xpf.Controls.WebView"` xmlns to your XAML file.

Typical usage of the NativeWebView looks like this:
```xml
<wpf:NativeWebView Source="https://avaloniaui.net/" />
```

Where `Source` is a bindable property.

:::note
Embeddable `NativeWebView` is not supported on Linux.
Instead, use `NativeWebDialog` there.
:::


### Handling navigation events

`NativeWebView` supports two navigation events:
- `NavigationStarted` is raised when web page navigation was started. You can read the request Uri from `WebViewNavigationStartingEventArgs.Request`. And it's possible to cancel navigation via `WebViewNavigationStartingEventArgs.Cancel` property. This event also handles redirects.
- `NavigationCompleted` is raised when web page navigation has completed. And `WebViewNavigationCompletedEventArgs` provides `Request` as well as `IsSuccess` properties.

### Bi-directional JavaScript execution

In some situations it's necessary to execute arbitrary JavaScript code from the web view control.
`NativeWebView` provides `InvokeScript` async method:
```csharp
webView.InvokeScript("console.log('Hello World')");
```

When it's required to receive a data from the JavaScript (web page) and process it on the C# side, you can use `NativeWebView.WebMessageReceived` event combined with `invokeCSharpAction` helper JS method.

Complete bi-directional example looks like this:
```csharp
private async void NativeWebView_OnNavigationCompleted(object? sender, WebViewNavigationCompletedEventArgs e)
{
    await ((NativeWebView)sender!).InvokeScript(""" invokeCSharpAction("{'key': 10}") """);
}

private void NativeWebView_OnWebMessageReceived(object? sender, WebMessageReceivedEventArgs e)
{
    var message = e.Body;
    // message == "{'key': 10}"
}
```

![alt text](../../static/img/webview.png)

## Using `NativeWebDialog` control

Typical usage of the NativeWebDialog looks like this:
```c#
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

## Using WebAuthenticationBroker

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

Replace YOUR_CLIENT_ID with the client ID for your application.

## Using with native WPF

To streamline code migration, it's also possible to use `NativeWebView` control with native WPF on Windows. Without XPF involving.

In this scenario, all the API members and underlying browsers are the same. As well as steps to install, the same package can be used.

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

| Component | Windows | macOS | Linux |
|-----------|---------|-------|-------|
| NativeWebView | ✔ | ✔ | ✖* |
| NativeWebDialog | ✔ | ✔ | ✔ |
| WebAuthenticationBroker | ✔** | ✔ | ✔** |

\* For Linux, use NativeWebDialog instead of NativeWebView  
\** Uses NativeWebDialog implementation

## Next Steps

For detailed API documentation, see:

- [NativeWebView API](../../../accelerate/components/webview/nativewebview.md)
- [NativeWebDialog API](../../../accelerate/components/webview/nativewebdialog.md)
- [WebAuthenticationBroker API](../../../accelerate/components/webview/webauthenticationbroker.md)
