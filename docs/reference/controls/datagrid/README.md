---
title: DataGrid
description: REFERENCE - Built-in Controls
---

import DataGridNuGetScreenshot from '/img/reference/controls/datagrid/datagrid-nuget.png';
import DataGridSortColumnScreenshot from '/img/reference/controls/datagrid/datagrid-sort-column.gif';
import DataGridReorderColumnScreenshot from '/img/reference/controls/datagrid/datagrid-reorder-column.gif';
import DataGridColumnTypesScreenshot from '/img/reference/controls/datagrid/datagrid-column-types.gif';

# DataGrid

The `DataGrid` displays repeating data in a customizable grid. The control can be styled, templated and bound.

The `DataGrid` needs to be bound to an observable collection in a view model that can be found in a related **data context**.

:::info
To review the concept behind the **data context**, see [here](../../../basics/data/data-binding/data-context).
:::

:::info
The `DataGrid` is in an additional _Avalonia UI_ package. To use the `DataGrid` in your project, you must reference the **Avalonia.Controls.DataGrid** _NuGet_ package, and reference the styles that it uses, see below.
:::

## NuGet Package Reference

You must install the _NuGet_ package for the `DataGrid`, there are several ways of doing this. You can use **Manage NuGet Packages** from the project menu of your IDE:

<img src={DataGridNuGetScreenshot} alt="" />

Alternatively, you can run this instruction from the command line:

```bash
dotnet add package Avalonia.Controls.DataGrid
```

Or add package reference directly to the project (`.csproj`) file:

```xml
<PackageReference Include="Avalonia.Controls.DataGrid" Version="11.0.0" />
```

:::warning
Note you must always install the data grid version that matches the _Avalonia UI_ version you are using.
:::

## Include DataGrid Styles

You must reference the `DataGrid` themes to include the additional styles that the `DataGrid` uses. You can do this by adding a `<StyleInclude>` element to the application (`App.axaml` file).

For example:

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://Avalonia.Controls.DataGrid/Themes/Fluent.xaml"/>
</Application.Styles>
```

## Useful Properties

You will probably use these properties most often:

| Property                | Description                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `AutoGenerateColumns`   | Whether the columns will automatically generate from the bound items data source property names. (Default is false.)            |
| `ItemsSource`           | The bound collection that is used as the data source for the control.                                                           |
| `IsReadOnly`            | Sets the binding direction to one-way when true. The default is false - the grid will accept changes to the bound data.         |
| `CanUserReorderColumns` | Indicates whether the user can change the column display order by dragging column headers with the pointer. (Default is false.) |
| `CanUserResizeColumns`  | Indicates whether the user can adjust column widths using the pointer. (Default is false.)                                      |
| `CanUserSortColumns`    | Indicates whether the user can sort columns by clicking the column header. (Default is true.)                                   |

## Examples

This example will generate a basic `DataGrid`, with column header names auto-generated from the item class. The items data source is bound to the main window view model.

```xml
<DataGrid Margin="20" ItemsSource="{Binding People}" 
          AutoGenerateColumns="True" IsReadOnly="True" 
          GridLinesVisibility="All"
          BorderThickness="1" BorderBrush="Gray">
</DataGrid>
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
                new Person("Neil", "Armstrong"),
                new Person("Buzz", "Lightyear"),
                new Person("James", "Kirk")
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
    
    public Person(string firstName , string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
}
```

<img src={DataGridSortColumnScreenshot} alt="" />

:::info
These examples use the MVVM pattern with data binding to an `ObservableCollection`. For more information on the concepts behind data binding, see [here](../../../basics/data/data-binding).
:::

Property names from the item class will generally not make good column names. This example adds custom header names to the grid. It also allows column reordering and resizing and disallows the default column sorting option:

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

This example shows how the `DataGrid` can accept changes and update the underlying collection, and use different column types to edit the data:

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
                new Person("Neil", "Armstrong", false),
                new Person("Buzz", "Lightyear", true),
                new Person("James", "Kirk", true)
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

## More Information

:::info
For more information about the different kinds of `DataGridColumn`, see the [next page](datagridcolumns.md).
:::

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGrid/).
:::

:::info
View the source code on _GitHub_ [`DataGrid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGrid.cs)
:::
