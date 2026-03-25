---
id: styling-controls-how-to
title: "How to: Style and theme controls"
description: Customize control appearance with colors, variants, themes, and reusable styles in Avalonia.
doc-type: how-to
---

This guide covers practical recipes for customizing control appearance in your Avalonia application, including changing colors, creating variants, theming for light and dark modes, and building reusable styles.

## Change a control's colors

### Using style classes

You can define a style class that targets a control by type and class name, then apply that class in your AXAML markup. The following example creates a `primary` class for [`Button`](/api/avalonia/controls/button) controls that sets the `Background` and `Foreground` properties, along with hover and pressed states:

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

You can combine multiple classes on a single control to layer independent style concerns. Each class contributes its own set of property setters, so you can mix and match them freely:

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

In this example, the `Button` receives styles from the `primary`, `rounded`, and `large` classes simultaneously.

## Create button variants

You can build a consistent set of button variants for your application by defining a base style that applies to all `Button` controls and then adding class-based overrides for each variant. This approach keeps your visual language consistent while giving you flexibility per context:

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

You can then use your variants anywhere in the application:

```xml
<StackPanel Orientation="Horizontal" Spacing="8">
    <Button Classes="primary" Content="Save" />
    <Button Classes="danger" Content="Delete" />
    <Button Classes="ghost" Content="Cancel" />
</StackPanel>
```

## Theme-aware colors

To make your custom colors adapt automatically when the user switches between light and dark modes, define them inside `ThemeDictionaries`. Each dictionary is keyed to `Light` or `Dark`, and Avalonia selects the correct one at runtime:

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

Reference these resources in your styles with `DynamicResource` so the values update when the active theme changes:

```xml
<Style Selector="Border.card">
    <Setter Property="Background" Value="{DynamicResource CardBackground}" />
    <Setter Property="BorderBrush" Value="{DynamicResource CardBorder}" />
    <Setter Property="BorderThickness" Value="1" />
    <Setter Property="CornerRadius" Value="8" />
    <Setter Property="Padding" Value="16" />
</Style>
```

:::tip
Use `DynamicResource` rather than `StaticResource` for theme-dictionary values. `StaticResource` resolves once at load time and will not update when the theme changes.
:::

## Custom `TextBox` appearance

You can restyle `TextBox` to use an underline instead of a full border. The following example sets `BorderThickness` to show only the bottom edge, and changes the color on `:focus` and `:error` pseudo-classes:

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

## Card component

You can create reusable card styles by applying classes to a `Border` control. The `card` class provides a flat card with a visible border, while `card-elevated` uses `BoxShadow` for a raised appearance:

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

Use your card styles like this:

```xml
<Border Classes="card">
    <StackPanel Spacing="8">
        <TextBlock Text="Card Title" FontWeight="Bold" />
        <TextBlock Text="Card content here" Foreground="Gray" />
    </StackPanel>
</Border>
```

## Extract styles to a shared file

When your styles grow beyond a few declarations, you can move them into a separate `.axaml` file. This keeps your `App.axaml` clean and makes the styles reusable across projects:

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

Then reference the file in your `App.axaml` using `StyleInclude`. The `avares://` URI scheme points to an embedded resource in your assembly:

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://MyApp/Styles/ButtonStyles.axaml" />
</Application.Styles>
```

## Override theme styles

Your application styles are applied after the built-in theme, so you can override any default appearance. Place your overrides after `<FluentTheme />` in `Application.Styles` to ensure they take precedence:

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

The `/template/` selector lets you reach into a control's template to target internal parts. In this case, it targets the `Popup` named `PART_Popup` inside the `ComboBox` template.

## Conditional styling with pseudo-classes

Pseudo-classes let you apply styles based on a control's current state without writing any code-behind. Avalonia evaluates pseudo-class selectors automatically as the control state changes:

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

Common pseudo-classes include `:pointerover`, `:pressed`, `:disabled`, `:focus`, `:focus-visible`, `:checked`, and `:error`. For a complete list, see [Pseudo-classes](/docs/styling/pseudoclasses).

## See also

- [Styles](/docs/styling/styles)
- [Style Classes](/docs/styling/style-classes)
- [Style Selectors](/docs/styling/style-selectors)
- [Pseudo-classes](/docs/styling/pseudoclasses)
- [Style Best Practices](/docs/styling/style-best-practices)
- [Sharing Styles](/docs/styling/sharing-styles)
- [Control Template Walkthrough](/docs/styling/control-template-walkthrough)
- [Theme Variants](/docs/styling/theme-variants)
