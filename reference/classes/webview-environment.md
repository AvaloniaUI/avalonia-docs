---
id: webview-environment
title: WebView environment
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## Overview

The WebView environment options allow you to customize the underlying browser engine before it's initialized. This is essential for configuring browser-specific settings like developer tools, private browsing, user data directories, and other platform-specific features that must be set during creation.

The `EnvironmentRequested` event is fired before the WebView adapter is created, giving you the opportunity to modify these settings based on your application's requirements.

## Basic Usage

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

## Base Class Properties

### WebViewEnvironmentRequestedEventArgs

**Properties:**

- `EnableDevTools` (bool): Controls whether users can open DevTools via context menu or keyboard shortcuts. Available on all platforms.

## Platform-Specific Options

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

### Linux (GTK WebKit)

**Key Properties:**

- `ApplicationNameForUserAgent`: Customize user agent application name
- `ExperimentalOffscreen`: Enable experimental offscreen rendering
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
- [WebAuthenticationBroker](/reference/classes/webauthenticationbroker)
- [Embedding web content](/docs/app-development/embedding-web-content)
- [FAQ](/tools/faq#webview)
