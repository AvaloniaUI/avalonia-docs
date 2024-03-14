---
description: REFERENCE - Built-in Controls
---

import DataGridNuGetScreenshot from '/img/reference/controls/datagrid/datagrid-nuget.png';
import DataGridSortColumnScreenshot from '/img/reference/controls/datagrid/datagrid-sort-column.gif';
import DataGridReorderColumnScreenshot from '/img/reference/controls/datagrid/datagrid-reorder-column.gif';
import DataGridColumnTypesScreenshot from '/img/reference/controls/datagrid/datagrid-column-types.gif';

# 数据网格

数据网格以自定义的网格形式展示重复的数据。该控件可以进行样式定制、模板化和绑定。

数据网格需要绑定到一个可观察的集合（Observable Collection），该集合可以在相关的**数据上下文**中找到。

:::info
要了解**数据上下文**背后的概念，请查看[这里](../../../basics/data/data-binding/data-context)。
:::

:::info
数据网格位于附加的_Avalonia UI_包中。要在您的项目中使用数据网格，您必须引用**Avalonia.Controls.DataGrid** _NuGet_包，并引用其使用的样式，参见下面。
:::

## NuGet包引用

您必须安装数据网格的_NuGet_包，有几种方法可以做到这一点。您可以使用您的IDE的项目菜单中的**管理NuGet包**：

<img src={DataGridNuGetScreenshot} alt="" />

或者，您可以在命令行中运行以下指令：

```bash
dotnet add package Avalonia.Controls.DataGrid
```

或直接在项目（`.csproj`）文件中添加包引用：

```xml
<PackageReference Include="Avalonia.Controls.DataGrid" Version="11.0.0" />
```

:::warning
请注意，您必须始终安装与您正在使用的_Avalonia UI_版本匹配的数据网格版本。
:::

## 包含数据网格样式

您必须引用数据网格的主题，以包含数据网格使用的附加样式。您可以通过向应用程序（`App.axaml`文件）添加`<StyleInclude>`元素来实现这一点。

例如：

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://Avalonia.Controls.DataGrid/Themes/Fluent.xaml"/>
</Application.Styles>
```

## 有用的属性

您可能经常使用以下属性：

| 属性                      | 描述                                                                                                                         |
|-------------------------| ---------------------------------------------------------------------------------------------------------------------------- |
| `AutoGenerateColumns`   | 是否根据绑定项数据源属性名称自动生成列头。 (默认为false)                                                                   |
| `ItemsSource`           | 作为控件数据源的绑定集合。                                                                                                  |
| `IsReadOnly`            | 当为true时，将绑定方向设置为单向。默认值为false，网格将接受对绑定数据的更改。                                              |
| `CanUserReorderColumns` | 指示用户是否可以通过拖动列头更改列的显示顺序。 (默认为false)                                                               |
| `CanUserResizeColumns`  | 指示用户是否可以使用指针调整列宽度。 (默认为false)                                                                         |
| `CanUserSortColumns`    | 指示用户是否可以通过单击列头对列进行排序。 (默认为true)                                                                    |

## 示例

这个示例将生成一个基本的数据网格，列头名称将根据项类自动生成。项目数据源绑定到主窗口的视图模型。

```xml
<DataGrid Margin="20" ItemsSource="{Binding People}" 
          AutoGenerateColumns="True" IsReadOnly="True" 
          GridLinesVisibility="All"
          BorderThickness="1" BorderBrush="Gray">
</DataGrid>
```

```csharp title='C#视图模型'
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

```csharp title='C#项类'
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

<img src={DataGridSortColumnScreenshot} alt="" />

:::info
这些示例使用了MVVM模式和数据绑定到一个`ObservableCollection`。要了解更多有关数据绑定背后的概念，请参阅[这里](../../../basics/data/data-binding)。
:::

通常来说，从项类中获取的属性名称通常不会成为好的列名。下面这个示例为网格添加了自定义的列头名称。它还允许列重新排序和调整大小，并禁用了默认的列排序选项：

```xml
<DataGrid Margin="20" ItemsSource="{Binding People}"
          IsReadOnly="True"
          CanUserReorderColumns="True"
          CanUserResizeColumns="True"
          CanUserSortColumns="False"
          GridLinesVisibility="All"
          BorderThickness="1" BorderBrush="Gray">
  <DataGrid.Columns>
     <DataGridTextColumn Header="First Name"  Binding="{Binding FirstName}"/>
     <DataGridTextColumn Header="Last Name" Binding="{Binding LastName}" />
  </DataGrid.Columns>
</DataGrid>
```

<img src={DataGridReorderColumnScreenshot} alt="" />

这个示例展示了数据网格如何接受更改并更新底层集合，并使用不同的列类型来编辑数据：

```xml
<DataGrid Margin="20" ItemsSource="{Binding People}"        
          GridLinesVisibility="All"
          BorderThickness="1" BorderBrush="Gray">
  <DataGrid.Columns>
     <DataGridTextColumn Header="First Name"  Binding="{Binding FirstName}"/>
     <DataGridTextColumn Header="Last Name" Binding="{Binding LastName}" />
     <DataGridCheckBoxColumn Header="Fictitious?" Binding="{Binding IsFictitious}" />
  </DataGrid.Columns>
</DataGrid>
```

```csharp title='C#视图模型'
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
                new Person("Neil", "Armstrong", false),
                new Person("Buzz", "Lightyear", true),
                new Person("James", "Kirk", true)
            };
            People = new ObservableCollection<Person>(people);
        }
    }
}
```

```csharp title='C#项类'
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsFictitious { get; set; }

    public Person(string firstName , string lastName, bool isFictitious)
    {
        FirstName = firstName;
        LastName = lastName;
        IsFictitious = isFictitious;
    }
}
```

<img src={DataGridColumnTypesScreenshot} alt="" />

## 更多信息

:::info
有关不同类型的数据网格列的更多信息，请参阅[下一页](datagridcolumns.md)。
:::

:::info
有关此控件的完整API文档，请参阅[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGrid/)。
:::

:::info
在_GitHub_上查看源代码 [`DataGrid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGrid.cs)
:::
