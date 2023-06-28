---
description: CONCEPTS
---

# The TopLevel

The TopLevel act as the visual root, and is the base class for all top level controls, eg. `Window`. It handles scheduling layout, styling and rendering as well as keeping track of the client size. Most services are accessed through the TopLevel.

## Getting the TopLevel
All controls attached to the visual tree can access their top level. The `TopLevel.GetTopLevel(Visual? visual)` static function returns the TopLevel that `visual` is attached to, or `null` if `visual` is null, or it is not currently attached to any visual tree.

## Properties

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
Gets the total size of the top level.

```cs
Size? FrameSize { get; }
```

### InsetsManager
Gets the platform's [InsetsManager](./services/insets-manager) implementation.

```cs
IInsetsManager? InsetsManager { get; }
```

### PlatformSettings
Represents a contract for accessing top-level platform-specific settings.

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

## Events

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

## Methods

### GetSystemBarColor
Helper for getting the color of the platform's system bars.
#### Parameters
`control` 
The main view attached to the toplevel, or the toplevel.

```cs
static SolidColorBrush? GetSystemBarColor(Control control)
```

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

### SetSystemBarColor
Helper for setting the color of the platform's system bars.
#### Parameters
`control` 
The main view attached to the toplevel, or the toplevel.

`color` 
The color to set.

```cs
static void SetSystemBarColor(Control control, SolidColorBrush? color)
```

### TryGetPlatformHandle
Tries to get the platform handle for the TopLevel-derived control.

```cs
IPlatformHandle? TryGetPlatformHandle()
```


## More Information

View the source code on _GitHub_ [`TopLevel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TopLevel.cs)
