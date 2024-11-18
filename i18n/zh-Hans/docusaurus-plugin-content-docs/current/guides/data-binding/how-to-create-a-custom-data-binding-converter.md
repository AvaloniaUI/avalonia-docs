---
id: how-to-create-a-custom-data-binding-converter
title: 如何创建自定义数据绑定转换器
---


# 如何创建自定义数据绑定转换器

当内置的数据绑定转换器不满足您的转换需求时，您可以根据 `IValueConverter` 接口编写自定义转换器。本指南将向您展示如何进行操作。

:::info
若要查看 `IValueConverter` 接口的 _Microsoft_ 文档，请点击[此处](https://docs.microsoft.com/en-gb/dotnet/api/system.windows.data.ivalueconverter?view=netframework-4.7.1)。
:::

:::info
由于在 .NET标准2.0 中无法使用 `IValueConverter` 接口，Avalonia UI 在 `Avalonia.Data.Converters`命名空间中提供了该接口的副本。您可以在这里查看有关此接口的API文档：[这里](https://reference.avaloniaui.net/api/Avalonia.Data.Converters/IValueConverter/)。
:::

在使用自定义转换器之前，您必须在某些资源中引用它。这可以在应用程序的任何级别进行。在此示例中，自定义转换器 `myConverter` 被引用在 Window 资源中：

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

## 示例

此示例数据绑定转换器可以将文本转换为特定的大小写形式，使用参数进行控制：

```xml
<TextBlock Text="{Binding TheContent, 
    Converter={StaticResource textCaseConverter},
    ConverterParameter=lower}" />
```

上述XAML假设已在资源中引用了 `textCaseConverter`。

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

## 目标属性类型

您可能希望编写一个自定义转换器，根据目标属性的要求切换输出类型。您可以通过 `Convert` 方法接收的 `targetType` 参数进行测试，使用 `IsAssignableTo` 函数来实现这一点。

在这个示例中，`animalConverter` 可以为绑定的 `Animal` 类对象查找图像或文本名称：

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

## 更多信息

:::info
关于如何绑定图像的进一步指导，请参阅[这里](how-to-bind-image-files.md)。
:::
