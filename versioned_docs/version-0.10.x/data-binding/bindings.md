---
id: bindings
title: Bindings
---

You bind in XAML using the `{Binding}` markup extension. By using bindings \(assuming you've implemented [change notifications](https://docs.avaloniaui.net/docs/data-binding/change-notifications)\) any changes to the data context will automatically be updated in the control.

By default a binding binds to a property on the [`DataContext`](https://docs.avaloniaui.net/docs/data-binding/the-datacontext), e.g.:

```markup
<!-- Binds to the TextBlock's DataContext.Name property -->
<TextBlock Text="{Binding Name}"/>

<!-- Which is the same as ('Path' is optional) -->
<TextBlock Text="{Binding Path=Name}"/>
```

An empty binding binds to DataContext itself

```markup
<!-- Binds to the TextBlock's DataContext property -->
<TextBlock Text="{Binding}"/>

<!-- Which is the same as -->
<TextBlock Text="{Binding .}"/>
```

We call the property on the control the binding _target_ and the property on the `DataContext` the binding _source_.

## Binding Path

The binding path above can be a single property, or it can be a chain of properties. For example if the object assigned to the `DataContext` has a `Student` property, and the value of this property has a `Name`, you can bind to the student name using:

```markup
<TextBlock Text="{Binding Student.Name}"/>
```

You can also include array/list indexers in binding paths:

```markup
<TextBlock Text="{Binding Students[0].Name}"/>
```

## Binding Modes

You can change the behavior of a `{Binding}` by specifying a binding `Mode`:

```markup
<TextBlock Text="{Binding Name, Mode=OneTime}">
```

The available binding modes are:

| Mode | Description |
| :--- | :--- |
| `OneWay` | Changes to the source are automatically propagated to the target |
| `TwoWay` | Changes to the source are automatically propagated to the target and vice-versa |
| `OneTime` | The value from the source is propagated at initialization to the target and subsequent changes are ignored |
| `OneWayToSource` | Changes to the target are propagated to the source |
| `Default` | The binding mode is based on the property |

The `Default` mode is assumed if one is not specified. This mode is generally `OneWay` for control properties that do not change due to user input \(e.g. `TextBlock.Text`\) and `TwoWay` for control properties that _do_ change due to user input \(e.g. `TextBox.Text`\).

## String Formatting

You can apply a format string to the binding to influence how the value is represented in the UI:

```markup
<!-- Option 1: Use string format without curly braces -->
<TextBlock Text="{Binding FloatValue, StringFormat=0.0}" />

<!-- Option 2: Use curly braces {} to escape string format -->
<TextBlock Text="{Binding FloatValue, StringFormat={}{0:0.0}}" />

<!-- Option 3: Use backslash \{ to escape string format -->
<TextBlock Text="{Binding FloatValue, StringFormat=\{0:0.0\}}" />

<!-- Option 4: If the string format does not start with {0}, you don't need to escape the string format. -->
<!-- Note: If you have a whitespace in your string format, surround it with single quotes '' -->
<TextBlock Text="{Binding Animals.Count, StringFormat='I have {0} animals.'}" />
<!-- Note: You need to escape the curly braces in case your format string starts with the value you are binding, like so: -->
<TextBlock Text="{Binding Animals.Count, StringFormat='{}{0} animals live in the farm.'}" />
```

When a `StringFormat` parameter is present, the value of the binding will be converted using the `StringFormatValueConverter` which will be passed the format string.


:::info
Read more about the available string formats in the [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/system.string.format)
:::


## Samples

[Basic MVVM Sample](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/BasicMvvmSample)