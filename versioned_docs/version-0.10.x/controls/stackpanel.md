---
id: stackpanel
title: StackPanel
---

The `StackPanel` control is a `Panel` which lays out its children by stacking them horizontally or vertically. StackPanel is typically used to arrange a small subsection of the UI on a page.

You can use the [**Orientation**](https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.stackpanel.orientation) property to specify the direction of the child elements. The default orientation is [**Vertical**](https://docs.microsoft.com/en-us/uwp/api/Windows.UI.Xaml.Controls.Orientation).

The following XAML shows how to create a vertical StackPanel of items.

```markup
<StackPanel>
    <Rectangle Fill="Red" Height="44"/>
    <Rectangle Fill="Blue" Height="44"/>
    <Rectangle Fill="Green" Height="44"/>
    <Rectangle Fill="Orange" Height="44"/>
</StackPanel>
```

The result looks like this.

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/stackpanel/layout-panel-stack-panel.png"  />
  </div>

In a StackPanel, if a child element's size is not set explicitly, it stretches to fill the available width \(or height if the Orientation is **Horizontal**\). In this example, the width of the rectangles is not set. The rectangles expand to fill the entire width of the StackPanel.

StackPanel has a `Spacing` property to allow an even spacing between items.

```markup
<StackPanel Spacing="5">
    <Rectangle Fill="Red" Height="44"/>
    <Rectangle Fill="Blue" Height="44"/>
    <Rectangle Fill="Green" Height="44"/>
    <Rectangle Fill="Orange" Height="44"/>
</StackPanel>
```

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/stackpanel/image (12).png"  />
  </div>


### Reference

[StackPanel](http://reference.avaloniaui.net/api/Avalonia.Controls/StackPanel/)

### Source code

[StackPanel.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/StackPanel.cs)
