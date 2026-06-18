---
id: index
title: Creating custom controls
sidebar_position: 1
description: Overview of approaches for building custom controls in Avalonia, from user controls to templated controls.
doc-type: overview
---

## Custom controls

A custom control draws itself using the Avalonia graphics system, using basic methods for shapes, lines, fills, text, and more. You can define your own properties, events and pseudo classes.

## Types of custom controls

There are three main control categories in Avalonia: user controls, templated controls and basic controls. Before creating a custom control, first choose the category that best suits your use case.

### User controls

User controls are authored the same way you would author a custom `Window`: by creating a new `UserControl` from a template and adding controls to it. This type of control is best for "views" or "pages" that are specific to an application.

### Templated controls

Templated controls are lookless, meaning they can be restyled for different themes and applications. They are best for generic controls that you wish to share across various applications. The majority of Avalonia's standard controls are templated controls.

A `TemplatedControl` can have a style defined in a separate file. If using this approach, you must include that file in your `Application` via `StyleInclude`.

:::info
In Avalonia, a custom templated control inherits from `TemplatedControl`. This is unlike WPF or UWP, where you would inherit from the `Control` class.
:::

### Basic controls

Basic controls draw themselves using geometry by overriding the `Visual.Render` method. Some Avalonia controls fall into this category, such as `TextBlock` and `Image`.

:::info
In Avalonia, a custom basic control inherits from `Control`. This is unlike WPF or UWP, where you would inherit from the `FrameworkElement` class.
:::

## Registering properties

A custom control exposes its settable values as Avalonia properties. Doing so lets a value participate in styling, data binding, animation, value precedence, etc.

The most common kind of property is a **styled property**, which stores its value inside the Avalonia property system instead of in a backing field. A styled property in Avalonia is analogous to a `DependencyProperty` in other XAML frameworks.

Registering a styled property is a two-step process: declare a `static readonly` field using `AvaloniaProperty.Register`, then provide a CLR getter and setter that call `GetValue` and `SetValue` respectively.

To illustrate the above, here's how the `Border` control defines its `Background` property:

```csharp
public static readonly StyledProperty<IBrush?> BackgroundProperty =
    AvaloniaProperty.Register<Border, IBrush?>(nameof(Background));

public IBrush? Background
{
    get => GetValue(BackgroundProperty);
    set => SetValue(BackgroundProperty, value);
}
```

The `AvaloniaProperty.Register` method also accepts a number of other parameters:

| Parameter | Description |
| --- | --- |
| `defaultValue` | Gives the property a default value. Be sure to only pass value types and immutable types in this parameter, as passing a reference type will cause the same object to be used on all instances where the property is registered. |
| `inherits` | Specifies that the property's default value should come from the parent control. |
| `defaultBindingMode` | Default binding mode for the property. Can be set to `OneWay`, `TwoWay`, `OneTime` or `OneWayToSource`. |
| `validate` | A validation/coercion function of type `Func<TOwner, TValue, TValue>`. The function accepts the instance of the class on which the property is being set and the value. It returns the coerced value or throws an exception for an invalid value. |

:::info
The naming convention of the property and its backing `AvaloniaProperty` field is important. The name of the field is always the name of the property, with the suffix `Property` appended.
:::

### Using a `StyledProperty` on another class

Sometimes the property you want to add to your control already exists on another control, `Background` being a good example. To register a property defined on another control, you call `StyledProperty.AddOwner`:

```csharp
public static readonly StyledProperty<IBrush> BackgroundProperty =
    Border.BackgroundProperty.AddOwner<Panel>();

public Brush Background
{
    get { return GetValue(BackgroundProperty); }
    set { SetValue(BackgroundProperty, value); }
}
```

:::note
Unlike WPF/UWP, a property must be registered on a class otherwise it cannot be set on an object of that class. This may change in future, however.
:::

### Readonly properties

To create a readonly property you use the `AvaloniaProperty.RegisterDirect` method. Here is how `Visual` registers the readonly `Bounds` property:

```csharp
public static readonly DirectProperty<Visual, Rect> BoundsProperty =
    AvaloniaProperty.RegisterDirect<Visual, Rect>(
        nameof(Bounds),
        o => o.Bounds);

private Rect _bounds;

public Rect Bounds
{
    get { return _bounds; }
    private set { SetAndRaise(BoundsProperty, ref _bounds, value); }
}
```

As can be seen, readonly properties are stored as a field on the object. When registering the property, a getter is passed which is used to access the property value through `GetValue` and then `SetAndRaise` is used to notify listeners to changes to the property.

### Attached properties

[Attached properties](/docs/custom-controls/attached-properties) are defined almost identically to styled properties except that they are registered using the `RegisterAttached` method and their accessors are defined as static methods.

