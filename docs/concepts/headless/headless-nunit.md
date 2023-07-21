---
id: headless-nunit
title: Headless Testing with NUnit
---

## Preparation 

This page assumes that NUnit project was already created.
If not, please follow NUnit "Getting Started" and "Installation" here https://docs.nunit.org/articles/nunit/getting-started/installation.html.

## Install packages

Aside from NUnit packages, we need to install two more packages:
- [Avalonia.Headless.NUnit](https://www.nuget.org/packages/Avalonia.Headless.NUnit) which also includes Avalonia.
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent) as even headless controls need a theme

:::tip
Headless platform doesn't require any specific theme, and it is possible to swap FluentTheme with any other.
:::

## Setup Application 
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

## Initialize NUnit Tests

The `[AvaloniaTestApplication]` attribute wires the tests in the current project with the specific application. It needs to be defined once per project in any file.

```csharp
[assembly: AvaloniaTestApplication(typeof(TestAppBuilder))]

public class TestAppBuilder
{
    public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<App>()
        .UseHeadless(new AvaloniaHeadlessPlatformOptions());
}
```

## Test Example

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

Instead of the typical `[Test]` attribute, we need to use `[AvaloniaTest]` as it sets up the UI thread. Similarly, instead of `[Theory]`, there is a `[AvaloniaTheory]` attribute.
