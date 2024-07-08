---
title: TreeView
description: REFERENCE - Built-in Controls
---

import TreeViewAnimalHierarchyScreenshot from '/img/reference/controls/detailed-reference/treeview/treeview-animal-hierarchy.gif';
import TreeViewEnhancedAnimalHierarchyScreenshot from '/img/reference/controls/detailed-reference/treeview/treeview-enhanced-animal-hierarchy.gif';

# TreeView

The `TreeView` control can present hierarchical data and allows item selection. The items are templated so you can customise how they are displayed.

There are two data sources: the main items source for the control, this gives the root of the hierarchical data. Then there is the items source in the item template which allows the control to list the next level in the hierarchical data.

## Useful Properties

You will probably use these properties most often:

<table>
  <thead>
    <tr>
      <th width="316">Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ItemsSource</code></td>
      <td>The bound collection that is used as the data source for the control.</td>
    </tr>
    <tr>
      <td><code>ItemsControl.ItemTemplate</code></td>
      <td>The item template, contains a DataTemplate which will be applied to individual items and can be used to change how items look.</td>
    </tr>
    <tr>
      <td><code>ItemsControl.ItemPanel</code></td>
      <td>The container panel to place items in. By default, this is a StackPanel. See [this page](../../../concepts/custom-itemspanel) to customise the ItemsPanel.</td>
    </tr>
    <tr>
      <td><code>ItemsControl.Styles</code></td>
      <td>The style that is applied to any child element of the ItemControl.</td>
    </tr>
  </tbody>
</table>

## Example

This example uses a MVVM pattern view model to hold some hierarchical data based on a C# node class. In this example, there is a single root node in the `Nodes` collection of the view model:

```xml
<TreeView ItemsSource="{Binding Nodes}">
  <TreeView.ItemTemplate>
    <TreeDataTemplate ItemsSource="{Binding SubNodes}">
      <TextBlock Text="{Binding Title}"/>
    </TreeDataTemplate>
  </TreeView.ItemTemplate>
</TreeView>
```

```csharp title='C# View Model'
using AvaloniaControls.Models;
using System.Collections.ObjectModel;

namespace AvaloniaControls.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public ObservableCollection<Node> Nodes{ get; }

        public MainWindowViewModel()
        {
            Nodes = new ObservableCollection<Node>
            {                
                new Node("Animals", new ObservableCollection<Node>
                {
                    new Node("Mammals", new ObservableCollection<Node>
                    {
                        new Node("Lion"), new Node("Cat"), new Node("Zebra")
                    })
                })
            };
        }
    }
}
```

```csharp title='C# Node Class'
using System.Collections.ObjectModel;

namespace AvaloniaControls.Models
{
    public class Node
    {
        public ObservableCollection<Node>? SubNodes { get; }
        public string Title { get; }
  
        public Node(string title)
        {
            Title = title;
        }

        public Node(string title, ObservableCollection<Node> subNodes)
        {
            Title = title;
            SubNodes = subNodes;
        }
    }
}
```

By default the root node (or nodes) is shown. The user can expand or contract each node by clicking on the adjacent arrow. Clicking on the node title selects the item.

<img src={TreeViewAnimalHierarchyScreenshot} alt="" />

This is a development of the previous example with multiple root nodes, a revised item template, and an initial selection made in the view model code:

```xml
<TreeView Margin="10"
          ItemsSource="{Binding Nodes}" 
          SelectedItems="{Binding SelectedNodes}"
          SelectionMode="Multiple">
  <TreeView.ItemTemplate>
    <TreeDataTemplate ItemsSource="{Binding SubNodes}">
      <Border HorizontalAlignment="Left"
              BorderBrush="Gray" BorderThickness="1"
              CornerRadius="5" Padding="15 3">
        <TextBlock Text="{Binding Title}" />
      </Border>
    </TreeDataTemplate>
  </TreeView.ItemTemplate>
</TreeView>
```

```csharp title='C# View Model'
using AvaloniaControls.Models;
using System.Collections.ObjectModel;
using System.Linq;

namespace AvaloniaControls.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public ObservableCollection<Node> Nodes { get; }
        public ObservableCollection<Node> SelectedNodes { get; }

        public MainWindowViewModel()
        {
            SelectedNodes = new ObservableCollection<Node>();
            Nodes = new ObservableCollection<Node>
            {                
                new Node("Animals", new ObservableCollection<Node>
                {
                    new Node("Mammals", new ObservableCollection<Node>
                    {
                        new Node("Lion"), new Node("Cat"), new Node("Zebra")
                    })
                }),
                new Node("Birds", new ObservableCollection<Node>
                {
                    new Node("Robin"), new Node("Condor"), 
                    new Node("Parrot"), new Node("Eagle")
                }),
                new Node("Insects", new ObservableCollection<Node>
                {
                    new Node("Locust"), new Node("House Fly"), 
                    new Node("Butterfly"), new Node("Moth")
                }),
            };

            var moth = Nodes.Last().SubNodes?.Last();
            if (moth!=null) SelectedNodes.Add(moth);    
        }
    }
}
```

```csharp title='C# Node Class'
using System.Collections.ObjectModel;

namespace AvaloniaControls.Models
{
    public class Node
    {
        public ObservableCollection<Node>? SubNodes { get; }
        public string Title { get; }
  
        public Node(string title)
        {
            Title = title;
        }

        public Node(string title, ObservableCollection<Node> subNodes)
        {
            Title = title;
            SubNodes = subNodes;
        }
    }
}
```

The tree view adds a scroll bar when it is needed. The selection can be extended by holding down the Ctrl key.

<img src={TreeViewEnhancedAnimalHierarchyScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/TreeView/).
:::

:::info
View the source code on _GitHub_ [`TreeView.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TreeView.cs)
:::
