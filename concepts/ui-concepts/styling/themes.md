---
id: themes
title: Themes
---

import FluentThemeNormalScreenshot from '/img/concepts/ui-concepts/styling/fluent-theme-normal.png';
import FluentThemeForestScreenshot from '/img/concepts/ui-concepts/styling/fluent-theme-forest.png';
import SimpleThemeScreenshot from '/img/concepts/ui-concepts/styling/simple-theme.png';

In Avalonia, themes are complete sets of [control themes](/concepts/ui-concepts/styling/control-themes) and [theme resources](/docs/ui-development/styling/theme-variants) for built-in controls.

## Official themes

Avalonia provides two built-in themes:

### Fluent theme

- [Fluent Theme](#fluent) is a modern theme inspired by [Microsoft's Fluent Design System](https://en.wikipedia.org/wiki/Fluent_Design_System).

### Simple theme

- [Simple Theme](#simple) is an minimal and lightweight theme with limited built-in styling.

## Community themes

Several themes, in varying stages of development, have been brought to life by our dedicated community.

### Material.Avalonia 

- [Material.Avalonia](https://github.com/AvaloniaCommunity/Material.Avalonia) is a modern theme inspired by [Google's Material Design System](https://m3.material.io/).

### Semi.Avalonia

- [Semi.Avalonia](https://github.com/irihitech/Semi.Avalonia) is inspired by [Semi Design](https://semi.design/en-US)
  
### Classic.Avalonia

- [Classic.Avalonia](https://github.com/BAndysc/Classic.Avalonia) is a classic theme inspired by the design of Windows 9x family.

## Fluent

Avalonia Fluent theme is inspired by Microsoft's Fluent Design System, which is a set of design guidelines and components for creating visually appealing and interactive user interfaces. The Fluent Design System emphasizes modern, clean aesthetics, smooth animations, and intuitive interactions. It provides a consistent and polished look-and-feel across different platforms, while giving developers flexibility with our styling system.

<p><img className="medium-image-zoom" src={FluentThemeNormalScreenshot} alt="Fluent Theme" /></p>

### How to use

As a first step, [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent/) nuget package needs to be installed.

:::info
On how to add a nuget package, you can follow steps from the NuGet page or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio), [Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html) documentation.
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
If you need to specify theme dark or light variant, please follow [Theme Variants](/docs/ui-development/styling/theme-variants) documentation.
:::

### Changing theme density

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

### Creating custom color palettes

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

### Creating custom color palettes with online editor

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

## Simple

Avalonia Simple theme is specifically designed to be minimal and lightweight, with limited built-in styling. It provides a simple and clean foundation for building custom styles on top. Low visual and structural complexity makes it a perfect choice for applications running on embedded devices.

<Image light={SimpleThemeScreenshot} alt="A screenshot of a user interface, demonstrating the appearances of various UI controls using a simple design theme." position="center" maxWidth={400} cornerRadius="true"/>

### How to use

As a first step, [Avalonia.Themes.Simple](https://www.nuget.org/packages/Avalonia.Themes.Simple/) nuget package needs to be installed. 

:::info
On how to add a nuget package, you can follow steps from the NuGet page or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio), [Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html) documentation.
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
If you need to specify theme dark or light variant, please follow [Theme Variants](/docs/ui-development/styling/theme-variants) documentation.
:::