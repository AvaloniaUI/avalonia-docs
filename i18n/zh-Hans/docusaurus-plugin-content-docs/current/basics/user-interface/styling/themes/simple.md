---
id: simple
title: Simple Theme
---

## Introduction

Avalonia Simple theme is specifically designed to be minimal and lightweight, with limited built-in styling. It provides a simple and clean foundation for building custom styles on top. Low visual and structural complexity makes it a perfect choice for applications running on embedded devices.

![Simple Theme](/img/basics/user-interface/styling/simple-theme.png)

## How to use

As a first step, [Avalonia.Themes.Simple](https://www.nuget.org/packages/Avalonia.Themes.Simple/) nuget package needs to be installed. 

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
    <SimpleTheme />
    // highlight-end
  </Application.Styles>
</Application>

```

:::note
If you need to specify theme dark or light variant, please follow [Theme Variants](../../../../guides/styles-and-resources/how-to-use-theme-variants.md) documentation.
:::