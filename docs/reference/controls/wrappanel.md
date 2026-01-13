---
title: WrapPanel
description: REFERENCE - Built-in Controls
---

# WrapPanel

The `WrapPanel` uses a default arrangement of (multiple) child elements is in sequence from left to right, while they fit in the width. It starts a new line when there is no space left (including any margins and borders). 

When the orientation property is set to vertical, the arrangement is top to bottom with a new column started when there is no more height remaining.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td>Orientation</td><td>Change the direction of the arrangement flow.</td></tr></tbody></table>

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

### More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_WrapPanel).
:::

:::info
View the source code on _GitHub_ [`WrapPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/WrapPanel.cs)
:::
