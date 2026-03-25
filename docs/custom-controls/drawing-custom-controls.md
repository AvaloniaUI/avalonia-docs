---
id: drawing-custom-controls
title: Drawing custom controls
description: Render custom visuals by overriding the Render method and using DrawingContext operations.
doc-type: how-to
---

import DrawWithPropertyScreenshot from '/img/guides/ui-development/custom-controls/draw-property.png';

On this page you will see how to draw a custom control, using the value for a simple property that defines the background color. The code now looks like this:

```xml title='MainWindow.xaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">
  <cc:MyCustomControl Height="200" Width="300" Background="Red"/>
</Window>

```

```csharp title='MyCustomControl.cs'
using Avalonia.Controls;

namespace AvaloniaCCExample.CustomControls
{
    public class MyCustomControl : Control
    {
        public IBrush? Background { get; set; }

        public sealed override void Render(DrawingContext context)
        {
            if (Background != null)
            {
                var renderSize = Bounds.Size;
                context.FillRectangle(Background, new Rect(renderSize));
            }
            
            base.Render(context);
        }
    }
}
```

This example defines a simple brush property on the custom control for the background color. It then overrides the `Render` method to draw the control.

The drawing code uses the Avalonia graphics context (that is passed to the render method), to draw a rectangle that is filled with the background color, and made the same size as the control (as supplied by the `Bounds.Size` object).

<img src={DrawWithPropertyScreenshot} alt="Custom-drawn control rendered with a bound property value"/>

Notice how the control now shows both at runtime (above) and in the preview pane.

On the next page, you will see how to implement the background property so that it can be changed by the Avalonia styling system. 

:::tip
You can find a more advanced tutorial in [Avalonia.Samples](
https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/SnowflakesControlSample)
:::

## DrawingContext methods

The `DrawingContext` provides several methods for rendering content in your custom control:

| Method | Description |
|---|---|
| `DrawRectangle` | Draws a rectangle with optional fill and pen |
| `DrawEllipse` | Draws an ellipse |
| `DrawLine` | Draws a line between two points |
| `DrawGeometry` | Draws an arbitrary geometry path |
| `DrawText` | Draws formatted text |
| `DrawImage` | Draws a bitmap image |
| `FillRectangle` | Fills a rectangle (shorthand) |

## Drawing shapes

The following example demonstrates drawing multiple shapes within a single `Render` override:

```csharp
public override void Render(DrawingContext context)
{
    var pen = new Pen(Brushes.Black, 2);

    // Draw a filled rectangle
    context.DrawRectangle(Brushes.LightBlue, pen, new Rect(10, 10, 100, 60));

    // Draw an ellipse
    context.DrawEllipse(Brushes.Orange, pen, new Point(200, 40), 50, 30);

    // Draw a line
    context.DrawLine(new Pen(Brushes.Red, 3), new Point(10, 100), new Point(290, 100));
}
```

## Drawing text

You can draw formatted text using `DrawText` with a `FormattedText` object:

```csharp
public override void Render(DrawingContext context)
{
    var text = new FormattedText(
        "Hello, Avalonia!",
        CultureInfo.CurrentCulture,
        FlowDirection.LeftToRight,
        new Typeface("Arial"),
        24,
        Brushes.Black);

    context.DrawText(text, new Point(10, 10));
}
```

## Using clipping and transforms

The `DrawingContext` supports clipping regions and transforms. Both `PushClip` and `PushTransform` return disposable objects, so wrapping them in `using` blocks ensures the state is restored automatically:

```csharp
public override void Render(DrawingContext context)
{
    // Save and restore state with PushClip
    using (context.PushClip(new Rect(0, 0, 100, 100)))
    {
        context.FillRectangle(Brushes.Blue, new Rect(0, 0, 200, 200));
        // Only the portion within 100x100 is visible
    }

    // Apply a transform
    using (context.PushTransform(Matrix.CreateRotation(Math.PI / 4)))
    {
        context.FillRectangle(Brushes.Green, new Rect(150, 50, 40, 40));
    }
}
```

## Invalidating the visual

To trigger a re-render when a property changes, register the property with `AffectsRender` in the static constructor, or call `InvalidateVisual()` manually:

```csharp
static MyCustomControl()
{
    AffectsRender<MyCustomControl>(BackgroundProperty);
}
```

Calling `InvalidateVisual()` on a control instance marks it as needing a redraw. Avalonia will then call `Render` again on the next layout pass.

## See also

- [Custom Rendering](/docs/graphics-animation/custom-rendering): Advanced rendering techniques.
- [Brushes](/docs/graphics-animation/brushes): Available brush types.
- [Shapes and Geometries](/docs/graphics-animation/shapes-and-geometries): Geometry types for drawing.