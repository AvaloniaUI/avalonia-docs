---
id: themes
title: Themes
description: Troubleshooting common issues with Avalonia UI themes, including missing control themes, unintended style overrides, and transparent application windows.
doc-type: troubleshooting
---

## My control theme isn't being found

If your custom control theme is not being picked up by Avalonia, verify that the theme returns a [style key](/docs/styling/styles) that matches both the `x:Key` and `TargetType` of your control theme.

Common causes include:

- **Mismatched `x:Key`**: The key you reference in your XAML does not match the key defined in the control theme resource.
- **Wrong `TargetType`**: The `TargetType` on your `ControlTheme` does not match the control you are trying to style.
- **Theme not included**: You have not added a `StyleInclude` or `ResourceInclude` pointing to the file that contains your control theme.

To diagnose the problem, open the [Avalonia DevTools](/docs/guides/developer-guides/developer-tools) at runtime and inspect the `Styles` panel. This shows you which styles and themes are active on the selected control, helping you confirm whether your theme has been loaded and applied.

```xml title="Example: defining and referencing a control theme"
<!-- In your theme file (e.g., MyButtonTheme.axaml) -->
<ControlTheme x:Key="{x:Type Button}" TargetType="Button">
    <Setter Property="Background" Value="SlateBlue" />
    <!-- Additional setters and template here -->
</ControlTheme>

<!-- In App.axaml, include the theme -->
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="/Themes/MyButtonTheme.axaml" />
</Application.Styles>
```

## My control theme is breaking other controls

Many Avalonia controls are composed of other Avalonia controls internally. If you create a style or control theme that targets all controls of a given type, you might get unexpected results because the style applies to every instance of that type in the visual tree, including instances nested inside other controls.

For example, if you create a style that targets `TextBlock` in a `Window`, that style is applied to every `TextBlock` in the window, even those that are part of another control's template (such as a `ListBox` item or a `Button` label).

```xml title="Example: a style that unintentionally affects nested controls"
<Window.Styles>
    <Style Selector="TextBlock">
        <Setter Property="Foreground" Value="Red" />
    </Style>
</Window.Styles>
```

To limit your style to only the controls you intend to affect, use a more specific selector. You can scope by style class, by name, or by nesting context:

```xml title="Example: scoping a style with a class selector"
<Window.Styles>
    <Style Selector="TextBlock.heading">
        <Setter Property="Foreground" Value="Red" />
    </Style>
</Window.Styles>

<!-- Only this TextBlock is affected -->
<TextBlock Classes="heading" Text="Page title" />
```

## Application window is transparent or no content is rendered

If your application window appears transparent or displays no visible content, the most likely cause is that no Avalonia theme has been installed. Avalonia requires a base theme (such as `FluentTheme` or `SimpleTheme`) to provide default control templates and styles. Without one, controls have no visual representation.

To fix this, make sure your `App.axaml` includes a theme:

```xml title="App.axaml"
<Application.Styles>
    <FluentTheme />
</Application.Styles>
```

If you are using a third-party theme, verify that:

- The theme's NuGet package is installed in your project.
- The theme is included in your `Application.Styles` collection.
- The theme is compatible with your version of Avalonia.

If the issue persists with a third-party theme, contact the theme's maintainers for support.

## See also

- [Themes overview](/docs/styling/themes)
- [Styles](/docs/styling/styles)
- [Troubleshooting styles](styles.md)
- [How to use control themes](/docs/styling/control-themes)
- [Developer tools](/docs/guides/developer-guides/developer-tools)
