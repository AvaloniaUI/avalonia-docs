---
id: data-binding-syntax
title: Data binding syntax
description: Reference for Avalonia data binding markup syntax including paths, modes, converters, and fallback values.
doc-type: reference
---

import DataBindingModeDiagram from '/img/concepts/data-concepts/data-binding-syntax/data-binding-mode.png';

Avalonia supports creating data bindings in XAML and code. Data bindings in XAML are typically created with the
`Binding` [`MarkupExtension`](/api/avalonia/markup/xaml/markupextension) described by this document. To create data bindings in code,
see [How to bind from code](/docs/data-binding/binding-from-code).

## Data binding `MarkupExtension`

The `Binding` `MarkupExtension` uses the keyword `Binding` in combination with optional parameters to define the data
source and other options, as shown in the following example:

```xml
<SomeControl SomeProperty="{Binding Path, Mode=ModeValue, StringFormat=Pattern}" />
```

| Parameter             | Description                                                                       |
|-----------------------|-----------------------------------------------------------------------------------|
| `Path`                | The name of the source property to bind to.                                       |
| `Mode`                | The synchronization direction of the binding.                                     |
| `Priority`            | Priority of the property setter.                                                  |
| `Source`              | The object that contains the `Path`-specified property.                           |
| `ElementName`         | Uses a named `Control` as the `Source`.                                           |
| `RelativeSource`      | Uses a relative `Control` within the visual tree hierarchy as the `Source`.       |
| `StringFormat`        | A pattern to format the property value as a string.                               |
| `Converter`           | An `IValueConverter` that converts the source value to the target value and back. |
| `ConverterParameter`  | A parameter to supply to the `Converter`.                                         |
| `FallbackValue`       | Sets a value when the binding cannot be created or cannot produce a value.        |
| `TargetNullValue`     | Sets a value when the source property contains a `null` value.                    |
| [`UpdateSourceTrigger`](/api/avalonia/data/updatesourcetrigger) | Triggers a source property update when a predefined condition happens.            |
| `Delay`               | Sets a delay before the binding target is updated after the source value changes. |

You must set these parameters at the time of binding creation. They are CLR properties that cannot
be set or updated by additional bindings.

## Data binding path

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

### Null conditional operator

Use the `?.` operator in a binding path to safely navigate through properties that may be `null`. If any segment in the path is `null`, the binding produces a `null` value instead of throwing an exception:

```xml
<TextBlock Text="{Binding SelectedStudent?.Address?.City}"/>
```

This is equivalent to C#'s null conditional operator. Without `?.`, a `null` `SelectedStudent` would produce a binding error.

## Empty binding path

You can specify data bindings without a `Path`. This binds to the `DataContext` of the control itself (where you define the binding). These two syntaxes are equivalent:

```xml
<TextBlock Text="{Binding}" />
<TextBlock Text="{Binding .}" />
```

## Data binding mode

You can change the direction(s) data is synchronized by specifying the `Mode`.

<img src={DataBindingModeDiagram} alt="Diagram showing data binding mode directions between source and target"/>
<br/><br/>

For example:

```xml
<TextBlock Text="{Binding Name, Mode=OneTime}" />
```

The available binding modes are:

| Mode             | Description                                                                                                               |
|------------------|---------------------------------------------------------------------------------------------------------------------------|
| `OneWay`         | Changes in the data source propagate to the binding target.                                                               |
| `TwoWay`         | Changes in the data source propagate to the binding target and vice-versa.                                                |
| `OneTime`        | The value from the data source is propagated once to the binding target. The binding re-evaluates if the `DataContext` changes, but subsequent property changes on the same source are ignored. |
| `OneWayToSource` | Changes in the binding target propagate to the data source, but not the other way.                                        |
| `Default`        | The binding mode is based on a default mode defined in the code for the property. See below.                              |

When no `Mode` is specified, the `Default` is used. For a control property that does not change value due to user interaction, 
the default mode is generally `OneWay`. For a control property that does change value due to user input, the default mode 
is usually `TwoWay`.

For example, the default mode for a `TextBlock.Text` property is `OneWay`, and the default mode for a `TextBox.Text` property is `TwoWay`.

## Data binding sources

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
For more details on how to bind to controls, see [How To Bind to a Control](/docs/data-binding/binding-to-controls)
:::

## Converting bound values

Bindings offer multiple approaches to convert or substitute the value supplied by a data binding into a type or value 
that is more appropriate for the target property.

### String formatting

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

### String formatting with multiple parameters

You can use `MultiBinding` to format a string that requires multiple bound parameters. The following example formats multiple
numeric inputs as a single string to display.

```xml
<StackPanel Spacing="8">
  <NumericUpDown x:Name="red" Minimum="0" Maximum="255" Value="0" FormatString="{}{0:0.}" Foreground="Red" />
  <NumericUpDown x:Name="green" Minimum="0" Maximum="255" Value="0" FormatString="{}{0:0.}" Foreground="Green" />
  <NumericUpDown x:Name="blue" Minimum="0" Maximum="255" Value="0" FormatString="{}{0:0.}" Foreground="Blue" />

  <TextBlock>
    <TextBlock.Text>
      <MultiBinding StringFormat="(r: {0:0.}, g: {1:0.}, b: {2:0.})">
        <Binding Path="Value" ElementName="red" />
        <Binding Path="Value" ElementName="green" />
        <Binding Path="Value" ElementName="blue" />
      </MultiBinding>
    </TextBlock.Text>
  </TextBlock>
</StackPanel>
```

