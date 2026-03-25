---
id: ui-composition
title: UI composition
description: Compose layouts from windows, built-in controls, user controls, and custom controls.
doc-type: explanation
---

import CompositionBasicLayoutDiagram from '/img/concepts/core-concepts/ui-composition/composition-basic-layout.png';
import CompositionTreesDiagram from '/img/concepts/core-concepts/ui-composition/composition-trees.png';
import CompositionUserControlsDiagram from '/img/concepts/core-concepts/ui-composition/composition-usercontrol.png';
import CompositionCollectionControlsDiagram from '/img/concepts/core-concepts/ui-composition/composition-collection-controls.png';

UI composition is the process you use to create the layouts that your apps require. It allows you to build a complex view from an arrangement of components. The advantages are:

* _Encapsulation_ - reduce the complexity of each component by restricting its XAML and code to only what it needs, making your code more understandable and maintainable.
* _Reuse_ - maintain consistent presentation and behaviour of repeated parts of your app.

Avalonia supports UI composition so you can create the layouts and functions that your apps require.

When you build an app using Avalonia, there are several different types of component to choose from:

* Windows
* Built-in Controls
* User Controls
* Custom Controls
* Template Controls

## Windows and built-in controls

A window in Avalonia is a basic unit of layout (for a windowing platform).

Avalonia contains a large number of built-in controls that will cover most of your UI requirements.   

<img src={CompositionBasicLayoutDiagram} alt="Diagram showing a single control and a multi-control layout inside a window"/>

When you first meet Avalonia, you might place a single built-in control in the content zone of a window (above, left). This is the simplest form of UI composition: the window has the title of the app and usually some window state controls (depending on the target platform). The built-in control allows your app to receive some user input, or to present some output with layout and styling.

A slightly more complex app may require one of the built-in layout controls to arrange more than one other built-in control in the content zone of a window (above, right).

:::info
To see the full range of Avalonia built-in controls, see the [Controls reference](/controls).
:::

## Logical and visual trees

Whatever arrangement of controls you use, Avalonia represents their relationships as a a tree structure, with the 'outermost' control as the root. So for example, the previous UI composition can be represented as the tree shown here:

<img src={CompositionTreesDiagram} alt="Diagram showing the logical control tree for a window with nested controls"/>

This is the **logical control tree**, and it represents the application controls (including the main window) in the hierarchy in which they are defined in the XAML. There are many systems in Avalonia that process the logical control tree and its companion the **visual control tree**.

:::info
For more information on the concept of control trees, see [Control trees](/docs/custom-controls/control-trees).
:::

## User controls

User controls are the mainstay of UI composition in Avalonia.

<img src={CompositionUserControlsDiagram} alt="Diagram showing user controls used as page views and reusable components"/>

You can add a user control to the content zone of a main window, to represent a 'page view' (above, left).  This allows you to implement a more complex app with multiple pages; where the layout and function of each page is in its own user control (XAML and code) files.   

Another use for a user control is as a component control (above, right). You might initially do this to reduce the complexity of a window or page view; but then you might also (perhaps later) reuse the resulting component on another page as well.

## Tutorial

:::info
For tutorials about `DataTemplates` see [Avalonia.Samples](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main?tab=readme-ov-file#%EF%B8%8F-datatemplate-samples).  
:::

## Collection controls

Another variation of UI composition is where you need to present a collection of items.

<img src={CompositionCollectionControlsDiagram} alt="Diagram showing a collection control with a data template rendering items"/>

This scenario will use one of the built-in repeating controls, bound to a collection; together with a data template to represent the items in the collection.

:::info
For information about data templates and collection controls, see the [DataTemplate samples](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main?tab=readme-ov-file#%EF%B8%8F-datatemplate-samples).
:::

## Custom controls

In the unlikely scenario that you cannot find an Avalonia built-in control to cover your app's UI requirements, then you can 'roll-your-own' custom control from scratch. This allows you to define your own custom properties, events and methods; but it will require you to implement the drawing of the control presentation from scratch as well.

:::info
To learn how to implement a custom control, see [Custom controls](/docs/custom-controls).
:::

## Templated controls

A templated control uses the Avalonia **styling** system to create a reusable control whose appearance is defined by a control template. This allows you to change the visual structure of a control without altering its behavior.

:::info
For more information about the concepts behind the Avalonia **styling** system, see [Styles](/docs/styling/styles).
:::

## See also

- [Avalonia XAML](/docs/fundamentals/avalonia-xaml)
- [Code-behind](/docs/fundamentals/code-behind)
- [The MVVM pattern](/docs/fundamentals/the-mvvm-pattern)
- [Controls reference](/controls)
