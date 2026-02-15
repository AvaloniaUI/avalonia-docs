---
id: logs-tool
title: Logs tool
---

## Viewing Avalonia Logs in the tool

By default `Avalonia` Warnings and Errors are automatically recorded by `Developer Tools`.

Main features include:

1. Combined message in the data table.
2. Filtering by verbosity, message and parameters.
3. Display of each arguments independently.
4. If log entry `Source` is an visual element attached to the elements tree, it can be clicked to navigate to this element inside of `Developer Tools`
5. Integration with third party loggers.

![Logs Tool with Avalonia warnings](/img/tools/dev-tools/logs-avalonia-list.png)

## Enabling Microsoft.Extensions.Logging integration

By default, only `Avalonia` logs are redirected to the `Developer Tools` process.
`Diagnostics Support` library includes built-in integration with Microsoft logging abstractions which can be easily enabled.

To do so, `LoggerFactory` needs to be created as normally. Returned object can be passed to `DevToolsLoggerCollector.WithMicrosoftLogger(ILoggerFactory)` method.

```csharp
public override void Initialize()
{
    AvaloniaXamlLoader.Load(this);

    var loggerFactory = LoggerFactory.Create(b => b
        .SetMinimumLevel(LogLevel.Information)
        .AddConsole());

    this.AttachDeveloperTools(o =>
    {
        o.AddMicrosoftLoggerObservable(loggerFactory);
    });

    Logger = loggerFactory.CreateLogger<Application>();
}
```

For MS Dependency Injection solutions, `ILoggerFactory` interfaces can be stored and retrieved from the `ServiceCollection`.

You can find more details about `DeveloperToolsOptions` on [Reference to DeveloperToolsOptions](/tools/developer-tools/options) page.

## Attaching custom log source

![Logs Tool with custom Serilog events](/img/tools/dev-tools/logs-custom-serilog.png)

Let's create a `Serilog` sink as an example, that is configured to redirect logs into `Developer Tools`.

According to `Serilog` [Developing a sink](https://github.com/serilog/serilog/wiki/Developing-a-sink) documentation it's necessary to implement a simple `ILogEventSink` interface. Together with `ILoggerObservable`, which is necessary to connect it with `Developer Tools`:

```csharp
public class DevToolsSerilogSink(string logArea = "Serilog") : ILogEventSink, ILoggerObservable
{
}
```

Start with implementing `ILoggerObservable.Subscribe` by recording a list of observers. `ILoggerObserver` has only two methods: `IsEnabled` and `Log`, both of which are going to be used in this sample. Return value is a disposable that will get called once DevTools is disconnecting.

```csharp
private readonly LinkedList<ILoggerObserver> _observers = [];

public IDisposable Subscribe(ILoggerObserver observer)
{
    _observers.AddLast(observer);
    return Disposable.Create(() => _observers.Remove(observer));
}
```

And `ILogEventSink.Emit` implementation has to convert Serilog log event into parameters compatible with `ILoggerObserver`:

```csharp
public void Emit(LogEvent logEvent)
{
    var logLevel = logEvent.Level switch
    {
        LogEventLevel.Verbose => LogEntryVerbosity.Verbose,
        LogEventLevel.Debug => LogEntryVerbosity.Debug,
        LogEventLevel.Information => LogEntryVerbosity.Information,
        LogEventLevel.Warning => LogEntryVerbosity.Warning,
        LogEventLevel.Error => LogEntryVerbosity.Error,
        LogEventLevel.Fatal => LogEntryVerbosity.Fatal,
        _ => throw new ArgumentOutOfRangeException()
    };

    // Map each parameter into a strings array:
    var parameters = new string[logEvent.Properties.Count];
    var paramIndex = 0;
    foreach (var value in logEvent.Properties.Values)
    {
        parameters[paramIndex++] = value.ToString(null, formatProvider);
    }

    foreach (var observer in _observers)
    {
        // `Developer Tools` might disable specific logging areas, so we need to check them first.
        if (observer.IsEnabled(logLevel, logArea))
        {
            // Queue log entry with our parameters.
            observer.Log(logLevel, logArea, null, logEvent.MessageTemplate.Text, logEvent.Exception, parameters);
        }
    }
}
```

With both interfaces it's now possible to configure both `Serilog` and `Developer Tools` together in `Application.Initialize` method:

```csharp
public override void Initialize()
{
    AvaloniaXamlLoader.Load(this);

    var sink = new SerilogSink();

    Logger = new LoggerConfiguration()
        .MinimumLevel.Information()
        .WriteTo.Sink(sink)
        .CreateLogger();

    this.AttachDeveloperTools(o =>
    {
        o.AddLoggerObservable(sink);
    });
}
```

And then use it somewhere in the code:

```csharp
private int _clickTimes = 0;
private void Button_OnClick(object? sender, RoutedEventArgs e)
{
    _clickTimes++;
    App.Logger!.Information("Button was clicked {Times} times", _clickTimes);
}
```

<details>
  <summary>Full listing of DevToolsSerilogSink class</summary>
  
```csharp
public class DevToolsSerilogSink(string logArea = "Serilog", IFormatProvider? formatProvider = null)
    : ILogEventSink, ILoggerObservable
{
    private readonly LinkedList<ILoggerObserver> _observers = [];

    public IDisposable Subscribe(ILoggerObserver observer)
    {
        _observers.AddLast(observer);
        return Disposable.Create(() => _observers.Remove(observer));
    }

    public void Emit(LogEvent logEvent)
    {
        var logLevel = logEvent.Level switch
        {
            LogEventLevel.Verbose => LogEntryVerbosity.Verbose,
            LogEventLevel.Debug => LogEntryVerbosity.Debug,
            LogEventLevel.Information => LogEntryVerbosity.Information,
            LogEventLevel.Warning => LogEntryVerbosity.Warning,
            LogEventLevel.Error => LogEntryVerbosity.Error,
            LogEventLevel.Fatal => LogEntryVerbosity.Fatal,
            _ => throw new ArgumentOutOfRangeException()
        };

        var parameters = new string[logEvent.Properties.Count];
        var paramIndex = 0;
        foreach (var value in logEvent.Properties.Values)
        {
            parameters[paramIndex++] = value.ToString(null, formatProvider);
        }

        foreach (var observer in _observers)
        {
            if (observer.IsEnabled(logLevel, logArea))
            {
                observer.Log(logLevel, logArea, null, logEvent.MessageTemplate.Text, logEvent.Exception, parameters);
            }
        }
    }
}
```

</details>
