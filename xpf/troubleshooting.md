---
id: troubleshooting
title: Troubleshooting
---

## Trouble Restoring NuGet Packages

If you are unable to restore XPF and/or Avalonia packages (e.g. `Xpf.Sdk` or an Avalonia `cibuild` package is reported as missing) then follow the steps below:

### Check Your Firewall Settings

Try opening the following URLs in your browser:

:::tip
Use the username `license` and your license key as the password when asked.
:::

- https://xpf-nuget-feed.avaloniaui.net/
- https://xpf-nuget-feed.avaloniaui.net/v3/index.json
- https://nuget-feed-all.avaloniaui.net/v3/index.json

The first URL should display a page similar to the package listing on [nuget.org](https://www.nuget.org/packages); the second two URLs should display some JSON.

If you are unable to view any of these URls, check your firewall settings.

If you are unable to login with your license key, it may have expired. Ask support for a new one.

### Check You Have Set Up NuGet.config

- Ensure that you have added a [NuGet.config](./getting-started#step-2-add-a-nugetconfig) file, **and that it is in the same directory** as the `.sln` file you are loading
- Ensure that you have added a valid license key to your `NuGet.config` file

### Clear Your NuGet HTTP Cache

Run the following commands from the command-line:

```bash
dotnet nuget locals http-cache --clear
dotnet restore
```

## Listening for XPF logs

XPF logs are controlled via environment variables.
* `ATLANTIS_LOG_OUTPUTS`: `console`, `trace`, `file=filePath`. Multiple values are supported separated by `;`.
* `ATLANTIS_LOG_LEVEL`: `Verbose`, `Information`, `Debug`, `Warning`, `Error`, `Fatal`.

## Listening for Avalonia logs

In some situations it might be useful to gather Avalonia logs, as XPF works on top of it. And it can be really helpful investigating issues.

Typically, there are two possible ways to listen for Avalonia logs

### .LogToTrace in a custom Avalonia initialization

1. Follow [instructions](./customizing-init) on how to setup custom Avalonia intiialization.
2. Then you will be able to call `.LogToTrace()` with optional severity parameter in the AppBuilder chain, like this:
```diff
        AppBuilder.Configure<AvaloniaUI.Xpf.Helpers.DefaultXpfAvaloniaApplication>()
            .UsePlatformDetect()
+           .LogToTrace(LogEventLevel.Warning)
            .WithAvaloniaXpf()
```

This will redirect all Avalonia logs to the .NET Trace listener. Which can be redirected as well - [Trace Listeners](https://learn.microsoft.com/en-us/dotnet/framework/debug-trace-profile/trace-listeners).

### Override Logger.Sink

Static property `Logger.Sink` has a public setter and can be overriden by custom implementation.
```csharp
public void Initialize()
{
    // You can override Logger.Sink value at any point of application lifetime,
    // But preferably to do it as early as possible, or even in the custom Avalonia initialization.
    Logger.Sink = new MyLogger();
}

public class MyLogger : ILogSink
{
    // Implement all members
}
```

## System.Resources.Extensions

If you encounter the following exception:

```
System.IO.FileNotFoundException: Could not load file or assembly 'System.Resources.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51'. The system cannot find the file specified.
```

Then install the `System.Resources.Extensions` package via nuget:

```xml
<PackageReference Include="System.Resources.Extensions" Version="7.0.0" />
```

The 7.0.0 version should also be compatible with .NET 6.

## NullReferenceException or MissingMethodException

If you experience a `NullReferenceException` or `MissingMethodException` after upgrading XPF, try cleaning your project or deleting your `bin`/`obj` directories.
