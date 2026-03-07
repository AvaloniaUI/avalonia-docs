---
id: listbox-how-to
title: "How to: Work with ListBox"
description: Selection handling, item templates, virtualization, styling, and advanced ListBox patterns.
doc-type: how-to
---

This guide covers common ListBox scenarios: selection handling, item templates, virtualization, styling, and advanced patterns.

## Item Templates

Customize how items appear using `ItemTemplate`:

```xml
<ListBox ItemsSource="{Binding Contacts}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <Grid ColumnDefinitions="48,*" Margin="4">
                <Border Grid.Column="0" Width="40" Height="40"
                        CornerRadius="20" Background="#E0E0E0"
                        ClipToBounds="True">
                    <TextBlock Text="{Binding Initials}"
                               HorizontalAlignment="Center"
                               VerticalAlignment="Center"
                               FontWeight="Bold" />
                </Border>
                <StackPanel Grid.Column="1" Margin="8,0,0,0"
                            VerticalAlignment="Center">
                    <TextBlock Text="{Binding Name}" FontWeight="SemiBold" />
                    <TextBlock Text="{Binding Email}" Foreground="Gray"
                               FontSize="12" />
                </StackPanel>
            </Grid>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

## Selection Modes

### Single selection (default)

```xml
<ListBox SelectionMode="Single"
         SelectedItem="{Binding SelectedContact}"
         ItemsSource="{Binding Contacts}" />
```

### Multiple selection

```xml
<ListBox SelectionMode="Multiple"
         ItemsSource="{Binding Contacts}" />
```

In multiple selection mode, users click items to toggle their selection. Access selected items through the `SelectionChanged` event or `SelectedItems` property.

### Toggle selection

```xml
<ListBox SelectionMode="Toggle"
         ItemsSource="{Binding Contacts}" />
```

Toggle mode lets users click to select and click again to deselect without holding Ctrl.

### Always selected

```xml
<ListBox SelectionMode="AlwaysSelected"
         ItemsSource="{Binding Contacts}" />
```

Prevents deselecting all items. At least one item remains selected.

### Handling selection changes

```csharp
[ObservableProperty]
private Contact? _selectedContact;

partial void OnSelectedContactChanged(Contact? value)
{
    if (value is not null)
        LoadContactDetails(value);
}
```

Or using the event:

```xml
<ListBox SelectionChanged="OnSelectionChanged" />
```

```csharp
private void OnSelectionChanged(object? sender, SelectionChangedEventArgs e)
{
    foreach (var added in e.AddedItems)
    {
        // Handle newly selected items
    }
    foreach (var removed in e.RemovedItems)
    {
        // Handle deselected items
    }
}
```

## Virtualization

ListBox virtualizes by default: it creates controls only for visible items. This works when the ListBox has a constrained height.

### Ensuring virtualization is active

```xml
<!-- BAD: StackPanel gives infinite height, disabling virtualization -->
<StackPanel>
    <ListBox ItemsSource="{Binding LargeList}" />
</StackPanel>

<!-- GOOD: Grid constrains height -->
<Grid RowDefinitions="*">
    <ListBox ItemsSource="{Binding LargeList}" />
</Grid>

<!-- GOOD: Explicit height -->
<ListBox ItemsSource="{Binding LargeList}" Height="400" />
```

### Scroll to an item

Scroll programmatically to bring an item into view:

```csharp
listBox.ScrollIntoView(targetItem);
```

Or scroll to an index:

```csharp
listBox.ScrollIntoView(listBox.ItemsSource.ElementAt(50));
```

## Horizontal ListBox

Display items horizontally by changing the items panel:

```xml
<ListBox ItemsSource="{Binding Tags}">
    <ListBox.ItemsPanel>
        <ItemsPanelTemplate>
            <WrapPanel />
        </ItemsPanelTemplate>
    </ListBox.ItemsPanel>
    <ListBox.ItemTemplate>
        <DataTemplate>
            <Border Background="#E8E8E8" CornerRadius="12" Padding="12,4">
                <TextBlock Text="{Binding}" />
            </Border>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

For a single horizontal row:

```xml
<ListBox ItemsSource="{Binding Items}">
    <ListBox.ItemsPanel>
        <ItemsPanelTemplate>
            <StackPanel Orientation="Horizontal" />
        </ItemsPanelTemplate>
    </ListBox.ItemsPanel>
</ListBox>
```

