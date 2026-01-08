# NativeWebView

## Overview

`NativeWebView` is a control that provides a native web browser implementation for Avalonia and WPF applications. It wraps platform-specific web controls and provides a unified API for web browsing functionality.

## Properties

### Source

```csharp
public Uri Source { get; set; }
```

The URI of the top-level document displayed in the WebView. Setting this property is equivalent to calling `Navigate()`.

Default value: `about:blank`

### CanGoBack

```csharp
public bool CanGoBack { get; }
```

Indicates whether the WebView can navigate to a previous page in the navigation history.

### CanGoForward

```csharp
public bool CanGoForward { get; }
```

Indicates whether the WebView can navigate to a next page in the navigation history.

## Events

### AdapterCreated

```csharp
public event EventHandler<WebViewAdapterEventArgs>? AdapterCreated;
```

Fires after underlying webview adapter was initialized.

### AdapterDestroyed

```csharp
public event EventHandler<WebViewNavigationCompletedEventArgs>? AdapterDestroyed;
```

Fires after underlying webview adapter was destroyed.

### EnvironmentRequested

```csharp
public event EventHandler<WebViewEnvironmentRequestedEventArgs>? EnvironmentRequested;
```

Fired before the underlying webview adapter is created, allowing customization of the webview environment.
Use this event to modify environment options (such as enabling private mode or dev tools) before the webview is initialized.
The event argument type depends on the platform.

See [WebView Environment Options](./interop/environment-options.md) for more details.

### NavigationCompleted

```csharp
public event EventHandler<WebViewNavigationCompletedEventArgs>? NavigationCompleted;
```

Fires after navigation of the top-level document completes rendering, either successfully or unsuccessfully.

### NavigationStarted

```csharp
public event EventHandler<WebViewNavigationStartingEventArgs>? NavigationStarted;
```

Fires before a new navigation starts for the top-level document.

### NewWindowRequested

```csharp
public event EventHandler<WebViewNewWindowRequestedEventArgs>? NewWindowRequested;
```

Fires before a new navigate starts for the top level document.

### WebMessageReceived

```csharp
public event EventHandler<WebMessageReceivedEventArgs>? WebMessageReceived;
```

Fires after web content sends a message to the app host via `invokeCSharpAction(body)`.

### WebResourceRequested

```csharp
public event EventHandler<WebResourceRequestedEventArgs>? WebResourceRequested;
```

Fires when the WebView is performing a URL request to a matching URL.
Arguments include request information, and headers dictionary.

:::note
Headers dictionary can be readonly depending on the request or platform.
Always check result of the `TrySet` and `TryRemove` methods.
:::

#### Usage Example

Bi-directional JS&lt;-&gt;C# communication example:

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

## Methods

### Navigate

```csharp
public void Navigate(Uri url)
```

Navigates the WebView to the specified URI.

### NavigateToString

```csharp
public void NavigateToString(string text)
```

Renders the provided HTML string as the top-level document.

### InvokeScript

```csharp
public Task<string?> InvokeScript(string scriptName)
```

Executes the provided JavaScript in the top-level document.

#### Usage Example

```xml
<NativeWebView Source="https://avaloniaui.net/" NavigationCompleted="WebView_NavigationCompleted" />
```

```csharp
private async void WebView_NavigationCompleted(object? sender, WebViewNavigationCompletedEventArgs args)
{
    // Execute JavaScript
    await webView.InvokeScript("alert('Hello World')");
}
```

### GoBack

```csharp
public bool GoBack()
```

Navigates to the previous page in navigation history. Returns `false` if navigation is not possible.

### GoForward

```csharp
public bool GoForward()
```

Navigates to the next page in navigation history. Returns `false` if navigation is not possible.

### Refresh

```csharp
public bool Refresh()
```

Reloads the current page.

### Stop

```csharp
public bool Stop()
```

Stops any ongoing navigation.

### ShowPrintUI

```csharp
void ShowPrintUI();
```

Opens the print dialog to print the current web page.

### PrintToPdfStreamAsync

```csharp
Task<Stream> PrintToPdfStreamAsync();
```

Provides the Pdf data of current web page asynchronously.

:::note

This API doesn't accept extended print options, such as Margin or Orientation.
For wider platform support we recommend using custom CSS rules - [@media print](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media#print) and [@page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@page).

:::

### TryGetCommandManager

```csharp
public NativeWebViewCommandManager? TryGetCommandManager()
```

Returns an instance of `NativeWebViewCommandManager` for executing common keyboard commands if supported by the platform.

#### Usage Example

```csharp
var commandManager = webView.TryGetCommandManager();
if (commandManager != null)
{
    // Copy selected content
    commandManager.Copy();
}
```

### TryGetCookieManager

```csharp
public NativeWebViewCookieManager? TryGetCookieManager()
```

Returns an instance of `NativeWebViewCookieManager` for managing cookies if supported by the platform.

#### Usage Example

```csharp
var cookieManager = webView.TryGetCookieManager();
if (cookieManager != null)
{
    // Get all cookies
    var cookies = await cookieManager.GetCookiesAsync();
}
```

### TryGetPlatformHandle

```csharp
public IPlatformHandle? TryGetPlatformHandle()
```

Returns a platform handle of the native control for accessing platform-specific APIs.
See [Native Browser interop](./interop/native-browser-interop.md) for details.

### BeginReparenting

```csharp
public IDisposable BeginReparenting(bool yieldOnLayoutBeforeExiting = true)
```

Delays destruction of the native control during parent changes.

### BeginReparentingAsync

```csharp
public IAsyncDisposable BeginReparentingAsync()
```

Asynchronously delays destruction of the native control during parent changes.

## Platform Support

| Feature                | Windows WebView2-Edge | macOS/iOS WKWebView | Linux | Android | Browser |
|------------------------|-----------------------|-------|---------------------|---------|---------|
| `NativeWebView`        | ✔                     | ✔                   | ✖     | ✔      | ✖*      |
| `TryGetCommandManager` | ✔                    | ✔                   | ✖     | ✔       | ✖*       |
| `TryGetCookieManager`  | ✔                    | ✔                   | ✖     | ✔      | ✖*       |
| `ShowPrintUI` | ✔                    | ✔                   | ✖      | ✖*     | ✖*       |
| `PrintToPdfStreamAsync`  | ✔                    |  ✔**                   | ✖     | ✖*      | ✖*       |

\* Not yet implemented while possible. Let us know if it's a blocker for you.

\** MacOS doesn't allow extended PrintToPdfStreamAsync print options. We recommend using custom CSS rules - [@media print](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media#print) and [@page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@page).

:::note

For Linux support, please use [NativeWebDialog](./nativewebdialog.md)

:::
