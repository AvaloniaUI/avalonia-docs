---
id: options
title: Developer tools options
description: Reference for DeveloperToolsOptions settings, including the open gesture, startup connection, runner, transport protocol, and logging.
sidebar_label: Options
doc-type: reference
---

## DeveloperToolsOptions.Gesture

Defines the gesture to run and connect to the `Developer Tools` process.
By default: <kbd>F12</kbd>.

## DeveloperToolsOptions.ApplicationName

Optional application display name.
If unset, `Application.Name` or entry assembly name is used.

## DeveloperToolsOptions.ConnectOnStartup

Defines if the app should be connected to dev tools on startup.
By default: `true` on iOS and Android, `false` everywhere else.

## DeveloperToolsOptions.AutoConnectFromDesignMode

Defines if design mode app should be connected to dev tools. Default is `false`.

## DeveloperToolsOptions.Runner

By default, `DiagnosticsSupport` package attempts to run global `avdt` .NET tool when requested, if the Developer Tools instance is not already running.

But it is possible to redefine this behavior by changing `DeveloperToolsOptions.Runner` value:

```csharp
this.AttachDeveloperTools(o =>
{
    o.Runner = DeveloperToolsRunner.DotNetTool;
});
```

Possible options are:

- `DeveloperToolsRunner.DotNetTool` - global .NET tool.
- `DeveloperToolsRunner.AppleBundle` - runs macOS bundle by its ID. To make it work, you need to run `Developer Tools` process directly at least once.
- `DeveloperToolsRunner.NoOp` - do nothing. This option assumes the `Developer Tools` application was started by the user manually. 
- `DeveloperToolsRunner.CreateFromExecutable(string)` - run executable by full path. This option is not recommended, unless you prefer a custom installation of the tool.
- Default: `DeveloperToolsRunner.GetDefaultForPlatform()` - returns `DotNetTool` on desktop or `NoOp` on mobile/browser.

## DeveloperToolsOptions.Protocol

`DiagnosticsSupport` uses one of two transport protocols to communicate between the user app and `Developer Tools` process: HTTP and Named Pipes.

```csharp
this.AttachDeveloperTools(o =>
{
    o.Protocol = DeveloperToolsProtocol.DefaultHttp;
});
```

Possible options are:

- `DeveloperToolsProtocol.DefaultHttp` - default HTTP connection on `29414` port and 5 seconds connection timeout.
- `DeveloperToolsProtocol.CreateHttp(Uri, TimeSpan)` - creates HTTP connection with provided parameters. Note: you need to reconfigure `Developer Tools` listener port independently by following [Settings page](/tools/developer-tools/settings).
- `DeveloperToolsProtocol.CreateHttp(IPAddress, int? port, TimeSpan?)` - creates HTTP connection with provided parameters. When port is unset, default `29414` is used. 
- `DeveloperToolsProtocol.CreateNamedPipe(string)` - creates Named Pipe connection. This option is only compatible with Desktop platforms and might be preferred if there are connectivity issues on the local machine. Named Pipe name will be automatically passed to the `Developer Tools` instance.
- Default: `DeveloperToolsProtocol.GetDefaultForPlatform()` - currently returns `DefaultHttp` on all platforms.

## DeveloperToolsOptions.DiagnosticLogger

Defines sink to which all `AvaloniaUI.DiagnosticsSupport` logs are written. By default, this option is set to `AvaloniaDiagnosticLogger`, redirecting logs to `Avalonia.Logging.Logger.TryGet`.

Possible options are:

- `DiagnosticLogger.CreateConsole(LogEntryVerbosity)`.
- `DiagnosticLogger.CreateDebug(LogEntryVerbosity)`.
- Any user implementation of `DiagnosticLogger`.

:::note
To learn more about `Developer Tools` logging, see [Reporting issues](/troubleshooting/tools/developer-tools).
:::

## DeveloperToolsOptions.LoggerCollector

Defines a collector which listens for logs to be displayed in `Developer Tools`.

By default, `Developer Tools` will listen only to Avalonia logs and display them in the [Logs tool](/tools/developer-tools/logs-tool).

This behavior can be redefined with options:

- `DeveloperToolsOptions.AddAvaloniaLoggerObservable()` - enabled by default.
- `DeveloperToolsOptions.AddMicrosoftLoggerObservable(ILoggerFactory, LogLevel)` - allows to connect the Developer Tools as a logger provider to Microsoft `ILoggerFactory`.
- `DeveloperToolsOptions.AddLoggerObservable(ILoggerObservable)` - custom `ILoggerObservable` interface implementation. Use this option, if you want the Developer Tools to display your third party logs provider like Serilog.
- `DeveloperToolsOptions.ClearLoggerObservables()` - clear all observables.

## See also

- [Developer tools settings](/tools/developer-tools/settings)
- [Developer tools installation](/tools/developer-tools/installation)
