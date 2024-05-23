---
id: how-to-bind-multiple-properties
title: 如何绑定多个属性
---

import MultiBindingRgbScreenshot from '/img/guides/data-binding/multibinding-rgb.gif';

## MultiBinding

如果需要将多个属性的运算结果绑定到目标属性，一个合理的解决方案是使用 `MultiBinding`。`MultiBinding` 通过 `IMultiValueConverter` 来聚合多个 `Binding` 对象并产生运算结果。
当被聚合的任意一个 `Binding` 属性发生通知更改时，都会调用 `Convert` 方法。
与 `Binding` 类似，`MultiBinding` 也可以用于绑定视图模型(ViewModels)、`Control` 或其它源属性。

:::warning
`MultiBinding` 只支持 `BindingMode.OneTime` 和 `BindingMode.OneWay`.
:::

## IMultiValueConverter

与 `IValueConverter` 相似，它定义了转换到目标属性的方式。
由于聚合是不可逆的，因此它没有 `ConvertBack` 方法。

```csharp
public interface IMultiValueConverter
{
    object? Convert(IList<object?> values, Type targetType, object? parameter, CultureInfo culture);
}
```

## MultiBinding Example

假设如下场景：存在红、绿、蓝三个颜色通道的输入，目标是将三个输入聚合，运算得出一个 `IBrush` 以供另一控件绑定并进行前景绘制。
在这个场景下，需要通过 `NumericUpDown` 来限制颜色通道值在允许范围内([0, 255])。
由于没有目标属性，`Binding` 的 `MarkupExtension` 将无法正确应用，因此必须将绑定对象创建为 `<Binding>`。

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

随后，我们来创建 `IMultiValueConverter`。参数的类型检查非常重要。
在当前场景中，`NumericUpDown.Value` 是 `decimal?` 类型，因此必须检查 `decimal` 和 `null`。在绑定初始化时，其值也有可能是 `UnsetValueType`。
为了使转换器广泛兼容各种数字类型，还可以进行进一步的数据转换。

```csharp title='转换器实现'
public sealed class RgbToBrushMultiConverter : IMultiValueConverter
{
    public object? Convert(IList<object?> values, Type targetType, object? parameter, CultureInfo culture)
    {
        // 确保提供了所有绑定，并且绑定到了正确的目标类型
        if (values?.Count != 3 || !targetType.IsAssignableFrom(typeof(ImmutableSolidColorBrush)))
            throw new NotSupportedException();

        // 确保所有绑定都是正确的类型
        if (!values.All(x => x is decimal or UnsetValueType or null))
            throw new NotSupportedException();

        // 提取值，如果有任何值未设置则返回 DoNothing。
        // 在绑定初始化期间，Convert会被多次调用，
        // 因此一些属性最初会是未设置的状态。
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

:::tip
* 可以考虑创建一个 `MarkupExtension` 以简化 XAML 的语法，例如经常重用 `MultiBinding` 的场景。
* 可以考虑使用 `FuncMultiValueConverter` 来减少较为简易的转换器的代码量。
:::
