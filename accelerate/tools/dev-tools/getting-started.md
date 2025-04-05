# Getting Started

## Prerequisites

### Developer Tools requirements

| Requirement | Version/Details |
|------------|-----------------|
| .NET Runtime | 6.0 or newer |
| Windows | 10 or newer |
| macOS | 13 or newer |
| Linux | X11 and glibc 2.27 or musl 1.22.2 compatible distros |

No admin/sudo permissions are required to run the tool. Firewal l exception might need to be configured, if you plan to use Developer Tools remotely.  

### Diagnostics Support requirements

Support package requires **Avalonia 11.2.0** or newer, and built on **.NET Standard 2.0** compatible APIs.

This package is compatible with Browser and Android/iOS projects.

:::note

Demo project with Developer Tools preconfigured can be found at [AvaloniaUI/AvaloniaUI.DeveloperTools/samples/SimpleToDoList](https://github.com/AvaloniaUI/AvaloniaUI.DeveloperTools/tree/main/samples/SimpleToDoList#simpletodolist).

:::

## Step 1: Configure NuGet Package Source

Avalonia Accelerate packages are distributed via a dedicated NuGet feed that can be accessed with your AvaloniaUI portal credentials.

Refer to Visual Studio documentation on how to add custom NuGet feed: [Install NuGet packages with Visual Studio](https://learn.microsoft.com/en-us/azure/devops/artifacts/nuget/consume?view=azure-devops&tabs=windows).
Or manually create a NuGet.config file at the root of your solution, or modify an existing one to contain the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="avalonia-pro" value="https://pro-nuget-feed.avaloniaui.net/v3/index.json" />
  </packageSources>
  <packageSourceCredentials>
    <avalonia-pro>
      <add key="Username" value="license" />
      <add key="ClearTextPassword" value="<YOUR_LICENSE_KEY>" />
    </avalonia-pro>
  </packageSourceCredentials>
</configuration>
```

Where `<YOUR_LICENSE_KEY>` is a license key that was received after completing seat purchase.

:::note
This NuGet Feed can also be configured globally, by modifying common NuGet.Config that can be found by following [Common NuGet configurations](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior).
:::

## Step 2: Installing AvaloniaUI Developer Tools

`AvaloniaUI Developer Tools` is currently a native [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools), with update mechanism provided by the SDK.
This guide demonstrates global installation of the tool. But local installation is possible with a limitation: this tool will only work from the same working directory or descendant as the tool installation solution/project.    

For macOS:

```bash
dotnet tool install --global AvaloniaUI.DeveloperTools.macOS
```

For Windows:

```bash
dotnet tool install --global AvaloniaUI.DeveloperTools.Windows
```

For Linux:

```bash
dotnet tool install --global AvaloniaUI.DeveloperTools.Linux
```

The Developer Tools will notify you when a new version is available.
It can be then updated via similar `dotnet tool update` command.

## Step 3: Installing Diagnostics Support package

The `Diagnostics Support` package is responsible for establishing a connection bridge between the user app and Developer Tools process.

This package can be installed either in the executable project with your Program AppBuilder or shared project with your Application, depending on your application's architecture.

In both cases, command is the same:

```bash
dotnet add package AvaloniaUI.DiagnosticsSupport
```

## Step 4: Configuring your project

Once the `DiagnosticsSupport` package is installed, you need to enable it in your `Application` class:

```csharp
public override void Initialize()
{
    AvaloniaXamlLoader.Load(this);

    this.AttachDeveloperTools();
}
```

Alternatively, it's possible to use `.WithDeveloperTools()` extension method on your AppBuilder.

These methods also accept `DeveloperToolsOptions` options class allowing to customize `Diagnostics Support` setup. See [Reference to DeveloperToolsOptions](./advanced/options-reference.md) for more details.

By default, **29414** is used and should be available. It is configurable via options.

## Step 5: Run the tool

When your target app is running, press F12 to initialize connection.
`Diagnostics Support` will automatically run `Developer Tools` executable and initiate connection between processes.
Initial execution on `macOS` might take several seconds due to Gatekeeper validation. Subsequent launches will be faster.

## Step 6: Activate the tool

Once the Developer Tools has opened, you will be asked to input `AvaloniaUI Portal` credentials that were used to purchase and license the tool. This is the only time when the tool requires an internet connection. After that, the tool can be used offline or until license key session expires.

![Tool Activation](../../../static/img/dev-tools/tool-activation.png)

## Step 7: Done!

After activation, the connection with the app will be resumed, and a window with tools will be opened. 

## Further Reading

- Documentation on [Elements tool](./tools/elements)
- Custom [DeveloperToolsOptions configuration](./advanced/options-reference.md) reference
- [Frequently Asked Questions](./faq)
- [Settings](./settings.md) and [Shortcuts](./shortcuts.md) documentation
- [Attaching Browser or Mobile application](./advanced/attaching-browser-or-mobile.md)
- [Attaching to the Remote Tool](./advanced/attaching-to-the-remote-tool.md)
