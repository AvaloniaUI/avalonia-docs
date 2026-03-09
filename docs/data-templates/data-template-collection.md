---
id: data-template-collection
title: Data template collection
description: Define multiple data templates in a control's DataTemplates collection to match by type.
doc-type: explanation
---

import DataTemplatesCollectionStudentScreenshot from '/img/concepts/data-concepts/data-templates/data-template-collection/datatemplates-collection-student.png';

Every control in _Avalonia UI_ has a [`DataTemplates`](/api/avalonia/controls/templates/datatemplates) collection where you can place any number of data template definitions. You can then choose the template to use for display by class type. 

When a control does not have a data template set directly in its `ContentTemplate` property (as on the previous page); then it will choose a template from in its `DataTemplates` collection that matches the class of the object being displayed.  This applies to a window.

Data templates are matched by type: a match occurs when the class of the object being displayed is the same as the fully-qualified class name specified in the `DataType` property of a template.

So you can modify the previous sample to use the `DataTemplates` collection, as follows:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:local="using:MySample"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  <Window.DataTemplates>
    <DataTemplate DataType="{x:Type local:Student}">
      <Grid ColumnDefinitions="Auto,Auto" RowDefinitions="Auto,Auto">
        <TextBlock Grid.Row="0" Grid.Column="0">First Name:</TextBlock>
        <TextBlock Grid.Row="0" Grid.Column="1" Text="{Binding FirstName}"/>
        <TextBlock Grid.Row="1" Grid.Column="0">Last Name:</TextBlock>
        <TextBlock Grid.Row="1" Grid.Column="1" Text="{Binding LastName}"/>
      </Grid>
    </DataTemplate>
  </Window.DataTemplates>
  
  <local:Student FirstName="Jane" LastName="Deer"/>
</Window>
```

This results in exactly the same display as on the previous page:

<img src={DataTemplatesCollectionStudentScreenshot} alt="Window displaying student first and last name using a data template from the DataTemplates collection"/>

## Multiple data templates by type

The `DataTemplates` collection can select different templates for different types. When Avalonia encounters an object, it searches the `DataTemplates` collection for a template whose `DataType` matches the object's type:

```xml
<Window.DataTemplates>
    <DataTemplate DataType="{x:Type local:Student}">
        <StackPanel Orientation="Horizontal" Spacing="8">
            <TextBlock Text="🎓" />
            <TextBlock Text="{Binding FirstName}" />
            <TextBlock Text="{Binding LastName}" />
        </StackPanel>
    </DataTemplate>

    <DataTemplate DataType="{x:Type local:Teacher}">
        <StackPanel Orientation="Horizontal" Spacing="8">
            <TextBlock Text="📚" />
            <TextBlock Text="{Binding Name}" FontWeight="Bold" />
            <TextBlock Text="{Binding Subject}" Foreground="Gray" />
        </StackPanel>
    </DataTemplate>
</Window.DataTemplates>
```

With these templates defined, a `ListBox` or `ContentControl` displaying `Student` objects uses the first template, while `Teacher` objects use the second:

```xml
<ListBox ItemsSource="{Binding People}" />
```

## Template search order

When Avalonia needs a data template for an object, it searches in this order:

1. The control's own `DataTemplates` collection.
2. Each parent control's `DataTemplates` collection, walking up the tree.
3. The `Window.DataTemplates` collection.
4. The `Application.DataTemplates` collection.

The first matching template is used. This lets you override application-wide templates at any level of the tree.

## See also

- [Introduction to Data Templates](introduction-to-data-templates): Overview of data templates in Avalonia.
- [Content Templates](content-templates): Using `ContentTemplate` directly.
- [Reusing Data Templates](reusing-data-templates): Sharing templates across your application.
