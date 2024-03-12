---
description: CONCEPTS
---

import DataBindingModeDiagram from '/img/basics/data-binding/data-binding-syntax/data-binding-mode.png';
import TargetNullValueScreenshot from '/img/basics/data-binding/data-binding-syntax/targetnullvalue.gif';
import UpdateSourceTriggerScreenshot from '/img/basics/data-binding/data-binding-syntax/updatesourcetrigger.gif';

# Data Binding Syntax

Avalonia supports creating data bindings in XAML and code. Data bindings in XAML are typically created with the 
`Binding` `MarkupExtension` which is described by this document. To create data bindings in code, 
see [here](../../../guides/data-binding/binding-from-code.md).

## Data Binding MarkupExtension

The `Binding` `MarkupExtension` uses the keyword `Binding` in combination with optional parameters to define the data 
source and other options as shown by the following example:

```xml
<SomeControl SomeProperty="{Binding Path, Mode=ModeValue, StringFormat=Pattern}" />
```

| Parameter             | Description                                                                       |
|-----------------------|-----------------------------------------------------------------------------------|
| `Path`                | The name of the source property to be bound.                                      |
| `Mode`                | The synchronization direction of the binding.                                     |
| `Priority`            | Priority of the property setter.                                                  |
| `Source`              | The object that contains the `Path`-specified property.                           |
| `ElementName`         | Uses a named `Control` as the `Source`.                                           |
| `RelativeSource`      | Uses a relative `Control` within the Visual Tree hierarchy as the `Source`.       |
| `StringFormat`        | A pattern to format the property value as a string.                               |
| `Converter`           | An `IValueConverter` that converts the source value to the target value and back. |
| `ConverterParameter`  | A parameter to be supplied to the `Converter`.                                    |
| `FallbackValue`       | Sets a value when the binding cannot be created or cannot produce a value.        |
| `TargetNullValue`     | Sets a value when the source property contains a null value.                      |
| `UpdateSourceTrigger` | Triggers a source property update when a predefined condition happens.            |

These parameters must be known and set at the time of binding creation. They are CLR properties that cannot 
be set and updated by additional bindings.

## Data Binding Path

The first parameter specified is usually the `Path`. This is the name of a property in the `Source` (`DataContext` by default) 
that Avalonia locates when creating the binding.

You can omit `Path=` when it is the first parameter. The following two bindings are equivalent:

```xml
<TextBlock Text="{Binding Name}"/>
<TextBlock Text="{Binding Path=Name}"/>
```

The binding path can be a single property or a subproperty chain. For example, if the data source has 
a `Student` property and the object returned by that property has a property `Name`, then you can bind to the student's 
name using syntax like this:

```xml
<TextBlock Text="{Binding Student.Name}"/>
```

If the data source can be indexed (such as an array or list), then you can add the index to the binding path like this:

```xml
<TextBlock Text="{Binding Students[0].Name}"/>
```

## Empty Binding Path

You can specify data bindings without a `Path`. This binds to the `DataContext` of the `Control` itself (where the binding 
is defined). These two syntaxes are equivalent:

```xml
<TextBlock Text="{Binding}" />
<TextBlock Text="{Binding .}" />
```

## Data Binding Mode

You can change the direction(s) data is synchronized by specifying the `Mode`.

<img src={DataBindingModeDiagram} alt=''/>

For example:

```xml
<TextBlock Text="{Binding Name, Mode=OneTime}" />
```

The available binding modes are:

| Mode             | Description                                                                                                               |
|------------------|---------------------------------------------------------------------------------------------------------------------------|
| `OneWay`         | Changes in the data source propagate to the binding target.                                                               |
| `TwoWay`         | Changes in the data source propagate to the binding target and vice-versa.                                                |
| `OneTime`        | The value from the data source is propagated at initialization to the binding target, but subsequent changes are ignored. |
| `OneWayToSource` | Changes in the binding target propagate to the data source, but not the other way.                                        |
| `Default`        | The binding mode is based on a default mode defined in the code for the property. See below.                              |

When no `Mode` is specified, the `Default` is used. For a control property that does not change value due to user interaction, 
the default mode is generally `OneWay`. For a control property that does change value due to user input, the default mode 
is usually `TwoWay`.

For example, the default mode for a `TextBlock.Text` property is `OneWay`, and the default mode for a `TextBox.Text` property is `TwoWay`.

## Data Binding Sources

The `Source` specifies the root object instance that the `Path` is relative to. By default, this is the `DataContext` of the 
containing `Control`. The most common scenario involves binding to another control using `ElementName` or `RelativeSource` 
parameters or with their shorthand syntax as part of the `Path` (`#controlName` and `$parent[ControlType]` respectively).

