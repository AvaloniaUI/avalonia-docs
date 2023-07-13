---
id: headless-custom
title: Manual Setup of Headless Platform
---

:::warning
This page explains an advanced usage scenario with the Headless platform.
We recommend using the [XUnit](headless-xunit.md) or [NUnit](headless-nunit.md) testing frameworks instead.
:::

## Install Packages

To set up the Headless platform, you need to install two packages:
- [Avalonia.Headless](https://www.nuget.org/packages/Avalonia.Headless), which also includes Avalonia.
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent), as even headless controls need a theme.

:::tip
The Headless platform doesn't require any specific theme, and it is possible to swap FluentTheme with any other.
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

## Run Headless Session

```csharp title=Program.cs
using Avalonia.Controls;
using Avalonia.Headless;

// Start Headless session passing Application type.
using var session = HeadlessUnitTestSession.StartNew(typeof(App));

// Since the Headless session has its own thread internally, we need to dispatch actions there:
await session.Dispatch(() =>
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
    if (textBox.Text != "Hello World")
    {
        throw new Exception("Assert");
    }
}, CancellationToken.None);
```