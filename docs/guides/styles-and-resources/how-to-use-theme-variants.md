---
id: how-to-use-theme-variants
title: How To Use Theme Variants
---

:::tip
Because theme variants are deeply integrated into resources system, it is important to understand the Avalonia [resources](resources) first.
:::

## Introduction

In Avalonia, a `theme variant` refers to a specific visual appearance of control based on a chosen theme. 

By using theme variants, developers can create visually appealing and consistent user interfaces that adapt to different user preferences or system settings. For example, an application may provide a light theme variant with a white background and black text, as well as a dark theme variant with a black background and white text. The user can choose their preferred theme, and the application will adjust its appearance accordingly.

Avalonia's built-in themes, `SimpleTheme` and `FluentTheme`, seamlessly support `Dark` and `Light` variants without extra code. This allows applications to adapt dynamically based on system preferences while using build-in controls. For advanced customization, this documentation explains defining custom variant-dependent resources and their referencing.

## Switching current theme variant

By default, Avalonia inherits theme variant set by user preferences system-wide.
Application has control over theme variants through two important properties: [ActualThemeVariant](#actualthemevariant-property) and [RequestedThemeVariant](#requestedthemevariant-property). These properties allow to manage and switch theme variants at different levels within your application.

### `ActualThemeVariant` Property 

The ActualThemeVariant read-only property is used to retrieve the UI theme currently in use by a control, window, or application. It represents the theme variant that is actively applied to the element.
This property is available on each control and is inherited down the tree. Its value also used by the styling system while accessing `theme dictionaries`.

### `RequestedThemeVariant` Property 

The RequestedThemeVariant property allows to override theme variant and specify a desired variant for a `Application`, `Window` (`TopLevel`) or `ThemeVariantScope`.

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

Or it is possible to redefine theme variant per specific subtree using `ThemeVariantScope` control. In the example below Window uses Dark variant, while ThemeVariantScope inside redefines it with Light variant:
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

![Overriden Theme Variant](/img/basics/user-interface/styling/overriden-theme-variant.png)

If it's required to use reset RequestedThemeVariant value, `RequestedThemeVariant="Default"` value can be set on it.

:::tip
Changing Window RequestedThemeVariant also affects window decorations variant on platform where it is supported.
:::

## Defining and referencing custom variant specific resources

In Avalonia, theme variant specific resources can be defined in the `ResourceDictionary` using the `ThemeDictionaries` property. 

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

![Custom Theme Dictionaries](/img/basics/user-interface/styling/custom-theme-dictionaries.png)

For more details about using resources please follow [How To Use Resources](resources) page.