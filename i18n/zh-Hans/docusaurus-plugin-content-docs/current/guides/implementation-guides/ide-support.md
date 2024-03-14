---
id: ide-support
title: 如何使用实时预览
---

import VsXamlPreviewerScreenshot from '/img/guides/implementation-guides/vs-xaml-previewer.png';
import VsLogVerbosityScreenshot from '/img/guides/implementation-guides/vs-log-verbosity.png';
import VsDiagnosticsOutputScreenshot from '/img/guides/implementation-guides/vs-diagnostics-output.png';

# 如何使用实时预览

本指南将展示如何在 Visual Studio 和 _ReSharper_ 中使用 _Avalonia UI_ 扩展的实时预览功能。

_Avalonia for Visual Studio_ 扩展包含一个 XAML 设计器，可在您编写 XAML 时显示实时预览。安装了 Avalonia for Visual Studio 扩展后，双击 Avalonia XAML 文件即可打开它。

对于 Visual Studio 和 ReSharper 用户，[ReSharper 2020.3](https://www.jetbrains.com/resharper/whatsnew/2020-3/#version-2020-3-avalonia-support) 引入了内置的代码分析、代码补全、导航和查找用法功能。

<img src={VsXamlPreviewerScreenshot} alt="Shows the XAML Previewer in Visual Studio"/>

:::info
如果您的 XAML 文件位于库中，_Avalonia UI_ 需要一个可执行的应用程序来进行预览。在设计器右上角的下拉菜单中选择一个可执行项目。一旦构建了您的项目，编辑编辑器中的 XAML 将自动更新预览。
:::

:::warning
在某些情况下，由于 Visual Studio 中的错误/限制，Avalonia XAML 设计器未显示，而是显示了 WPF 设计器。如果您的 XAML 文件显示了许多错误，请尝试右键单击文件，然后选择“打开方式...” → “Avalonia XAML Editor”。
:::

## 设计时属性

有许多属性可以应用于控件，这些属性仅在设计时生效。要使用这些属性，您必须在 XAML 文件中添加一个命名空间：

```csharp
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
```

添加了该命名空间后，以下设计时属性可用：

### d:DesignWidth 和 d:DesignHeight

`d:DesignWidth` 和 `d:DesignHeight` 属性为预览的控件应用宽度和高度。

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaApplication1.MainWindow">
    Welcome to Avalonia!
</Window>
```

### d:DataContext

`d:DataContext` 属性仅在设计时应用 `DataContext` 。建议您与 `{x:Static}` 指令结合使用此属性，以引用您的一个程序集中的静态属性：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:dd="clr-namespace:My.Namespace;assembly=MyAssembly"
        d:DataContext="{x:Static dd:DesignData.ExampleViewModel}"
        x:Class="AvaloniaApplication1.MainWindow">
    Welcome to Avalonia!
</Window>
```

```csharp
namespace My.Namespace
{
    public static class DesignData
    {
        public static MyViewModel ExampleViewModel { get; } = new MyViewModel
        {
            // View Model initialization here.
        };
    }
}
```

### Design.DataContext

或者您可以使用 `Design.DataContext` 附加属性，以及 `Design.Width` 和 `Design.Height`。

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:dd="clr-namespace:My.Namespace;assembly=MyAssembly"
        x:Class="AvaloniaApplication1.MainWindow"
        Design.Width="100">
    <Design.DataContext>
        <dd:MyViewModel />
    </Design.DataContext>
    Welcome to Avalonia!
</Window>
```

## 诊断错误

如果您遇到问题，请尝试启用详细日志记录。在 Visual Studio 中进行以下操作：

-  单击 **工具** 菜单上的 **选项**
-  在列表中单击 **Avalonia XAML Editor**
-  在 **Minimum Log Verbosity** 下拉菜单中选择 **Verbose**

<img src={VsLogVerbosityScreenshot} alt=""/>

现在日志将显示在 Visual Studio **输出**窗口中。

在此窗口顶部的下拉菜单中选择 **Avalonia Diagnostics**。

<img src={VsDiagnosticsOutputScreenshot} alt=""/>
