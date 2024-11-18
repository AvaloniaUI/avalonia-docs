---
id: dockpanel
title: DockPanel
---

import DockPanelFillNoOverlapScreenshot from '/img/controls/dockpanel/dockpanel.png';

# DockPanel

The `DockPanel` control is a `Panel` which lays out its children by "docking" them to the sides or floating in the center.

```xml
<DockPanel Width="300" Height="300">
    <Rectangle Fill="Red" Height="100" DockPanel.Dock="Top"/>
    <Rectangle Fill="Blue" Width="100" DockPanel.Dock="Left"/>
    <Rectangle Fill="Green" Height="100" DockPanel.Dock="Bottom"/>
    <Rectangle Fill="Orange" Width="100" DockPanel.Dock="Right"/>
    <Rectangle Fill="Gray" />
</DockPanel>
```

The `LastChildFill` property means that the last child will fill any remaining space in the panel.

The `DockPanel.Dock` attached property is used to control which side an element is docked to. The options are `Left`, `Top` , `Right` and `Bottom`.

<img className="center" src={DockPanelFillNoOverlapScreenshot} alt="DockPanel" />

### Reference <a href="#reference" id="reference"></a>

[DockPanel](http://reference.avaloniaui.net/api/Avalonia.Controls/DockPanel/)

### Source code <a href="#source-code" id="source-code"></a>

[DockPanel.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/DockPanel.cs)