---
id: fluent
title: Fluent Theme
---

## Introduction

Avalonia Fluent theme is inspired by Microsoft's Fluent Design System, which is a set of design guidelines and components for creating visually appealing and interactive user interfaces. The Fluent Design System emphasizes modern, clean aesthetics, smooth animations, and intuitive interactions. It provides a consistent and polished look-and-feel across different platforms, while giving developers flexibility with our styling system.

![Fluent Theme](/img/basics/user-interface/styling/fluent-theme-normal.png)

## How to use

As a first step, [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent/) nuget package needs to be installed. 

:::info
On how to add a nuget package, you can follow steps from the Nuget page or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio), [Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html) documentation.
:::

After that theme needs to be included in the Application class:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    // highlight-start
    <FluentTheme />
    // highlight-end
  </Application.Styles>
</Application>
```

:::note
If you need to specify theme dark or light variant, please follow [Theme Variants](../../../../guides/styles-and-resources/how-to-use-theme-variants.md) documentation.
:::

## Changing theme density

Fluent theme has two sets of predefined density variants.
To switch to more compact look, you can set it with DensityStyle property:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    // highlight-start
    <FluentTheme DensityStyle="Compact" />
    // highlight-end
  </Application.Styles>
</Application>
```

## Creating custom color palettes

TODO
https://theme.xaml.live/

![Fluent Theme Forest Palette](/img/basics/user-interface/styling/fluent-theme-forest.png)