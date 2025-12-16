---
description: REFERENCE - Built-in Controls
---

# WrapPanel 顺序换行面板

WrapPanel 使用默认排列方式将多个子元素从左到右依次排列，直到宽度不够时换行（包括任何边距和边框）。当没有剩余空间时，它会开始新的一行。

当 Orientation 属性设置为 Vertical 时，排列方式为从上到下，当没有剩余高度时开始新的一列。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="261">属性</th><th>描述</th></tr></thead><tbody><tr><td>Orientation</td><td>更改排列方向。</td></tr></tbody></table>

## 示例

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

### 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_WrapPanel)。
:::

:::info
在 _GitHub_ 上查看源代码 [`WrapPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/WrapPanel.cs)
:::

