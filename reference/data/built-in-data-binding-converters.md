---
id: built-in-data-binding-converters
title: Built-in data binding converters
---

_Avalonia UI_ includes a number of built-in data binding converters for common scenarios:

| Converter                           | Description                                                                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Negation Operator                   | The ! operator can be placed in front of the data binding path to return the inversion of a Boolean value. See also the note below. |
| `StringConverters.IsNullOrEmpty`    | Returns `true` if the input string is null or empty                                                                                 |
| `StringConverters.IsNotNullOrEmpty` | Returns `false` if the input string is null or empty                                                                                |
| `ObjectConverters.IsNull`           | Returns `true` if the input is null                                                                                                 |
| `ObjectConverters.IsNotNull`        | Returns `false` if the input is null                                                                                                |
| `BoolConverters.And`                | A multi-value converter that returns `true` if all inputs are true.                                                                 |
| `BoolConverters.Or`                 | A multi-value converter that returns `true` if any input is true.                                                                   |

## Negation Operator Examples

This example shows the `TextBlock` when the bound value is false:

```xml
<StackPanel>
  <TextBox Name="input" IsEnabled="{Binding AllowInput}"/>
  <TextBlock IsVisible="{Binding !AllowInput}">Input is not allowed</TextBlock>
</StackPanel>
```

Negation also works when you bind to a non-Boolean value. This works because the bound value is first converted to a Boolean (using the function `Convert.ToBoolean` ) and then the result is negated.

For example, as the integer zero is converted to false (by the function `Convert.ToBoolean`) and all other integer values are converted to true, you can use the negation operator to show a message when a collection is empty, like this:

```xml
<Panel>
  <ListBox ItemsSource="{Binding Items}"/>
  <TextBlock IsVisible="{Binding !Items.Count}">No results found</TextBlock>
</Panel>
```

You can also use the negation operator twice. For example, where you want to perform the conversion from integer to Boolean, and then negate that value.

You can use this to hide a control when a collection is empty (count is zero), like this:

```xml
<Panel>
  <ListBox ItemsSource="{Binding Items}" IsVisible="{Binding !!Items.Count}"/>
</Panel>
```

## Other Conversion Examples

This example binding will hide the text block if its bound text is null or empty:

```xml
<TextBlock Text="{Binding MyText}"
           IsVisible="{Binding MyText, 
                       Converter={x:Static StringConverters.IsNotNullOrEmpty}}"/>
```

This example will hide the content control if the bound object is null or empty:

```xml
<ContentControl Content="{Binding MyContent}"
                IsVisible="{Binding MyContent, 
                            Converter={x:Static ObjectConverters.IsNotNull}}"/>
```

And this example demonstrates binding to multiple bound parameters. It will show the text block if the `MyText` property of the bound object is not null or empty and the `IsMyNotEmptyTextVisible` property is set to `true`:

```xml
<TextBlock Text="{Binding MyText, StringFormat='My text: {0}'}">
  <TextBlock.IsVisible>
    <MultiBinding Converter="{x:Static BoolConverters.And}">
        <Binding Path="MyText" Converter="{x:Static StringConverters.IsNotNullOrEmpty}"/>
        <Binding Path="IsMyNotEmptyTextVisible"/>
    </MultiBinding>
  </TextBlock.IsVisible>
</TextBlock>
```

## More Information


:::info
You can follow the Avalonia UI value converter sample, [here](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample).
:::
