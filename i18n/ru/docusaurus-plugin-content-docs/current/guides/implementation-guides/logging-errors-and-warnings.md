---
id: logging-errors-and-warnings
title: How To Log Errors and Warnings
---

import LogToTraceOutputScreenshot from '/img/guides/implementation-guides/log-to-trace-output.png';

# How To Log Errors and Warnings

This guide shows you how to can log warnings and errors in _Avalonia UI_ using the standard _(Microsoft)_`System.Diagnostics.Trace` component. 

The code to achieve logging is added to your project by the _Avalonia UI_ solution templates if you use them.

To enable, or to check that logging is enabled, follow this procedure:

-  Locate the **Program.cs** file for your application.
-  Check that the `BuildAvaloniaApp` method calls `LogToTrace`, for example:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace();
```

Without parameters, `LogToTrace` will log messages with a severity of `Warning` or higher. You can change this to another level by passing a `LogLevel` parameter to the `LogToTrace` call. For example:

```csharp
using Avalonia.Logging;
...
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace(LogEventLevel.Verbose)
```

:::info
For the full API documentation on the `LogEventLevel` enum, see [here](https://reference.avaloniaui.net/api/Avalonia.Logging/LogEventLevel/).
:::

Log messages are then shown in the **Debug** view of the **Output** window of your IDE. For example, with verbose logging enabled:

<img src={LogToTraceOutputScreenshot} alt=""/>

If you want to re-route these messages to different location, you can use the methods on the `System.Diagnostics.Trace` component.

## Log Area

Each message from _Avalonia UI_ is assigned an area that can be used to filter the log. These are described by the members of `Avalonia.Logging.LogArea` static class:

* `Property`
* `Binding`
* `Animations`
* `Visual`
* `Layout`
* `Control`

You can restrict the log to a specific area, or areas by adding arguments of type `Avalonia.Logging.LogArea` after the `LogEventLevel` argument in the `LogToTrace` call. For example, this will log only property and layout messages:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace(LogEventLevel.Debug, LogArea.Property, LogArea.Layout);
```
