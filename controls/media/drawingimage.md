---
id: drawingimage
title: DrawingImage
description: A control that renders vector graphics as an IImage using Avalonia Drawing objects, enabling resolution-independent icons and shapes defined entirely in XAML.
doc-type: reference
---

[`DrawingImage`](/api/avalonia/media/drawingimage) renders vector graphics as an `IImage`, making it usable anywhere a bitmap image would be. Instead of loading pixels from a file, it draws shapes, paths, and other vector content defined through Avalonia's [`Drawing`](/api/avalonia/media/drawing) classes.

This is useful when you need resolution-independent icons or graphics that can scale without quality loss, or when you want to define images purely in XAML without external asset files.

## Drawing types

A `DrawingImage` wraps a single `Drawing` object in its `Drawing` property. Avalonia provides four concrete drawing types:

| Type | Purpose |
| :--- | :--- |
| `GeometryDrawing` | Fills and/or strokes a `Geometry` shape |
| `ImageDrawing` | Renders a bitmap image within a rectangular region |
| `GlyphRunDrawing` | Renders a glyph run with a foreground brush |
| [`DrawingGroup`](/api/avalonia/media/drawinggroup) | Combines multiple drawings into one, with optional transform, clip, and opacity |

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
| :--- | :--- | :--- |
| `Drawing` | `Drawing` | The vector drawing content to render |
| `Viewbox` | `Rect` | A rectangular region of the drawing to display, in device-independent pixels |

## Examples

### Simple vector icon

This example creates a green circle with a dark green border using `GeometryDrawing`:

```xml title="XAML"
<Image Width="64" Height="64">
  <Image.Source>
    <DrawingImage>
      <GeometryDrawing Brush="Green" Geometry="M 32,0 A 32,32 0 1 1 32,64 A 32,32 0 1 1 32,0 Z">
        <GeometryDrawing.Pen>
          <Pen Brush="DarkGreen" Thickness="2" />
        </GeometryDrawing.Pen>
      </GeometryDrawing>
    </DrawingImage>
  </Image.Source>
</Image>
```

### Combining multiple drawings

Use a `DrawingGroup` to compose multiple shapes into a single image. This example draws a simple house icon:

```xml title="XAML"
<Image Width="100" Height="100">
  <Image.Source>
    <DrawingImage>
      <DrawingGroup>
        <!-- Roof -->
        <GeometryDrawing Brush="Brown" Geometry="M 10,50 L 50,10 L 90,50 Z" />
        <!-- Walls -->
        <GeometryDrawing Brush="Beige" Geometry="M 20,50 L 20,90 L 80,90 L 80,50 Z">
          <GeometryDrawing.Pen>
            <Pen Brush="Gray" Thickness="1" />
          </GeometryDrawing.Pen>
        </GeometryDrawing>
        <!-- Door -->
        <GeometryDrawing Brush="SaddleBrown" Geometry="M 40,60 L 40,90 L 60,90 L 60,60 Z" />
      </DrawingGroup>
    </DrawingImage>
  </Image.Source>
</Image>
```

### Using as a resource

You can define a `DrawingImage` as a resource and reference it across your application. This approach keeps your icon definitions in one place and lets you reuse them in multiple controls:

```xml title="XAML"
<UserControl.Resources>
  <DrawingImage x:Key="CheckIcon">
    <GeometryDrawing Brush="Green" Geometry="M 2,5 L 4,7 L 8,3" >
      <GeometryDrawing.Pen>
        <Pen Brush="Green" Thickness="1" LineCap="Round" LineJoin="Round" />
      </GeometryDrawing.Pen>
    </GeometryDrawing>
  </DrawingImage>
</UserControl.Resources>

<Image Source="{StaticResource CheckIcon}" Width="24" Height="24" />
```

### `DrawingImage` vs. bitmap images

Use `DrawingImage` when you need:

- Resolution-independent graphics that scale cleanly at any size
- Icons defined entirely in XAML without external files
- Dynamic graphics where brushes or geometry can be bound to data

Use bitmap images (`Image.Source` with an asset path) when you have photographic content or pre-rendered artwork.

## Practical notes

- **Viewbox cropping.** If you set the `Viewbox` property, only the specified rectangle of your drawing is rendered. This is handy when you pack several icons into a single `DrawingGroup` and want to display one region at a time.
- **Performance.** Because `DrawingImage` re-renders its vector content each time it paints, very complex drawings with hundreds of geometries may be slower than an equivalent bitmap. For intricate artwork, consider pre-rendering to a `RenderTargetBitmap`.
- **Data binding.** You can bind `Brush`, `Geometry`, or `Pen` properties inside your drawings to view-model values, giving you fully dynamic vector graphics that respond to your application state.
- **Accessibility.** `DrawingImage` does not expose text content to assistive technology on its own. If the graphic conveys meaning, set an accessible name or description on the parent `Image` control.

## See also

- [Image](/controls/media/image)
- [PathIcon](/controls/media/pathicon)
- [Geometry](/docs/guides/graphics-and-animation/geometries)
- [Drawing and brushes](/docs/guides/graphics-and-animation/drawing-and-brushes)
- [DrawingImage API reference](/api/avalonia/media/drawingimage)
- [GeometryDrawing API reference](/api/avalonia/media/geometrydrawing)
- [DrawingGroup API reference](/api/avalonia/media/drawinggroup)
- [`DrawingImage.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Media/DrawingImage.cs)
