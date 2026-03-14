---
id: content-templates
title: Content templates
description: Learn how to define and apply a DataTemplate directly on a ContentControl using the ContentTemplate property in Avalonia UI.
doc-type: explanation
---

import ContentTemplateStudentScreenshot from '/img/concepts/data-concepts/data-templates/content-templates/contenttemplate-student.png';

## Overview

A data template defines how Avalonia UI displays an object that is not a control or a simple string. You typically create a class to represent your data, then use a data template to tell the framework which controls and bindings to use when rendering instances of that class.

Applying a data template is a two-step process:

1. Define the data template.
2. Assign the data template to a control so it knows how to render the content.

One approach is to set the `ContentTemplate` property directly on any `ContentControl`. Because `Window` inherits from `ContentControl`, you can use this technique at the window level as well as on controls like `Button`, `UserControl`, and `HeaderedContentControl`.

## Defining a content template in XAML

You define a content template by placing a `DataTemplate` element inside the `ContentTemplate` property of a control. Inside the `DataTemplate`, you compose standard Avalonia controls and use `{Binding}` expressions to pull values from the data object.

The following example sets `ContentTemplate` on a `Window` and binds to properties of a `Student` class:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:local="using:MySample"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  <Window.ContentTemplate>
    <DataTemplate DataType="{x:Type local:Student}">
      <StackPanel>
        <Grid ColumnDefinitions="Auto,Auto" RowDefinitions="Auto,Auto">
          <TextBlock Grid.Row="0" Grid.Column="0">First Name:</TextBlock>
          <TextBlock Grid.Row="0" Grid.Column="1" Text="{Binding FirstName}"/>
          <TextBlock Grid.Row="1" Grid.Column="0">Last Name:</TextBlock>
          <TextBlock Grid.Row="1" Grid.Column="1" Text="{Binding LastName}"/>
        </Grid>
      </StackPanel>
    </DataTemplate>
  </Window.ContentTemplate>

  <local:Student FirstName="Jane" LastName="Deer"/>
</Window>
```

In this markup, the `DataType` attribute tells the template which type it is designed for. The `{Binding}` expressions resolve against whatever object occupies the control's content zone. Here the content is a `Student` instance, so `{Binding FirstName}` resolves to `Student.FirstName`.

When you run this code, Avalonia UI displays the student data using your template layout:

<img src={ContentTemplateStudentScreenshot} alt="A window displaying a Student object rendered through a ContentTemplate with first and last name labels."/>

## How the template and content relate

By setting `ContentTemplate`, you define and assign the template in the same place. The template's bindings resolve against the object in the control's content zone. If a binding references a property that does not exist on the content object, Avalonia silently ignores it and the bound control displays nothing. This means your application will not crash, but you should verify that your binding paths match the properties on your data class.

As an exercise, try adding a `{Binding Age}` expression to the template above even though `Student` has no `Age` property. The application still runs, but that `TextBlock` remains empty.

## When to use content templates

Setting `ContentTemplate` directly is most useful when:

- You have a single control that always displays the same type of data.
- You want to keep the template definition close to where it is used.
- You do not need to reuse the template elsewhere in your application.

When you need to support multiple data types or share templates across controls, consider using the `DataTemplates` collection or defining templates as application-level resources instead.

## See also

- [Control content](control-content)
- [Data template collection](data-template-collection)
- [Introduction to data templates](introduction-to-data-templates)
- [Reusing data templates](/docs/data-templates/reusing-data-templates)
- [Creating data templates in code](/docs/data-templates/creating-data-templates-in-code)
