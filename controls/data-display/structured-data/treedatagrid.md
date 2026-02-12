---
id: treedatagrid
title: TreeDataGrid
---

import Pill from '/src/components/global/Pill';
import TreeDataGridNuGetScreenshot from '/img/controls/treedatagrid/treedataggrid-nuget.png';
import FlatTreeDataGridSourceScreenshot from '/img/controls/treedatagrid/treedatagrid-flat.gif';
import HierarchicalTreeDataGridSourceScreenshot from '/img/controls/treedatagrid/treedatagrid-hierarchical.gif';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

:::warning
`TreeDataGrid` is maintained as part of Avalonia Accelerate as of October 2025.
:::

The `TreeDataGrid` displays hierarchical and tabular data together in a single view. It is a combination of a tree view and data grid.

The control has two modes of operation:

* _Hierarchical -_ data is displayed in a tree with optional columns
* _Flat -_ data is displayed in a two dimensional table, similar to the data grid control

## Useful Properties

You will probably use these properties most often:

| Property               | Description                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `Source`               | The bound collection that is used as the data source for the control.                         |
| `CanUserResizeColumns` | Indicates whether the user can adjust column widths using the pointer. (Default is false.)    |
| `CanUserSortColumns`   | Indicates whether the user can sort columns by clicking the column header. (Default is true.) |

## Source

You will use the `Source` property to bind to a view model that is defined in code. The view model  includes the definition of how the columns map to the properties of the class that holds the grid items.


## Hierarchical Data

In this example the view model contains an observable collection that is filled with data and then used to create a `HierarchicalTreeDataGridSource` property to bind on to the source of the tree data grid. The items of the grid are class `Person`.

```xml
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

The data source also defines how to map the data model to rows and columns in the tree data grid. Because this example displays hierarchical data, the data source is using a `HierarchicalTreeDataGridSource<Person>` property on the view model.

There are three columns defined:

The first column is defined with a `HierarchicalExpanderColumn` surrounding. This element contains a `TextColumn` that takes a lambda to return the column value, and another that returns the children for the row. The column will display with a chevron button that expands or contracts the child rows (if any). The remaining columns are defined with `TextColumn` alone.

<img src={HierarchicalTreeDataGridSourceScreenshot} alt=""/>

## Flat Data

In this example the view model contains an observable collection that is filled with data and then used to create a `FlatTreeDataGridSource` property to bind to the source of the tree data grid. The items of the grid are class `Person`.

```xml
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

The data source also defines how to map the data model to rows and columns in the tree data grid. Because this example displays flat data, the data source is using a `FlatTreeDataGridSource<Person>` property on the view model.

There are three columns defined with the `TextColumn` class. Each takes a lambda to return the column value.

<img src={FlatTreeDataGridSourceScreenshot} alt=""/>

## NuGet Package Reference

You must install the _NuGet_ package for the data grid, there are several ways of doing this. You can use **Manage NuGet Packages** from the project menu of your IDE:

<img src={TreeDataGridNuGetScreenshot} alt=""/>
Alternatively,  you can run this instruction from the command line:

```bash
dotnet add package Avalonia.Controls.TreeDataGrid
```

Or add package reference directly to the project (`.csproj`) file:

```xml
<PackageReference Include="Avalonia.Controls.TreeDataGrid" Version="11.0.0" />
```

:::warning
Note you must always install the data grid version that matches the _Avalonia UI_ version you are using.
:::

## Include Data Grid Styles

You must reference the data grid themes to include the additional styles that the tree data grid uses. You can do this by adding a `<StyleInclude>` element to the application (`App.axaml` file).

For example:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme/>
    <StyleInclude 
        Source="avares://Avalonia.Controls.TreeDataGrid/Themes/Fluent.axaml"/>
  </Application.Styles>
</Application>
```

## Column types

The tree data grid supports three different column types:

* Text Column
* Hierarchical Expander Column
* Template Column

### Text Column

A text column (class `TextColumn`) is useful when you want the cells in a column to have text values. A text column is created like this:

```csharp
new TextColumn<ItemClass, string>("Column Header", x => x.Property)
```

The first generic parameter here is the class of the items that make up the grid rows. The second generic parameter here is the type of the property.

![](https://user-images.githubusercontent.com/53405089/157456551-dd394781-903a-4c7b-8874-e631e21534a1.png)

The above is the signature of the `TextColumn` constructor. The first two parameters are required: the first is the column header, and the second is an expression to get the value of the property.

The `TextColumn` class implements the column interface `IColumn`.

### Hierarchical Expander Column

A hierarchical expander column (class: `HierarchicalExpanderColumn`) can only be used with the _hierarchical_ data mode of operation, and it must be used with the data source class `HierarchicalTreeDataGridSource`. This column type must contain an inner column (interface `IColumn`) to define its header and value property. A hierarchical expander column displays the expand and contract chevron buttons in a hierarchical tree data grid.

This column type is created like this:

```csharp
new HierarchicalExpanderColumn<ItemClass>(
    new TextColumn<ItemClass, string>("Column Header", x => x.Property), 
    x => x.Children)
```

The generic parameter is the class of the items that make up the grid rows. This is the same as the item class for the inner column.

![](https://user-images.githubusercontent.com/53405089/157536079-fd14f1ed-0a7d-438a-abba-fd56766709a9.png)

The above is the signature of the `HierarchicalExpanderColumn` constructor. The first parameter in the constructor is the inner column, and the second parameter is a (nullable) selector for any child elements.

### Template Column

The template column (class `TemplateColumn`) is a fully customizable way for you to create a column. It essentially forms a **data template** for the column.

You create a template column like this:

```csharp
new TemplateColumn<ItemClass>("Column Header",
       new FuncDataTemplate<T>((a,e) => new SomeControl()))
```

![](https://user-images.githubusercontent.com/53405089/157664231-8653bce9-f8d6-4fbc-8e78-e3ff93f1ace2.png)

The above is the signature of the `TemplateColumn`constructor.  It has two required parameters: the first is the column header, and the second is a function that returns `IDataTemplate`.

:::info
For more information about the concept of creating a **data template** in code, see [here](/concepts/data-concepts/data-templates).
:::

## More Information

:::info
View the source code on GitHub [TreeDataGrid.cs](https://github.com/AvaloniaUI/Avalonia.Controls.TreeDataGrid)
:::

The next page shows an example of creating a flat tree data grid with columns.