---
description: CONCEPTS
---

# The TopLevel

The TopLevel act as the visual root, and is the base class for all top level controls, eg. `Window`. It handles scheduling layout, styling and rendering as well as keeping track of the client size. Most services are accessed through the TopLevel.

## Getting the TopLevel

Here are two common ways to access TopLevel instance.

### Using TopLevel.GetTopLevel

You can use the static `GetTopLevel` method of the TopLevel class to get the top-level control that contains the current control.

```cs
var topLevel = TopLevel.GetTopLevel(control);
// Here you can reference various services like Clipboard or StorageProvider from topLevel instance.
```

This method can be helpful if you're working within a user control or a lower-level component and need access to the TopLevel services.

:::note
If `TopLevel.GetTopLevel` returns null, likely control is not yet attached to the root. To ensure control is attached, you should handle `Control.Loaded` and `Control.Unloaded` events and keep track of current top level from these events.
:::

### Using the Window Class

Since the`Window` class inherits from `TopLevel`, you can directly access services from an instance of `Window`:

```cs
var topLevel = window;
```

This method is typically used when you're already working within the context of a window, such as in a ViewModel or an event handler within the `Window` class.

## Common Properties

### ActualTransparencyLevel

Gets the achieved `WindowTransparencyLevel` that the platform was able to provide.

```cs
WindowTransparencyLevel ActualTransparencyLevel { get; }
```

### ClientSize

Gets the client size of the window.

```cs
Size ClientSize { get; }
```

### Clipboard

Gets the platform's [Clipboard](./services/clipboard) implementation.

```cs
IClipboard? Clipboard { get; }
```

### FocusManager

Gets [focus manager](./services/focus-manager) of the root.

```cs
IFocusManager? FocusManager { get; }
```

### FrameSize

Gets the total size of the top level including system frame if presented.

```cs
Size? FrameSize { get; }
```

### InsetsManager

Gets the platform's [InsetsManager](./services/insets-manager) implementation.

```cs
IInsetsManager? InsetsManager { get; }
```

### PlatformSettings

Represents a contract for accessing top-level [platform-specific settings](./services/platform-settings).

```cs
IPlatformSettings? PlatformSettings { get; }
```

### RendererDiagnostics

Gets a value indicating whether the renderer should draw specific diagnostics.

```cs
RendererDiagnostics RendererDiagnostics { get; }
```

### RenderScaling

Gets the scaling factor to use in rendering.

```cs
double RenderScaling { get; }
```

### RequestedThemeVariant

Gets or sets the UI theme variant that is used by the control (and its child elements) for resource determination. The UI theme you specify with ThemeVariant can override the app-level ThemeVariant.

```cs
ThemeVariant? RequestedThemeVariant { get; set; }
```

### StorageProvider

[File System storage](./services/storage-provider/) service used for file pickers and bookmarks.

```cs
IStorageProvider StorageProvider { get; }
```

### TransparencyBackgroundFallback

Gets or sets the `IBrush` that transparency will blend with when transparency is not supported. By default this is a solid white brush.

```cs
IBrush TransparencyBackgroundFallback { get; set; }
```

### TransparencyLevelHint

Gets or sets the `WindowTransparencyLevel` that the TopLevel should use when possible. Accepts multiple values which are applied in a fallback order. For instance, with "Mica, Blur" Mica will be applied only on platforms where it is possible, and Blur will be used on the rest of them. Default value is an empty array or "None".

```cs
IReadOnlyList<WindowTransparencyLevel> TransparencyLevelHint { get; set; }
```

## Common Events

### BackRequested

Occurs when physical Back Button is pressed or a back navigation has been requested.

```cs
event EventHandler<RoutedEventArgs> BackRequested { add; remove; }
```

### Closed

Fired when the window is closed.

```cs
event EventHandler Closed;
```

### Opened

Fired when the window is opened.

```cs
event EventHandler Opened;
```

### ScalingChanged

Occurs when the TopLevel's scaling changes.

```cs
event EventHandler ScalingChanged;
```

## Common Methods

### GetTopLevel

Gets the `TopLevel` for which the given `Visual` is hosted in.

#### Parameters

`control`
The visual to query its TopLevel

```cs
static TopLevel? GetTopLevel(Visual? visual)
```

### RequestAnimationFrame

Enqueues a callback to be called on the next animation tick

```cs
void RequestAnimationFrame(Action<TimeSpan> action)
```

### RequestPlatformInhibition

Requests a `PlatformInhibitionType` to be inhibited. The behavior remains inhibited until the return value is disposed. The available set of `PlatformInhibitionType`s depends on the platform. If a behavior is inhibited on a platform where this type is not supported the request will have no effect.

```cs
async Task<IDisposable> RequestPlatformInhibition(PlatformInhibitionType type, string reason)
```

### TryGetPlatformHandle

Tries to get the platform handle for the TopLevel-derived control.

```cs
IPlatformHandle? TryGetPlatformHandle()
```

## More Information

View the source code on _GitHub_ [`TopLevel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TopLevel.cs)
