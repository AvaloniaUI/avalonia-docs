---
id: theme-switching-how-to
title: "How To: Switch Between Light and Dark Themes"
---

This guide covers implementing a light/dark theme toggle, persisting the user's choice, and creating theme-aware resources.

## Setting the Theme Globally

Override the system default at the application level in `App.axaml`:

```xml
<Application RequestedThemeVariant="Dark">
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

## Runtime Theme Switching

Change the theme at runtime from code:

```csharp
if (Application.Current is { } app)
{
    app.RequestedThemeVariant = ThemeVariant.Dark;
}
```

### Toggle command in a view model

```csharp
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

```xml
<ToggleSwitch IsChecked="{Binding IsDarkMode}"
              OnContent="Dark" OffContent="Light" />
```

### Three-way: Light, Dark, System

```csharp
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

```xml
<ComboBox SelectedItem="{Binding ThemeChoice}">
    <ComboBoxItem Content="System" />
    <ComboBoxItem Content="Light" />
    <ComboBoxItem Content="Dark" />
</ComboBox>
```

## Persisting the Theme Choice

Save the user's preference so it applies on next launch:

```csharp
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

See [Data Persistence How-To](/docs/how-to/data-persistence-how-to) for the `SettingsService` implementation.

## Theme-Aware Colors with ThemeDictionaries

Define resources that change based on the active theme:

```xml
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

Use them with `DynamicResource` so they update when the theme changes:

```xml
<Border Background="{DynamicResource CardBackground}"
        BorderBrush="{DynamicResource CardBorder}"
        BorderThickness="1" CornerRadius="8" Padding="16">
    <TextBlock Text="Theme-aware card" Foreground="{DynamicResource TextPrimary}" />
</Border>
```

:::info
Always use `DynamicResource` (not `StaticResource`) for theme-variant resources so values update when the theme switches.
:::

## ThemeVariantScope for Mixed Themes

Force a specific theme on a portion of the UI:

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

## Detecting the Current Theme

Check the active theme variant at runtime:

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

## Responding to Theme Changes

React when the theme changes (for example, to update non-XAML resources):

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

## Custom Theme Variants

Define your own named theme variant beyond Light and Dark:

```csharp
public static readonly ThemeVariant HighContrast = new("HighContrast", ThemeVariant.Light);
```

```xml
<ResourceDictionary.ThemeDictionaries>
    <ResourceDictionary x:Key="HighContrast">
        <SolidColorBrush x:Key="CardBackground" Color="Black" />
        <SolidColorBrush x:Key="TextPrimary" Color="Yellow" />
    </ResourceDictionary>
</ResourceDictionary.ThemeDictionaries>
```

## See Also

- [Theme Variants](/docs/styling/theme-variants): Full reference for theme variant system.
- [Resource Dictionary](/docs/app-development/resource-dictionary): Resource lookup and merging.
- [Themes](/docs/styling/themes): FluentTheme and SimpleTheme configuration.
- [Data Persistence How-To](/docs/how-to/data-persistence-how-to): Saving settings across sessions.
