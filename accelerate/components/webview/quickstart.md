# WebView Quick Start Guide

## Overview

The Avalonia WebView component provides native web browser functionality for your Avalonia applications. Unlike embedded WebView solutions that require bundling Chromium, this implementation leverages the platform's native web rendering capabilities, resulting in smaller application size and better performance.

The WebView component includes three main APIs:

- `NativeWebView` - A control for embedding web content directly in your application UI
- `NativeWebDialog` - A separate dialog window that hosts web content
- `WebAuthenticationBroker` - A utility for handling OAuth and web-based authentication flows

## Installation

### Configure the NuGet Package Source

Avalonia Accelerate packages are distributed through a dedicated NuGet feed that requires authentication with your AvaloniaUI license key. Follow these steps to configure access to this feed in your C# project.

#### Option 1: Configure via `nuget.config` (Recommended)

1. Locate or create a nuget.config file:
    - Look for an existing `nuget.config` file in your solution directory
    - If none exists, create a new file named `nuget.config` in the same folder as your solution file (`.sln`)

2. Add the following configuration:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
    // highlight-start
    <add key="avalonia-accelerate" value="https://pro-nuget-feed.avaloniaui.net/v3/index.json" />
    // highlight-end
  </packageSources>
  // highlight-start
  <packageSourceCredentials>
    <avalonia-accelerate>
      <add key="Username" value="license" />
      <add key="ClearTextPassword" value="YOUR_LICENSE_KEY" />
    </avalonia-accelerate>
  </packageSourceCredentials>
// highlight-end
</configuration>
```

3. Replace `YOUR_LICENSE_KEY` with your actual Avalonia license key

#### Option 2: Configure via Visual Studio

1. Open Visual Studio and go to _Tools → NuGet Package Manager → Package Manager Settings_
2. Navigate to _Package Sources_
3. Click the _+_ button to add a new source:

    - **Name**: `avalonia-accelerate`
    - **Source**: https://pro-nuget-feed.avaloniaui.net/v3/index.json

4. Click _Update_ to save the new source
5. When prompted for credentials during package installation:

    - **Username**: `license`
    - **Password**: Your Avalonia license key

### Add the NuGet Package

Add the WebView package to your project:

```bash
dotnet add package Avalonia.Controls.WebView
```

### Add the License Key

Include your Avalonia UI license key in the executable project file (`.csproj`):

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your license key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

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
var authOptions = new WebAuthenticationOptions(
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
\**** Requires CORS configuration for the redirect page

## Next Steps

For detailed API documentation, see:

- [NativeWebView API](nativewebview.md)
- [NativeWebDialog API](nativewebdialog.md)
- [WebAuthenticationBroker API](webauthenticationbroker.md)
