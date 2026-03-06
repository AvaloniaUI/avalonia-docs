---
id: headless-testing
title: Headless Testing
---

## Overview

Unit-testing was always a complicated scenario with WPF. The most common solution was to run heavy automation based e2e testing suits. Making it slower and locking it to Windows only testing.

Instead of automation testing, try Headless testing first as it's fast and portable.
Since XPF is based on the same core as Avalonia, headless testing is available for WPF apps too.

:::tip
A complete [CalculatorDemo sample](https://github.com/AvaloniaUIOU/CalculatorDemo/tree/headless-testing) with headless tests is available. Ask the support team for access to this repository if needed.
:::

:::note
For more detailed documentation on the Headless platform and Avalonia extensions, see [Headless Testing with XUnit](/docs/testing/headless-xunit) and [Headless Testing with NUnit](/docs/testing/headless-nunit). Understanding how headless testing works with Avalonia also helps with XPF/WPF.
:::

## Configuring the testing project

`XUnit`, `NUnit`, and `MSTest` are supported by XPF/Avalonia headless testing.
It's necessary to include integration nuget package in the testing project:

```xml
<ItemGroup>
    <PackageReference Include="Avalonia.Headless.XUnit" Version="$(XpfAvaloniaVersion)" />
    or
    <PackageReference Include="Avalonia.Headless.NUnit" Version="$(XpfAvaloniaVersion)" />
</ItemGroup>
```

`$(XpfAvaloniaVersion)` is pre-defined const in the `Xpf.Sdk`, which also needs to be set in testing project. It can be skipped, if you specify latest `PackageReference` version manually.

`AvaloniaUI.Xpf.LicenseKey` is also required for testing project to pass runtime validation. See [Getting started](../getting-started.md) page if you need more information where to get this key.

```xml
<ItemGroup>
    <RuntimeHostConfigurationOption Include="AvaloniaUI.Xpf.LicenseKey" Value="--Insert your key here--"/>
</ItemGroup>
```

## (Optional) Configuring the testing application

Similarly to Avalonia headless, you can configure cross-platform `AppBuilder` to be used in the project.
When not defined, headless platform is using default parameters, which might limit your XPF testing experience.
Note, if you already override AppBuilder for your XPF app (as per [Customizing Initialization](/xpf/configuration/customizing-initialization) documentation), you can reuse the same initialization code, but add `.UseHeadless()` in the end of the chain.

```csharp
[assembly: AvaloniaTestApplication(typeof(TestAppBuilder))]

public class TestAppBuilder
{
    // XPF specific: add .WithAvaloniaXpf() and use DefaultXpfAvaloniaApplication which has preconfigured default themes.
    public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<DefaultXpfAvaloniaApplication>()
        .WithAvaloniaXpf()
        .UseSkia()
        .UseHeadless(new AvaloniaHeadlessPlatformOptions
        {
            // Set to false to enable capturing rendered frames
            UseHeadlessDrawing = false
        });
}
```

## Writing tests

Your tests are running in the same process as the XPF application, making it easier to send any events and access any output of the app.
As with normal WPF app, everything has to start with a Window, which can be create in the same test method, or reused from set-up methods (`[SetUp]` method in NUnit or constructor in XUnit).

:::note
NUnit [Test] and [Theory] needs to be replaced with [AvaloniaTest] [AvaloniaTheory],
as well as XUnit [Fact] replaced with [AvaloniaFact].
:::

Very basic NUnit test would look like this:

```csharp
[AvaloniaTest]
public void Should_Be_Able_To_Raise_Event()
{
    var window = new MainWindow();
    window.Show();
    var button = window.ClickingButton;

    Assert.That(button.Content, Is.EqualTo("Click me"));

    button.RaiseEvent(new RoutedEventArgs(ButtonBase.ClickEvent, button));

    Assert.That(button.Content, Is.EqualTo("Click count: 1"));
}
```

Where Button logic is as follows:

```csharp
private int _clickCount = 0;
private void ClickingButton_OnClick(object sender, RoutedEventArgs e)
{
    ClickingButton.Content = "Click count: " + (++_clickCount).ToString();
}
```

:::tip
To access `ClickingButton` from the testing project, you either need to set `x:FieldModifier="public"` on the control in XAML, or add an `[assembly: InternalsVisibleTo("YourTestProject")]` attribute to your main project.
:::

## Accessing Avalonia headless extensions

Avalonia provides headless extensions for simulating clicks and keyboard input, avoiding the need to raise fake WPF events.

This extensions are only available on Avalonia Window, and can't be used on WPF Window.
But lucky, it's possible to get Avalonia Window in headless tests:

```csharp
// Get Avalonia window and send text input to currently focused control.
var avWindow = XpfWpfAbstraction.GetAvaloniaWindowForWindow(xpfWindow);
avWindow.KeyTextInput("Hello");
```

See [Avalonia Interop](/xpf/interop/embedding-avalonia-in-xpf#accessing-avalonia-features) for more details on integration with Avalonia.

## (Optional) Using XPF headless testing with WPF app/project

Only startup project has to use Xpf.Sdk testing.
Which also means that you can have normal "net8.0-windows" project with your controls, and reference them in XPF headless project.

It can be useful, if you have shared controls library that and want to headless test it, or maybe if you have normal Windows WPF application and need headless testing without fully using XPF.

All the usage steps are the same, but you also need to set testing project TargetFramework to `net8.0-windows` and set `EnableWindowsTargeting` to true (only if you need to run it on Linux/macOS machines).

## MSTest support

For MSTest projects, the setup is similar but requires additional configuration:

1. Set `DisableAutomaticXpfInit` to `true` in your test project's `.csproj`:
   ```xml
   <PropertyGroup>
       <DisableAutomaticXpfInit>true</DisableAutomaticXpfInit>
   </PropertyGroup>
   ```

2. Configure the headless AppBuilder and use `[AvaloniaTestMethod]` instead of `[TestMethod]`:
   ```csharp
   [assembly: AvaloniaTestApplication(typeof(TestAppBuilder))]

   public class TestAppBuilder
   {
       public static AppBuilder BuildAvaloniaApp() => AppBuilder
           .Configure<DefaultXpfAvaloniaApplication>()
           .WithAvaloniaXpf()
           .UseSkia()
           .UseHeadless(new AvaloniaHeadlessPlatformOptions
           {
               UseHeadlessDrawing = false
           });
   }
   ```

## Test isolation

If you experience flaky tests (such as `TaskScheduler` errors or inconsistent state between tests), configure test isolation per assembly:

```csharp
[assembly: AvaloniaTestApplication(typeof(TestAppBuilder), AvaloniaTestIsolationLevel.PerAssembly)]
```

This ensures the Avalonia runtime is initialized once per test assembly rather than per test, preventing race conditions between test teardown and initialization.

## Running tests in CI

When running XPF headless tests in CI environments on Linux:

- Ensure the license key is configured in the test project (see [Getting Started](/xpf/getting-started#step-4-add-your-licence-key))
- No display server is required when using headless mode
- If `XOpenDisplay failed` errors occur, verify that `DisableAutomaticXpfInit` is set to `true` and the headless AppBuilder is configured correctly

## See also

- [Headless testing with XUnit](/docs/testing/headless-xunit)
- [Headless testing with NUnit](/docs/testing/headless-nunit)
- [Setting up the headless platform](/docs/testing/setting-up-the-headless-platform)