---
id: data-templates
title: Data Templates
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

## Customizing Data Templates

Data Templates can be customized and tailored to specific scenarios. You can include additional visual elements, apply styling, and even define nested templates within a Data Template. By leveraging data binding expressions and converters, you can dynamically populate and format the visual elements based on the data properties.

## Further Reading

For more information see the Deep Dive into to [data templates](../../concepts/templates).
