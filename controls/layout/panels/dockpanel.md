---
id: dockpanel
title: DockPanel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DockPanelTopScreenshot from '/img/controls/dockpanel/dockpanel-top.png';

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

## Sizing to content

If its `Height` and `Width` properties are not specified, `DockPanel` sizes to its content. The size can increase or decrease to accommodate the size of its child elements. However, when these properties are specified and there is no longer room for the next specified child element, `DockPanel` does not display that child element or subsequent child elements and does not measure subsequent child elements.

## LastChildFill

By default, the last child of a `DockPanel` element will "fill" the remaining, unallocated space. If this behavior is not desired, set the `LastChildFill` property to `false`.

## Example

Setting the opacity of the orange rectangle to 0.5 demonstrates that there are no overlaps.

<XamlPreview>

```xml
<DockPanel xmlns="https://github.com/avaloniaui"
           Width="300" Height="300">
    <Rectangle Fill="Red" Height="100" DockPanel.Dock="Top"/>
    <Rectangle Fill="Blue" Width="100" DockPanel.Dock="Left" />
    <Rectangle Fill="Green" Height="100" DockPanel.Dock="Bottom"/>
    <Rectangle Fill="Orange" Width="100" DockPanel.Dock="Right" Opacity="0.5"/>
    <Rectangle Fill="Gray" />
</DockPanel>
```

</XamlPreview>

## Defining a DockPanel in code

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<DockPanel LastChildFill="True">
  <Border Height="25" Background="SkyBlue" BorderBrush="Black" BorderThickness="1" DockPanel.Dock="Top">
    <TextBlock Foreground="Black">Dock = "Top"</TextBlock>
  </Border>
  <Border Height="25" Background="SkyBlue" BorderBrush="Black" BorderThickness="1" DockPanel.Dock="Top">
    <TextBlock Foreground="Black">Dock = "Top"</TextBlock>
  </Border>
  <Border Height="25" Background="LemonChiffon" BorderBrush="Black" BorderThickness="1" DockPanel.Dock="Bottom">
    <TextBlock Foreground="Black">Dock = "Bottom"</TextBlock>
  </Border>
  <Border Width="200" Background="PaleGreen" BorderBrush="Black" BorderThickness="1" DockPanel.Dock="Left">
    <TextBlock Foreground="Black">Dock = "Left"</TextBlock>
  </Border>
  <Border Background="White" BorderBrush="Black" BorderThickness="1">
    <TextBlock Foreground="Black">This content will "Fill" the remaining space</TextBlock>
  </Border>
</DockPanel>
```

</TabItem>
<TabItem value="cs">

```cs
// Create the DockPanel
DockPanel myDockPanel = new DockPanel();
myDockPanel.LastChildFill = true;

// Define the child content
Border myBorder1 = new Border();
myBorder1.Height = 25;
myBorder1.Background = Brushes.SkyBlue;
myBorder1.BorderBrush = Brushes.Black;
myBorder1.BorderThickness = new Thickness(1);
DockPanel.SetDock(myBorder1, Dock.Top);
TextBlock myTextBlock1 = new TextBlock();
myTextBlock1.Foreground = Brushes.Black;
myTextBlock1.Text = "Dock = Top";
myBorder1.Child = myTextBlock1;

Border myBorder2 = new Border();
myBorder2.Height = 25;
myBorder2.Background = Brushes.SkyBlue;
myBorder2.BorderBrush = Brushes.Black;
myBorder2.BorderThickness = new Thickness(1);
DockPanel.SetDock(myBorder2, Dock.Top);
TextBlock myTextBlock2 = new TextBlock();
myTextBlock2.Foreground = Brushes.Black;
myTextBlock2.Text = "Dock = Top";
myBorder2.Child = myTextBlock2;

Border myBorder3 = new Border();
myBorder3.Height = 25;
myBorder3.Background = Brushes.LemonChiffon;
myBorder3.BorderBrush = Brushes.Black;
myBorder3.BorderThickness = new Thickness(1);
DockPanel.SetDock(myBorder3, Dock.Bottom);
TextBlock myTextBlock3 = new TextBlock();
myTextBlock3.Foreground = Brushes.Black;
myTextBlock3.Text = "Dock = Bottom";
myBorder3.Child = myTextBlock3;

Border myBorder4 = new Border();
myBorder4.Width = 200;
myBorder4.Background = Brushes.PaleGreen;
myBorder4.BorderBrush = Brushes.Black;
myBorder4.BorderThickness = new Thickness(1);
DockPanel.SetDock(myBorder4, Dock.Left);
TextBlock myTextBlock4 = new TextBlock();
myTextBlock4.Foreground = Brushes.Black;
myTextBlock4.Text = "Dock = Left";
myBorder4.Child = myTextBlock4;

Border myBorder5 = new Border();
myBorder5.Background = Brushes.White;
myBorder5.BorderBrush = Brushes.Black;
myBorder5.BorderThickness = new Thickness(1);
TextBlock myTextBlock5 = new TextBlock();
myTextBlock5.Foreground = Brushes.Black;
myTextBlock5.Text = "This content will Fill the remaining space";
myBorder5.Child = myTextBlock5;

// Add child elements to the DockPanel Children collection
myDockPanel.Children.Add(myBorder1);
myDockPanel.Children.Add(myBorder2);
myDockPanel.Children.Add(myBorder3);
myDockPanel.Children.Add(myBorder4);
myDockPanel.Children.Add(myBorder5);
```
</TabItem>  

</Tabs>

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_DockPanel).
:::

:::info
View the source code on _GitHub_ [`DockPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DockPanel.cs)
:::
