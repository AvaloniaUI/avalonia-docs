---
description: REFERENCE - Built-in Controls
---

import FlatTreeDataGridSourceScreenshot from '/img/reference/controls/treedatagrid/treedatagrid-flat.gif';

# 扁平树数据表格

:::warning
自 2025 年 10 月起，`TreeDataGrid` 作为 Avalonia Accelerate 的一部分进行维护。请参阅[Accelerate 文档中关于扁平化 `TreeDataGrid` 的说明](/accelerate/components/treedatagrid/quickstart-flat)。
:::

## 示例

在此示例中，视图模型包含一个可观察集合，该集合填充了数据，然后用于创建一个 `FlatTreeDataGridSource` 属性以绑定到树数据网格的源。网格的项是 `Person` 类。

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

        public FlatTreeDataGridSource<Person> PersonSource { get; }

        public MainWindowViewModel()
        {
            _people = new ObservableCollection<Person>()
            {
                new Person ("Eleanor", "Pope", 32 ),
                new Person ("Jeremy", "Navarro", 74 ),
                new Person ( "Lailah ", "Velazquez", 16 ),
                new Person ( "Jazmine", "Schroeder", 52 ),
            };
                          
            PersonSource = new FlatTreeDataGridSource<Person>(_people)
            {
                Columns =
                {
                    new TextColumn<Person, string>
                        ("First Name", x => x.FirstName),
                    new TextColumn<Person, string>
                        ("Last Name", x => x.LastName),
                    new TextColumn<Person, int>
                        ("Age", x => x.Age),
                },
            };
        }
    }
}

```

```csharp title='C# Item Class'
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }

    public Person(string firstName, string lastName, int age)
    {
        FirstName = firstName;
        LastName = lastName;
        Age = age;
    }
}
```

数据源还定义了如何将数据模型映射到树数据网格中的行和列。因为此示例显示的是扁平数据，所以数据源在视图模型上使用 `FlatTreeDataGridSource<Person>` 属性。

使用 `TextColumn` 类定义了三列。每个列都使用一个 lambda 表达式来返回列值。

<img src={FlatTreeDataGridSourceScreenshot} alt=""/>
