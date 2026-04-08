---
id: treeview-how-to
title: "How to: Work with TreeView"
description: Hierarchical data binding, lazy loading, selection handling, and customization with TreeView.
doc-type: how-to
---

This guide covers common TreeView scenarios: hierarchical data binding, lazy loading, selection handling, and customization.

## Basic Hierarchical Binding

Bind a [`TreeView`](/api/avalonia/controls/treeview) to a tree of view model objects using `HierarchicalDataTemplate`:

```csharp
public class FolderItem
{
    public string Name { get; set; } = "";
    public ObservableCollection<FolderItem> Children { get; } = new();
}
```

```xml
<TreeView ItemsSource="{Binding RootFolders}">
    <TreeView.ItemTemplate>
        <TreeDataTemplate ItemsSource="{Binding Children}">
            <TextBlock Text="{Binding Name}" />
        </TreeDataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
```

[`TreeDataTemplate`](/api/avalonia/markup/xaml/templates/treedatatemplate) is the key: its `ItemsSource` property tells the `TreeView` where to find child items for each node. The same template is applied recursively at every level.

### Multiple node types

Use `DataTemplateSelector` patterns with `DataType` to display different node types:

```csharp
public class FolderNode
{
    public string Name { get; set; } = "";
    public ObservableCollection<object> Children { get; } = new();
}

public class FileNode
{
    public string Name { get; set; } = "";
    public long Size { get; set; }
}
```

```xml
<TreeView ItemsSource="{Binding RootItems}">
    <TreeView.DataTemplates>
        <TreeDataTemplate DataType="local:FolderNode" ItemsSource="{Binding Children}">
            <StackPanel Orientation="Horizontal" Spacing="4">
                <PathIcon Data="{StaticResource FolderIcon}" />
                <TextBlock Text="{Binding Name}" />
            </StackPanel>
        </TreeDataTemplate>
        <DataTemplate DataType="local:FileNode">
            <StackPanel Orientation="Horizontal" Spacing="4">
                <PathIcon Data="{StaticResource FileIcon}" />
                <TextBlock Text="{Binding Name}" />
                <TextBlock Text="{Binding Size, StringFormat='{}{0:N0} bytes'}"
                           Foreground="Gray" />
            </StackPanel>
        </DataTemplate>
    </TreeView.DataTemplates>
</TreeView>
```

`FileNode` uses a regular `DataTemplate` (no `ItemsSource`) because files have no children. `FolderNode` uses `TreeDataTemplate` to allow expansion.

## Selection

### Single selection

Bind `SelectedItem` to track the selected node:

```xml
<TreeView ItemsSource="{Binding Items}"
          SelectedItem="{Binding SelectedNode}">
```

```csharp
[ObservableProperty]
private object? _selectedNode;

partial void OnSelectedNodeChanged(object? value)
{
    if (value is FolderNode folder)
        LoadFolderContents(folder);
}
```

### Multiple selection

Enable multiple selection with `SelectionMode`:

```xml
<TreeView ItemsSource="{Binding Items}"
          SelectionMode="Multiple">
```

Access selected items through the `SelectedItems` property in code-behind, or use the `SelectionChanged` event:

```csharp
private void OnSelectionChanged(object? sender, SelectionChangedEventArgs e)
{
    var tree = (TreeView)sender!;
    var selectedItems = tree.SelectedItems;
    // Process selected items
}
```

## Lazy Loading (Load on Expand)

For large trees where loading all children up front is expensive, load children on demand when the user expands a node:

```csharp
public partial class LazyFolderNode : ObservableObject
{
    private bool _isLoaded;

    public string Name { get; }
    public string Path { get; }
    public ObservableCollection<LazyFolderNode> Children { get; } = new();

    // Start with a dummy child so the expand arrow appears
    public LazyFolderNode(string name, string path, bool hasChildren = true)
    {
        Name = name;
        Path = path;
        if (hasChildren)
            Children.Add(new LazyFolderNode("Loading...", "", false));
    }

    [ObservableProperty]
    private bool _isExpanded;

    partial void OnIsExpandedChanged(bool value)
    {
        if (value && !_isLoaded)
        {
            _isLoaded = true;
            LoadChildren();
        }
    }

    private void LoadChildren()
    {
        Children.Clear();
        foreach (var dir in Directory.GetDirectories(Path))
        {
            var name = System.IO.Path.GetFileName(dir);
            Children.Add(new LazyFolderNode(name, dir));
        }
    }
}
```

Bind `IsExpanded` in the `TreeDataTemplate`:

