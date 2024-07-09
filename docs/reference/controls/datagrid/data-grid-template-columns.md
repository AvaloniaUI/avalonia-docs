---
title: DataGridTemplateColumn
description: REFERENCE - Built-in Controls
---

# DataGridTemplateColumn

You can use this column type to customise the display and editing for a data grid column.

There are two data templates which you define as attached properties:

<table><thead><tr><th width="269">Data Template</th><th>Description</th></tr></thead><tbody><tr><td><code>CellTemplate</code> </td><td>The display (not being edited) presentation of the column value. </td></tr><tr><td><code>CellEditingTemplate</code> </td><td>The editing template for the column value.</td></tr></tbody></table>

:::info
If you do not set a editing template, the column will stay read-only.
:::

## Example

This example adds a numeric up-down control when the age property for a person is being edited:



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



<img src='/img/gitbook-import/assets/grid4.gif' alt=''/>

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridTemplateColumn/).
:::

:::info
View the source code on _GitHub_ [`DataGridTemplateColumn.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridTemplateColumn.cs)
:::
