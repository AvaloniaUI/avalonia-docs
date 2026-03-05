---
id: tabcontrol
title: TabControl
---

The `TabControl` allows you to sub-divide a view into tab items.

Each tab item has a header and a content zone. The headers are presented in a strip, in the sequence they occur in the XAML. When the user clicks on a tab header, its content becomes visible, and is placed below the tab strip in the content zone of the tab control.

You can compose the UI in both the header and content zones to suit the UI requirements of your Avalonia app.

:::info
If you only need the function of the tab headers part of this control, consider using the [tab strip](/controls/navigation/tabstrip) instead.
:::

## Common Properties

| Property | Type | Description |
|---|---|---|
| `TabStripPlacement` | `Dock` | Position of the tab strip: `Top`, `Bottom`, `Left`, `Right`. Default is `Top`. |
| `SelectedIndex` | `int` | The zero-based index of the currently selected tab. |
| `SelectedItem` | `object` | The currently selected tab item. |
| `ItemsSource` | `IEnumerable` | A collection to generate tabs from dynamically. |
| `ItemTemplate` | `IDataTemplate` | Template for tab headers when using `ItemsSource`. |
| `ContentTemplate` | `IDataTemplate` | Template for tab content when using `ItemsSource`. |

## Examples

This is simple tab example. The tab content is just some text: 

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <TabControl Margin="5">
    <TabItem Header="Tab 1">
      <TextBlock Margin="5">This is tab 1 content</TextBlock>
    </TabItem>
    <TabItem Header="Tab 2">
      <TextBlock Margin="5">This is tab 2 content</TextBlock>
    </TabItem>
  </TabControl>
</UserControl>
```

</XamlPreview>

## Dynamic Tabs from a Collection

Bind tabs to a view model collection using `ItemsSource`:

```xml
<TabControl ItemsSource="{Binding Tabs}"
            SelectedItem="{Binding SelectedTab}">
    <TabControl.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Header}" />
        </DataTemplate>
    </TabControl.ItemTemplate>
    <TabControl.ContentTemplate>
        <DataTemplate>
            <ContentControl Content="{Binding Content}" />
        </DataTemplate>
    </TabControl.ContentTemplate>
</TabControl>
```

## Tab Placement

Position tabs at the top, bottom, left, or right:

```xml
<TabControl TabStripPlacement="Left">
    <TabItem Header="Page 1"><TextBlock Text="Content 1" Margin="8" /></TabItem>
    <TabItem Header="Page 2"><TextBlock Text="Content 2" Margin="8" /></TabItem>
</TabControl>
```

## See also

- [TabControl API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TabControl)
- [`TabControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TabControl.cs)
