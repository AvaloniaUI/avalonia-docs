---
id: defining-properties
title: Defining properties for custom controls
sidebar_label: Defining properties
description: Define styled, direct or attached properties on your custom Avalonia controls.
doc-type: how-to
---

import DefiningPropertyPreviewScreenshot from '/img/custom-controls/defining-property-preview.png';

When creating a custom control, you can give it the following types of properties. This page walks you through registering and using each type, so you can choose the right ones for your control.

1. [Styled property](#styled-properties): Set by the Avalonia styling system.
2. [Direct property](#direct-properties): Has a backing C# field, supports data binding.
3. [Attached property](#attached-properties): Hosted in a separate container class, then configured in XAML.

## Styled properties

A styled property stores its value inside the Avalonia property system, not a backing field. As a result, styled properties can participate in styling, animations and value precedence. Use a styled property when you want to allow users to style or animate the property.

:::info
For more information on using styles in Avalonia, see the [Styles](/docs/styling/styles) guide.
:::

### Naming conventions

The static field must follow the pattern `[PropertyName]Property`, e.g., `BackgroundProperty`, `FontWeightProperty`. Avalonia uses this convention to map XAML attributes to properties automatically.

Failure to follow this naming convention may result in "Unable to find suitable setter or adder for property" errors during compilation.

```csharp
public static readonly StyledProperty<double> CornerRadiusProperty = ...
```

```xml
<local:MyControl CornerRadius="8" />
```

### Registering a styled property

To register a styled property:

1. Add a `static readonly` field of type `StyledProperty<T>`.
2. Use the method `AvaloniaProperty.Register` to register.
3. Provide a CLR getter and setter that call `GetValue` and `SetValue` respectively.

The following example registers a `CornerRadius` styled property with a default value of `0.0`:

```csharp
public class MyControl : Control
{
    public static readonly StyledProperty<double> CornerRadiusProperty =
        AvaloniaProperty.Register<MyControl, double>(nameof(CornerRadius), defaultValue: 0.0);

    public double CornerRadius
    {
        get => GetValue(CornerRadiusProperty);
        set => SetValue(CornerRadiusProperty, value);
    }
}
```

The `Register` method accepts these optional parameters:

| Parameter | Description |
|---|---|
| `name` | The property name. Must match the CLR property name. |
| `defaultValue` | The default value of the property. |
| `inherits` | Whether the value inherits down the visual tree. |
| `defaultBindingMode` | The default binding mode (`OneWay`, `TwoWay`, `OneTime`, or `OneWayToSource`). |
| `validate` | A function that returns `false` for values that should be rejected. |
| `coerce` | A function that adjusts the value before it is applied. |

### Reusing an existing styled property

If another control already defines a property you wish to use (e.g., `Background` on `Border`), you can use `AddOwner` instead of registering a new property. By doing so, the properties share a single property identity, meaning styles targeting the property work on all controls that share it.

```csharp
public class MyCustomControl : Control
{
    public static readonly StyledProperty<IBrush?> BackgroundProperty =
        Border.BackgroundProperty.AddOwner<MyCustomControl>();

    public IBrush? Background
    {
        get => GetValue(BackgroundProperty);
        set => SetValue(BackgroundProperty, value);
    }
}
```

### Styling a custom property

Once a styled property is registered, users can target it in XAML to set its style. The following example sets the `Background` of a custom control through a style:

<Tabs>

<TabItem value="xaml" label="MainWindow.axaml">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">

  <Window.Styles>
    <Style Selector="cc|MyCustomControl">
      <Setter Property="Background" Value="Yellow"/>
    </Style>
  </Window.Styles>

  <cc:MyCustomControl Height="200" Width="300"/>

</Window>
```

</TabItem>

<TabItem value="csharp" label="MyCustomControl.cs">

```csharp
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;

namespace AvaloniaCCExample.CustomControls
{
    public class MyCustomControl : Control
    {
        public static readonly StyledProperty<IBrush?> BackgroundProperty =
            Border.BackgroundProperty.AddOwner<MyCustomControl>();

        public IBrush? Background
        {
            get { return GetValue(BackgroundProperty); }
            set { SetValue(BackgroundProperty, value); }
        }

        public sealed override void Render(DrawingContext context)
        {
            if (Background != null)
            {
                var renderSize = Bounds.Size;
                context.FillRectangle(Background, new Rect(renderSize));
            }
            base.Render(context);
        }
    }
}
```

</TabItem>

</Tabs>

<Image light={DefiningPropertyPreviewScreenshot} alt="Preview of a custom control with a defined property" position="center" maxWidth={400} cornerRadius="true"/>

## Direct properties

A direct property is backed by a conventional C# field. It does not participate in styling or animation, but supports data binding and change notifications. Use a direct property when:

- You need a **read-only** property. (Styled properties cannot be read-only.)
- You want **better performance**. (Values of direct properties are read directly from the field.)
- You want a property that **cannot be styled**.

### Registering a direct property

Use `AvaloniaProperty.RegisterDirect`. Provide getter and setter delegates that point to your backing field:

```csharp
public class MyControl : Control
{
    public static readonly DirectProperty<MyControl, string?> StatusProperty =
        AvaloniaProperty.RegisterDirect<MyControl, string?>(
            nameof(Status),
            o => o.Status,
            (o, v) => o.Status = v);

    private string? _status;

    public string? Status
    {
        get => _status;
        set => SetAndRaise(StatusProperty, ref _status, value);
    }
}
```

:::warning
Always use `SetAndRaise` in the CLR setter instead of assigning the backing field directly. `SetAndRaise` updates the field and raises the property-changed notification in a single call. Calling `SetValue` on a direct property will throw an exception.
:::

### Read-only direct properties

To create a read-only property, omit the setter delegate from the registration call and keep the CLR setter `private`:

```csharp
public class MyControl : Control
{
    public static readonly DirectProperty<MyControl, bool> IsActiveProperty =
        AvaloniaProperty.RegisterDirect<MyControl, bool>(
            nameof(IsActive),
            o => o.IsActive);

    private bool _isActive;

    public bool IsActive
    {
        get => _isActive;
        private set => SetAndRaise(IsActiveProperty, ref _isActive, value);
    }
}
```

## Styled vs. direct properties

| Behavior | Styled property | Direct property |
|---|---|---|
| Participates in styling | Yes | No |
| Participates in animations | Yes | No |
| Supports value precedence | Yes | No (single value) |
| Can inherit values | Yes | No |
| Supports coercion | Yes | No |
| Performance | Property store lookup | Direct field access |
| Can be read-only | No | Yes |

## Responding to property changes

For styled and direct properties, you can react to property value changes by overriding `OnPropertyChanged` in your control.

This example demonstrates reacting to a background change by invalidating the visual and thereby updating to the new background.

```csharp
protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
{
    base.OnPropertyChanged(change);

    if (change.Property == BackgroundProperty)
    {
        // Invalidate the visual so the control repaints with the new background.
        InvalidateVisual();
    }
}
```

## Data validation support

Starting from Avalonia v12, data validation is handled automatically when `enableDataValidation` is set to `true`. The framework detects validation errors from `INotifyDataErrorInfo` and displays them without requiring additional overrides in your control.

Data validation works with both `DirectProperty` and `StyledProperty` registrations. When a binding causes a validation error, the control displays it automatically.

This is an example of a custom `TextBox.TextProperty` that reuses `TextBlock.TextProperty`, but adds data validation.

```csharp
public static readonly DirectProperty<TextBox, string?> TextProperty =
    TextBlock.TextProperty.AddOwnerWithDataValidation<TextBox>(
        o => o.Text,
        (o, v) => o.Text = v,
        defaultBindingMode: BindingMode.TwoWay,
        enableDataValidation: true);
```

## Attached properties

An attached property lives in its own container class and is configured on compatible controls in XAML. This allows you to have additional properties that are not part of your custom control's own control class.

### Naming conventions

- Like styled properties, the static field for the attached property follows the pattern `[PropertyName]Property`.
- The name parameter is `[PropertyName]` alone (without the `Property` suffix).

### Registering an attached property

1. Add a new container class inheriting from `AvaloniaObject`.
2. Use the `AvaloniaProperty.RegisterAttached` method to register the attached property.
3. Provide a CLR getter and setter that call `GetValue` and `SetValue` respectively.
4. Further define the behavior of the property, as necessary.

The following example creates an attached property called `IsDimmed` in a standalone file `DimExtensions.cs`. It is a Boolean property that renders a control at 50% opacity when `True`.

```csharp title="DimExtensions.cs"
using Avalonia;
using Avalonia.Controls;

namespace MyApp;

// Attached properties live in a container class that inherits from AvaloniaObject.
public class DimExtensions : AvaloniaObject
{
    // Register the attached property. The type arguments are:
    //    <owner class, type it can be set on, value type>.
    public static readonly AttachedProperty<bool> IsDimmedProperty =
        AvaloniaProperty.RegisterAttached<DimExtensions, Control, bool>("IsDimmed");

    // Provide static getter and setter. The XAML system finds these by name.
    public static void SetIsDimmed(Control element, bool value) =>
        element.SetValue(IsDimmedProperty, value);

    public static bool GetIsDimmed(Control element) =>
        element.GetValue(IsDimmedProperty);

    // React when the value changes.
    static DimExtensions()
    {
        IsDimmedProperty.Changed.AddClassHandler<Control>((control, _) =>
            control.Opacity = GetIsDimmed(control) ? 0.5 : 1.0);
    }
}
```

### Using the attached property in XAML

Declare the namespace in XAML. Then, set the attached property using dot notation.

The following example shows the `IsDimmed` attached property from the previous section applied to two buttons. The second button renders at half opacity because it is given `IsDimmed=True`.

```xml title="MainWindow.axaml"
<StackPanel>
    <Button Content="Normal" />
    <Button Content="Dimmed" local:DimExtensions.IsDimmed="True" />
</StackPanel>
```

## Common pitfalls

- **Mismatched names.** The `name` argument you pass to `Register` must match the CLR property name exactly. A mismatch causes errors at run-time.
- **Using `SetValue` with a direct property.** Direct properties require `SetAndRaise`. Calling `SetValue` throws an `InvalidOperationException`.
- **Adding a backing field for a styled property.** Styled properties store values inside the Avalonia property system. If you read from a local field, you will get stale data. Always use `GetValue` and `SetValue`.
- **Forgetting to call `base.OnPropertyChanged`.** If you override `OnPropertyChanged`, always call the base implementation first so the framework can process the change.

## See also

- [Avalonia property system](/docs/properties): Full reference for styled, direct, and attached properties.
- [Value precedence](/docs/properties/value-precedence): How Avalonia resolves competing property values.
- [Metadata and callbacks](/docs/properties/metadata-and-callbacks): Default values, coercion, and validation.
- [Defining events](/docs/custom-controls/defining-events): Add routed events to your custom controls.
- [Custom control class](/docs/custom-controls/custom-control-class): Base class overview for custom controls.
