---
description: REFERENCE - Built-in Controls
---

import TreeViewAnimalHierarchyScreenshot from '/img/reference/controls/treeview/treeview-animal-hierarchy.gif';
import TreeViewEnhancedAnimalHierarchyScreenshot from '/img/reference/controls/treeview/treeview-enhanced-animal-hierarchy.gif';

#  TreeView 树视图

树视图控件可以呈现层次数据并允许项目选择。项目是模板化的，因此您可以自定义它们的显示方式。

有两个数据源：控件的主要项目源，这提供了层次数据的根。然后是项目模板中的项目源，它允许控件列出层次数据的下一级。

## 示例

此示例使用 MVVM 模式视图模型来保存一些基于 C# 节点类的层次数据。在此示例中，视图模型的 `Nodes` 集合中有一个根节点：

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

默认情况下显示根节点（或节点）。用户可以通过单击相邻的箭头来展开或收缩每个节点。单击节点标题选择项目。

<img src={TreeViewAnimalHierarchyScreenshot} alt="" />

这是前一个示例的开发版本，具有多个根节点、修订的项目模板以及在视图模型代码中进行的初始选择：

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

树视图在需要时添加滚动条。可以通过按住 Ctrl 键来扩展选择。

<img src={TreeViewEnhancedAnimalHierarchyScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[此处](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TreeView)。
:::

:::info
在 _GitHub_ 上查看源代码 [`TreeView.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TreeView.cs)
:::

