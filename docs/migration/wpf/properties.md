---
id: properties
title: Properties
description: Migrate WPF DependencyProperty usage to Avalonia StyledProperty and DirectProperty types.
doc-type: migration
---

Avalonia's property system is conceptually similar to WPF's `DependencyProperty` system but uses a cleaner, strongly-typed generic API. If you are familiar with WPF dependency properties, you will find most of the same concepts in Avalonia: styling, data binding, animation, value inheritance, and default values all work through the property system. The main differences are in registration syntax and how you respond to property changes.

## Property types comparison

WPF has a single `DependencyProperty` class used for all scenarios. Avalonia splits this into three distinct types, each optimized for a specific use case. All three share a common base class, `AvaloniaProperty`.

| WPF | Avalonia | When to Use |
|---|---|---|
| `DependencyProperty` | `StyledProperty` | Properties that participate in styling, animation, and value inheritance |
| `DependencyProperty` (read-only) | `DirectProperty` | Read-only properties, performance-sensitive properties, or properties that wrap a CLR backing field |
| `DependencyProperty.RegisterAttached` | `AttachedProperty` | Properties set on child elements (for example, `Grid.Row`, `DockPanel.Dock`) |

## Registration

### StyledProperty

In WPF, you register a `DependencyProperty` with a static field and a call to `DependencyProperty.Register`. In Avalonia, you use `AvaloniaProperty.Register<TOwner, TValue>` instead.

**WPF:**

```csharp
public class MyControl : Control
{
    public static readonly DependencyProperty BackgroundProperty =
        DependencyProperty.Register(
            nameof(Background),
            typeof(Brush),
            typeof(MyControl),
            new PropertyMetadata(Brushes.Transparent));

    public Brush Background
    {
        get => (Brush)GetValue(BackgroundProperty);
        set => SetValue(BackgroundProperty, value);
    }
}
```

**Avalonia:**

```csharp
public class MyControl : Control
{
    public static readonly StyledProperty<IBrush> BackgroundProperty =
        AvaloniaProperty.Register<MyControl, IBrush>(
            nameof(Background),
            defaultValue: Brushes.Transparent);

    public IBrush Background
    {
        get => GetValue(BackgroundProperty);
        set => SetValue(BackgroundProperty, value);
    }
}
```

Notice that Avalonia uses generics to avoid casting in the `GetValue` call, and the default value is passed as a named parameter rather than through a metadata object.

### DirectProperty

A `DirectProperty` reads and writes directly from a CLR backing field instead of going through the Avalonia property system's value store. This makes it useful for read-only properties or properties where you want maximum performance. There is no direct WPF equivalent; the closest comparison is a read-only `DependencyProperty`.

```csharp
public class MyControl : Control
{
    public static readonly DirectProperty<MyControl, string> StatusProperty =
        AvaloniaProperty.RegisterDirect<MyControl, string>(
            nameof(Status),
            o => o.Status);

    private string _status = "Ready";

    public string Status
    {
        get => _status;
        private set => SetAndRaise(StatusProperty, ref _status, value);
    }
}
```

Key points:
- Use `SetAndRaise` instead of `SetValue` to update the backing field and raise change notifications.
- The getter accessor lambda (`o => o.Status`) is required so the property system can read the current value.

### AttachedProperty

Attached properties work the same way conceptually. In WPF you use `DependencyProperty.RegisterAttached`; in Avalonia you use `AvaloniaProperty.RegisterAttached`.

**WPF:**

```csharp
public class DockPanel : Panel
{
    public static readonly DependencyProperty DockProperty =
        DependencyProperty.RegisterAttached(
            "Dock",
            typeof(Dock),
            typeof(DockPanel),
            new PropertyMetadata(Dock.Left));

    public static Dock GetDock(DependencyObject element)
        => (Dock)element.GetValue(DockProperty);

    public static void SetDock(DependencyObject element, Dock value)
        => element.SetValue(DockProperty, value);
}
```

**Avalonia:**

```csharp
public class DockPanel : Panel
{
    public static readonly AttachedProperty<Dock> DockProperty =
        AvaloniaProperty.RegisterAttached<DockPanel, Control, Dock>(
            "Dock",
            defaultValue: Dock.Left);

    public static Dock GetDock(Control element)
        => element.GetValue(DockProperty);

    public static void SetDock(Control element, Dock value)
        => element.SetValue(DockProperty, value);
}
```

## Property changed callbacks

### WPF approach

In WPF, you pass a `PropertyChangedCallback` inside `PropertyMetadata` at registration time:

