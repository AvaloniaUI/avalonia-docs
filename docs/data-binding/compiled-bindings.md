---
id: compiled-bindings
title: Compiled bindings
description: Use compiled bindings for compile-time validation and improved performance in Avalonia XAML.
doc-type: how-to
---

Avalonia uses compiled bindings by default (as of [version 12](/docs/avalonia12-breaking-changes)) to access requested properties in the view model. Compiled bindings offer the following benefits:

* If the property you bind to is not found, you get a compile-time error to aid debugging.
* Reflection is known to be slow. Compiled bindings can improve the performance of your application.

## Enabling and disabling compiled bindings

Since version 12, Avalonia enables compiled bindings by default. This means you only need to provide `x:DataType` for the objects you want to bind to, and do not need to set `x:CompileBindings="[True|False]"` on controls and windows.

If you wish to disable compiled bindings, you can go to the `.csproj` file of your project and add a `<AvaloniaUseCompiledBindingsByDefault>` flag, which you can set to `false`. Disabling compiled bindings is not recommended.

If `<AvaloniaUseCompiledBindingsByDefault>` is undefined in your project file, it defaults to `true` from v12, but is `false` in earlier versions of Avalonia.

## Setting the data type

Compiled bindings must have the `DataType` of the object you want to bind to.

[`DataTemplates`](/docs/data-templates/introduction-to-data-templates) have a `DataType` property. For all other elements, set the data type with an `x:DataType` in the root node, typically `Window` or `UserControl`.

Alternatively, you can also specify the `DataType` in the `Binding` directly.

```xml
<!-- Set DataType in the root node -->
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MyApp.ViewModels"
             // highlight-next-line
             x:DataType="vm:MyViewModel">

    <StackPanel>
        <TextBlock Text="Last name:" />
        <TextBox Text="{Binding LastName}" />
        <TextBlock Text="Given name:" />
        <TextBox Text="{Binding GivenName}" />
        <TextBlock Text="E-Mail:" />
        <!-- Set DataType inside the Binding -->
        <TextBox Text="{Binding MailAddress, DataType={x:Type vm:MyViewModel}}" />

        <Button Content="Send an E-Mail"
                Command="{Binding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

## `DataContext` type inference

With compiled bindings, the Avalonia XAML compiler can infer the target type, even when you reference it via a named element (`#MyElement.DataContext`) or a parent lookup (`$parent[ControlType].DataContext`).

You do not need explicit type casting in most cases.

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

## `ReflectionBinding` and `CompiledBinding` markup

If you want to use reflection binding in a specific binding, use the `ReflectionBinding` markup.

The reverse is also true: If you have [disabled compiled bindings in your project](#enabling-and-disabling-compiled-bindings), you can still use the `CompiledBinding` markup to use compiled binding in a specific binding.

<Tabs>

<TabItem value="reflection-binding-markup" label="ReflectionBinding markup">

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MyApp.ViewModels"
             x:DataType="vm:MyViewModel">
    <StackPanel>
        <!-- Use the default compiled bindings -->
        <TextBlock Text="Last name:" />
        <TextBox Text="{Binding LastName}" />
        <TextBlock Text="Given name:" />
        <TextBox Text="{Binding GivenName}" />
        <TextBlock Text="E-Mail:" />
        <TextBox Text="{Binding MailAddress}" />

        <!-- This command uses reflection binding instead -->
        <Button Content="Send an E-Mail"
                Command="{ReflectionBinding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

</TabItem>

<TabItem value="compiled-binding-markup" label="CompiledBinding markup">

```xml
<!-- Set DataType -->
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MyApp.ViewModels"
             x:DataType="vm:MyViewModel">
    <StackPanel>
        <!-- Use compiled bindings -->
        <TextBlock Text="Last name:" />
        <TextBox Text="{CompiledBinding LastName}" />
        <TextBlock Text="Given name:" />
        <TextBox Text="{CompiledBinding GivenName}" />
        <TextBlock Text="E-Mail:" />
        <TextBox Text="{CompiledBinding MailAddress}" />

        <!-- This command uses reflection binding instead -->
        <Button Content="Send an E-Mail"
                Command="{Binding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

</TabItem>

</Tabs>

## Differences from reflection bindings

Both binding types resolve the same binding paths, but there are two behavioral differences:

**Command parameter conversion.** When a `Command` binds to a method that accepts a typed parameter, a reflection binding converts the `CommandParameter` value to that type at runtime. A compiled binding casts the value instead, and throws an exception if the types do not match. For more information, see [Binding directly to a method](/docs/data-binding/binding-to-commands#binding-directly-to-a-method).

**Error timing.** A compiled binding reports an unresolved path as a build error. A reflection binding reports it at runtime, as a binding error in the log. For more information, see [Binding debugging](/docs/data-binding/binding-debugging).

## Compiled bindings from code

You can also create compiled bindings in C# code using the `CompiledBinding.Create` factory method. This gives you the same compile-time safety and performance benefits as XAML compiled bindings, using LINQ expressions instead of string property paths. See [Compiled bindings from code](/docs/data-binding/binding-from-code#creating-compiled-bindings-from-code) for examples.

## See also

- [Compiled bindings from code](/docs/data-binding/binding-from-code#creating-compiled-bindings-from-code)
- [Data binding syntax](/docs/data-binding/data-binding-syntax)
- [Binding to commands](/docs/data-binding/binding-to-commands)