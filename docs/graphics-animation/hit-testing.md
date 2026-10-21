---
id: hit-testing
title: Hit testing
description: How Avalonia determines which visual element is at any given screen coordinates.
doc-type: explanation
---

Hit testing determines which visual element is located at a given point on the screen. Avalonia uses hit testing internally for pointer events. You can also perform hit testing programmatically for custom controls and advanced interactions.

## How hit testing works

When a pointer event occurs, Avalonia walks the visual tree from the topmost element downward. For each element, it checks whether the point falls within the element's bounds and its rendered content. The first element that passes the test is the event target.

Hit testing considers:

1. **Visibility:** Elements with `IsVisible="False"` are skipped.
2. **IsHitTestVisible:** Elements with `IsHitTestVisible="False"` are skipped. Their children may still be tested.
3. **Hit test area:** The point must fall within the element's hit testing area. This is usually equal to its layout bounds, unless customized as a different [shape](#custom-hit-test-geometry) or [size](#extending-the-hit-test-area) using [`ICustomHitTest`](/api/avalonia/rendering/icustomhittest).
4. **Rendered content:** For shapes and custom-rendered controls, the test checks actual rendered pixels by default, not the bounding box.

## Setting `IsHitTestVisible`

Set `IsHitTestVisible="False"` to make a control "transparent" to pointer events. The control still renders normally, but pointer events pass through to the control behind it.

```xml
<!-- This overlay displays text but passes clicks through to the button underneath -->
<Panel>
    <Button Content="Click Me" />
    <TextBlock Text="Overlay label" IsHitTestVisible="False"
               Foreground="Gray" Margin="8" />
</Panel>
```

Common uses:
- Decorative overlays that should not intercept clicks
- Watermark or status text over interactive content
- Animation layers

## Background and hit testing

If a control has no `Background`, or its `Background` is set to `null`, its empty area does not participate in hit testing. Only the child content receives pointer events.

To make the entire area respond to pointer events, set `Background="Transparent"`.

```xml
<!-- This panel does not receive clicks in empty areas -->
<StackPanel PointerPressed="OnPressed">
    <TextBlock Text="Only this text is clickable" />
</StackPanel>

<!-- This panel receives clicks anywhere within its bounds -->
<StackPanel PointerPressed="OnPressed" Background="Transparent">
    <TextBlock Text="Any part of the panel is clickable" />
</StackPanel>
```

## Programmatic hit testing

### InputHitTest

Use `InputHitTest` on any control to find the element at a specific point:

```csharp
// Point is relative to the control you call InputHitTest on
var result = myPanel.InputHitTest(new Point(50, 30));

if (result is Control hitControl)
{
    Debug.WriteLine($"Hit: {hitControl.GetType().Name}");
}
```

### Finding the element under the pointer

In a pointer event handler, the `Source` property of the event args tells you the original element:

```csharp
private void OnPointerPressed(object? sender, PointerPressedEventArgs e)
{
    // e.Source is the element that was directly hit
    if (e.Source is Border border)
    {
        border.Background = Brushes.Yellow;
    }
}
```

## Hit testing in custom controls

When building [custom controls that render their own content with `DrawingContext`](/docs/custom-controls/custom-drawn-controls), you may need to override hit testing to implement your intended interactivity.

By default, hit testing on shapes drawn by custom-rendered controls check actual rendered pixels and not the unfilled portions of their surrounding bounding boxes. For certain use cases, you may need hit testing to work differently. [`Avalonia.Rendering.ICustomHitTest`](/api/avalonia/rendering/icustomhittest) allows you to customize the hit-testable area of a control.

### Custom hit test geometry

To customize hit test geometry, implement `ICustomHitTest` on your custom control and define the desired hit-testable shape.

The below example demonstrates how you might set up hit testing for a custom control that draws a circle inside a box. The custom hit testing region uses the same geometry as the `Ellipse` portion of the drawing, meaning the control receives clicks on the circle only, and not on the surrounding yellow corner regions.

```csharp title="CircleControl.cs"
using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;
using Avalonia.Rendering;

namespace HitTesting;

public class CircleControl : Control, ICustomHitTest
{
    public override void Render(DrawingContext context)
    {
        var radius = Math.Min(Bounds.Width, Bounds.Height) / 2;
        var center = new Point(Bounds.Width / 2, Bounds.Height / 2);
        var box = new Rect(center.X - radius, center.Y - radius, radius * 2, radius * 2);
        context.FillRectangle(Brushes.Yellow, box);
        context.DrawEllipse(Brushes.Blue, null, center, radius, radius);
    }

    public bool HitTest(Point point)
    {
        // Only hit test within the circle, not the full box
        var radius = Math.Min(Bounds.Width, Bounds.Height) / 2;
        var center = new Point(Bounds.Width / 2, Bounds.Height / 2);
        var distance = Point.Distance(point, center);
        return distance <= radius;
    }
}
```

### Extending the hit test area

Another use of `ICustomHitTest` is to extend the hit testing area of a control. The below example shows how to extend a button's hit testing box beyond its visible bounds.

Because `Button` is a [templated control](/docs/custom-controls/templated-controls), you must set `ClipToBounds = false` for the extended area to work. On templated controls, `ClipToBounds` is `true` by default.

