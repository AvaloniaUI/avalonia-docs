---
description: CONCEPTS
---

import DataBindingModeDiagram from '/img/basics/data-binding/data-binding-syntax/data-binding-mode.png';

# Data Binding Syntax

In Avalonia, you can define data binding in XAML or code. To define data binding in XAML, you use the data binding mark-up extension, and this has its own syntax which is described here.

## Data Binding Mark-up Extension

The data binding mark-up extension uses the keyword `Binding` in combination with parameters that define the data source, and other options. The format of the mark-up extension is like this:

```xml
<SomeControl SomeProperty="{Binding Path, Mode=ModeValue, StringFormat=Pattern}" />
```

When there is more than one option parameter, the list is comma-separated.

<table><thead><tr><th width="222">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>Path</code></td><td>The data binding path.</td></tr><tr><td><code>Mode</code></td><td>One of the binding modes, see below.</td></tr><tr><td><code>StringFormat</code></td><td>A pattern showing how the value is to be formatted.</td></tr><tr><td><code>ElementName</code></td><td>Can be shortened by using # in the path.</td></tr><tr><td><code>Converter</code></td><td>A function that converts the value.</td></tr><tr><td><code>RelativeSource</code></td><td>Works on the visual tree instead of the logical tree.</td></tr></tbody></table>

## Data Binding Path

The first parameter is usually the path to the data source. This is an object in a data context that _Avalonia_ locates when it performs data binding.

There is no need to use the parameter name `Path`here. So these bindings are equivalent:

```xml
<TextBlock Text="{Binding Name}"/>
<TextBlock Text="{Binding Path=Name}"/>
```

The binding path can be a single property, or it can be a chain of properties. For example if the data source has a `Student` property, and the object returned by that property has a property  `Name`, you can bind to the student name using syntax like this:

```markup
<TextBlock Text="{Binding Student.Name}"/>
```

If the data source has an array or list (with an indexer), then you can add the index to the binding path like this:

```markup
<TextBlock Text="{Binding Students[0].Name}"/>
```

## Empty Binding Path

You can specify data binding without a path. This binds to the data context of the control itself (where the binding is defined). These two syntaxes are equivalent:

```xml
<TextBlock Text="{Binding}"/>
<TextBlock Text="{Binding .}"/>
```

## Data Binding Mode

You can change how data is moved in a data binding by specifying the data binding mode.



<img src={DataBindingModeDiagram} alt=''/>

For example:

```markup
<TextBlock Text="{Binding Name, Mode=OneTime}">
```

The available binding modes are:

<table><thead><tr><th width="250">Mode</th><th>Description</th></tr></thead><tbody><tr><td><code>OneWay</code></td><td>Changes in the data source are automatically propagated to the binding target</td></tr><tr><td><code>TwoWay</code></td><td>Changes in the data source are automatically propagated to the binding target, and the other way around as well.</td></tr><tr><td><code>OneTime</code></td><td>The value from the data source is propagated at initialization to the binding target, but subsequent changes are ignored</td></tr><tr><td><code>OneWayToSource</code></td><td>Changes in the binding target are propagated to the data source, but not the other way.</td></tr><tr><td><code>Default</code></td><td>The binding mode is based on a default mode defined in the code for the property. See below.</td></tr></tbody></table>

When no mode is specified, then the default is always used. For a control property that does not change value due to user interaction, the default mode is generally `OneWay`. For a control property that does change value due to user input, then the default mode is usually `TwoWay`.

For example, the default mode for a `TextBlock.Text` property is `OneWay`, and the default mode for a  `TextBox.Text` property is `TwoWay`.

## Converting Bound Values

There are a number of ways to convert the value supplied by a data binding into what is actually displayed in the target control.

### String Formatting

You can apply a pattern to a binding to define how the value is to be displayed. There are a number of syntaxes for this

The pattern index is zero-based, and must always be inside curly braces. When the curly braces are at the beginning of the pattern, even when also inside single quotes, they must be escaped. This can be done either by adding an extra pair of curly braces to the front of the pattern, or by escaping the curly braces using backslashes.

This means that when your pattern starts with a zero, you can use a pair of curly braces to escape the pattern, then supply the pattern itself inside a second pair of curly braces. For example:

```xml
<TextBlock Text="{Binding FloatProperty, StringFormat={}{0:0.0}}" />
```

Alternatively, you can use backslashes to escape the curly brackets needed for the pattern. For example:

```markup
<TextBlock Text="{Binding FloatValue, StringFormat=\{0:0.0\}}" />
```

However, if your pattern does not start with a zero, you do not need the escape. Also, if you have  whitespace in your pattern, you must surround it with single quotes. For example:

```markup
<TextBlock Text="{Binding Animals.Count, StringFormat='I have {0} animals.'}" />
```

Notice that this means that if your pattern starts with the value that you are binding, then you do need the escape.  For example:

```markup
<TextBlock Text="{Binding Animals.Count, 
                                StringFormat='{}{0} animals live in the farm.'}" />
```

:::info
Whenever a `StringFormat` parameter is present, the value of the binding will actually be converted using the `StringFormatValueConverter` (this is one of the built-in converters - see below).
:::

### Built-in Conversions

_Avalonia_ has a range of built-in data binding converters. These include:

* a string formatting converter
* null testing converters
* Boolean operation converters

:::info
For full information on Avalonia built-in data binding converters, see the reference [here](../../../reference/built-in-data-binding-converters.md).
:::

### Custom Conversions

If none of the built-in converters are meet your requirements, then you can implement a custom converter.

:::info
An example of a custom converter can bind an image file. For guidance on how to create a custom converter for an image, see [here](../../../guides/data-binding/how-to-bind-image-files.md).
:::


