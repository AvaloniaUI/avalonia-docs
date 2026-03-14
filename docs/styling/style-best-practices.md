---
id: style-best-practices
title: Styling best practices
---

This page collects practical guidelines for writing styles, themes, and templates in Avalonia. Following these patterns helps keep your styling code maintainable and performant.

## Selector specificity

Avalonia evaluates style selectors in declaration order. When two selectors match the same control and set the same property, the later declaration wins. Design your selectors from general to specific:

```xml
<!-- General: applies to all Buttons -->
<Style Selector="Button">
    <Setter Property="Background" Value="#6366F1" />
</Style>

<!-- More specific: applies to Buttons with the .primary class -->
<Style Selector="Button.primary">
    <Setter Property="Background" Value="#2563EB" />
</Style>

<!-- Most specific: applies to primary Buttons that are hovered -->
<Style Selector="Button.primary:pointerover">
    <Setter Property="Background" Value="#3B82F6" />
</Style>
```

Avoid overly broad selectors like `*` or `:is(Control)` as they match every control in the tree and can cause unexpected side effects.

## Use style classes instead of inline properties

Prefer style classes over setting properties directly on controls:

```xml
<!-- Avoid: repeated inline styles -->
<Button Background="#6366F1" Foreground="White" CornerRadius="6" Padding="16,8"
        Content="Save" />
<Button Background="#6366F1" Foreground="White" CornerRadius="6" Padding="16,8"
        Content="Cancel" />

<!-- Prefer: shared style class -->
<Style Selector="Button.action">
    <Setter Property="Background" Value="#6366F1" />
    <Setter Property="Foreground" Value="White" />
    <Setter Property="CornerRadius" Value="6" />
    <Setter Property="Padding" Value="16,8" />
</Style>

<Button Classes="action" Content="Save" />
<Button Classes="action" Content="Cancel" />
```

This reduces duplication and makes it easy to update the appearance in one place.

## Use DynamicResource for theme-aware values

When referencing theme colors, fonts, or dimensions, use `DynamicResource` instead of hard-coded values. This ensures your styles respond to theme changes (light/dark):

```xml
<Style Selector="Button.themed">
    <Setter Property="Background" Value="{DynamicResource SystemAccentColor}" />
    <Setter Property="Foreground" Value="{DynamicResource SystemControlForegroundBaseHighBrush}" />
</Style>
```

Use `StaticResource` only for values that never change at runtime, such as layout constants and custom converters.

## Keep templates minimal

When creating custom templates, bind only the properties your template actually uses. Do not create complex templates for simple visual changes:

```xml
<!-- For a color change, use a style, not a template -->
<Style Selector="Button.custom">
    <Setter Property="Background" Value="Red" />
</Style>

<!-- Only create a template when you need a different visual structure -->
<Style Selector="Button.pill">
    <Setter Property="Template">
        <ControlTemplate>
            <Border Background="{TemplateBinding Background}"
                    CornerRadius="999"
                    Padding="{TemplateBinding Padding}">
                <ContentPresenter Content="{TemplateBinding Content}" />
            </Border>
        </ControlTemplate>
    </Setter>
</Style>
```

## Organize styles by scope

Place styles at the appropriate level in the visual tree:

| Scope | Where to declare | When to use |
|---|---|---|
| Application-wide | `App.axaml` or a `Styles` file referenced from `App.axaml` | Brand colors, typography, default control themes |
| Window/Page-level | `<Window.Styles>` or `<UserControl.Styles>` | Page-specific overrides |
| Control-level | `<Control.Styles>` | Component-specific styles that should not leak out |

```xml
<!-- App.axaml: global styles -->
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://MyApp/Styles/Global.axaml" />
</Application.Styles>
```

```xml
<!-- A page-specific override -->
<UserControl.Styles>
    <Style Selector="TextBlock.page-title">
        <Setter Property="FontSize" Value="28" />
        <Setter Property="FontWeight" Value="Bold" />
    </Style>
</UserControl.Styles>
```

## Avoid !important-style hacks

Avalonia does not have a CSS-like `!important`. If your style is not applying, the issue is usually:

1. **Another style declared later overrides it**: Reorder your styles.
2. **A local value takes precedence**: Local values (set directly on the control) override styled values. Remove the local value or use a style instead.
3. **A control theme overrides it**: Control themes include pseudo-class styles that may have higher specificity.

Use DevTools (F12) to inspect which value source is winning for a given property.

## Naming conventions

Use kebab-case for style classes, matching CSS conventions:

```xml
<!-- Good -->
<Button Classes="btn-primary" />
<Border Classes="card-elevated" />

<!-- Also acceptable: single words -->
<Button Classes="primary" />
```

For template parts, use the `PART_` prefix:

```xml
<Border x:Name="PART_Background" />
<ContentPresenter x:Name="PART_ContentPresenter" />
```

## Transitions for state changes

Add transitions to make pseudo-class state changes feel smooth:

```xml
<Style Selector="Button.smooth">
    <Setter Property="Transitions">
        <Transitions>
            <BrushTransition Property="Background" Duration="0:0:0.15" />
            <DoubleTransition Property="Opacity" Duration="0:0:0.15" />
        </Transitions>
    </Setter>
</Style>
```

Keep transition durations short (100ms to 300ms). Long animations feel sluggish and delay user feedback.

## Test across themes

If your application supports both light and dark themes, test your custom styles in both. Use `ThemeVariant` resources to provide different values per theme:

```xml
<Style Selector="Border.card">
    <Setter Property="Background">
        <Setter.Value>
            <SolidColorBrush x:Key="CardBackground">
                <SolidColorBrush.Color>
                    <OnPlatform Default="White" />
                </SolidColorBrush.Color>
            </SolidColorBrush>
        </Setter.Value>
    </Setter>
</Style>
```

Or use theme-variant resources defined in your `App.axaml`:

```xml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary x:Key="Light">
                <Color x:Key="CardColor">#FFFFFF</Color>
            </ResourceDictionary>
            <ResourceDictionary x:Key="Dark">
                <Color x:Key="CardColor">#1E1E1E</Color>
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

## See also

- [Styles](styles)
- [Style classes](style-classes)
- [Style selectors](style-selectors)
- [Control themes](control-themes)
- [Theme variants](theme-variants)
- [Sharing styles](sharing-styles)