```csharp
public static readonly DependencyProperty IsActiveProperty =
    DependencyProperty.Register(
        nameof(IsActive),
        typeof(bool),
        typeof(MyControl),
        new PropertyMetadata(false, OnIsActiveChanged));

private static void OnIsActiveChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
{
    var control = (MyControl)d;
    control.UpdateVisualState();
}
```

### Avalonia approaches

Avalonia offers two ways to respond to property changes.

**Option 1: Override `OnPropertyChanged`**

The recommended approach for control authors is to override `OnPropertyChanged` on the control itself:

```csharp
protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
{
    base.OnPropertyChanged(change);

    if (change.Property == IsActiveProperty)
    {
        var newValue = change.GetNewValue<bool>();
        UpdateVisualState();
    }
}
```

**Option 2: Class handler via `Changed.AddClassHandler`**

You can also register a static class handler, typically in the control's static constructor. This is similar in spirit to the WPF `PropertyChangedCallback`, but it is registered separately from the property definition:

```csharp
static MyControl()
{
    IsActiveProperty.Changed.AddClassHandler<MyControl>((control, args) =>
    {
        control.UpdateVisualState();
    });
}
```

Both approaches are equivalent in effect. Overriding `OnPropertyChanged` is often cleaner when you need to handle changes to multiple properties in one place.

## Default values

In WPF, default values are supplied through a `PropertyMetadata` object:

```csharp
new PropertyMetadata(defaultValue: Brushes.White)
```

In Avalonia, the default value is a named parameter on the `Register` method:

```csharp
AvaloniaProperty.Register<MyControl, IBrush>(
    nameof(Background),
    defaultValue: Brushes.White);
```

If you need to override the default value in a derived class, use `OverrideDefaultValue` in the static constructor of the subclass:

```csharp
static MyDerivedControl()
{
    BackgroundProperty.OverrideDefaultValue<MyDerivedControl>(Brushes.Black);
}
```

## Value coercion

In WPF, you supply a `CoerceValueCallback` in the `PropertyMetadata`:

```csharp
new PropertyMetadata(0.0, null, CoerceOpacity)
```

In Avalonia, pass a `coerce` function when registering the property:

```csharp
public static readonly StyledProperty<double> OpacityProperty =
    AvaloniaProperty.Register<MyControl, double>(
        nameof(Opacity),
        defaultValue: 1.0,
        coerce: CoerceOpacity);

private static double CoerceOpacity(AvaloniaObject sender, double value)
{
    return Math.Clamp(value, 0.0, 1.0);
}
```

The coercion function receives the `AvaloniaObject` instance and the proposed value, and returns the corrected value.

## Value precedence

Both WPF and Avalonia use a value precedence system to determine the effective value of a property. The general order (highest to lowest) is:

1. Animation
2. Local value
3. Style triggers / Style setters
4. Template parent
5. Inherited value
6. Default value

For a detailed breakdown of how Avalonia resolves property values, see the [Value Precedence](/docs/properties/value-precedence) page.

## Common gotchas

### No PropertyMetadata constructor with a default value

In WPF, you often write `new PropertyMetadata(someDefault)`. In Avalonia, there is no `PropertyMetadata` class. Default values are passed directly to `Register` using the `defaultValue:` named parameter.

### SetAndRaise replaces SetValue for DirectProperty

If you register a `DirectProperty`, you must use `SetAndRaise` in the CLR setter instead of `SetValue`. Calling `SetValue` on a `DirectProperty` will throw an exception.

```csharp
// Correct for DirectProperty
public string Status
{
    get => _status;
    private set => SetAndRaise(StatusProperty, ref _status, value);
}
```

### StyledProperty values live in the property system

Unlike `DirectProperty`, a `StyledProperty` does not use a backing field. Values are stored internally by the Avalonia property system. If you try to add a backing field and read from it, you will get stale data. Always use `GetValue` and `SetValue`.

### Use AddOwner instead of OverrideMetadata for shared properties

In WPF, you might call `OverrideMetadata` to reuse an existing `DependencyProperty` in a subclass with different metadata. In Avalonia, the equivalent pattern for sharing a property across unrelated types is `AddOwner`:

```csharp
public static readonly StyledProperty<IBrush> BackgroundProperty =
    Border.BackgroundProperty.AddOwner<MyControl>();
```

This registers the same property on your control type, and you can optionally override the default value at the same time:

```csharp
public static readonly StyledProperty<IBrush> BackgroundProperty =
    Border.BackgroundProperty.AddOwner<MyControl>(
        new StyledPropertyMetadata<IBrush>(Brushes.Gray));
```

## See also

- [Avalonia Properties Overview](/docs/properties/index)
- [Value Precedence](/docs/properties/value-precedence)
- [Defining Properties on Custom Controls](/docs/custom-controls/defining-properties)
