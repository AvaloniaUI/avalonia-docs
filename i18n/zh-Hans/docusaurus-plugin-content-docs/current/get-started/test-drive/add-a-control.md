---
id: add-a-control
title: 添加控件
---

import Highlight from '@site/src/components/Highlight';
import CalculateButton from '/img/get-started/test-drive/calculate-button.png';
import ButtonIntellisenseScreenshot from '/img/get-started/test-drive/button-intellisense.png';

到目前为止，您的应用程序的主窗口只显示一个文本字符串。在本页中，您将学习如何添加一些 Avalonia 的内置控件。

## Button

Avalonia 包含一个内置控件，用于创建按钮。按照以下步骤，将当前在 `Window` 的内容区域中的文本字符串替换为按钮控件。

- 如果应用程序正在运行，请停止它。
- 在 `MainWindow.xaml` 文件中找到 XAML 的突出显示行。
```xml title='XAML' 
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:GetStartedApp.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="400" d:DesignHeight="450"
        x:Class="GetStartedApp.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="GetStartedApp">

    <Design.DataContext>
        <!-- This only sets the DataContext for the previewer in an IDE,
             to set the actual DataContext for runtime, set the DataContext property in code (look at App.axaml.cs) -->
        <vm:MainWindowViewModel/>
    </Design.DataContext>

    // highlight-next-line
    <TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>
    
</Window>
```

- 将整行替换为下面的内容:
```xml title='XAML'
  <Button>Calculate</Button>
```
- 你的 XAML 文件现在应该看起来像这样： 
```xml title='XAML'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:GetStartedApp.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="400" d:DesignHeight="450"
        x:Class="GetStartedApp.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="GetStartedApp">

    <Design.DataContext>
        <!-- This only sets the DataContext for the previewer in an IDE,
             to set the actual DataContext for runtime, set the DataContext property in code (look at App.axaml.cs) -->
        <vm:MainWindowViewModel/>
    </Design.DataContext>
    
    // highlight-next-line
    <Button>Calculate</Button>    
</Window>
```

:::tip
如果您正在使用预览器，只要 XAML 有效，您就能在预览窗格中看到按钮出现。您还可以尝试将鼠标悬停并单击按钮以查看它在不同状态下的外观变化。
:::

- 运行应用程序以确认按钮在运行时的呈现和行为是否相同。

## 控件属性

XAML 使用 XML 特性来指定控件的呈现和行为。这些特性可以通过 XAML 创建的控件中的属性、调用方法和事件处理程序。

例如，您会注意到刚刚实现的按钮紧贴窗口的左边缘。这是其水平对齐属性的默认值（左对齐）的结果。按照以下步骤，将水平对齐设置为居中。

- 在 Button 标签中添加一个新特性，如下所示：

```xml
<Button HorizontalAlignment="Center">Calculate</Button>
```

:::tip
如果您正在使用 IDE，您可以注意到当您向 XAML 添加特性时，Avalonia 的智能感知会做出引导。

<img className="center" src={ButtonIntellisenseScreenshot} alt="" />
:::

按钮现在应该移动到窗口内容区域的中心。水平方向由于更改而移动，垂直方则为按钮的默认设置。

:::info
有关Avalonia UI内置控件及其属性的完整信息，请参考[此处](../../reference/controls)。
:::

在下一页中，您将学习如何创建更复杂的布局。
