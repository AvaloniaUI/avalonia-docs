---
id: introduction-to-data-templates
title: Introduction to data templates
description: Define how Avalonia displays data objects using data templates with type matching and reuse.
doc-type: overview
---

Data templates in Avalonia define the visual representation of your data. They specify how data objects are presented and formatted in the UI. This page introduces data templates and shows how to use them in your applications.

## What is a data template?

At its core, a Data Template is a reusable definition that specifies how to present data of a particular type. It defines the visual structure and appearance of the data when displayed in the user interface. In Avalonia, a Data Template is often associated with a list control, such as a [`ListBox`](/api/avalonia/controls/listbox) or `ItemsControl`, and is responsible for rendering individual items of data within that control.

## Applying a data template to a ListBox

To apply a Data Template to a `ListBox`, you typically use the `ItemTemplate` property of the control. 

For instance, if you have a `ListBox` that should display a collection of `Item` objects using the defined Data Template, you can set the `ItemTemplate` property like this:

```xml
<ListBox ItemsSource="{Binding Items}">
  <ListBox.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal">
            <TextBlock Text="{Binding Name}" />
            <Image Source="{Binding ImageSource}" />
        </StackPanel>
    </DataTemplate>
  </ListBox.ItemTemplate>
</ListBox>
```

In this example, the Data Template defines a visual layout using a `StackPanel` container. Within the `StackPanel`, we have a `TextBlock` bound to the `Name` property of the item and an `Image` control bound to the `ImageSource` property.

## Type-specific data templates

Use `DataType` to automatically select a template based on the type of the object being displayed:

```xml
<Window.DataTemplates>
    <DataTemplate DataType="{x:Type local:Customer}">
        <StackPanel Orientation="Horizontal" Spacing="8">
            <TextBlock Text="{Binding Name}" FontWeight="Bold" />
            <TextBlock Text="{Binding Email}" Foreground="Gray" />
        </StackPanel>
    </DataTemplate>

    <DataTemplate DataType="{x:Type local:Product}">
        <StackPanel Orientation="Horizontal" Spacing="8">
            <TextBlock Text="{Binding ProductName}" />
            <TextBlock Text="{Binding Price, StringFormat='${0:F2}'}" />
        </StackPanel>
    </DataTemplate>
</Window.DataTemplates>
```

When Avalonia encounters an object in a content area, it searches for a matching `DataTemplate` by type. The search starts at the control and walks up the tree until a match is found.

## Where data templates can be defined

| Location | Scope |
|---|---|
| `Control.DataTemplates` | Available to that control and its children. |
| `Window.DataTemplates` | Available to the entire window. |
| `Application.DataTemplates` | Available to the entire application. |
| `ContentTemplate` property | Applied directly to a specific `ContentControl`. |
| `ItemTemplate` property | Applied to each item in a list or collection control. |

## Data templates in resources

Define a reusable template as a resource:

```xml
<Application.Resources>
    <DataTemplate x:Key="CustomerTemplate" DataType="{x:Type local:Customer}">
        <TextBlock Text="{Binding Name}" />
    </DataTemplate>
</Application.Resources>
```

Then reference it:

```xml
<ContentControl Content="{Binding SelectedCustomer}"
                ContentTemplate="{StaticResource CustomerTemplate}" />
```

## See also

- [Control Content](control-content): How controls display non-control content.
- [Content Templates](content-templates): Using `ContentTemplate` directly.
- [Data Template Collection](data-template-collection): Defining multiple templates by type.
- [Reusing Data Templates](reusing-data-templates): Sharing templates across your application.
