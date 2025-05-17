---
id: how-to-bind-tabs
title: How To Bind Tabs
---


## Binding Support Example

You can dynamically create tab items with **data binding**. To do this, bind the `ItemsSource` property of a tab control to a collection of objects representing the tab header and content.

You can then use a **data template** to display the objects.

This example uses a collection of objects created from this `TabItemTemplate` class:

```csharp
namespace MyApp.ViewModel;

public class TabItemTemplate
{
    public string Header { get; }
    public string Content { get; }
    public TabItemTemplate(string header, string content)
    {
        Header = header;
        Content = content;
    }
}
```

Create a property that accesses a collection of `TabItemTemplate` instances.

```csharp
public ObservableCollection<TabItemTemplate> Items { get; set; } = new() { 
    new TabItemTemplate("One", "Some content on first tab"),
    new TabItemTemplate("Two", "Some content on second tab"),
};
```

The `TabStrip` header content is defined by ItemTemplate property, while `TabItem`'s content is defined by ContentTemplate property.

Finally create a `TabControl` and bind its `ItemsSource` property to the `Items`.

```xml
<TabControl ItemsSource="{Binding Items}">
    <TabControl.ItemTemplate>
      <DataTemplate>
        <TextBlock Text="{Binding Header}" />
      </DataTemplate>
    </TabControl.ItemTemplate>
    <TabControl.ContentTemplate>
        <!-- ContentTemplate's DataTemplate must specify the view model in DataType.
        The alias 'vm' references the specification of the view model's namespace in 
        an attribute of the XAML's root element, which will look like
            xmlns:vm="using:MyApp.ViewModel"
        or
            xmlns:vm="clr-namespace:MyApp.ViewModel;assembly=MyApp.ViewModel" -->
      <DataTemplate DataType="vm:TabItemTemplate">
        <DockPanel LastChildFill="True">
          <TextBlock Text="This is content of selected tab" DockPanel.Dock="Top" FontWeight="Bold" />
          <TextBlock Text="{Binding Content}" />
        </DockPanel>
      </DataTemplate>
    </TabControl.ContentTemplate>
  </TabControl>
```
