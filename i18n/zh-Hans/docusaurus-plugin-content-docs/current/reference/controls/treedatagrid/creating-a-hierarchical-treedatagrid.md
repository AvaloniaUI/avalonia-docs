---
description: REFERENCE - Built-in Controls
---

import HierarchicalTreeDataGridSourceScreenshot from '/img/reference/controls/treedatagrid/treedatagrid-hierarchical.gif';

# 分层树数据表格

:::warning
自 2025 年 10 月起，`TreeDataGrid` 作为 Avalonia Accelerate 的一部分进行维护。请参阅[Accelerate 文档中关于分层 `TreeDataGrid` 的信息](/accelerate/components/treedatagrid/quickstart-hierarchical)。
:::

## 示例

在此示例中，视图模型包含一个可观察集合，该集合填充了数据，然后用于创建一个 `HierarchicalTreeDataGridSource` 属性，以绑定到树数据网格的源。网格的项目是类 `Person`。

```
<TreeDataGrid Source="{Binding PersonSource}"/>
```

```csharp title='C# View Model'
using Avalonia.Controls.Models.TreeDataGrid;
using Avalonia.Controls;
using AvaloniaControls.Models;
using System.Collections.ObjectModel;
using System.Linq;

namespace AvaloniaControls.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        private ObservableCollection<Person> _people;

        public HierarchicalTreeDataGridSource<Person> PersonSource { get; }

        public MainWindowViewModel()
        {
            _people = new ObservableCollection<Person>()
            {
                new Person
                {
                    FirstName = "Eleanor", 
                    LastName = "Pope",
                    Age = 32,
                    Children =
                    {
                        new Person
                        { 
                            FirstName = "Marcel", 
                            LastName = "Gutierrez", 
                            Age = 4 
                        },
                    }
                },
                new Person
                {
                    FirstName = "Jeremy",
                    LastName = "Navarro",
                    Age = 74,
                    Children =
                    {
                        new Person
                        {
                            FirstName = "Jane",
                            LastName = "Navarro",
                            Age = 42 ,
                            Children =
                            {
                                new Person 
                                { 
                                    FirstName = "Lailah ", 
                                    LastName = "Velazquez", 
                                    Age = 16 
                                }
                            }
                        },
                    }
                },
                new Person 
                { 
                    FirstName = "Jazmine", 
                    LastName = "Schroeder", 
                    Age = 52 
                },
            };

            PersonSource = new HierarchicalTreeDataGridSource<Person>(_people)
            {
                Columns =
                {
                    new HierarchicalExpanderColumn<Person>(
                        new TextColumn<Person, string>
                            ("First Name", x => x.FirstName),x => x.Children),
                    new TextColumn<Person, string>
                            ("Last Name", x => x.LastName),
                    new TextColumn<Person, int>("Age", x => x.Age),
                },
            };
        }
    }
}

```

```csharp title='C# Item Class'
public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int Age { get; set; }
    public ObservableCollection<Person> Children { get; } = new();
}
```

数据源还定义了如何将数据模型映射到树数据网格中的行和列。因为此示例显示的是分层数据，所以数据源在视图模型上使用 `HierarchicalTreeDataGridSource<Person>` 属性。

定义了三列：

第一列用 `HierarchicalExpanderColumn` 包围。此元素包含一个 `TextColumn`，它采用一个 lambda 来返回列值，另一个返回行的子项。该列将显示一个带有折叠或展开子行（如果有）的按钮。其余列仅用 `TextColumn` 定义。

<img src={HierarchicalTreeDataGridSourceScreenshot} alt=""/>
