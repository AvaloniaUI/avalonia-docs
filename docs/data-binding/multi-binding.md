---
id: multi-binding
title: MultiBinding
description: Combine multiple binding sources into a single value using MultiBinding and IMultiValueConverter.
doc-type: how-to
---

[`MultiBinding`](/api/avalonia/data/multibinding) combines values from multiple source properties into a single target property. It is useful when a display value depends on more than one data source, such as formatting a full name from separate first and last name properties, or computing a composite value.

## Basic usage with StringFormat

The simplest use of `MultiBinding` is combining multiple values into a formatted string:

```xml
<TextBlock>
    <TextBlock.Text>
        <MultiBinding StringFormat="{}{0} {1}">
            <Binding Path="FirstName" />
            <Binding Path="LastName" />
        </MultiBinding>
    </TextBlock.Text>
</TextBlock>
```

Each `Binding` inside the `MultiBinding` maps to a placeholder (`{0}`, `{1}`, and so on) in the `StringFormat` pattern. The format string follows standard .NET `string.Format` rules.

### Formatting numbers

```xml
<TextBlock>
    <TextBlock.Text>
        <MultiBinding StringFormat="Total: {0:C2} ({1} items)">
            <Binding Path="TotalPrice" />
            <Binding Path="ItemCount" />
        </MultiBinding>
    </TextBlock.Text>
</TextBlock>
```

:::tip
When `StringFormat` starts with `{0`, you must escape the opening brace. Prefix the pattern with `{}` or use backslash escaping: `StringFormat='\{0\} items'`.
:::

## Using an IMultiValueConverter

For logic beyond string formatting, implement `IMultiValueConverter`. This converter receives an array of values from all child bindings and returns a single result.

### Defining the converter

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using Avalonia.Data.Converters;

public class AllTrueConverter : IMultiValueConverter
{
    public object? Convert(
        IList<object?> values,
        Type targetType,
        object? parameter,
        CultureInfo culture)
    {
        foreach (var value in values)
        {
            if (value is not true)
                return false;
        }
        return true;
    }
}
```

### Using the converter in XAML

Declare the converter as a resource, then reference it from the `MultiBinding`:

```xml
<Window.Resources>
    <local:AllTrueConverter x:Key="AllTrue" />
</Window.Resources>

<Button Content="Submit"
        IsEnabled="{MultiBinding Converter={StaticResource AllTrue}}">
    <!-- Intentionally empty: MultiBinding must use property element syntax
         for child bindings. See below for the full form. -->
</Button>
```

Because `MultiBinding` with child bindings requires property element syntax, the full form is:

```xml
<Button Content="Submit">
    <Button.IsEnabled>
        <MultiBinding Converter="{StaticResource AllTrue}">
            <Binding Path="IsFormValid" />
            <Binding Path="HasAcceptedTerms" />
            <Binding Path="IsNotBusy" />
        </MultiBinding>
    </Button.IsEnabled>
</Button>
```

The button is enabled only when all three bound properties are `true`.

## Binding to controls

Child bindings within a `MultiBinding` support the same source options as regular bindings, including `ElementName`, `RelativeSource`, and Avalonia's `#elementName` shorthand:

```xml
<StackPanel>
    <NumericUpDown x:Name="width" Value="100" Minimum="0" Maximum="500" />
    <NumericUpDown x:Name="height" Value="50" Minimum="0" Maximum="500" />

    <TextBlock>
        <TextBlock.Text>
            <MultiBinding StringFormat="Area: {0} x {1} = {2}">
                <Binding Path="Value" ElementName="width" />
                <Binding Path="Value" ElementName="height" />
                <Binding Path="#width.Value"
                         Converter="{x:Static local:MultiplyConverter.Instance}"
                         ConverterParameter="{Binding #height.Value}" />
            </MultiBinding>
        </TextBlock.Text>
    </TextBlock>
</StackPanel>
```

## MultiBinding properties

| Property | Description |
|---|---|
| `Bindings` | The collection of child `Binding` objects. |
| `Converter` | An `IMultiValueConverter` that processes the bound values. |
| `ConverterParameter` | A parameter passed to the converter. |
| `StringFormat` | A format string applied when no converter is specified (or when the converter returns a string). |
| `FallbackValue` | The value used when the multi-binding cannot produce a result. |
| `TargetNullValue` | The value used when the converter returns `null`. |
| `Mode` | The binding mode. `MultiBinding` supports `OneWay` and `OneTime` modes. |
| `Priority` | The binding priority. |

:::info
`MultiBinding` is one-way by default. Two-way multi-bindings are not supported because there is no general way to reverse a multi-value conversion back to individual source properties.
:::

:::tip
Unlike WPF, Avalonia supports nesting a `MultiBinding` inside another `MultiBinding`. Each nested `MultiBinding` resolves to a single value in the parent converter's input array.
:::

## FuncMultiValueConverter

Avalonia provides `FuncMultiValueConverter<TIn, TOut>` for simple scenarios where you want to define the conversion logic inline without creating a full class.

The converter function receives an `IReadOnlyList<TIn>`, so you can iterate over values or access them by index:

```csharp
public static class Converters
{
    // Iterate over all values
    public static readonly FuncMultiValueConverter<string, string> FullName =
        new(parts => string.Join(" ", parts.Where(p => !string.IsNullOrEmpty(p))));

    // Access values by index
    public static readonly FuncMultiValueConverter<string, string> FormattedName =
        new(parts => $"{parts[1]}, {parts[0]}");
}
```

```xml
<TextBlock>
    <TextBlock.Text>
        <MultiBinding Converter="{x:Static local:Converters.FullName}">
            <Binding Path="FirstName" />
            <Binding Path="MiddleName" />
            <Binding Path="LastName" />
        </MultiBinding>
    </TextBlock.Text>
</TextBlock>
```

## Common patterns

### Visibility from multiple conditions

```csharp
public class AnyTrueConverter : IMultiValueConverter
{
    public static readonly AnyTrueConverter Instance = new();

    public object? Convert(
        IList<object?> values,
        Type targetType,
        object? parameter,
        CultureInfo culture)
    {
        return values.Any(v => v is true);
    }
}
```

```xml
<Border IsVisible="{MultiBinding Converter={x:Static local:AnyTrueConverter.Instance}}">
    <!-- Shown when any condition is true -->
    <Border.IsVisible>
        <MultiBinding Converter="{x:Static local:AnyTrueConverter.Instance}">
            <Binding Path="HasErrors" />
            <Binding Path="HasWarnings" />
        </MultiBinding>
    </Border.IsVisible>
</Border>
```

### Computing a value from multiple inputs

```csharp
public class RectangleAreaConverter : IMultiValueConverter
{
    public object? Convert(
        IList<object?> values,
        Type targetType,
        object? parameter,
        CultureInfo culture)
    {
        if (values.Count >= 2
            && values[0] is double width
            && values[1] is double height)
        {
            return width * height;
        }
        return 0.0;
    }
}
```

## See also

- [Data Binding Syntax](data-binding-syntax): Binding parameters including StringFormat.
- [How to Create a Custom Converter](how-to-create-a-custom-data-binding-converter): Single-value converters.
- [Built-in Data Binding Converters](built-in-data-binding-converters): Converters shipped with Avalonia.
