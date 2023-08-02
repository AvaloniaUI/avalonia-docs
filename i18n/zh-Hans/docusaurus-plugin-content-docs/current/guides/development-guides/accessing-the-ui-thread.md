---
id: accessing-the-ui-thread
title: 如何访问UI线程
---


# 如何访问UI线程

本指南将向您展示如何在您的 _Avalonia UI_ 应用程序中访问UI线程。

_Avalonia UI_ 应用程序有一个主线程，该线程处理UI。当您有一个密集或长时间运行的进程时，通常会选择在不同的线程上运行它。然后，您可能会遇到一些情况，希望在主UI线程中进行更新（例如，进度更新）。

调度程序提供了在任何特定线程上管理工作项的服务。在 _Avalonia UI_ 中，您已经有了处理UI线程的调度程序。当您需要从不同的线程更新UI时，可以通过此调度程序访问它，如下所示：

```csharp
Dispatcher.UIThread
```

您可以使用`Post`方法或`InvokeAsync`方法在UI线程上运行进程。

使用`Post`方法当您只想启动一个作业，但不需要等待作业完成，也不需要结果：这是`fire-and-forget`调度程序方法。

使用`InvokeAsync`方法当您需要等待结果，并可能想要接收结果。

## 调度程序优先级

上述两种方法都有一个调度程序优先级参数。您可以使用`DispatcherPriority`枚举与此参数配合使用，以指定给定作业应该具有的队列优先级。

:::info
有关`DispatcherPriority`枚举的可能值，请参阅[此处](http://reference.avaloniaui.net/api/Avalonia.Threading/DispatcherPriority/)。
:::

## 示例

在此示例中，使用文本块来显示长时间运行任务的结果，并使用按钮来启动该任务。在此版本中，使用了 `fire-and-forget` `Post`方法：

```xml title='XAML'
<StackPanel Margin="20">    
  <Button x:Name="RunButton" Content="Run long running process" 
          Click="ButtonClickHandler" />
  <TextBlock x:Name="ResultText" Margin="10"/>
</StackPanel>
```

```csharp title='Task C#'
using System.Threading.Tasks;
...
private async Task LongRunningTask()
{
    this.FindControl<Button>("RunButton").IsEnabled = false;
    this.FindControl<TextBlock>("ResultText").Text = "I'm working ...";
    await Task.Delay(5000);
    this.FindControl<TextBlock>("ResultText").Text = "Done";
    this.FindControl<Button>("RunButton").IsEnabled = true;
}
```

```csharp title='Post C#'
private void ButtonClickHandler(object sender, RoutedEventArgs e)
{
    // 启动作业并立即返回
    Dispatcher.UIThread.Post(() => LongRunningTask(), 
                                            DispatcherPriority.Background);
}
```

<img src="/img/gitbook-import/assets/long1.gif" alt=""/>

请注意，由于长时间运行的任务在其自己的线程上执行，UI不会失去响应。

要从长时间运行的任务获取结果，XAML代码保持不变，但此版本使用`InvokeAsync`方法：

```xml title='XAML'
<StackPanel Margin="20">    
  <Button x:Name="RunButton" Content="Run long running process" 
          Click="ButtonClickHandler" />
  <TextBlock x:Name="ResultText" Margin="10"/>
```

```csharp title='Task C#'
using System.Threading.Tasks;
...
private async Task<string> LongRunningTask()
{
    this.FindControl<Button>("RunButton").IsEnabled = false;
    this.FindControl<TextBlock>("ResultText").Text = "I'm working ...";
    await Task.Delay(5000);    
    return "Success";
}
```

```csharp title='InvokeAsync C#'
private async void ButtonClickHandler(object sender, RoutedEventArgs e)
{
    var result = await Dispatcher.UIThread.InvokeAsync(LongRunningTask, 
                                    DispatcherPriority.Background);
    //结果将在这里返回
    this.FindControl<TextBlock>("ResultText").Text = result;
    this.FindControl<Button>("RunButton").IsEnabled = true;
}
```

<img src="/img/gitbook-import/assets/long2.gif" alt=""/>

## 更多信息

:::info
有关调度程序的完整API文档，请参阅[此处](http://reference.avaloniaui.net/api/Avalonia.Threading/Dispatcher/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Dispatcher.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Threading/Dispatcher.cs)
:::