Note: Using `StackPanel` or `WrapPanel` disables virtualization. For large horizontal lists, use `VirtualizingStackPanel` with `Orientation="Horizontal"`.

## Styling ListBox Items

### Custom selection appearance

Override how selected items look:

```xml
<ListBox.Styles>
    <Style Selector="ListBoxItem:selected /template/ ContentPresenter">
        <Setter Property="Background" Value="#6366F1" />
    </Style>
    <Style Selector="ListBoxItem:selected /template/ ContentPresenter TextBlock">
        <Setter Property="Foreground" Value="White" />
    </Style>
    <Style Selector="ListBoxItem:pointerover /template/ ContentPresenter">
        <Setter Property="Background" Value="#F0F0F0" />
    </Style>
</ListBox.Styles>
```

### Removing the selection highlight

For a list that displays items without selection visual feedback:

```xml
<ListBox.Styles>
    <Style Selector="ListBoxItem">
        <Setter Property="Padding" Value="0" />
    </Style>
    <Style Selector="ListBoxItem:selected /template/ ContentPresenter">
        <Setter Property="Background" Value="Transparent" />
    </Style>
    <Style Selector="ListBoxItem:pointerover /template/ ContentPresenter">
        <Setter Property="Background" Value="Transparent" />
    </Style>
</ListBox.Styles>
```

### Item spacing

Add spacing between items without modifying the template:

```xml
<ListBox.Styles>
    <Style Selector="ListBoxItem">
        <Setter Property="Margin" Value="0,2" />
        <Setter Property="CornerRadius" Value="4" />
    </Style>
</ListBox.Styles>
```

## Commands on ListBox Items

Invoke a command when an item is clicked, passing the item as the parameter:

```xml
<ListBox ItemsSource="{Binding Items}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <Button Content="{Binding Name}"
                    Command="{Binding $parent[ListBox].((vm:MainViewModel)DataContext).SelectItemCommand}"
                    CommandParameter="{Binding}"
                    HorizontalAlignment="Stretch"
                    Background="Transparent"
                    BorderThickness="0" />
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

## Empty State

Show a message when the list is empty:

```xml
<Panel>
    <ListBox ItemsSource="{Binding FilteredItems}"
             IsVisible="{Binding FilteredItems.Count}" />
    <TextBlock Text="No items found"
               IsVisible="{Binding !FilteredItems.Count}"
               HorizontalAlignment="Center"
               VerticalAlignment="Center"
               Foreground="Gray" />
</Panel>
```

## ListBox with CheckBoxes

Create a checkable list:

```xml
<ListBox ItemsSource="{Binding Tasks}" SelectionMode="Toggle,Multiple">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <CheckBox Content="{Binding Title}"
                      IsChecked="{Binding IsCompleted}" />
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

## Grouping Items

Display items in groups using the flat list with headers pattern:

```csharp
public abstract class ListEntry { }

public class GroupHeader : ListEntry
{
    public string Title { get; init; } = "";
}

public class ContactEntry : ListEntry
{
    public Contact Contact { get; init; } = null!;
}
```

```xml
<ListBox ItemsSource="{Binding GroupedEntries}">
    <ListBox.DataTemplates>
        <DataTemplate DataType="local:GroupHeader">
            <TextBlock Text="{Binding Title}"
                       FontWeight="Bold" FontSize="14"
                       Margin="0,12,0,4" />
        </DataTemplate>
        <DataTemplate DataType="local:ContactEntry">
            <TextBlock Text="{Binding Contact.Name}" Margin="8,0" />
        </DataTemplate>
    </ListBox.DataTemplates>
    <ListBox.Styles>
        <!-- Make headers non-selectable -->
        <Style Selector="ListBoxItem:is(local:GroupHeader)">
            <Setter Property="IsHitTestVisible" Value="False" />
        </Style>
    </ListBox.Styles>
</ListBox>
```

See [Collection Views](/docs/data-binding/collection-views) for details on building grouped lists.

## See Also

- [ListBox Control Reference](/controls/data-display/collections/listbox): Property tables and basic examples.
- [Collection Views](/docs/data-binding/collection-views): Sorting, filtering, and grouping collections.
- [Performance](/docs/app-development/performance): Virtualization and large collection tips.
- [Data Templates](/docs/data-templates/introduction-to-data-templates): How templates work.
