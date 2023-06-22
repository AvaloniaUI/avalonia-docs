---
id: converting-binding-values
title: Converting Binding Values
---

### Negating Values

Often you will need to negate a value that you're binding to. A frequent use for this is to show/hide a control or to enable/disable it. You can negate a binding value by prepending a "bang" operator: `!`.

For example you might want to show one control when another control is disabled.

```xml
<StackPanel>
  <TextBox Name="input" IsEnabled="{Binding AllowInput}"/>
  <TextBlock IsVisible="{Binding !AllowInput}">Sorry, no can do!</TextBlock>
</StackPanel>
```

Negation also works when binding to non-boolean values. First of all, the value is converted to a boolean using `Convert.ToBoolean` and the result from this is negated. Because the integer value `0` is considered `false` and all other integer values are considered `true`, you can use this to show a message when a collection is empty:

```xml
<Panel>
  <ListBox Items="{Binding Items}"/>
  <TextBlock IsVisible="{Binding !Items.Count}">No results found</TextBlock>
</Panel>
```

A "double-bang" can be used to convert a non-boolean value to a boolean value. For example to hide a control when a collection is empty:

```markup
<Panel>
  <ListBox Items="{Binding Items}" IsVisible="{Binding !!Items.Count}"/>
</Panel>
```

### Binding Converters

For more advanced conversions, Avalonia supports [`IValueConverter`](https://docs.microsoft.com/en-gb/dotnet/api/system.windows.data.ivalueconverter?view=netframework-4.7.1) the same as other XAML frameworks.

> Note: The `IValueConverter` interface is not available in .NET standard 2.0 so we ship our own, in the `Avalonia.Data.Converters` namespace.

Usage is identical to other XAML frameworks:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="clr-namespace:ExampleApp;assembly=ExampleApp">

  <Window.Resources>
    <local:MyConverter x:Key="myConverter"/>
  </Window.Resources>

  <TextBlock Text="{Binding Value, Converter={StaticResource myConverter}}"/>
</Window>
```

### Built-in Converters

Avalonia supplies a number of built-in value converters for common scenarios:

| Converter                           | Description                                                          |
| ----------------------------------- | -------------------------------------------------------------------- |
| `StringConverters.IsNullOrEmpty`    |  Returns `true` if the input string is null or empty                 |
| `StringConverters.IsNotNullOrEmpty` |  Returns `false` if the input string is null or empty                |
| `ObjectConverters.IsNull`           |  Returns `true` if the input is null                                 |
| `ObjectConverters.IsNotNull`        |  Returns `false` if the input is null                                |
| `BoolConverters.And`                |  A multi-value converter that returns `true` if all inputs are true. |
| `BoolConverters.Or`                 |  A multi-value converter that returns `true` if any input is true. |

You can see find list of default converters here: [Avalonia.Data.Converters Namespace](https://docs.avaloniaui.net/api/untitled/avalonia-ui-framework-23/avalonia-ui-framework-24#classtypes).

### Examples

Hiding a `TextBlock` if the bound text is null or empty:

```xml
<TextBlock Text="{Binding MyText}"
           IsVisible="{Binding MyText, Converter={x:Static StringConverters.IsNotNullOrEmpty}}"/>
```

Hiding a `ContentControl` if the bound content is null or empty:

```xml
<ContentControl Content="{Binding MyContent}"
                IsVisible="{Binding MyContent, Converter={x:Static ObjectConverters.IsNotNull}}"/>
```

> from now on assume converters are imported as shown in the previous "Binding Converters" section

Convert text to specific case from a parameter
```xml
<TextBlock Text="{Binding TheContent, 
    Converter={StaticResource textCaseConverter},
    ConverterParameter=lower}" />
```
```csharp
public class TextCaseConverter : IValueConverter
{
    public static readonly TextCaseConverter Instance = new();

    public object? Convert( object? value, Type targetType, object? parameter, CultureInfo culture )
    {
        if (value is string sourceText && parameter is string targetCase
            && targetType.IsAssignableTo(typeof(string)))
        {
            switch (targetCase)
            {
                case "upper":
                case "SQL":
                    return sourceText.ToUpper();
                case "lower":
                    return sourceText.ToLower();
                case "title": // Every First Letter Uppercase
                    var txtinfo = new System.Globalization.CultureInfo("en-US",false).TextInfo;
                    return txtinfo.ToTitleCase(sourceText);
                default:
                    // invalid option, return the exception below
                    break;
            }
        }
        // converter used for the wrong type
        return new BindingNotification(new InvalidCastException(), BindingErrorType.Error);
    }

    public object ConvertBack( object? value, Type targetType, object? parameter, CultureInfo culture )
    {
      throw new NotSupportedException();
    }
}
```


Converting a bound object to different target types contextually

```xml
<Image Width="42" 
       Source="{Binding Animal, Converter={StaticResource animalConverter}}"/>
<TextBlock 
       Text="{Binding Animal, Converter={StaticResource animalConverter}}" />
```

```csharp
public class AnimalConverter : IValueConverter
{
    public static readonly AnimalConverter Instance = new();

    public object? Convert( object? value, Type targetType, object? parameter, CultureInfo culture )
    {
        if (value is Animal animal)
        {
            if (targetType.IsAssignableTo(typeof(IImage)))
            {
                img = @"icons/generic-animal-placeholder.png"
                switch (animal)
                {
                    case Dog d:
                      img = d.IsGoodBoy ? @"icons/dog-happy.png" : @"icons/dog.png";
                      break;
                    case Cat:
                      img = @"icons/cat.png";
                      break;
                    // etc. etc.
                }
                // see https://docs.avaloniaui.net/docs/controls/image
                return BitmapAssetValueConverter.Instance
                    .Convert(img, typeof(Bitmap), parameter, culture);
            }
            else if (targetType.IsAssignableTo(typeof(string)))
            {
                return !string.IsNullOrEmpty(animal.NickName) ? 
                    $"{animal.Name} \"{animal.NickName}\"" : animal.Name;
            }
        }
        // converter used for the wrong type
        return new BindingNotification(new InvalidCastException(), BindingErrorType.Error);
        
    }

    public object ConvertBack( object? value, Type targetType, object? parameter, CultureInfo culture )
    {
      throw new NotSupportedException();
    }
}
```

### Samples

[ValueConverter Sample](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample)