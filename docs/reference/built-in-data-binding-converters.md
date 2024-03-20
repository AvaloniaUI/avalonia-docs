---
description: REFERENCE
---

# Built-in Data Binding Converters

_Avalonia UI_ includes a number of built-in data binding converters for common scenarios:

| Converter                           | Direction | Description                                                                                                |
|-------------------------------------|-----------|------------------------------------------------------------------------------------------------------------|
| Negation Operator                   | OneWay    | The ! operator can be placed in front of the data binding path to return the inversion of a Boolean value. |
| `StringConverters.IsNullOrEmpty`    | OneWay    | Returns `true` if the input string is null or empty.                                                       |
| `StringConverters.IsNotNullOrEmpty` | OneWay    | Returns `false` if the input string is null or empty.                                                      |
| `ObjectConverters.IsNull`           | OneWay    | Returns `true` if the input is null.                                                                       |
| `ObjectConverters.IsNotNull`        | OneWay    | Returns `false` if the input is null.                                                                      |
| `BoolConverters.And`                | OneWay    | A multi-value converter that returns `true` if all inputs are true.                                        |
| `BoolConverters.Or`                 | OneWay    | A multi-value converter that returns `true` if any input is true.                                          |
| `BoolConverters.Not`                | OneWay    | Returns `true` if input is false, otherwise returns `false`. Similar to negation operator.                 |
| `StringFormatValueConverter`        | OneWay    | Returns a formatted string with the supplied parameter.                                                    |
| `StringFormatMultiValueConverter`   | OneWay    | Returns a formatted string with multiple input parameters.                                                 |
| `EnumToBoolConverter`               | TwoWay    | Returns `true` if the input and parameter are the same, else `false`.                                      |

:::caution
Most of these are contained within `Avalonia.Data.Converters`, but some are within `Avalonia.Controls.Converters`
:::

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

## Null-checking Examples

This example binding will hide the text block if its bound text is null or empty:

```xml
<TextBlock Text="{Binding MyText}"
           IsVisible="{Binding MyText, 
                       Converter={x:Static StringConverters.IsNotNullOrEmpty}}"/>
```

And this example will hide the content control if the bound object is null or empty:

```xml
<ContentControl Content="{Binding MyContent}"
                IsVisible="{Binding MyContent, 
                            Converter={x:Static ObjectConverters.IsNotNull}}"/>
```

## StringFormatMultiValueConverter

```xml
<TextBlock>
    <TextBlock.Resources>
        <converter:StringFormatMultiValueConverter x:Key="RgbFormatConverter">
            <x:Arguments>
                <x:String>(r: {0}, g: {1}, b: {2})</x:String>
                <x:Null />
            </x:Arguments>
        </converter:StringFormatMultiValueConverter>
    </TextBlock.Resources>
    <TextBlock.Text>
        <MultiBinding Converter="{StaticResource RgbFormatConverter}">
            <Binding ElementName="red" Path="Value" />
            <Binding ElementName="green" Path="Value" />
            <Binding ElementName="blue" Path="Value" />
        </MultiBinding>
    </TextBlock.Text>
</TextBlock>
```

:::tip
It may be simpler to define a `FuncMultiValueConverter` for this particular case.
:::

## EnumToBooleanConverter

The following example enables only the `Button` with a matching enum value as selected by the `ComboBox`.

```csharp
public enum ProductSize { Small, Medium, Large }
```

`xmlns:con="using:Avalonia.Controls.Converters"`

```xml
<StackPanel>
    <StackPanel.Resources>
        <con:EnumToBoolConverter x:Key="EnumToBool" />
    </StackPanel.Resources>
    <ComboBox x:Name="combo">
        <v:ProductSize>Small</v:ProductSize>
        <v:ProductSize>Medium</v:ProductSize>
        <v:ProductSize>Large</v:ProductSize>
    </ComboBox>
    <StackPanel Orientation="Horizontal">
        <Button Content="Small" IsEnabled="{Binding #combo.SelectedItem, Converter={StaticResource EnumToBool}, ConverterParameter={x:Static v:ProductSize.Small}}" />
        <Button Content="Medium" IsEnabled="{Binding #combo.SelectedItem, Converter={StaticResource EnumToBool}, ConverterParameter={x:Static v:ProductSize.Medium}}" />
        <Button Content="Large" IsEnabled="{Binding #combo.SelectedItem, Converter={StaticResource EnumToBool}, ConverterParameter={x:Static v:ProductSize.Large}}}" />
    </StackPanel>
</StackPanel>
```

## More Information

:::info
You can follow the Avalonia UI value converter sample, [here](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample).
:::
