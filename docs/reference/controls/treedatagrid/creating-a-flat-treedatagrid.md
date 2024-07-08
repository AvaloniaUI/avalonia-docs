---
description: REFERENCE - Built-in Controls
---

import FlatTreeDataGridSourceScreenshot from '/img/reference/controls/detailed-reference/treedatagrid/treedatagrid-flat.gif';

# Flat Tree Data Grid

## Example

In this example the view model contains an observable collection that is filled with data and then used to create a `FlatTreeDataGridSource` property to bind to the source of the tree data grid. The items of the grid are class `Person`.

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

The data source also defines how to map the data model to rows and columns in the tree data grid. Because this example displays flat data, the data source is using a `FlatTreeDataGridSource<Person>` property on the view model.

There are three columns defined with the `TextColumn` class. Each takes a lambda to return the column value.

<img src={FlatTreeDataGridSourceScreenshot} alt=""/>
