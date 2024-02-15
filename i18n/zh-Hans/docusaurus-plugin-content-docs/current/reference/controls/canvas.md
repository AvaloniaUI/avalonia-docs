---
description: REFERENCE - Built-in Controls
---

import CanvasContentZoneScreenshot from '/img/reference/controls/canvas/canvas-contentzone.png';
import CanvasChildOverlapScreenshot from '/img/reference/controls/canvas/canvas-child-overlap.png';

# Canvas

The canvas control displays its child controls at specified positions (given as coordinates).

The position of each child control is defined as two distances between edge the canvas content zone, and the outer edge of the child margin zone. For example, this might be the top-left corner of the child to the top-left of canvas, as shown here:

<img src={CanvasContentZoneScreenshot} alt="" />

:::info
To review the concept of layout zones, see [here](../../concepts/layout/layout-zones).
:::

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="205">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Canvas.Left</code></td><td>Attached to a child control - gives the distance between the inner left edge of the canvas content zone to the outer left edge of the child (margin zone).</td></tr><tr><td><code>Canvas.Top</code></td><td>Attached to a child control - gives the distance between the inner top edge of the canvas content zone to the outer top edge of the child (margin zone).</td></tr><tr><td><code>Canvas.Right</code></td><td>Attached to a child control - gives the distance between the inner right edge of the canvas content zone to the outer right edge of the child (margin zone).</td></tr><tr><td><code>Canvas.Bottom</code></td><td>Attached to a child control - gives the distance between the inner bottom edge of the canvas content zone to the outer bottom edge of the child (margin zone).</td></tr><tr><td><code>Canvas.ZIndex</code></td><td>Attached to a child control - this can override the default drawing sequence (see below).</td></tr></tbody></table>

Child controls in a canvas are drawn in the sequence that the are defined. This can cause them to overlap.

:::warning
The canvas does not size any of its child controls. You must set width and height properties on a child control, or it will not appear!
:::

## Z-index

By default each child has a z-index of zero. However, the canvas supports the `Canvas.ZIndex` attached property that you can set any of the child controls. This will override the drawing sequence (highest number is drawn last) and may therefore change how the child controls overlap.

## Opacity

However you define the drawing sequence, the opacity of child controls is respected. This means that where child controls elements overlap, the contents shown in overlap areas might be blended where the top control has an opacity value less than one.

## Example

```xml
<Canvas Background="AliceBlue" Margin="20">
  <Rectangle Fill="Red" Height="100" Width="100" Margin="10"/>
  <Rectangle Fill="Blue" Height="100" Width="100" Opacity="0.5"
             Canvas.Left="50" Canvas.Top="20"/>
  <Rectangle Fill="Green" Height="100" Width="100" 
             Canvas.Left="60" Margin="40" Canvas.Top="40"/>
  <Rectangle Fill="Orange" Height="100" Width="100" 
             Canvas.Right="70" Canvas.Bottom="60"/>
</Canvas>
```

The result looks like this:

<img src={CanvasChildOverlapScreenshot} alt="" />

:::info
Use the canvas panel with discretion. While it may be convenient to position child controls like this, your UI will no longer be adaptive to changes in the app window size.
:::

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Canvas/).
:::

:::info
View the source code on _GitHub_ [`Canvas.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Canvas.cs)
:::
