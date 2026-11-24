---
id: top-level
title: Top level
description: Access windowing, clipboard, storage, and other services through the TopLevel base class.
doc-type: reference
video:
  src: https://youtu.be/sgLcNJiYRj8
  title: Avalonia TopLevel vs MainWindow — GetTopLevel, Clipboard & FocusManager
---

The [`TopLevel`](/api/avalonia/controls/toplevel) acts as the visual root and base class for all top-level controls, for example [`Window`](/api/avalonia/controls/window). It handles scheduling layout, styling and rendering, as well as keeping track of the client size. Most services are accessed through the `TopLevel`.

## Getting the `TopLevel`

There are two common ways to access a `TopLevel` instance: `GetTopLevel` and the `Window` class.

### Using `TopLevel.GetTopLevel`

You can use the static `GetTopLevel` method of the `TopLevel` class to get the top-level control that contains the current control.

```csharp
var topLevel = TopLevel.GetTopLevel(control);
// Reference services like Clipboard or StorageProvider from topLevel instance.
```

This method is appropriate if you are working within a [user control](/controls/primitives/usercontrol) or a lower-level component and need access to `TopLevel` services.

:::tip
If `TopLevel.GetTopLevel` returns `null`, it is likely the control is not yet attached to the root. To ensure the control is attached, handle `Control.Loaded` and `Control.Unloaded` events to keep track of top level status.
:::

### Using the `Window` class

Since the `Window` class inherits from `TopLevel`, you can directly access services from an instance of `Window`:

```csharp
var topLevel = window;
```

This method is typically used when you are working within the context of a window, such as a `ViewModel` or an event handler for the `Window`.

## Common properties

### `ActualTransparencyLevel`

Gets the achieved `WindowTransparencyLevel` that the platform was able to provide.

```csharp
WindowTransparencyLevel ActualTransparencyLevel { get; }
```

### `ClientSize`

Gets the client size of the window.

```csharp
Size ClientSize { get; }
```

### `Clipboard`

Gets the platform's [clipboard](/docs/services/clipboard) implementation.

```csharp
IClipboard? Clipboard { get; }
```

### `FocusManager`

Gets the [focus manager](/docs/services/focus-manager) of the root.

```csharp
IFocusManager? FocusManager { get; }
```

### `FrameSize`

Gets the total size of the top level, including system frame if present.

```csharp
Size? FrameSize { get; }
```

### `InsetsManager`

Gets the platform's [insets manager](/docs/services/insets-manager) implementation.

```csharp
IInsetsManager? InsetsManager { get; }
```

### `PlatformSettings`

Represents a contract for accessing top-level [platform-specific settings](/docs/services/platform-settings).

```csharp
IPlatformSettings? PlatformSettings { get; }
```

### `RendererDiagnostics`

Gets a value indicating whether the renderer should draw specific diagnostics.

```csharp
RendererDiagnostics RendererDiagnostics { get; }
```

### `RenderScaling`

Gets the scaling factor to use in rendering.

```csharp
double RenderScaling { get; }
```

### `Screens`

Gets the [`Screens`](/api/avalonia/controls/screens) instance, which provides information about connected monitors, including resolution, working area, scaling, and orientation.

Use `Screens` to query the primary display, enumerate all displays, or find the screen containing a specific window or point. See [How to: Work with screens](/docs/how-to/screens-how-to) for usage guidance.

```csharp
Screens Screens { get; }
```

### `RequestedThemeVariant`

Gets or sets the UI theme variant that is used by the control and its child elements. The UI theme you specify with `ThemeVariant` can override the app-level `ThemeVariant`.

```csharp
ThemeVariant? RequestedThemeVariant { get; set; }
```

### `StorageProvider`

Gets the [file system storage](/docs/services/storage/storage-provider) service used for file pickers and bookmarks.

```csharp
IStorageProvider StorageProvider { get; }
```

### `TransparencyBackgroundFallback`

Gets or sets the color that fills the background if transparency is not supported or is restricted. Default is white.

```csharp
IBrush TransparencyBackgroundFallback { get; set; }
```

### `TransparencyLevelHint`

Gets or sets the `WindowTransparencyLevel` that the top level should use if possible. Accepts multiple values, which are applied in a fallback order.

For example, if you set `Mica, Blur`, the top level attempts to apply `Mica` first. If the platform disallows this transparency level, `Blur` is applied instead. Default is an empty array.

```csharp
IReadOnlyList<WindowTransparencyLevel> TransparencyLevelHint { get; set; }
```

## Common events

### `BackRequested`

Physical Back button is pressed, or back navigation has been requested.

```csharp
event EventHandler<RoutedEventArgs> BackRequested { add; remove; }
```

### `Closed`

Window is closed.

```csharp
event EventHandler Closed;
```

### `Opened`

Window is opened.

```csharp
event EventHandler Opened;
```

### `ScalingChanged`

Scaling of the top level has changed.

```csharp
event EventHandler ScalingChanged;
```

## Common methods

### `GetTopLevel`

Gets the `TopLevel` in which the given `Visual` is hosted.

The `visual` parameter indicates the visual to be queried.

```csharp
static TopLevel? GetTopLevel(Visual? visual)
```

### `RequestAnimationFrame`

Enqueues a callback to be called on the next animation tick. The callback runs on the UI thread, synchronized with Avalonia's rendering cycle.

Each call schedules a single invocation. To create a continuous animation loop, call `RequestAnimationFrame` again from within the callback.

The `action` parameter receives a `TimeSpan`, representing the elapsed time since the animation system started. Use this value to calculate frame-independent animation progress.

```csharp
void RequestAnimationFrame(Action<TimeSpan> action)
```

#### Example: Continuous animation loop

```csharp
var topLevel = TopLevel.GetTopLevel(this);

topLevel.RequestAnimationFrame(OnAnimationFrame);

private void OnAnimationFrame(TimeSpan elapsed)
{
    // Update your visual state based on elapsed time
    _angle = elapsed.TotalSeconds * 90; // 90 degrees per second
    InvalidateVisual();

    // Schedule the next frame to keep the loop running
    TopLevel.GetTopLevel(this)?.RequestAnimationFrame(OnAnimationFrame);
}
```

This is the Avalonia equivalent of WPF's `CompositionTarget.Rendering`. For render-thread callbacks that do not block the UI thread, see [CompositionCustomVisualHandler](/docs/graphics-animation/custom-rendering#compositioncustomvisualhandler).

### `RequestPlatformInhibition`

Requests a `PlatformInhibitionType` to be inhibited. The behavior remains inhibited until the return value is disposed.

Available options for `PlatformInhibitionType` depends on the platform. If a behavior is inhibited on a platform where its type is not supported, the request has no effect.

```csharp
async Task<IDisposable> RequestPlatformInhibition(PlatformInhibitionType type, string reason)
```

### `TryGetPlatformHandle`

Tries to get the platform handle for the `TopLevel`-derived control.

```csharp
IPlatformHandle? TryGetPlatformHandle()
```

## See also

- [Main window](/docs/fundamentals/main-window)
- [Application lifetimes](/docs/fundamentals/application-lifetimes)
- [Working with screens](/docs/how-to/screens-how-to): Query monitor resolution, bounds, and scaling.
- [Custom rendering](/docs/graphics-animation/custom-rendering): Custom drawing and render-thread callbacks.
- [Composition animations](/docs/graphics-animation/composition-animations): Render-thread property animations.
- [`TopLevel.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TopLevel.cs)
