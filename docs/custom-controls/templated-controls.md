---
id: templated-controls
title: How to create templated controls
description: Build lookless templated controls with control themes, template parts, and pseudo-classes.
doc-type: how-to
---

Templated controls are controls whose appearance is defined entirely by a [`ControlTemplate`](/api/avalonia/markup/xaml/templates/controltemplate). This separates the control's visual structure from its behavior, allowing developers and designers to restyle the control without modifying its logic. If you are familiar with WPF, these are sometimes called "lookless" controls because the control class itself contains no rendering code.

Avalonia's built-in controls (such as `Button`, `TextBox`, and `ListBox`) are all templated controls. You can follow the same pattern to build your own.

## Creating a templated control

To create a templated control, define a class that inherits from `TemplatedControl` and register any custom properties using `StyledProperty`.

```csharp
public class ToggleLabel : TemplatedControl
{
    public static readonly StyledProperty<string> LabelTextProperty =
        AvaloniaProperty.Register<ToggleLabel, string>(nameof(LabelText), "Default");

    public string LabelText
    {
        get => GetValue(LabelTextProperty);
        set => SetValue(LabelTextProperty, value);
    }
}
```

This gives you a control with a `LabelText` property but no visual representation yet. The visuals come from a control theme.

## Defining the control theme

Every templated control needs a default `ControlTheme` that contains its `ControlTemplate`. This is typically placed in a resource dictionary such as `Themes/Generic.axaml` and included in your application's resources.

```xml
<ControlTheme x:Key="{x:Type local:ToggleLabel}" TargetType="local:ToggleLabel">
    <Setter Property="Template">
        <ControlTemplate>
            <Border Background="{TemplateBinding Background}" Padding="8">
                <TextBlock Text="{TemplateBinding LabelText}" />
            </Border>
        </ControlTemplate>
    </Setter>
</ControlTheme>
```

Key points:

- `x:Key="{x:Type local:ToggleLabel}"` ensures Avalonia automatically applies this theme to all instances of `ToggleLabel`.
- `TargetType` scopes the theme so that property setters and template bindings resolve against the correct type.
- Inside the `ControlTemplate`, use [`TemplateBinding`](/api/avalonia/data/templatebinding) to bind to properties on the templated control.

## Template parts

Sometimes a templated control needs to interact with specific elements inside its template. By convention, these elements are named with a `PART_` prefix.

Override `OnApplyTemplate` to locate named parts after the template has been applied:

```csharp
protected override void OnApplyTemplate(TemplateAppliedEventArgs e)
{
    base.OnApplyTemplate(e);
    var button = e.NameScope.Find<Button>("PART_Button");
    if (button is not null)
    {
        button.Click += OnButtonClick;
    }
}
```

Because users can replace the control template, always check for `null` when looking up template parts. A custom template may omit parts that the default template provides.

## TemplateBinding details

When you are creating a control template and you want to bind to the templated parent you can use:

```xml
<TextBlock Name="tb" Text="{TemplateBinding Caption}"/>

<!-- Which is the same as -->
<TextBlock Name="tb" Text="{Binding Caption, RelativeSource={RelativeSource TemplatedParent}}"/>
```

Although the two syntaxes shown here are equivalent in most cases, there are some differences:

1.  `TemplateBinding` accepts only a single property rather than a property path, so if you want to bind using a property path you must use the second syntax:

    ```xml
    <!-- This WON'T work as TemplateBinding only accepts single properties -->
    <TextBlock Name="tb" Text="{TemplateBinding Caption.Length}"/>

    <!-- Instead this syntax must be used in this case -->
    <TextBlock Name="tb" Text="{Binding Caption.Length, RelativeSource={RelativeSource TemplatedParent}}"/>
    ```
2.  A `TemplateBinding` only supports `OneWay` mode for performance reasons (this is the [same as WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/advanced/templatebinding-markup-extension#remarks)). This means a `TemplateBinding` is actually equivalent to `{Binding RelativeSource={RelativeSource TemplatedParent}, Mode=OneWay}`. If `TwoWay` binding is required in a control template, the full syntax is needed as shown below. Note that `Binding` will also use the default binding mode unlike `TemplateBinding`.

    ```xml
    {Binding RelativeSource={RelativeSource TemplatedParent}, Mode=TwoWay}
    ```
3. `TemplateBinding` can only be used on `IStyledElement`.

```xml
<!-- This WON'T work as GeometryDrawing is not a IStyledElement. -->
<GeometryDrawing Brush="{TemplateBinding Foreground}"/>

<!-- Instead this syntax must be used in this case. -->
<GeometryDrawing Brush="{Binding Foreground, RelativeSource={RelativeSource TemplatedParent}}"/>
```

## Pseudo-classes

Templated controls can expose visual states through pseudo-classes. This lets theme authors style the control differently based on its state without needing code-behind access.

Set a pseudo-class from your control logic:

```csharp
PseudoClasses.Set(":active", isActive);
```

Then target it in your control theme:

```xml
<Style Selector="^:active">
    <Setter Property="Background" Value="Blue" />
</Style>
```

## See also

- [Defining Properties](defining-properties)
- [Defining Events](defining-events)
- [Control Themes](/docs/styling/control-themes)
- [Control Template Walkthrough](/docs/styling/control-template-walkthrough)
