---
id: compilation
title: XAML compilation
---

Avalonia uses the XamlX compiler to process `.axaml` files at build time. Unlike WPF (which interprets XAML at runtime by default), Avalonia compiles XAML into IL code during the build, providing faster startup, smaller binaries, and compile-time error detection.

## How XAML compilation works

When you build an Avalonia project, the XamlX compiler:

1. Parses each `.axaml` file.
2. Resolves all type references, namespaces, and property names.
3. Validates property assignments and type conversions.
4. Generates IL code that constructs the visual tree directly, without runtime XML parsing.

This means many errors that would only appear at runtime in WPF are caught during compilation in Avalonia.

## Compiled bindings

By default, data bindings use reflection to resolve property paths at runtime. Compiled bindings resolve paths at build time, providing:

- **Build-time validation**: Typos in property names cause compiler errors.
- **Better performance**: No reflection overhead at runtime.
- **AOT compatibility**: Required for Native AOT deployment.

### Enabling compiled bindings per control

Declare the data type with `x:DataType` and enable compilation with `x:CompileBindings`:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MyApp.ViewModels"
             x:DataType="vm:MainViewModel"
             x:CompileBindings="True">
    <!-- This binding is validated at compile time -->
    <TextBlock Text="{Binding UserName}" />
</UserControl>
```

If `UserName` does not exist on `MainViewModel`, the build fails with an error.

### Enabling compiled bindings project-wide

Add this property to your `.csproj` file to make compiled bindings the default:

```xml
<PropertyGroup>
    <AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
</PropertyGroup>
```

With this setting, all bindings require an `x:DataType` declaration. To opt out for specific bindings that need runtime resolution, use [`ReflectionBinding`](/api/avalonia/data/reflectionbinding):

```xml
<TextBlock Text="{ReflectionBinding DynamicProperty}" />
```

### x:DataType on nested elements

You can change the data type within a template or nested scope:

```xml
<ListBox ItemsSource="{Binding Orders}">
    <ListBox.ItemTemplate>
        <DataTemplate x:DataType="vm:OrderViewModel">
            <TextBlock Text="{Binding OrderNumber}" />
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

## Build-time error examples

With compiled XAML bindings, these common mistakes become build errors:

| Mistake | Error |
|---|---|
| `{Binding UserNam}` (typo) | Cannot resolve property 'UserNam' on type 'MainViewModel' |
| Missing `x:DataType` | Cannot use compiled binding without a DataType |
| Wrong property type | Cannot assign 'string' to property of type 'int' |

## Native AOT considerations

When targeting Native AOT, compiled bindings are required because reflection-based bindings may not work without the full runtime. Ensure:

1. `AvaloniaUseCompiledBindingsByDefault` is `true` in your `.csproj`.
2. All bindings have a corresponding `x:DataType` declaration.
3. No `ReflectionBinding` usage remains (or it is guarded with appropriate trimmer annotations).

For more details on AOT deployment, see [Native AOT](/docs/deployment/native-aot).

## Obsolete and experimental diagnostics

The XAML compiler recognizes `[Obsolete]` and `[Experimental]` attributes on types and members. When you use an obsolete or experimental type, property, or event in XAML, the compiler emits a warning (or error, for `[Obsolete]` with `error: true`) with the appropriate diagnostic code and message.

For example, if a control library marks a type as experimental:

```csharp
[Experimental("MYLIB0001")]
public class PreviewPanel : Control { }
```

Using it in XAML produces a build warning:

```text
warning MYLIB0001: 'PreviewPanel' is for evaluation purposes only and is subject to change or removal in future updates.
  --> Views/MainView.axaml(8,6)
```

Similarly, using a member marked `[Obsolete("Use NewProperty instead")]` in XAML will emit an `AVLN2001` warning at build time instead of silently compiling.

You can suppress these diagnostics in your project file if needed:

```xml
<PropertyGroup>
    <NoWarn>$(NoWarn);MYLIB0001</NoWarn>
</PropertyGroup>
```

## Troubleshooting XAML compilation

### Build errors in XAML files

XAML compilation errors appear in the IDE Error List and build output with the file name and line number:

```text
error AVLN2000: Unable to resolve property 'Naem' on type 'MyApp.ViewModels.PersonViewModel'
  --> Views/PersonView.axaml(12,34)
```

### Suppressing errors for dynamic scenarios

If you need runtime-resolved bindings for specific cases (e.g., binding to `dynamic` or `ExpandoObject`), use `ReflectionBinding`:

```xml
<TextBlock Text="{ReflectionBinding SomeDynamicProperty}" />
```

### Design-time data types

For the XAML previewer and IntelliSense, ensure `x:DataType` is set. This also enables auto-complete for binding paths in IDEs that support it.

```xml
<UserControl x:DataType="vm:MainViewModel">
    <!-- IDE provides IntelliSense for binding paths -->
    <TextBox Text="{Binding SearchText}" />
</UserControl>
```

## See also

- [Compiled Bindings](/docs/data-binding/compiled-bindings): Detailed compiled binding reference.
- [Avalonia XAML](/docs/fundamentals/avalonia-xaml): XAML fundamentals.
- [x: Directives](directives): Full reference for x:CompileBindings, x:DataType, and other directives.
- [Native AOT](/docs/deployment/native-aot): AOT deployment guide.
