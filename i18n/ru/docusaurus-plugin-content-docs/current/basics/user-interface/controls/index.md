# Controls

Controls in Avalonia UI are fundamental building blocks used to create user interfaces. They represent various interactive elements such as buttons, text boxes, sliders, and more. Understanding controls is essential for developing applications using Avalonia UI.

## What are Controls?

Controls are UI elements that allow users to interact with an application. They provide functionality for input, display, and manipulation of data. Controls can be categorized into several types based on their purpose and behavior.

- **Buttons**: Buttons are commonly used for triggering actions when clicked or tapped. They can have text, icons, or both, and are often used for tasks like submitting forms, opening dialogs, or executing commands.
- **Text Boxes**: Text boxes allow users to enter and edit text. They are used for capturing user input, such as usernames, passwords, or any form of textual information. Text boxes can also be customized for specific input patterns and validation.
- **Labels**: Labels are used to display static text or captions for other controls. They provide additional information or context to the user and are generally non-interactive.
- **Checkboxes and RadioButtons**: Checkboxes and radio buttons are used for selection and multiple-choice options. Checkboxes allow users to select one or more options, while radio buttons enable users to choose a single option from a group.
- **Sliders**: Sliders are used to select a value from a range. They provide a visual representation of a value that can be adjusted by dragging a handle along a track. Sliders are commonly used for settings such as volume controls or image adjustments.
- **ListBoxes and ComboBoxes**: ListBoxes and ComboBoxes allow users to select an item from a list or a dropdown menu. ListBoxes display multiple items at once, while combo boxes show a single item initially and expand to display a list when clicked.

These are just a few examples of the many controls available in Avalonia UI. Each control has its own set of properties, methods, and events, allowing developers to customize their appearance and behavior to suit their application's needs.

## Getting Started with Builtin Controls

To get started with using controls in Avalonia UI, you can refer to the documentation for each control type. The documentation provides detailed explanations, examples, and code snippets to help you understand and utilize the controls effectively.

- [Button Control Documentation](../../../reference/controls/buttons/button)
- [Text Box Control Documentation](../../../reference/controls/detailed-reference/textbox)
- [Label Control Documentation](../../../reference/controls/detailed-reference/label)
- [Checkbox Control Documentation](../../../reference/controls/checkbox)
- [Slider Control Documentation](../../../reference/controls/slider)
- [List Box Control Documentation](../../../reference/controls/listbox)

By exploring these resources, you'll gain a solid foundation in using controls within Avalonia UI and be able to create rich and interactive user interfaces for your applications.

## Types of Builtin Controls

_Avalonia UI_'s builtin controls can be loosely classified into the below types:

* Drawn Controls
* Layout Controls
* User Controls*
* Templated Controls
    * Fully Customizable
    * Partially Customizable

*User controls are only available for apps.

:::note
These classifications are somewhat related to the discussion in [Choosing A Custom Control Type](creating-controls/choosing-a-custom-control-type).
:::

### Drawn Controls

Drawn controls are those that are responsible for generating their own geometry or bitmaps and rendering themselves. Examples of these controls include `Border`, `TextBlock` and `Image`. Drawn controls are the foundational controls used to construct everything else.

Most drawn controls have standard properties that can be used to adjust their appearance and size but they do not allow re-templating. This means as an app developer you can’t change the functionality or style of these controls without dropping into C#, deriving a new version of the control and intercepting the rendering methods.

### Layout Controls

Layout controls are special in that they have no appearance by themselves. Layout controls like `Grid`, `StackPanel` and others are responsible for defining the layout of their children and behave as a parent container. The child controls are responsible for rendering the UI while the layout parent control simply sets size and position (which have no appearance by themselves).

It is not very common for app developers to modify framework provided layout controls.

:::note
Some layout controls like `Grid` have properties such as `Background` to simplify common use cases. Using these properties does give some appearance to these controls.
:::

## User Controls

_Avalonia UI_ never provides `UserControl`s by itself as these are not considered general-purpose. For more information on creating and using `UserControl`s in your app see [Choosing A Custom Control Type](creating-controls/choosing-a-custom-control-type).

### Templated Controls

Most standard controls in _Avalonia UI_ are templated controls which means their visual appearance is defined in a XAML control template separated from functionality. It is the foundation for the concept of lookless controls that originated in WPF.

Application developers can change the XAML template of a templated control and make it appear completely differently. This functionality is not available in all UI frameworks and is one of the most powerful features of XAML-based UI frameworks.

:::note
Re-templating controls is a last-resort for app developers. It also means you will be responsible for keeping the template updated with any changes upstream. Instead, it is better to:

 1. Attempt to use existing properties to customize the control
 2. Create a new style with _Avalonia UI_'s extremely powerful style selectors to modify what you need in the existing template
 3. As a last resort, re-template
:::

#### Fully Customizable

The majority of templated controls in _Avalonia UI_ are fully customizable. This means it is possible to completely replace the control’s template and change its appearance. The `Button` control is a good example but all templated controls in _Avalonia UI_ try to be fully customizable by default. With a fully customizable templated control the app has near total ability to style or change everything you see drawn in the UI.

#### Partially Customizable

In practice, having fully replaceable control templates is not always possible. There is a spectrum in control design between supporting common use-cases easily and making the control fully re-templatable. For high-complexity controls like the `DataGrid` the spectrum shifts towards supporting the intended use cases and the control cannot, and should not, be fully re-templated. These controls also usually have a very high number of template parts (required control elements that are used directly by the C# implementation of the control).

In the case of a `DataGrid` it is still possible to re-template individual components or parts of the control. It is just extremely difficult to completely change how it looks and functions.

Partially customizable templated controls on the order of `DataGrid` are rare as first-party controls provided by the framework itself.

## Creating Controls

In Avalonia, you have the flexibility to create custom controls of all types tailored to your application's specific requirements. See the [Creating Controls](creating-controls) section for more information