---
id: tabcontrol-how-to
title: "How to: Work with TabControl"
description: Static tabs, dynamic tabs, closeable tabs, and tab styling with Avalonia TabControl.
doc-type: how-to
---

This guide covers common TabControl scenarios: static tabs, dynamic tabs, closeable tabs, and tab styling.

## Static Tabs

Define tabs directly in XAML:

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

## Dynamic Tabs from a Collection

Bind tabs to a view model collection:

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

## Closeable Tabs

Add a close button to each tab header:

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

```csharp
[RelayCommand]
private void CloseTab(TabItemViewModel tab)
{
    Tabs.Remove(tab);
    if (SelectedTab == tab)
        SelectedTab = Tabs.FirstOrDefault();
}
```

## Tab with Icons

Use a custom header with an icon and text:

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

Or with dynamic tabs:

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

## Tab Placement

Position tabs at the top, bottom, left, or right:

```xml
<!-- Tabs on the left (vertical) -->
<TabControl TabStripPlacement="Left">
    <TabItem Header="Page 1"><TextBlock Text="Content 1" /></TabItem>
    <TabItem Header="Page 2"><TextBlock Text="Content 2" /></TabItem>
</TabControl>

<!-- Tabs at the bottom -->
<TabControl TabStripPlacement="Bottom">
    <TabItem Header="Tab 1"><TextBlock Text="Content 1" /></TabItem>
</TabControl>
```

## Binding SelectedIndex

Track the selected tab by index:

```xml
<TabControl SelectedIndex="{Binding ActiveTabIndex}">
```

```csharp
[ObservableProperty]
private int _activeTabIndex;
```

## Lazy Tab Content

By default, all tab content is created when the TabControl loads. For expensive content, create it on demand:

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

## Styling Tabs

### Custom tab header appearance

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

```xml
<TabControl.Styles>
    <Style Selector="TabItem">
        <Setter Property="Background" Value="Transparent" />
    </Style>
</TabControl.Styles>
```

## See Also

- [TabControl Control Reference](/controls/navigation/tabcontrol): Property tables and examples.
- [How to Bind Tabs](/docs/data-binding/how-to-bind-tabs): Binding tab content.
- [Navigation How-To](/docs/how-to/navigation-how-to): Other navigation patterns.
