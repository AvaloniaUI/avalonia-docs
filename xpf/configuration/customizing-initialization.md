---
id: customizing-initialization
title: Customizing initialization
description: How to access and customize the Avalonia AppBuilder API in an XPF application by disabling automatic initialization.
---

Avalonia provides the [`AppBuilder`](/docs/fundamentals/application-lifetimes) API to customize various aspects of the framework. 

Because XPF is based upon Avalonia, it can be useful to have access to this API in an XPF application.

## Step 1: Disable automatic XPF initialization

In your project file set the `DisableAutomaticXpfInit` property to `true`:

```xml
<PropertyGroup>
  <DisableAutomaticXpfInit>true</DisableAutomaticXpfInit>
</PropertyGroup>
```

## Step 2: Add a main entry point

Add a `Program.cs` file containing a `Main` entry-point:

```csharp
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using AvaloniaUI.Xpf;

namespace MyXpfApp;

internal class Program
{
    public static void Main(string[] args)
    {
        AppBuilder.Configure<AvaloniaUI.Xpf.Helpers.DefaultXpfAvaloniaApplication>()
            .UsePlatformDetect()
            .WithAvaloniaXpf()
            .SetupWithLifetime(new ClassicDesktopStyleApplicationLifetime
            { 
                ShutdownMode = ShutdownMode.OnExplicitShutdown 
            });

        App.Main();
    }
}
```

:::tip
Change the namespace in the above example to match your application namespace.
:::

In the above example `App` is your XPF `Application` class defined in `App.xaml.cs`.

## Step 3: Set the `StartupObject`

Configure your project to use the new `Main` method by adding the following to your `.csproj`:

```xml
 <PropertyGroup>
     <StartupObject>MyXpfApp.Program</StartupObject>
 </PropertyGroup>
```

:::tip
Change the namespace in the above example to the namespace defined in `Program.cs`.
:::

## AssemblyLoadContext (ALC) Support

If your application uses a custom .NET host or plugin architecture with separate `AssemblyLoadContext` instances, enable ALC support by adding the following to your `.csproj`:

```xml
<ItemGroup>
    <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.EnableAlcSupport" Value="true" />
</ItemGroup>
```

This prevents `VerificationException` errors caused by the same assembly being loaded into multiple ALCs. You need this setting when:

- Your application uses a plugin system that loads assemblies into isolated ALCs
- You host XPF within another application framework that uses custom assembly loading
- You see errors about type argument constraints during XPF initialization

## Custom assembly loading

If you have a custom mechanism for loading managed assemblies, you may find that using the `AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AutoEnable` function causes lock-ups in your app. If that happens, try using the deferred way of adding assemblies with `AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AddLibrary` like so:

```csharp
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using AvaloniaUI.Xpf;
using AvaloniaUI.Xpf.WinApiShim;

namespace MyXpfApp;

internal class Program
{
    public void CalledFromYourCustomAssemblyLoading(Assembly targetAssembly)
    {
        // This call will add the assembly to the list of assemblies that will 
        // be intercepted with XPF's Win32 Shimming system.
        WinApiShimSetup.AddLibrary(targetAssembly);
    }
}
```

## Dispatcher constraints

XPF supports a single UI dispatcher on all platforms. On macOS, this is enforced by the operating system (only one UI thread is permitted). On Windows and Linux, limited multi-dispatcher support exists but is not recommended.

If your WPF application creates windows on separate threads (for example, splash screens or progress dialogs), refactor those patterns to use the main dispatcher:

```csharp
// Instead of creating a new thread for a splash screen:
Dispatcher.CurrentDispatcher.BeginInvoke(DispatcherPriority.Background, () =>
{
    var splash = new SplashWindow();
    splash.Show();
});
```

See [Missing Features: Multiple UI Threads](/xpf/version-info/missing-features) for more details.

## Optional: Define a custom Avalonia application

In certain cases you may want to use a custom Avalonia `Application` class; some use-cases for this scenario are:

- Providing application-wide Avalonia styles and resources
- Providing an application `NativeMenu`

To do this, first add `.cs` and `.axaml` files for your application class:

```csharp title="MyAvaloniaApp.axaml.cs"
using Avalonia;
using Avalonia.Markup.Xaml;
using Avalonia.Styling;

namespace MyXpfApp;

public class MyAvaloniaApp : Application
{
    public MyAvaloniaApp()
    {
        RequestedThemeVariant = ThemeVariant.Light;
        AvaloniaXamlLoader.Load(this);
    }
}
```

```xml title="MyAvaloniaApp.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyXpfApp.MyAvaloniaApp">
  <Application.Styles>
    <SimpleTheme/>
  </Application.Styles>
</Application>
```

And then reference this custom Application in the `AppBuilder` configuration added in step 2:

```csharp
// highlight-next-line
AppBuilder.Configure<MyAvaloniaApp>()
    .UsePlatformDetect()
    .WithAvaloniaXpf()
    .SetupWithLifetime(new ClassicDesktopStyleApplicationLifetime
    { 
        ShutdownMode = ShutdownMode.OnExplicitShutdown 
    });
```


