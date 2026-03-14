---
id: tabcontrol-how-to
title: "How to: Work with TabControl"
description: Learn how to create static tabs, dynamic tabs, closeable tabs, and styled tabs using the Avalonia TabControl.
doc-type: how-to
---

This guide walks you through common `TabControl` scenarios, including static tabs, dynamically bound tabs, closeable tabs, icon headers, tab placement, and styling.

## Static tabs

The simplest approach is to define your tabs directly in XAML using [`TabItem`](/api/avalonia/controls/tabitem) elements. Each `TabItem` has a `Header` (the tab label) and child content (what displays when the tab is selected).

```xml
<TabControl>
    <TabItem Header="General">
        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="General settings content" />
        </StackPanel>
    </TabItem>
    <TabItem Header="Appearance">
        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="Appearance settings content" />
        </StackPanel>
    </TabItem>
    <TabItem Header="Advanced">
        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="Advanced settings content" />
        </StackPanel>
    </TabItem>
</TabControl>
```

This approach works well when the number of tabs is known at design time. If you need to add or remove tabs at runtime, use the dynamic approach described next.

## Dynamic tabs from a collection

When you need tabs driven by data, bind the `ItemsSource` property to an `ObservableCollection` in your view model. This lets you add and remove tabs at runtime, and keeps your UI and logic separated.

### Step 1: Create a tab item view model

Define a simple class that represents a single tab:

```csharp
public class TabItemViewModel
{
    public string Header { get; }
    public object Content { get; }

    public TabItemViewModel(string header, object content)
    {
        Header = header;
        Content = content;
    }
}
```

### Step 2: Expose a collection from your main view model

```csharp
public partial class MainViewModel : ObservableObject
{
    public ObservableCollection<TabItemViewModel> Tabs { get; } = new()
    {
        new TabItemViewModel("Home", new HomeViewModel()),
        new TabItemViewModel("Settings", new SettingsViewModel()),
    };

    [ObservableProperty]
    private TabItemViewModel? _selectedTab;
}
```

### Step 3: Bind in XAML

Use `ItemTemplate` to define how the tab header renders and `ContentTemplate` for the tab body:

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

:::tip
If each tab's `Content` is a different view model type, you can use a `DataTemplateSelector` or define `DataTemplate` entries in your `Application.DataTemplates` collection so that each view model resolves to the correct view automatically.
:::

## Closeable tabs

You can add a close button to each tab header so that your users can dismiss tabs. The close button's `Command` uses an ancestor binding to reach the `MainViewModel`.

```xml
<TabControl ItemsSource="{Binding Tabs}"
            SelectedItem="{Binding SelectedTab}">
    <TabControl.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="8">
                <TextBlock Text="{Binding Header}" VerticalAlignment="Center" />
                <Button Content="x" FontSize="10" Padding="4,2"
                        Background="Transparent" BorderThickness="0"
                        Command="{Binding $parent[TabControl].((vm:MainViewModel)DataContext).CloseTabCommand}"
                        CommandParameter="{Binding}" />
            </StackPanel>
        </DataTemplate>
    </TabControl.ItemTemplate>
    <TabControl.ContentTemplate>
        <DataTemplate>
            <ContentControl Content="{Binding Content}" />
        </DataTemplate>
    </TabControl.ContentTemplate>
</TabControl>
```

In your view model, handle the removal and update the selection so the user is not left on a blank tab:

```csharp
[RelayCommand]
private void CloseTab(TabItemViewModel tab)
{
    Tabs.Remove(tab);
    if (SelectedTab == tab)
        SelectedTab = Tabs.FirstOrDefault();
}
```

:::note
The XAML namespace `vm` in the ancestor binding must match your view model namespace. For example, add `xmlns:vm="using:MyApp.ViewModels"` to the root element of your XAML file.
:::

:::tip
If you want to prevent the last remaining tab from being closed, you can check `Tabs.Count` before removing:

```csharp
if (Tabs.Count > 1)
    Tabs.Remove(tab);
```
:::

## Tabs with icons

You can customize the tab header to include an icon alongside the text.

### Static tab with an icon

Set `TabItem.Header` to a panel containing both a `PathIcon` and a `TextBlock`:

