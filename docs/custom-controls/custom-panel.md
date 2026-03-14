---
id: custom-panel
title: Creating a custom panel
description: Implement a custom layout panel by overriding MeasureOverride and ArrangeOverride.
doc-type: how-to
---

A custom panel lets you control exactly how child elements are measured and arranged. By subclassing `Panel` and overriding its layout methods, you can create layouts that go beyond what the built-in panels provide.

## Layout process

Avalonia uses a two-pass layout system. Every panel must participate in both passes:

1. **Measure pass (`MeasureOverride`):** The panel receives an available size and determines how much space it needs. You must call `child.Measure()` on every child during this pass. Each child then sets its `DesiredSize` property, which you can use to calculate the panel's own desired size.

2. **Arrange pass (`ArrangeOverride`):** The panel receives its final allocated size and positions each child within that space. You must call `child.Arrange()` on every child, passing a `Rect` that defines the child's position and size.

## Basic example

This simple `PlotPanel` positions all child elements at a hard-coded offset of (50, 50).

```csharp
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

## Practical example: radial panel

A more useful custom panel arranges its children evenly around a circle. Each child is placed at an equal angular offset from the others.

```csharp
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
            double angle = 2 * Math.PI * i / Children.Count - Math.PI / 2;
            double x = centerX + radius * Math.Cos(angle) - Children[i].DesiredSize.Width / 2;
            double y = centerY + radius * Math.Sin(angle) - Children[i].DesiredSize.Height / 2;
            Children[i].Arrange(new Rect(new Point(x, y), Children[i].DesiredSize));
        }
        return finalSize;
    }
}
```

You can then use it in XAML like any other panel:

```xml
<local:RadialPanel Width="300" Height="300">
    <Button Content="1" />
    <Button Content="2" />
    <Button Content="3" />
    <Button Content="4" />
    <Button Content="5" />
</local:RadialPanel>
```

## Using attached properties

Panels often need per-child configuration. Attached properties let each child element carry data that the parent panel reads during layout. For example, you could add a `Slot` property to `RadialPanel` so that children can specify their position in the circle:

```csharp
public static readonly AttachedProperty<int> SlotProperty =
    AvaloniaProperty.RegisterAttached<RadialPanel, Control, int>("Slot");

public static int GetSlot(Control element) => element.GetValue(SlotProperty);
public static void SetSlot(Control element, int value) => element.SetValue(SlotProperty, value);
```

The panel can then read `GetSlot(child)` inside `ArrangeOverride` to determine where each child should be placed.

For a full guide on defining attached properties, see [Attached Properties](attached-properties).

## Tips

- Always call `Measure` on every child in `MeasureOverride`. Children that are not measured will not render correctly.
- Always call `Arrange` on every child in `ArrangeOverride`. Children that are not arranged will not appear.
- Use `AffectsMeasure` or `AffectsArrange` when registering styled properties that influence layout. This ensures the panel re-layouts when those properties change.
- Return the size your panel actually needs from `MeasureOverride`. Returning a size larger than necessary wastes space, while returning a size that is too small may clip children.

## See also

- [Custom ItemsPanel](custom-itemspanel)
- [Attached Properties](attached-properties)
- [Layout](../layout/layout)
