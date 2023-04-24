# Logging Errors and Warnings

Avalonia can log warnings and errors using [`System.Diagnostics.Trace`](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics.trace). To enable logging the `LogToTrace` method call should be present in your Program.cs file:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace();
```

By default, this logging setup will write log messages with a severity of `Warning` or higher to `System.Diagnostics.Trace`. The severity can be controlled by passing a `level` parameter to `LogToTrace()`.

By default these trace messages would be logger to your IDE output window. If you want to re-route these messages to different location, use API provided by [`System.Diagnostics.Trace`](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics.trace).

### Areas <a id="areas"></a>

Each Avalonia log message has an "Area" that can be used to filter the log to include only the type of events that you are interested in. These are described by the members of `Avalonia.Logging.LogArea` static class and are currently:

* `Property`
* `Binding`
* `Animations`
* `Visual`
* `Layout`
* `Control`

The `LogToTrace` method allows specifying which areas are logged:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace(LogEventLevel.Debug, LogArea.Property, LogArea.Layout);
```

