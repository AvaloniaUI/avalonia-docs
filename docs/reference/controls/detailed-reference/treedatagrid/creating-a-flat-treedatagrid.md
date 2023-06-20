---
description: REFERENCE - Built-in Controls
---

# Flat Tree Data Grid

## Example

In this example the view model contains an observable collection that is filled with data and then used to create a `FlatTreeDataGridSource` property to bind to the source of the tree data grid. The items of the grid are class `Person`.&#x20;



```
<TreeDataGrid Source="{Binding PersonSource}"/>
```


{% tab title="C# View Model" %}
```csharp
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
                new Person ("Eleanor", "Pope", 32 ),
                new Person ("Jeremy", "Navarro", 74 ),
                new Person ( "Lailah ", "Velazquez", 16 ),
                new Person ( "Jazmine", "Schroeder", 52 ),
            };
                          
            PersonSource = new HierarchicalTreeDataGridSource<Person>(_people)
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


{% tab title="C# Item Class" %}
```csharp
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



The data source also defines how to map the data model to rows and columns in the tree data grid. Because this example displays flat data, the data source is using a `FlatTreeDataGridSource<Person>` property on the view model.&#x20;

There are three columns defined with the `TextColumn` class. Each takes a lambda to return the column value.

<!--figure><img src="../../../../.gitbook/assets/treedatagrid2.gif" alt=""><figcaption></figcaption></figure-->
