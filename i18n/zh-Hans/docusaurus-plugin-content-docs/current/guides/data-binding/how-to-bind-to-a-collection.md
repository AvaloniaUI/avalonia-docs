---
id: how-to-bind-to-a-collection
title: 如何绑定到集合
---


# 如何绑定到集合

在 Avalonia UI 中绑定到集合是一种有效的显示动态数据的方法。本指南将演示如何将 `ObservableCollection` 绑定到控件，比如 `ListBox` 或 `ItemsControl`，以显示一系列项目。

## 绑定到简单的 ObservableCollection

首先，假设您有一个 `ObservableCollection<string>`，您希望将其绑定到一个 `ListBox` 以显示字符串项目的列表。

以下是一个带有 `ObservableCollection<string>` 的示例 `ViewModel`：

```csharp 
public class ViewModel : ObservableObject
{
    private ObservableCollection<string> _items;

    public ObservableCollection<string> Items
    {
        get { return _items; }
        set { SetProperty(ref _items, value); }
    }

    public ViewModel()
    {
        Items = new ObservableCollection<string> { "Item 1", "Item 2", "Item 3" };
    }
}
```

在您的视图中，您可以这样将这个 `ObservableCollection` 绑定到 `ListBox`：

```xml
<ListBox ItemsSource="{Binding Items}"/>
```

## 绑定到一个包含复杂对象的 ObservableCollection

但如果您的 `ObservableCollection` 包含复杂对象，这些对象本身也需要传播更改怎么办？让我们修改我们的 `ViewModel` 来适应这种情况。

考虑一个 `Person` 类：

```csharp
public class Person : ObservableObject
{
    private string _name;
    private int _age;

    public string Name
    {
        get { return _name; }
        set { SetProperty(ref _name, value); }
    }

    public int Age
    {
        get { return _age; }
        set { SetProperty(ref _age, value); }
    }
}
```

以及在我们的 `ViewModel` 中的一个 `ObservableCollection<Person>`：

```csharp
public class ViewModel : ObservableObject
{
    private ObservableCollection<Person> _people;

    public ObservableCollection<Person> People
    {
        get { return _people; }
        set { SetProperty(ref _people, value); }
    }

    public ViewModel()
    {
        People = new ObservableCollection<Person> 
        {
            new Person { Name = "John Doe", Age = 30 },
            new Person { Name = "Jane Doe", Age = 28 }
        };
    }
}
```

您可以在视图中将这个 `ObservableCollection` 绑定到 `ListBox`，并使用 `DataTemplate` 来指定每个 `Person` 应该如何呈现：

```xml
<ListBox ItemsSource="{Binding People}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="{Binding Name}" Margin="0,0,10,0"/>
                <TextBlock Text="{Binding Age}"/>
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

在这种情况下，列表中的每个 `Person` 将以其 `Name` 和 `Age` 分开的方式显示，并带有一个小间距。如果任何项目的属性发生更改，`ListBox` 项目将自动更新。