Here's how `Grid` defines its `Grid.Column` attached property:

```csharp
public static readonly AttachedProperty<int> ColumnProperty =
    AvaloniaProperty.RegisterAttached<Grid, Control, int>("Column");

public static int GetColumn(Control element)
{
    return element.GetValue(ColumnProperty);
}

public static void SetColumn(Control element, int value)
{
    element.SetValue(ColumnProperty, value);
}
```

### Direct `AvaloniaProperty` registrations

As its name suggests, `RegisterDirect` isn't just used for registering readonly properties. You can also pass a _setter_ to `RegisterDirect` to expose a standard C# property as an Avalonia property.

A `StyledProperty` which is registered using `AvaloniaProperty.Register` maintains a prioritized list of values and bindings that allow styles to work. However, this is overkill for many properties, such as `ItemsControl.Items` - this will never be styled and the overhead involved with styled properties is unnecessary.

Here is how `ItemsControl.Items` is registered:

```csharp
public static readonly DirectProperty<ItemsControl, IEnumerable> ItemsProperty =
    AvaloniaProperty.RegisterDirect<ItemsControl, IEnumerable>(
        nameof(Items),
        o => o.Items,
        (o, v) => o.Items = v);

private IEnumerable _items = new AvaloniaList<object>();

public IEnumerable Items
{
    get { return _items; }
    set { SetAndRaise(ItemsProperty, ref _items, value); }
}
```

Direct properties are a lightweight version of styled properties that support the following:

* AvaloniaObject.GetValue
* AvaloniaObject.SetValue for non-readonly properties
* PropertyChanged
* Binding (only with LocalValue priority)
* GetObservable
* AddOwner
* Metadata

They don't support the following:

* Validation/Coercion (although this could be done in the property setter)
* Overriding default values.
* Inherited values

### Using a `DirectProperty` on another class

In the same way that you can call `AddOwner` on a styled property, you can also add an owner to a direct property. Because direct properties reference fields on the control, you must also add a field for the property:

```csharp
public static readonly DirectProperty<MyControl, IEnumerable> ItemsProperty =
    ItemsControl.ItemsProperty.AddOwner<MyControl>(
        o => o.Items,
        (o, v) => o.Items = v);

private IEnumerable _items = new AvaloniaList<object>();

public IEnumerable Items
{
    get { return _items; }
    set { SetAndRaise(ItemsProperty, ref _items, value); }
}
```

### When to use direct vs styled properties

In general you should declare your properties as styled properties. However, direct properties have advantages and disadvantages:

Pros:

* No additional object is allocated per-instance for the property
* Property getter is a standard C# property getter
* Property setter is a standard C# property setter that raises an event.
* You can add [data validation](/docs/app-development/data-validation) support

Cons:

* Cannot inherit value from parent control
* Cannot take advantage of Avalonia's styling system
* Property value is a field and as such is allocated whether the property is set on the object or not

So use direct properties when you have the following requirements:

* Property will not need to be styled
* Property will usually or always have a value

### DataValidation support

To allow a property to show validation error messages, register it with `enableDataValidation: true`. The base `Control` class automatically handles reporting validation errors to `DataValidationErrors`, so no additional overrides are needed.

**Example of a property with DataValidation enabled**

```csharp
public static readonly DirectProperty<MyControl, int> ValueProperty =
    AvaloniaProperty.RegisterDirect<MyControl, int>(
        nameof(Value),
        o => o.Value,
        (o, v) => o.Value = v,
        enableDataValidation: true);
```

This works with both `DirectProperty` and `StyledProperty` registrations. When a binding provides a validation error, the control displays it automatically.

If you want to [re-use a direct property of another class](#using-a-directproperty-on-another-class) you can also enable data validation. In this case use `AddOwnerWithDataValidation`.

**Example: TextBox.TextProperty property re-uses TextBlock.TextProperty but adds validation support**

```csharp
public static readonly DirectProperty<TextBox, string?> TextProperty =
    TextBlock.TextProperty.AddOwnerWithDataValidation<TextBox>(
        o => o.Text,
        (o, v) => o.Text = v,
        defaultBindingMode: BindingMode.TwoWay,
        enableDataValidation: true);
```

In Avalonia 12, data validation is handled automatically when `enableDataValidation` is set to `true`. The framework detects validation errors from `INotifyDataErrorInfo` and displays them without requiring additional overrides in your control.

## See also

- [Choosing a Custom Control Type](/docs/custom-controls/choosing-a-custom-control-type)
- [Defining Properties](/docs/custom-controls/defining-properties)
- [Defining Events](/docs/custom-controls/defining-events)
- [Templated Controls](/docs/custom-controls/templated-controls)
- [Drawing Custom Controls](/docs/custom-controls/drawing-custom-controls)