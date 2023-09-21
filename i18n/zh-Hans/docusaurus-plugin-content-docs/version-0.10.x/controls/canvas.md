---
id: canvas
title: Canvas
---

import CanvasChildOverlapScreenshot from '/img/controls/canvas/layout-panel-canvas.png';

The `Canvas` control is a `Panel` which lays out its children by explicit coordinates.

You specify the positions of individual child elements by setting the `Canvas.Left` and `Canvas.Top` attached properties on each element.

Objects in a Canvas can overlap, where one object is drawn on top of another object. By default, the Canvas renders child objects in the order in which they’re declared, so the last child is rendered on top \(each element has a default z-index of 0\). This is the same as other built-in panels. However, Canvas also supports the `Canvas.ZIndex` attached property that you can set on each of the child elements. You can set this property in code to change the draw order of elements during run time. The element with the highest Canvas.ZIndex value draws last and therefore draws over any other elements that share the same space or overlap in any way. Note that alpha value \(transparency\) is respected, so even if elements overlap, the contents shown in overlap areas might be blended if the top one has a non-maximum alpha value.

The Canvas does not do any sizing of its children. Each element must specify its size.

Here's an example of a Canvas in XAML.

```markup
<Canvas Width="120" Height="120">
    <Rectangle Fill="Red" Height="44" Width="44"/>
    <Rectangle Fill="Blue" Height="44" Width="44" Canvas.Left="20" Canvas.Top="20"/>
    <Rectangle Fill="Green" Height="44" Width="44" Canvas.Left="40" Canvas.Top="40"/>
    <Rectangle Fill="Orange" Height="44" Width="44" Canvas.Left="60" Canvas.Top="60"/>
</Canvas>
```

The result looks like this.

<img className="center" src={CanvasChildOverlapScreenshot} alt="" />

Use the Canvas panel with discretion. While it's convenient to be able to precisely control positions of elements in UI for some scenarios, a fixed positioned layout panel causes that area of your UI to be less adaptive to overall app window size changes.

## Reference

[Canvas](http://reference.avaloniaui.net/api/Avalonia.Controls/Canvas/)

## Source code

[Canvas.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Canvas.cs)
