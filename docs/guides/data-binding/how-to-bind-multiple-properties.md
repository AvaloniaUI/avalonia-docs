---
id: how-to-bind-multiple-properties
title: How to Bind Multiple Properties
---

## MultiBinding

In scenarios where a target property must be assigned a result calculated from several other bound properties, a 
`MultiBinding` may be the appropriate solution. `MultiBinding` aggregates multiple bindings and produces a result 
through the use of an `IMultiValueConverter`. The `Convert` method is called each time any of the
bound properties change.

:::warning

Only supports `BindingMode.OneTime` and `BindingMode.OneWay`.

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

Consider the following scenario where you have the following ViewModels:

```csharp
public partial class ColorViewModel : ViewModelBase
{
    [ObservableProperty] private byte _red;
    [ObservableProperty] private byte _green;
    [ObservableProperty] private byte _blue;
    [ObservableProperty] private byte _alpha;
}

public partial class MainViewModel : ViewModelBase
{
    [ObservableProperty] private ColorViewModel _color;
}
```

Your aim is to bind `ColorViewModel` to a `TextBlock.Foreground`. Writing a single value `IValueConverter` to convert the 
`ColorViewModel` to an `IBrush` works initially, but does not update when the individual color channels are changed. The 
update only happens when the entire `ColorViewModel` is replaced. This is because change notifications do not bubble up 
and re-notify on their parent. Instead, we can bind to all four properties at once using a `MultiBinding` so 
that updates occur when any color channel property changes.

```xml title='MultiBinding Usage'
<TextBlock Text="MultiBinding Text Color!">
    <TextBlock.Foreground>
        <MultiBinding Converter="{StaticResource ColorToBrushMultiConverter}">
            <Binding Path="Color.Red" />
            <Binding Path="Color.Green" />
            <Binding Path="Color.Blue" />
            <Binding Path="Color.Alpha" />
        </MultiBinding>
    </TextBlock.Foreground>
</TextBlock>
```

```csharp title='Converter Implementation'
public sealed class ColorToBrushMultiConverter : IMultiValueConverter
{
    public object? Convert(IList<object?> values, Type targetType, object? parameter, CultureInfo culture)
    {
        // Ensure all bindings are provided and attached to correct target type
        if (values?.Count != 4 || !targetType.IsAssignableFrom(typeof(ImmutableSolidColorBrush)))
            throw new NotSupportedException();

        // Ensure all bindings are correct type
        if (!values.All(x => x is byte or UnsetValueType))
            throw new NotSupportedException();

        // Pull values, DoNothing if any are unset.
        // Convert is called several times during initialization of bindings,
        // so some properties will be initially unset.
        if (values[0] is not byte r ||
            values[1] is not byte g ||
            values[2] is not byte b ||
            values[3] is not byte a)
            return BindingOperations.DoNothing;

        var color = new Color(a, r, g, b);
        return new ImmutableSolidColorBrush(color);
    }
}
```

:::info

Consider creating a `MarkupExtension` to simplify the XAML syntax when a `MultiBinding` is frequently used and 
`FuncMultiValueConverter` to reduce the amount of code needed for simpler converters.

:::
