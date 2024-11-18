---
description: REFERENCE - Built-in Controls
---

import ScrollViewerScreenshot from '/img/reference/controls/scrollviewer/scrollviewer.gif';

# ScrollViewer 滚动查看器

滚动查看器控件可以包含比其内容区域更大的内容，并且可以提供滚动条以将隐藏的内容移入视图。

`ScrollViewer` 不能包含在具有无限高度或宽度（取决于滚动方向）的控件中，例如 `StackPanel`。为避免这种情况，您可以设置固定的高度/宽度或最大高度/宽度，或选择另一个容器面板。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="288">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>AllowAutoHide</code></td><td>布尔值，默认为 true。设置滚动条在指针不在其上方或不具有焦点时是否自动隐藏。</td></tr><tr><td><code>ScrollViewer</code>. <code>IsScrollChainingEnabled</code></td><td>布尔值，默认为 true。附加到内部控件，详情见下文。</td></tr></tbody></table>

## 滚动链

如果你有一个可以自身滚动的控件（见下面的列表）嵌套在滚动查看器内，当用户在控件上达到限制时，此属性设置外部滚动查看器是否应继续滚动。你可以通过在内部控件上使用以下格式的附加属性来启用或禁用此行为：

`ScrollViewer.IsScrollChainingEnabled=[true|false]`

这个附加属性适用于以下控件：

* 滚动查看器
* 数据表格
* 列表框
* 文本框
* 树形视图

## 示例

此示例创建了一个比其内部边框更大的堆栈面板。滚动查看器自动创建一个垂直滚动条。

```xml
<Border Background="AliceBlue" Width="300" Height="300">
  <ScrollViewer>
    <StackPanel>
      <TextBlock FontSize="22" Height="100" Background="LightBlue">块 1</TextBlock>
      <TextBlock FontSize="22" Height="100">块 2</TextBlock>
      <TextBlock FontSize="22" Height="100" Background="LightBlue">块 3</TextBlock>
      <TextBlock FontSize="22" Height="100">块 4</TextBlock>
      <TextBlock FontSize="22" Height="100" Background="LightBlue">块 5</TextBlock>
    </StackPanel>
  </ScrollViewer>
</Border>
```

<img src={ScrollViewerScreenshot} alt="" />

## 更多信息

:::info
查看完整的 API 文档，请访问[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/ScrollViewer/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`ScrollViewer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ScrollViewer.cs)
:::