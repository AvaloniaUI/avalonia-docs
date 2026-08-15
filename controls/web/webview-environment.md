---
id: webview-environment
title: WebView environment
---

## Overview

The WebView environment options allow you to customize the underlying browser engine before it's initialized. This is essential for configuring browser-specific settings like developer tools, private browsing, user data directories, and other platform-specific features that must be set during creation.

The `EnvironmentRequested` event is fired before the WebView adapter is created, giving you the opportunity to modify these settings based on your application's requirements.

## Basic usage

```csharp
var webView = new WebView();
webView.EnvironmentRequested += (sender, args) =>
{
    // Enable developer tools for all platforms
    args.EnableDevTools = true;
    
    // Platform-specific configuration
    switch (args)
    {
        case WindowsWebView2EnvironmentRequestedEventArgs webView2Args:
            webView2Args.IsInPrivateModeEnabled = true;
            break;
        case AppleWKWebViewEnvironmentRequestedEventArgs appleArgs:
            appleArgs.NonPersistentDataStore = true;
            break;
        case GtkWebViewEnvironmentRequestedEventArgs gtkArgs:
            gtkArgs.EphemeralDataManager = true;
            break;
    }
};
```

## Base class properties

### WebViewEnvironmentRequestedEventArgs

**Properties:**

- `EnableDevTools` (bool): Controls whether users can open DevTools via context menu or keyboard shortcuts. Available on all platforms.

## Platform-specific options

### Windows WebView2

**Key Properties:**

- `ExplicitEnvironment`: Use an existing ICoreWebView2Environment COM handle
- `ProfileName`: Set a custom browser profile name
- `BrowserExecutableFolder`: Specify Edge browser executable location
- `UserDataFolder`: Define where user data is stored
- `AdditionalBrowserArguments`: Pass custom Chromium command-line flags
- `Language`: Set browser UI language (BCP 47 format)
- `IsInPrivateModeEnabled`: Enable private browsing mode

**Example:**

```csharp
webView.EnvironmentRequested += (sender, args) =>
{
    if (args is WindowsWebView2EnvironmentRequestedEventArgs webView2)
    {
        webView2.ProfileName = "AvaloniaUser";
        webView2.UserDataFolder = Path.Combine(AppContext.BaseDirectory, "webview");
    }
};
```

### macOS/iOS (WKWebView)

**Key Properties:**

- `NonPersistentDataStore`: Use memory-only data storage
- `DataStoreIdentifier`: Set unique identifier for persistent data
- `ApplicationNameForUserAgent`: Customize user agent application name
- `UpgradeKnownHostsToHTTPS`: Automatically upgrade HTTP to HTTPS
- `LimitsNavigationsToAppBoundDomains`: Restrict navigation to app domains

**Example:**

```csharp
webView.EnvironmentRequested += (sender, args) =>
{
    if (args is AppleWKWebViewEnvironmentRequestedEventArgs wkWebView)
    {
        wkWebView.NonPersistentDataStore = true;
        wkWebView.ApplicationNameForUserAgent = "Avalonia WebView Sample";
    }
};
```

### Linux (WPE WebKit)

[WPE WebKit](https://wpewebkit.org) renders offscreen and composites into the Avalonia visual tree. `NativeWebView` prefers it when its libraries are installed, and uses [WebKitGTK](#linux-gtk-webkit) otherwise. This event is only raised on the WPE path, so it never fires on a machine without WPE. See [Linux prerequisites](/docs/app-development/embedding-web-content#linux) for the packages, and note that Ubuntu does not package WPE at all.

**Key Properties:**

- `DataDirectory`: Directory used for persistent website data. When `null`, the default WPE data directory is used.
- `CacheDirectory`: Directory used for the website cache. When `null`, the default WPE cache directory is used.
- `RenderingMode`: Selects the WPE rendering backend (`WpeRenderingMode`). The default `Auto` currently maps to `Shm` (software rendering, no GPU required). `Egl` and `DmaBuf` are reserved for future use and will throw `NotImplementedException` if selected. The choice is process-global and affects all `NativeWebView` instances.
- `PreferWebKitGtkInstead`: When `true`, uses the WebKitGTK adapter even though WPE is available. This is an opt-out for machines that do have WPE; it is not needed to reach WebKitGTK on machines that do not.

**Example:**

```csharp
webView.EnvironmentRequested += (sender, args) =>
{
    if (args is LinuxWpeWebViewEnvironmentRequestedEventArgs wpeArgs)
    {
        wpeArgs.DataDirectory = Path.Combine(AppContext.BaseDirectory, "wpe-data");
        wpeArgs.CacheDirectory = Path.Combine(AppContext.BaseDirectory, "wpe-cache");
    }
};
```

### Linux (GTK WebKit)

WebKitGTK is the baseline Linux backend. `NativeWebDialog` always uses it, and `NativeWebView` uses it whenever [WPE WebKit](#linux-wpe-webkit) is not installed. No configuration is needed to reach it.

**Key Properties:**

- `ApplicationNameForUserAgent`: Customize user agent application name
- `ExperimentalOffscreen`: Render into an offscreen GTK window composited by Avalonia, instead of reparenting a native X11 child window. This lets the web view be hosted in the same Avalonia window without overlapping other controls.
- `ForceX11GdkBackend`: Override `GDK_BACKEND` to `x11` while GTK is initialized, restoring the previous value afterwards. The GTK adapters require the x11 GDK backend, and a Wayland desktop usually pre-sets `GDK_BACKEND=wayland`, which makes `gtk_init` fail. Enabled by default, so Wayland sessions work without any setup; set it to `false` to opt out of the environment override.
- `EphemeralDataManager`: Use non-persistent data storage
- `BaseDataDirectory`: Set base directory for website data
- `BaseCacheDirectory`: Set base directory for cache
- `SharedProcessModel`: Use shared process for all WebView instances
- `DisableCache`: Completely disable caching for memory optimization

**Example:**

```csharp
webView.EnvironmentRequested += (sender, args) =>
{
    if (args is GtkWebViewEnvironmentRequestedEventArgs gtkArgs)
    {
        gtkArgs.EphemeralDataManager = true;
        gtkArgs.EnableDevTools = true;
    }
};
```

## See also

- [NativeWebView](/controls/web/nativewebview)
- [NativeWebDialog](/controls/web/nativewebdialog)
- [WebAuthenticationBroker](/controls/web/webauthenticationbroker)
- [Embedding web content](/docs/app-development/embedding-web-content)
- [FAQ](/tools/faq#webview)
