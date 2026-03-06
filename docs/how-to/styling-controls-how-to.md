---
id: styling-controls-how-to
title: "How to: Style and Theme Controls"
---

This guide covers practical recipes for customizing control appearance: changing colors, creating variants, theming, and building reusable styles.

## Change a Control's Colors

### Using style classes

Define a style class and apply it:

```xml
<Window.Styles>
    <Style Selector="Button.primary">
        <Setter Property="Background" Value="#6366F1" />
        <Setter Property="Foreground" Value="White" />
    </Style>
    <Style Selector="Button.primary:pointerover">
        <Setter Property="Background" Value="#818CF8" />
    </Style>
    <Style Selector="Button.primary:pressed">
        <Setter Property="Background" Value="#4F46E5" />
    </Style>
</Window.Styles>

<Button Classes="primary" Content="Submit" />
```

### Multiple classes

Combine classes for variations:

```xml
<Style Selector="Button.rounded">
    <Setter Property="CornerRadius" Value="999" />
</Style>
<Style Selector="Button.large">
    <Setter Property="Padding" Value="24,12" />
    <Setter Property="FontSize" Value="16" />
</Style>

<Button Classes="primary rounded large" Content="Submit" />
```

## Create Button Variants

Build a set of button styles for your application:

```xml
<Application.Styles>
    <!-- Base button styles -->
    <Style Selector="Button">
        <Setter Property="CornerRadius" Value="6" />
        <Setter Property="Padding" Value="16,8" />
        <Setter Property="Transitions">
            <Transitions>
                <BrushTransition Property="Background" Duration="0:0:0.15" />
            </Transitions>
        </Setter>
    </Style>

    <!-- Primary variant -->
    <Style Selector="Button.primary">
        <Setter Property="Background" Value="#6366F1" />
        <Setter Property="Foreground" Value="White" />
    </Style>
    <Style Selector="Button.primary:pointerover">
        <Setter Property="Background" Value="#818CF8" />
    </Style>
    <Style Selector="Button.primary:pressed">
        <Setter Property="Background" Value="#4F46E5" />
    </Style>

    <!-- Danger variant -->
    <Style Selector="Button.danger">
        <Setter Property="Background" Value="#EF4444" />
        <Setter Property="Foreground" Value="White" />
    </Style>
    <Style Selector="Button.danger:pointerover">
        <Setter Property="Background" Value="#F87171" />
    </Style>
    <Style Selector="Button.danger:pressed">
        <Setter Property="Background" Value="#DC2626" />
    </Style>

    <!-- Ghost variant (no background) -->
    <Style Selector="Button.ghost">
        <Setter Property="Background" Value="Transparent" />
        <Setter Property="BorderThickness" Value="0" />
    </Style>
    <Style Selector="Button.ghost:pointerover">
        <Setter Property="Background" Value="#10000000" />
    </Style>
</Application.Styles>
```

Usage:

```xml
<StackPanel Orientation="Horizontal" Spacing="8">
    <Button Classes="primary" Content="Save" />
    <Button Classes="danger" Content="Delete" />
    <Button Classes="ghost" Content="Cancel" />
</StackPanel>
```

## Theme-Aware Colors

Use theme dictionaries so colors adapt to light and dark modes:

```xml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="CardBackground" Color="#FFFFFF" />
                <SolidColorBrush x:Key="CardBorder" Color="#E5E7EB" />
                <SolidColorBrush x:Key="TextPrimary" Color="#111827" />
                <SolidColorBrush x:Key="TextSecondary" Color="#6B7280" />
            </ResourceDictionary>
            <ResourceDictionary x:Key="Dark">
                <SolidColorBrush x:Key="CardBackground" Color="#1F2937" />
                <SolidColorBrush x:Key="CardBorder" Color="#374151" />
                <SolidColorBrush x:Key="TextPrimary" Color="#F9FAFB" />
                <SolidColorBrush x:Key="TextSecondary" Color="#9CA3AF" />
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

Reference them with `DynamicResource`:

```xml
<Style Selector="Border.card">
    <Setter Property="Background" Value="{DynamicResource CardBackground}" />
    <Setter Property="BorderBrush" Value="{DynamicResource CardBorder}" />
    <Setter Property="BorderThickness" Value="1" />
    <Setter Property="CornerRadius" Value="8" />
    <Setter Property="Padding" Value="16" />
