---
id: how-to-bind-tabs
title: How to bind tabs
description: Bind a TabControl to a collection of view models to create dynamic tabbed interfaces.
doc-type: how-to
---

When your application needs to display a variable number of tabs, you can data-bind a [`TabControl`](/api/avalonia/controls/tabcontrol) to a collection of view models instead of declaring each tab statically in XAML. This approach is useful when the number of tabs is determined at runtime, for example by user actions, loaded data, or plugin systems.

The general pattern is:

1. Define a view model class that represents each tab (header text, content, and any other state).
2. Expose an `ObservableCollection` of those view models from your main view model.
3. Bind `TabControl.ItemsSource` to the collection and use `ItemTemplate` and `ContentTemplate` to control how each tab renders.

## Binding support example

You can dynamically create tab items with **data binding**. To do this, bind the `ItemsSource` property of a `TabControl` to a collection of objects representing the tab header and content.

You can then use a **data template** to display the objects.

This example uses a collection of objects created from this `ItemViewModel` class:

```csharp
namespace MyApp.ViewModel;

public class ItemViewModel
{
    public string Header { get; }
    public string Content { get; }
    public ItemViewModel(string header, string content)
    {
        Header = header;
        Content = content;
    }
}
```

Create a property that accesses a collection of `ItemViewModel` instances.

```csharp
public ObservableCollection<ItemViewModel> Items { get; set; } = new() {
    new ItemViewModel("One", "Some content on first tab"),
    new ItemViewModel("Two", "Some content on second tab"),
};
```

The `TabStrip` header content is defined by the `ItemTemplate` property, while the `TabItem` content is defined by the `ContentTemplate` property.

Finally, create a `TabControl` and bind its `ItemsSource` property to `Items`.

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
      <DataTemplate DataType="vm:ItemViewModel">
        <DockPanel LastChildFill="True">
          <TextBlock Text="This is content of selected tab" DockPanel.Dock="Top" FontWeight="Bold" />
          <TextBlock Text="{Binding Content}" />
        </DockPanel>
      </DataTemplate>
    </TabControl.ContentTemplate>
  </TabControl>
```

## Tab lifecycle notes

Keep the following points in mind when you work with data-bound tabs:

- **Adding and removing tabs.** Because `ItemsSource` is bound to an `ObservableCollection`, adding or removing items from the collection automatically adds or removes tabs at runtime.
- **Content recycling.** `TabControl` recreates content visuals when the user switches tabs. If your tab content is expensive to build, consider caching the generated views or using a `UserControl` with its own view model to preserve state.
- **Selected tab.** Bind `SelectedItem` or `SelectedIndex` on the `TabControl` to track or control which tab is active. When you remove the currently selected item from the collection, the selection resets automatically.
- **DataType on ContentTemplate.** Always set `DataType` on the `DataTemplate` used inside `ContentTemplate`. Without it, the binding context may not resolve correctly.

## See also

- [TabControl](/controls/navigation/tabcontrol): Full reference for the `TabControl` control.
- [How to: Work with TabControl](/docs/how-to/tabcontrol-how-to): Static tabs, closeable tabs, and tab styling.
- [Data templates](/docs/data-templates/introduction-to-data-templates): Controlling how items are displayed.
- [Data binding syntax](/docs/data-binding/data-binding-syntax): Binding paths and modes.
