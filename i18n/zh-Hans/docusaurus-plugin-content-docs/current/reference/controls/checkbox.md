---
description: REFERENCE - Built-in Control
---

import CheckBoxTwoStateScreenshot from '/img/reference/controls/checkbox/checkbox-two-state.gif';
import CheckBoxThreeStateScreenshot from '/img/reference/controls/checkbox/checkbox-three-state.gif';

# CheckBox 复选框

复选框控件展示一个布尔值，其中真值用勾选标记表示，假值则显示为空白框。复选框有一个选项可以表示可空的布尔值，其中空值表示“未知”，并以阴影框的形式呈现。

点击交互会按以下顺序切换值：勾选、未勾选、未知（如果是三态的）。

## 常用属性

你可能最常使用这些属性：

| 属性            | 描述                                 |
| -------------- | ------------------------------------ |
| `IsChecked`    | 设置布尔值。                         |
| `IsThreeState` | （布尔值）设置三态模式。             |

## 示例

这是一个两态复选框的示例：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="CheckBox sample">
    <StackPanel Margin="20">
        <CheckBox>Not checked by default</CheckBox>
        <CheckBox IsChecked="True">Checked by default</CheckBox>
    </StackPanel>
</Window>
```

在窗口中实际运行时的外观:

<img src={CheckBoxTwoStateScreenshot} alt="" />

这是一个三态复选框的示例：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="CheckBox sample">
    <StackPanel Margin="20">
        <CheckBox IsThreeState="True" IsChecked="False">Not checked by default</CheckBox>
        <CheckBox IsThreeState="True" IsChecked="True">Checked by default</CheckBox>
        <CheckBox IsThreeState="True" IsChecked="{x:Null}">Unknown by default</CheckBox>
    </StackPanel>
</Window>
```

在窗口中实际运行时的外观:

<img src={CheckBoxThreeStateScreenshot} alt="" />

## 更多信息

要查看有关此控件的完整 API 文档，请参阅[此处](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_CheckBox)。

在 _GitHub_ 上查看源代码 [`CheckBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CheckBox.cs)