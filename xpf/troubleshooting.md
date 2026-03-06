---
id: troubleshooting
title: Troubleshooting
---

## Trouble restoring NuGet packages

If you are unable to restore XPF and/or Avalonia packages (e.g. `Xpf.Sdk` or an Avalonia `cibuild` package is reported as missing) then follow the steps below:

### Check your firewall settings

Try opening the following URLs in your browser:

:::tip
Use the username `license` and your license key as the password when asked.
:::

- https://xpf-nuget-feed.avaloniaui.net/
- https://xpf-nuget-feed.avaloniaui.net/v3/index.json
- https://nuget-feed-all.avaloniaui.net/v3/index.json

The first URL should display a page similar to the package listing on [nuget.org](https://www.nuget.org/packages); the second two URLs should display some JSON.

If you are unable to view any of these URLs, check your firewall settings.

If you are unable to login with your license key, it may have expired. Ask support for a new one.

### Check you have set up NuGet.config

- Ensure that you have added a [NuGet.config](/xpf/getting-started#step-2-add-a-nugetconfig) file, **and that it is in the same directory** as the `.sln` file you are loading
- Ensure that you have added a valid license key to your `NuGet.config` file

### Clear your NuGet HTTP cache

Run the following commands from the command-line:

```bash
dotnet nuget locals http-cache --clear
dotnet restore
```

## Avalonia version conflicts

If you see a `TypeLoadException` such as:

```text
Method 'SetDataAsync' in type 'Avalonia.Win32.ClipboardImpl' does not have an implementation
```

This is caused by an explicit Avalonia package reference whose version does not match the version bundled with XPF. For example, referencing `Avalonia.Desktop` 11.3.8 while XPF bundles Avalonia 11.3.0.

**Solution**: Remove explicit Avalonia package references from your project. The XPF SDK transitively provides all required Avalonia packages. If you need to reference an Avalonia package directly, use the `$(XpfAvaloniaVersion)` MSBuild property to match XPF's bundled version:

```xml
<PackageReference Include="Avalonia.Headless.XUnit" Version="$(XpfAvaloniaVersion)" />
```

## Assembly version conflicts in multi-project solutions

When mixing projects that use `Sdk="Xpf.Sdk"` with projects that use `Sdk="Microsoft.NET.Sdk"` and `<UseWpf>true</UseWpf>`, you may see build warnings about conflicting versions of `ReachFramework` or `System.Windows.Input.Manipulations`.

These warnings can be safely ignored. At runtime, the XPF-shipped version of these assemblies will be used.

## ContextMenu not showing programmatically

If setting `ContextMenu.IsOpen = true` does not display the context menu (while right-click works fine), set the `PlacementTarget` property explicitly before opening:

```csharp
myContextMenu.PlacementTarget = targetElement;
myContextMenu.IsOpen = true;
```

In WPF, `PlacementTarget` is implicitly set in some cases, but XPF requires it to be explicit.

## Application path returns null in published apps

`Assembly.GetEntryAssembly().Location` returns null or empty when running a single-file published application. This is a .NET 5+ behavior, not specific to XPF.

Use `AppDomain.CurrentDomain.BaseDirectory` instead:

```csharp
string appPath = AppDomain.CurrentDomain.BaseDirectory;
```

## Listening for XPF logs

XPF logs are controlled via environment variables.
* `XPF_LOG_OUTPUT`: `console`, `trace`, `file=filePath`. Multiple values are supported separated by `;`.
* `XPF_LOG_LEVEL`: `Verbose`, `Information`, `Debug`, `Warning`, `Error`, `Fatal`.

:::caution
Older documentation may reference `ATLANTIS_LOG_OUTPUTS` and `ATLANTIS_LOG_LEVEL`. The correct variable names are `XPF_LOG_OUTPUT` and `XPF_LOG_LEVEL`.
:::

## Listening for Avalonia logs

In some situations it might be useful to gather Avalonia logs, as XPF is built on top of Avalonia. This can be helpful when investigating issues.

### .LogToTrace in a custom Avalonia initialization

1. Follow [instructions](/xpf/configuration/customizing-initialization) on how to setup custom Avalonia initialization.
2. Then you will be able to call `.LogToTrace()` with optional severity parameter in the AppBuilder chain, like this:
```diff
        AppBuilder.Configure<AvaloniaUI.Xpf.Helpers.DefaultXpfAvaloniaApplication>()
            .UsePlatformDetect()
+           .LogToTrace(LogEventLevel.Warning)
            .WithAvaloniaXpf()
```

This will redirect all Avalonia logs to the .NET `System.Diagnostics.Trace` listener. You can add custom trace listeners in your application to route these logs to a file, console, or your own logging framework:

```csharp
// Route trace output to a file
Trace.Listeners.Add(new TextWriterTraceListener("avalonia.log"));
Trace.AutoFlush = true;
```

### Override `Logger.Sink`

Static property `Logger.Sink` has a public setter and can be overridden by custom implementation.
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

```text
System.IO.FileNotFoundException: Could not load file or assembly 'System.Resources.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51'. The system cannot find the file specified.
```

Then install the `System.Resources.Extensions` package via nuget:

```xml
<PackageReference Include="System.Resources.Extensions" Version="7.0.0" />
```

The 7.0.0 version should also be compatible with .NET 6.

## NullReferenceException or MissingMethodException

If you experience a `NullReferenceException` or `MissingMethodException` after upgrading XPF, try cleaning your project or deleting your `bin`/`obj` directories.

## libSkiaSharp not found on Linux

If you encounter:

```text
System.DllNotFoundException: Unable to load shared library 'libSkiaSharp' or one of its dependencies
```

This is typically caused by publishing via Visual Studio, which can produce incomplete output. Publish from the command line instead:

```bash
dotnet publish -r linux-x64 -c Release
```

See [Linux: Publishing](/xpf/platforms/linux#publishing-for-linux) for more details.

## AssemblyLoadContext (ALC) conflicts

If your application uses a custom .NET host or plugin architecture with separate `AssemblyLoadContext` instances, XPF initialization may fail with a `VerificationException` about type argument constraints. This is caused by the same assembly being loaded into multiple ALCs.

**Solutions**:
- Ensure XPF assemblies load into `AssemblyLoadContext.Default`
- For plugin architectures, add the following to your `.csproj`:
  ```xml
  <ItemGroup>
      <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.EnableAlcSupport" Value="true" />
  </ItemGroup>
  ```
- Use a contract assembly pattern for communication between ALCs

## .NET version compatibility

XPF works with .NET 6, 7, 8, 9, and 10. The `net8.0-windows` (or similar) target framework works on all platforms when using the XPF SDK.

WPF features added in .NET versions newer than .NET 6 (such as the Fluent theme from .NET 9) may not be available in XPF, but features from .NET 8 (such as `OpenFolderDialog`) are supported.

:::tip
The `-windows` target framework suffix (e.g., `net8.0-windows`) works on Linux and macOS when using the XPF SDK. You do not need to change the TFM for cross-platform builds. Using the plain `net8.0` TFM without the `-windows` suffix may cause compilation errors with third-party libraries that expect Windows-specific APIs.
:::

## Xpf.Sdk import conflicts

When mixing projects that use `Sdk="Xpf.Sdk"` with standard `Microsoft.NET.Sdk` projects, you may encounter MSBuild import conflicts or duplicate type warnings. Common symptoms include:

- `ReachFramework` or `System.Windows.Input.Manipulations` version conflicts
- `WindowsDesktop` SDK being imported twice

**Solutions**:
- Ensure only your executable project uses `Sdk="Xpf.Sdk"`. Library projects can use `Microsoft.NET.Sdk` with `<EnableWindowsTargeting>true</EnableWindowsTargeting>` instead.
- Remove explicit `<UseWpf>true</UseWpf>` from projects that use the XPF SDK, as the SDK provides WPF support automatically.
- If you encounter `Could not load file or assembly` errors after changing the SDK, clean your `bin`/`obj` directories.

## License validation

XPF validates your application against the license using two identifiers:

1. **Assembly Name**: Retrieved via `Assembly.GetEntryAssembly().GetName().Name`
2. **Process Executable Name**: The name of the running process

Both must match the values configured in your license. If license validation fails, verify that your project's `AssemblyName` matches the name registered with your license.

:::note
If you rename your application executable or change the `AssemblyName` in your `.csproj`, you must update your license to match. Contact the Avalonia team to update your license configuration.
:::

## Creating NuGet packages that depend on XPF

If you want to distribute a library as a public NuGet package that uses XPF internally:

- Your NuGet package consumers must have their own XPF license
- Do not embed or redistribute XPF assemblies in your NuGet package
- Reference XPF packages as dependencies so they are resolved from the licensed NuGet feed
- The consumer's entry assembly name must match their license, not your library's assembly name

## Dispatcher thread errors

If you encounter "The calling thread cannot access this object because a different thread owns it" exceptions:

- Ensure UI operations happen on the main dispatcher thread: `Dispatcher.CurrentDispatcher.Invoke(() => { ... })`
- XPF supports only a single UI thread on macOS. WPF patterns that create windows on separate threads must be refactored to use the main dispatcher.
- Some third-party libraries (such as Caliburn.Micro) may access window properties from background threads during initialization. See [Library Compatibility: Caliburn.Micro](/xpf/third-party/compatibility#caliburnmicro) for library-specific guidance.
