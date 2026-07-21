---
id: index
title: Creating custom controls
sidebar_position: 1
description: Overview of approaches for building custom controls in Avalonia.
doc-type: overview
---

## Custom controls

Avalonia allows you to create your own controls, beyond what is available in the [built-in control library](/controls). Define your own properties, events and [pseudoclasses](/docs/styling/pseudoclasses). You can even override visual rendering to draw entirely unique custom controls.

## Types of custom controls

Before creating a custom control, first choose the category of control that best suits your use case. There are three main control categories in Avalonia:

1. [User controls](#user-controls)
2. [Templated controls](#templated-controls)
3. [Custom-drawn controls](#custom-drawn-controls)

In addition to these three categories, you can also create custom derivatives of [content controls, headered content controls or items controls](#other-customizable-controls).

### User controls

User controls are authored the same way you would author a custom `Window`: by creating a new `UserControl` from a template and adding controls to it. The `UserControl` acts as a container that combines multiple existing controls into a single, cohesive element.

This type of control is best for reusable "views" or "pages" that are specific to an application, for example, a "User Details View". It is less suited for general-purpose UI elements.

To create a custom user control:

1. **Define the XAML.** Create a new `UserControl` XAML file. Decide the layout and appearance of the custom control by placing existing controls, setting properties and applying styles.
2. **Add code-behind.** Optionally, define code-behind logic to handle events, modify behavior, or give the control [styled properties](/docs/custom-controls/defining-properties#registering-a-styled-property).

[A sample of a custom `UserControl` is available to clone on GitHub.](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/CustomControl)

### Templated controls

Templated controls are lookless, meaning the control's behavior and logic are separate from its appearance. This allows a templated control to be restyled for different themes or applications. The behavior and properties of a `TemplatedControl` are defined in code, while the visual representation is styled in XAML, then included in the `Application` via `StyleInclude`.

This type of control is best for general-purpose UI elements that you wish to share across multiple applications. The majority of [Avalonia's standard controls](/controls) are templated controls.

:::info
In Avalonia, a custom templated control inherits from `TemplatedControl`. This is unlike WPF or UWP, where you would inherit from the `Control` class.
:::

To create a custom templated control:

1. **Define the control class.** Create a new class that derives from `TemplatedControl`. Decide the behavior, properties and events of the custom control.
2. **Add a control template.** Create a [control theme](/docs/styling/control-themes) XAML file. Decide the visual appearance of the control.
3. **Add further styling.** Further customize the look of the control by adjusting the control template or applying additional styles, if desired.

More detailed guidance is documented in [Templated controls](/docs/custom-controls/templated-controls).

### Custom-drawn controls

Custom-drawn controls draw themselves using geometry by overriding the `Visual.Render` method. By applying the  `DrawingContext` API, you can specify a control's exact appearance. Some controls from [Avalonia's built-in controls](/controls) are drawn this way, e.g., `TextBlock` or `Image`.

This approach gives you fine-grained control over every aspect of the control's visual representation. Use custom-drawn controls for non-interactive graphical elements that do not need to be themed.

:::info
In Avalonia, a custom-drawn control inherits from `Control`. This is unlike WPF or UWP, where you would inherit from the `FrameworkElement` class.
:::

To create a custom-drawn control:

1. **Define the control class.** Create a new class that derives from `Control`. Decide the behavior and rendering of the control.
2. **Override the `Render` method.** Override the `Render` method in the control class. Use `DrawingContext` to draw the control.

More detailed guidance is documented in [Custom-drawn controls](/docs/custom-controls/custom-drawn-controls).

### Other customizable controls

In addition to the three options described above, you can also create custom control classes derived from the following:

- `ContentControl`, a control hosting a single piece of content.
- `HeaderedContentControl`, a control with a header and a content area.
- `ItemsControl`, a control that displays a collection of items.

These controls all derive from `Control`, meaning properties like `Width`, `Height`, `Margin`, and `DataContext` are available by default.

## See also

- [Custom templated controls](/docs/custom-controls/templated-controls): Build a lookless control whose appearance is defined by a control theme.
- [Custom-drawn controls](/docs/custom-controls/custom-drawn-controls): Create a control that draws itself by overriding `Render`.
- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
- [Defining events](/docs/custom-controls/defining-events): Add routed events to a custom control.
- [Custom control library](/docs/custom-controls/custom-control-library): Package custom controls in a class library and reference them from another project.