---
description: REFERENCE - Built-in Controls
---

import HierarchicalTreeDataGridSourceScreenshot from '/img/reference/controls/detailed-reference/treedatagrid/treedatagrid-hierarchical.gif';

# Hierarchical Tree Data Grid

## Example

In this example the view model contains an observable collection that is filled with data and then used to create a `HierarchicalTreeDataGridSource` property to bind on to the source of the tree data grid. The items of the grid are class `Person`.

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

The data source also defines how to map the data model to rows and columns in the tree data grid. Because this example displays hierarchical data, the data source is using a `HierarchicalTreeDataGridSource<Person>` property on the view model.

There are three columns defined:

The first column is defined with a `HierarchicalExpanderColumn` surrounding. This element contains a `TextColumn` that takes a lambda to return the column value, and another that returns the children for the row. The column will display with a chevron button that expands or contracts the child rows (if any). The remaining columns are defined with `TextColumn` alone.

<img src={HierarchicalTreeDataGridSourceScreenshot} alt=""/>