```xml
<TreeView ItemsSource="{Binding RootFolders}">
    <TreeView.Styles>
        <Style Selector="TreeViewItem">
            <Setter Property="IsExpanded" Value="{Binding IsExpanded, Mode=TwoWay}" />
        </Style>
    </TreeView.Styles>
    <TreeView.ItemTemplate>
        <TreeDataTemplate ItemsSource="{Binding Children}">
            <TextBlock Text="{Binding Name}" />
        </TreeDataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
```

The `TreeViewItem` style binds `IsExpanded` on the container to the view model property. When the user expands a node, the setter triggers `OnIsExpandedChanged`, which loads the children.

## Async Lazy Loading

For loading children from a database or API:

```csharp
partial void OnIsExpandedChanged(bool value)
{
    if (value && !_isLoaded)
    {
        _isLoaded = true;
        _ = LoadChildrenAsync();
    }
}

private async Task LoadChildrenAsync()
{
    var items = await _service.GetChildrenAsync(Id);

    Children.Clear();
    foreach (var item in items)
        Children.Add(new LazyFolderNode(item));
}
```

Since `LoadChildrenAsync` is `async`, it returns to the UI thread after `await`, so updating `Children` is safe without explicit dispatcher calls.

## Expanding and Collapsing Programmatically

To expand or collapse all nodes, walk the tree:

```csharp
private void ExpandAll(IEnumerable<LazyFolderNode> nodes)
{
    foreach (var node in nodes)
    {
        node.IsExpanded = true;
        ExpandAll(node.Children);
    }
}

private void CollapseAll(IEnumerable<LazyFolderNode> nodes)
{
    foreach (var node in nodes)
    {
        node.IsExpanded = false;
        CollapseAll(node.Children);
    }
}
```

## Search and Filter

Filter the tree by hiding nodes that do not match a search term. Since `TreeView` does not have built-in filtering, rebuild the visible tree from the source data:

```csharp
[ObservableProperty]
private string _searchText = "";

partial void OnSearchTextChanged(string value)
{
    FilteredItems.Clear();
    foreach (var root in _allItems)
    {
        var filtered = FilterNode(root, value);
        if (filtered is not null)
            FilteredItems.Add(filtered);
    }
}

private FolderNode? FilterNode(FolderNode node, string search)
{
    // Check if this node matches
    var matches = node.Name.Contains(search, StringComparison.OrdinalIgnoreCase);

    // Recursively filter children
    var filteredChildren = node.Children
        .Select(c => FilterNode(c, search))
        .Where(c => c is not null)
        .ToList();

    // Include this node if it matches or has matching children
    if (matches || filteredChildren.Count > 0)
    {
        var result = new FolderNode { Name = node.Name };
        foreach (var child in filteredChildren)
            result.Children.Add(child!);
        return result;
    }

    return null;
}
```

## Drag and Drop in TreeView

Enable drag-and-drop to rearrange tree nodes:

```xml
<TreeView ItemsSource="{Binding Items}"
          DragDrop.AllowDrop="True">
    <TreeView.Styles>
        <Style Selector="TreeViewItem">
            <Setter Property="DragDrop.AllowDrop" Value="True" />
        </Style>
    </TreeView.Styles>
</TreeView>
```

Handle the drag events in code-behind or use behaviors. See [Drag and Drop](/docs/input-interaction/drag-and-drop) for the full API.

## Styling TreeViewItem

Customize the appearance of tree nodes:

```xml
<TreeView.Styles>
    <!-- Change the expand/collapse icon -->
    <Style Selector="TreeViewItem:empty /template/ ToggleButton#PART_ExpandCollapseChevron">
        <Setter Property="IsVisible" Value="False" />
    </Style>

    <!-- Highlight selected items -->
    <Style Selector="TreeViewItem:selected /template/ ContentPresenter#PART_HeaderPresenter">
        <Setter Property="Background" Value="{DynamicResource SystemAccentColor}" />
        <Setter Property="Foreground" Value="White" />
    </Style>

    <!-- Add indentation -->
    <Style Selector="TreeViewItem">
        <Setter Property="Padding" Value="4" />
    </Style>
</TreeView.Styles>
```

## See Also

- [TreeView Control Reference](/controls/data-display/structured-data/treeview): Property tables and basic examples.
- [Data Templates](/docs/data-templates/introduction-to-data-templates): How data templates work.
- [Drag and Drop](/docs/input-interaction/drag-and-drop): Drag-and-drop support.
- [Collection Views](/docs/data-binding/collection-views): Filtering and sorting collections.
