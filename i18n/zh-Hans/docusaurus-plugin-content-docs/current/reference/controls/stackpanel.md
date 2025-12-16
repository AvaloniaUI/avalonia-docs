---
description: REFERENCE - Built-in Controls
---

# StackPanel 堆栈面板

堆栈面板通过水平或垂直堆叠其子控件来排列它们。堆栈面板通常用于在页面上排列UI的一个小部分。

在堆栈面板内部，如果子控件在垂直于堆栈的方向上没有设置大小属性，那么子控件将扩展以填充可用空间。例如，在水平方向上，如果未设置，子控件的高度将会扩展。

在堆栈的方向上，堆栈面板将总是扩展以适应所有子控件。

## 常用属性

你可能最常使用这些属性：

| 属性          | 描述                                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| `Orientation` | 设置堆栈的方向。可选择水平或垂直（默认）。                                       |
| `Spacing`     | 在子控件之间创建均匀间距。                                                      |

## 示例

以下XAML展示了如何创建一个垂直的堆栈面板。结果显示子控件被拉伸以适应宽度，而堆栈面板的总高度等于子控件高度的总和。

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Width="200">
    <Rectangle Fill="Red" Height="50"/>
    <Rectangle Fill="Blue" Height="50"/>
    <Rectangle Fill="Green" Height="50"/>
    <Rectangle Fill="Orange" Height="50"/>
</StackPanel>
```

</XamlPreview>

## 更多信息

:::info
有关此控件的完整API文档，请参见[此处](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_StackPanel)。
:::

:::info
在_GitHub_上查看源代码 [`StackPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/StackPanel.cs)
:::