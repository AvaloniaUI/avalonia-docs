---
id: options
title: Developer tools options
sidebar_label: Options
---

## DeveloperToolsOptions.Gesture

Defines the gesture to run and connect to the `Developer Tools` process.
By default: `F12`.

## DeveloperToolsOptions.ApplicationName

Optional application display name.
If unset, `Application.Name` or entry assembly name is used.

## DeveloperToolsOptions.ConnectOnStartup

Defines if the app should be connected to dev tools on startup.
By default: `true` on iOS and Android, `false` everywhere else.

## DeveloperToolsOptions.AutoConnectFromDesignMode

Defines if design mode app should be connected to dev tools.
Default is 'false'.

## DeveloperToolsOptions.Runner

By default, `DiagnosticsSupport` package attempts to run global `avdt` .NET tool when requested, if `DevTools` instance is not already running.

But it is possible to redefine this behavior by changing `DeveloperToolsOptions.Runner` value:

```csharp
this.AttachDeveloperTools(o =>
{
    o.Runner = DeveloperToolsOptions.DotNetTool;
});
```

Possible options are:

1. `DeveloperToolsOptions.DotNetTool` - global .NET tool.
2. `DeveloperToolsOptions.AppleBundle` - runs macOS bundle by its ID. To make it work, you need to run `Developer Tools` process directly at least once.
3. `DeveloperToolsOptions.NoOp` - do nothing. This option assumes the `Developer Tools` application was started by the user manually. 
4. `DeveloperToolsRunner.CreateFromExecutable(string)` - run executable by full path. This option is not recommended, unless you prefer a custom installation of the tool.
5. Default: `DeveloperToolsRunner.GetDefaultForPlatform()` - returns `DotNetTool` on desktop or `NoOp` on mobile/browser.

## DeveloperToolsOptions.Protocol

`DiagnosticsSupport` uses one of two transport protocols to communicate between the user app and `Developer Tools` process: HTTP and Named Pipes.

```csharp
this.AttachDeveloperTools(o =>
{
    o.Protocol = DeveloperToolsProtocol.DefaultHttp;
});
```

Possible options are:

1. `DeveloperToolsProtocol.DefaultHttp` - default HTTP connection on `29414` port and 5 seconds connection timeout.
2. `DeveloperToolsProtocol.CreateHttp(Uri, TimeSpan)` - creates HTTP connection with provided parameters. Note: you need to reconfigure `Developer Tools` listener port independently by following [Settings page](/tools/developer-tools/settings).
3. `DeveloperToolsProtocol.CreateHttp(IpAddress, int? port, TimeSpan)` - creates HTTP connection with provided parameters. When port is unset, default `29414` is used. 
4. `DeveloperToolsProtocol.CreateNamedPipe(string)` - creates Named Pipe connection. This option is only compatible with Desktop platforms and might be preferred if there are connectivity issues on the local machine. Named Pipe name will be automatically passed to the `Developer Tools` instance.
5. Default: `DeveloperToolsProtocol.GetDefaultForPlatform()` - currently returns `DefaultHttp` on all platforms.

## DeveloperToolsOptions.DiagnosticLogger

Defines sink to which all `AvaloniaUI.DiagnosticsSupport` logs are written to.
By default, this option is set to `AvaloniaDiagnosticLogger`, redirecting logs to `Avalonia.Logger.TryGet`.

Possible options are:

1. `DiagnosticLogger.CreateConsole(LogEntryVerbosity)`.
2. `DiagnosticLogger.CreateDebug(LogEntryVerbosity)`.
3. Any user implementation of `DiagnosticLogger` abstract interface.

:::note
To learn more about `Developer Tools` logging, please read [Reporting Issues](/docs/development-optimization/developer-tools/installation#reportingissues).
:::

## DeveloperToolsOptions.LoggerCollector

Defines a collector which listens for logs to be displayed in `Developer Tools`.

By default, `Developer Tools` will listen only to Avalonia logs and display them in the [Logger tools](/tools/developer-tools/logs-tool).

This behavior can be redefined with options:

1. `DeveloperToolsOptions.AddAvaloniaLoggerObservable()` - enabled by default.
2. `DeveloperToolsOptions.AddMicrosoftLoggerObservable(ILoggerFactory, LogLevel)` - allows to connect devtools as a logger provider to Microsoft `ILoggerFactory`.
3. `DeveloperToolsOptions.AddLoggerObservable(ILoggerObservable)` - custom `ILoggerObservable` interface implementation. Use this option, if you want DevTools to display your third party logs provider like Serilog.
4. `DeveloperToolsOptions.ClearLoggerObservables()` - clear all observables.
