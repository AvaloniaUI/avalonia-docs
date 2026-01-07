---
description: CONCEPTS
---

# Unhandled Exceptions

Avalonia offer `Dispatcher.UIThread.UnhandledException` and `Dispatcher.UIThread.UnhandledExceptionFilter`. These APIs allow you to observe and optionally mark UI-thread exceptions as handled. However, this should be used with care: marking an exception as handled does not guarantee that the application can safely continue running. For this reason, it is still strongly recommended to catch and recover from exceptions locally when your application can reliably do so, and to use the global handlers primarily for logging, reporting, and last-resort mitigation.

Example:

```csharp
Dispatcher.UIThread.UnhandledException += (s, e) =>
{
    Console.WriteLine($"Unhandled: {e.Exception}");
    // e.Handled = true; // Optional, use carefully
};
```

## Logging

We recommend to log exceptions to the console, a file or anywhere else. There are several logging libraries available out there, for example [Serilog](https://serilog.net) and [NLog](https://nlog-project.org).

## The global try-catch

You can catch any exception from the main thread, which is also the UI thread in _Avalonia UI_, in your `Program.cs`-file. To do so we just wrap the entire `void Main` in a `try` and `catch` block. In the `catch` block you can log the error, inform the user, send the log file or restart the application.

```csharp
// File: Program.cs

public static void Main(string[] args)
{
    try
    {
        // prepare and run your App here
        BuildAvaloniaApp()
            .StartWithClassicDesktopLifetime(args);
    }
    catch (Exception e)
    {
        // here we can work with the exception, for example add it to our log file
        Log.Fatal(e, "Something very bad happened");
    }
    finally
    {
        // This block is optional. 
        // Use the finally-block if you need to clean things up or similar
        Log.CloseAndFlush();
    }
}
```

## Exceptions from another thread

If you are using `Task`s to run some work asynchronously, you can setup `TaskScheduler.UnobservedTaskException`. For more information read the [Microsoft .NET-Documentation](https://docs.microsoft.com/dotnet/api/system.threading.tasks.taskscheduler.unobservedtaskexception).

## Exceptions from Reactive UI

If you are using Avalonia together with [ReactiveUI](../concepts/the-mvvm-pattern/avalonia-ui-and-mvvm#reactiveui), you can subscribe to their `RxApp.DefaultExceptionHandler`. For more information please refer to [ReactiveUI Default Exception Handler](https://www.reactiveui.net/docs/handbook/default-exception-handler/).

Note, `RxApp.DefaultExceptionHandler` should be set before any ReactiveCommand was created. Otherwise, custom handler won't be used. You can set it in your application entry point or before any Avalonia view or window was created.
