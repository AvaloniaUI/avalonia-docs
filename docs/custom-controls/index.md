---
id: index
title: Creating custom controls
sidebar_position: 1
description: Overview of various approaches for building custom controls in Avalonia.
doc-type: overview
---

## Custom controls

Avalonia allows you to customize your own controls, beyond what is available in our [built-in control library](/controls). Define your own properties, events and pseudoclasses. You can even override visual rendering to draw entirely unique custom controls.

## Types of custom controls

Before creating a custom control, first choose the category of control that best suits your use case. There are three main control categories in Avalonia:

1. [User controls](#user-controls)
2. [Templated controls](#templated-controls)
3. [Basic controls](#basic-controls)

In addition to these three categories, you can also create custom derivatives of [content controls, headered content controls or items controls](#other-customizable-controls).

### User controls

User controls are authored the same way you would author a custom `Window`: by creating a new `UserControl` from a template and adding controls to it. The `UserControl` acts as a container that combines multiple existing controls into a single, cohesive element.

This type of control is best for reusable "views" or "pages" that are specific to an application, for example, a "User Details View". It is less suited for general-purpose UI elements.

To create a custom user control:

1. **Define the XAML.** Create a new `UserControl` XAML file. Decide the layout and appearance of the custom control by placing existing controls, setting properties and applying styles.
2. **Add code-behind.** Optionally, define code-behind logic to handle events or modify the behavior of controls.

[A sample of a custom `UserControl` is available to clone on GitHub.](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/CustomControl)

### Templated controls

Templated controls are lookless, meaning the control's behavior and logic are separate from its appearance. This allows a templated control to be restyled for different themes or applications. The behavior and properties of a `TemplatedControl` are defined in code, while the visual representation is styled in XAML, then included in the `Application` via `StyleInclude`.

This type of control is best for general-purpose UI elements that you wish to share across various applications. The majority of [Avalonia's standard controls](/controls) are templated controls.

:::info
In Avalonia, a custom templated control inherits from `TemplatedControl`. This is unlike WPF or UWP, where you would inherit from the `Control` class.
:::

To create a custom templated control:

1. **Define the control class.** Create a new class that derives from `TemplatedControl`. Decide the behavior, properties and events of the custom control.
2. **Add a control template.** Create a control theme XAML file. Decide the visual appearance of the control.
3. **Add further styling.** Further customize the look of the control by adjusting the control template or applying additional styles, if desired.

### Basic controls

Basic controls are foundational UI elements that draw themselves through the `Visual.Render` method. You can create a custom-drawn basic control by overriding `Render`, then applying the  `DrawingContext` API to specify the control's exact appearance. Some examples of basic controls from [Avalonia's built-in controls](/controls) are `TextBlock` and `Image`.

This approach gives you fine-grained control over every aspect of the control's visual representation. Use custom basic controls for mostly non-interactive graphical elements that do not need to be themed.

:::info
In Avalonia, a custom basic control inherits from `Control`. This is unlike WPF or UWP, where you would inherit from the `FrameworkElement` class.
:::

To create a custom basic control:

1. **Define the control class.** Create a new class that derives from `Control`. Decide the behavior and rendering of the control.
2. **Override the `Render` method.** Override the `Render` method in the control class. Use `DrawingContext` to draw the control.

More detailed guidance is documented in [Creating custom-drawn basic controls](/docs/custom-controls/custom-drawn-basic-controls).

### Other customizable controls

In addition to the three options described above, you can also create custom control classes derived from the following:

- `ContentControl`, a control hosting a single piece of content.
- `HeaderedContentControl`, a control with a header and a content area.
- `ItemsControl`, a control that displays a collection of items.

These controls all derive from `Control`, meaning properties like `Width`, `Height`, `Margin`, and `DataContext` are available by default.

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