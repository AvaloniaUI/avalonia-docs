---
id: headless-nunit
title: Headless Testing with NUnit
description: Set up and run headless UI tests for Avalonia applications using the NUnit test framework.
doc-type: guide
---

## Preparation 

This page assumes that NUnit project was already created.
If not, please follow NUnit "Getting Started" and "Installation" here https://docs.nunit.org/articles/nunit/getting-started/installation.html.

## Install packages

Aside from NUnit packages, you need to install two more packages:
- [Avalonia.Headless.NUnit](https://www.nuget.org/packages/Avalonia.Headless.NUnit) which also includes Avalonia.
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent) as even headless controls need a theme

:::tip
Headless platform doesn't require any specific theme, and it is possible to swap FluentTheme with any other.
:::

## Setup application

As in any other Avalonia app, an `Application` instance needs to be created, and themes need to be applied. When using the Headless platform, the setup is not much different from a regular Avalonia app and can mostly be reused.

```xml title=App.axaml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="Tests.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

And the code:

```csharp title=App.axaml.cs
using Avalonia;
using Avalonia.Headless;

public class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }
}
```

:::note
Usually, the `BuildAvaloniaApp` method is defined in the Program.cs file, but NUnit/XUnit tests don't have it, so it is defined in the `App` file instead.
:::

## Initialize NUnit tests

The `[AvaloniaTestApplication]` attribute wires the tests in the current project with the specific application. It needs to be defined once per project in any file.

```csharp
[assembly: AvaloniaTestApplication(typeof(TestAppBuilder))]

public class TestAppBuilder
{
    public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<App>()
        .UseHeadless(new AvaloniaHeadlessPlatformOptions());
}
```

## Test isolation level

By default, the Application and Dispatcher are recreated for each test (`PerTest` isolation). For large test suites this can be slow. To reuse a single Application instance across all tests in the assembly, add the `[AvaloniaTestIsolation]` attribute:

```csharp
[assembly: AvaloniaTestApplication(typeof(TestAppBuilder))]
[assembly: AvaloniaTestIsolation(AvaloniaTestIsolationLevel.PerAssembly)]
```

| Level | Behavior |
|---|---|
| `PerTest` | Recreates Application and Dispatcher for each test (default). Tests are fully isolated. |
| `PerAssembly` | Reuses a single Application and Dispatcher for all tests in the assembly. Faster, but tests share state. |

:::caution
With `PerAssembly` isolation, tests share Application state. Clean up any global state (styles, resources, static properties) between tests to avoid interference. Concurrent test execution is not supported.
:::

## Test example

```csharp
[AvaloniaTest]
public void Should_Type_Text_Into_TextBox()
{
    // Setup controls:
    var textBox = new TextBox();
    var window = new Window { Content = textBox };

    // Open window:
    window.Show();

    // Focus text box:
    textBox.Focus();

    // Simulate text input:
    window.KeyTextInput("Hello World");

    // Assert:
    Assert.AreEqual("Hello World", textBox.Text);
}
```

Instead of the typical `[Test]` attribute, use `[AvaloniaTest]` as it sets up the UI thread. Similarly, instead of `[Theory]`, there is a `[AvaloniaTheory]` attribute.

## See also

- [Testable sample app for NUnit](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Headless.NUnit)
- [Headless Testing Platform](setting-up-the-headless-platform)
- [Headless Testing with XUnit](headless-xunit)
- [UI Testing with Appium](ui-testing-with-appium)