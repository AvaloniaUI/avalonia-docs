---
description: CONCEPTS - ReactiveUI
---

import ReactiveCommandViewScreenshot from '/img/concepts/reactiveui/reactivecommand-view.png';
import ReactiveCommandOutputScreenshot from '/img/concepts/reactiveui/reactivecommand-output.png';
import ReactiveCommandCanExecuteScreenshot from '/img/concepts/reactiveui/reactivecommand-canexecute.png';

# 响应式命令

在本页面中，您将学习如何使用_ReactiveUI_的`ReactiveCommand`和在代码中创建的`ObservableObject`来实现UI的功能逐步展示原则。

## 功能逐步展示原则

这是一个非常重要的原则，它确保用户能够正确地通过您的UI进行操作，因为只有在它们有效时，功能和功能才会变得可用（甚至可见）。

举个简单的例子：在点击按钮之前，输入框需要至少8个字符，因此在有效输入之前，将按钮保持禁用是正确的UI做法。

## 响应式命令

首先，您可以创建一个简单的视图，如下所示：

```xml
<StackPanel Margin="20">
    <TextBlock Margin="0 5" >User Name</TextBlock>
    <TextBox Text="{Binding UserName}"/>
    <Button Margin="0 20" Command="{Binding SubmitCommand}">Submit</Button>
</StackPanel>
```

<img src={ReactiveCommandViewScreenshot} alt="图片"/>

您可以添加一个相应的视图模型，如下所示：

```csharp
public class MainWindowViewModel : ViewModelBase
{
    private string _userName = string.Empty;

    public string UserName
    {
        get { return _userName; }
        set { this.RaiseAndSetIfChanged(ref _userName, value); }
    }

    public ReactiveCommand<Unit, Unit> SubmitCommand { get; }

    public MainWindowViewModel()
    {
        SubmitCommand = ReactiveCommand.Create(() => 
        {
            Debug.WriteLine("The submit command was run.");
        }); 
    }
}
```

这个视图模型还没有执行功能逐步展示。`SubmitCommand`被声明为没有参数和结果（void）。`Create`方法的同步操作参数是您在命令运行时（用户点击按钮时）执行的操作。上面的示例只是在调试窗口中报告该操作。

<img src={ReactiveCommandOutputScreenshot} alt="图片"/>

## 可执行吗？

当您使用_ReactiveUI_来实现功能逐步展示时，您需要创建一个可观察对象来指示您的命令是否可以执行。

例如，您可以将以下代码添加到上述视图模型中，以创建一个可观察对象来验证视图模型：

```
IObservable<bool> isInputValid = this.WhenAnyValue(
                x => x.UserName,
                x => !string.IsNullOrWhiteSpace(x) && x.Length > 7
                );
```

可观察对象监视`UserName`属性的值，并在其更改时运行验证函数。可观察对象是由底层视图模型（请参阅上一页[这里](reactive-view-model.md)）的`ReactiveObject`的`WhenAnyValue`函数创建的。

接下来，将可观察对象添加到`Create`方法中。这个第二个参数是该方法的`canExecute`参数。

```csharp
SubmitCommand = ReactiveCommand.Create(() => 
{
   Debug.WriteLine("The submit command was run.");
}, isInputValid); 
```

现在你会看到，只有在输入了8个字符后，按钮才会变为可用状态。

<img src={ReactiveCommandCanExecuteScreenshot} alt=""/>