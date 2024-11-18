---
title: DockPanel
description: REFERENCE - Built-in Controls
---

import DockPanelTopScreenshot from '/img/reference/controls/dockpanel/dockpanel-top.png';
import DockPanelFillNoOverlapScreenshot from '/img/reference/controls/dockpanel/dockpanel-fill-no-overlap.png'; 

# DockPanel

The `DockPanel` control arranges its child controls along specified 'docking edges' (top, bottom, left, and right) with the last child filling any remaining space. The dock panel can maintain the child control's dimension that is parallel to the docking edge, so that the child fills all the available space along the docking edge.

For example, if the docking edge on a child control is defined as 'top' and it has a height defined, but no width, it will draw like this:

<img src={DockPanelTopScreenshot} alt=""/>

:::warning
You must define the child control dimension perpendicular to the docking edge, or it will not show.
:::

You can optionally define the dimension that is parallel to the docking edge. In this case, the child will be drawn according to the alignment setting in the same direction. For example, a child with a defined width, docked to the top edge, will obey its horizontal alignment property (default center).

Child controls are docked in the sequence that they are defined in the XAML. When _Avalonia UI_ is sizing a child control, the presence of any previously drawn controls is taken into account. That means there is never any overlap.

The last child control defined will fill any remaining space.

:::warning
You must always define a last child control (with no dock property), or the docking calculation will not perform correctly. This means that a dock panel requires a minimum of two child controls.
:::

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="266">Property</th><th>Description</th></tr></thead><tbody><tr><td>DockPanel.Dock<code>.Left</code></td><td>Attached to a child control - dock this to the left side.</td></tr><tr><td>DockPanel.Dock<code>.Top</code></td><td>Attached to a child control - dock this to the top edge.</td></tr><tr><td>DockPanel.Dock<code>.Right</code></td><td>Attached to a child control - dock this to the right side.</td></tr><tr><td>DockPanel.Dock<code>.Bottom</code></td><td>Attached to a child control - dock this to the bottom edge.</td></tr></tbody></table>

## Example

Setting the opacity of the orange rectangle to 0.5 demonstrates that there are no overlaps.

```xml
<DockPanel Width="300" Height="300">
    <Rectangle Fill="Red" Height="100" DockPanel.Dock="Top"/>
    <Rectangle Fill="Blue" Width="100" DockPanel.Dock="Left" />
    <Rectangle Fill="Green" Height="100" DockPanel.Dock="Bottom"/>
    <Rectangle Fill="Orange" Width="100" DockPanel.Dock="Right" Opacity="0.5"/>
    <Rectangle Fill="Gray" />
</DockPanel>
```

<img src={DockPanelFillNoOverlapScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/DockPanel/).
:::

:::info
View the source code on _GitHub_ [`DockPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DockPanel.cs)
:::
