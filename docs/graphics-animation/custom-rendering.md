---
id: custom-rendering
title: Custom rendering
description: Draw custom graphics by overriding the Render method with DrawingContext.
doc-type: how-to
---

Avalonia provides a `DrawingContext` API for rendering custom graphics within controls. This is useful when the built-in shape and geometry controls are not flexible enough for your needs.

## Overriding render

To draw custom content, override the `Render` method on any `Control`:

```csharp
public class SimpleCircle : Control
{
    public override void Render(DrawingContext context)
    {
        var center = new Point(Bounds.Width / 2, Bounds.Height / 2);
        var radius = Math.Min(Bounds.Width, Bounds.Height) / 2 - 4;

        context.DrawEllipse(
            Brushes.CornflowerBlue,         // fill brush
            new Pen(Brushes.Navy, 2),       // stroke pen
            center,
            radius,                          // radiusX
            radius);                         // radiusY
    }
}
```

Use the control in XAML:

```xml
<local:SimpleCircle Width="100" Height="100" />
```

The `Render` method is called whenever the control needs to be redrawn. Call `InvalidateVisual()` to request a redraw when your data changes.

## DrawingContext operations

The `DrawingContext` provides these drawing operations:

| Method | Description |
|---|---|
| `DrawRectangle(brush, pen, rect, radiusX, radiusY)` | Draw a rectangle, optionally rounded |
| `DrawEllipse(brush, pen, center, radiusX, radiusY)` | Draw an ellipse |
| `DrawLine(pen, p1, p2)` | Draw a line between two points |
| `DrawGeometry(brush, pen, geometry)` | Draw an arbitrary geometry |
| `DrawText(formattedText, origin)` | Draw formatted text at a point |
| `DrawImage(bitmap, sourceRect, destRect)` | Draw a bitmap image |
| `DrawGlyphRun(brush, glyphRun)` | Draw pre-shaped text glyphs |

### Drawing with state

Use `PushClip`, `PushOpacity`, `PushTransform`, and related methods to modify the drawing state. These return an `IDisposable` that restores the previous state when disposed:

```csharp
public override void Render(DrawingContext context)
{
    // Clip to a rounded rectangle
    using (context.PushClip(new RoundedRect(new Rect(Bounds.Size), 8)))
    {
        // Fill background
        context.DrawRectangle(Brushes.White, null, new Rect(Bounds.Size));

        // Apply opacity to a group of draws
        using (context.PushOpacity(0.5))
        {
            context.DrawEllipse(Brushes.Red, null,
                new Point(30, 30), 20, 20);
        }

        // Apply a transform
        using (context.PushTransform(Matrix.CreateRotation(0.2)))
        {
            context.DrawRectangle(Brushes.Blue, null,
                new Rect(10, 10, 50, 50));
        }
    }
}
```

### Drawing text

Use [`FormattedText`](/api/avalonia/media/formattedtext) to measure and render a single run of text:

```csharp
public override void Render(DrawingContext context)
{
    var text = new FormattedText(
        "Hello, Avalonia!",
        CultureInfo.CurrentCulture,
        FlowDirection.LeftToRight,
        new Typeface("Segoe UI"),
        16,
        Brushes.Black);

    context.DrawText(text, new Point(10, 10));
}
```

`FormattedText` is suitable for simple, single-line or short text. For multi-line text, text wrapping, justified alignment, or per-line metrics, use `TextLayout` instead. `TextLayout` supports features that `FormattedText` does not, including `TextAlignment.Justify`:

```csharp
var layout = new TextLayout(
    "Multi-line text with wrapping and justification support.",
    new Typeface("Segoe UI"),
    16,
    Brushes.Black,
    textAlignment: TextAlignment.Justify,
    maxWidth: 200);

// Access line metrics
foreach (var line in layout.TextLines)
{
    // line.Height, line.Width, line.Start, and other metrics
}

layout.Draw(context, new Point(10, 10));
```

### Drawing images

Load and draw bitmap images:

```csharp
private IImage? _image;

protected override void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);
    var assets = AvaloniaLocator.Current.GetService<IAssetLoader>();
    var uri = new Uri("avares://MyApp/Assets/photo.png");
    _image = new Bitmap(AssetLoader.Open(uri));
    InvalidateVisual();
}

public override void Render(DrawingContext context)
{
    if (_image is null) return;

    var destRect = new Rect(0, 0, Bounds.Width, Bounds.Height);
    var sourceRect = new Rect(0, 0, _image.Size.Width, _image.Size.Height);

    context.DrawImage(_image, sourceRect, destRect);
}
```

## Invalidating the visual

