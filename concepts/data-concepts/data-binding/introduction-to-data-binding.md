---
id: introduction-to-data-binding
title: Introduction to data binding
description: Learn how Avalonia data binding connects your application objects to UI controls using XAML markup, supporting both one-way and two-way data flow.
doc-type: explanation
---

import DataBindingDiagram from '@site/src/components/global/DataBindingDiagram/DataBindingDiagram';

Avalonia uses data binding to move data from application objects into UI controls, update application objects in response to user input, and initiate actions on application objects in response to user commands.

<DataBindingDiagram />

In this arrangement, the control is the **binding target** and the object is the **data source**.

## How data binding works

Avalonia provides a data binding system that handles much of the above activity through simple mappings declared in XAML, without requiring you to write a lot of additional code.

You define binding mappings in XAML by connecting the attributes of an Avalonia control to the properties of an application object. In general terms, the syntax looks like this:

```xml
<SomeControl Attribute="{Binding PropertyName}" />
```

## Two-way bindings

Bindings can be bidirectional, where changes in the properties of a bound application object are reflected in the control, and changes in the control are applied back to the underlying object. A common example of two-way binding is a text input bound to a string property. The XAML might look like this:

```xml
<TextBox Text="{Binding FirstName}" />
```

If the user edits the text in the `TextBox`, the `FirstName` property of the underlying object is automatically updated. In the other direction, if the `FirstName` property changes in code, the text visible in the `TextBox` updates to match.

## One-way bindings

Bindings can also be one-way, where changes in the properties of a bound application object are reflected in the control, but the user cannot modify the value through the control. An example of this is the `TextBlock` control, which is read-only:

```xml
<TextBlock Text="{Binding StatusMessage}" />
```

## Data binding and MVVM

Data binding is a core part of the MVVM (Model-View-ViewModel) architectural pattern, and is one of the principal ways of building applications with Avalonia UI.

:::info
For more information about how to use the MVVM pattern with Avalonia, see [The MVVM pattern](/docs/fundamentals/the-mvvm-pattern).
:::

:::info
For background information on the origins and development of the MVVM pattern at _Microsoft_, see the [Microsoft Patterns and Practices article](https://msdn.microsoft.com/en-us/library/hh848246.aspx).
:::

## See also

- [Data context](data-context)
- [Data binding syntax](data-binding-syntax)
- [Compiled bindings](compiled-bindings)
