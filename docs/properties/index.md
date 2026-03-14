---
id: index
title: Avalonia property system
---

Avalonia has its own property system that extends the standard .NET property model. Avalonia properties provide support for styling, data binding, animation, property value inheritance, and change notification. Understanding the property system is essential for creating custom controls and working effectively with the framework.

## Property types

Avalonia defines three kinds of properties, each suited to different scenarios:

| Property Type | Base Class | Use Case |
|---|---|---|
| **Styled Property** | `StyledProperty<T>` | Properties that participate in the styling system. This is the most common type. |
| **Direct Property** | `DirectProperty<TOwner, TValue>` | Properties backed by a conventional C# field, exposed to the Avalonia property system for binding support. Used for performance-sensitive or read-only properties. |
| **Attached Property** | `AttachedProperty<T>` | Properties that can be set on any [`AvaloniaObject`](/api/avalonia/avaloniaobject), typically used by layout panels (e.g., `Grid.Row`, `DockPanel.Dock`). |

## Styled properties

A `StyledProperty` is the standard property type in Avalonia. Styled properties store their values in the Avalonia property system (not in a backing field), which enables them to participate in styling, animations, and value precedence.

### Registering a styled property

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

The `Register` method accepts the following parameters:

| Parameter | Description |
|---|---|
| `name` | The name of the property. Must match the CLR property name. |
| `defaultValue` | The default value for the property. |
| `inherits` | Whether the property value inherits down the visual tree. |
| `defaultBindingMode` | The default binding mode (`OneWay`, `TwoWay`, `OneTime`, `OneWayToSource`). |
| `validate` | A function that returns `false` for values that are never valid. |
| `coerce` | A function that adjusts the value before it is applied (see [Metadata and Callbacks](metadata-and-callbacks)). |

### Reusing an existing property

If another control already defines a property you need, use `AddOwner` instead of registering a new one:

```csharp
public class MyControl : Control
{
    public static readonly StyledProperty<IBrush?> BackgroundProperty =
        Border.BackgroundProperty.AddOwner<MyControl>();

    public IBrush? Background
    {
        get => GetValue(BackgroundProperty);
        set => SetValue(BackgroundProperty, value);
    }
}
```

This ensures a single property identity, so styles targeting `Background` work across all controls that share the property.

## Direct properties

A `DirectProperty` is backed by a conventional C# field. The Avalonia property system reads and writes through getter and setter delegates you provide. Direct properties are useful when:

- You need a property that does not participate in styling (e.g., `Items` on an `ItemsControl`).
- You need a read-only property.
- You want to avoid the overhead of the styled property value store.

### Registering a direct property

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

:::info
Use `SetAndRaise` in the setter instead of assigning the field directly. This method updates the backing field and raises the property changed notification in a single call.
:::

### Read-only direct properties

Omit the setter delegate to create a read-only property:

```csharp
public static readonly DirectProperty<MyControl, bool> IsActiveProperty =
    AvaloniaProperty.RegisterDirect<MyControl, bool>(
        nameof(IsActive),
        o => o.IsActive);
```

### Key differences from styled properties

| Behavior | Styled Property | Direct Property |
|---|---|---|
| Participates in styling | Yes | No |
| Participates in animations | Yes | No |
| Supports value precedence | Yes | No (single value) |
| Can inherit values | Yes | No |
| Supports coercion | Yes | No |
| Performance | Property store lookup | Direct field access |
| Can be read-only | No | Yes |

## Attached properties

An `AttachedProperty` is a styled property that can be set on any `AvaloniaObject`. Attached properties are typically defined by a parent layout panel and set on its children.

### Registering an attached property

```csharp
public class MyPanel : Panel
{
    public static readonly AttachedProperty<int> ColumnProperty =
        AvaloniaProperty.RegisterAttached<MyPanel, Control, int>("Column", defaultValue: 0);

    public static int GetColumn(Control element) => element.GetValue(ColumnProperty);
    public static void SetColumn(Control element, int value) => element.SetValue(ColumnProperty, value);
}
```

### Using an attached property in XAML

```xml
<local:MyPanel>
    <Button local:MyPanel.Column="1" Content="In column 1" />
</local:MyPanel>
```

## Getting and setting values

All Avalonia properties are read and written through the `AvaloniaObject` base class:

```csharp
// Get a property value
double radius = myControl.GetValue(MyControl.CornerRadiusProperty);

// Set a property value
myControl.SetValue(MyControl.CornerRadiusProperty, 8.0);

// Clear a property value (revert to default/styled value)
myControl.ClearValue(MyControl.CornerRadiusProperty);
```

## Observing property changes

You can observe property changes on a specific object:

```csharp
// Subscribe to changes using GetObservable
myControl.GetObservable(MyControl.CornerRadiusProperty)
    .Subscribe(newValue => Console.WriteLine($"CornerRadius changed to {newValue}"));
```

Or override `OnPropertyChanged` in your control class:

```csharp
protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
{
    base.OnPropertyChanged(change);

    if (change.Property == CornerRadiusProperty)
    {
        var oldValue = change.GetOldValue<double>();
        var newValue = change.GetNewValue<double>();
        // React to the change
    }
}
```

## See also

- [Value precedence](value-precedence): Learn how Avalonia resolves competing property values from styles, animations, and local values.
- [Metadata and callbacks](metadata-and-callbacks): Learn about default values, coercion, and validation.
- [Property value inheritance](property-value-inheritance): Learn how properties can inherit values from ancestor controls.
- [Defining properties](/docs/custom-controls/defining-properties): A practical guide to adding properties to custom controls.
- [Attached properties](/docs/custom-controls/attached-properties): A practical guide to creating attached properties.
