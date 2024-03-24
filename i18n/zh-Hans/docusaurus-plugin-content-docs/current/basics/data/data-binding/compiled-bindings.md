---
description: CONCEPTS
---

# 编译绑定

在XAML中定义的绑定使用反射来查找和访问您的`ViewModel`中请求的属性。在Avalonia中，您还可以使用编译绑定，它有一些好处：

* 如果您使用编译绑定，并且找不到要绑定的属性，您将获得一个编译时错误。因此，您将获得更好的调试体验。
* 已知反射较慢（[请参阅此文章](https://www.codeproject.com/Articles/1161127/Why-is-reflection-slow))。因此，使用编译绑定可以提高应用程序的性能。

## 启用和禁用编译绑定

:::info

根据创建 Avalonia 项目时使用的模板，默认情况下可能启用也可能不启用编译绑定。您可以在项目文件中查看。

:::

### 全局启用和禁用

如果您希望应用程序默认情况下全局使用编译绑定，可以将以下内容添加到您的项目文件中：

```xml
<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
```

您仍然需要为您想要绑定的对象提供`x:DataType`，但是您不需要为每个`UserControl`或`Window`设置`x:CompileBindings="[True|False]"`。

### 在每个UserControl或Window中启用和禁用

要启用编译绑定，您需要首先定义要绑定的对象的`DataType`。在[`DataTemplates`](../data-templates)中，有一个`DataType`属性，对于所有其他元素，您可以通过`x:DataType`来设置它。最可能在根节点中设置`x:DataType`，例如在`Window`或`UserControl`中。您还可以直接在`Binding`中指定`DataType`。

现在，您可以通过设置`x:CompileBindings="[True|False]"`来启用或禁用编译绑定。所有子节点都将继承此属性，因此您可以在根节点中启用它，并在需要时禁用特定子节点。

```xml
<!-- 设置DataType并启用编译绑定 -->
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
        <!-- 在Binding标记中设置DataType -->
        <TextBox Text="{Binding MailAddress, DataType={x:Type vm:MyViewModel}}" />

        <Button Content="Send an E-Mail"
                Command="{Binding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

## CompiledBinding标记

如果您不希望为所有子节点启用编译绑定，还可以使用`CompiledBinding`标记。您仍然需要定义`DataType`，但可以省略`x:CompileBindings="True"`。

```xml
<!-- 设置DataType -->
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MyApp.ViewModels"
             x:DataType="vm:MyViewModel">
    <StackPanel>
        <TextBlock Text="Last name:" />
        <!-- 使用CompiledBinding标记进行绑定 -->
        <TextBox Text="{CompiledBinding LastName}" />
        <TextBlock Text="Given name:" />
        <TextBox Text="{CompiledBinding GivenName}" />
        <TextBlock Text="E-Mail:" />
        <TextBox Text="{CompiledBinding MailAddress}" />

        <!-- 这个命令将使用ReflectionBinding，因为它是默认值 -->
        <Button Content="Send an E-Mail"
                Command="{Binding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

## ReflectionBinding标记

如果您已在根节点启用了编译绑定（通过`x:CompileBindings="True"`），并且您要么不想在某个位置使用编译绑定，要么遇到了[已知的限制](#known-limitations)，则可以使用`ReflectionBinding`标记。

```xml
<!-- 设置DataType -->
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

        <!-- 我们使用ReflectionBinding -->
        <Button Content="Send an E-Mail"
                Command="{ReflectionBinding SendEmailCommand}" />
    </StackPanel>
</UserControl>
```

## 类型转换

在某些情况下，绑定表达式的目标类型无法自动计算。在这种情况下，您必须在绑定表达式中提供一个明确的类型转换。

```xml
<ItemsRepeater ItemsSource="{Binding MyItems}">
<ItemsRepeater.ItemTemplate>
    <DataTemplate>
    <StackPanel Orientation="Horizontal">
        <TextBlock Text="{Binding DisplayName}"/>
        <Grid>
        <Button Command="{Binding $parent[ItemsRepeater].((vm:MyUserControlViewModel)DataContext).DoItCommand}"
                CommandParameter="{Binding ItemId}"/>
        </Grid>
    </StackPanel>
    </DataTemplate>
</ItemsRepeater.ItemTemplate>
</ItemsRepeater>
```

在这种情况下，按钮命令将绑定到“父级”`DataContext`，而不是绑定到项目的`DataContext`。单个项目将使用绑定到项目的`DataContext`的`CommandParameter`进行标识。因此，您必须通过强制转换表达式`((vm:MyUserControlViewModel)DataContext)`来指定“父级”`DataContext`的类型。