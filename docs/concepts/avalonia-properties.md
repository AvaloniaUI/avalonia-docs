---
id: avalonia-properties
title: Avalonia Properties
---

# Avalonia Properties

Avalonia properties provide a powerful and flexible way to define and manipulate the behavior, appearance, and state of controls in your Avalonia applications. This document introduces the three types of Avalonia properties: styled properties, attached properties, and direct properties. Understanding these property types will help you leverage the full potential of Avalonia's property system.

## Styled Properties

Styled properties in Avalonia are the most common type of properties used in controls. They enable you to define properties that can be styled, modified, and data-bound by users of the control. Styled properties are typically exposed as public properties within the control's class and are backed by the Avalonia property system.

Here are key characteristics of styled properties:

- **Styling**: Styled properties can be styled using XAML or code, allowing you to customize the appearance of controls in your application.

- **Data Binding**: Styled properties can participate in data binding scenarios, enabling dynamic updates based on changes in the data source.

- **Notification**: Styled properties raise events when they are changed, enabling interested parties to react to changes on particular properties.

Styled properties provide a versatile and customizable way to define properties for controls, allowing for easy customization and theming.

### Further Reading

- How-To: [Define a styled property on a control](../guides/custom-controls/defining-properties)

## Attached Properties

Attached properties in Avalonia provide a mechanism for attaching additional properties to controls without modifying their underlying class definitions. They allow you to extend the behavior and appearance of controls in a flexible and reusable manner. You have probably come across attached properties in the form of the `DockPanel.Dock` or `Grid.Row` properties: these properties are defined on the `DockPanel` and `Grid` classes, but can be applied to any control.

Here are key characteristics of attached properties:

- **Extensibility**: Attached properties enable you to add custom properties to controls that are not part of their original definition. This allows you to extend controls with additional functionality or settings specific to your application's needs.

- **Flexibility**: Attached properties can be attached to any control, providing a way to enhance controls with custom properties without modifying their code.

- **Usage**: Attached properties are often used for cross-cutting concerns, such as setting properties on child elements or providing additional behavior to controls.

Attached properties offer a powerful way to extend the behavior and appearance of controls in a flexible and reusable manner, enabling you to create controls with custom properties specific to your application.

In addition, because attached properties are based on styled properties, attached properties inherit all of the features of styled properties.

### Further Reading

- How-To: [Define an attached property](../guides/custom-controls/defining-attached-properties)

## Direct Properties

Direct properties in Avalonia provide a way to add metadata to standard CLR properties in order to lend some of the features of styled properties to CLR properties. They are defined within the control's class and are not backed by the Avalonia property system. Direct properties primarily have the following use-cases:

- **Read-only Properties**: Direct properties can be declared without a setter, allowing read-only properties to be added to a class.

- **Calculated Properties**: Direct properties can be used for properties where the value of the property is calculated based on the state of various other properties.

- **Performance**: The reading direct of properties is implemented as a simple CLR property read, whereas styled properties need to go via the Avalonia property store. Direct properties can be useful in cases where performance is of utmost importance.

Here are key characteristics of direct properties:

- **Internal State**: Direct properties state is not stored in the Avalonia property store used by Styled and Attached properties. The author is free to store the property state in whatever manner they choose.

- **Limited Customization**: Direct properties have severe limitatons in their usage with the Avalonia styling system. In particular, because direct properties do not use the Avalonia property store they cannot be used in styles which have a trigger such as a class selector. 
