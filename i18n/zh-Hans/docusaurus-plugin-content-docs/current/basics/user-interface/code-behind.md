---
id: code-behind
title: Code-behind
---

import VsSolutionExplorerScreenshot from '/img/basics/user-interface/code-behind/vs-solution-explorer.png';

# Code-behind

除了XAML文件外，大多数Avalonia控件还具有常常用C#编写的 _code-behind_ 文件。代码后台文件通常具有`.axaml.cs`文件扩展名，并且通常在IDE中显示在XAML文件的下一级。

例如，在Visual Studio的解决方案资源管理器中，您可以看到一个`MainWindow.axaml`文件以及它的code-behind文件`MainWindow.axaml.cs`：

<p><img src={VsSolutionExplorerScreenshot} className="medium-zoom-image" /></p>

code-behind文件包含一个与XAML文件同名的类。例如：

```csharp title='MainWindow.axaml.cs'
using Avalonia.Controls;

namespace AvaloniaApplication1.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
```

请注意，类名与XAML文件的名称匹配，并且在`Window`元素的`x:Class`属性中也有引用。

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        // highlight-next-line
        x:Class="AvaloniaApplication1.Views.MainWindow">
  ...
</Window>
```

:::tip
如果在代码中对类名或其命名空间进行了任何更改，请确保`x:Class`属性始终匹配，否则会出现错误。
:::

当首次添加code-behind文件时，它只有一个构造函数，该构造函数调用`InitializeComponent()`方法。调用此方法在运行时加载XAML是必需的。

## 定位控件

在使用code-behind时，您通常需要访问在XAML中定义的控件。

为此，您需要通过在XAML中使用`Name`（或`x:Name`）属性为所需的控件指定名称。

下面是一个具有命名按钮的XAML文件示例：

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication5.MainWindow">
  // highlight-next-line
  <Button Name="greetingButton">Hello World</Button>
</Window>
```

现在，您可以通过code-behind中自动生成的`greetingButton`字段访问该按钮：

```csharp title='MainWindow.axaml.cs'
using Avalonia.Controls;

namespace AvaloniaApplication1.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            // highlight-next-line
            greetingButton.Content = "Goodbye Cruel World!";
        }
    }
}
```

## 设置属性

通过在code-behind中提供控件引用，您可以设置属性。例如，您可以像这样更改背景属性：

```csharp
greetingButton.Background = Brushes.Blue;
```

## 处理事件

任何有用的应用程序都需要您执行一些操作！当使用代码后台模式时，您需要在code-behind文件中编写事件处理程序。

事件处理程序编写为code-behind文件中的方法，然后使用事件属性在XAML中引用它们。例如，要为按钮点击事件添加处理程序：

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication4.MainWindow">
  <Button Click="GreetingButtonClickHandler">Hello World</Button>
</Window>
```

```csharp title='MainWindow.axaml.cs'
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public void GreetingButtonClickHandler(object sender, RoutedEventArgs e)
    {
        // code here.
    }
}
```

请注意，许多Avalonia事件处理程序传递了一个名为`RoutedEventArgs`的特殊参数。它包含有关事件的生成和传播方式的信息。

:::info
有关事件路由概念的更多信息，请参见[这里](../../concepts/input/routed-events.md).
:::
