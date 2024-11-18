---
id: adding-interactivity
title: 添加交互性
---

用户界面的一个基本功能是与用户进行交互。在Avalonia中，您可以通过使用事件和命令来为应用程序添加交互性。本指南将通过简单的示例介绍事件和命令。

## 处理事件

Avalonia中的事件提供了一种响应用户交互和控件特定操作的方式。您可以按照以下步骤处理事件：

1. **实现事件处理程序**：在[code-behind](../user-interface/code-behind.md)中编写一个事件处理程序，当事件被触发时将执行该处理程序。事件处理程序应包含您希望对事件响应时执行的逻辑。

```csharp title='MainWindow.axaml.cs'
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    // highlight-start
    private void HandleButtonClick(object sender, RoutedEventArgs e)
    {
        // Event handling logic goes here
    }
    // highlight-end
}
```

2. **订阅事件**：在控件中确定您要处理的事件。Avalonia中的大多数控件都会公开各种事件，比如`Click`或`SelectionChanged`。在XAML中订阅事件，定位控件并添加一个属性，属性名为事件的名称，值为事件处理程序方法的名称。

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.Views.MainWindow">
  // highlight-next-line
  <Button Name="myButton" Content="Click Me" Click="HandleButtonClick" />
</Window>
```

上面的示例在`Button`的`Click`事件上添加了一个名为`HandleButtonClick`的处理程序。

## 使用命令

Avalonia中的命令提供了一种更高级的方式来处理用户交互，将用户操作与实现逻辑解耦。与事件在控件的code-behind中定义不同，命令通常绑定到[数据上下文](../data/data-binding/data-context.md)上的属性或方法。

:::info
命令在所有提供`Command`属性的控件中都可用。通常，在控件的主要交互方法发生时，例如按钮点击时触发命令。
:::

使用命令的最简单方法是将其绑定到对象数据上下文中的方法。

1. **在视图模型中添加方法**：在视图模型中定义一个处理命令的方法。

    ```csharp
    public class MainWindowViewModel
    {
        // highlight-start
        public bool HandleButtonClick()
        {
            // Event handling logic here
        }
        // highlight-end
    }
    ```

2. **绑定方法**：将方法与触发它的控件关联起来。

    ```xml
    <Button Content="Click Me" Command="{Binding HandleButtonClick}" />
    ```
