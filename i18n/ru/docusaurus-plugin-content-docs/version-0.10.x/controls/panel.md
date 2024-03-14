---
id: panel
title: Panel
---

import PanelRectangleLayoutScreenshot from '/img/controls/panel/image (7).png';

The `Panel` is the base class for controls that can contain multiple children like `DockPanel` or `StackPanel`.

The `Panel` class can be useful on its own for very basic layouts, or simply to allow multiple controls to be to be contained.

```xml
<Panel Height="300" Width="300">
    <Rectangle Fill="Red" Height="100" VerticalAlignment="Top"/>
    <Rectangle Fill="Blue" Width="100" HorizontalAlignment="Right" />
    <Rectangle Fill="Green" Height="100" VerticalAlignment="Bottom"/>
    <Rectangle Fill="Orange" Width="100" HorizontalAlignment="Left"/>
</Panel>
```

<img className="center" src={PanelRectangleLayoutScreenshot} alt="" />

There are other more useful panels that derive from `Panel`, these include:

[StackPanel](./stackpanel)

[DockPanel](./dockpanel)

[RelativePanel](./relativepanel)

[WrapPanel](./wrappanel)

### Reference

[Panel](http://reference.avaloniaui.net/api/Avalonia.Controls/Panel/)

### Source code

[Panel.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Panel.cs)

### Related Docs

[Panels Overview](../layout/panels-overview)

[Create a custom panel](../layout/create-a-custom-panel)

