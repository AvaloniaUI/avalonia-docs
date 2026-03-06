---
id: wrappanel
title: WrapPanel
---

The `WrapPanel` uses a default arrangement of (multiple) child elements is in sequence from left to right, while they fit in the width. It starts a new line when there is no space left (including any margins and borders). 

When the orientation property is set to vertical, the arrangement is top to bottom with a new column started when there is no more height remaining.

## Useful properties

| Property | Description |
|---|---|
| `Orientation` | Direction of the arrangement flow: `Horizontal` (default) or `Vertical`. |
| `ItemSpacing` | Horizontal gap between items. |
| `LineSpacing` | Vertical gap between rows (or horizontal gap between columns in vertical mode). |
| `ItemWidth` | Fixed width for all items. If not set, items use their natural width. |
| `ItemHeight` | Fixed height for all items. If not set, items use their natural height. |
| `HorizontalItemAlignment` | Controls how items are aligned horizontally within their allocated cell. Values: `Left`, `Center`, `Right`, `Stretch`. |
| `VerticalItemAlignment` | Controls how items are aligned vertically within their allocated cell. Values: `Top`, `Center`, `Bottom`, `Stretch`. |

## Examples

### Example 1: Default arrangement

<XamlPreview>

```xml
<WrapPanel xmlns="https://github.com/avaloniaui"
           ItemSpacing="20" LineSpacing="20"
           Margin="20">
    <Rectangle Fill="Navy" Width="80" Height="80" />
    <Rectangle Fill="Yellow" Width="80" Height="80" />
    <Rectangle Fill="Green" Width="80" Height="80" />
    <Rectangle Fill="Red" Width="80" Height="80" />
    <Rectangle Fill="Purple" Width="80" Height="80" />
</WrapPanel>
```

</XamlPreview>

### Example 2: Vertical arrangement

<XamlPreview>

```xml
<WrapPanel xmlns="https://github.com/avaloniaui"
           Orientation="Vertical"
           ItemSpacing="20" LineSpacing="20"
           Margin="20">
    <Rectangle Fill="Navy" Width="80" Height="80" />
    <Rectangle Fill="Yellow" Width="80" Height="80" />
    <Rectangle Fill="Green" Width="80" Height="80" />
    <Rectangle Fill="Red" Width="80" Height="80" />
    <Rectangle Fill="Purple" Width="80" Height="80" />
</WrapPanel>
```

</XamlPreview>

## See also

- [WrapPanel API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_WrapPanel)
- [`WrapPanel.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/WrapPanel.cs)
