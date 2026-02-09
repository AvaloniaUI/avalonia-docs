---
id: canvas
title: Canvas
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CanvasContentZoneScreenshot from '/img/controls/canvas/canvas-contentzone.png';

# Canvas

The canvas control displays its child controls at specified positions (given as coordinates).

The position of each child control is defined as two distances between the edge of the canvas content zone, and the outer edge of the child margin zone. For example, this might be the top-left corner of the child to the top-left of canvas, as shown here:

<img src={CanvasContentZoneScreenshot} alt="" />

If elements occupy the same coordinates, the order in which they appear in markup determines the order in which the elements are drawn.

`Canvas` provides the most flexible layout support of any `Panel`. Height and Width properties are used to define the area of the canvas, and elements inside are assigned absolute coordinates relative to the area of the parent `Canvas`. Four attached properties, `Canvas.Left`, `Canvas.Top`, `Canvas.Right` and `Canvas.Bottom`, allow fine control of object placement within a `Canvas`, allowing the developer to position and arrange elements precisely on the screen.

:::info
To review the concept of layout zones, see [here](/concepts/ui-concepts/layout).
:::

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="205">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Canvas.Left</code></td><td>Attached to a child control - gives the distance between the inner left edge of the canvas content zone to the outer left edge of the child (margin zone).</td></tr><tr><td><code>Canvas.Top</code></td><td>Attached to a child control - gives the distance between the inner top edge of the canvas content zone to the outer top edge of the child (margin zone).</td></tr><tr><td><code>Canvas.Right</code></td><td>Attached to a child control - gives the distance between the inner right edge of the canvas content zone to the outer right edge of the child (margin zone).</td></tr><tr><td><code>Canvas.Bottom</code></td><td>Attached to a child control - gives the distance between the inner bottom edge of the canvas content zone to the outer bottom edge of the child (margin zone).</td></tr><tr><td><code>Canvas.ZIndex</code></td><td>Attached to a child control - this can override the default drawing sequence (see below).</td></tr></tbody></table>

Child controls in a canvas are drawn in the sequence that they are defined. This can cause them to overlap.

:::warning
The canvas does not size any of its child controls. You must set width and height properties on a child control, or it will not appear!
:::

## Z-index

By default each child has a z-index of zero. However, the canvas supports the `Canvas.ZIndex` attached property that you can set any of the child controls. This will override the drawing sequence (highest number is drawn last) and may therefore change how the child controls overlap.

## Opacity

However you define the drawing sequence, the opacity of child controls is respected. This means that where child controls elements overlap, the contents shown in overlap areas might be blended where the top control has an opacity value less than one.

## ClipToBounds

`Canvas` can position child elements at any position on the screen, even at coordinates that are outside of its own defined `Height` and `Width`. Furthermore, `Canvas` is not affected by the size of its children. As a result, it is possible for a child element to overdraw other elements outside the bounding rectangle of the parent `Canvas`. The default behavior of a `Canvas` is to allow children to be drawn outside the bounds of the parent `Canvas`. If this behavior is undesirable, the `ClipToBounds` property can be set to `true`. This causes `Canvas` to clip to its own size. `Canvas` is the only layout element that allows children to be drawn outside its bounds.

## Example

<XamlPreview>

```xml
<Canvas xmlns="https://github.com/avaloniaui"
        Background="AliceBlue" Margin="20">
  <Rectangle Fill="Red" Height="100" Width="100" Margin="10"/>
  <Rectangle Fill="Blue" Height="100" Width="100" Opacity="0.5"
             Canvas.Left="50" Canvas.Top="20"/>
  <Rectangle Fill="Green" Height="100" Width="100" 
             Canvas.Left="60" Margin="40" Canvas.Top="40"/>
  <Rectangle Fill="Orange" Height="100" Width="100" 
             Canvas.Right="70" Canvas.Bottom="60"/>
</Canvas>
```

</XamlPreview>

:::info
Use the canvas panel with discretion. While it may be convenient to position child controls like this, your UI will no longer be adaptive to changes in the app window size.
:::

## Defining a canvas in code

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Canvas Height="400" Width="400">
  <Canvas Height="100" Width="100" Top="0" Left="0" Background="Red"/>
  <Canvas Height="100" Width="100" Top="100" Left="100" Background="Green"/>
  <Canvas Height="100" Width="100" Top="50" Left="50" Background="Blue"/>
</Canvas>
```

</TabItem>
<TabItem value="cs">

```cs
// Create the Canvas
myParentCanvas = new Canvas();
myParentCanvas.Width = 400;
myParentCanvas.Height = 400;

// Define child Canvas elements
myCanvas1 = new Canvas();
myCanvas1.Background = Brushes.Red;
myCanvas1.Height = 100;
myCanvas1.Width = 100;
Canvas.SetTop(myCanvas1, 0);
Canvas.SetLeft(myCanvas1, 0);

myCanvas2 = new Canvas();
myCanvas2.Background = Brushes.Green;
myCanvas2.Height = 100;
myCanvas2.Width = 100;
Canvas.SetTop(myCanvas2, 100);
Canvas.SetLeft(myCanvas2, 100);

myCanvas3 = new Canvas();
myCanvas3.Background = Brushes.Blue;
myCanvas3.Height = 100;
myCanvas3.Width = 100;
Canvas.SetTop(myCanvas3, 50);
Canvas.SetLeft(myCanvas3, 50);

// Add child elements to the Canvas' Children collection
myParentCanvas.Children.Add(myCanvas1);
myParentCanvas.Children.Add(myCanvas2);
myParentCanvas.Children.Add(myCanvas3);
```
</TabItem>  

</Tabs>

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Canvas).
:::

:::info
View the source code on _GitHub_ [`Canvas.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Canvas.cs)
:::
