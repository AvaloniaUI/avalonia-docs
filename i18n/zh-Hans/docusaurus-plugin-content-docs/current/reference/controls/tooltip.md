---
description: REFERENCE - Built-in Controls
---

import ToolTipTextHoverScreenshot from '/img/reference/controls/tooltip/tooltip-text-hover.gif';
import ToolTipContentScreenshot from '/img/reference/controls/tooltip/tooltip-content-hover.gif';

# ToolTip 工具提示

工具提示是一个弹出窗口，当用户将鼠标悬停在附加到的“宿主”控件上时显示其内容。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="298">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>ToolTip.Tip</code></td><td>工具提示内容的附加属性。</td></tr><tr><td><code>ToolTip.Placement</code></td><td>定义工具提示相对于宿主或指针的位置。可选择顶部、底部、左侧、右侧、锚点和重力、指针。默认值是指针，它将提示内容放置在指针停止移动的位置。</td></tr><tr><td><code>ToolTip.HorizontalOffset</code></td><td>工具提示相对于位置的水平偏移（默认值为0）。</td></tr><tr><td><code>ToolTip.VerticalOffset</code></td><td>工具提示相对于位置的垂直偏移（默认值为20）。</td></tr><tr><td><code>ToolTip.ShowDelay</code></td><td>指针必须保持静止的时间，工具提示才会出现。以微秒为单位（默认值为400）。</td></tr></tbody></table>

## 示例

这是一个简单的基于文本的工具提示，使用默认的放置和延迟属性值；此矩形放置在具有较大尺寸的窗口中：

```xml
<Rectangle Fill="Aqua" Height="200" Width="400"
      ToolTip.Tip="This is a rectangle" />
```

<img src={ToolTipTextHoverScreenshot} alt="" />

要为工具提示提供更丰富的呈现，请使用 `<ToolTip.Tip>` 元素。例如：

```xml
<Rectangle Fill="Aqua" Height="200" Width="400"
  ToolTip.Placement="Bottom">
  <ToolTip.Tip>
    <StackPanel>
    <TextBlock FontSize="16">Rectangle</TextBlock>
    <TextBlock>Some explanation here.</TextBlock>
    </StackPanel>
  </ToolTip.Tip>
</Rectangle>
```

<img src={ToolTipContentScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整API文档，请参见[此处](http://reference.avaloniaui.net/api/Avalonia.Controls/ToolTip/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`ToolTip.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ToolTip.cs)
:::

