---
title: 数据表格模板列
description: REFERENCE - Built-in Controls
---
import TemplateColumnsScreenshot from '/img/gitbook-import/assets/grid4.gif';


# 数据表格模板列

您可以使用此列类型自定义数据网格列的显示和编辑。

有两个数据模板，您可以将其定义为附加属性：

<table><thead><tr><th width="269">数据模板</th><th>描述</th></tr></thead><tbody><tr><td><code>CellTemplate</code> </td><td>列值的显示（未编辑）呈现。</td></tr><tr><td><code>CellEditingTemplate</code> </td><td>列值的编辑模板。</td></tr></tbody></table>

:::info
如果您未设置编辑模板，该列将保持只读状态。
:::

## 示例

此示例在编辑某人的年龄属性时添加一个数字上下控件：

```xml
<Window ...
  xmlns:model="using:AvaloniaControls.Models" >
  
  <DataGrid Margin="20" ItemsSource="{Binding People}"
          GridLinesVisibility="All"
          BorderThickness="1" BorderBrush="Gray">
    <DataGrid.Columns>
      <DataGridTextColumn Header="First Name" Width="2*"
         Binding="{Binding FirstName}" />
      <DataGridTextColumn Header="Last Name" Width="2*"
         Binding="{Binding LastName}" />
      
      <DataGridTemplateColumn Header="Age">
        <DataGridTemplateColumn.CellTemplate>
          <DataTemplate DataType="model:Person">
            <TextBlock Text="{Binding AgeInYears, StringFormat='{}{0} years'}" 
              VerticalAlignment="Center" HorizontalAlignment="Center" />
          </DataTemplate>
        </DataGridTemplateColumn.CellTemplate>
        <DataGridTemplateColumn.CellEditingTemplate>
          <DataTemplate DataType="model:Person">
            <NumericUpDown Value="{Binding AgeInYears}"  
               FormatString="N0" Minimum="0" Maximum="120"  
               HorizontalAlignment="Stretch"/>
          </DataTemplate>
        </DataGridTemplateColumn.CellEditingTemplate>
      </DataGridTemplateColumn>
    
    </DataGrid.Columns>
  </DataGrid>
</Window>
```

```csharp title='C# View Model'
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
                new Person("Neil", "Armstrong",  55),
                new Person("Buzz", "Lightyear", 38),
                new Person("James", "Kirk", 44)
            };
            People = new ObservableCollection<Person>(people);
        }
    }
}
```

```csharp title='C# Item Class'
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int AgeInYears { get; set; } 


    public Person(string firstName , string lastName, int ageInYears)
    {
        FirstName = firstName;
        LastName = lastName;
        AgeInYears = ageInYears;
    }
}
```

<img src={TemplateColumnsScreenshot} alt=''/>

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[此处](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridTemplateColumn/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`DataGridTemplateColumn.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridTemplateColumn.cs)
:::

