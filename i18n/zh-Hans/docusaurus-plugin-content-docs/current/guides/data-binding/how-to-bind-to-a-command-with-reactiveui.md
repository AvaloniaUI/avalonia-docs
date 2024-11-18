---
id: how-to-bind-to-a-command-with-reactiveui
title: 如何使用ReactiveUI绑定命令
---

import BindReactiveCommandScreenshot from '/img/guides/data-binding/bind-reactivecommand.gif';

# 如何使用ReactiveUI绑定命令

本指南将向您展示如何将视图模型方法（执行操作）绑定到可以响应用户交互而启动操作的控件（例如按钮）。此绑定在XAML中使用`Command`属性进行定义，例如：

```csharp
<Window xmlns="https://github.com/avaloniaui">
    ...
  <StackPanel Margin="20">
      <Button Command="{Binding ExampleCommand}">Run the example</Button>
  </StackPanel>
```

本指南假设您正在使用MVVM实现模式，并且您的视图模型基于 _ReactiveUI_ 框架。

:::info
要了解MVVM实现模式背后的概念，请参阅[此处](../../concepts/the-mvvm-pattern/)。
:::

如果您使用**Avalonia MVVM Application**解决方案模板创建了应用程序，那么您的解决方案已经包含 _ReactiveUI_ 框架包，您可以像这样引用它：

```csharp
using ReactiveUI;
```

可以通过实现 `ICommand` 接口来执行操作的视图模型通过该接口来实现。_ReactiveUI_ 框架提供了实现 `ICommand` 的 `ReactiveCommand` 类。

:::info
有关 `ICommand` 接口定义的详细信息，请参阅[此处](https://docs.microsoft.com/en-gb/dotnet/api/system.windows.input.icommand?view=netstandard-2.0)。
:::

`Command` 属性数据绑定将通过其 `ICommand.Execute` 接口调用绑定的视图模型方法，在绑定的控件被激活时。在这个例子中：当按钮被点击时。

要创建带有 `ReactiveCommand` 的视图模型，请按照以下示例：

- 在您的视图模型中，声明一个命令，例如：

```csharp
public ReactiveCommand<Unit, Unit> ExampleCommand { get; } 
```

- 在视图模型中创建一个私有方法来执行操作。
- 初始化Reactive命令，传递执行操作的方法的名称。

您的视图模型代码现在将如下所示：

```csharp
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel 
    {
        public ReactiveCommand<Unit, Unit> ExampleCommand { get; }

        public MainWindowViewModel()
        {
            ExampleCommand = ReactiveCommand.Create(PerformAction);
        }
        private void PerformAction()
        {
            Debug.WriteLine("The action was called.");
        }
    }
}
```

- 运行应用程序并监视调试输出。

当与Reactive命令绑定的控件被激活时（在本例中：当按钮被点击时），将通过Reactive命令调用执行操作的私有方法。

<img src={BindReactiveCommandScreenshot} alt=""/>

## 命令参数

通常需要向绑定到控件的Reactive命令传递参数。您可以在XAML中使用 `CommandParameter` 属性来实现这一点。例如：

```xml
<Window xmlns="https://github.com/avaloniaui">
   ...
   <StackPanel Margin="20">
      <Button Command="{Binding ExampleCommand}"
              CommandParameter="From the button">Run the example</Button>
   </StackPanel>
</Window>
```

现在，您必须修改视图模型，以便Reactive命令期望一个字符串参数，初始化期望一个字符串参数，执行操作的私有方法期望一个字符串参数。如下所示：

```csharp
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel 
    {
        public ReactiveCommand<string, Unit> ExampleCommand { get; }

        public MainWindowViewModel()
        {
            ExampleCommand = ReactiveCommand.Create<string>(PerformAction);
        }
        private void PerformAction(string msg)
        {
            Debug.WriteLine($"The action was called. {msg}");
        }
    }
}
```

请注意，`CommandParameter` 属性上不会执行任何类型转换，因此，如果您需要使用不是字符串的类型参数，则必须在XAML中定义该类型。您还需要使用扩展的XAML语法来定义参数。

例如，要传递整数参数：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:sys="clr-namespace:System;assembly=mscorlib">
 ...   
    <Button Command="{Binding ExampleIntegerCommand}">
        <Button.CommandParameter>
            <sys:Int32>42</sys:Int32>
        </Button.CommandParameter>
        What is the answer?
    </Button>
</Window>
```

:::danger
如果参数定义缺失或类型不正确，将会出现错误。
:::

:::info
与任何其他属性一样，命令参数也可以绑定。
:::