</Style>
```

## Custom TextBox Appearance

Restyle TextBox to have an underline style instead of a box:

```xml
<Style Selector="TextBox.underline">
    <Setter Property="BorderThickness" Value="0,0,0,2" />
    <Setter Property="BorderBrush" Value="#D1D5DB" />
    <Setter Property="Background" Value="Transparent" />
    <Setter Property="CornerRadius" Value="0" />
    <Setter Property="Padding" Value="0,8" />
</Style>
<Style Selector="TextBox.underline:focus">
    <Setter Property="BorderBrush" Value="#6366F1" />
</Style>
<Style Selector="TextBox.underline:error">
    <Setter Property="BorderBrush" Value="#EF4444" />
</Style>
```

## Card Component

Create a reusable card style:

```xml
<Style Selector="Border.card">
    <Setter Property="Background" Value="{DynamicResource CardBackground}" />
    <Setter Property="BorderBrush" Value="{DynamicResource CardBorder}" />
    <Setter Property="BorderThickness" Value="1" />
    <Setter Property="CornerRadius" Value="8" />
    <Setter Property="Padding" Value="16" />
</Style>

<Style Selector="Border.card-elevated">
    <Setter Property="Background" Value="{DynamicResource CardBackground}" />
    <Setter Property="BoxShadow" Value="0 4 6 0 #15000000" />
    <Setter Property="CornerRadius" Value="8" />
    <Setter Property="Padding" Value="16" />
</Style>
```

```xml
<Border Classes="card">
    <StackPanel Spacing="8">
        <TextBlock Text="Card Title" FontWeight="Bold" />
        <TextBlock Text="Card content here" Foreground="Gray" />
    </StackPanel>
</Border>
```

## Extract Styles to a Shared File

Move reusable styles into a separate `.axaml` file:

```xml title="Styles/ButtonStyles.axaml"
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style Selector="Button.primary">
        <Setter Property="Background" Value="#6366F1" />
        <Setter Property="Foreground" Value="White" />
    </Style>
    <!-- more styles... -->
</Styles>
```

Reference it in `App.axaml`:

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://MyApp/Styles/ButtonStyles.axaml" />
</Application.Styles>
```

## Override Theme Styles

Override built-in Fluent theme styles for specific controls:

```xml
<Application.Styles>
    <FluentTheme />

    <!-- Override all TextBlock to use your preferred font -->
    <Style Selector="TextBlock">
        <Setter Property="FontFamily" Value="Inter, Segoe UI, sans-serif" />
    </Style>

    <!-- Override ComboBox dropdown max height -->
    <Style Selector="ComboBox /template/ Popup#PART_Popup">
        <Setter Property="MaxHeight" Value="300" />
    </Style>
</Application.Styles>
```

## Conditional Styling with Pseudo-Classes

Use pseudo-classes for state-based styling without code:

```xml
<!-- Disabled state -->
<Style Selector="Button:disabled">
    <Setter Property="Opacity" Value="0.5" />
</Style>

<!-- Checked state (ToggleButton, CheckBox, RadioButton) -->
<Style Selector="ToggleButton:checked">
    <Setter Property="Background" Value="#6366F1" />
    <Setter Property="Foreground" Value="White" />
</Style>

<!-- Focus visible (keyboard navigation only) -->
<Style Selector="Button:focus-visible">
    <Setter Property="BorderBrush" Value="#6366F1" />
    <Setter Property="BorderThickness" Value="2" />
</Style>
```

## See Also

- [Styles](/docs/styling/styles): How styles work.
- [Style Selectors](/docs/styling/style-selectors): Selector syntax reference.
- [Style Best Practices](/docs/styling/style-best-practices): Guidelines for maintainable styles.
- [Control Template Walkthrough](/docs/styling/control-template-walkthrough): Building custom templates.
- [Theme Variants](/docs/styling/theme-variants): Light and dark theme support.