```csharp title="BiggerButton.cs"
using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;
using Avalonia.Rendering;

namespace HitTesting;

public class BiggerButton : Button, ICustomHitTest
{
    public BiggerButton()
    {
        ClipToBounds = false; // By default, Avalonia optimizes hit testing by clipping to bounds.
    }

    protected override Type StyleKeyOverride => typeof(Button); // unrelated to hit test, we just want to reuse Button styles

    bool ICustomHitTest.HitTest(Point point) => Bounds
        .WithX(0).WithY(0) // reset position relative to the parent, as ICustomHitTest expects the point to be in the local coordinate system
        .Inflate(100) // inflate by how much we want hit test to be extended
        .Contains(point);
}
```

:::caution
- Clipping parents can still cut off the extended area, e.g., if the control is hosted inside a `ScrollViewer` with `ClipToBounds = true`.
- [Overlapping controls](#hit-testing-order) still take priority, meaning the extended area only works so long as no other hit-testable control is drawn on top of it.
:::

## Hit testing order

When multiple controls overlap, the hit test returns the topmost control. The order is determined by:

1. **ZIndex:** Higher `ZIndex` values have priority.
2. **Visual tree order:** Later children in the same panel have priority over earlier children.

```xml
<Panel>
    <Border Background="Red" Width="150" Height="150" PointerPressed="OnRedClick" />
    <!-- The second border is on top and receives clicks in the overlapping area -->
    <Border Background="Blue" Width="100" Height="100" PointerPressed="OnBlueClick" />
</Panel>
```

## Practical patterns

### Click-through overlay

Create a visual overlay that does not block interaction:

```xml
<Grid>
    <ListBox ItemsSource="{Binding Items}" />

    <!-- Semi-transparent loading overlay, clicks pass through when inactive -->
    <Border Background="#80000000"
            IsVisible="{Binding IsLoading}"
            IsHitTestVisible="{Binding IsLoading}">
        <ProgressBar IsIndeterminate="True" Width="200"
                     HorizontalAlignment="Center" VerticalAlignment="Center" />
    </Border>
</Grid>
```

### Detecting clicks on a canvas drawing

```csharp
private void OnCanvasPointerPressed(object? sender, PointerPressedEventArgs e)
{
    var pos = e.GetPosition((Visual)sender!);

    // Check against your drawn shapes
    foreach (var shape in _shapes)
    {
        if (shape.Bounds.Contains(pos))
        {
            SelectShape(shape);
            e.Handled = true;
            return;
        }
    }
}
```

## Performance with many elements

Avalonia's hit-testing walks the visual tree and tests each element individually. There is no built-in spatial partitioning (such as a quadtree).

For a `Panel` with a small number of children, this is fast. If you have hundreds or thousands of elements on a `Canvas` or `Panel`, the linear walk becomes noticeable, especially for pointer press events where every candidate element must be tested.

### Symptoms

- A delay between clicking and the `PointerPressed` event firing, growing linearly with the number of children.
- The delay is input-related, not a rendering or layout problem. Frame rates remain normal.

### Mitigation strategies

#### Disable hit testing on individual elements and use an overlay.

Place a transparent overlay on top of all child elements. Handle `PointerPressed` on the overlay and use your own logic to determine which element was clicked. Set `IsHitTestVisible="False"` on the children, so Avalonia skips them during the tree walk.

Your `FindItemAt` method can use any lookup strategy that fits your data. For a grid-like arrangement, a simple coordinate calculation may suffice. For irregular shapes, consider a spatial index such as a quadtree or R-tree.

<Tabs>

<TabItem value="xaml" label="XAML">

```xml
<Panel>
    <!-- All items have IsHitTestVisible="False" -->
    <Canvas x:Name="ItemsCanvas" IsHitTestVisible="False">
        <!-- Hundreds of child controls -->
    </Canvas>

    <!-- Transparent overlay catches all pointer events -->
    <Border Background="Transparent" PointerPressed="OnOverlayPointerPressed" />
</Panel>
```

</TabItem>

<TabItem value="code-behind" label="Code-behind">

```csharp
private void OnOverlayPointerPressed(object? sender, PointerPressedEventArgs e)
{
    var pos = e.GetPosition(ItemsCanvas);

    // Use your own spatial lookup to find the item at this position
    var item = FindItemAt(pos);
    if (item != null)
    {
        SelectItem(item);
        e.Handled = true;
    }
}
```

</TabItem>

</Tabs>

#### Switch to custom rendering.

Instead of creating a separate control for each element, render all elements in a single control's `Render` override. This eliminates per-element hit testing entirely, since only the single parent control participates in hit testing. You can then handle pointer events on that control and determine which child element was clicked based on the pointer position. See [Custom rendering](/docs/graphics-animation/custom-rendering) for details.

#### Reduce the number of hit-testable elements.

If only some elements need to be interactive, set `IsHitTestVisible="False"` on the rest. For example, in a diagram editor app, background grid lines and labels can be excluded from hit testing, leaving only draggable nodes interactive.

## See also

- [Pointer input](/docs/input-interaction/pointer): Pointer events and position.
- [Custom rendering](/docs/graphics-animation/custom-rendering): Drawing with DrawingContext.
- [Shapes and geometries](/docs/graphics-animation/shapes-and-geometries): Geometry types for hit regions.
- [Performance optimization](/docs/app-development/performance): General performance guidance.
- [`ICustomHitTest` API reference](/api/avalonia/rendering/icustomhittest)