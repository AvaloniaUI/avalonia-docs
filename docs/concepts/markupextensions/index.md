---
id: markupextensions
title: Markup extensions
description: Markup extensions are simple classes that provide values to XAML properties at runtime. They provide a convenient, reusable option for code-based customization of properties.
---

Markup extensions are simple classes that provide values to XAML properties at runtime. They provide a convenient, reusable option for code-based customization of properties.

## About markup extensions

A classic markup extension is any class that:

- Implements `object? ProvideValue(IServiceProvider?)`
- Optionally inherits from `MarkupExtension` (not required in Avalonia)
- Is used from XAML via the `{ns:Extension ...}` syntax

In Avalonia, `ProvideValue` is allowed to return **any** type. This means the result can be strongly typed, as the returned value is assigned directly to the target property.

Avalonia provides the following markup extensions:

| MarkupExtension                                                                                  | Assigns to Property                                                |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| [StaticResource](/docs/guides/styles-and-resources/resources#static-resource)                    | An existing keyed resource and does not update on changes          |
| [DynamicResource](/docs/guides/styles-and-resources/resources#using-resources)                   | Deferred loading of a keyed resource that will update on changes   |
| Binding                                                                                          | Based on the default binding preference: Compiled or Reflection    |
| [CompiledBinding](/docs/basics/data/data-binding/compiled-bindings#compiledbinding-markup)       | Based on a compiled binding                                        |
| [ReflectionBinding](/docs/basics/data/data-binding/compiled-bindings#reflectionbinding-markup)   | Based on a reflection binding                                      |
| [TemplateBinding](/docs/guides/custom-controls/how-to-create-templated-controls#data-binding)    | Based on a simplified binding used only within a `ControlTemplate` |
| [OnPlatform](/docs/guides/platforms/platform-specific-code/xaml#onplatform-markup-extension)     | Conditionally when on the specified platform                       |
| [OnFormFactor](/docs/guides/platforms/platform-specific-code/xaml#onformfactor-markup-extension) | Conditionally when on the specified factor                         |

## Compiler intrinsics

These technically fall outside of `MarkupExtension` as part of the XAML compiler, but the XAML syntax is the same.

| Intrinsic | Assigns to Property   |
|-----------|-----------------------|
| x:True    | `true` literal        |
| x:False   | `false` literal       |
| x:Null    | `null` literal        |
| x:Static  | Static member value   |
| x:Type    | `System.Type` literal |

The `x:True` and `x:False` literals have use cases where the target binding property is `object` and you need  to provide a boolean. In these scenarios that lack type information, providing "True" remains a `string`.

```xml
<Button Command="{Binding SetStateCommand}" CommandParameter="{x:True}" />
```

## Creating markup extensions

Derive from `MarkupExtension` or add one of the following signatures which are supported via duck-typing:

```csharp
T ProvideValue();
T ProvideValue(IServiceProvider provider);
object ProvideValue();
object ProvideValue(IServiceProvider provider);
```

Here is a basic example with a markup extension used for localization:

```csharp
public class LocExtension
{
    public string Key { get; set; } = "";

    public string ProvideValue(IServiceProvider serviceProvider)
    {
        // Simplified localization lookup
        return LocalizationService.GetString(Key) ?? Key;
    }
}
```

```xml
<TextBlock Text="{local:Loc Key=WelcomeMessage}" />
```

When strong types are used instead of `object`, you will receive compile-time errors when there is a mismatch in the  XAML use of constructor parameters, properties, or the return value in `ProvideValue`. When returning `object`, the actual type returned must match the target property's type, else an `InvalidCastException` is thrown at runtime.

### Using `IServiceProvider`

The `IServiceProvider` passed to `ProvideValue` exposes XAML context services, enabling the extension to understand where it is used.

Common standard services include:

- **`IProvideValueTarget`** — gives access to the target object and property.
- **`IRootObjectProvider`** — provides the XAML document’s root object.

Avalonia also provides additional, XAML-IL specific services:

- **`IAvaloniaXamlIlParentStackProvider`** — exposes the parent object stack during XAML parsing.
- **`IAvaloniaXamlIlXmlNamespaceInfoProvider`** — provides namespace metadata.

These services are optional, but essential for more advanced or context-aware extensions.

### Receiving literal parameters

When parameters are required, use a constructor to receive each parameter in order.

For optional or unordered parameters, use properties instead. Mix and matching with multiple constructors is allowed, 
including parameterless ones.

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

### Receiving parameters from bindings

A common scenario is wanting to transform data coming in from a binding and updating the target property. When all parameters 
come from bindings, this is somewhat straightforward by creating a `MultiBinding` with an `IMultiValueConverter`. In the 
sample below, `MultiplyBinding` requires two bound parameters. If a mix of literal and bound parameters is necessary, 
creating an `IMultiValueConverter` would allow for passing of literals as constructor or `init` parameters. `BindingBase` 
allows for both `CompiledBinding` and `ReflectionBinding` to be used, but does not allow literals.

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
An alternate approach is to return an `IObservable<T>.ToBinding()` instead.
:::

### Returning parameters

Avalonia’s markup extension model is flexible: `ProvideValue` may return anything.

This includes:

- Static .NET object
- Typed .NET object, which can be validated at compile time when assigned to a property
- **Binding** instances
- **Observables (`IObservable<T>`)** for dynamic, reactive values

Binding-returning or observable-returning markup extensions are supported and integrate with Avalonia’s property and data-binding systems.

To make a `MarkupExtension` compatible with multiple target property types, you can return an `object` and handle each type individually.

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

Constructors can also receive parameter types using the `object` approach, but compile-time errors similarly turn into runtime exceptions.

### MarkupExtension Property Attributes

* `[ConstructorArgument]` - Associated property may be initialized by a constructor parameter and should be ignored for 
    XAML serialization if the constructor is used.
* `[MarkupExtensionOption]`, `[MarkupExtensionDefaultOption]` - Used with `ShouldProvideOption`, check `OnPlatform` and `OnFormFactor` source for an example.
