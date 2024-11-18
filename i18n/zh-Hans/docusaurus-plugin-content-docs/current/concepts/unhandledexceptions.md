---
description: CONCEPTS
---
# 未处理的异常

_Avalonia UI_ 不提供任何机制来全局处理异常并标记为已处理。原因是无法确定异常是否已被正确处理，因此应用程序可能处于无效状态。相反，强烈建议在应用程序内部处理异常。尽管如此，记录任何未处理的异常以供进一步支持和调试仍然是一个好主意。

## 日志记录

我们建议将异常记录到控制台、文件或其他地方。有许多可用的日志记录库，例如 [Serilog](https://serilog.net) 和 [NLog](https://nlog-project.org)。

## 全局 try-catch

您可以在 `Program.cs` 文件中捕获主线程（也是 _Avalonia UI_ 的 UI 线程）中的任何异常。为此，我们只需将整个 `void Main` 包装在 `try` 和 `catch` 块中。在 `catch` 块中，您可以记录错误、通知用户、发送日志文件或重新启动应用程序。

```csharp
// File: Program.cs

public static void Main(string[] args)
{
    try
    {
        // 在此处准备和运行您的 App
        BuildAvaloniaApp()
            .StartWithClassicDesktopLifetime(args);
    }
    catch (Exception e)
    {
        // 在这里我们可以处理异常，例如将其添加到日志文件中
        Log.Fatal(e, "发生了一些非常糟糕的事情");
    }
    finally
    {
        // 此块是可选的。
        // 如果需要清理或类似操作，请使用 finally 块
        Log.CloseAndFlush();
    }
}
```

## 来自其他线程的异常

如果您使用 `Task` 异步运行某些工作，可以设置 `TaskScheduler.UnobservedTaskException`。有关更多信息，请阅读 [Microsoft .NET 文档](https://docs.microsoft.com/dotnet/api/system.threading.tasks.taskscheduler.unobservedtaskexception)。

## 来自 Reactive UI 的异常

如果您将 Avalonia 与 [ReactiveUI](../concepts/the-mvvm-pattern/avalonia-ui-and-mvvm#reactiveui) 一起使用，可以订阅它们的 `RxApp.DefaultExceptionHandler`。有关更多信息，请参阅 [ReactiveUI 默认异常处理程序](https://www.reactiveui.net/docs/handbook/default-exception-handler/)。

注意，`RxApp.DefaultExceptionHandler` 应在创建任何 ReactiveCommand 之前设置。否则，自定义处理程序将不会被使用。您可以在应用程序入口点或在创建任何 Avalonia 视图或窗口之前设置它。"