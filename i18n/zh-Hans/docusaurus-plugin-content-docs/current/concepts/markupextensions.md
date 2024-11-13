---
id: markupextensions
title: Markup Extensions
---

`Markup Extension` 允许在 XAML 中以方便、可重用的语法对目标属性的 setter 逻辑进行基于代码的自定义。大括号用于区分普通文本的使用。
Avalonia 提供了以下内容：
| MarkupExtension                                                                                  | 分配给属性                                                |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| [StaticResource](/docs/guides/styles-and-resources/resources#static-resource)                    | 一个现有的键资源，并且不会在更改时更新          |
| [DynamicResource](/docs/guides/styles-and-resources/resources#using-resources)                   | 延迟加载的键资源，会在更改时更新   |
| Binding                                                                                          | 基于默认的绑定偏好：编译或反射    |
| [CompiledBinding](/docs/basics/data/data-binding/compiled-bindings#compiledbinding-markup)       | 基于编译的绑定                                        |
| [ReflectionBinding](/docs/basics/data/data-binding/compiled-bindings#reflectionbinding-markup)   | 基于反射的绑定                                      |
| [TemplateBinding](/docs/guides/custom-controls/how-to-create-templated-controls#data-binding)    | 基于简化的绑定，仅在 `ControlTemplate` 内使用 |
| [OnPlatform](/docs/guides/platforms/platform-specific-code/xaml#onplatform-markup-extension)     | 当处于指定平台时有条件地使用                       |
| [OnFormFactor](/docs/guides/platforms/platform-specific-code/xaml#onformfactor-markup-extension) | 当处于指定因素时有条件地使用                         |

## 编译器内在函数

这些技术上不属于 `MarkupExtension`，而是 XAML 编译器的一部分，但 和XAML 语法相同。

| 内在函数 | 分配给属性   |
|-----------|-----------------------|
| x:True    | `true` 字面量        |
| x:False   | `false` 字面量       |
| x:Null    | `null` 字面量        |
| x:Static  | 静态成员值   |
| x:Type    | `System.Type` 字面量 |

`x:True` 和 `x:False` 字面量在目标绑定属性为 `object` 且需要提供布尔值的情况下有用。在这些缺少类型信息的场景中，提供 "True" 仍然是一个字符串。

```xml
<Button Command="{Binding SetStateCommand}" CommandParameter="{x:True}" />
```

## 创建 MarkupExtensions

派生自 `MarkupExtension` 或添加以下通过鸭子类型支持的签名之一：

```csharp
T ProvideValue();
T ProvideValue(IServiceProvider provider);
object ProvideValue();
object ProvideValue(IServiceProvider provider);
```

当使用强类型而不是 `object` 时，如果在 XAML 中构造参数、属性或 `ProvideValue` 中的返回值不匹配，将会收到编译时错误。当返回 `object` 时，实际返回的类型必须与目标属性的类型匹配，否则运行时会抛出 `InvalidCastException`。

### 接收字面量参数

当需要参数时，使用构造函数按顺序接收每个参数。

对于可选或无序参数，使用属性代替。允许混合使用多个构造函数，包括无参数构造函数。

```csharp
public class MultiplyLiteral
{
    private readonly double _first;
    private readonly double _second;
    
    public double? Third { get; set; }
    public MultiplyLiteral(double first, double second)
    {
        _first = first;
        _second = second;
    }
    public double ProvideValue(IServiceProvider provider)
    {
        return First * Second * Third ?? 1;
    }
}
```
```xml
<TextBlock Text="This has FontSize=40" FontSize="{namespace:MultiplyLiteral 10, 8, Third=0.5}" />
```

### 从绑定接收参数

常见的场景是希望转换来自绑定的数据并更新目标属性。当所有参数都来自绑定时，通过创建一个带有 `IMultiValueConverter` 的 `MultiBinding` 来实现这一点相对简单。在下面的示例中，`MultiplyBinding` 需要两个绑定参数。如果需要混合字面量和绑定参数，创建一个 `IMultiValueConverter` 可以允许传递字面量作为构造函数或 `init` 参数。`BindingBase` 允许使用 `CompiledBinding` 和 `ReflectionBinding`，但不允许使用字面量。

```csharp
public class MultiplyBinding
{
    private readonly BindingBase _first;
    private readonly BindingBase _second;
    public MultiplyBinding(BindingBase first, BindingBase second)
    {
        _first = first;
        _second = second;
    }
    public object ProvideValue()
    {
        var mb = new MultiBinding()
        {
            Bindings = new[] { _first, _second },
            Converter = new FuncMultiValueConverter<double, double>(doubles => doubles.Aggregate(1d, (x, y) => x * y))
        };
        return mb;
    }
}
```

```xml
<TextBlock FontSize="{local:MultiplyBinding {Binding Multiplier}, {Binding Multiplicand}}" 
           Text="MarkupExtension with Bindings!" />
```

:::info
另一种方法是返回 `IObservable<T>.ToBinding()`。
:::

### 返回参数

为了使 `MarkupExtension` 兼容多种目标属性类型，返回 `object` 并分别处理每种支持的类型。

```csharp
public object ProvideValue(IServiceProvider provider)
{
    var target = (IProvideValueTarget)provider.GetService(typeof(IProvideValueTarget))!;
    var targetProperty = target.TargetProperty as AvaloniaProperty;
    var targetType = targetProperty?.PropertyType;
    double result = First * Second * (Third ?? 1);
    if (targetType == typeof(double))
        return result;
    else if (targetType == typeof(float))
        return (float)result;
    else if (targetType == typeof(int))
        return (int)result;
    else
        throw new NotSupportedException();
}
```

构造函数也可以使用 `object` 方法接收参数类型，但编译时错误同样会变成运行时异常。

### MarkupExtension 属性注解

* `[ConstructorArgument]` - 关联属性可以通过构造函数参数初始化，并且如果使用了构造函数，则在 XAML 序列化时应忽略该属性。
* `[MarkupExtensionOption]`, `[MarkupExtensionDefaultOption]` - 与 `ShouldProvideOption` 一起使用，查看 `OnPlatform` 和 `OnFormFactor` 的源代码以获取示例。