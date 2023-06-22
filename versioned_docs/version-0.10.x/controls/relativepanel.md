---
id: relativepanel
title: RelativePanel
---

The `RelativePanel` control is a `Panel` which lets you layout elements by specifying where they go in relation to other elements and in relation to the panel.

By default, an element is positioned in the upper left corner of the panel.

Attached properties are used to control the layout of elements. This table shows those properties.

| Panel alignment | Sibling alignment | Sibling position |
| :--- | :--- | :--- |
| AlignTopWithPanel | AlignTopWith | Above |
| AlignBottomWithPanel | AlignBottomWith | Below |
| AlignLeftWithPanel | AlignLeftWith | LeftOf |
| AlignRightWithPanel | AlignRightWith | RightOf |
| AlignHorizontalCenterWithPanel | AlignHorizontalCenterWith |  |
| AlignVerticalCenterWithPanel | AlignVerticalCenterWith |  |

This XAML shows how to arrange elements in a RelativePanel.

```markup
<RelativePanel BorderBrush="Gray" BorderThickness="1">
    <Rectangle x:Name="RedRect" Fill="Red" Height="44" Width="44"/>
    <Rectangle x:Name="BlueRect" Fill="Blue"
               Height="44" Width="88"
               RelativePanel.RightOf="RedRect" />

    <Rectangle x:Name="GreenRect" Fill="Green" 
               Height="44"
               RelativePanel.Below="RedRect" 
               RelativePanel.AlignLeftWith="RedRect" 
               RelativePanel.AlignRightWith="BlueRect"/>
    <Rectangle Fill="Orange"
               RelativePanel.Below="GreenRect" 
               RelativePanel.AlignLeftWith="BlueRect" 
               RelativePanel.AlignRightWithPanel="True"
               RelativePanel.AlignBottomWithPanel="True"/>
</RelativePanel>
```

The result looks like this.

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/relativepanel/layout-panel-relative-panel.png" alt="Relative panel" />
  </div>

Here are a few things to note about the sizing of the rectangles:

* The red rectangle is given an explicit size of 44x44. It's placed in the upper left corner of the panel, which is the default position.
* The green rectangle is given an explicit height of 44. Its left side is aligned with the red rectangle, and its right side is aligned with the blue rectangle, which determines its width.
* The orange rectangle isn't given an explicit size. Its left side is aligned with the blue rectangle. Its right and bottom edges are aligned with the edge of the panel. Its size is determined by these alignments and it will resize as the panel resizes.

### Reference

[RelativePanel](http://reference.avaloniaui.net/api/Avalonia.Controls/StackPanel/)

### Source code

[RelativePanel.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RelativePanel.cs)