The framework caches the results of `Render`. When your control's data changes, you must explicitly request a redraw:

```csharp
public static readonly StyledProperty<double> ProgressProperty =
    AvaloniaProperty.Register<ProgressRing, double>(nameof(Progress));

public double Progress
{
    get => GetValue(ProgressProperty);
    set => SetValue(ProgressProperty, value);
}

static ProgressRing()
{
    // Automatically invalidate visual when Progress changes
    AffectsRender<ProgressRing>(ProgressProperty);
}
```

`AffectsRender` registers a callback so that any change to `Progress` triggers `InvalidateVisual()` automatically. You can also call `InvalidateVisual()` manually when needed.

## RenderTargetBitmap

To capture a control's rendered output as a bitmap (e.g., for saving to a file or image processing):

```csharp
var pixelSize = new PixelSize(
    (int)myControl.Bounds.Width,
    (int)myControl.Bounds.Height);

var renderTarget = new RenderTargetBitmap(pixelSize, new Vector(96, 96));
renderTarget.Render(myControl);

// Save to file
renderTarget.Save("output.png");
```

## ICustomDrawOperation for SkiaSharp

For direct access to the SkiaSharp canvas (e.g., for complex charts, 3D rendering, or game graphics), implement `ICustomDrawOperation`:

```csharp
using Avalonia.Rendering.SceneGraph;
using Avalonia.Skia;
using SkiaSharp;

public class ChartControl : Control
{
    public override void Render(DrawingContext context)
    {
        context.Custom(new ChartDrawOperation(new Rect(Bounds.Size)));
    }

    private class ChartDrawOperation : ICustomDrawOperation
    {
        public ChartDrawOperation(Rect bounds) => Bounds = bounds;

        public Rect Bounds { get; }

        public void Render(ImmediateDrawingContext context)
        {
            var feature = context.TryGetFeature<ISkiaSharpApiLeaseFeature>();
            if (feature is null) return;

            using var lease = feature.Lease();
            var canvas = lease.SkCanvas;

            // Use full SkiaSharp API
            using var paint = new SKPaint
            {
                IsAntialias = true,
                Style = SKPaintStyle.Stroke,
                StrokeWidth = 2,
                Color = SKColors.DodgerBlue
            };

            var path = new SKPath();
            path.MoveTo(0, (float)Bounds.Height);
            path.LineTo((float)Bounds.Width * 0.25f, (float)Bounds.Height * 0.6f);
            path.LineTo((float)Bounds.Width * 0.5f, (float)Bounds.Height * 0.8f);
            path.LineTo((float)Bounds.Width * 0.75f, (float)Bounds.Height * 0.2f);
            path.LineTo((float)Bounds.Width, (float)Bounds.Height * 0.4f);

            canvas.DrawPath(path, paint);
        }

        public bool HitTest(Point p) => Bounds.Contains(p);
        public bool Equals(ICustomDrawOperation? other) => false;
        public void Dispose() { }
    }
}
```

Add the required NuGet packages:

```xml
<PackageReference Include="Avalonia.Skia" Version="11.2.*" />
<PackageReference Include="SkiaSharp" Version="2.88.*" />
```

## GPU interop with composition surfaces

For advanced scenarios such as video playback, 3D engine integration, or cross-process GPU texture sharing, Avalonia's composition API supports importing external GPU resources into a `CompositionDrawingSurface`.

### Importing GPU images

Use the compositor to import external GPU textures (for example, a Vulkan image or an IOSurface on macOS) and display them in a composition surface:

```csharp
var compositor = ElementComposition.GetElementVisual(this)!.Compositor;

// Import an external GPU image handle
var image = compositor.ImportGpuImage(
    PlatformGraphicsExternalImageProperties.CreateForVulkan(
        pixelSize, format),
    new PlatformHandle(handle, handleType));

// Import semaphores for GPU synchronization
var waitSemaphore = compositor.ImportGpuSemaphore(
    new PlatformHandle(semaphoreHandle, semaphoreType));
var signalSemaphore = compositor.ImportGpuSemaphore(
    new PlatformHandle(semaphoreHandle2, semaphoreType));

// Update the surface with the imported image
await surface.UpdateWithKeyedMutexAsync(image);
// or with timeline semaphores (macOS Metal):
await surface.UpdateWithTimelineSemaphoresAsync(
    image,
    waitSemaphore, waitValue,
    signalSemaphore, signalValue);
```

### Supported handle types

GPU image and semaphore handle types vary by platform. Use `KnownPlatformGraphicsExternalImageHandleTypes` and `KnownPlatformGraphicsExternalSemaphoreHandleTypes` to discover available types:

