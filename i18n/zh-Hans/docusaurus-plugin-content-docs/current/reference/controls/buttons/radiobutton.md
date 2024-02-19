---
description: REFERENCE - Built-in Controls
---

import RadioButtonScreenshot from '/img/reference/controls/buttons/radiobutton.gif';

# 单选按钮

单选按钮控件展示了一组选项，用户一次只能选择其中一个。选中的选项以实心圆圈表示，未选中的选项以空心圆圈表示。

单选按钮控件的内容以标签形式呈现在圆圈旁边。

虽然可能没有选中任何组中的选项，但一旦选中一个选项，用户就无法停止单选按钮的交互。

## 有用的属性

您可能经常使用以下属性：

| 属性 | 描述 |
| ---- | ---- |
| `GroupName` | 定义一组选项的共同名称，这些选项将作为单选按钮进行交互。 |
| `IsChecked` | 单选按钮选项是否被选中（true）或未选中（false）。 |
| `IsEnabled` | 单选按钮选项是否启用。禁用的选项呈现为透明。 |

## 示例

以下示例展示了两组独立工作的单选按钮：

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 10 0 5">First Group</TextBlock>
    <RadioButton GroupName="First Group"
              Content="First Option"/>
    <RadioButton GroupName="First Group"
              Content="Second Option"/>
    <RadioButton IsEnabled="False"
              GroupName="First Group"
              Content="Third Option"/>

  <TextBlock Margin="0 10 0 5">Second Group</TextBlock> 
    <RadioButton GroupName="Second Group"
              Content="Fourth Option"/>
    <RadioButton GroupName="Second Group"
              Content="Fifth Option"/>
</StackPanel>
```

<img src={RadioButtonScreenshot} alt="示例图片" />

## 更多信息

:::info
有关此控件的完整API文档，请参阅[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/RadioButton/)。
:::

:::info
在_GitHub_上查看源代码 [`RadioButton.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RadioButton.cs)
:::