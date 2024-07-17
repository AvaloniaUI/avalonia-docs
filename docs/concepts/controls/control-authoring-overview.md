# Control authoring overview

The extensibility of the Avalonia control model greatly reduces the need to create a new control. However, in certain cases you may still need to create a custom control. This topic discusses the features that minimize your need to create a custom control and the different control authoring models in Avalonia. This topic also demonstrates how to create a new control.

## Alternatives to Writing a New Control

Historically, if you wanted to get a customized experience from an existing control, you were limited to changing the standard properties of the control, such as background color, border width, and font size. If you wished to extend the appearance or behavior of a control beyond these predefined parameters, you would need to create a new control, usually by inheriting from an existing control and overriding the method responsible for drawing the control. Although that is still an option, Avalonia enables you to customize existing controls by using its rich content model, styles, templates, and data binding. The following list gives examples of how these features can be used to create custom and consistent experiences without having to create a new control.

* **Rich Content**. Many of the standard Avalonia controls support rich content. For example, the content property of a ```Button``` is of type object, so theoretically anything can be displayed on a ```Button```. To have a button display an image and text, you can add an ```Image``` and a ```TextBlock``` to a ```StackPanel``` and assign the ```StackPanel``` to the Content property. Because the controls can display Avalonia visual elements and arbitrary data, there is less need to create a new control or to modify an existing control to support a complex visualization.

* **Styles**. A ```Style``` is a collection of values that represent properties for a control. By using styles, you can create a reusable representation of a desired control appearance and behavior without writing a new control. For example, assume that you want all of your TextBlock controls to have red, Arial font with a font size of 14. You can create a style as a resource and set the appropriate properties accordingly. Then every ```TextBlock``` that you add to your application will have the same appearance.

* **Data Templates**. A ```DataTemplate``` enables you to customize how data is displayed on a control. For example, a ```DataTemplate``` can be used to specify how data is displayed in a ```ListBox```. In addition to customizing the appearance of data, a ```DataTemplate``` can include UI elements, which gives you a lot of flexibility in custom UIs. For example, by using a ```DataTemplate```, you can create a ```ComboBox``` in which each item contains a check box.
  
* **Control Templates**. Many controls in Avalonia use a ```ControlTemplate``` to define the control's structure and appearance, which separates the appearance of a control from the functionality of the control. You can drastically change the appearance of a control by redefining its ```ControlTemplate```. For example, suppose you want a control that looks like a stoplight. This control has a simple user interface and functionality. The control is three circles, only one of which can be lit up at a time. After some reflection, you might realize that a ```RadioButton``` offers the functionality of only one being selected at a time, but the default appearance of the ```RadioButton``` looks nothing like the lights on a stoplight. Because the ```RadioButton``` uses a control template to define its appearance, it is easy to redefine the ```ControlTemplate``` to fit the requirements of the control, and use radio buttons to make your stoplight.

:::note 
Although a ```RadioButton``` can use a ```DataTemplate```, a ```DataTemplate``` is not sufficient in this example. The ```DataTemplate``` defines the appearance of the content of a control. In the case of a ```RadioButton```, the content is whatever appears to the right of the circle that indicates whether the ```RadioButton``` is selected. In the example of the stoplight, the radio button needs just be a circle that can "light up." Because the appearance requirement for the stoplight is so different than the default appearance of the ```RadioButton```, it is necessary to redefine the ```ControlTemplate```. In general a ```DataTemplate``` is used for defining the content (or data) of a control, and a ```ControlTemplate``` is used for defining how a control is structured.
:::

* **Data Binding.** Avalonia's data binding system allows you to link properties of two objects together. This can be used to create dynamic and responsive user interfaces without the need for custom controls. For example, you could bind the Text property of a ```TextBlock``` to a property in your view model, ensuring that the UI always reflects the current state of your data.

In general, if your control mirrors the functionality of an existing control, but you want the control to look different, you should first consider whether you can use any of the methods discussed in this section to change the existing control's appearance.

## Models for Control Authoring

The rich content model, styles, templates, and data binding minimize the need for you to create a new control. However, if you do need to create a new control, it is important to understand the different control authoring models in Avalonia. Avalonia provides three general models for creating a control, each of which provides a different set of features and level of flexibility. The base classes for the three models are ```UserControl```, ```TemplatedControl```, and ```Control```.

## Deriving from UserControl

The simplest way to create a control in Avalonia is to derive from ```UserControl```. When you build a control that inherits from ```UserControl```, you add existing components to the ```UserControl```, name the components, and reference event handlers in XAML. You can then reference the named elements and define the event handlers in code. This development model is very similar to the model used for application development in Avalonia.

