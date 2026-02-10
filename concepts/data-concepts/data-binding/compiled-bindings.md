---
description: CONCEPTS
---

# Compiled Bindings

Bindings defined in the XAML are using reflection in order to find and access the requested property in your `ViewModel`. In Avalonia you can also use compiled bindings, which has some benefits:

* If you use compiled bindings and the property you bind to is not found, you will get a compile-time error. Hence you get a much better debugging experience.
* Reflection is known to be slow ([see this article on codeproject.com](https://www.codeproject.com/Articles/1161127/Why-is-reflection-slow)). Using compiled bindings can therefore improve the performance of your application.

## Enable and disable compiled bindings

:::info

Depending on the template that was used to create the Avalonia project, compiled bindings may or may not be enabled by default. You can check this in the project file.

::: 

### Enable and disable globally

If you want your application to use compiled bindings globally by default, you can add

```xml
<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
```

to your project file. You will still need to provide `x:DataType` for the objects you want to bind but you don't need to to set `x:CompileBindings="[True|False]"` for each `UserControl` or `Window`.

### Enable and disable per UserControl or Window

To enable compiled bindings, you will need to define the `DataType` of the object you want to bind to first. In [`DataTemplates`](/concepts/data-concepts/data-templates/introduction-to-data-templates) there is a property `DataType`, for all other elements you can set it via `x:DataType`. Most likely you will set `x:DataType` in your root node, for example in a `Window` or an `UserControl`. You can also specify the `DataType` in the `Binding` directly.

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

## DataContext type inference

With compiled bindings enabled and `x:DataType` set on your root element, the Avalonia XAML compiler can infer the target type, even when you reference it via a named element (`#MyElement.DataContext`) or a parent lookup (`$parent[ControlType].DataContext`).  

Explicit type casting is not required in most cases.

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
DataContext type inference was introduced in 11.3.0. Earlier versions of Avalonia needed explicit type casting for instances where the target type of the binding expression could not be automatically determined.
:::

:::note
If you use [Rider](https://www.jetbrains.com/rider/) as your IDE, the syntax highlighting may flag an error. However, the compiler should still work.
:::

### Explicit type casting

If you are using an earlier version of Avalonia, or if the compiler fails to infer the type, you can still use an explicit type cast in the binding expression to ensure the correct type is used.

We do not generally recommend explicit type casting.

```xml
<Window x:Name="MyWindow"
        xmlns:vm="using:MyApp.ViewModels"
        x:DataType="vm:TestDataContext">
    <TextBlock Text="{Binding #MyWindow.((vm:TestDataContext)DataContext).StringProperty}" />
    <TextBlock Text="{Binding $parent[Window].((vm:TestDataContext)DataContext).StringProperty}" />
</Window>
```

## CompiledBinding-Markup

If you don't want to enable compiled bindings for all child nodes, you can also use the `CompiledBinding`-markup. You still need to define the `DataType`, but you can omit `x:CompileBindings="True"`.

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

## ReflectionBinding-Markup

If you have compiled bindings enabled in the root node (via `x:CompileBindings="True"`) and you either don't want to use compiled binding at a certain position, you can use the `ReflectionBinding`-markup.

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