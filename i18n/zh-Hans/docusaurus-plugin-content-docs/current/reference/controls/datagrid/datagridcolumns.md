---
description: REFERENCE - Built-in Controls
---

import DataGridColumnPreviewScreenshot from '/img/reference/controls/datagrid/datagridtextcolumn.png';

# 数据表格列

数据表格可以包含多个数据表格列，_Avalonia UI_ 提供了两种内置列类型，用于显示不同的数据类型，还有一个可以自定义列外观的模板类型。

| 列类型                  | 描述                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `DataGridTextColumn`     | 用于显示和编辑列数据的文本框。您可以在此列类型中控制字体属性，比如字体家族和大小。                                 |
| `DataGridCheckBoxColumn` | 用于显示和编辑列数据的复选框，当数据类型为布尔值时。此列类型还支持当值为可空时的三态复选框。                             |
| `DataGridTemplateColumn` | 可用于自定义列数据的展示和编辑。                                                                             |

## 有用的属性

大部分属性在这三种列类型中都是通用的：

| 属性              | 描述                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------- |
| `Header`          | 列的标题内容。                                                                           |
| `HeaderTemplate`  | 使用数据模板作为列的标题。                                                               |
| `IsReadOnly`      | 列是否为只读。如果数据表格本身是只读的，那么无论此属性的值如何，列都是只读的。                  |
| `IsThreeState`    | 仅适用于复选框列。当可空布尔值为null时，启用第三个（填充）状态。                              |
| `Width`           | 列宽度可以是绝对大小或相对大小（见下文）。                                                   |

## 列宽度

如果您没有为列设置宽度，它将被调整以适应内容，并在必要时为网格添加水平滚动条。

您可以绝对设置列的宽度，例如：

```xml
<DataGridTextColumn Width="200" />
```

这将导致不适合的列内容被隐藏。

或者，您可以指定相对自动大小。这使用 * 表示可用宽度的等分，然后使用类似 2* 的倍数。未指定宽度的列将根据其内容调整大小。

例如，要将数据表格划分为3个等宽的列：

```xml
<DataGridTextColumn Width="*" />
<DataGridTextColumn Width="*" />
<DataGridTextColumn Width="*" />
```

示例

下面的示例通过将两列等宽展开来改进数据表格的外观：

```xml
<Window ... >
   <Design.DataContext>
       <vm:MainWindowViewModel/>
  </Design.DataContext>
  <DataGrid Margin="20" ItemsSource="{Binding People}"
          IsReadOnly="True"
          GridLinesVisibility="All"
          BorderThickness="1" BorderBrush="Gray">
    <DataGrid.Columns>
      <DataGridTextColumn Header="名字" Width="*" 
              Binding="{Binding FirstName}"/>
      <DataGridTextColumn Header="姓氏" Width="*" 
              Binding="{Binding LastName}" />
    </DataGrid.Columns>
  </DataGrid>
</Window>
```

```csharp title='C# 视图模型'
using AvaloniaControls.Models;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AvaloniaControls.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public ObservableCollection<Person> People { get; }

        public MainWindowViewModel()
        {
            var people = new List<Person> 
            {
                new Person("Neil", "Armstrong"),
                new Person("Buzz", "Lightyear"),
                new Person("James", "Kirk")
            };
            People = new ObservableCollection<Person>(people);
        }
    }
}
```

```csharp title='C# 项类'
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    public Person(string firstName , string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
}
```

在预览窗格中可以看到效果，因为 `<Design.DataContext>` 元素创建了绑定的视图模型：

<img src={DataGridColumnPreviewScreenshot} alt="" />

## 更多信息

:::info
有关数据表格文本列的完整 API 文档，请参阅[此处](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridTextColumn/)。
:::

:::info
有关数据表格复选框列的完整 API 文档，请参阅[此处](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridCheckBoxColumn/)。
:::

:::info
查看 _GitHub_ 上的源代码[`DataGridTextColumn.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridTextColumn.cs)。
:::

:::info
查看 _GitHub_ 上的源代码[`DataGridCheckBoxColumn.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridCheckBoxColumn.cs)。
:::