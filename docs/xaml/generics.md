---
id: generics
title: Generic types in XAML
description: Use generic .NET types in Avalonia XAML with the x:TypeArguments directive for collections and custom controls.
doc-type: concept
---

Avalonia supports using generic .NET types in XAML through the `x:TypeArguments` directive. This allows you to instantiate generic classes and use generic collections directly in markup.

## `x:TypeArguments`

The `x:TypeArguments` directive specifies the type arguments for a generic type. It can only be used on the root element of a XAML file or on elements that also have `x:Class` or are inside a resource dictionary.

### Basic syntax

```xml
<local:MyGenericControl x:TypeArguments="x:String" />
```

### Multiple type arguments

Separate multiple type arguments with commas:

```xml
<local:Pair x:TypeArguments="x:String, x:Int32" />
```

## Using generic collections in resources

You can define generic collections as resources:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:sys="using:System"
        xmlns:scg="using:System.Collections.Generic">

    <Window.Resources>
        <scg:List x:Key="Colors" x:TypeArguments="sys:String">
            <sys:String>Red</sys:String>
            <sys:String>Blue</sys:String>
            <sys:String>Green</sys:String>
        </scg:List>
    </Window.Resources>

    <ListBox ItemsSource="{StaticResource Colors}" />
</Window>
```

## Generic custom controls

When creating a generic custom control, define the type parameter in C#:

```csharp
public class TypedList<T> : ItemsControl
{
    public static readonly StyledProperty<T?> SelectedValueProperty =
        AvaloniaProperty.Register<TypedList<T>, T?>(nameof(SelectedValue));

    public T? SelectedValue
    {
        get => GetValue(SelectedValueProperty);
        set => SetValue(SelectedValueProperty, value);
    }
}
```

Use it in XAML with `x:TypeArguments`:

```xml
<local:TypedList x:TypeArguments="vm:Person" ItemsSource="{Binding People}" />
```

## Common generic types in XAML

| Type | XAML Prefix | Example |
|---|---|---|
| `System.String` | `x:String` | `x:TypeArguments="x:String"` |
| `System.Int32` | `x:Int32` | `x:TypeArguments="x:Int32"` |
| `System.Double` | `x:Double` | `x:TypeArguments="x:Double"` |
| `System.Boolean` | `x:Boolean` | `x:TypeArguments="x:Boolean"` |
| Custom types | `local:` or `vm:` | `x:TypeArguments="vm:MyModel"` |

## Limitations

- `x:TypeArguments` on the root element requires `x:Class` to also be specified.
- Nested generic types (e.g., `List<List<string>>`) are not supported in XAML. Define them in code and reference via binding or `x:Static`.
- Not all XAML contexts support `x:TypeArguments`. It works on object elements and resource definitions.

## Workarounds for unsupported scenarios

When XAML generics are not practical, define a concrete subclass:

```csharp
// Define a non-generic subclass for use in XAML
public class StringList : List<string> { }
public class PersonCollection : ObservableCollection<Person> { }
```

```xml
<!-- Use the concrete type directly -->
<local:StringList x:Key="Names">
    <sys:String>Alice</sys:String>
    <sys:String>Bob</sys:String>
</local:StringList>
```

This pattern is common in .NET XAML frameworks and avoids any `x:TypeArguments` limitations.

## See also

- [XAML Namespaces](/docs/xaml/namespaces): How to reference CLR namespaces in XAML.
- [x: Directives](/docs/xaml/directives): Full reference for `x:TypeArguments` and other directives.
- [Type Converters](/docs/xaml/type-converters): Converting string values to .NET types.
