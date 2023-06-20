---
description: REFERENCE - Built-in Controls
---

# Tree View

The tree view control can present hierarchical data and allows item selection. The items are templated so you can customise how they are displayed.&#x20;

There are two data sources: the main items source for the control, this gives the root of the hierarchical data. Then then there is the items source in the item template which allows the control to list the next level in the hierarchical data.

## Example

This example uses a MVVM pattern view model to hold some hierarchical data based on a C# node class. In this example, there is a single root node in the `Nodes` collection of the view model:&#x20;

{% tabs %}
{% tab title="XAML" %}
```xml
<TreeView Items="{Binding Nodes}">
  <TreeView.ItemTemplate>
    <TreeDataTemplate ItemsSource="{Binding SubNodes}">
      <TextBlock Text="{Binding Title}"/>
    </TreeDataTemplate>
  </TreeView.ItemTemplate>
</TreeView>
```
{% endtab %}

{% tab title="C# View Model" %}
```csharp
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
{% endtab %}

{% tab title="C# Node Class" %}
```csharp
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
{% endtab %}
{% endtabs %}

By default the root node (or nodes) is shown. The user can expand or contract each node by clicking on the adjacent arrow. Clicking on the node title selects the item.

<!--figure><img src="../../../.gitbook/assets/tree1.gif" alt=""><figcaption></figcaption></figure-->

This is a development of the previous example with multiple root nodes, a revised item template, and an initial selection made in the view model code:

{% tabs %}
{% tab title="XAML" %}
```xml
<TreeView Margin="10"
          Items="{Binding Nodes}" 
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
{% endtab %}

{% tab title="C# View Model" %}
```csharp
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
{% endtab %}

{% tab title="C# Node Class" %}
```csharp
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
{% endtab %}
{% endtabs %}

The tree view adds a scroll bar when it is needed. The selection can be extended by holding down the Ctrl key.&#x20;

<!--figure><img src="../../../.gitbook/assets/tree2.gif" alt=""><figcaption></figcaption></figure-->

## More Information

{% hint style="info" %}
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/TreeView/).
{% endhint %}

{% hint style="info" %}
View the source code on _GitHub_ [`TreeView.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TreeView.cs)
{% endhint %}
