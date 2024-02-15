---
id: logging-errors-and-warnings
title: 如何记录错误和警告
---

import LogToTraceOutputScreenshot from '/img/guides/implementation-guides/log-to-trace-output.png';

# 如何记录错误和警告

本指南向你展示如何在 _Avalonia UI_ 中使用标准 _(Microsoft)_ `System.Diagnostics.Trace`组件记录警告和错误。

如果你使用的是 _Avalonia UI_ 的解决方案模板，那么记录的代码将会被添加到你的项目中。

要启用或检查是否已启用日志记录，请按照以下步骤操作：

-  找到你应用程序的 **Program.cs** 文件。
-  检查 `BuildAvaloniaApp` 方法是否调用了 `LogToTrace`，例如：

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace();
```

如果没有参数，`LogToTrace` 将记录严重性为 `Warning` 或更高级别的消息。你可以通过向 `LogLevel` 调用传递一个 `LogToTrace` 参数来改变这个级别。例如：

```csharp
using Avalonia.Logging;
...
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace(LogEventLevel.Verbose)
```

:::info
有关 `LogEventLevel` 枚举的完整API文档，请参阅 [这里](https://reference.avaloniaui.net/api/Avalonia.Logging/LogEventLevel/).
:::

然后，日志消息会在你的IDE的 **Debug** 窗口的 **Output** 视图中显示。例如，启用详细日志记录时：

<img src={LogToTraceOutputScreenshot} alt=""/>

如果你想将这些消息重新路由到不同的位置，你可以使用 `System.Diagnostics.Trace` 组件上的方法。

## 日志区域

_Avalonia UI_ 中的每一条消息都会被分配一个可以用于过滤日志的区域。这些由 `Avalonia.Logging.LogArea` 静态类的成员描述：

* `Property`
* `Binding`
* `Animations`
* `Visual`
* `Layout`
* `Control`

你可以通过在 `LogToTrace` 调用中在 `LogEventLevel` 参数后添加类型为 `Avalonia.Logging.LogArea` 的参数来将日志限制在特定区域或区域。例如，以下代码将仅记录 property 和 layout 消息：

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace(LogEventLevel.Debug, LogArea.Property, LogArea.Layout);
```
