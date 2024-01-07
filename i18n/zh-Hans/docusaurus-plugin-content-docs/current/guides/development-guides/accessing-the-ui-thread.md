---
id: accessing-the-ui-thread
title: 如何访问UI线程
---

import DispatchPostLongRunningScreenshot from '/img/gitbook-import/assets/long1.gif';
import DispatchInvokeAsyncLongRunningScreenshot from '/img/gitbook-import/assets/long2.gif';

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

此示例演示了如何从工作线程访问 UI 线程以更新或获取 TextBlock 的文本。
创建一个新的 Avalonia 项目，并替换以下两个文件的内容：

MainView.axaml:
```xml title='XAML'
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             xmlns:vm="clr-namespace:AvaloniaApplication1.ViewModels"
             mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
             x:Class="AvaloniaApplication1.Views.MainView"
             x:DataType="vm:MainViewModel">
  <Design.DataContext>
    <!-- 这仅为IDE中的预览器设置DataContext，要设置运行时的实际DataContext，
         请在代码中设置DataContext属性（参考App.axaml.cs） -->
    <vm:MainViewModel />
  </Design.DataContext>

	<StackPanel Margin="20">
		<TextBlock Name="TextBlock1" />
	</StackPanel>
</UserControl>
```


MainView.axaml.cs:
```csharp title='MainView C#'
using Avalonia.Controls;
using Avalonia.Threading;
using System;
using System.Threading.Tasks;

namespace AvaloniaApplication1.Views;

public partial class MainView : UserControl
{
    public MainView()
    {
        InitializeComponent();

        // 在线程池上执行 OnTextFromAnotherThread，
        // 演示如何从那里访问 UI 线程。
        _ = Task.Run(() => OnTextFromAnotherThread("test"));
    }

    private void SetText(string text) => TextBlock1.Text = text;
    private string GetText() => TextBlock1.Text ?? "";

    private async void OnTextFromAnotherThread(string text)
    {
        try
        {
            // 在 UI 线程上开始作业并立即返回。
            Dispatcher.UIThread.Post(() => SetText(text));

            // 在 UI 线程上开始作业并等待结果。
            var result = await Dispatcher.UIThread.InvokeAsync(GetText);

            // 此调用会导致异常，因为我们在工作线程上运行：
            // System.InvalidOperationException: 'Call from invalid thread'
            //SetText(text);
        }
        catch (Exception)
        {
            throw; // Todo: 处理异常。
        }
    }
}

```

## 更多信息

:::info
有关调度程序的完整API文档，请参阅[此处](http://reference.avaloniaui.net/api/Avalonia.Threading/Dispatcher/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`Dispatcher.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Threading/Dispatcher.cs)
:::
