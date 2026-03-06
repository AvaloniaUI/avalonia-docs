---
id: themevariantscope
title: ThemeVariantScope
---

The `ThemeVariantScope` control overrides the active theme variant (light or dark) for a section of the visual tree. All controls within a `ThemeVariantScope` use the specified variant regardless of the application or window setting.

## Useful Properties

| Property | Type | Description |
|---|---|---|
| `RequestedThemeVariant` | `ThemeVariant` | The theme variant to apply within this scope. Values: `Light`, `Dark`, `Default`. Setting `Default` resets to the inherited variant. |
| `ActualThemeVariant` | `ThemeVariant` | Read-only. The theme variant currently in effect within this scope. |

## Basic Example

Force a section of the UI to use the light theme while the rest of the window uses the dark theme:

```xml
<Window RequestedThemeVariant="Dark">
    <StackPanel Spacing="8" Margin="16">
        <Button Content="Dark-themed button" />

        <ThemeVariantScope RequestedThemeVariant="Light">
            <StackPanel Spacing="8">
                <Button Content="Light-themed button" />
                <TextBox Watermark="Light-themed input" />
            </StackPanel>
        </ThemeVariantScope>
    </StackPanel>
</Window>
```

## Side-by-Side Theme Preview

A common use case is displaying both theme variants at the same time, for example in a theme settings page:

```xml
<Grid ColumnDefinitions="*,*" Margin="16">
    <ThemeVariantScope Grid.Column="0" RequestedThemeVariant="Light">
        <Border Background="{DynamicResource SystemControlBackgroundAltHighBrush}"
                Padding="16" CornerRadius="8">
            <StackPanel Spacing="8">
                <TextBlock Text="Light Theme" FontWeight="SemiBold" />
                <Button Content="Sample Button" />
                <CheckBox Content="Sample Checkbox" IsChecked="True" />
                <Slider Value="60" />
            </StackPanel>
        </Border>
    </ThemeVariantScope>

    <ThemeVariantScope Grid.Column="1" RequestedThemeVariant="Dark">
        <Border Background="{DynamicResource SystemControlBackgroundAltHighBrush}"
                Padding="16" CornerRadius="8">
            <StackPanel Spacing="8">
                <TextBlock Text="Dark Theme" FontWeight="SemiBold" />
                <Button Content="Sample Button" />
                <CheckBox Content="Sample Checkbox" IsChecked="True" />
                <Slider Value="60" />
            </StackPanel>
        </Border>
    </ThemeVariantScope>
</Grid>
```

## Resetting to Inherited Variant

Set `RequestedThemeVariant="Default"` to clear the override and inherit the variant from the parent scope:

```xml
<ThemeVariantScope RequestedThemeVariant="Light">
    <StackPanel>
        <!-- These use the Light variant -->
        <Button Content="Light" />

        <ThemeVariantScope RequestedThemeVariant="Default">
            <!-- These inherit from the window/application -->
            <Button Content="Inherited" />
        </ThemeVariantScope>
    </StackPanel>
</ThemeVariantScope>
```

## Theme-Aware Resources

Resources defined in `ThemeDictionaries` respond to `ThemeVariantScope`. Each scope resolves its own variant independently:

```xml
<Window.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="CardBrush">White</SolidColorBrush>
            </ResourceDictionary>
            <ResourceDictionary x:Key="Dark">
                <SolidColorBrush x:Key="CardBrush">#1E1E1E</SolidColorBrush>
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Window.Resources>
```

```xml
<ThemeVariantScope RequestedThemeVariant="Light">
    <!-- Uses White -->
    <Border Background="{DynamicResource CardBrush}" />
</ThemeVariantScope>

<ThemeVariantScope RequestedThemeVariant="Dark">
    <!-- Uses #1E1E1E -->
    <Border Background="{DynamicResource CardBrush}" />
</ThemeVariantScope>
```

## Setting Variant from Code

You can change the variant at runtime:

```csharp
myScope.RequestedThemeVariant = ThemeVariant.Dark;
```

Or bind it to a view model:

```xml
<ThemeVariantScope RequestedThemeVariant="{Binding SelectedTheme}">
    <ContentControl Content="{Binding CurrentPage}" />
</ThemeVariantScope>
```

## See Also

- [Theme Variants](/docs/styling/theme-variants): Full guide to light/dark theme support and theme dictionaries.
- [How To: Switch Themes](/docs/how-to/theme-switching-how-to): Implementing a theme toggle in your application.
- [Resources](/docs/app-development/resources): Overview of the resource system.
