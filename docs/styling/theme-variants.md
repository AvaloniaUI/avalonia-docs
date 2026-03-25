---
id: theme-variants
title: Setting theme variants
---

import OverriddenThemeVariant from '/img/guides/ui-development/overridden-theme-variant.png';
import CustomThemeDictionaries from '/img/guides/ui-development/custom-theme-dictionaries.png';

:::tip
Because theme variants are deeply integrated into the resource system, it is important to understand Avalonia [resources](../app-development/resource-dictionary).
:::

## Introduction

In Avalonia, a *theme variant* refers to a specific visual appearance of a control based on a chosen theme.

By using theme variants, you can create visually appealing and consistent user interfaces that adapt to different user preferences or system settings. For example, an application may provide a light theme variant with a white background and black text, as well as a dark theme variant with a black background and white text. The user can choose their preferred theme, and the application adjusts its appearance accordingly.

Avalonia's built-in themes, `SimpleTheme` and `FluentTheme`, support `Dark` and `Light` variants without extra code. This allows applications to adapt dynamically based on system preferences while using built-in controls. For advanced customization, this page explains how to define custom variant-dependent resources and reference them.

## Switching current theme variant

By default, Avalonia inherits the theme variant set by the system-wide user preference.
Your application has control over theme variants through two important properties: [ActualThemeVariant](#actualthemevariant-property) and [RequestedThemeVariant](#requestedthemevariant-property). These properties allow you to manage and switch theme variants at different levels within your application.

### `ActualThemeVariant` property

The `ActualThemeVariant` read-only property retrieves the UI theme currently in use by a control, window, or application. It represents the theme variant that is actively applied to the element.
This property is available on each control and is inherited down the tree. Its value is also used by the styling system when accessing theme dictionaries.

### `RequestedThemeVariant` property

The `RequestedThemeVariant` property allows you to override the theme variant and specify a desired variant for an `Application`, `Window` (`TopLevel`), or [`ThemeVariantScope`](/api/avalonia/controls/themevariantscope).

To override global application variant instead of using system default:
```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App"
    // highlight-start
             RequestedThemeVariant="Dark">
    // highlight-end
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

You can also redefine the theme variant for a specific subtree using the `ThemeVariantScope` control. In the example below, the window uses the Dark variant, while the `ThemeVariantScope` inside redefines it with the Light variant:

```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x='http://schemas.microsoft.com/winfx/2006/xaml'
        x:Class="AvaloniaApplication.MainWindow"
    // highlight-start
        RequestedThemeVariant="Dark"
    // highlight-end
        Background="Gray">
  <StackPanel Spacing="5" Margin="5">
    <Button Content="Dark button" />
    // highlight-start
    <ThemeVariantScope RequestedThemeVariant="Light">
    // highlight-end
      <Button Content="Light button" />
    </ThemeVariantScope>
  </StackPanel>
</Window>
```

<Image light={OverriddenThemeVariant} alt="A screenshot of two buttons, demonstrating opposite appearances when dark or light theme settings are overridden." position="center" maxWidth={400} cornerRadius="true"/>

To reset the `RequestedThemeVariant` value, set `RequestedThemeVariant="Default"`.

:::tip
Changing a window's `RequestedThemeVariant` also affects window decoration variants on platforms where this is supported.
:::

## Defining and referencing custom variant specific resources

In Avalonia, theme-variant-specific resources can be defined in a `ResourceDictionary` using the `ThemeDictionaries` property.

Typically, developers use `Light` or `Dark` as the key for the theme variants. Using `Default` as the key marks this specific theme dictionary as a fallback in case the theme variant or resource key is not found in other theme dictionaries.

Continuing previous example, let's add `BackgroundBrush` and `ForegroundBrush` with different values per theme variant:
```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x='http://schemas.microsoft.com/winfx/2006/xaml'
        x:Class="Sandbox.MainWindow"
        RequestedThemeVariant="Dark"
        Background="Gray">
  <Window.Resources>
    // highlight-start
    <ResourceDictionary>
      <ResourceDictionary.ThemeDictionaries>
        <ResourceDictionary x:Key='Light'>
          <SolidColorBrush x:Key='BackgroundBrush'>SpringGreen</SolidColorBrush>
          <SolidColorBrush x:Key='ForegroundBrush'>Black</SolidColorBrush>
        </ResourceDictionary>
        <ResourceDictionary x:Key='Dark'>
          <SolidColorBrush x:Key='BackgroundBrush'>DodgerBlue</SolidColorBrush>
          <SolidColorBrush x:Key='ForegroundBrush'>White</SolidColorBrush>
        </ResourceDictionary>
      </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
    // highlight-end
  </Window.Resources>
  
  <Window.Styles>
    // highlight-start
    <Style Selector="Button">
      <Setter Property="Background" Value="{DynamicResource BackgroundBrush}" />
      <Setter Property="Foreground" Value="{DynamicResource ForegroundBrush}" />
    </Style>
    // highlight-end
  </Window.Styles>

  <StackPanel Spacing="5" Margin="5">
    <Button Content="Dark button"
            Background="{DynamicResource BackgroundBrush}"
            Foreground="{DynamicResource ForegroundBrush}" />
    <ThemeVariantScope RequestedThemeVariant="Light">
      <Button Content="Light button"
              Background="{DynamicResource BackgroundBrush}"
              Foreground="{DynamicResource ForegroundBrush}" />
    </ThemeVariantScope>
  </StackPanel>
</Window>

```

<Image light={CustomThemeDictionaries} alt="A screenshot of two brightly colored buttons in blue and green." position="center" maxWidth={400} cornerRadius="true"/>

:::caution
Resources defined in `ThemeDictionaries` are only available when using the `DynamicResource` markup extension. `StaticResource` will not find these resources and will produce an exception at runtime unless a resource with an identical key exists in a non-`ThemeDictionaries` portion of a `ResourceDictionary`.
:::

For more details about using resources, see the [resources](../app-development/resource-dictionary) page.

## See also

- [Resource dictionaries](../app-development/resource-dictionary)
- [Styles](styles)
- [Control themes](control-themes)
