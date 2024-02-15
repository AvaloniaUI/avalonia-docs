---
description: CONCEPTS
---

import DataBindingOverviewDiagram from '/img/basics/data-binding/data-binding-overview.png';

# Data Binding

Avalonia uses data binding to move data from application objects into UI controls, change the data in application objects in response to user input, and initiate actions on the application objects in response to commands from the user. 

<img src={DataBindingOverviewDiagram} alt=''/>

In this arrangement, the control is the **binding target**, and the object is the **data source**.

Avalonia runs a data binding system to complete much of the above activity from simple mappings declared in the XAML; that is without requiring you to add a lot of additional coding.

Data binding mappings are defined using XML between the attributes of an Avalonia control, and the  properties of an application object. In general terms, the syntax is like this:

```xml
<SomeControl Attribute="{Binding PropertyName}" />
```

The mappings can be bidirectional: where changes in the properties of a bound application object are reflected in the control, and changes in the control (however caused) are applied to the underlying object. An example of bidirectional binding is a text input bound to a string property of an object. The XML might look like this:

```xml
<TextBox Text="{Binding FirstName}" />
```

If the user edits the text in the text box, then the `FirstName` property of the underlying object is automatically updated. In the other direction, if the `FirstName` property of the underlying object changes, then the text visible in the text box is updated.

Bindings can be unidirectional: where changes in the properties of a bound application object are reflected in the control, but the user cannot change the control. An example of this would be the text block control, which is read-only.

```
<TextBlock Text="{Binding StatusMessage}" />
```

Binding is used with the MVVM architectural pattern, and this is one of the principle ways of programming with Avalonia UI.

:::info
For more information about how to use the MVVM Pattern with Avalonia, see the concept page [here](../../../concepts/the-mvvm-pattern).
:::

:::info
For background information on the origins and development of the MVVM pattern at _Microsoft_, see the _Microsoft Patterns and Practices_ article [here](https://msdn.microsoft.com/en-us/library/hh848246.aspx).
:::

On the next page, you will learn where the data binder gets the data object from.
