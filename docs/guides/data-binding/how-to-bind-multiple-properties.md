---
id: how-to-bind-multiple-properties
title: How to Bind Multiple Properties
---

import MultiBindingRgbScreenshot from '/img/guides/data-binding/multibinding-rgb.gif';

## MultiBinding

In scenarios where a target property must be assigned a result calculated from several other bound properties, a 
`MultiBinding` may be the appropriate solution. `MultiBinding` aggregates multiple `Binding` objects and produces a result 
through the use of an `IMultiValueConverter`. The `Convert` method is called each time any of the bound properties notify 
of change. Similar to `Binding`, `MultiBinding` can be used to bind properties on ViewModels, `Control`s, or other sources.

:::warning
`MultiBinding` only supports `BindingMode.OneTime` and `BindingMode.OneWay`.
:::

## IMultiValueConverter

Similar to `IValueConverter` in that it defines conversions to a target property. There is no `ConvertBack` 
method as aggregate operations are irreversible.

```csharp
public interface IMultiValueConverter
{
    object? Convert(IList<object?> values, Type targetType, object? parameter, CultureInfo culture);
}
```

## MultiBinding Example

Consider the following scenario where you have inputs for red, green, and blue color channels. The aim is to bind 
all 3 inputs and provide an `IBrush` for another control to draw with. Below, the color channel values are constrained 
to the proper range ([0, 255]) by the `NumericUpDown`. Creating `<Binding>` objects is necessary as the `Binding` 
`MarkupExtension` cannot be used because there aren't properties to target.

```xml
<StackPanel HorizontalAlignment="Center" VerticalAlignment="Center" Spacing="8">
    <NumericUpDown x:Name="red" Minimum="0" Maximum="255" Increment="20" Value="0" Foreground="Red" />
    <NumericUpDown x:Name="green" Minimum="0" Maximum="255" Increment="20" Value="0" Foreground="Green" />
    <NumericUpDown x:Name="blue" Minimum="0" Maximum="255" Increment="20" Value="0" Foreground="Blue" />

    <TextBlock Text="MultiBinding Text Color!" FontSize="24">
        <TextBlock.Foreground>
            <MultiBinding Converter="{StaticResource RgbToBrushMultiConverter}">
                <Binding Path="Value" ElementName="red" />
                <Binding Path="Value" ElementName="green" />
                <Binding Path="Value" ElementName="blue" />
            </MultiBinding>
        </TextBlock.Foreground>
    </TextBlock>
</StackPanel>
```

Next, we create the `IMultiValueConverter`. Type checking of parameters is important. In this scenario, `NumericUpDown.Value` 
is a `decimal?` so both `decimal` and `null` must be checked. The value may also be `UnsetValueType` when the bindings are 
being initialized. Further numeric conversion could be done to make the converter broadly compatible with numeric types.

```csharp title='Converter Implementation'
public sealed class RgbToBrushMultiConverter : IMultiValueConverter
{
    public object? Convert(IList<object?> values, Type targetType, object? parameter, CultureInfo culture)
    {
        // Ensure all bindings are provided and attached to correct target type
        if (values?.Count != 3 || !targetType.IsAssignableFrom(typeof(ImmutableSolidColorBrush)))
            throw new NotSupportedException();

        // Ensure all bindings are correct type
        if (!values.All(x => x is decimal or UnsetValueType or null))
            throw new NotSupportedException();

        // Pull values, DoNothing if any are unset.
        // Convert is called several times during initialization of bindings,
        // so some properties will be initially unset.
        if (values[0] is not decimal r ||
            values[1] is not decimal g ||
            values[2] is not decimal b)
            return BindingOperations.DoNothing;

        byte a = 255;
        var color = new Color(a, (byte)r, (byte)g, (byte)b);
        return new ImmutableSolidColorBrush(color);
    }
}
```

<img src={MultiBindingRgbScreenshot} alt=''/>

:::info
Consider creating a `MarkupExtension` to simplify the XAML syntax when a `MultiBinding` is frequently used and 
`FuncMultiValueConverter` to reduce the amount of code needed for simpler converters.
:::