| Platform | Image handle types | Semaphore handle types |
|---|---|---|
| Windows | `D3D11TextureNtHandle`, `VulkanOpaqueNtHandle` | `D3D11Fence`, `VulkanOpaqueNtHandle` |
| macOS | `IOSurfaceRef` | `MetalSharedEvent` |
| Linux | `DmaBuf`, `VulkanOpaqueFd` | `VulkanOpaqueFd` |

Check `CompositionGpuImportedImageSynchronizationCapabilities` on an imported image to determine which synchronization methods are available (`KeyedMutex`, `Semaphores`, `TimelineSemaphores`).

## CompositionCustomVisualHandler

[`CompositionCustomVisualHandler`](/api/avalonia/rendering/composition/compositioncustomvisualhandler) provides per-frame callbacks that run directly on the render thread, without blocking the UI thread. This is useful for smooth, continuous animations or real-time visualizations where UI-thread overhead is a concern.

For simpler scenarios where UI-thread callbacks are acceptable, use [`TopLevel.RequestAnimationFrame`](/docs/fundamentals/top-level#requestanimationframe) instead.

### Setting up a custom visual handler

Create a `CompositionCustomVisualHandler` and register it with a control's composition visual:

```csharp
public class RenderThreadAnimationControl : Control
{
    private CompositionCustomVisualHandler? _handler;

    protected override void OnAttachedToVisualTree(VisualTreeAttachmentEventArgs e)
    {
        base.OnAttachedToVisualTree(e);

        var visual = ElementComposition.GetElementVisual(this);
        if (visual == null) return;

        var compositor = visual.Compositor;

        _handler = new CompositionCustomVisualHandler(
            OnRender, OnMessage);

        compositor.CreateCustomVisual(_handler);
    }

    private void OnRender(
        CompositionCustomVisualHandler sender,
        SkiaSharp.SKCanvas canvas,
        RenderBounds bounds)
    {
        // This runs on the render thread.
        // Draw directly with the SkiaSharp canvas.
        using var paint = new SkiaSharp.SKPaint
        {
            IsAntialias = true,
            Color = SkiaSharp.SKColors.CornflowerBlue
        };
        canvas.DrawCircle(
            (float)bounds.Width / 2,
            (float)bounds.Height / 2,
            50f, paint);

        // Request another frame for continuous rendering
        sender.RequestNextFrameRendering();
    }

    private void OnMessage(
        CompositionCustomVisualHandler sender,
        object message)
    {
        // Handle messages sent from the UI thread
        // via sender.SendHandlerMessage(data)
    }
}
```

### Communicating between threads

Because `OnRender` runs on the render thread, you cannot directly access UI-thread state. Use `SendHandlerMessage` to pass data from the UI thread to the render callback:

```csharp
// On the UI thread: send updated data to the render thread
_handler?.SendHandlerMessage(new AnimationData(progress: 0.5));
```

The message arrives in the `OnMessage` callback, where you can store it for use in the next render pass. This pattern keeps the UI thread responsive while the render thread handles drawing.

### When to use CompositionCustomVisualHandler

| Approach | Thread | Use case |
|---|---|---|
| `TopLevel.RequestAnimationFrame` | UI thread | Simple per-frame updates, property animation loops |
| `CompositionCustomVisualHandler` | Render thread | Real-time visualizations, game loops, video rendering |
| `Render()` override | UI thread | Standard custom control drawing |

## Performance considerations

- `Render` is called on the UI thread. Keep drawing operations fast and avoid allocations where possible.
- Reuse `Pen`, `Brush`, and `FormattedText` objects when the parameters do not change. Store them as fields and recreate only when their inputs change.
- For controls that render frequently (e.g., charts, gauges), use `AffectsRender` to avoid unnecessary redraws.
- For complex scenes, consider breaking your control into smaller controls so that only the changed portion needs to redraw.
- `ICustomDrawOperation` bypasses Avalonia's scene graph caching. Use it only when you need SkiaSharp-level control.

## See also

- [TopLevel.RequestAnimationFrame](/docs/fundamentals/top-level#requestanimationframe): Per-frame callbacks on the UI thread.
- [Composition Animations](/docs/graphics-animation/composition-animations): Render-thread property animations using the composition API.
- [Shapes and Geometries](/docs/graphics-animation/shapes-and-geometries): Built-in shape controls and geometry types.
- [Drawing Controls](/docs/custom-controls/drawing-custom-controls): Creating custom controls that draw themselves.
- [Brushes](/docs/graphics-animation/brushes): Available brush types for filling and stroking.
- [Effects](/docs/graphics-animation/effects): Shadows, blur, and visual effects.
