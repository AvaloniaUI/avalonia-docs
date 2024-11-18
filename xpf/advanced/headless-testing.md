---
id: headless-testing
title: Headless Testing
---

## Overview

Unit-testing was always a complicated scenario with WPF. The most common solution was to run heavy automation based e2e testing suits. Making it slower and locking it to Windows only testing.

In Avalonia, instead of automation testing, we always recommend trying Headless testing first as it's fast and portable.
Since XPF is based on the same core as Avalonia, we made headless testing possible on WPF apps too.

:::tip
We have prepared a complete [CalculatorDemo sample](https://github.com/AvaloniaUIOU/CalculatorDemo/tree/headless-testing) with headless tests. Please ask our support team to give you access to this repository, if you need.
:::

:::note
If you need more detailed documentation on Headless platform and Avalonia extensions, please visit [Avalonia documentation](https://docs.avaloniaui.net/docs/concepts/headless/) and [Avalonia samples](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Headless.XUnit). Understanding how it works with Avalonia also helps with XPF/WPF.
:::

## Configuring testing project

`XUnit` and `NUnit` are currently supported by XPF/Avalonia headless testing.
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

## (Optional) Configuring testing application

Similarly to Avalonia headless, you can configure cross-platform `AppBuilder` to be used in the project.
When not defined, headless platform is using default parameters, which might limit your XPF testing experience.
Note, if you already override AppBuilder for your XPF app (as per [Customizing Initialization](./customizing-init.md) documentation), you can reuse the same initialization code, but add `.UseHeadless()` in the end of the chain.

```csharp
[assembly: AvaloniaTestApplication(typeof(TestAppBuilder))]

public class TestAppBuilder
{
    // See https://docs.avaloniaui.net/docs/concepts/headless/headless-nunit#initialize-nunit-tests
    // XPF specific: we need to add .WithAvaloniaXpf and keep DefaultXpfAvaloniaApplication was already preconfigured default themes.
    public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<DefaultXpfAvaloniaApplication>()
        .WithAvaloniaXpf()
        .UseSkia()
        .UseHeadless(new AvaloniaHeadlessPlatformOptions
        {
            // Required for capturing rendered frame https://docs.avaloniaui.net/docs/concepts/headless/#capturing-the-last-rendered-frame
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

Where Button logic is straightforward:

```csharp
private int _clickCount = 0;
private void ClickingButton_OnClick(object sender, RoutedEventArgs e)
{
    ClickingButton.Content = "Click count: " + (++_clickCount).ToString();
}
```

:::tip
To access `ClickingButton` from the testing project, you either need to set [x:FieldModifier="public"](https://learn.microsoft.com/en-us/dotnet/desktop/xaml-services/xfieldmodifier-directive) on the control, or define `InternalsVisibleTo` attribute.
:::

## Accessing Avalonia headless extensions

In [Avalonia documentation](https://docs.avaloniaui.net/docs/concepts/headless/) you might find some useful headless extensions for simulating clicks and keyboard input, avoiding raising fake WPF events.

This extensions are only available on Avalonia Window, and can't be used on WPF Window.
But lucky, it's possible to get Avalonia Window in headless tests:

```csharp
// Get Avalonia window and send text input to currently focused control.
var avWindow = XpfWpfAbstraction.GetAvaloniaWindowForWindow(xpfWindow);
avWindow.KeyTextInput("Hello");
```

See [Avalonia Interop](./avalonia-interop.md) for more details on integration with Avalonia.

## (Optional) Using XPF headless testing with WPF app/project

Only startup project has to use Xpf.Sdk testing.
Which also means that you can have normal "net8.0-windows" project with your controls, and reference them in XPF headless project.

It can be useful, if you have shared controls library that and want to headless test it, or maybe if you have normal Windows WPF application and need headless testing without fully using XPF.

All the usage steps are the same, but you also need to set testing project TargetFramework to `net8.0-windows` and set `EnableWindowsTargeting` to true (only if you need to run it on Linux/macOS machines).
