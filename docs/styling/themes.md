---
id: themes
title: Themes
---

import FluentThemeNormalScreenshot from '/img/concepts/ui-concepts/styling/fluent-theme-normal.png';
import FluentThemeForestScreenshot from '/img/concepts/ui-concepts/styling/fluent-theme-forest.png';
import SimpleThemeScreenshot from '/img/concepts/ui-concepts/styling/simple-theme.png';

In Avalonia, themes are complete sets of [control themes](control-themes) and [theme resources](theme-variants) for built-in controls.

## Official themes

Avalonia provides two built-in themes:

### Fluent theme

- [Fluent Theme](#fluent) is a modern theme inspired by [Microsoft's Fluent Design System](https://en.wikipedia.org/wiki/Fluent_Design_System).

### Simple theme

- [Simple Theme](#simple) is a minimal and lightweight theme with limited built-in styling.

## Community themes

Community-developed themes in varying stages of development are also available.

### Material.Avalonia 

- [Material.Avalonia](https://github.com/AvaloniaCommunity/Material.Avalonia) is a modern theme inspired by [Google's Material Design System](https://m3.material.io/).

### Semi.Avalonia

- [Semi.Avalonia](https://github.com/irihitech/Semi.Avalonia) is inspired by [Semi Design](https://semi.design/en-US)
  
### Classic.Avalonia

- [Classic.Avalonia](https://github.com/BAndysc/Classic.Avalonia) is a classic theme inspired by the design of Windows 9x family.

## Fluent

The Avalonia Fluent theme is inspired by Microsoft's Fluent Design System, a set of design guidelines and components for creating visually appealing and interactive user interfaces. The Fluent Design System emphasizes modern, clean aesthetics, smooth animations, and intuitive interactions. It provides a consistent and polished look-and-feel across different platforms, while giving developers flexibility with the Avalonia styling system.

<p><img className="medium-image-zoom" src={FluentThemeNormalScreenshot} alt="Fluent Theme" /></p>

### How to use

First, install the [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent/) NuGet package.

:::info
For help adding a NuGet package, see the [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio) or [Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html) documentation.
:::

Then include the theme in the `Application` class:

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
If you need to specify a dark or light theme variant, see [Theme variants](theme-variants).
:::

### Changing theme density

The Fluent theme has two sets of predefined density variants.
To switch to a more compact look, set the `DensityStyle` property:

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

### Creating custom color palettes

While `FluentTheme` has built-in resources for dark and light variants, you can override the base palette for these variants.
This is useful when you want to use the same base theme but with different colors.

To do so, define custom `ColorPaletteResources` for each variant:

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

`ColorPaletteResources` has many color properties that can be overridden independently for each variant. You only need to redefine the properties you want to change; everything else keeps its default value. In the example above, only a few colors are overridden.

If `Accent` is not overridden, Avalonia uses the platform OS accent color when available.
`Accent` supports bindings and can be changed at runtime. Other palette properties are read once at startup and used statically for performance reasons.

You can also build palettes from code-behind, but the same rules apply: only `Accent` can be updated dynamically.

:::note
FluentTheme supports only Dark and Light theme variants, and it's not possible to define palettes for custom variants.
:::

### Creating custom color palettes with online editor

The Microsoft Fluent Theme Editor has been ported to Avalonia and is available for use with `FluentTheme`.
The [Avalonia Theme Editor](https://theme.xaml.live/) supports the following features:

1. Editing palette colors for both Light and Dark variants.
2. Previewing of the current palette.
3. Exporting current palettes as XAML code that can be copied into your `App.axaml` file.
4. Saving current colors in a json file and loading it from the file system.
5. Automatic hints when a palette has low contrast between colors.
6. Quick-start presets.

Example of FluentTheme with a Forest palette preset available on the web app:

<p><img className="medium-image-zoom" src={FluentThemeForestScreenshot} alt="Fluent Theme Forest Palette" /></p>

## Simple

The Avalonia Simple theme is designed to be minimal and lightweight, with limited built-in styling. It provides a clean foundation for building custom styles on top. Its low visual and structural complexity makes it a good choice for applications running on embedded devices.

<Image light={SimpleThemeScreenshot} alt="A screenshot of a user interface, demonstrating the appearances of various UI controls using a simple design theme." position="center" maxWidth={400} cornerRadius="true"/>

### How to use

First, install the [Avalonia.Themes.Simple](https://www.nuget.org/packages/Avalonia.Themes.Simple/) NuGet package.

:::info
For help adding a NuGet package, see the [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio) or [Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html) documentation.
:::

Then include the theme in the `Application` class:

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
If you need to specify a dark or light theme variant, see [Theme variants](theme-variants).
:::

## See also

- [Control themes](control-themes)
- [Theme variants](theme-variants)
- [Styles](styles)