`FormatString` is used internally by `NumericUpDown` to change how its value is displayed. Here, because RGB colors are 
integers, we should not display the decimal portion so `0.` is supplied as a custom numeric format specifier 
that .NET understands.

If the values for the inputs are `red = 100`, `green = 80`, and `blue = 255`, then the text displayed will 
be `(r: 100, g: 80, b: 255)`.

:::tip
An alternative is to use an `InlineCollection` of `Run` elements each with their own single parameter 
binding. This allows visual customization of each segment.
:::

### Built-in conversions

Avalonia has a range of built-in data binding converters. These include:

* Null-testing converters
* Boolean operation converters

:::info
For a listing of Avalonia built-in data binding converters, see the [built-in data binding converters reference](/docs/data-binding/built-in-data-binding-converters).
:::

### Custom conversions

If the built-in converters do not meet your requirements, then you can create a custom converter by implementing `IValueConverter`.

:::info
For guidance on how to create a custom converter, see [How to create a custom data binding converter](/docs/data-binding/how-to-create-a-custom-data-binding-converter).
:::

### FallbackValue

`FallbackValue` is used when the property binding cannot be made or when a converter returns `AvaloniaProperty.UnsetValue`.

A common use case is when a parent property in a subproperty binding is `null`. If `Student` is `null` in the following example, the `FallbackValue` is used:

```xml
<TextBlock Text="{Binding Student.Name, FallbackValue=Cannot find name}"/>
```

:::tip
`ReflectionBinding` can bind to arbitrary types without regard to compile-time safety. When the binding cannot be made, 
`FallbackValue` may be useful to substitute a value.
:::

### `TargetNullValue`

When a binding to a property is successfully created and the property value is `null`, you can use `TargetNullValue` to supply a specific value.

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
            Margin="10">
    <NumericUpDown x:Name="number" Value="200" />
    <TextBlock Text="{Binding #number.Value, TargetNullValue=Value is null}" />
</StackPanel>
```

</XamlPreview>

## `UpdateSourceTrigger`

Controls like `TextBox` synchronize their `Text` binding to the source property on every keystroke by default. In
some use cases, this may trigger a long-running task or undesirable validation. `UpdateSourceTrigger` lets you
specify when synchronization should happen.

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui">
    <TextBlock Width="200">PropertyChanged</TextBlock>
    <TextBox Text="{Binding #propertyChanged.Text}"
             Width="200" />
    <TextBlock Name="propertyChanged"
               Width="200" />

    <TextBlock Width="200">LostFocus</TextBlock>
    <TextBox Text="{Binding #lostFocus.Text, UpdateSourceTrigger=LostFocus}"
             Width="200" />
    <TextBlock Name="lostFocus"
               Width="200" />
</StackPanel>
```

</XamlPreview>

| UpdateSourceTrigger | Description                                                                                      |
|---------------------|--------------------------------------------------------------------------------------------------|
| `Default`           | This currently defaults to `PropertyChanged`.                                                    |
| `PropertyChanged`   | Updates the binding source immediately whenever the binding target property changes.             |
| `LostFocus`         | Updates the binding source whenever the binding target element loses focus.                      |
| `Explicit`          | Updates the binding source only when you call the `BindingExpressionBase.UpdateSource()` method. |

## `Delay`

_Available since Avalonia 11.3_

The `Delay` parameter specifies a time (in milliseconds) to wait before the binding target is updated after the source value changes. Each time the source value changes, the delay timer resets. The target is only updated once the specified time has elapsed since the last change. This is commonly known as "debouncing."

This is particularly useful for search-as-you-type scenarios, where you want to avoid triggering expensive operations (such as filtering or querying a service) on every keystroke.

### XAML usage

```xml
<TextBox Text="{Binding SearchText, Delay=300}" />
```

In this example, the `SearchText` property on your view model is only updated 300 milliseconds after the user stops typing.

### Code usage

When creating bindings in code, set the `Delay` property to a `TimeSpan`:

```csharp
var binding = new Binding("SearchText")
{
    Delay = TimeSpan.FromMilliseconds(300)
};
myTextBox.Bind(TextBox.TextProperty, binding);
```

### Practical example

The following example shows a search TextBox that waits 300ms after the user stops typing before updating the bound property. This prevents a search operation from running on every keystroke.

```xml
<StackPanel Spacing="8">
    <TextBox Watermark="Search..."
             Text="{Binding SearchText, Delay=300}" />
    <TextBlock Text="{Binding SearchResults}" />
</StackPanel>
```

```csharp
public class SearchViewModel : ObservableObject
{
    private string _searchText = string.Empty;
    private string _searchResults = string.Empty;

    public string SearchText
    {
        get => _searchText;
        set
        {
            if (SetProperty(ref _searchText, value))
            {
                // This will only be called 300ms after the user stops typing
                PerformSearch(value);
            }
        }
    }

    public string SearchResults
    {
        get => _searchResults;
        set => SetProperty(ref _searchResults, value);
    }

    private void PerformSearch(string query)
    {
        SearchResults = string.IsNullOrEmpty(query)
            ? string.Empty
            : $"Searching for: {query}";
    }
}
```

## See also

- [Data context](/docs/data-binding/data-context): Where the data binder gets the data object from.
- [Compiled bindings](/docs/data-binding/compiled-bindings): Compile-time binding validation.
- [How to create a custom data binding converter](/docs/data-binding/how-to-create-a-custom-data-binding-converter): Custom value converters.
