---
id: templated-controls
title: Custom templated controls
description: Build lookless templated controls with control themes, template parts, and pseudo-classes.
doc-type: how-to
---

Templated controls contain no rendering code in the control class. Instead, their appearance is defined by a [`ControlTemplate`](/api/avalonia/markup/xaml/templates/controltemplate). This separates the control's visual structure from its behavior, allowing developers and designers to restyle the control without modifying its logic.

If you are familiar with WPF, these are sometimes called "lookless" controls.

Many of Avalonia's built-in controls are templated controls (e.g., `Button`, `TextBox`, and `ListBox`). You can follow the same pattern to build your own.

## Creating a templated control

To create a templated control, add a new control class that inherits from `TemplatedControl` and register your custom properties using `StyledProperty`.

The following example is a templated control with a `LabelText` property, but no visual representation.

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

:::caution Do not set DataContext = this
Never assign `DataContext = this` in a custom control's constructor. This overrides the `DataContext` that your users expect to inherit from the parent visual tree. Bindings set on your control, such as `<MyControl Items="{Binding SelectedItems}" />`, will resolve against the control type instead of the parent's `ViewModel`, causing silent binding failures.

Templated controls do not need a self-referencing `DataContext`. Use [`TemplateBinding`](#templatebinding) inside your control template to access your control's properties, and let the `DataContext` flow from the parent.
:::

## Defining the control theme

Every templated control must have a default `ControlTheme` that contains its `ControlTemplate`. This control theme is typically placed in your application resources in `App.axaml`.

```xml title="App.axaml"
<Application.Resources>
  <ControlTheme x:Key="{x:Type local:ToggleLabel}" TargetType="local:ToggleLabel">
      <Setter Property="Template">
          <ControlTemplate>
              <Border Background="{TemplateBinding Background}" Padding="8">
                  <TextBlock Text="{TemplateBinding LabelText}" />
              </Border>
          </ControlTemplate>
      </Setter>
  </ControlTheme>
</Application.Resources>
```

Notes:

- `x:Key="{x:Type local:ToggleLabel}"` ensures Avalonia automatically applies this theme to all instances of `ToggleLabel`.
- `TargetType` scopes the theme, so that property setters and template bindings resolve against the correct type.
- Inside the `ControlTemplate`, use [`TemplateBinding`](/api/avalonia/data/templatebinding) to bind to properties on the templated control.

## Template parts

Sometimes, a templated control needs to interact with specific elements in its template. By convention, these elements are prefixed with `PART_`.

Override `OnApplyTemplate` to locate named parts after the template has been applied.

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

:::tip
Because users can replace the control template, always check for `null` when looking up template parts. A custom template may omit parts that the default template provides.
:::

## `TemplateBinding`

Use `TemplateBinding` if you are creating a control template and you want to bind to the templated parent.

```xml
<TextBlock Name="tb" Text="{TemplateBinding Caption}"/>

<!-- Which is the same as -->
<TextBlock Name="tb" Text="{Binding Caption, RelativeSource={RelativeSource TemplatedParent}}"/>
```

Although the two syntaxes are equivalent in most cases, there are three differences:

1.  `TemplateBinding` accepts only a single property, rather than a property path. If you want to bind using a property path, you must use the longer syntax:

    ```xml
    <!-- This WON'T work -->
    <TextBlock Name="tb" Text="{TemplateBinding Caption.Length}"/>

    <!-- Instead, use this syntax for the property path -->
    <TextBlock Name="tb" Text="{Binding Caption.Length, RelativeSource={RelativeSource TemplatedParent}}"/>
    ```

2.  A `TemplateBinding` only supports `OneWay` mode for performance reasons. This is the [same as WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/advanced/templatebinding-markup-extension#remarks). A `TemplateBinding` is therefore equivalent to `{Binding RelativeSource={RelativeSource TemplatedParent}, Mode=OneWay}`. If you require `TwoWay` binding in a control template, you must use the full syntax shown below.

    ```xml
    <YourControl YourProperty="{Binding Value, RelativeSource={RelativeSource TemplatedParent}, Mode=TwoWay}"/>
    ```

3. `TemplateBinding` can only be used on a `StyledElement`.

    ```xml
    <!-- This WON'T work because GeometryDrawing is not a StyledElement -->
    <GeometryDrawing Brush="{TemplateBinding Foreground}"/>
    
    <!-- Instead, use the longer syntax -->
    <GeometryDrawing Brush="{Binding Foreground, RelativeSource={RelativeSource TemplatedParent}}"/>
    ```

## Pseudoclasses

Templated controls can expose visual states through pseudoclasses. This lets theme authors style the control differently based on its state, without needing code-behind access.

Set a pseudoclass from your control logic.

```csharp
PseudoClasses.Set(":active", isActive);
```

Then, target it in your control theme.

```xml
<Style Selector="^:active">
    <Setter Property="Background" Value="Blue" />
</Style>
```

## See also

- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
- [Defining events](/docs/custom-controls/defining-events): Add routed events to a custom control.
- [Control themes](/docs/styling/control-themes): How control themes define the appearance of a templated control.
- [Control template walkthrough](/docs/styling/control-template-walkthrough): A worked example of a control template.
- [Pseudoclasses](/docs/styling/pseudoclasses): How pseudoclasses expose control state to styles.
- [Creating custom controls](/docs/custom-controls): Overview of the custom control types.
