---
id: customizing-init
title: Customizing Initialization
---

Avalonia provides the [`AppBuilder`](https://docs.avaloniaui.net/docs/getting-started/application-lifetimes) API to customize various aspects of the framework. 

Because XPF is based upon Avalonia, it can be useful to have access to this API in an XPF application.

## Step 1: Disable Automatic XPF Initialization

In your project file set the `DisableAutomaticXpfInit` property to `true`:

```xml
<PropertyGroup>
  <DisableAutomaticXpfInit>true</DisableAutomaticXpfInit>
</PropertyGroup>
```

## Step 2: Add a Main Entry-Point

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

## Step 3: Set the StartupObject

Configure your project to use the new `Main` method by adding the following to your `.csproj`:

```
 <PropertyGroup>
     <StartupObject>MyXpfApp.Program</StartupObject>
 </PropertyGroup>
```

:::tip
Change the namespace in the above example to the namespace defined in `Program.cs`.
:::

## Optional: Define a custom Avalonia Application

In certain cases you may want to use a custom Avalonia `Application` class; some use-cases for this scenario are:

- Providing application-wide Avalonia styles and resources
- Providing an application `NativeMenu`

In order to do this, first add `.cs` and `.axaml` files for your application class:

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

```csharp title="MyAvaloniaApp.axaml"
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
