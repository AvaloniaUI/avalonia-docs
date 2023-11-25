---
id: fluent
title: Fluent Theme
---

import FluentThemeNormalScreenshot from '/img/basics/user-interface/styling/fluent-theme-normal.png';
import FluentThemeForestScreenshot from '/img/basics/user-interface/styling/fluent-theme-forest.png';

## Introduction

Avalonia Fluent theme is inspired by Microsoft's Fluent Design System, which is a set of design guidelines and components for creating visually appealing and interactive user interfaces. The Fluent Design System emphasizes modern, clean aesthetics, smooth animations, and intuitive interactions. It provides a consistent and polished look-and-feel across different platforms, while giving developers flexibility with our styling system.

<p><img className="medium-image-zoom" src={FluentThemeNormalScreenshot} alt="Fluent Theme" /></p>

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

While FluentTheme has build-in resources for dark and light variants, it's still possible to override base palette for these variants.
It is useful, when developers want to use the same base theme, but with different colors.

To do so, you need to define

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme>
    // highlight-start
      <FluentTheme.Palettes>
        <!-- Palette for Light theme variant -->
        <ColorPaletteResources x:Key="Light" Accent="Green" RegionColor="White" ErrorText="Red" />
        <!-- Palette for Dark theme variant -->
        <ColorPaletteResources x:Key="Dark" Accent="DarkGreen" RegionColor="Black" ErrorText="Yellow" />
      </FluentTheme.Palettes>
    // highlight-end
    </FluentTheme>
  </Application.Styles>
</Application>
```

While `ColorPaletteResources` has many color properties that can be overridden independently for each variant, it is possible to redefine only minimal set of what's needed, and keep everything else as per defaults. As in examples above, only a couple of colors are overridden.

If Accent is not overridden, Avalonia uses platform OS accent color if available.
Also, Accent supports bindings and can be changed in runtime. But not other properties, as they are read once after app started and are statically used for performance reasons.

It is possible to build palettes from the code behind, but same rules apply - only Accent can be updated dynamically, and palettes should be

:::note
FluentTheme supports only Dark and Light theme variants, and it's not possible to define palettes for custom variants.
:::

## Creating custom color palettes with online editor

Microsoft Fluent Theme Editor was ported to Avalonia and now available to be used with our FluentTheme as well.
It is available on https://theme.xaml.live/ page and supports following features:

1. Editing palette colors for both Light and Dark variants.
2. Previewing of the current palette.
3. Exporting current palettes as XAML code that can be copy pasted into `App.axaml` file.
4. Saving current colors in a json file and loading it from the file system.
5. Automatic hints, when palette has a low contrast between colors.
6. Couple of quick start presets.

Example of FluentTheme with a Forest palette preset available on the web app:
<p><img className="medium-image-zoom" src={FluentThemeForestScreenshot} alt="Fluent Theme Forest Palette" /></p>