---
id: add-a-control
title: 添加控件
---

import Highlight from '@site/src/components/Highlight';
import CalculateButton from '/img/get-started/test-drive/calculate-button.png';
import ButtonIntellisenseScreenshot from '/img/get-started/test-drive/button-intellisense.png';

到目前为止，您的应用程序的主窗口只显示一个文本字符串。在本页中，您将学习如何添加一些Avalonia的内置控件。

## Button

Avalonia包含一个内置控件，用于创建按钮。按照以下步骤，将当前在窗口的内容区域中的文本字符串替换为按钮控件。

- 如果应用程序正在运行，请停止它。
- 在 `MainView.axaml` 文件中找到
  `<TextBlock Text="text" HorizontalAlignment="Center" VerticalAlignment="Center"/>`。
- 删除整行。
- 插入一个`Button`标签，如下所示：
```xml
  <Button>Calculate</Button>
```
<img className="center" src={CalculateButton} alt="" />

:::tip
如果您正在使用预览器，只要XAML有效，您就能在预览窗格中看到按钮出现。您还可以尝试在按钮上移动鼠标并单击，查看它在不同状态下显示的不同颜色。
:::

- 运行应用程序以确认按钮在运行时的呈现和行为是否相同。

## 控件属性

Avalonia控件的XAML代码使用属性来指定呈现和行为。这些属性可以设置XAML创建的控件中的属性、调用方法和事件处理程序。

例如，您会注意到刚刚实现的按钮紧贴窗口的左边缘。这是其水平对齐属性的默认值（左对齐）的结果。按照以下步骤，将水平对齐设置为居中。

- 在Button标签中添加一个新属性，如下所示：

```xml
<Button HorizontalAlignment="Center">Calculate</Button>
```

:::tip
如果您正在使用IDE，您可以注意到当您向XAML添加属性时，Avalonia的智能感知会做出引导。

<img className="center" src={ButtonIntellisenseScreenshot} alt="" />
:::

按钮现在已经移动到窗口内容区域的中心（水平和垂直方向）。

:::info
有关Avalonia UI内置控件及其属性的完整信息，请参考[此处](../../reference/controls)。
:::

在下一页中，您将学习如何创建更复杂的布局。