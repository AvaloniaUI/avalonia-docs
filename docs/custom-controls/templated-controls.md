---
id: templated-controls
title: Templated controls
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

Every templated control must have a default `ControlTheme` that contains its `ControlTemplate`. This control theme is typically specified in a theme file, which can included in your application resources in `App.axaml` using `ResourceInclude`.

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

- `x:Key="{x:Type local:ToggleLabel}"` instructs Avalonia to apply the default theme to all instances of `ToggleLabel`.
- To add an alternative look that you can apply to selected instances of the control, add a string key, e.g., `x:Key="CompactToggleLabel"`. Individual instances of `ToggleLabel` can then use the alternative by setting `Theme="{StaticResource CompactToggleLabel}"`. See [control theme lookup](/docs/styling/control-themes#control-theme-lookup) for more information.
- `TargetType` scopes the theme, so that property setters and template bindings resolve against the correct type.
- Inside the `ControlTemplate`, use [`TemplateBinding`](/api/avalonia/data/templatebinding) to bind to properties on the templated control.

## Template parts

Sometimes, a templated control needs to interact with specific elements in its template from code. You can specify these elements by defining them as [`TemplatePart`](/api/avalonia/controls/metadata/templatepartattribute). By convention, template parts are named with the `PART_` prefix.

### Declaring parts

Apply the [`TemplatePart`](/api/avalonia/controls/metadata/templatepartattribute) attribute to the control class. Create one `TemplatePart` for each element that should be recognized as an individual part.

```csharp
[TemplatePart("PART_Button", typeof(Button), IsRequired = true)]
[TemplatePart("PART_Label", typeof(TextBlock))]
public class ToggleLabel : TemplatedControl
{
    // Templated control behavior and logic
}
```

Each declaration carries three values:

| Value | Meaning |
| --- | --- |
| `Name` | `x:Name` that the element uses. Must begin with the `PART_` prefix. |
| `Type` | Control type of the element, e.g., `Button`, `Panel`. |
| `IsRequired` | Whether the part is mandatory for the template. Defaults to `false`. |

:::note
Declarations are inherited, so a control deriving from `ToggleLabel` would inherit its parts.
:::

### Retrieving parts in code

Override `OnApplyTemplate` to locate parts after the template has been applied:

- [`Get<T>`](/api/avalonia/controls/namescopeextensions) for a required part
- [`Find<T>`](/api/avalonia/controls/namescopeextensions) for an optional part

`Get` throws a `NotFound` exception if the target part is missing. `Find` returns `null` if the target part is missing. Both `Get` and `Find` throw an `InvalidOperation` exception if the target part is present but is incompatible with the declared control `Type`.

```csharp
private Button? _button;
private TextBlock? _label;

protected override void OnApplyTemplate(TemplateAppliedEventArgs e)
{
    base.OnApplyTemplate(e);

    if (_button is not null)
    {
        _button.Click -= OnButtonClick;
    }

    // Required part: Get throws if the template does not provide it.
    _button = e.NameScope.Get<Button>("PART_Button");
    _button.Click += OnButtonClick;

    // Optional part: Find returns null if the template does not provide it.
    _label = e.NameScope.Find<TextBlock>("PART_Label");
}
```

:::tip
See the [`ToggleSwitch` source code](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls/ToggleSwitch.cs) for an example of both `Get<T>` and `Find<T>` in use.
:::

## `TemplateBinding`

Use `TemplateBinding` if you are creating a control template and you want to bind to the templated parent.

```xml
<TextBlock Name="tb" Text="{TemplateBinding Caption}"/>

<!-- Which is the same as -->
<TextBlock Name="tb" Text="{Binding Caption, RelativeSource={RelativeSource TemplatedParent}}"/>
```

Although the two syntaxes are equivalent in most cases, there are four differences:

1.  `TemplateBinding` accepts only a single property, rather than a property path. If you want to bind using a property path, you must use the longer syntax:

    ```xml
    <!-- This WON'T work -->
    <TextBlock Name="tb" Text="{TemplateBinding Caption.Length}"/>

    <!-- Instead, use this syntax for the property path -->
    <TextBlock Name="tb" Text="{Binding Caption.Length, RelativeSource={RelativeSource TemplatedParent}}"/>
    ```

2.  `TemplateBinding` supports `OneWay` and `TwoWay` modes. `OneTime` and `OneWayToSource` modes are not supported. The default is `OneWay`. Request `TwoWay` explicitly if you need the value written back to the templated parent. (**Note:** This differs from WPF, where [`TemplateBinding` is `OneWay` only](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/advanced/templatebinding-markup-extension#remarks).)

    ```xml
    <!-- Writes the slider's value back to the templated parent -->
    <Slider Value="{TemplateBinding Value, Mode=TwoWay}"/>
    ```

3. `TemplateBinding` can only be used on a `StyledElement`. (**Warning:** If used on a property that is not a `StyledElement`, the binding fails without logging an error, and the property keeps its default value.)

    ```xml
    <!-- This WON'T work because GeometryDrawing is not a StyledElement -->
    <GeometryDrawing Brush="{TemplateBinding AccentBrush}"/>
    
    <!-- Instead, use the longer syntax -->
    <GeometryDrawing Brush="{Binding AccentBrush, RelativeSource={RelativeSource TemplatedParent}}"/>
    ```

## Pseudoclasses

Templated controls can expose visual states through [pseudoclasses](/api/avalonia/controls/metadata/pseudoclassesattribute). This lets theme authors style the control differently based on its state, without needing code-behind access.

### Declaring pseudoclasses

Apply [`PseudoClasses`](/api/avalonia/controls/metadata/pseudoclassesattribute) to the control class to declare which ones your control uses. Pseudoclass names must include the leading `:`.

```csharp
[PseudoClasses(":active", ":dragging")]
public class ToggleLabel : TemplatedControl
{
    // Templated control behavior and logic
}
```

### Setting pseudoclasses in code

Set the pseudoclass state in your control logic.

```csharp
PseudoClasses.Set(":active", isActive);
```

Then, target the pseudoclass in your control theme. Nest the `Style` inside the `ControlTheme` so that `^` resolves to the control.

```xml
<ControlTheme x:Key="{x:Type local:ToggleLabel}" TargetType="local:ToggleLabel">
    <Setter Property="Template">
        <!-- ControlTemplate as above -->
    </Setter>

    <Style Selector="^:active">
        <Setter Property="Background" Value="Blue" />
    </Style>
</ControlTheme>
```

## See also

- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
- [Defining events](/docs/custom-controls/defining-events): Add routed events to a custom control.
- [Control themes](/docs/styling/control-themes): How control themes define the appearance of a templated control.
- [Control template walkthrough](/docs/styling/control-template-walkthrough): A worked example of a control template.
- [Pseudoclasses](/docs/styling/pseudoclasses): How pseudoclasses expose control state to styles.
- [Creating custom controls](/docs/custom-controls): Overview of the custom control types.
- [`TemplatePartAttribute`](/api/avalonia/controls/metadata/templatepartattribute): API reference for declaring template parts.
- [`PseudoClassesAttribute`](/api/avalonia/controls/metadata/pseudoclassesattribute): API reference for declaring pseudoclasses.
