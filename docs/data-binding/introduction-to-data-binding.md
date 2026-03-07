---
id: introduction-to-data-binding
title: Introduction to data binding
description: Learn how Avalonia data binding connects UI controls to data sources using XAML markup extensions.
doc-type: overview
---

import DataBindingDiagram from '@site/src/components/global/DataBindingDiagram/DataBindingDiagram';

Avalonia uses data binding to move data from application objects into UI controls, change the data in application objects in response to user input, and initiate actions on the application objects in response to commands from the user.

<DataBindingDiagram />

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

```xml
<TextBlock Text="{Binding StatusMessage}" />
```

Binding is used with the MVVM architectural pattern, and this is one of the principle ways of programming with Avalonia UI.

:::info
For more information about how to use the MVVM Pattern with Avalonia, see [The MVVM Pattern](/docs/fundamentals/the-mvvm-pattern).
:::

:::info
For background information on the origins and development of the MVVM pattern at _Microsoft_, see the [Microsoft Patterns and Practices article](https://msdn.microsoft.com/en-us/library/hh848246.aspx).
:::

## Binding modes

Bindings can operate in different modes that control how data flows:

| Mode | Description |
|---|---|
| `OneWay` | Source changes update the target. Target changes are not sent back. |
| `TwoWay` | Changes in either source or target update the other. |
| `OneTime` | The source value is read once and does not track subsequent property changes. The binding re-evaluates if the `DataContext` changes. |
| `OneWayToSource` | Target changes update the source, but not vice versa. |
| `Default` | The mode is determined by the target property. Most display properties default to `OneWay`; editable properties like `TextBox.Text` default to `TwoWay`. |

```xml
<TextBox Text="{Binding Name, Mode=TwoWay}" />
<TextBlock Text="{Binding Name, Mode=OneWay}" />
```

## FallbackValue and TargetNullValue

| Property | Description |
|---|---|
| `FallbackValue` | Value displayed when the binding cannot resolve (e.g., property not found). |
| `TargetNullValue` | Value displayed when the source property is `null`. |

```xml
<TextBlock Text="{Binding Description, TargetNullValue='No description available'}" />
<Image Source="{Binding AvatarUrl, FallbackValue={StaticResource DefaultAvatar}}" />
```

## See also

- [Data Context](/docs/data-binding/data-context): Where the data binder gets the data object from.
- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Binding paths, modes, and converters.
- [The MVVM Pattern](/docs/fundamentals/the-mvvm-pattern): Architectural pattern used with data binding.
