# DataGrid

The `DataGrid` control is a control that displays data in a customizable grid.

## Reference

[DataGrid](http://reference.avaloniaui.net/api/Avalonia.Controls/DataGrid/)

## Source code

[DataGrid.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.DataGrid/DataGrid.cs)

## Reference required nuget package

To start using [DataGrid](https://www.nuget.org/packages/Avalonia.Controls.DataGrid/), you need to reference it in your project first.
You can run "dotnet add package" from the command line:
```bash
dotnet add package Avalonia.Controls.DataGrid
```
Or add package reference directly to the csproj file:
```xml
<PackageReference Include="Avalonia.Controls.DataGrid" Version="0.10.16" />
```

Note, that version should match Avalonia version you are using.

## Add required styles to App.axaml

The Themes can be changed to light or dark to fit your application theme.

```markup
<Application.Styles>
    <StyleInclude Source="avares://Avalonia.Themes.Default/DefaultTheme.xaml"/>
    <StyleInclude Source="avares://Avalonia.Themes.Default/Accents/BaseLight.xaml"/>
    <StyleInclude Source="avares://Avalonia.Controls.DataGrid/Themes/Default.xaml"/>
</Application.Styles>
```

Or if you are using new Fluent theme, you will need to include styles created specifically for that:

```markup
<Application.Styles>
    <FluentTheme Mode="Light" />
    <StyleInclude Source="avares://Avalonia.Controls.DataGrid/Themes/Fluent.xaml"/>
</Application.Styles>
```

## Examples

### Basic DataGrid

This will generate a DataGrid with column header names. FirstName and LastName.

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <Grid>
        <DataGrid Name="MyDataGrid" Items="{Binding People}" >
        </DataGrid>
    </Grid>
</Window>
```

```csharp
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
```

### Custom headers

The DataGrid uses the same class Person as before, but now with custom column header name. Forename and Surname.

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <Grid>
        <DataGrid Name="MyDataGrid" Items="{Binding People}" AutoGenerateColumns="False" >
            <DataGrid.Columns>
                <DataGridTextColumn Header="Forename"  Binding="{Binding FirstName}"/>
                <DataGridTextColumn Header="Surname" Binding="{Binding LastName}" />
            </DataGrid.Columns>
        </DataGrid>
    </Grid>
</Window>
```

### Common Properties

| Property | Description |
| :--- | :--- |
| `AutoGenerateColumns` | Control if the columns should be automatically generate for display in UI from the bounded data source. |
| `Items` | Gets or sets a collection that is used to generate the content of the control. |
| `CanUserReorderColumns` | Indicates whether the user can change the column display order by dragging column headers with the mouse. |
| `CanUserResizeColumns` | Indicates whether the user can adjust column widths using the mouse. |
| `CanUserSortColumns` | Indicates whether the user can sort columns by clicking the column header. |
