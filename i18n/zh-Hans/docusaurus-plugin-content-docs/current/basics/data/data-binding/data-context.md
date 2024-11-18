---
description: CONCEPTS
---

import DataContextOverviewDiagram from '/img/basics/data-binding/data-context/data-context-overview.png';
import DataContextTreeSearchDiagram from '/img/basics/data-binding/data-context/data-context-tree-search.png';
import DataContextGreetingBindingScreenshot from '/img/basics/data-binding/data-context/data-context-greeting.png';
import DataContextPreviewerScreenshot from '/img/basics/data-binding/data-context/data-context-previewer.png';

# 数据上下文

当Avalonia执行数据绑定时，它必须定位要绑定的应用程序对象。这个位置由**数据上下文**表示。

<img src={DataContextOverviewDiagram} alt=''/>

Avalonia中的每个控件都有一个名为`DataContext`的属性，包括内置控件、用户控件和窗口。

在绑定时，Avalonia会从逻辑控件树中进行分层搜索，从定义绑定的控件开始，直到找到要使用的数据上下文。

<img src={DataContextTreeSearchDiagram} alt=''/>

这意味着在窗口中定义的控件可以使用窗口的数据上下文；或者（如上所示），在窗口中的控件中定义的控件可以使用窗口的数据上下文。

:::info
有关Avalonia中的控件树以及如何在运行时查看它们的信息，请参阅[这里](../../../concepts/control-trees).
:::

## 示例

如果您使用 _Avalonia MVVM Application_ 模板创建一个新项目，您可以看到窗口的数据上下文是如何设置的。找到并打开**App.axaml.cs**文件查看代码：

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        desktop.MainWindow = new MainWindow
        {
            DataContext = new MainWindowViewModel(),
        };
    }

    base.OnFrameworkInitializationCompleted();
}
```

您可以在**MainWindowViewModel.cs**文件中追踪设置到窗口数据上下文的对象。代码如下：

```csharp
public class MainWindowViewModel : ViewModelBase
{
    public string Greeting => "Welcome to Avalonia!";
}
```

在主窗口文件**MainWindow.axaml**中，您可以看到窗口内容区由一个文本块组成，该文本块的文本属性被绑定到`Greeting`属性。

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:AvaloniaMVVMApplication2.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaMVVMApplication2.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Title="AvaloniaMVVMApplication2">

    <Design.DataContext>
        <vm:MainWindowViewModel/>
    </Design.DataContext>

    <TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>

</Window>
```

项目运行时，数据绑定器从文本块开始向上搜索逻辑控件树，找到在主窗口级别设置的数据上下文。因此，绑定的文本显示为：

<img src={DataContextGreetingBindingScreenshot} alt=""/>

## 设计时数据上下文

您可能已经注意到，在首次编译此项目后，预览窗格也显示了问候语。

<img src={DataContextPreviewerScreenshot} alt=""/>

这是因为Avalonia还可以为控件设置设计时数据上下文。这对您非常有用，因为这意味着预览窗格在您调整布局和样式时可以显示一些真实的数据。

您可以在XAML中看到设计时数据上下文的设置：

```xml
<Design.DataContext>
    <vm:MainWindowViewModel/>
</Design.DataContext>
```

:::tip
有关如何使用设计时数据上下文的更详细指南，请参阅[这里](../../../guides/implementation-guides/how-to-use-design-time-data.md).
:::

:::info
进一步讨论数据绑定需要您对MVVM（Model-View-ViewModel）编程模式有所了解。如果您想了解MVVM模式的基本概念，请参阅[这里](../../../concepts/the-mvvm-pattern).
:::

更多信息

绑定到命令
