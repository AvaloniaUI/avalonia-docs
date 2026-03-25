---
id: panel
title: Panel
description: A basic layout control that overlays multiple child controls on top of each other, positioning them with alignment properties.
doc-type: reference
---

# Panel

The `Panel` is the most basic layout control that can contain multiple child controls. It draws children in the order they appear in your XAML, layering them on top of each other. Each child is positioned according to its `HorizontalAlignment` and `VerticalAlignment` properties.

Because `Panel` does not arrange children into rows, columns, or any other structure, it is best suited for scenarios where you need overlapping content, such as placing text over an image or stacking decorative elements.

## Common properties

| Property | Type | Description |
|---|---|---|
| `Background` | `IBrush` | The background brush for the panel. You must set this (even to `Transparent`) for the panel to receive pointer events. |
| `Children` | `Controls` | The collection of child controls contained in the panel. |

## Basic example

This example uses some 50% opacities to demonstrate that child controls overlap.

<XamlPreview>

```xml
<Panel xmlns="https://github.com/avaloniaui"
       Margin="10">
    <Rectangle Fill="Red" Height="100" VerticalAlignment="Top"/>
    <Rectangle Fill="Green" Height="100" VerticalAlignment="Bottom"/>
    <Rectangle Fill="Blue" Width="100" HorizontalAlignment="Right" />
    <Rectangle Fill="Orange" Width="100" HorizontalAlignment="Left"/>
</Panel>
```

</XamlPreview>

## Controlling overlap with `ZIndex`

When children overlap, you can control the draw order with the `ZIndex` attached property. Higher values draw on top of lower values. By default, all children have a `ZIndex` of 0 and are drawn in the order they appear in markup.

```xml
<Panel>
    <Border Background="Red" Width="100" Height="100" ZIndex="1" />
    <Border Background="Blue" Width="100" Height="100" Margin="30,30,0,0" ZIndex="2" />
</Panel>
```

In this example, the blue border renders on top of the red border because it has a higher `ZIndex`.

## Setting a background for hit testing

If you leave `Background` unset, the panel is transparent to pointer events. Clicks and other pointer interactions pass through to whatever is behind the panel. To make the panel respond to pointer events across its entire area, set `Background` to `Transparent`:

```xml
<Panel Background="Transparent">
    <TextBlock Text="This panel captures pointer events everywhere." />
</Panel>
```

## Using `Panel` as a base for custom panels

`Panel` serves as the base class for all built-in panel controls. If none of the built-in panels meet your layout requirements, you can create a custom panel by deriving from `Panel` and overriding its `MeasureOverride` and `ArrangeOverride` methods.

```csharp
public class MyCustomPanel : Panel
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
        foreach (var child in Children)
        {
            child.Arrange(new Rect(finalSize));
        }

        return finalSize;
    }
}
```

:::info
For a complete walkthrough, see [Custom panel](/docs/custom-controls/custom-panel).
:::

## Other panel controls

If you need more control over how child elements are positioned, consider one of these specialized panels:

- [Stack panel](stackpanel): arranges children in a single horizontal or vertical line.
- [Dock panel](dockpanel): docks children to the edges of the panel.
- [Grid](grid): arranges children in rows and columns.
- [Wrap panel](wrappanel): arranges children in a line that wraps when it reaches the panel edge.
- [Canvas](canvas): positions children at explicit coordinates.
- [Relative panel](relativepanel): positions children relative to each other or to the panel itself.
- [Uniform grid](uniformgrid): arranges children in a grid with equally sized cells.

## See also

- [Panel API reference](/api/avalonia/controls/panel)
- [`Panel.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Panel.cs)
- [Custom panel](/docs/custom-controls/custom-panel)
