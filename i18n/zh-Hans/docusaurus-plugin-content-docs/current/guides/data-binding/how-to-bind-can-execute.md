---
id: how-to-bind-can-execute
title: 如何绑定 Can Execute
---

import BindCanExecuteScreenshot from '/img/guides/data-binding/bind-canexecute.gif';

# 如何绑定 Can Execute

控件是否处于启用状态，可以响应用户交互并触发操作，是用户体验设计（UX）中“功能可见性”部分的重要原则。通过禁用无法运行的命令，可以增强用户的信心。例如，如果按钮或菜单项由于应用程序的当前状态而无法运行，则应呈现为不活动状态。

本示例假设您正在使用带有 _ReactiveUI_ 框架的 MVVM 实现模式。这种（推荐的）方法在视图和视图模型之间提供了非常清晰的分离。

在此示例中，只有在消息不为空时，才能单击按钮。一旦输出显示出来，消息就会重置为空字符串，从而再次禁用按钮。

```xml title='XAML'
<StackPanel Margin="20">
  <TextBox Margin="0 5" Text="{Binding Message}"
           Watermark="Add a message to enable the button"/>
  <Button Command="{Binding ExampleCommand}">    
    Run the example
  </Button>
  <TextBlock Margin="0 5" Text="{Binding Output}" />
</StackPanel>
```

```csharp title='MainWindowViewModel.cs'
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        private string _message = string.Empty;
        private string _output = "Waiting...";

        public string Message 
        { 
            get => _message; 
            set => this.RaiseAndSetIfChanged(ref _message, value); 
        }

        public string Output
        {
            get => _output;
            set => this.RaiseAndSetIfChanged(ref _output, value);
        }

        public ReactiveCommand<Unit, Unit> ExampleCommand { get; }

        public MainWindowViewModel()
        {
            var isValidObservable = this.WhenAnyValue(
                x => x.Message,
                x => !string.IsNullOrWhiteSpace(x));
            ExampleCommand = ReactiveCommand.Create(PerformAction, 
                                                    isValidObservable);
        }

        private void PerformAction()
        {
             Output = $"The action was called. {_message}";
             Message = String.Empty;
        }
    }
}
```

```csharp title='ViewModelBase.cs'
using ReactiveUI;

namespace AvaloniaGuides.ViewModels
{
    public class ViewModelBase : ReactiveObject
    {
    }
}
```

在视图模型的构造函数中，使用两个参数创建了响应式命令。第一个参数是执行操作的私有方法。第二个参数是由视图模型（来自 `ViewModelBase` 类）的 `ReactiveObject` 的 `WhenAnyValue` 方法创建的可观察对象。

:::info
在使用 "Avalonia MVVM Application" 解决方案模板时，将会向您的项目中添加 `ViewModelBase` 类。
:::

在这里，`WhenAnyValue` 方法接受两个参数，第一个参数收集验证函数参数的值，第二个参数是返回布尔结果的验证函数。

:::info
实际上，`WhenAnyValue` 方法有多个重载，最多可以接受 10 个不同的值获取器（用于验证函数参数），以及验证函数本身。
:::

<img src={BindCanExecuteScreenshot} alt=""/>
