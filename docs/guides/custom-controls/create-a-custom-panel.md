---
id: create-a-custom-panel
title: How To Create a Custom Panel
---

# How To Create a Custom Panel

This example shows how to override the default layout behavior of the `Panel` element and create custom layout elements that are derived from `Panel`.

The example defines a simple custom `Panel` element called `PlotPanel`, which positions child elements according to two hard-coded x- and y-coordinates. In this example, `x` and `y` are both set to `50`; therefore, all child elements are positioned at that location on the x and y axes.

To implement custom `Panel` behaviors, the example uses the `MeasureOverride` and `ArrangeOverride` methods. Each method returns the `Size` data that is necessary to position and render child elements.

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
