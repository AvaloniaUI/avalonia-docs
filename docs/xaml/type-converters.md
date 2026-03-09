---
id: type-converters
title: Type converters
description: How XAML type converters transform string attribute values into .NET types, including built-in converters and creating custom converters.
doc-type: concept
---

Type converters allow XAML attribute values (which are always strings) to be converted into the appropriate .NET types. When you write `Background="Red"` in XAML, a type converter turns the string `"Red"` into a [`SolidColorBrush`](/api/avalonia/media/solidcolorbrush) object.

## How type converters work

When the XAML engine encounters a property attribute, it:

1. Checks if the property type matches `string` directly. If so, the value is used as-is.
2. Looks for a `TypeConverter` associated with the property type.
3. Uses the converter to transform the string into the target type.

This process is automatic and transparent. You do not need to specify which converter to use.

## Built-in type converters

Avalonia provides type converters for many common types. Here are the most frequently used:

### Colors and brushes

| String Value | Converts To | Example |
|---|---|---|
| `"Red"`, `"Blue"`, `"Green"` | `Color` / `SolidColorBrush` | Named colors |
| `"#FF0000"` | `Color` / `SolidColorBrush` | Hex RGB |
| `"#80FF0000"` | `Color` / `SolidColorBrush` | Hex ARGB |
| `"#F00"` | `Color` / `SolidColorBrush` | Short hex RGB |

```xml
<Border Background="LightBlue" BorderBrush="#333333" />
```

### Thickness (Margins, Padding, BorderThickness)

| String Value | Result |
|---|---|
| `"8"` | Uniform: all sides = 8 |
| `"8,4"` | Left/Right = 8, Top/Bottom = 4 |
| `"4,2,4,2"` | Left, Top, Right, Bottom |

```xml
<Border Margin="8" Padding="12,6" BorderThickness="1,0,1,0" />
```

### CornerRadius

| String Value | Result |
|---|---|
| `"4"` | Uniform radius |
| `"4,4,0,0"` | TopLeft, TopRight, BottomRight, BottomLeft |

```xml
<Border CornerRadius="8" />
```

### GridLength (Column/Row Definitions)

| String Value | Result |
|---|---|
| `"Auto"` | Sizes to content |
| `"*"` | Takes remaining space proportionally |
| `"2*"` | Takes 2x the proportional space |
| `"200"` | Fixed size in device-independent pixels |

```xml
<Grid ColumnDefinitions="200,Auto,*,2*" />
```

### Point

```xml
<Line StartPoint="0,0" EndPoint="100,50" />
```

### Size

```xml
<Viewbox MaxWidth="200" MaxHeight="150" />
```

### Uri / Bitmap

```xml
<Image Source="/Assets/logo.png" />
<Image Source="avares://MyApp/Assets/logo.png" />
```

### Enum values

Enum properties are converted automatically from their string names:

```xml
<StackPanel Orientation="Horizontal" />
<TextBlock TextAlignment="Center" FontWeight="Bold" />
<DockPanel LastChildFill="True" />
```

### Geometry (Path Data)

The `Geometry` type converter parses SVG-style path data:

```xml
<Path Data="M 0,0 L 100,0 L 100,100 Z" Fill="Blue" />
```

For details on path data syntax, see the geometry reference in [Drawing Graphics](/docs/graphics-animation/drawing-graphics).

### KeyGesture

```xml
<KeyBinding Gesture="Ctrl+S" Command="{Binding SaveCommand}" />
```

### TimeSpan

```xml
<Animation Duration="0:0:0.5" />
```

Format: `hours:minutes:seconds.milliseconds`

## Creating a custom type converter

To create a type converter for your own type, implement `TypeConverter` and apply it with the `[TypeConverter]` attribute:

```csharp
[TypeConverter(typeof(TemperatureConverter))]
public struct Temperature
{
    public double Value { get; }
    public string Unit { get; }

    public Temperature(double value, string unit)
    {
        Value = value;
        Unit = unit;
    }
}

public class TemperatureConverter : TypeConverter
{
    public override bool CanConvertFrom(ITypeDescriptorContext? context, Type sourceType)
    {
        return sourceType == typeof(string) || base.CanConvertFrom(context, sourceType);
    }

    public override object? ConvertFrom(
        ITypeDescriptorContext? context, CultureInfo? culture, object value)
    {
        if (value is string text)
        {
            // Parse "72F" or "22C"
            var numericPart = text.TrimEnd('C', 'F', 'K');
            var unit = text[^1..];
            return new Temperature(double.Parse(numericPart, culture), unit);
        }

        return base.ConvertFrom(context, culture, value);
    }
}
```

Now you can use the type in XAML:

```xml
<local:Thermostat CurrentTemperature="72F" />
```

## See also

- [XAML Reference](index): Overview of XAML syntax.
- [Data Binding Converters](/docs/data-binding/how-to-create-a-custom-data-binding-converter): Value converters for data binding (different from type converters).
- [Built-in Data Binding Converters](/docs/data-binding/built-in-data-binding-converters): Converters available for binding transformations.
