---
description: REFERENCE - Built-in Controls
---

import PanelOverlapBlendScreenshot from '/img/reference/controls/panel/panel-overlap-blend.png';

# Panel

The panel is the most basic control that can contain multiple child controls. Child controls are drawn according to their horizontal and vertical alignment properties, and in the sequence that they appear in the XAML. Child controls will overlap if they occupy the same space.

:::info
For a discussion about using other panels, see [here](../../basics/user-interface/building-layouts/panels-overview.md).
:::

## Example

This example uses some 50% opacities to demonstrate that child controls overlap.

```xml
<Panel Height="300" Width="300">
    <Rectangle Fill="Red" Height="100" VerticalAlignment="Top"/>
    <Rectangle Fill="Blue" Opacity="0.5" Width="100" HorizontalAlignment="Right" />
    <Rectangle Fill="Green" Opacity="0.5" Height="100" VerticalAlignment="Bottom"/>
    <Rectangle Fill="Orange" Width="100" HorizontalAlignment="Left"/>
</Panel>
```

<img src={PanelOverlapBlendScreenshot} alt="" />

## Other Panel Controls

There are other more useful panels, that offer better control over the positioning of their child controls:

* Stack Panel
* Dock Panel
* Relative Panel
* Wrap Panel

If you have specific requirements for positioning the child controls in a panel, you can create your own custom control based on the panel.

:::info
For instructions about how to create a custom panel control, see [here](../../guides/custom-controls/create-a-custom-panel.md).
:::

## More Information

:::info
For the complete API documentation about this control see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Panel/).
:::

:::info
View the source code on GitHub [`Panel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Panel.cs)
:::
