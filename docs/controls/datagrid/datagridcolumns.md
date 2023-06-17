---
id: datagridcolumns
title: DataGridColumns
---

## Overview

Every [.](./ "mention") can hold multiple `DataGridColumns`. Avalonia has several build-in `DataGridColumns`, which can be used to display a certain data type with a certain appearance.&#x20;

### Build-in DataGridColumns

* [DataGridTextColumn](datagridcolumns.md#datagridtextcolumn)
* [DataGridCheckBoxColumn](datagridcolumns.md#datagridcheckboxcolumn)
* [DataGridTemplateColumn](datagridcolumns.md#datagridtemplatecolumn)

### Common Properties for all DataGridColumns

| Property       | Description                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header         | Gets or sets the header content of the column                                                                                                      |
| HeaderTemplate | Gets or sets a data template for the column (see: [datatemplates.md](../../../misc/wpf/datatemplates.md "mention"))                                |
| IsReadOnly     | Gets or sets if the column is read-only. If the owning grid is read-only, then the column is also read-only, even if this property is set to true. |

## DataGridTextColumn

This column is used to display text data, normally represented by a `string`. In the normal state the text is displayed in a `TextBlock`. If the user edits the current cell, a `TextBox` will be shown. This column has some properties which can be used to control the appearance like `FontSize` and `FontFamily`.

### Example

```markup
<DataGrid Name="MyDataGrid" Items="{Binding People}" AutoGenerateColumns="False" >
    <DataGrid.Columns>
        <DataGridTextColumn Header="Forename" Binding="{Binding FirstName}"/>
        <DataGridTextColumn Header="Surname" Binding="{Binding LastName}" />
    </DataGrid.Columns>
</DataGrid>
```

### API Reference

[DataGridTextColumn](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridTextColumn/)

### Source code

[DataGridTextColumn.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridTextColumn.cs)

## DataGridCheckBoxColumn

This column is used to represent a `bool` value. The  value is represented by a `CheckBox`, which is disabled in the normal state and enabled in the editing state of the `DataGridCell`. If needed you can enable the indeterminate state by setting the property `IsThreeState` to true.

### Example

```markup
<DataGrid Name="MyDataGrid" Items="{Binding ToDoListItems}" AutoGenerateColumns="False" >
    <DataGrid.Columns>
        <DataGridCheckBoxColumn Header="✔" Binding="{Binding IsChecked}"/>
        <DataGridTextColumn Header="ToDo" Binding="{Binding Content}" />
    </DataGrid.Columns>
</DataGrid>
```

### API Reference

[DataGridCheckBoxColumn](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridCheckBoxColumn/)

### Source code

[DataGridCheckBoxColumn.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridCheckBoxColumn.cs)

## DataGridTemplateColumn

This column is used to display any content you like. There  are two [datatemplates.md](../../../misc/wpf/datatemplates.md "mention") which you can define, the `CellTemplate` for the normal state and the `CellEditingTemplate` for the editing state of the current `DataGridCell`.&#x20;

:::info
The DataGridTemplateColumn is editable from Avalonia version 0.10.12 onward. If you do not set a `CellEditingTemplate`, the column will stay read-only.
:::

### Example

```markup
<DataGrid Name="MyDataGrid"
          xmlns:model="using:MyApp.Models"  >
  <DataGrid.Columns>
    <DataGridTextColumn Header="First Name" Binding="{Binding FirstName}" Width="2*" FontSize="{Binding #FontSizeSlider.Value, Mode=OneWay}" />
    <DataGridTextColumn Header="Last Name" Binding="{Binding LastName}" Width="2*" FontSize="{Binding #FontSizeSlider.Value, Mode=OneWay}" />
    <DataGridTemplateColumn Header="Age">
      <DataGridTemplateColumn.CellTemplate>
        <DataTemplate DataType="model:Person">
          <TextBlock Text="{Binding Age, StringFormat='{}{0} years'}" VerticalAlignment="Center" HorizontalAlignment="Center" />
        </DataTemplate>
      </DataGridTemplateColumn.CellTemplate>
      <DataGridTemplateColumn.CellEditingTemplate>
        <DataTemplate DataType="model:Person">
          <NumericUpDown Value="{Binding Age}" FormatString="N0" HorizontalAlignment="Stretch" Minimum="0" Maximum="120"  />
        </DataTemplate>
      </DataGridTemplateColumn.CellEditingTemplate>
    </DataGridTemplateColumn>
  </DataGrid.Columns>
</DataGrid>
```

### API Reference

[DataGridTemplateColumn](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGridTemplateColumn/)

### Source code

[DataGridTemplateColumn.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGridTemplateColumn.cs)