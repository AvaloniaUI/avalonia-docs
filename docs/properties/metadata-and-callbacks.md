---
id: metadata-and-callbacks
title: Metadata and callbacks
---

Every Avalonia property has associated metadata that controls its default value, binding behavior, and optional coercion logic. You can specify metadata when registering a property and override it for derived types.

## Styled property metadata

The `StyledPropertyMetadata<T>` class controls the behavior of styled properties:

| Parameter | Type | Description |
|---|---|---|
| `defaultValue` | `T` | The default value for the property. Used when no other value source provides a value. |
| `defaultBindingMode` | `BindingMode` | The binding mode used when a binding does not specify one explicitly. |
| `coerce` | `Func<AvaloniaObject, T, T>?` | A callback that can adjust or constrain the property value before it is applied. |
| `enableDataValidation` | `bool` | Whether the property participates in data validation. |

## Default values

Specify a default value when registering a property:

```csharp
public static readonly StyledProperty<double> OpacityProperty =
    AvaloniaProperty.Register<MyControl, double>(nameof(Opacity), defaultValue: 1.0);
```

### Overriding default values

A derived control can change the default value of an inherited property:

```csharp
public class MySpecialButton : Button
{
    static MySpecialButton()
    {
        // Change the default Background for MySpecialButton
        BackgroundProperty.OverrideDefaultValue<MySpecialButton>(Brushes.LightBlue);
    }
}
```

You can also supply full metadata when overriding:

```csharp
static MySpecialButton()
{
    BackgroundProperty.OverrideMetadata<MySpecialButton>(
        new StyledPropertyMetadata<IBrush?>(Brushes.LightBlue));
}
```

:::caution
Metadata overrides must be registered in the static constructor of the type. Overriding metadata after any instance of the type has been created results in undefined behavior.
:::

## Value coercion

A coercion callback adjusts the property value before it is stored. This is useful for enforcing constraints, such as clamping a number to a valid range.

```csharp
public static readonly StyledProperty<double> ProgressProperty =
    AvaloniaProperty.Register<MyControl, double>(
        nameof(Progress),
        defaultValue: 0.0,
        coerce: CoerceProgress);

private static double CoerceProgress(AvaloniaObject sender, double value)
{
    // Clamp between 0 and 100
    return Math.Clamp(value, 0.0, 100.0);
}

public double Progress
{
    get => GetValue(ProgressProperty);
    set => SetValue(ProgressProperty, value);
}
```

The coercion callback receives the `AvaloniaObject` instance and the proposed value, and returns the adjusted value. Coercion runs every time the effective value changes, regardless of the value source (local, style, animation, and similar).

### Triggering re-coercion

If your coercion logic depends on another property, you can trigger re-coercion when that other property changes:

```csharp
protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
{
    base.OnPropertyChanged(change);

    if (change.Property == MaximumProperty)
    {
        // Re-coerce Progress when Maximum changes
        CoerceValue(ProgressProperty);
    }
}
```

## Value validation

A validation callback rejects values that are never valid for a property. Unlike coercion, validation does not adjust the value. It returns `true` to accept or `false` to reject. Invalid values throw an exception.

```csharp
public static readonly StyledProperty<int> ColumnSpanProperty =
    AvaloniaProperty.Register<MyControl, int>(
        nameof(ColumnSpan),
        defaultValue: 1,
        validate: v => v > 0);

public int ColumnSpan
{
    get => GetValue(ColumnSpanProperty);
    set => SetValue(ColumnSpanProperty, value);
}
```

Setting `ColumnSpan` to `0` or a negative number will throw an exception.

:::info
Validation is set once at registration time and cannot be overridden per type. Use coercion when you need per-type or instance-dependent value adjustment.
:::

## Responding to property changes

### Override `OnPropertyChanged`

The most common way to respond to property changes in a custom control:

```csharp
protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
{
    base.OnPropertyChanged(change);

    if (change.Property == IsExpandedProperty)
    {
        var wasExpanded = change.GetOldValue<bool>();
        var isExpanded = change.GetNewValue<bool>();
        UpdateVisualState(isExpanded);
    }
}
```

### `GetObservable`

Subscribe to changes on a specific object from external code:

```csharp
myControl.GetObservable(MyControl.IsExpandedProperty)
    .Subscribe(isExpanded =>
    {
        Console.WriteLine($"IsExpanded is now {isExpanded}");
    });
```

### Class handlers

Register a handler that fires for all instances of a type. This is typically done in a static constructor:

```csharp
static MyControl()
{
    IsExpandedProperty.Changed.AddClassHandler<MyControl>((control, args) =>
    {
        control.OnIsExpandedChanged(args);
    });
}

private void OnIsExpandedChanged(AvaloniaPropertyChangedEventArgs args)
{
    // Handle the change
}
```

## Direct property metadata

Direct properties use `DirectPropertyMetadata<T>`:

| Parameter | Type | Description |
|---|---|---|
| `unsetValue` | `T` | The value used when the property is cleared. This serves as the effective default for direct properties. |
| `defaultBindingMode` | `BindingMode` | The default binding mode. |
| `enableDataValidation` | `bool` | Whether the property participates in data validation. |

Direct properties do not support coercion or value validation through metadata. Implement these checks in the CLR property setter instead:

```csharp
private int _retryCount;

public int RetryCount
{
    get => _retryCount;
    set
    {
        if (value < 0)
            throw new ArgumentOutOfRangeException(nameof(value));
        SetAndRaise(RetryCountProperty, ref _retryCount, value);
    }
}
```

## See also

- [Property System Overview](index): Overview of property types and registration.
- [Value Precedence](value-precedence): How the property system resolves values from multiple sources.
- [Property Value Inheritance](property-value-inheritance): How values propagate down the tree.
