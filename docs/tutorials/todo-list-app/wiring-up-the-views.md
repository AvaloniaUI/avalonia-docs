---
description: TUTORIALS - To Do List App
---

# Data Binding

Now that you have the view model and model (data service) connected, the next step is to link the views and view models, so the list of items can be displayed.

This step uses _Avalonia UI_ concepts of data templates and data binding. Here a data template inside an items control defines how to display the to do list; and data bindings define how to get the list, and how to get the name and check status for each item.&#x20;

Follow this procedure to adapt your user control to use the items control:

* [ ] Locate and open the **ToDoListView.axaml** file.
* [ ] Replace the `<StackPanel>` element, so that the code looks like this:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:Class="ToDoList.Views.ToDoListView">
  <DockPanel>
    <Button DockPanel.Dock="Bottom"
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center">
      Add Item
    </Button>
    <ItemsControl Items="{Binding ListItems}">
      <ItemsControl.ItemTemplate>
        <DataTemplate>
          <CheckBox Margin="4"
                    IsChecked="{Binding IsChecked}"
                    Content="{Binding Description}"/>
        </DataTemplate>
      </ItemsControl.ItemTemplate>
    </ItemsControl>
  </DockPanel>
</UserControl>
```

Take some time here to examine the code that you just added: &#x20;

The items control `<ItemsControl>` repeats its display for each item in a collection source that is defined by the `Items` attribute. Here the data binding expression `{Binding ListItems}` means we are looking for a data context with this property name.&#x20;

How each item is in a displayed inside the items control is controlled by the item template <`ItemTemplate>`. This can be any combination of controls, but in this example it is a **data template** is being used.

:::info
You can review the data template concept [here](../../concepts/templates/).
:::

The built-in controls inside the data template will expect to find the properties `IsChecked` and `Description`. These will come from the items in the `ListItems` property of a suitable data context that the user control manages to find.

So the arrangement of views and view models so far looks like this:

<div style={{textAlign: 'center'}}>
  <img src="../../.gitbook/assets/image (7) (3).png" alt=""/>
</div>

This will work if any parent of the items control has a data context object having  a`ListItems` property. The _Avalonia UI_ binding will search upwards in the control tree to locate a suitable data context. But although the main window data context has been set (during the app initialization - see the file **App.axaml.cs**), at this point there is still no data context with a `ListItems` property.&#x20;

So if you run your app, the list is still blank!

<div style={{textAlign: 'center'}}>
  <img src="../../.gitbook/assets/image (42) (2).png" alt=""/>
</div>
