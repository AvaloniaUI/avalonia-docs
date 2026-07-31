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

```csharp title="C#"
public static readonly StyledProperty<double> CornerRadiusProperty = ...
```

```xml title="XAML"
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

:::warning
The CLR property getter/setter must **only** call `GetValue` and `SetValue`. Avoid adding other methods, because some property changes do not use the CLR property.
:::

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

This example demonstrates reacting to a background change by [invalidating the visual](/docs/custom-controls/custom-drawn-controls#manual-invalidation) and thereby updating to the new background.

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

Data validation lets your control display an error when a bound property is detected as invalid.

Starting from [Avalonia v12](/docs/avalonia12-breaking-changes), properties registered with `enableDataValidation: true` report validation errors automatically. In earlier versions, you would also have to override `UpdateDataValidation` and call `DataValidationErrors.SetError`. That override is no longer needed, and you should remove it if you used it in a custom control made with an earlier version of Avalonia.

To add data validation to a custom control:

1. Register the property with `enableDataValidation: true`.
2. Place a [`DataValidationErrors`](/api/avalonia/controls/datavalidationerrors) control in the control template, so the errors have somewhere to appear.
3. Optionally, style the `:error` pseudoclass to change the control's appearance when there is a data validation error.

For more information on data validation in Avalonia in general, see [Validation in data binding](/docs/data-binding/binding-validation).

### Enabling data validation on a property

`enableDataValidation` works with both [styled properties](#styled-properties) and [direct properties](#direct-properties). It is set the same way whether you are registering a new property with `Register` or reusing an existing property with `AddOWner`.

:::warning
You must set `BindingMode.TwoWay` on the property. Data validation works by returning the value to the binding source.
:::

```csharp
public static readonly StyledProperty<int> ValueProperty =
    AvaloniaProperty.Register<QuantityStepper, int>(nameof(Value),
        defaultValue: 1,
        // highlight-next-line
        defaultBindingMode: BindingMode.TwoWay,
        enableDataValidation: true);
```

### Displaying errors with `DataValidationErrors`

To display data validation errors to the user, wrap your custom control in a [`DataValidationErrors`](/api/avalonia/controls/datavalidationerrors) control. `DataValidationErrors` is a `ContentControl` that provides attached properties to handle error states.

Use `DataValidationErrors` within `<UserControl>` for [user controls](/controls/primitives/usercontrol), or within `<ControlTemplate>` for [templated controls](/docs/custom-controls/templated-controls).

```xml
<ControlTemplate> / <UserControl>
  <DataValidationErrors>
    <!-- your control's visuals -->
  </DataValidationErrors>
</ControlTemplate> / </UserControl>
```

While a control has errors, `DataValidationErrors` sets the `:error` pseudoclass. Target the pseudoclass with a `Style` to customize how the control should look when in an error state.

<Tabs>

<TabItem value="usercontrol" label="User control example">

```xml
<UserControl.Styles>
    <Style Selector="local|MyCustomControl:error Border#Frame">
        <Setter Property="BorderBrush" Value="Red" />
    </Style>
</UserControl.Styles>
```

</TabItem>

<TabItem value="templatedcontrol" label="Templated control example">

```xml
<ControlTheme>
    <Style Selector="^:error /template/ Border#PART_Border">
        <Setter Property="BorderBrush" Value="Red" />
    </Style>
</ControlTheme>
```

</TabItem>

</Tabs>

### Data validation example

The following example creates `QuantitySelector`, a control that sets a numeric value using **+** and **-** buttons. `Value` is a styled property with data validation enabled. It is bound to a view model that rejects quantities outside the range of 1–10. If a invalid value is set, the error state triggers. The control's border turns red, and an error message appears under the control.

<Tabs>

<TabItem value="control" label="QuantityStepper.cs">

```csharp
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Primitives;
using Avalonia.Data;

namespace MyApp;

public class QuantityStepper : TemplatedControl
{
    // enableDataValidation opts this property into the data validation pipeline.
    // TwoWay binding lets the value reach the source, which is what triggers validation.
    public static readonly StyledProperty<int> ValueProperty =
        AvaloniaProperty.Register<QuantityStepper, int>(
            nameof(Value),
            defaultValue: 1,
            defaultBindingMode: BindingMode.TwoWay,
            enableDataValidation: true);

    public int Value
    {
        get => GetValue(ValueProperty);
        set => SetValue(ValueProperty, value);
    }