```xml
<TextBox Name="input" />
<TextBlock Text="{Binding Text, ElementName=input}" />
<TextBlock Text="{Binding #input.Text}" />

<TextBlock Text="{Binding Title, 
    RelativeSource={RelativeSource FindAncestor, AncestorType=Window}}" />
<TextBlock Text="{Binding $parent[Window].Title}" />
```

:::info
For more details on how to bind to controls, see [here](../../../guides/data-binding/binding-to-controls)
:::

## Converting Bound Values

Bindings offer multiple approaches to convert or substitute the value supplied by a data binding into a type or value 
that is more appropriate for the target property.

### String Formatting

You can apply a pattern to a `OneWay` binding to format the bound source property as text via the `StringFormat` 
parameter which uses `string.Format` internally.

The pattern index is zero-based and must be inside curly braces. When the curly braces are at the beginning of 
the pattern, even when also inside single quotes, they must be escaped. Escaping is done by adding an empty pair 
of curly braces at the front of the pattern or a backslash on each brace.

```xml
<TextBlock Text="{Binding FloatProperty, StringFormat={}{0:0.0}}" />
```

Alternatively, you can use backslashes to escape the curly brackets needed for the pattern. For example:

```xml
<TextBlock Text="{Binding FloatProperty, StringFormat=\{0:0.0\}}" />
```

However, if your pattern does not start with a zero, you do not need the escape. Also, if you have whitespace in 
your pattern, you must surround it with single quotes. For example:

```xml
<TextBlock Text="{Binding Animals.Count, StringFormat='I have {0} animals.'}" />
```

Notice that this means that if your pattern starts with the value that you are binding, then you do need the 
escape. For example:

```xml
<TextBlock Text="{Binding Animals.Count, 
    StringFormat='{}{0} animals live in the farm.'}" />
```

:::tip
When the `StringFormat` parameter is present, the value of the binding will be converted using 
`StringFormatValueConverter`, a built-in converter - see below.
:::

### Built-in Conversions

Avalonia has a range of built-in data binding converters. These include:

* A string formatting converter
* Null-testing converters
* Boolean operation converters

:::info
For full information on Avalonia built-in data binding converters, see the reference [here](../../../reference/built-in-data-binding-converters.md).
:::

### Custom Conversions

If the built-in converters do not meet your requirements, then you can create a custom converter by implementing `IValueConverter`.

:::info
For guidance on how to create a custom converter, see [here](../../../guides/data-binding/how-to-create-a-custom-data-binding-converter).
:::

### FallbackValue

`FallbackValue` is used when the property binding cannot be made or when a converter returns `AvaloniaProperty.UnsetValue`.

A common use case is when a parent property in a subproperty binding is `null`. If `Student` is `null` below, 
the `FallbackValue` will be used:

```xml
<TextBlock Text="{Binding Student.Name, FallbackValue=Cannot find name}"/>
```

:::tip
`ReflectionBinding` can bind to arbitrary types without regard to compile-time safety. When the binding cannot be made, 
`FallbackValue` may be useful to substitute a value.
:::

### TargetNullValue

When a binding to a property is successfully created and the property value is `null`, `TargetNullValue` may be used to supply a specific value.

```xml
<StackPanel>
    <NumericUpDown x:Name="number" Value="200" />
    <TextBlock Text="{Binding #number.Value, TargetNullValue=Value is null}" />
</StackPanel>
```

<img src={TargetNullValueScreenshot} alt=''/>

## UpdateSourceTrigger <MinVersion version="11.1" />

Controls like `TextBox` will synchronize their `Text` binding to the source property on every keystroke by default. In 
some use cases, this may trigger a long-running task or undesirable validation. `UpdateSourceTrigger` allows bindings 
to specify when synchronization should happen.

| UpdateSourceTrigger | Description                                                                                      |
|---------------------|--------------------------------------------------------------------------------------------------|
| `Default`           | This currently defaults to `PropertyChanged`.                                                    |
| `PropertyChanged`   | Updates the binding source immediately whenever the binding target property changes.             |
| `LostFocus`         | Updates the binding source whenever the binding target element loses focus.                      |
| `Explicit`          | Updates the binding source only when you call the `BindingExpressionBase.UpdateSource()` method. |

```xml
<StackPanel>
    <TextBox Text="{Binding #propertyChanged.Text}" />
    <TextBlock Name="propertyChanged" />

    <TextBox Text="{Binding #lostFocus.Text, UpdateSourceTrigger=LostFocus}" />
    <TextBlock Name="lostFocus" />
</StackPanel>
```

<img src={UpdateSourceTriggerScreenshot} alt=''/>
