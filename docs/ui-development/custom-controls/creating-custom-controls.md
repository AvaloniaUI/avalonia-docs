---
id: index
title: Creating custom controls
sidebar_position: 1
---

## Custom controls

A custom control draws itself using the _Avalonia UI_ graphics system, using basic methods for shapes, lines, fills, text, and many others. You can define your own properties, events and pseudo classes.

Some of the _Avalonia UI_ built-in controls are like this. For example, the text block control (`TextBlock` class) and the image control (`Image` class).

## Types of custom controls

If you want to create your own controls, there are three main categories of control in Avalonia. The first thing to do is choose the category of control that best suits your use-case.

### User controls

UserControls are the simplest way to author controls. This type of control is best for "views" or "pages" that are specific to an application. UserControls are authored in the same way as you would author a Window: by creating a new UserControl from a template and adding controls to it.

### Templated controls

TemplatedControls are best used for generic controls that can be shared among various applications. They are lookless controls, meaning that they can be restyled for different themes and applications. The majority of standard controls defined by Avalonia fit into this category.

:::info
In WPF/UWP you would inherit from the Control class to create a new templated control, but in Avalonia you should inherit from TemplatedControl. 
:::

:::info
If you want to provide a Style for your TemplatedControl in a separate file, remember to include this file in your Application via StyleInclude. 
:::

### Basic controls

BasicControls are the foundation of user interfaces - they draw themselves using geometry by overriding the Visual.Render method. Controls such as TextBlock and Image fall into this category.

:::info
In WPF/UWP you would inherit from the FrameworkElement class to create a new basic control, but in Avalonia you should inherit from Control. 
:::

## Creating advanced custom controls

Stuff clipped from the custom control guide.

Here's how the `Border` control defines its `Background` property:

The `AvaloniaProperty.Register` method also accepts a number of other parameters:

* `defaultValue`: This gives the property a default value. Be sure to only pass value types and immutable types here as passing a reference type will cause the same object to be used on all instances on which the property is registered.
* `inherits`: Specified that the property's default value should come from the parent control.
* `defaultBindingMode`: The default binding mode for the property. Can be set to `OneWay`, `TwoWay`, `OneTime` or `OneWayToSource`.
* `validate`: A validation/coercion function of type `Func<TOwner, TValue, TValue>`. The function accepts the instance of the class on which the property is being set and the value and returns the coerced value or throws an exception for an invalid value.

> A styled property is analogous to a `DependencyProperty` in other XAML frameworks.

> The naming convention of the property and its backing AvaloniaProperty field is important. The name of the field is always the name of the property, with the suffix Property appended.

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

> Note: Unlike WPF/UWP, a property must be registered on a class otherwise it cannot be set on an object of that class. This may change in future, however.

### Readonly Properties

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

[Attached properties](/docs/concepts/attached-property) are defined almost identically to styled properties except that they are registered using the `RegisterAttached` method and their accessors are defined as static methods.

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

### Direct AvaloniaProperties

As its name suggests, `RegisterDirect` isn't just used for registering readonly properties. You can also pass a _setter_ to `RegisterDirect` to expose a standard C# property as a Avalonia property.

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

### Using a DirectProperty on another class

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
* You can add [data validation](/docs/guides/development-guides/data-validation.md) support

Cons:

* Cannot inherit value from parent control
* Cannot take advantage of Avalonia's styling system
* Property value is a field and as such is allocated whether the property is set on the object or not

So use direct properties when you have the following requirements:

* Property will not need to be styled
* Property will usually or always have a value

### DataValidation support

If you want to allow a property to validate the data and show validation error messages, the property must be implemented as a `DirectProperty` and validation support must be enabled (`enableDataValidation: true`).

**Example of a property with DataValidation enabled**

```cs
public static readonly DirectProperty<MyControl, int> ValueProperty =
    AvaloniaProperty.RegisterDirect<MyControl, int>(
        nameof(Value),
        o => o.Value,
        (o, v) => o.Value = v, 
        enableDataValidation: true);
```

If you want to [re-use a direct property of another class](how-to-create-advanced-custom-controls.md#using-a-directproperty-on-another-class) you can also enable data validation. In this case use `AddOwnerWithDataValidation`.

**Example: TextBox.TextProperty property re-uses TextBlock.TextProperty but adds validation support**

```cs
public static readonly DirectProperty<TextBox, string?> TextProperty =
    TextBlock.TextProperty.AddOwnerWithDataValidation<TextBox>(
        o => o.Text,
        (o, v) => o.Text = v,
        defaultBindingMode: BindingMode.TwoWay,
        enableDataValidation: true);
```