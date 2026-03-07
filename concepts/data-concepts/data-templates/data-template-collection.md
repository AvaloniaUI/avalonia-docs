---
id: data-template-collection
title: Data template collection
description: Learn how to use the DataTemplates collection in Avalonia to define multiple data templates and automatically match them to data types.
doc-type: explanation
---

import DataTemplatesCollectionStudentScreenshot from '/img/concepts/data-concepts/data-templates/data-template-collection/datatemplates-collection-student.png';

Every control in Avalonia has a `DataTemplates` collection where you can place any number of data template definitions. You can then choose the template to use for display by class type.

## How the `DataTemplates` collection works

When a control does not have a data template set directly in its `ContentTemplate` property (as described on the previous page), it searches its `DataTemplates` collection for a template that matches the class of the object being displayed. This applies to any content control, including `Window`.

Data templates are matched by type: a match occurs when the class of the object being displayed is the same as the fully-qualified class name specified in the `DataType` property of a template.

## Example

You can modify the previous sample to use the `DataTemplates` collection as follows:

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

<img src={DataTemplatesCollectionStudentScreenshot} alt=""/>

## When to use `DataTemplates` vs a single `DataTemplate`

A single `DataTemplate` set on a control's `ContentTemplate` property is useful when you know exactly what type of content a control will display. However, there are several situations where the `DataTemplates` collection is the better choice:

- **Multiple data types in a single list.** When an `ItemsControl` (such as a `ListBox`) contains items of different types, you can define a template for each type in the `DataTemplates` collection. Avalonia automatically selects the correct template based on the `DataType` of each item.
- **Reuse across multiple controls.** When you place templates in a parent control's `DataTemplates` collection (or in `Application.DataTemplates`), any child control that displays a matching type will use the template without you needing to set `ContentTemplate` explicitly.
- **Separation of concerns.** Keeping templates in a collection separates the "what to display" decision from the "how to display it" definition, making your XAML easier to maintain.

As a general rule, prefer the `DataTemplates` collection when your UI needs to render more than one data type, or when you want templates to be inherited by child controls. Use `ContentTemplate` directly when a control always displays a single, known type and you want the binding to be explicit.

## Template lookup order

When Avalonia searches for a matching data template, it walks up the visual tree:

1. The control's own `DataTemplates` collection is checked first.
2. If no match is found, the parent control's `DataTemplates` collection is checked, then its parent, and so on.
3. Finally, `Application.DataTemplates` is checked.

The first template whose `DataType` matches the object's type is used. This means you can override a global template by placing a more specific one closer to the control that needs it.

## See also

- [Introduction to data templates](introduction-to-data-templates)
- [Control content](control-content)
- [Content templates](content-templates)

