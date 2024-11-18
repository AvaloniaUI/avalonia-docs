---
id: how-to-bind-tabs
title: How To Bind Tabs
---


## Binding Support Example

You can dynamically create tab items with **data binding**. To do this, bind the `ItemsSource` property of a tab control to an array of objects representing the tab header and content.

You can then use a **data template** to display the objects.

This example uses an array of objects created from this `TabItemModel` class:

```csharp
public class TabItemModel
{
    public string Header { get; }
    public string Content { get; }
    public TabItemModel(string header, string content)
    {
        Header = header;
        Content = content;
    }
}
```

Create an array of two `TabItemModel` instances and bind it to the DataContext.

```csharp
DataContext = new TabItemModel[] { 
    new TabItemModel("One", "Some content on first tab"),
    new TabItemModel("Two", "Some content on second tab"),
};
```

The `TabStrip` header content is defined by ItemTemplate property, while `TabItem`'s content is defined by ContentTemplate property.

Finally create a `TabControl` and bind its `ItemsSource` property to the DataContext.

```xml
<TabControl ItemsSource="{Binding}">
    <TabControl.ItemTemplate>
      <DataTemplate>
        <TextBlock Text="{Binding Header}" />
      </DataTemplate>
    </TabControl.ItemTemplate>
    <TabControl.ContentTemplate>
      <DataTemplate>
        <DockPanel LastChildFill="True">
          <TextBlock Text="This is content of selected tab" DockPanel.Dock="Top" FontWeight="Bold" />
          <TextBlock Text="{Binding Content}" />
        </DockPanel>
      </DataTemplate>
    </TabControl.ContentTemplate>
  </TabControl>
```
