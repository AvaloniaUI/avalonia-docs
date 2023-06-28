---
id: defining-attached-properties
title:  Defining Attached Properties
---

[Attached properties](../../concepts/avalonia-properties#attached-properties) in Avalonia provide a mechanism for attaching additional properties to controls without modifying their underlying class definitions. They allow you to extend the behavior and appearance of controls in a flexible and reusable manner.

## Defining an Attached Property in a Panel

A common use-case for defining an attached property is to allow a `Panel`-derived class to add layout information to its child controls. You may have already come across such examples as the `DockPanel.Dock` property or the `Grid.Row` property: these are attached properties.

The example below shows how a hypothetical `ProportionPanel` maybe define a `Proportion` property of type `double` that can be attached to a child control:

1. **Define the Attached Property**: Define a static read-only field named `ProportionProperty` in the class:

```csharp
public class ProportionPanel : Panel
{
    // highlight-start
    public static readonly AttachedProperty<double> ProportionProperty =
        AvaloniaProperty.RegisterAttached<ProportionPanel, Control, double>("Proportion", defaultValue: 1.0);
    // highlight-end
}
```

In the above example, the `AvaloniaProperty.RegisterAttached` method is called to create and register the property. The type arguments are:

- `ProportionPanel`: This is the `TOwner` type. This type determines the prefix for the attached property when set in XAML.
- `Control`: This is the `THost` type. This specifies that any `Control` may have the `Proportion` property attached to it.
- `double`: This is the `TValue` type which specifies the type of the value that the property will hold.

The parameters to `AvaloniaProperty.RegisterAttached` are:

- `"Proportion"`: This specifies the name of the attached property
- `defaultValue: 1.0`: Specifies that the default value of the property is `1.0`. If the property is not set on a control, then this value will be returned. This parameter is optional.

2. **Add a Getter and Setter**: Add static methods for getting and setting the property value:

```csharp
public class ProportionPanel : Panel
{
    public static readonly AttachedProperty<double> ProportionProperty =
        AvaloniaProperty.RegisterAttached<ProportionPanel, Control, double>("Proportion");

    // highlight-start
    public double GetProportion(Control control) => control.GetValue(ProportionProperty);
    public void SetProportion(Control control, double value) => control.SetValue(ProportionProperty, value);
    // highlight-end
}
```

The provider class for an attached property must provide static get/set accessor methods that follow the naming convention `Get<property name>` and `Set<property name>`. These methods are used from code and XAML to set the property value.

3. **Describe how the Property Invalidates the Panel**

Often when a layout-related attached property changes on a child control, a layout pass will need to be carried out on either the child control or the panel itself. To describe this relationship, one of the `AffectsMeasure`, `AffectsArrange`, `AffectsParentMeasure` or `AffectsParentArrange` utility methods may be used.

In this case, when the `ProportionPanel.Proportion` property changes on a child of a `ProportionPanel` then we want to invalidate the arrange of the `ProportionPanel`. To do this we call `AffectsParentArrange` in the `ProportionPanel` static constructor:

```csharp
public class ProportionPanel : Panel
{
    public static readonly AttachedProperty<double> ProportionProperty =
        AvaloniaProperty.RegisterAttached<ProportionPanel, Control, double>("Proportion");

    // highlight-start
    static ProportionPanel()
    {
        AffectsParentArrange<ProportionPanel>(ProportionProperty);
    }
    // highlight-end

    public double GetProportion(Control control) => control.GetValue(ProportionProperty);
    public void SetProportion(Control control, double value) => control.SetValue(ProportionProperty, value);
}
```

## Defining an Attached Property Outside of a Control

Sometimes it makes sense to create an attached property in a static class. For example, suppose you want to add a custom behavior that automatically selects the text within certain `TextBox`es when they receives focus. The following example shows creating an attached property called `TextBoxExtensions.AutoSelectBehavior`.

```csharp
public static class TextBoxExtensions
{
    public static readonly AttachedProperty<bool> AutoSelectBehaviorProperty =
        AvaloniaProperty.RegisterAttached<TextBox, bool>("AutoSelectBehavior", typeof(TextBoxExtensions));

    public static bool GetAutoSelectBehavior(TextBox textBox) => textBox.GetValue(AutoSelectBehaviorProperty);
    public static void SetAutoSelectBehavior(TextBox textBox, bool value) => textBox.SetValue(AutoSelectBehaviorProperty, value);
}
```

Because `TextBoxExtensions` is a static class and in C# it is illegal to pass the type of a static class as a type parameter, the owner type is passed as a standard parameter in this case.