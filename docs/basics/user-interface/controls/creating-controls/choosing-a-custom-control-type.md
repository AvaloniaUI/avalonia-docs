# Choosing A Custom Control Type

Avalonia provides various approaches for creating custom controls to meet your application's specific needs. Understanding the different types of custom controls will help you choose the most appropriate approach for your requirements. In Avalonia, the three common types of custom controls are  UserControls`, lookless controls, and custom-drawn controls.

## UserControl

A `UserControl` is a high-level approach for creating custom controls in Avalonia. It allows you to compose a control by combining existing controls and defining the layout using XAML. A `UserControl` acts as a container that encapsulates multiple controls and provides a cohesive user interface.

:::info
Typically, `UserControls` are used to represent specialized views within an application, such as a "User Details View," rather than serving as general-purpose user interface elements.
:::

Creating a `UserControl` involves the following steps:

1. **Define the XAML**: Create a new `UserControl` XAML file that defines the layout and appearance of the control by placing controls, setting properties, and applying styles.

2. **Code-behind**: Optionally, you can define additional code-behind logic to handle events, modify the behavior, or provide additional functionality to the `UserControl`.

3. **Reuse and Customization**: `UserControl`s can be easily reused and customized within an application. They are especially useful when you want to encapsulate a specific set of controls and behaviors into a reusable component or "view".


<GitHubSampleLink title="Custom Control" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/CustomControl"/>


## Templated (Lookless) Controls

Templated controls (also known as "Lookless controls") provide a more advanced and customizable approach for creating custom controls in Avalonia. A templated control separates the control's behavior and logic from its visual appearance, allowing the control to be styled and templated by the application developer.

With templated controls, you define the control's behavior and properties in a code-behind class, while the visual representation is specified through control templates defined in XAML. This separation allows the application developer to customize the look and feel of the control without modifying its underlying behavior.

:::info
Templated controls are typically used for general-purpose user-interface elements that are not specific to business logic and may require different themes or visual styles. Most of the [built-in controls](../builtin-controls.md) supplied by Avalonia are templated controls.
:::

Creating a templated control involves the following steps:

1. **Define the Control Class**: Create a new class that derives from `TemplatedControl`. This class defines the behavior, properties, and events of the control.

2. **Control Template**: Create a [`ControlTheme`](control-themes) in XAML that specifies the visual appearance and structure of the control. The control template defines the parts of the control and how they should be styled.

3. **Styling and Templating**: The application developer can customize the look of the control by modifying its control template or applying styles. This allows for a consistent and unified visual design across the application.

Templated controls provide greater flexibility and reusability, making them ideal for scenarios where you want to provide a control that can be styled to match different visual themes or adapt to various user preferences.

## Custom-drawn Controls

Custom-drawn controls offer the highest level of customization in Avalonia. With custom-drawn controls, you have complete control over the rendering of the control's visual elements, allowing you to create unique and complex visual representations.

:::info
Custom-drawn controls are typically used where the control represents a mostly non-interactive graphical element that will not need to be themed.
:::

To create a custom-drawn control, you override the control's `Render` method and use low-level drawing APIs, such as `DrawingContext`, to define the control's appearance. This approach provides fine-grained control over every pixel of the control's visual representation.

Creating a custom-drawn control involves the following steps:

1. **Define the Control Class**: Create a new class that derives from `Control`. This class will define the behavior and rendering logic of the control.

2. **Override the Render Method**: Override the `Render` method in the control class and use the `DrawingContext` to draw the control's content.
