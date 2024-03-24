---
description: CONCEPTS
---

# Compiled Bindings (рус: Компилируемые привязки)

Указанные в XAML привязки, используют рефлексию для поиска и запроса доступа ко свойству во `ViewModel`.
Также Avalonia поддерживает компиляцию привязок, что дает ряд преимуществ:

* Если компилируемая привязка и свойства не найдены, то вы получите ошибку на этапе компиляции проекта.
* Повышение производительности, за счет замены рефлексии на компилируемые привязки в XAML. ([подробнее о скорости рефлексии на codeproject.com](https://www.codeproject.com/Articles/1161127/Why-is-reflection-slow)).

## Включение и отключение compiled bindings

:::info

В зависимости от шаблона, использованного для создания проекта Avalonia, compiled bindings могут быть, по-умолчанию, как включены, так и отключены. 
Вы можете проверить значение в проекте.

::: 

### Включение и отключение по всему проекту

Для включение компиляции привязок по-умолчанию, в файл проекта необходимо добавить:

```xml
<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
```

Конечно, вам по-прежнему необходимо указывать `x:DataType` для привязываемых объектов, однако больше не потребуется прописывать `x:CompileBindings="[True|False]"` для каждого `UserControl` или `Window`.

### Включение и отключение для каждого UserControl и Window

Для использования компилируемых привязок, вам необходимо указывать `DataType` для объекта привязки.
В [`DataTemplates`](../data-templates) определено свойство `DataType`, для остальных элементов мы можете указать его через `x:DataType`.
Скорее всего, вы укажете `x:DataType` в основном элементе (`Window` или `UserControl`), но еще, вы можете указать `DataType` непосрелственно в `Binding`.

Для включение или отключения компиляции привязок, укажите `x:CompileBindings="[True|False]"`. 
Все вложенные элементы унаследуют данное свойство, однако вы можете переопределить его для них:

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

## Compiled Binding-Markup (рус: Компиляция конкретных привязок в разметке)

Если вы не хотите использовать компилируемые привязки для всех вложенных элементов, то можно использовать `CompiledBinding` вмест `Binding`.
Вам необходимо указывать `DataType`, но вы можете не указывать `x:CompileBindings="True"`.

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

## Reflection Binding-Markup (рус: Рефлексия конкретных привязок в разметке)

Если в основном элементе у вас указана компиляция привязок (через `x:CompileBindings="True"`),
а вам требуется использовать рефлексиб в силу разных причин, то замените `Binding` на `ReflectionBinding`, как в примере ниже:

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

## Type casting (рус: Приведение типов)

Иногда невозможно автоматически определить тип привязки. В этом случае, вам необходимо указать его явно:

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

В данном примере, команда для кнопки определена в `DataContext` у `ItemsRepeater`, а значение для `CommandParameter` из `DataContext` каждого элемента.
Поэтому необходимо указать `DataContext` родителя через выражение `((vm:MyUserControlViewModel)DataContext)`.