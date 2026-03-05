---
id: introduction-to-data-templates
title: Introduction to data templates
---

Data Templates in Avalonia provide a powerful way to define the visual representation of your data. They allow you to specify how your data should be presented and formatted, enabling you to create dynamic and customizable user interfaces. This document will introduce you to the concept of Data Templates in Avalonia and demonstrate how to use them effectively in your applications.

## What is a Data Template?

At its core, a Data Template is a reusable definition that specifies how to present data of a particular type. It defines the visual structure and appearance of the data when displayed in the user interface. In Avalonia, a Data Template is often associated with a list control, such as a `ListBox` or `ItemsControl`, and is responsible for rendering individual items of data within that control.

## Applying a Data Template to a ListBox

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

## Type-Specific Data Templates

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

## Where Data Templates Can Be Defined

| Location | Scope |
|---|---|
| `Control.DataTemplates` | Available to that control and its children. |
| `Window.DataTemplates` | Available to the entire window. |
| `Application.DataTemplates` | Available to the entire application. |
| `ContentTemplate` property | Applied directly to a specific `ContentControl`. |
| `ItemTemplate` property | Applied to each item in a list or collection control. |

## Data Templates in Resources

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

## Next Steps

- [Control Content](control-content): How controls display non-control content.
- [Content Templates](content-templates): Using `ContentTemplate` directly.
- [Data Template Collection](data-template-collection): Defining multiple templates by type.
- [Reusing Data Templates](reusing-data-templates): Sharing templates across your application.
