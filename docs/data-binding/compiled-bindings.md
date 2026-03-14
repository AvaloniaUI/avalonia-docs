---
id: compiled-bindings
title: Compiled bindings
description: Use compiled bindings for compile-time validation and improved performance in Avalonia XAML.
doc-type: how-to
---

Bindings defined in XAML use reflection to find and access the requested property in your `ViewModel`. In Avalonia, you can also use compiled bindings, which have some benefits:

* If you use compiled bindings and the property you bind to is not found, you get a compile-time error. This gives you a much better debugging experience.
* Reflection is known to be slow ([see this article on codeproject.com](https://www.codeproject.com/articles/Why-is-Reflection-Slow)). Using compiled bindings can therefore improve the performance of your application.

## Enable and disable compiled bindings

:::info

Depending on the template used to create your Avalonia project, compiled bindings may or may not be enabled by default. You can check this in your project file.

::: 

### Enable and disable globally

If you want your application to use compiled bindings globally by default, add

```xml
<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
```

to your project file. You still need to provide `x:DataType` for the objects you want to bind to, but you don't need to set `x:CompileBindings="[True|False]"` for each `UserControl` or `Window`.

### Enable and disable per UserControl or Window

To enable compiled bindings, first define the `DataType` of the object you want to bind to. In [`DataTemplates`](/docs/data-templates/introduction-to-data-templates) there is a `DataType` property. For all other elements, you can set it via `x:DataType`. You will most likely set `x:DataType` in your root node, for example in a `Window` or a `UserControl`. You can also specify the `DataType` in the `Binding` directly.

You can now enable or disable compiled bindings by setting `x:CompileBindings="[True|False]"`. All child nodes will inherit this property, so you can enable it in your root node and disable it for a specific child, if needed.

```xml
<!-- Set DataType and enable compiled bindings -->
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MyApp.ViewModels"
             x:DataType="vm:MyViewModel"
             x:CompileBindings="True">
    <StackPanel>
        <TextBlock Text="Last name:" />
        <TextBox Text="{Binding LastName}" />
        <TextBlock Text="Given name:" />
        <TextBox Text="{Binding GivenName}" />
        <TextBlock Text="E-Mail:" />
        <!-- Set DataType inside the Binding-markup -->
        <TextBox Text="{Binding MailAddress, DataType={x:Type vm:MyViewModel}}" />

        <Button Content="Send an E-Mail"
                Command="{Binding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

## `DataContext` type inference

With compiled bindings enabled and `x:DataType` set on your root element, the Avalonia XAML compiler can infer the target type, even when you reference it via a named element (`#MyElement.DataContext`) or a parent lookup (`$parent[ControlType].DataContext`).

You do not need explicit type casting in most cases.

For example:

```xml
<Window x:Name="MyWindow"
        xmlns:vm="using:MyApp.ViewModels"
        x:DataType="vm:TestDataContext">
    <TextBlock Text="{Binding #MyWindow.DataContext.StringProperty}" />
    <TextBlock Text="{Binding $parent[Window].DataContext.StringProperty}" />
</Window>
```

:::note
`DataContext` type inference was introduced in 11.3.0. Earlier versions of Avalonia needed explicit type casting for instances where the target type of the binding expression could not be automatically determined.
:::

:::note
If you use [Rider](https://www.jetbrains.com/rider/) as your IDE, the syntax highlighting may flag an error. However, the compiler should still work.
:::

### Explicit type casting

If you are using an earlier version of Avalonia, or if the compiler fails to infer the type, you can still use an explicit type cast in the binding expression to ensure the correct type is used.

Explicit type casting is not generally recommended.

```xml
<Window x:Name="MyWindow"
        xmlns:vm="using:MyApp.ViewModels"
        x:DataType="vm:TestDataContext">
    <TextBlock Text="{Binding #MyWindow.((vm:TestDataContext)DataContext).StringProperty}" />
    <TextBlock Text="{Binding $parent[Window].((vm:TestDataContext)DataContext).StringProperty}" />
</Window>
```

## `CompiledBinding` markup

If you don't want to enable compiled bindings for all child nodes, you can also use the `CompiledBinding` markup. You still need to define the `DataType`, but you can omit `x:CompileBindings="True"`.

```xml
<!-- Set DataType -->
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MyApp.ViewModels"
             x:DataType="vm:MyViewModel">
    <StackPanel>
        <TextBlock Text="Last name:" />
        <!-- use CompiledBinding markup for your binding -->
        <TextBox Text="{CompiledBinding LastName}" />
        <TextBlock Text="Given name:" />
        <TextBox Text="{CompiledBinding GivenName}" />
        <TextBlock Text="E-Mail:" />
        <TextBox Text="{CompiledBinding MailAddress}" />

        <!-- This command will use ReflectionBinding, as it's default -->
        <Button Content="Send an E-Mail"
                Command="{Binding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

## `ReflectionBinding` markup

If you have compiled bindings enabled in the root node (via `x:CompileBindings="True"`) and you don't want to use a compiled binding at a certain position, you can use the `ReflectionBinding` markup.

```xml
<!-- Set DataType -->
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MyApp.ViewModels"
             x:DataType="vm:MyViewModel"
             x:CompileBindings="True">
    <StackPanel>
        <TextBlock Text="Last name:" />
        <TextBox Text="{Binding LastName}" />
        <TextBlock Text="Given name:" />
        <TextBox Text="{Binding GivenName}" />
        <TextBlock Text="E-Mail:" />
        <TextBox Text="{Binding MailAddress}" />

        <!-- We use ReflectionBinding instead -->
        <Button Content="Send an E-Mail"
                Command="{ReflectionBinding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

## Compiled bindings from code

You can also create compiled bindings in C# code using the `CompiledBinding.Create` factory method. This gives you the same compile-time safety and performance benefits as XAML compiled bindings, using LINQ expressions instead of string property paths. See [Compiled bindings from code](/docs/data-binding/binding-from-code#compiled-bindings-from-code) for examples.

## See also

- [Compiled bindings from code](/docs/data-binding/binding-from-code#compiled-bindings-from-code)
- [Data binding syntax](/docs/data-binding/data-binding-syntax)