---
id: index
title: TreeDataGrid
tags:
  - accelerate
---

import FlatTreeDataGrid from '/img/accelerate/treedatagrid/quickstart-flat-1.png';
import HierarchicalTreeDataGrid from '/img/accelerate/treedatagrid/quickstart-hierarchical-1.png';

The `TreeDataGrid` combines tree view and data grid functionality in a single control, displaying hierarchical and tabular data together. It supports two modes:

* _Flat_ displays data in a two-dimensional table, similar to a standard data grid.
* _Hierarchical_ displays data in an expandable tree with optional columns.

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

## Installation

See the [Installation Guide](/tools/installing-accelerate) for full instructions on installing Accelerate components.

Add the `TreeDataGrid` package to your project:

```bash
dotnet add package Avalonia.Controls.TreeDataGrid
```

### Add the licence key

Include your Avalonia licence key in the executable project file (`.csproj`):

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your licence key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

### Install the theme

The `TreeDataGrid` theme must be added to your `App.axaml`, otherwise the control won't render.

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp"
             RequestedThemeVariant="Default">
    <Application.Styles>
        <FluentTheme />
        // highlight-next-line
        <StyleInclude Source="avares://Avalonia.Controls.TreeDataGrid/Themes/Fluent.axaml"/>
    </Application.Styles>
</Application>
```

## Useful properties

You will probably use these properties most often:

| Property               | Description                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `Source`               | The data source that drives the control's rows and columns.                                   |
| `CanUserResizeColumns` | Whether the user can adjust column widths with the pointer. Default is `false`.               |
| `CanUserSortColumns`   | Whether the user can sort columns by clicking the header. Default is `true`.                  |

### Source

Every `TreeDataGrid` has two parts: a **Source** defined in code that maps your data model to rows and columns, and the **control** itself, instantiated in XAML or code. With the MVVM pattern, the source typically lives in the view model. The examples below follow this approach.

## Flat data

### Data model

Start with a simple `Person` class:

```csharp
public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int Age { get; set; }
}
```

Then create a `MainWindowViewModel` with some sample data stored in an [`ObservableCollection<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1?view=net-6.0), so the grid automatically reflects changes:

```csharp
using System.Collections.ObjectModel;
using Avalonia.Controls;
using Avalonia.Controls.Models.TreeDataGrid;

public class MainWindowViewModel
{
    private ObservableCollection<Person> _people = new()
    {
        new Person { FirstName = "Eleanor", LastName = "Pope", Age = 32 },
        new Person { FirstName = "Jeremy", LastName = "Navarro", Age = 74 },
        new Person { FirstName = "Lailah ", LastName = "Velazquez", Age = 16 },
        new Person { FirstName = "Jazmine", LastName = "Schroeder", Age = 52 },
    };
}
```

### Data source

For non-hierarchical data, use `FlatTreeDataGridSource<Person>`. Pass it the collection and define the columns. Each `TextColumn` takes the data model type, the value type, a header string, and a lambda to select the value:

```csharp
public class MainWindowViewModel
{
    private ObservableCollection<Person> _people = /* defined earlier */

    public MainWindowViewModel()
    {
        Source = new FlatTreeDataGridSource<Person>(_people)
        {
            Columns =
            {
                new TextColumn<Person, string>("First Name", x => x.FirstName),
                new TextColumn<Person, string>("Last Name", x => x.LastName),
                new TextColumn<Person, int>("Age", x => x.Age),
            },
        };
    }

    public FlatTreeDataGridSource<Person> Source { get; }
}
```

### Add the control

Bind the `TreeDataGrid` to the source in your window:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication.MainWindow">
  <TreeDataGrid Source="{Binding Source}"/>
</Window>
```

### Run the application

<Image light={FlatTreeDataGrid} maxWidth={400} alignment="center" />

## Hierarchical data

### Data model

The hierarchical model is the same `Person` class with an added `Children` collection:

```csharp
public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int Age { get; set; }
    public ObservableCollection<Person> Children { get; } = new();
}
```

The view model now contains nested data:

```csharp
using System.Collections.ObjectModel;
using Avalonia.Controls;
using Avalonia.Controls.Models.TreeDataGrid;

public class MainWindowViewModel
{
    private ObservableCollection<Person> _people = new()
    {
        new Person
        {
            FirstName = "Eleanor",
            LastName = "Pope",
            Age = 32,
            Children =
            {
                new Person { FirstName = "Marcel", LastName = "Gutierrez", Age = 4 },
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
                        new Person { FirstName = "Lailah ", LastName = "Velazquez", Age = 16 }
                    }
                },
            }
        },
        new Person { FirstName = "Jazmine", LastName = "Schroeder", Age = 52 },
    };
}
```

### Data source

For hierarchical data, use `HierarchicalTreeDataGridSource<Person>`. The key difference is `HierarchicalExpanderColumn`, which wraps an inner column and takes a second lambda that selects the children collection for each row:

```csharp
public class MainWindowViewModel
{
    private ObservableCollection<Person> _people = /* defined earlier */

    public MainWindowViewModel()
    {
        Source = new HierarchicalTreeDataGridSource<Person>(_people)
        {
            Columns =
            {
                new HierarchicalExpanderColumn<Person>(
                    new TextColumn<Person, string>("First Name", x => x.FirstName),
                    x => x.Children),
                new TextColumn<Person, string>("Last Name", x => x.LastName),
                new TextColumn<Person, int>("Age", x => x.Age),
            },
        };
    }

    public HierarchicalTreeDataGridSource<Person> Source { get; }
}
```

### Add the control

The XAML is identical to the flat example:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication.MainWindow">
  <TreeDataGrid Source="{Binding Source}"/>
</Window>
```

### Run the application

<Image light={HierarchicalTreeDataGrid} maxWidth={400} alignment="center" />

## Advanced usage

- [Column types](/controls/data-display/structured-data/treedatagrid/column-types)
- [Selection modes](/controls/data-display/structured-data/treedatagrid/selection-modes)
- [Expand and collapse operations](/controls/data-display/structured-data/treedatagrid/expand-and-collapse)
- [Sorting](/controls/data-display/structured-data/treedatagrid/sorting)
- [Filtering](/controls/data-display/structured-data/treedatagrid/filtering)

## See also

- [DataGrid](/controls/data-display/structured-data/datagrid/)
