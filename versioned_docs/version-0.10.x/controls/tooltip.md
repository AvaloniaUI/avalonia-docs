---
id: tooltip
title: ToolTip
---

The `ToolTip` is a control that pops up with hint text when hovered over the appropriate control.

## Common Properties

| Property | Description |
| :--- | :--- |
| `Tip` | Gets or sets the tooltip contents. |
| `Placement` | Gets or sets the placement for the tooltip. Default value is Pointer. |
| `HorizontalOffset` | Gets or sets the tooltip horizontal offset. |
| `VerticalOffset` | Gets or sets the tooltip vertical offset. Default value is 20. |
| `ShowDelay` | Gets or sets the delay for the tooltip to appear. Default value is 400. |
| `IsOpen` | Gets or sets a value indicating whether the tooltip is currently showing. |

### Reference

[ToolTip](http://reference.avaloniaui.net/api/Avalonia.Controls/ToolTip/)

### Source code

[ToolTip.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ToolTip.cs)

## Examples

### Text ToolTip

```xml
<Border Margin="5"
        Padding="10"
        Background="{DynamicResource ThemeAccentBrush}"
        ToolTip.Tip="This is a ToolTip">
    <TextBlock>Hover Here</TextBlock>
</Border>
```

### Rich Tooltip

```xml
<Border Margin="5"
        Padding="10"
        Background="{DynamicResource ThemeAccentBrush}"
        ToolTip.Placement="Bottom">
    <ToolTip.Tip>
        <StackPanel>
            <TextBlock Classes="h1">ToolTip</TextBlock>
            <TextBlock Classes="h2">A control which pops up a hint when a control is hovered</TextBlock>
        </StackPanel>
    </ToolTip.Tip>
    <TextBlock>Hover Here for a Bottom ToolTip</TextBlock>
</Border>
```