    protected override void OnApplyTemplate(TemplateAppliedEventArgs e)
    {
        base.OnApplyTemplate(e);

        if (e.NameScope.Find<Button>("PART_Decrease") is { } decrease)
            decrease.Click += (_, _) => Value--;

        if (e.NameScope.Find<Button>("PART_Increase") is { } increase)
            increase.Click += (_, _) => Value++;
    }
}
```

</TabItem>

<TabItem value="theme" label="App.axaml">

```xml
<Application.Resources>
  <ControlTheme x:Key="{x:Type local:QuantityStepper}" TargetType="local:QuantityStepper">
    <Setter Property="Template">
      <ControlTemplate>
        <!-- DataValidationErrors displays the errors recorded against this control. -->
        <DataValidationErrors>
          <Border Name="PART_Border"
                  BorderBrush="Gray" BorderThickness="1"
                  CornerRadius="4" Padding="4">
            <StackPanel Orientation="Horizontal" Spacing="8">
              <Button Name="PART_Decrease" Content="-" Width="32"/>
              <TextBlock Text="{TemplateBinding Value}"
                         MinWidth="24" TextAlignment="Center"
                         VerticalAlignment="Center"/>
              <Button Name="PART_Increase" Content="+" Width="32"/>
            </StackPanel>
          </Border>
        </DataValidationErrors>
      </ControlTemplate>
    </Setter>

    <!-- The :error pseudoclass is set automatically while the control has errors. -->
    <Style Selector="^:error /template/ Border#PART_Border">
      <Setter Property="BorderBrush" Value="Red"/>
    </Style>
  </ControlTheme>
</Application.Resources>
```

</TabItem>

<TabItem value="viewmodel" label="OrderViewModel.cs">

```csharp
using System;
using System.Collections;
using System.ComponentModel;

namespace MyApp;

public class OrderViewModel : INotifyPropertyChanged, INotifyDataErrorInfo
{
    private int _quantity = 1;

    public int Quantity
    {
        get => _quantity;
        set
        {
            if (_quantity == value)
                return;

            _quantity = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Quantity)));

            // Tell the binding to re-read the errors for this property.
            ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(nameof(Quantity)));
        }
    }

    public bool HasErrors => _quantity is < 1 or > 10;

    public IEnumerable GetErrors(string? propertyName)
    {
        if (propertyName == nameof(Quantity) && HasErrors)
            return new[] { "Quantity must be between 1 and 10." };

        return Array.Empty<string>();
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    public event EventHandler<DataErrorsChangedEventArgs>? ErrorsChanged;
}
```

</TabItem>

<TabItem value="window" label="MainWindow.axaml">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="using:MyApp"
        x:Class="MyApp.MainWindow"
        x:DataType="local:OrderViewModel"
        Title="Data validation">

  <Window.DataContext>
    <local:OrderViewModel/>
  </Window.DataContext>

  <StackPanel Margin="20" Spacing="8">
    <TextBlock Text="Quantity (1-10):"/>
    <local:QuantityStepper Value="{Binding Quantity}" HorizontalAlignment="Left"/>
  </StackPanel>

</Window>
```

</TabItem>

</Tabs>

:::warning
This window sets its own `DataContext` in XAML so the example is self-contained. The MVVM project template instead assigns one in `App.axaml.cs`:

```csharp
desktop.MainWindow = new MainWindow
{
    DataContext = new MainWindowViewModel(),
};
```

That assignment runs after the XAML is loaded, so it replaces the `OrderViewModel` declared above. The compiled binding still expects `OrderViewModel`, and you get an `InvalidCastException` at run-time:

```
System.InvalidCastException: Unable to cast object of type
'MyApp.ViewModels.MainWindowViewModel' to type 'MyApp.OrderViewModel'.
```

To use this example in a template-generated project, expose the validated property from your existing main view model and drop the `Window.DataContext` and `x:DataType` shown here.
:::

:::info
This example reports errors through `INotifyDataErrorInfo`. Avalonia also picks up exceptions thrown by a binding source's setter. For the full set of validation approaches available to a view model, see [Validation in data binding](/docs/data-binding/binding-validation).
:::

## Attached properties

An attached property lives in its own container class and is configured on compatible controls in XAML. This allows you to have additional properties that are not part of your custom control's own control class. For example, you may wish to use an attached property to allow child elements to specify their own layout positions within the parent custom control. (See [Custom Panel](/docs/custom-controls/custom-panel#adding-an-attached-property) for a practical example.)

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
- [Property value precedence](/docs/properties/value-precedence): How Avalonia resolves competing property values.
- [Metadata and callbacks](/docs/properties/metadata-and-callbacks): Default values, coercion, and validation.
- [Validation in data binding](/docs/data-binding/binding-validation): Validation approaches available to a view model, and customizing how errors are displayed.
- [Defining events](/docs/custom-controls/defining-events): Add routed events to your custom controls.
- [Creating custom controls](/docs/custom-controls): Overview of the custom control types you can add properties to.
