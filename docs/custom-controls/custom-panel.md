---
id: custom-panel
title: Custom Panel
description: Implement a custom layout panel by overriding MeasureOverride and ArrangeOverride.
doc-type: how-to
---

If you need complex or unique layouts beyond what the [built-in panels](/controls) provide, you can create your own custom panel. A custom panel lets you control exactly how child elements are measured and arranged. This is done by subclassing `Panel` and overriding its layout methods.

## Layout process

Avalonia uses a two-pass layout system:

1. **Measure pass (`MeasureOverride`):** The panel receives an available size and determines how much space it needs. You must call `child.Measure()` on every child during this pass. Each child then sets its `DesiredSize` property, which you can use to calculate the panel's own desired size.

2. **Arrange pass (`ArrangeOverride`):** The panel receives its final allocated size and positions each child within that space. You must call `child.Arrange()` on every child, passing a `Rect` that defines the child's position and size.

Every panel must participate in both passes.

For more information on Avalonia's layout system, see [The layout system](/docs/layout/#the-layout-system).

## Creating a custom `PlotPanel` with a fixed offset

This simple example highlights how to override `MeasureOverride` and `ArrangeOverride` when creating a custom panel. The custom `PlotPanel` positions child elements at a hard-coded offset of (50, 50).

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:local="using:MyApp">
        
        <local:PlotPanel Background="Gray" Margin="10">
                <TextBlock Background="Blue" Text="Hello world!" />
        </local:PlotPanel>
        
</UserControl>
```

```csharp
using Avalonia;
using Avalonia.Controls;

namespace MyApp;

public class PlotPanel : Panel
{
    // Override the default Measure method of Panel
    protected override Size MeasureOverride(Size availableSize)
    {
        var panelDesiredSize = new Size();

        // In our example, we just have one child.
        // Report that our panel requires just the size of its only child.
        foreach (var child in Children)
        {
            child.Measure(availableSize);
            panelDesiredSize = child.DesiredSize;
        }

        return panelDesiredSize;
    }

    protected override Size ArrangeOverride(Size finalSize)
    {
        foreach (var child in Children)
        {
            double x = 50;
            double y = 50;

            child.Arrange(new Rect(new Point(x, y), child.DesiredSize));
        }

        return finalSize; // Returns the final Arranged size
    }
}
```

</XamlPreview>

## Creating a custom `RadialPanel`

This is a more advanced example of a custom radial panel that arranges child elements evenly around a circle. Each child is placed at an equal angular offset from the others.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:local="using:MyApp">

    <local:RadialPanel Width="300" Height="300">
        <Button Content="1" />
        <Button Content="2" />
        <Button Content="3" />
        <Button Content="4" />
        <Button Content="5" />
    </local:RadialPanel>

</UserControl>
```

```csharp
using System;
using Avalonia;
using Avalonia.Controls;

namespace MyApp;

public class RadialPanel : Panel
{
    protected override Size MeasureOverride(Size availableSize)
    {
        foreach (var child in Children)
        {
            child.Measure(availableSize);
        }
        return availableSize;
    }

    protected override Size ArrangeOverride(Size finalSize)
    {
        double centerX = finalSize.Width / 2;
        double centerY = finalSize.Height / 2;
        double radius = Math.Min(centerX, centerY) - 30;

        for (int i = 0; i < Children.Count; i++)
        {
            double angle = 2 * 3.14159 * i / Children.Count - 3.14159 / 2;
            double x = centerX + radius * Math.Cos(angle) - Children[i].DesiredSize.Width / 2;
            double y = centerY + radius * Math.Sin(angle) - Children[i].DesiredSize.Height / 2;
            Children[i].Arrange(new Rect(new Point(x, y), Children[i].DesiredSize));
        }
        return finalSize;
    }
}
```

</XamlPreview>

## Adding an attached property

Add a `Slot` property to `RadialPanel`, so that children can specify their position in the circle. An attached property is chosen to allow data to be specified on a per-child basis.

For further guidance on attached properties, see [Attached Properties](/docs/custom-controls/defining-properties#attached-properties).

```csharp
public static readonly AttachedProperty<int> SlotProperty =
    AvaloniaProperty.RegisterAttached<RadialPanel, Control, int>("Slot");

public static int GetSlot(Control element) => element.GetValue(SlotProperty);
public static void SetSlot(Control element, int value) => element.SetValue(SlotProperty, value);
```

## Tips

- Always call `Measure` on every child in `MeasureOverride`. Children that are not measured will not render correctly.
- Always call `Arrange` on every child in `ArrangeOverride`. Children that are not arranged will not appear.
- Use [`AffectsMeasure` or `AffectsArrange`](/docs/custom-controls/custom-drawn-controls#affectsrender-affectsmeasure-and-affectsarrange) when registering styled properties that influence layout. This ensures the panel adjusts its layout when those properties change.
- Return the size your panel actually needs from `MeasureOverride`. Returning a size larger than necessary wastes space, while returning a size that is too small may clip children.

## See also

- [Attached properties](/docs/custom-controls/defining-properties#attached-properties): Let child controls carry per-child layout values for your panel.
- [Layout](/docs/layout): How the measure and arrange system works.
- [Choosing a layout panel](/docs/layout/choosing-a-layout-panel): Picking the right built-in panel before writing your own.
