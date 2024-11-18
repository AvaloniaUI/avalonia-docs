---
description: REFERENCE - Built-in Controls
---

import DataGridColumnPreviewScreenshot from '/img/reference/controls/datagrid/datagridtextcolumn.png';

# Data Grid Columns

A data grid can contain multiple data grid columns and _Avalonia UI_ has two built-in column types which can be used to display a different data types, and a template type that can customise the column appearance.

| Column Type              | Description                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DataGridTextColumn`     | Presents a text box for display and editing of the column data. You can control font properties like family and size in this column type.                                 |
| `DataGridCheckBoxColumn` | Presents a check box for display and editing of the column data, when it is Boolean. This column type also supports the three-state check box when the value is nullable. |
| `DataGridTemplateColumn` | Can be used to customise the presentation of column data, for both display and editing.                                                                                   |

## Useful Properties

Most of these properties are common to all three column types:

| Property         | Description                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `Header`         | The header content of the column.                                                                                                               |
| `HeaderTemplate` | Uses a data template for the column.                                                                                                            |
| `IsReadOnly`     | Whether the column is read-only. If the data grid itself is read-only, then the column is also read-only, whatever the value of this  property. |
| `IsThreeState`   | Check box column only. Enables the third (filled) state when a nullable Boolean value is null.                                                  |
| `Width`          | The column width can be given in absolute or relative size (see below).                                                                         |

## Column Width

If you do not set the width for a column, it will be resized to fit the contents, and a horizontal scrollbar will be added to the grid if necessary.

You can set the width of a column absolutely, for example:

```xml
<DataGridTextColumn Width="200" />
```

This will cause the column content that does not fit to be hidden.

Alternatively, you can specify relative automatic sizes. This uses \* to represent an equal division of the available width, and then multiples like 2\*.  Any columns without a width specified are sized to their content.

For example to divide a data grid into 3 equal columns:

```xml
<DataGridTextColumn Width="*" />
<DataGridTextColumn Width="*" />
<DataGridTextColumn Width="*" />
```

Example

This example improves a data grid by expanding two columns equally across the width:

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
      <DataGridTextColumn Header="First Name" Width="*" 
              Binding="{Binding FirstName}"/>
      <DataGridTextColumn Header="Last Name" Width="*" 
              Binding="{Binding LastName}" />
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

It works in the preview pane because the `<Design.DataContext>` element creates a view model to bind to:

<img src={DataGridColumnPreviewScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about the data grid text column, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridTextColumn/).
:::

:::info
For the complete API documentation about data grid check box column, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridCheckBoxColumn/).
:::

:::info
View the source code on _GitHub_ [`DataGridTextColumn.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridTextColumn.cs)
:::

:::info
View the source code on _GitHub_ [`DataGridCheckBoxColumn.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridCheckBoxColumn.cs)
:::
