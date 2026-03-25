---
id: logging-errors-and-warnings
title: Logging errors and warnings
description: Enable and configure Avalonia diagnostic logging using the LogToTrace method and log areas.
doc-type: how-to
---

import LogToTraceOutputScreenshot from '/img/guides/app-development/log-to-trace-output.png';

This guide shows you how to log warnings and errors in Avalonia using the standard `System.Diagnostics.Trace` component.

## Enabling logs

The code to achieve logging is added to your project by the Avalonia solution templates if you use them.

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
For the full API documentation, see the [`LogEventLevel` enum reference](/api/avalonia/logging/logeventlevel).
:::

Log messages are then shown in the **Debug** view of the **Output** window of your IDE. For example, with verbose logging enabled:

<img src={LogToTraceOutputScreenshot} alt="Verbose log output in the IDE Debug Output window"/>

If you want to re-route these messages to different location, you can use the methods on the `System.Diagnostics.Trace` component.

## Log area

Each message from Avalonia is assigned an area that can be used to filter the log. These are described by the members of `Avalonia.Logging.LogArea` static class:

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

## Alternative log targets

### LogToDelegate

Route log messages to a custom callback function:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToDelegate((level, area, source, messageTemplate, propertyValues) =>
        {
            Console.WriteLine($"[{area}] {messageTemplate}");
        });
```

### LogToTextWriter

Write log messages to any `TextWriter`, such as a file or `Console.Out`:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTextWriter(File.CreateText("avalonia.log"));
```

## Log sinks

The `LogToTrace` extension method uses `StringLogSink`. Avalonia supports custom sinks by implementing `ILogSink`. Assigning your custom sink to `Avalonia.Logging.Logger.Sink` will allow Avalonia to use it.

```csharp title='Extension method to assign Logger.Sink'
using Avalonia.Controls;
using Avalonia.Logging;

namespace MyNamespace;
public static class MyLogExtensions
{
    public static AppBuilder LogToMySink(this AppBuilder builder, 
        LogEventLevel level = LogEventLevel.Warning, 
        params string[] areas)
    {
        Logger.Sink = new MyLogSink(level, areas);
        return builder;
    }
}
```

```csharp title='Startup with custom sink'
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToMySink();
```

:::info
View the source code on _GitHub_ [`StringLogSink.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Logging/StringLogSink.cs)
:::

## See also

- [Setting Unhandled Exceptions](/docs/app-development/setting-unhandled-exceptions): Handling unhandled exceptions in your application.
- [LogEventLevel API reference](/api/avalonia/logging/logeventlevel): Available log severity levels.
