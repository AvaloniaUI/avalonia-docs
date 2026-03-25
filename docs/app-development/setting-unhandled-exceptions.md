---
id: setting-unhandled-exceptions
title: Handling unhandled exceptions
description: Handle unhandled exceptions in Avalonia apps from the UI thread, background threads, and tasks.
doc-type: how-to
---

Production applications need a strategy for catching exceptions that escape normal error handling. Avalonia provides several mechanisms for intercepting unhandled exceptions on the UI thread and from background tasks.

## UI thread exceptions

### Dispatcher.UnhandledException

The `Dispatcher.UIThread.UnhandledException` event fires when an exception on the UI thread is not caught by application code. You can log the error and optionally mark it as handled:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    Dispatcher.UIThread.UnhandledException += OnUnhandledException;

    base.OnFrameworkInitializationCompleted();
}

private void OnUnhandledException(object sender, DispatcherUnhandledExceptionEventArgs e)
{
    // Log the exception
    Log.Error(e.Exception, "Unhandled UI thread exception");

    // Optionally prevent the application from crashing
    e.Handled = true;
}
```

:::caution
Setting `e.Handled = true` suppresses the exception and allows the application to continue running. Use this with caution. If the exception left the application in an inconsistent state (corrupted data, partially completed operations), continuing may cause further problems. Prefer catching and recovering from exceptions locally where possible.
:::

### Dispatcher.UnhandledExceptionFilter

The `UnhandledExceptionFilter` event fires before `UnhandledException` and allows you to decide whether a particular exception type should be forwarded to the `UnhandledException` handler:

```csharp
Dispatcher.UIThread.UnhandledExceptionFilter += (sender, e) =>
{
    // Prevent certain exceptions from reaching UnhandledException
    if (e.Exception is TaskCanceledException)
    {
        e.RequestCatch = false;
    }
};
```

### Global try-catch in Main

Wrapping the application entry point in a try-catch block catches any exception that terminates the UI thread, including exceptions that are not marked as handled:

```csharp
public static void Main(string[] args)
{
    try
    {
        BuildAvaloniaApp()
            .StartWithClassicDesktopLifetime(args);
    }
    catch (Exception e)
    {
        Log.Fatal(e, "Application terminated unexpectedly");
    }
    finally
    {
        Log.CloseAndFlush();
    }
}
```

This is your last line of defense. By the time an exception reaches this block, the Avalonia application has already shut down. Use it for logging and cleanup, not for recovery.

## Background thread exceptions

### Unobserved task exceptions

Exceptions thrown inside `Task.Run` or other async operations that are never awaited or observed become unobserved task exceptions. By default, these are silently swallowed in .NET. Subscribe to `TaskScheduler.UnobservedTaskException` to detect them:

```csharp
TaskScheduler.UnobservedTaskException += (sender, e) =>
{
    Log.Error(e.Exception, "Unobserved task exception");

    // Prevent the exception from terminating the process
    e.SetObserved();
};
```

:::info
Unobserved task exceptions are raised on the finalizer thread, not when the exception occurs. There may be a delay before the event fires. For reliable error handling, always `await` your tasks or use `ContinueWith` to observe exceptions.
:::

### AppDomain.UnhandledException

For exceptions on non-UI threads that are not task-based, use the .NET `AppDomain.UnhandledException` event:

```csharp
AppDomain.CurrentDomain.UnhandledException += (sender, e) =>
{
    var exception = e.ExceptionObject as Exception;
    Log.Fatal(exception, "Unhandled domain exception (terminating: {IsTerminating})",
        e.IsTerminating);
};
```

This event is informational only. You cannot prevent the application from terminating when `IsTerminating` is `true`.

## Recommended strategy

A reliable exception handling setup combines multiple layers:

```csharp title="Program.cs"
public static void Main(string[] args)
{
    // Background thread exceptions
    AppDomain.CurrentDomain.UnhandledException += (s, e) =>
        Log.Fatal(e.ExceptionObject as Exception, "Unhandled domain exception");

    TaskScheduler.UnobservedTaskException += (s, e) =>
    {
        Log.Error(e.Exception, "Unobserved task exception");
        e.SetObserved();
    };

    try
    {
        BuildAvaloniaApp()
            .StartWithClassicDesktopLifetime(args);
    }
    catch (Exception e)
    {
        Log.Fatal(e, "Application crashed");
    }
    finally
    {
        Log.CloseAndFlush();
    }
}
```

```csharp title="App.axaml.cs"
public override void OnFrameworkInitializationCompleted()
{
    // UI thread exceptions
    Dispatcher.UIThread.UnhandledException += (s, e) =>
    {
        Log.Error(e.Exception, "Unhandled UI exception");
        e.Handled = true; // Only if safe to continue
    };

    base.OnFrameworkInitializationCompleted();
}
```

### Logging

Use a structured logging library such as [Serilog](https://serilog.net) or [NLog](https://nlog-project.org) to record exceptions to files, consoles, or external services. At minimum, log the exception type, message, and stack trace so you can diagnose issues from production reports.

## See also

- [Application Lifetimes](/docs/fundamentals/application-lifetimes): Desktop and mobile lifetime models.
- [TaskScheduler.UnobservedTaskException](https://learn.microsoft.com/dotnet/api/system.threading.tasks.taskscheduler.unobservedtaskexception): .NET documentation.
- [AppDomain.UnhandledException](https://learn.microsoft.com/dotnet/api/system.appdomain.unhandledexception): .NET documentation.
