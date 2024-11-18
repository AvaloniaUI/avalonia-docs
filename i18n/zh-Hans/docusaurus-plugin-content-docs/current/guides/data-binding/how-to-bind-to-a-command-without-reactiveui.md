---
id: how-to-bind-to-a-command-without-reactiveui
title: 如何不使用ReactiveUI绑定命令
---

import BindCommandMethodScreenshot from '/img/guides/data-binding/bind-method.gif';
import BindCanExecuteMethodScreenshot from '/img/guides/data-binding/bind-method-canexecute.gif';

# 如何不使用ReactiveUI绑定命令

有时候你只是想在点击按钮时调用一个方法，而不想使用 _ReactiveUI_ 框架创建响应式命令的整套流程。

:::info
要了解如何使用 _ReactiveUI_ 绑定到命令，请参阅[这里](how-to-bind-to-a-command-with-reactiveui.md)。
:::

_Avalonia UI_ 数据绑定允许你直接实现既可以执行操作的视图模型方法，又可以控制方法是否可以执行的属性。

例如，使用以下XAML：

```xml
<Window xmlns="https://github.com/avaloniaui">
   ...
   <StackPanel Margin="20">
      <Button Command="{Binding PerformAction}"
              CommandParameter="From the button, without ReactiveUI">
              Run the example</Button>
   </StackPanel>
</Window>
```

你可以编写一个能够运行操作的视图模型，像这样：

```csharp
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel 
    {
        public void PerformAction(object msg)
        {
            Debug.WriteLine($"The action was called. {msg}");
        }
    }
}
```

<img src={BindCommandMethodScreenshot} alt=""/>

## 能否执行？

_Avalonia UI_ 数据绑定提供了一种使用命名约定来实现“能否执行？”的功能的简单方法。

如果你需要根据命令参数的值或视图模型属性的值来决定是否执行，那么你可以编写一个第二个布尔方法来检查操作方法是否可以执行。

为了使其工作，_Avalonia UI_ 使用了布尔方法与操作方法相同的根名称，但加上了前缀 `Can` 的命名约定。

例如：

```csharp
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel 
    {
        public void PerformAction(object msg)
        {
            Debug.WriteLine($"The action was called. {msg}");
        }

        public bool CanPerformAction(object msg)
        {
            if (msg!=null) return !string.IsNullOrWhiteSpace( msg.ToString() );
            return false;
        }
    }
}
```

因此，扩展示例XAML以从文本框提供参数（字符串）：

```xml
<StackPanel Margin="20">
  <TextBox Margin="0 5" x:Name="message" 
           Watermark="Add a message to enable the button"/>
  <Button Command="{Binding PerformAction}"
          CommandParameter="{Binding #message.Text}">
    Run the example
  </Button>
</StackPanel>
```

:::info
这个示例使用了直接绑定到另一个控件的技术。你可以在这里看到如何做到这一点，[这里](binding-to-controls.md)。
:::

你会发现只有当文本框包含字符串时，按钮才会变为可用状态。

<img src={BindCanExecuteMethodScreenshot} alt=""/>

## **触发“能否执行”**

如果你想要从视图模型中的另一个属性触发“能否执行”方法，那么你将不得不为该属性添加一个或多个 `DependsOn` 属性，并编写代码来手动调用属性更改事件。

:::info
这种技术适用于没有使用 _ReactiveUI_ 框架的视图模型。
:::
