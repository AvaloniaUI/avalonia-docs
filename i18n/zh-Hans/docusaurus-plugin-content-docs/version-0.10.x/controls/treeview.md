---
id: treeview
title: TreeView
---

The `TreeView` is a control that presents hierarchical tree data and allows selection of it.

One example for populating a `TreeView` can be from a directory on the computer. You can create a `TreeView` in the `MainWindow.axaml` file in an Avalonia MVVM project.

```markup
<TreeView Items="{Binding Items}" 
	  Width="400" Height="480" 
	  HorizontalAlignment="Left">
	<TreeView.ItemTemplate>
		<TreeDataTemplate ItemsSource="{Binding Subfolders}">
			<TextBlock Text="{Binding strNodeText}"/>
		</TreeDataTemplate>
	</TreeView.ItemTemplate>
</TreeView>
```

In the `MainWindowViewModel.cs` you can add this code which will recursively look up all the subfolders and populate the TreeView from `Items` and `Subfolders`

```csharp
public ObservableCollection<Node> Items { get; }
public ObservableCollection<Node> SelectedItems { get; }
public string strFolder { get; set; }

public MainWindowViewModel()
{
    strFolder = @"C:\Users\hooty\Desktop"; // EDIT THIS FOR AN EXISTING FOLDER

    Items = new ObservableCollection<Node>();

    Node rootNode = new Node(strFolder);
    rootNode.Subfolders = GetSubfolders(strFolder);
    
    Items.Add(rootNode);
}

public ObservableCollection<Node> GetSubfolders(string strPath)
{
    ObservableCollection<Node> subfolders = new ObservableCollection<Node>();
    string[] subdirs = Directory.GetDirectories(strPath, "*", SearchOption.TopDirectoryOnly);

    foreach (string dir in subdirs)
    {
        Node thisnode = new Node(dir);

        if (Directory.GetDirectories(dir, "*", SearchOption.TopDirectoryOnly).Length > 0)
        {
            thisnode.Subfolders = new ObservableCollection<Node>();

            thisnode.Subfolders = GetSubfolders(dir);
        }

        subfolders.Add(thisnode);
    }

    return subfolders;
}

public class Node
{
    public ObservableCollection<Node> Subfolders { get; set; }

    public string strNodeText { get; }
    public string strFullPath { get; }

    public Node(string _strFullPath)
    {
        strFullPath = _strFullPath;
        strNodeText = Path.GetFileName(_strFullPath);
    }
}
```

The example project source can be found at [avalonia-treeview-test](https://github.com/hootyjeremy/avalonia-treeview-test)


### Reference

[TreeView](http://reference.avaloniaui.net/api/Avalonia.Controls/TreeView/)

### Source code

[TreeView.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TreeView.cs)
