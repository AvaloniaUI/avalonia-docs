# Defining Properties

Control properties in Avalonia UI allow you to expose configurable aspects of your custom controls, enabling users of your controls to customize their behavior and appearance. This document will introduce the process of defining properties for your custom controls.

## Styled Properties

Styled properties in Avalonia offer a powerful and flexible way to define properties for controls. These properties are specifically designed to support the Avalonia styling system and data binding. Styled properties in Avalonia are registered using the `AvaloniaProperty` class.

Styled Avalonia properties have the following key characteristics:

- **Styling Support**: They can be easily targeted and modified using styles, and setters defined in XAML or programmatically.
Inheritance: They support inheritance, meaning that a property value defined on a parent control can be automatically inherited by its child controls unless explicitly overridden.

- **Default Values**: They can have default values specified at the control level or within control templates, ensuring consistent behavior across multiple instances of the control.

- **Property Value Precedence**: They follow a well-defined precedence order, allowing values to be resolved based on factors such as local values, style setters, triggers, and default values.
Styled Avalonia properties are commonly used for control properties that are intended to be easily customizable through styling, allowing for dynamic changes in appearance and behavior based on various conditions.

- **Validation and Coercion**: Styled properties allow a control to validate and coerce the values passed to it, ensuring that the control is never in an invalid state.

## Example

Here's an example of how to define a custom styled property for a hypothetical custom button control:

```csharp
public class MyCustomButton : Button
{
    public static readonly StyledProperty<int> RepeatCountProperty =
        AvaloniaProperty.Register<MyCustomButton, int>(nameof(RepeatCount), defaultValue: 1);

    public int RepeatCount
    {
        get => GetValue(RepeatCountProperty);
        set => SetValue(RepeatCountProperty, value);
    }
}
```

In this example, a custom property called `RepeatCount` is defined as an integer property for the `MyCustomButton` control. The property is registered using the `AvaloniaProperty` system, allowing it to be accessed, modified, styled, and data-bound by users of the control. A CLR property is also defined for convenience, allowing the property to be consumed in manner consistent with standard .NET APIs.

## Further Reading

For more information see the [Defining Properties How-To](../../../../guides/custom-controls/defining-properties.md)