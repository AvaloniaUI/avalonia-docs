---
id: theme-switching-how-to
title: "How to: Switch between light and dark themes"
description: Implement a light/dark theme toggle, persist the choice, and create theme-aware resources.
doc-type: how-to
---

This guide shows you how to implement a light/dark theme toggle, persist your user's preference, and create theme-aware resources that respond automatically when the theme changes.

## Setting the theme globally

You can override the system default at the application level by setting `RequestedThemeVariant` in your `App.axaml` file:

```xml title="App.axaml"
<Application RequestedThemeVariant="Dark">
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

The `RequestedThemeVariant` property accepts three values:

- `Default` follows the operating system theme.
- `Light` forces the light theme.
- `Dark` forces the dark theme.

## Switching themes at runtime

To change the theme from code, set `RequestedThemeVariant` on the current `Application` instance:

```csharp
if (Application.Current is { } app)
{
    app.RequestedThemeVariant = ThemeVariant.Dark;
}
```

### Toggle command in a view model

You can bind a `ToggleSwitch` to a view model property so your users can switch between light and dark mode. The following example uses the MVVM Community Toolkit source generators:

```csharp title="SettingsViewModel.cs"
public partial class SettingsViewModel : ObservableObject
{
    [ObservableProperty]
    private bool _isDarkMode;

    partial void OnIsDarkModeChanged(bool value)
    {
        if (Application.Current is { } app)
        {
            app.RequestedThemeVariant = value ? ThemeVariant.Dark : ThemeVariant.Light;
        }
    }
}
```

```xml title="SettingsView.axaml"
<ToggleSwitch IsChecked="{Binding IsDarkMode}"
              OnContent="Dark" OffContent="Light" />
```

### Three-way selection: light, dark, system

If you want to give your users a third option that follows the operating system preference, use a `ComboBox` with three items and map the selection to `ThemeVariant.Default`:

```csharp title="SettingsViewModel.cs"
public partial class SettingsViewModel : ObservableObject
{
    [ObservableProperty]
    private string _themeChoice = "System";

    partial void OnThemeChoiceChanged(string value)
    {
        if (Application.Current is not { } app) return;

        app.RequestedThemeVariant = value switch
        {
            "Light" => ThemeVariant.Light,
            "Dark" => ThemeVariant.Dark,
            _ => ThemeVariant.Default // Follow system
        };
    }
}
```

```xml title="SettingsView.axaml"
<ComboBox SelectedItem="{Binding ThemeChoice}">
    <ComboBoxItem Content="System" />
    <ComboBoxItem Content="Light" />
    <ComboBoxItem Content="Dark" />
</ComboBox>
```

## Persisting the theme choice

To make your user's theme preference survive application restarts, save it during shutdown and restore it during startup. The following example loads a saved preference in your `App.axaml.cs` override:

```csharp title="App.axaml.cs"
public override void OnFrameworkInitializationCompleted()
{
    // Load saved theme
    var settings = new SettingsService().Load();
    RequestedThemeVariant = settings.Theme switch
    {
        "Light" => ThemeVariant.Light,
        "Dark" => ThemeVariant.Dark,
        _ => ThemeVariant.Default
    };

    base.OnFrameworkInitializationCompleted();
}
```

See [Data persistence how-to](/docs/how-to/data-persistence-how-to) for a complete `SettingsService` implementation you can use to read and write user preferences.

## Theme-aware colors with ThemeDictionaries

You can define resources that change automatically based on the active theme. Place a `ResourceDictionary.ThemeDictionaries` block inside your `Application.Resources` with separate dictionaries keyed to `Light` and `Dark`:

```xml title="App.axaml"
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="CardBackground" Color="#FFFFFF" />
                <SolidColorBrush x:Key="CardBorder" Color="#E5E7EB" />
                <SolidColorBrush x:Key="TextPrimary" Color="#111827" />
            </ResourceDictionary>
            <ResourceDictionary x:Key="Dark">
                <SolidColorBrush x:Key="CardBackground" Color="#1F2937" />
                <SolidColorBrush x:Key="CardBorder" Color="#374151" />
                <SolidColorBrush x:Key="TextPrimary" Color="#F9FAFB" />
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

