---
id: directives
title: "x: directives"
---

XAML directives are special attributes in the `x:` namespace that control how the XAML engine processes elements. They are part of the XAML language specification, not specific to any particular control.

To use these directives, you need the XAML language namespace declaration:

```xml
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
```

## `x:Class`

Connects a XAML file to its code-behind class. This directive must be placed on the root element of the XAML file.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="MyApp.MainWindow">
</Window>
```

The specified class must be a `partial` class that inherits from the type of the root element:

```csharp
namespace MyApp;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }
}
```

## `x:Name`

Assigns a name to an element, generating a field in the code-behind class so you can reference the control from C#.

```xml
<TextBox x:Name="SearchBox" PlaceholderText="Search..." />
<Button Content="Search" Click="OnSearchClick" />
```

```csharp
private void OnSearchClick(object? sender, RoutedEventArgs e)
{
    var query = SearchBox.Text;
    // Use the named control
}
```

:::info
`x:Name` and `Name` are interchangeable for most Avalonia controls. The `Name` property exists on `StyledElement` and sets the same underlying value. Use `x:Name` when the element type does not have a `Name` property.
:::

## `x:Key`

Assigns a dictionary key to a resource, used within `ResourceDictionary`, `Styles`, or `Application.Resources`:

```xml
<Application.Resources>
    <SolidColorBrush x:Key="PrimaryBrush" Color="#1976D2" />
    <x:Double x:Key="DefaultSpacing">8</x:Double>
</Application.Resources>
```

Resources are retrieved using `{StaticResource}` or `{DynamicResource}`:

```xml
<Border Background="{StaticResource PrimaryBrush}" Padding="{StaticResource DefaultSpacing}" />
```

## `x:DataType`

Specifies the expected data type for data binding within a scope. This is required for [compiled bindings](/docs/data-binding/compiled-bindings) and enables IntelliSense for binding paths.

```xml
<Window x:DataType="vm:MainWindowViewModel">
    <TextBlock Text="{Binding UserName}" />
</Window>
```

On `DataTemplate`:

```xml
<DataTemplate x:DataType="vm:TodoItemViewModel">
    <StackPanel>
        <CheckBox IsChecked="{Binding IsComplete}" />
        <TextBlock Text="{Binding Title}" />
    </StackPanel>
</DataTemplate>
```

## `x:CompileBindings`

Enables or disables compiled bindings for all bindings within the scope. Compiled bindings are validated at compile time and offer better performance.

```xml
<UserControl x:CompileBindings="True"
             x:DataType="vm:MyViewModel">
    <!-- All bindings here are compiled -->
    <TextBlock Text="{Binding Name}" />
</UserControl>
```

You can set this globally in your project file:

```xml
<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
```

To opt out of compiled bindings for a specific binding, use `ReflectionBinding`:

```xml
<TextBlock Text="{ReflectionBinding DynamicProperty}" />
```

## `x:Static`

References a static field, property, constant, or enum value:

```xml
<TextBlock Text="{x:Static sys:Environment.MachineName}" />

<Rectangle Fill="{x:Static Brushes.Red}" />

<Border Width="{x:Static local:Constants.DefaultWidth}" />
```

For enum values:

```xml
<ComboBox SelectedItem="{x:Static local:Priority.High}" />
```

## `x:Type`

References a `System.Type` object:

```xml
<Style Selector="Button">
    <Setter Property="Tag" Value="{x:Type Button}" />
</Style>
```

## `x:Null`

Sets a property to `null`:

```xml
<Button Background="{x:Null}" Content="No background" />
```

## `x:True` and `x:False`

Shorthand for boolean values. These are Avalonia-specific extensions:

```xml
<CheckBox IsChecked="{x:True}" />
<TextBox IsReadOnly="{x:False}" />
```

These are equivalent to:

```xml
<CheckBox IsChecked="True" />
<TextBox IsReadOnly="False" />
```

## `x:Shared`

Controls whether a resource is instantiated once and reused, or created fresh each time it is referenced. By default, resources are shared (a single instance is returned every time). Set `x:Shared="False"` to create a new instance on each reference:

```xml
<Application.Resources>
    <ColumnDefinitions x:Key="TwoColumnLayout" x:Shared="False">
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="Auto" />
    </ColumnDefinitions>
</Application.Resources>
```

Without `x:Shared="False"`, assigning the same `ColumnDefinitions` resource to multiple `Grid` controls would fail because a single instance cannot have multiple parents.

:::info
`x:Shared` only applies to resources in a `ResourceDictionary`. It has no effect outside of resource definitions.
:::

## Primitive type elements

The XAML language namespace provides elements for common .NET primitive types:

```xml
<x:String>Hello World</x:String>
<x:Double>3.14</x:Double>
<x:Int32>42</x:Int32>
<x:Boolean>True</x:Boolean>
```

These are useful for defining resources:

```xml
<Application.Resources>
    <x:Double x:Key="HeaderFontSize">24</x:Double>
    <x:String x:Key="AppTitle">My Application</x:String>
</Application.Resources>
```

## See also

- [XAML Reference](index): Overview of XAML syntax.
- [Namespaces](namespaces): How XAML namespaces work.
- [Markup Extensions](markup-extensions): `{Binding}`, `{StaticResource}`, and other extensions.
- [Compiled Bindings](/docs/data-binding/compiled-bindings): How compiled bindings work.
