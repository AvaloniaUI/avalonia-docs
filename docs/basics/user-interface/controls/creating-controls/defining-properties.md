# Defining Properties

Control properties in Avalonia UI allow you to expose configurable aspects of your custom controls, enabling users of your controls to customize their behavior and appearance. This document will guide you through the process of defining properties for your custom controls.

## Why Define Control Properties?

Defining properties for your custom controls offers several benefits:

- **Customization**: Properties allow users of your controls to modify their behavior, appearance, or other aspects according to their specific requirements.

- **Consistency**: By providing properties, you establish a consistent and predictable interface for interacting with your controls, making it easier for developers to work with them.

- **Data Binding**: Properties can be data-bound to other elements, enabling dynamic updates and synchronization with the underlying data model.

- **Styling and Templating**: Properties can be used to modify the control's visual appearance through styles and control templates.

## Guidelines for Defining Control Properties

When defining properties for your custom controls in Avalonia UI, consider the following guidelines:

1. **Property Naming**: Choose descriptive and intuitive names for your properties that reflect their purpose and functionality. Follow standard naming conventions, such as using PascalCase for public properties.

2. **Dependency Properties**: Use the `AvaloniaProperty` system to define your properties as dependency properties. This allows for property value inheritance, change notifications, and data binding.

3. **Property Type**: Select an appropriate data type for each property based on its purpose. Use built-in types such as `string`, `int`, `bool`, etc., or create custom types if necessary.

4. **Default Values**: Set appropriate default values for your properties that align with the control's intended behavior. Default values ensure that your control behaves sensibly even if users do not explicitly set the property values.

5. **Property Metadata**: Consider providing additional metadata for your properties, such as property changed callbacks, validation rules, or flags indicating whether the property affects the control's layout or rendering.

6. **Property Changed Notifications**: Raise the appropriate property changed notifications whenever the value of a property changes. This allows users of your control to respond to property changes and update their logic or UI accordingly.

7. **Property Coercion**: Implement property coercion logic if necessary to enforce constraints or ensure valid property values within a certain range or set of values.

## Example

Here's an example of how to define a custom property for a hypothetical custom button control:

```csharp
public class MyCustomButton : Button
{
    public static readonly AvaloniaProperty<int> RepeatCountProperty =
        AvaloniaProperty.Register<MyCustomButton, int>(nameof(RepeatCount), defaultValue: 1);

    public int RepeatCount
    {
        get => GetValue(RepeatCountProperty);
        set => SetValue(RepeatCountProperty, value);
    }
}
```

In this example, a custom property called `RepeatCount` is defined as an integer property for the `MyCustomButton` control. The property is registered using the `AvaloniaProperty` system, allowing it to be accessed, modified, styled, and data-bound by users of the control.

## Further Reading

For more information see the [Defining Properties How-To](../../../../guides/custom-controls/defining-properties.md)