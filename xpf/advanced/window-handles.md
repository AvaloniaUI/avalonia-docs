---
id: window-handles
title: Window Handles
---

## Overview

XPF uses a system where the handles returned from various WPF API calls are _virtual handles_. In this way, XPF can intercept API calls using these handles and automatically translate them into the appropriate cross-platform API. This has the effect that many WPF APIs such as `WindowInteropHelper.Handle` return these virtualized window handles, as well as [emulated win32 APIs](../third-party-libraries.md).

## Getting a Native Window Handle

The native handle for a window can be retrieved from the [underlying Avalonia `Window`](./avalonia-interop.md#getting-the-avalonia-window) using the following code.

```csharp
if (XpfWpfAbstraction.GetAvaloniaWindowForWindow(xpfWindow) is { } avaloniaWindow &&
    avaloniaWindow.TryGetPlatformHandle()?.Handle is { } nativeHandle)
{
    // You now have the native handle for the XPF window as an IntPtr.
}
```

:::note
The type of the handle retrieved in this manner will be different depending on the OS platform and cannot be passed to the win32 API emulation layer. For example, on Windows it will be a `HWND` but on macOS it will be an `NSWindow` pointer. The type of the handle can be retrieved by using the `IPlatformHandle.HandleDescriptor` property.
:::