```xml
<TabItem>
    <TabItem.Header>
        <StackPanel Orientation="Horizontal" Spacing="6">
            <PathIcon Data="{StaticResource HomeIcon}" Width="14" Height="14" />
            <TextBlock Text="Home" />
        </StackPanel>
    </TabItem.Header>
    <views:HomeView />
</TabItem>
```

### Dynamic tabs with icons

If your `TabItemViewModel` exposes an `IconData` property of type `StreamGeometry`, you can use it in the `ItemTemplate`:

```xml
<TabControl.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal" Spacing="6">
            <PathIcon Data="{Binding IconData}" Width="14" Height="14" />
            <TextBlock Text="{Binding Header}" />
        </StackPanel>
    </DataTemplate>
</TabControl.ItemTemplate>
```

## Tab placement

By default, tabs appear at the top. You can reposition them using the `TabStripPlacement` property. Valid values are `Top`, `Bottom`, `Left`, and `Right`.

```xml
<!-- Tabs on the left (vertical layout) -->
<TabControl TabStripPlacement="Left">
    <TabItem Header="Page 1"><TextBlock Text="Content 1" /></TabItem>
    <TabItem Header="Page 2"><TextBlock Text="Content 2" /></TabItem>
</TabControl>

<!-- Tabs at the bottom -->
<TabControl TabStripPlacement="Bottom">
    <TabItem Header="Tab 1"><TextBlock Text="Content 1" /></TabItem>
</TabControl>
```

:::note
When you use `Left` or `Right` placement, the tab headers stack vertically. If your headers are wide, you may want to set a fixed `Width` on the `TabItem` or constrain the tab strip to avoid layout issues.
:::

## Binding `SelectedIndex`

If you prefer to track the selected tab by its numeric index rather than by item reference, bind the `SelectedIndex` property:

```xml
<TabControl SelectedIndex="{Binding ActiveTabIndex}">
```

```csharp
[ObservableProperty]
private int _activeTabIndex;
```

This is useful when you need to programmatically switch tabs, for example navigating to a specific step in a wizard-style interface.

## Lazy tab content

By default, `TabControl` creates the content for every tab when it first loads. If your tabs contain expensive controls or large data sets, you can defer creation until the tab is actually selected:

```csharp
public partial class LazyTabViewModel : ObservableObject
{
    private ObservableObject? _content;

    public string Header { get; }
    private readonly Func<ObservableObject> _contentFactory;

    public LazyTabViewModel(string header, Func<ObservableObject> contentFactory)
    {
        Header = header;
        _contentFactory = contentFactory;
    }

    public ObservableObject Content => _content ??= _contentFactory();
}
```

The `Content` property uses a factory delegate and the null-coalescing assignment operator (`??=`) so the content view model is only created the first time it is accessed. When you bind the `ContentTemplate` to `{Binding Content}`, the getter fires only when the tab is selected.

## Styling tabs

### Custom tab header appearance

You can add styles inside `TabControl.Styles` to adjust spacing, font size, and the selected-tab indicator:

```xml
<TabControl.Styles>
    <!-- Tab strip background -->
    <Style Selector="TabControl /template/ ItemsPresenter#PART_ItemsPresenter">
        <Setter Property="Margin" Value="0" />
    </Style>

    <!-- Individual tab items -->
    <Style Selector="TabItem">
        <Setter Property="Padding" Value="16,8" />
        <Setter Property="FontSize" Value="13" />
    </Style>

    <!-- Selected tab indicator -->
    <Style Selector="TabItem:selected">
        <Setter Property="Foreground" Value="#6366F1" />
    </Style>
</TabControl.Styles>
```

### Removing the tab border

To give your tabs a flat, borderless look:

```xml
<TabControl.Styles>
    <Style Selector="TabItem">
        <Setter Property="Background" Value="Transparent" />
    </Style>
</TabControl.Styles>
```

:::tip
You can combine multiple style selectors to target hover and pressed states as well. For example, `TabItem:pointerover` applies when the pointer hovers over a tab.
:::

## See also

- [TabControl reference](../../controls/navigation/tabcontrol): Full property tables and additional examples.
- [How to bind tabs](../data-binding/how-to-bind-tabs): Detailed walkthrough for binding tab content to collections.
- [Navigation how-to](navigation-how-to): Other navigation patterns such as `Carousel` and page-based navigation.
- [Data binding introduction](../data-binding/introduction-to-data-binding): Core concepts for binding your UI to view models.
