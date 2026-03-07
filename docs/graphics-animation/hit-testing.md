---
id: hit-testing
title: Hit testing
description: How Avalonia determines which visual element is at a given screen coordinate.
doc-type: explanation
---

Hit testing determines which visual element is located at a given point on the screen. Avalonia uses hit testing internally for pointer events, but you can also perform hit testing programmatically for custom controls and advanced interaction scenarios.

## How hit testing works

When a pointer event occurs, Avalonia walks the visual tree from the topmost element downward. For each element, it checks whether the point falls within the element's bounds and its rendered content. The first element that passes the test becomes the event target.

The hit test considers:

1. **Visibility**: Elements with `IsVisible="False"` are skipped.
2. **IsHitTestVisible**: Elements with `IsHitTestVisible="False"` are skipped, but their children may still be tested.
3. **Bounds**: The point must fall within the element's layout bounds.
4. **Rendered content**: For shapes and custom-rendered controls, the test checks actual rendered pixels, not just the bounding box.

## IsHitTestVisible

Set `IsHitTestVisible="False"` to make a control "transparent" to pointer events. The control still renders normally, but pointer events pass through to the control behind it:

```xml
<!-- This overlay displays text but passes clicks through to controls underneath -->
<Panel>
    <Button Content="Click Me" />
    <TextBlock Text="Overlay label" IsHitTestVisible="False"
               HorizontalAlignment="Right" VerticalAlignment="Top"
               Foreground="Gray" Margin="8" />
</Panel>
```

Common uses:
- Decorative overlays that should not intercept clicks
- Watermark or status text over interactive content
- Animation layers

## Background and hit testing

A control without a `Background` (or with `Background` set to `null`) does not participate in hit testing for its empty area. Only the child content receives pointer events.

To make the entire area of a panel respond to pointer events, set `Background="Transparent"`:

```xml
<!-- This panel does NOT receive clicks in empty areas -->
<StackPanel PointerPressed="OnPressed">
    <TextBlock Text="Only this text is clickable" />
</StackPanel>

<!-- This panel receives clicks anywhere within its bounds -->
<StackPanel PointerPressed="OnPressed" Background="Transparent">
    <TextBlock Text="Click anywhere in the panel" />
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

When building custom controls that render their own content with `DrawingContext`, you may need to override hit testing to match the rendered shapes.

### Custom hit test geometry

Override the `HitTestCore` method to define a custom hit region:

```csharp
public class CircleControl : Control
{
    public override void Render(DrawingContext context)
    {
        var radius = Math.Min(Bounds.Width, Bounds.Height) / 2;
        var center = new Point(Bounds.Width / 2, Bounds.Height / 2);
        context.DrawEllipse(Brushes.Blue, null, center, radius, radius);
    }

    protected override bool HitTestCore(HitTestCoreArgs args)
    {
        // Only hit test within the circle, not the full bounding box
        var radius = Math.Min(Bounds.Width, Bounds.Height) / 2;
        var center = new Point(Bounds.Width / 2, Bounds.Height / 2);
        var distance = Point.Distance(args.HitPoint, center);
        return distance <= radius;
    }
}
```

With this override, pointer events only fire when the user clicks inside the circle, not in the corners of the bounding rectangle.

## Hit testing order

When multiple controls overlap at the same point, the hit test returns the topmost control in the visual tree. The order is determined by:

1. **ZIndex**: Higher `ZIndex` values are tested first.
2. **Visual tree order**: Later children in the same panel are rendered (and hit tested) on top of earlier children.

```xml
<Panel>
    <Border Background="Red" Width="100" Height="100" />
    <!-- This border is on top and receives the click -->
    <Border Background="Blue" Width="100" Height="100" Margin="30" />
</Panel>
```

## Practical patterns

### Click-through overlay

Create a visual overlay that does not block interaction:

```xml
<Grid>
    <ListBox ItemsSource="{Binding Items}" />

    <!-- Semi-transparent loading overlay, clicks pass through when hidden -->
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

## See also

- [Pointer Input](/docs/input-interaction/pointer): Pointer events and position.
- [Custom Rendering](/docs/graphics-animation/custom-rendering): Drawing with DrawingContext.
- [Shapes and Geometries](/docs/graphics-animation/shapes-and-geometries): Geometry types for hit regions.
