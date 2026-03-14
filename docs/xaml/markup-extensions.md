---
id: markup-extensions
title: Markup extensions
---

Markup extensions are special expressions enclosed in curly braces `{}` that provide dynamic values in XAML. They extend what you can express beyond simple string literals.

## Binding

Creates a data binding between a control property and a source property:

```xml
<TextBlock Text="{Binding UserName}" />
```

### Common binding parameters

| Parameter | Description |
|---|---|
| `Path` | The property path on the source object. This is the default parameter. |
| `Mode` | The binding direction: `OneWay`, `TwoWay`, `OneTime`, `OneWayToSource`, `Default`. |
| `Converter` | An `IValueConverter` that transforms the value. |
| `ConverterParameter` | A parameter passed to the converter. |
| `StringFormat` | A format string applied to the bound value. |
| `FallbackValue` | The value used when the binding fails. |
| `TargetNullValue` | The value used when the source value is `null`. |
| `Source` | An explicit source object (overrides `DataContext`). |
| `ElementName` | Binds to a named element in the same XAML scope. |
| `RelativeSource` | Binds to a relative element (e.g., `TemplatedParent`, `Self`). |

```xml
<TextBlock Text="{Binding Price, StringFormat='Price: {0:C}'}" />
<TextBox Text="{Binding Name, Mode=TwoWay}" />
<TextBlock Text="{Binding Amount, Converter={StaticResource CurrencyConverter}}" />
<Image Source="{Binding ImageUrl, FallbackValue={x:Null}}" />
```

:::info
For a comprehensive guide to binding syntax, see [Data Binding Syntax](/docs/data-binding/data-binding-syntax).
:::

## CompiledBinding

A compile-time validated binding. Functionally equivalent to `{Binding}` when `x:CompileBindings="True"` is set, but can be used explicitly:

```xml
<TextBlock Text="{CompiledBinding UserName}" />
```

Compiled bindings require an `x:DataType` to be set in scope. They provide compile-time checking of binding paths and better runtime performance.

## ReflectionBinding

A reflection-based binding that bypasses compile-time validation. Use this when binding to dynamic or late-bound properties:

```xml
<TextBlock Text="{ReflectionBinding DynamicProperty}" />
```

## StaticResource

Looks up a resource by key from the current element's resource chain, walking up through parent elements to `Application.Resources`. The lookup happens once at load time.

```xml
<TextBlock Foreground="{StaticResource PrimaryBrush}" />
```

If the resource is not found, an exception is thrown at runtime.

### Resource lookup order

1. The current element's `Resources` dictionary.
2. Parent elements' `Resources` dictionaries, walking up the logical tree.
3. The `Application.Resources` dictionary.
4. Theme resources.

## DynamicResource

Similar to `StaticResource`, but the value updates automatically if the resource changes at runtime (e.g., when switching themes):

```xml
<TextBlock Foreground="{DynamicResource SystemAccentColor}" />
```

Use `DynamicResource` for:
- Theme-dependent values (colors, brushes, sizes)
- Resources that change at runtime (e.g., user preferences)
- Resources defined in theme dictionaries

Use `StaticResource` for:
- Values that never change at runtime
- Performance-sensitive scenarios (static lookup is slightly faster)

## TemplateBinding

A lightweight binding used inside `ControlTemplate` definitions that binds to a property of the templated parent control:

```xml
<ControlTemplate TargetType="Button">
    <Border Background="{TemplateBinding Background}"
            Padding="{TemplateBinding Padding}"
            CornerRadius="{TemplateBinding CornerRadius}">
        <ContentPresenter Content="{TemplateBinding Content}" />
    </Border>
</ControlTemplate>
```

`TemplateBinding` is equivalent to `{Binding RelativeSource={RelativeSource TemplatedParent}}` but more efficient.

:::info
`TemplateBinding` only supports `OneWay` mode. If you need `TwoWay` binding inside a template, use `{Binding RelativeSource={RelativeSource TemplatedParent}}` instead.
:::

## OnPlatform

Returns a different value depending on the current operating system:

```xml
<TextBlock FontSize="{OnPlatform Default=14, macOS=13, Android=16}" />

<Window Width="{OnPlatform 800, macOS=900}" />
```

Supported platform values: `Default`, `Windows`, `macOS`, `Linux`, `Android`, `iOS`, `Browser`.

For complex values, use nested syntax:

```xml
<TextBlock>
    <TextBlock.Margin>
        <OnPlatform>
            <On Options="Windows">8,4</On>
            <On Options="macOS">12,6</On>
            <On Options="Default">8,4</On>
        </OnPlatform>
    </TextBlock.Margin>
</TextBlock>
```

## OnFormFactor

Returns a different value based on the device form factor:

```xml
<TextBlock FontSize="{OnFormFactor Default=14, Desktop=14, Mobile=18}" />
```

Supported values: `Default`, `Desktop`, `Mobile`.

## RelativeSource

Specifies a binding source relative to the binding target's position in the visual or logical tree. Used within `{Binding}`:

```xml
<!-- Bind to self -->
<Border Tag="{Binding Width, RelativeSource={RelativeSource Self}}" />

<!-- Bind to templated parent -->
<TextBlock Text="{Binding Header, RelativeSource={RelativeSource TemplatedParent}}" />

<!-- Bind to an ancestor by type -->
<TextBlock Text="{Binding DataContext.Title,
    RelativeSource={RelativeSource FindAncestor, AncestorType=Window}}" />
```

## Markup extension syntax rules

### Basic syntax

```xml
Property="{ExtensionName}"
Property="{ExtensionName Value}"
Property="{ExtensionName Param1=Value1, Param2=Value2}"
```

### Nesting

Markup extensions can be nested:

```xml
<TextBlock Text="{Binding Name, Converter={StaticResource UpperCaseConverter}}" />
```

### Escaping

To set a property to a literal string that starts with `{`, use an empty set of braces:

```xml
<TextBlock Text="{}{This is literal text, not a markup extension}" />
```

## See also

- [XAML Reference](index): Overview of XAML syntax.
- [x: Directives](directives): XAML language directives.
- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Comprehensive binding syntax reference.
- [Compiled Bindings](/docs/data-binding/compiled-bindings): Compile-time validated bindings.
- [Markup Extensions (Data Binding)](/docs/data-binding/markup-extensions): Binding-specific markup extension details.
