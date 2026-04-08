---
id: themevariantscope
title: ThemeVariantScope
description: A primitive control that overrides the active theme variant (light or dark) for a section of the visual tree.
doc-type: reference
---

The [`ThemeVariantScope`](/api/avalonia/controls/themevariantscope) control overrides the active theme variant (light or dark) for a section of your visual tree. All controls placed inside a `ThemeVariantScope` use the specified variant, regardless of the application or window setting. This is useful when you need part of your UI to display in a different theme from the rest of the application.

## Common use cases

- Forcing a sidebar or panel to always render in dark mode while the rest of your app uses light mode.
- Displaying a side-by-side preview of both theme variants on a settings page.
- Creating contrasting regions in your layout for visual emphasis.

## Useful properties

| Property | Type | Description |
|---|---|---|
| `RequestedThemeVariant` | `ThemeVariant` | The theme variant to apply within this scope. Values: `Light`, `Dark`, `Default`. Setting `Default` resets to the inherited variant. |
| `ActualThemeVariant` | `ThemeVariant` | Read-only. The theme variant currently in effect within this scope. |

## Basic example

You can force a section of the UI to use the light theme while the rest of the window uses the dark theme:

```xml
<Window RequestedThemeVariant="Dark">
    <StackPanel Spacing="8" Margin="16">
        <Button Content="Dark-themed button" />

        <ThemeVariantScope RequestedThemeVariant="Light">
            <StackPanel Spacing="8">
                <Button Content="Light-themed button" />
                <TextBox PlaceholderText="Light-themed input" />
            </StackPanel>
        </ThemeVariantScope>
    </StackPanel>
</Window>
```

## Side-by-side theme preview

A common use case is displaying both theme variants at the same time, for example on a theme settings page:

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

## Resetting to the inherited variant

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

## Nesting scopes

You can nest `ThemeVariantScope` controls to create multiple themed regions. Each scope resolves its variant independently, so a child scope overrides whatever its parent scope set:

```xml
<ThemeVariantScope RequestedThemeVariant="Dark">
    <!-- Everything here uses the dark variant -->
    <StackPanel Spacing="8">
        <Button Content="Dark button" />

        <ThemeVariantScope RequestedThemeVariant="Light">
            <!-- This region switches to light -->
            <Button Content="Light button inside dark scope" />
        </ThemeVariantScope>
    </StackPanel>
</ThemeVariantScope>
```

## Theme-aware resources

Resources defined in `ThemeDictionaries` respond to `ThemeVariantScope`. Each scope resolves its own variant independently, so the same `DynamicResource` key can return different values depending on which scope it appears in:

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

## Setting the variant from code

You can change the variant at runtime by setting `RequestedThemeVariant` in your code-behind:

```csharp
myScope.RequestedThemeVariant = ThemeVariant.Dark;
```

You can also bind the property to a view model so that your users can toggle themes dynamically:

```xml
<ThemeVariantScope RequestedThemeVariant="{Binding SelectedTheme}">
    <ContentControl Content="{Binding CurrentPage}" />
</ThemeVariantScope>
```

```csharp
public class MainViewModel : ViewModelBase
{
    private ThemeVariant _selectedTheme = ThemeVariant.Default;

    public ThemeVariant SelectedTheme
    {
        get => _selectedTheme;
        set => this.RaiseAndSetIfChanged(ref _selectedTheme, value);
    }
}
```

## See also

- [Theme variants](/docs/styling/theme-variants): Full guide to light/dark theme support and theme dictionaries.
- [How to switch themes](/docs/how-to/theme-switching-how-to): Implementing a theme toggle in your application.
- [Resources](/docs/app-development/resources): Overview of the resource system.
