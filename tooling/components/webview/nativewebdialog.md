# NativeWebDialog

## Overview

`NativeWebDialog` is a dialog window that hosts a native web browser implementation. It provides a way to display web content in a separate window, particularly useful for platforms like Linux where embedded WebView controls might not be available.

## Properties

### Title

```csharp
public string? Title { get; set; }
```

Gets or sets the dialog window title.

### CanUserResize

```csharp
public bool CanUserResize { get; set; }
```

Gets or sets whether the dialog can be resized by the user.

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

### Closing

```csharp
public event EventHandler Closing;
```

Fires before the WebView dialog is closed.

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

## Methods

### Show

```csharp
public void Show()
```

Opens the WebView dialog.

### Show (with owner)

```csharp
public bool Show(IPlatformHandle owner)
```

Opens the WebView dialog with a specified owner window.

### Close

```csharp
public void Close()
```

Closes the WebView dialog.

### Resize

```csharp
public bool Resize(int width, int height)
```

Resizes the dialog window to the specified dimensions.

### Move

```csharp
public bool Move(int x, int y)
```

Moves the dialog window to the specified screen coordinates.

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

### TryGetCommandManager

```csharp
public NativeWebViewCommandManager? TryGetCommandManager()
```

Returns an instance of `NativeWebViewCommandManager` for executing common keyboard commands if supported by the platform.

### TryGetCookieManager

```csharp
public NativeWebViewCookieManager? TryGetCookieManager()
```

Returns an instance of `NativeWebViewCookieManager` for managing cookies if supported by the platform.

### TryGetWebViewPlatformHandle

```csharp
public IPlatformHandle? TryGetWebViewPlatformHandle()
```

Gets platform handle of the webview hosted inside the dialog.
See [Native Browser interop](./interop/native-browser-interop.md) for details.

### TryGetPlatformHandle

```csharp
public IPlatformHandle? TryGetPlatformHandle()
```

Returns a platform handle of the dialog window itself.
For Avalonia dialog, returned value is Avalonia window handle itself.
For GTK native dialog returned value uses GtkWindow as a handle.

## Usage Example

```csharp
var dialog = new NativeWebDialog
{
    Title = "Avalonia Docs",
    CanUserResize = false,
    Source = new Uri("https://docs.avaloniaui.net/")
};

// Create TaskCompletionSource so we can wait until window is closed.
var tcs = new TaskCompletionSource();
dialog.Closing += (s, e) => tcs.SetResult();

// Show the dialog
dialog.Show(mainWindow);

await tcs.Task;
```

## Platform Support

| Feature            | Windows | macOS | Linux | iOS   | Android | Browser |
|--------------------|---------|-------|-------|-------|---------|---------|
| Show               | ✔       | ✔     | ✔     | ✖     | ✖       | ✖       |
| Show(Window)       | ✔       | ✔     | ✔*    | ✖     | ✖       | ✖       |
| WebMessageReceived | ✔       | ✔     | ✖     | ✖     | ✖       | ✖       |

\* Linux support may vary depending on the window manager