Reference these resources with `DynamicResource` so they update when the theme changes:

```xml
<Border Background="{DynamicResource CardBackground}"
        BorderBrush="{DynamicResource CardBorder}"
        BorderThickness="1" CornerRadius="8" Padding="16">
    <TextBlock Text="Theme-aware card" Foreground="{DynamicResource TextPrimary}" />
</Border>
```

:::tip
Always use `DynamicResource` (not `StaticResource`) for theme-variant resources. `StaticResource` resolves once at load time and will not update when your user switches themes.
:::

## ThemeVariantScope for mixed themes

You can force a specific theme on a portion of your UI using `ThemeVariantScope`. This is useful when you want part of a window to remain in a fixed theme regardless of the global setting:

```xml
<StackPanel Spacing="16">
    <!-- This section uses light theme regardless of global setting -->
    <ThemeVariantScope RequestedThemeVariant="Light">
        <Border Background="{DynamicResource SystemRegionColor}" Padding="16" CornerRadius="8">
            <TextBlock Text="Always light theme" />
        </Border>
    </ThemeVariantScope>

    <!-- This section uses dark theme -->
    <ThemeVariantScope RequestedThemeVariant="Dark">
        <Border Background="{DynamicResource SystemRegionColor}" Padding="16" CornerRadius="8">
            <TextBlock Text="Always dark theme" />
        </Border>
    </ThemeVariantScope>
</StackPanel>
```

## Detecting the current theme

You can check the active theme variant at runtime using the `ActualThemeVariant` property. This is useful when you need to apply logic that cannot be expressed in XAML, such as selecting platform-specific assets:

```csharp
if (Application.Current is { } app)
{
    var currentTheme = app.ActualThemeVariant;

    if (currentTheme == ThemeVariant.Dark)
    {
        // Dark mode specific logic
    }
}
```

## Responding to theme changes

Subscribe to the `ActualThemeVariantChanged` event to react when the theme changes. This is useful for updating non-XAML resources such as chart colors, map tiles, or third-party control configurations:

```csharp
if (Application.Current is { } app)
{
    app.ActualThemeVariantChanged += (sender, args) =>
    {
        var isDark = app.ActualThemeVariant == ThemeVariant.Dark;
        // Update chart colors, map tiles, and similar resources
    };
}
```

## Custom theme variants

You can define your own named theme variants beyond `Light` and `Dark`. Create a new `ThemeVariant` and specify a fallback variant that Avalonia uses for any resources you have not explicitly defined:

```csharp
public static readonly ThemeVariant HighContrast = new("HighContrast", ThemeVariant.Light);
```

Then add a matching `ThemeDictionary` entry keyed to your custom variant name:

```xml
<ResourceDictionary.ThemeDictionaries>
    <ResourceDictionary x:Key="HighContrast">
        <SolidColorBrush x:Key="CardBackground" Color="Black" />
        <SolidColorBrush x:Key="TextPrimary" Color="Yellow" />
    </ResourceDictionary>
</ResourceDictionary.ThemeDictionaries>
```

To activate your custom variant, assign it to `RequestedThemeVariant` just as you would with the built-in variants:

```csharp
app.RequestedThemeVariant = HighContrast;
```

## See also

- [Theme variants](/docs/styling/theme-variants): Full reference for the theme variant system.
- [Resource dictionary](/docs/app-development/resource-dictionary): How resource lookup and merging work.
- [Themes](/docs/styling/themes): `FluentTheme` and `SimpleTheme` configuration.
- [Data persistence how-to](/docs/how-to/data-persistence-how-to): Saving settings across sessions.
