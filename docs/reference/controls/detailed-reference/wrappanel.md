---
title: WrapPanel
description: REFERENCE - Built-in Controls
---

import WrapPanelHorizontalScreenshot from '/img/reference/controls/detailed-reference/wrappanel/wrappanel-horizontal.png';
import WrapPanelVerticalScreenshot from '/img/reference/controls/detailed-reference/wrappanel/wrappanel-vertical.png';

# WrapPanel

The `WrapPanel` uses a default arrangement of (multiple) child elements is in sequence from left to right, while they fit in the width. It starts a new line when there is no space left (including any margins and borders). 

When the orientation property is set to vertical, the arrangement is top to bottom with a new column started when there is no more height remaining.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td>Orientation</td><td>Change the direction of the arrangement flow.</td></tr></tbody></table>

## Examples

```
<WrapPanel>
    <Rectangle Fill="Navy" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Yellow" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Green" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Red" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Purple" Width="100" Height="100" Margin="20"/>
</WrapPanel>
```

<img src={WrapPanelHorizontalScreenshot} alt="" />

```xml
<WrapPanel Orientation="Vertical">
    <Rectangle Fill="Navy" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Yellow" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Green" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Red" Width="100" Height="100" Margin="20"/>
    <Rectangle Fill="Purple" Width="100" Height="100" Margin="20"/>
</WrapPanel>
```

<img src={WrapPanelVerticalScreenshot} alt="" />

### More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/WrapPanel/).
:::

:::info
View the source code on _GitHub_ [`WrapPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/WrapPanel.cs)
:::