If built correctly, a ```UserControl``` can take advantage of the benefits of rich content, styles, and data binding. However, if your control inherits from ```UserControl```, people who use your control will not be able to use a DataTemplate or ControlTemplate to customize its appearance. It is necessary to derive from the TemplatedControl class or one of its derived classes (other than ```UserControl```) to create a custom control that supports templates.

### Benefits of Deriving from UserControl

Consider deriving from ```UserControl``` if all of the following apply:

* You want to build your control similarly to how you build an application.
* Your control consists only of existing components.
* You don't need to support complex customization.

## Deriving from TemplatedControl

Deriving from the TemplatedControl class is the model used by most of the existing Avalonia controls. When you create a control that inherits from the TemplatedControl class, you define its appearance by using templates. By doing so, you separate the operational logic from the visual representation. You can also ensure the decoupling of the UI and logic by using commands and bindings instead of events and avoiding referencing elements in the ControlTemplate whenever possible. If the UI and logic of your control are properly decoupled, a user of your control can redefine the control's ControlTemplate to customize its appearance. Although building a custom TemplatedControl is not as simple as building a ```UserControl```, a custom TemplatedControl provides the most flexibility.

### Benefits of Deriving from TemplatedControl

Consider deriving from TemplatedControl instead of using the UserControl class if any of the following apply:

* You want the appearance of your control to be customizable via the ```ControlTemplate```.
* You want your control to support different themes.

## Deriving from Control

Controls that derive from ```UserControl``` or ```TemplatedControl``` rely upon composing existing elements. For many scenarios, this is an acceptable solution, because any object that inherits from ```Control``` can be in a ```ControlTemplate```. However, there are times when a control's appearance requires more than the functionality of simple element composition. For these scenarios, basing a component on ``Control`` is the right choice.

When deriving from ```Control```, you have the option to override the Visual property to define custom rendering logic for your control. This allows you to have precise control over the appearance of your control beyond what is provided by simple element composition.

### Benefits of Deriving from Control

Consider deriving from ```Control``` if any of the following apply:

* You want to have precise control over the appearance of your control beyond what is provided by simple element composition.
* You want to define the appearance of your control by defining your own render logic.
* You want to compose existing elements in novel ways that go beyond what is possible with ```UserControl``` and ```TemplatedControl```.

## Control Authoring Basics

As discussed earlier, one of the most powerful features of Avalonia is the ability to go beyond setting basic properties of a control to change its appearance and behavior, yet still not needing to create a custom control. The styling, data binding, and trigger features are made possible by the Avalonia property system. The following sections describe some practices that you should follow, regardless of the model you use to create the custom control, so that users of your custom control can use these features just as they would for a control that is included with Avalonia.

## Use Styled Properties

When a property is a styled property, it is possible to do the following:

* Set the property in a style.
* Bind the property to a data source.
* Use a dynamic resource as the property's value.
* Animate the property.
  
If you want a property of your control to support any of this functionality, you should implement it as a styled property. The following example defines a styled property named Value:

```csharp
public static readonly StyledProperty<decimal> ValueProperty =
    AvaloniaProperty.Register<NumericUpDown, decimal>(nameof(Value), defaultValue: 0m);

public decimal Value
{
    get => GetValue(ValueProperty);
    set => SetValue(ValueProperty, value);
}

static NumericUpDown()
{
    ValueProperty.Changed.AddClassHandler<NumericUpDown>((x, e) => x.OnValueChanged(e));
}

private void OnValueChanged(AvaloniaPropertyChangedEventArgs e)
{
    // Handle the value change
}
```

In this example, we define a ```StyledProperty``` named ```ValueProperty``` and register it with the Avalonia property system. We then define a CLR wrapper property named Value, which is the same name that is used to register the styled property. The get and set accessors call ```GetValue``` and ```SetValue``` respectively.

We also set up a static constructor to add a class handler for the ```ValueProperty.Changed``` event. This allows us to respond to changes in the Value property.

## Use Routed Events

Avalonia does not have the concept of routed events like WPF does. Instead, Avalonia uses a similar concept called Interactive. When you create a new Avalonia control, you can make it interactive by implementing the ```IInteractive``` interface. This allows your control to participate in the event routing system.

## Use Data Binding

To decouple the UI of your control from its logic, consider using data binding. This is particularly important if you define the appearance of your control by using a ControlTemplate. When you use data binding, you might be able to eliminate the need to reference specific parts of the UI from the code.

The following example uses binding to update a ```TextBlock``` in the ```NumericUpDown``` control:

```xml
<Border BorderThickness="1" BorderBrush="Gray" Margin="2" 
        Grid.RowSpan="2" VerticalAlignment="Center" HorizontalAlignment="Stretch">
    <TextBlock 
        Width="60" TextAlignment="Right" Padding="5"
        Text="{Binding Value, RelativeSource={RelativeSource AncestorType=local:NumericUpDown}}"/>
</Border>
```
