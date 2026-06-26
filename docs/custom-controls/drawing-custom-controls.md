---
id: drawing-custom-controls
title: Drawing custom controls
description: A list of DrawingContext methods, with examples of how to use them to draw custom controls.
doc-type: reference
---

When [creating a custom basic control](/docs/custom-controls/custom-drawn-basic-controls), you can override the `Render` method and use [`DrawingContext`](/api/avalonia/media/drawingcontext) to specify the exact visual appearance of the control.

This page provides reference information on `DrawingContext` methods, along with examples of common drawing operations.

## `DrawingContext` methods

[`DrawingContext`](/api/avalonia/media/drawingcontext) provides the following methods for rendering custom controls:

| Method | Description |
|---|---|
| `DrawRectangle` | Draws a rectangle. |
| `DrawEllipse` | Draws an ellipse. |
| `DrawLine` | Draws a line between two points. |
| `DrawGeometry` | Draws an arbitrary geometry path. |
| `DrawText` | Draws formatted text. |
| `DrawImage` | Draws a bitmap image. |
| `FillRectangle` | Fills a rectangle (shorthand). |

## Drawing shapes

You can draw multiple shapes within a single `Render` override:

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

## Clipping and transforming

Use `PushClip` and `PushTransform` to clip and/or transform regions. Both return disposable objects, so wrap them in `using` blocks to ensure the state is restored automatically:

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

## See also

- [Custom-drawn basic controls](/docs/custom-controls/custom-drawn-basic-controls): How to create a custom basic control
- [Custom control sample project](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/SnowflakesControlSample): Practical sample showing how to override `Render` to draw a custom control. 
- [Custom Rendering](/docs/graphics-animation/custom-rendering): Advanced rendering techniques.
- [Brushes](/docs/graphics-animation/brushes): Available brush types.
- [Shapes and Geometries](/docs/graphics-animation/shapes-and-geometries): Geometry types for drawing.