---
id: how-to-create-a-custom-data-binding-converter
title: How to Create a Custom Data Binding Converter
---


# How to Create a Custom Data Binding Converter

When one of the built-in data binding converters does not meet your conversion requirements, you can write a custom converter based on the `IValueConverter` interface. This guide will show you how.

:::info
To review the _Microsoft_ documentation for the `IValueConverter` interface, see [here](https://docs.microsoft.com/en-gb/dotnet/api/system.windows.data.ivalueconverter?view=netframework-4.7.1).
:::

:::info
As the `IValueConverter` interface was not available in .NET standard 2.0, Avalonia UI  contains a copy in the `Avalonia.Data.Converters` namespace. You can see the API documentation about this interface, [here](https://reference.avaloniaui.net/api/Avalonia.Data.Converters/IValueConverter/).
:::

You must reference a custom converter in some resources before it can be used. This can be at any level in your application. In this example, the custom converter `myConverter` is referenced in the window resources:

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

## Example

This example data binding converter can convert text to specific case from a parameter:

```xml
<TextBlock Text="{Binding TheContent, 
    Converter={StaticResource textCaseConverter},
    ConverterParameter=lower}" />
```

The above XAML assumes that the `textCaseConverter` has been referenced in a resource.

```csharp
public class TextCaseConverter : IValueConverter
{
    public static readonly TextCaseConverter Instance = new();

    public object? Convert(object? value, Type targetType, object? parameter, 
                                                            CultureInfo culture)
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
                    var txtinfo = new System.Globalization.CultureInfo("en-US",false)
                                    .TextInfo;
                    return txtinfo.ToTitleCase(sourceText);
                default:
                    // invalid option, return the exception below
                    break;
            }
        }
        // converter used for the wrong type
        return new BindingNotification(new InvalidCastException(), 
                                                BindingErrorType.Error);
    }

    public object ConvertBack(object? value, Type targetType, 
                                object? parameter, CultureInfo culture)
    {
      throw new NotSupportedException();
    }
}
```

## Target Property Type

You may want to write a a custom converter that can switch the output type depending on what the target property requires. You can achieve this becuase the `Convert` method receives a `targetType` argument that you can test with the `IsAssignableTo` function.

In this example, the `animalConverter` can find an image, or a text name for a bound `Animal` class object:  

```xml title='XAML'
<Image Width="42" 
       Source="{Binding Animal, Converter={StaticResource animalConverter}}"/>
<TextBlock 
       Text="{Binding Animal, Converter={StaticResource animalConverter}}" />
```

```csharp title='AnimalConverter.cs'
public class AnimalConverter : IValueConverter
{
    public static readonly AnimalConverter Instance = new();

    public object? Convert( object? value, Type targetType, 
                                    object? parameter, CultureInfo culture )
    {
        if (value is Animal animal)
        {
            if (targetType.IsAssignableTo(typeof(IImage)))
            {
                img = @"icons/generic-animal-placeholder.png"
                switch (animal)
                {
                    case Dog d:
                      img = d.IsGoodBoy ? @"icons/dog-happy.png" 
                                                      : @"icons/dog.png";
                      break;
                    case Cat:
                      img = @"icons/cat.png";
                      break;
                    // etc. etc.
                }
                // see https://docs.avaloniaui.net/docs/guides/data-binding/how-to-create-a-custom-data-binding-converter
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
        return new BindingNotification(new InvalidCastException(), 
                                                    BindingErrorType.Error);
        
    }

    public object ConvertBack( object? value, Type targetType, 
                                    object? parameter, CultureInfo culture )
    {
      throw new NotSupportedException();
    }
}
```

## FuncValueConverter and FuncMultiConverter

You can also implement a `FuncValueConverter` if you don't need to convert back and also not the the `ConverterParameter`. The FuncValueConverter has two generic parameters:

* **TIn**: This parameter defines the expected input type. This can also be an array in case you want to use this converter in a MultiBinding.

* **TOut**: This parameter defines the expected output type.

### Example:

```cs
public static class MyConverters 
{
    /// <summary>
    /// Gets a Converter that takes a number as input and converts it into a text representation
    /// </summary>
    public static FuncValueConverter<decimal?, string> MyConverter { get; } = 
        new FuncValueConverter<decimal?, string> (num => $"Your number is: '{num}'");
    
    /// <summary>
    /// Gets a Converter that takes several numbers as input and converts it into a text representation
    /// </summary>
    public static FuncMultiValueConverter<decimal?, string> MyMultiConverter { get; } = 
        new FuncMultiValueConverter<decimal?, string> (num => $"Your numbers are: '{string.Join(", ", num)}'");
}
```

```xml
<StackPanel>
    <!-- Input -->
    <NumericUpDown x:Name="Num1" Value="3" />
    <NumericUpDown x:Name="Num2" Value="3" />
    <!-- Output -->
    <TextBlock Text="{Binding #Num1.Value, Converter={x:Static my:MyConverters.MyConverter}}" />
    <TextBlock>
        <TextBlock.Text>
            <MultiBinding Converter="{x:Static my:MyConverters.MyMultiConverter}">
                <Binding Path="#Num1.Value" />
                <Binding Path="#Num2.Value" />
            </MultiBinding>
        </TextBlock.Text>
    </TextBlock>
</StackPanel>
```

## More Information

:::info
For further guidance about how to bind images, see [here](how-to-bind-image-files.md).
:::
