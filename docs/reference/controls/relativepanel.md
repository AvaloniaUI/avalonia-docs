---
title: RelativePanel
description: REFERENCE - Built-in Controls
---

import RelativePanelScreenshot from '/img/reference/controls/relativepanel/relativepanel.png';

# RelativePanel

The `RelativePanel` control allows you to arrange its child controls by specifying their position relative to other (sibling) child controls, or in relation to the panel itself. Positions are calculated using the inside of the panel control (content zone) and the outer edge of the margin zone of the child controls.

:::info
To review the concept of control layout zones, see [here](../../concepts/layout/layout-zones).
:::

The default position for a child control, is the upper left corner of the panel.

You use attached relative position properties to specify the layout of child controls. The format is like this:

`RelativePanel.PositionProperty="NameOfSibling"`

Where `PositionProperty` property is one of the relative position properties (see table below), and `NameOfSibling` is the name property of one of the other child controls.

:::danger
It is an error to give the value of a relative position property as the name of the child control itself. That would be a circular reference!
:::

You can specify up to four relative position properties per child control - for how the top, bottom, left and right edges are to be calculated.

:::danger
It is an error to define the same relative position property twice for the same child control.
:::

It is not an error to specify different, but potentially conflicting relative position properties, although you may find the result difficult to understand.

If more than one child control ends up in the same calculated position, then they are drawn in the sequence that they appear in the XAML, and may overlap or obscure another child control.

:::warning
This means you must give child controls a name, and use the correct name in any relative position property values. If you get this wrong, the control will adopt the default (top-left) position, and may overlap or obscure another.
:::

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="348">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>AlignTopWithPanel</code></td><td>Boolean. Align the top edge of the child control with the top edge of the panel.</td></tr><tr><td><code>AlignBottomWithPanel</code></td><td>Boolean. Attached to a child control to align the bottom edge of the child control with the bottom edge of the panel.</td></tr><tr><td><code>AlignLeftWithPanel</code></td><td>Boolean. Attached to a child control to align the left edge of the child control with the left edge of the panel.</td></tr><tr><td><code>AlignRightWithPanel</code></td><td>Boolean. Attached to a child control to align the right edge of the child control with the right edge of the panel.</td></tr><tr><td><code>AlignHorizontalCenterWithPanel</code></td><td>Boolean. Attached to a child control to align the horizontal center of the child control with the horizontal center of the panel.</td></tr><tr><td><code>AlignVerticalCenterWithPanel</code></td><td>Boolean. Attached to a child control to align the vertical center of the child control with the vertical center of the panel.</td></tr><tr><td><code>AlignTopWith</code></td><td>Attached to a child control to align its top edge with the top edge of the named sibling.</td></tr><tr><td><code>AlignBottomWith</code></td><td>Attached to a child control to align its bottom edge with the bottom edge of the named sibling.</td></tr><tr><td><code>AlignLeftWith</code></td><td>Attached to a child control to align its left edge with the left edge of the named sibling.</td></tr><tr><td><code>AlignRightWith</code></td><td>Attached to a child control to align its right edge with the right edge of the named sibling.</td></tr><tr><td><code>AlignHorizontalCenterWith</code></td><td>Attached to a child control to align its horizontal center with the horizontal center of the named sibling.</td></tr><tr><td><code>AlignVerticalCenterWith</code></td><td>Attached to a child control to align its vertical center with the vertical center of the named sibling.</td></tr><tr><td><code>Above</code></td><td>Attached to a child control to align its bottom edge with the top edge of the named sibling.</td></tr><tr><td><code>Below</code></td><td>Attached to a child control to align its top edge with the bottom edge of the named sibling.</td></tr><tr><td><code>LeftOf</code></td><td>Attached to a child control to align its right edge with the left edge of the named sibling.</td></tr><tr><td><code>RightOf</code></td><td>Attached to a child control to align its left edge with the right edge of the named sibling.</td></tr></tbody></table>

## Example

This XAML shows how to arrange some child controls in different ways:

```xml
<Border BorderBrush="DarkGray" BorderThickness="1" Width="300" Height="300">
  <RelativePanel >
    <Rectangle x:Name="RedRect" Fill="Red" Height="50" Width="50"/>
    <Rectangle x:Name="BlueRect" Fill="Blue" Opacity="0.5" Height="50" Width="150"
               RelativePanel.RightOf="RedRect" />
    <Rectangle x:Name="GreenRect" Fill="Green" Height="100"
               RelativePanel.Below="RedRect"
               RelativePanel.AlignLeftWith="RedRect"
               RelativePanel.AlignRightWith="BlueRect"/>
    <Rectangle Fill="Orange"
               RelativePanel.Below="GreenRect"
               RelativePanel.AlignLeftWith="BlueRect"
               RelativePanel.AlignRightWithPanel="True"
               RelativePanel.AlignBottomWithPanel="True"/>
  </RelativePanel>
</Border>
```

The result looks like this:

<img src={RelativePanelScreenshot} alt="" />

Here are some notes about the above example:

* The red rectangle is given a size (50x50) but no relative position. It is therefore placed in the default (top-left) position.
* The blue rectangle has a 50% opacity to demonstrate that is is not overlapping any other.
* The green rectangle is given a height (100), but no width. Its left side is aligned with the red rectangle, and its right side is aligned with the blue rectangle, this calculates its width.
* The orange rectangle has not been given a size. Its left side is aligned with the blue rectangle. Its right and bottom edges are aligned with the edge of the panel. Therefore its size is determined by the alignments and it will resize if the panel itself is resized.

## More Information

:::info
For the complete API documentation about this control, see [here](https://reference.avaloniaui.net/api/Avalonia.Controls/RelativePanel/).
:::

:::info
View the source code on _GitHub_ [`RelativePanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RelativePanel.cs)
:::
