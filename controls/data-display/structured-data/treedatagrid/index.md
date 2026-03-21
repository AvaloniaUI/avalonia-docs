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

:::tip[Upgrading from v11?]
TreeDataGrid v12 introduces significant API changes including renamed column types, a new XAML-first workflow, and a fluent code-behind API. See the [breaking changes document](/controls/data-display/structured-data/treedatagrid/breaking-changes-v12) for full migration guidance.
:::

## Installation

See the [Installation Guide](/tools/installing-accelerate) for full instructions on installing Accelerate components.

Add the `TreeDataGrid` package to your project. While v12 is in preview, you need to include the `--prerelease` flag:

```bash
dotnet add package Avalonia.Controls.TreeDataGrid --prerelease
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
| `ItemsSource`          | Binds to a collection for XAML-defined columns.                                               |
| `Source`               | The data source that drives the control's rows and columns (code-behind approach).            |
| `SelectionMode`        | The selection mode, e.g. `Row`, `Cell`, `Row,Multiple`. Default is `Row` (single selection).  |
| `CanUserResizeColumns` | Whether the user can adjust column widths with the pointer. Default is `false`.               |
| `CanUserSortColumns`   | Whether the user can sort columns by clicking the header. Default is `true`.                  |

### Two approaches

There are two ways to set up a `TreeDataGrid`:

- **XAML columns** — set `ItemsSource` and define columns directly in XAML markup. This is the simplest approach and familiar to XAML developers.
- **Code-behind source** — create a `FlatTreeDataGridSource` or `HierarchicalTreeDataGridSource` in your view model using the fluent API, and bind it to the `Source` property. This approach is required for features like filtering and programmatic expand/collapse.

Both approaches are shown in the examples below.

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

public class MainWindowViewModel
{
    public ObservableCollection<Person> People { get; } = new()
    {
        new Person { FirstName = "Eleanor", LastName = "Pope", Age = 32 },
        new Person { FirstName = "Jeremy", LastName = "Navarro", Age = 74 },
        new Person { FirstName = "Lailah ", LastName = "Velazquez", Age = 16 },
        new Person { FirstName = "Jazmine", LastName = "Schroeder", Age = 52 },
    };
}
```

### XAML columns

Define columns directly in the `TreeDataGrid` markup using `ItemsSource`:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication.MainWindow">
  <TreeDataGrid ItemsSource="{Binding People}">
    <TreeDataGridTextColumn Header="First Name" Binding="{Binding FirstName}" />
    <TreeDataGridTextColumn Header="Last Name" Binding="{Binding LastName}" />
    <TreeDataGridTextColumn Header="Age" Binding="{Binding Age}" />
  </TreeDataGrid>
</Window>
```

### Code-behind source

Alternatively, create a `FlatTreeDataGridSource<T>` in your view model using the fluent API and bind it to the `Source` property:

```csharp
using System.Collections.ObjectModel;
using Avalonia.Controls;

public class MainWindowViewModel
{
    private ObservableCollection<Person> _people = new()
    {
        new Person { FirstName = "Eleanor", LastName = "Pope", Age = 32 },
        new Person { FirstName = "Jeremy", LastName = "Navarro", Age = 74 },
        new Person { FirstName = "Lailah ", LastName = "Velazquez", Age = 16 },
        new Person { FirstName = "Jazmine", LastName = "Schroeder", Age = 52 },
    };

    public MainWindowViewModel()
    {
        Source = new FlatTreeDataGridSource<Person>(_people)
            .WithTextColumn("First Name", x => x.FirstName)
            .WithTextColumn("Last Name", x => x.LastName)
            .WithTextColumn(x => x.Age);
    }

    public FlatTreeDataGridSource<Person> Source { get; }
}
```

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

public class MainWindowViewModel
{
    public ObservableCollection<Person> People { get; } = new()
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

### XAML columns

Use `TreeDataGridHierarchicalExpanderColumn` to wrap the column that should display the tree expander. The `ChildrenBinding` attribute specifies how to find child items:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication.MainWindow">
  <TreeDataGrid ItemsSource="{Binding People}">
    <TreeDataGridHierarchicalExpanderColumn Header="First Name"
                                            ChildrenBinding="{Binding Children}">
      <TreeDataGridTextColumn Binding="{Binding FirstName}" />
    </TreeDataGridHierarchicalExpanderColumn>
    <TreeDataGridTextColumn Header="Last Name" Binding="{Binding LastName}" />
    <TreeDataGridTextColumn Header="Age" Binding="{Binding Age}" />
  </TreeDataGrid>
</Window>
```

### Code-behind source

For the code-behind approach, use `HierarchicalTreeDataGridSource<T>` with the `WithHierarchicalExpanderTextColumn` fluent method:

```csharp
using System.Collections.ObjectModel;
using Avalonia.Controls;

public class MainWindowViewModel
{
    private ObservableCollection<Person> _people = /* defined earlier */

    public MainWindowViewModel()
    {
        Source = new HierarchicalTreeDataGridSource<Person>(_people)
            .WithHierarchicalExpanderTextColumn(
                "First Name",
                x => x.FirstName,
                x => x.Children)
            .WithTextColumn("Last Name", x => x.LastName)
            .WithTextColumn(x => x.Age);
    }

    public HierarchicalTreeDataGridSource<Person> Source { get; }
}
```

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
