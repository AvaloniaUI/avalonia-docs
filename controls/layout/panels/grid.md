---
id: grid
title: Grid
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GridSharedSizeGroupScreenshot from '/img/controls/grid/grid-sharedsizegroup.png';

# Grid

The `Grid` control is useful for arranging child controls in columns and rows. You can define absolute, proportional, and 
autosized row and column geometries for the `Grid`.

Each child control in the `Grid` can be positioned in a `Grid` cell using column and row coordinates. These are 
zero-based, and both have a zero default.

If you position multiple child controls in the same cell, they will be drawn in that cell in the sequence they appear 
in the XAML. This is another strategy to implement layer stacking besides `Panel`.

:::warning
If you omit column and row coordinates for the child controls of a `Grid`, they will all be drawn in the top left 
corner (column=0, row=0).
:::

It is also possible to make a child control span more than one cell in either rows or columns, or both.

## Useful Properties

You will probably use these properties most often:

| Property               | Description                                                         |
|------------------------|---------------------------------------------------------------------|
| ColumnDefinitions      | Size definitions describing the widths of columns in the `Grid`.    |
| RowDefinitions         | Size definitions describing the heights of rows in the `Grid`.      |
| ShowGridLines          | Shows the gridlines between cells (as dashed lines).                |
| Grid.Column            | Lays out the control into the specified zero-based column.          |
| Grid.Row               | Lays out the control into the specified zero-based row.             |
| Grid.ColumnSpan        | Spans the control across 1 or more columns.                         |
| Grid.RowSpan           | Spans the control across 1 or more rows.                            |
| Grid.IsSharedSizeScope | Defines the control as the containing scope for a `SharedSizeGroup` |

## Size Definitions

You can define the size of rows and columns as:

* Absolute - sized in device-independent pixels (integer) 
* Proportional - sized in proportion to remaining `Grid` size
* Automatic - sized to fit the contained child control

Size definitions can be written either as a list of short codes, or fully expanded using XAML elements.

Full definitions support additional constraints such as `SharedSizeGroup` and specifying minimum and maximum lengths in 
absolute sizes.

### Absolute Size Definitions

Absolute size definitions are written as integers in the list format. For example:

`ColumnDefinitions="200, 200, 300"`

Using full expanded XAML, this is the same as:

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="300"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

### Proportional Size Definitions

Proportional size definitions are written as proportions of available `Grid` space using an 
asterisk. For example, to create two columns with the same width and then one with twice the width:

`ColumnDefinitions="*, *, 2*"`

Using full expanded XAML, this is the same as:

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="2*"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

:::tip
Size definitions do not support percentages. One trick to overcome this is to create a definition where all proportional 
values sum to 100 such as `<Grid ColumnDefinitions="25*, 25*, 50*">` for 3 columns with 25%, 25%, and 50% of the remaining 
available width.
:::

### Automatic Size Definitions

To size a row or column automatically to the largest child control in it, use the code 'Auto'.  For example:

`RowDefinitions="Auto, Auto, Auto"`

Using full expanded XAML, this is the same as:

```xml
<Grid>
   <Grid.RowDefinitions>
       <RowDefinition Height="Auto"></RowDefinition>
       <RowDefinition Height="Auto"></RowDefinition>
       <RowDefinition Height="Auto"></RowDefinition>
   </Grid.RowDefinitions>
</Grid>
```

:::warning
If a child control has its own explicitly set dimensions, these will be obeyed when it is drawn. This means that if it 
is larger than its grid cell, it will overlap adjacent cells.
:::

### Mixing Size Definitions

You can mix any of the above in the same size definition sequence. For example:

`ColumnDefinitions="200, *, 2*"`

Using full expanded XAML, this is the same as:

```xml
<Grid>
   <Grid.ColumnDefinitions>
       <ColumnDefinition Width="200"></ColumnDefinition>
       <ColumnDefinition Width="*"></ColumnDefinition>
       <ColumnDefinition Width="2*"></ColumnDefinition>
   </Grid.ColumnDefinitions>
</Grid>
```

## Drawing Rules

When calculating sizes, any proportional columns are made to fit in the space left after the absolute and automatic values have been calculated.

The calculation for automatic sizing is made using the outside of the margin layout zone of a child control.

:::info
To review the concept of control layout zones, see [here](/docs/concepts/layout/layout-zones). 
:::

Child controls are drawn in their assigned grid cells in the sequence they appear in the XAML. This rule governs both 
what happens when two child controls are assigned the same cell, and how child controls overlap when they are larger 
than their allotted cell.

When a child control has its own dimensions, and is smaller than its assigned cell, it will be drawn aligned in the 
cell according to its horizontal and vertical alignment properties (both are centered by default).

## Example

This example shows:

* How to use the shortened syntax for column and row definitions.
* How to mix absolute and proportional column widths.
* How to assign the cell for child controls.
* How to span rows and columns.

An example of a `Grid` with 3 equal Rows and 3 Columns with (1 fixed width), (2 grabbing the rest proportionally) would be:

Here, after the absolute width of 100 has been subtracted (for column 0), column 1 will get 1.5 parts and column 2 will get 4 parts of the remaining width.

The button is drawn to fill the span from the cell (column 1, row 1) plus one column (to the right) and one row down. The result looks like this:

<XamlPreview>

```xml
<Grid xmlns="https://github.com/avaloniaui"
      HorizontalAlignment="Center"
      VerticalAlignment="Center"
      RowSpacing="10"
      ColumnDefinitions="100,1.5*,4*" RowDefinitions="Auto,Auto,Auto"  Margin="4">
  <TextBlock Grid.Row="0" Grid.Column="0"
             Text="Col0Row0:" />
  <TextBlock Grid.Row="1" Grid.Column="0"
             Text="Col0Row1:" />
  <TextBlock Grid.Row="2" Grid.Column="0"
             Text="Col0Row2:" />
  <TextBlock Grid.Row="0" Grid.Column="2"
             Text="Col2Row0" />
  <Button Grid.Row="1" Grid.Column="1"
          Grid.RowSpan="2" Grid.ColumnSpan="2"
          HorizontalAlignment="Stretch"
          Content="SpansCol1-2Row1-2" />
</Grid>
```

</XamlPreview>

## SharedSizeGroup

`SharedSizeGroup` allows sharing size information for autosized row and column definitions across multiple `Grid` controls.

The following example demonstrates how `SharedSizeGroup` can be used to consistently size columns within a `ListBox` and outside.

<Tabs>
<TabItem value="xml" label="XML" default>

```xml
<StackPanel Grid.IsSharedSizeScope="True">
  <StackPanel.Styles>
    <Style Selector="ListBoxItem">
      <Setter Property="Padding" Value="0" />
    </Style>
  </StackPanel.Styles>

  <ListBox ItemsSource="{Binding People}">
    <ListBox.ItemTemplate>
      <DataTemplate>
        <Grid Name="myGrid" RowDefinitions="auto, auto" ShowGridLines="True">
          <Grid.ColumnDefinitions>
            <ColumnDefinition SharedSizeGroup="A" />
            <ColumnDefinition SharedSizeGroup="B" />
            <ColumnDefinition Width="*" />
            <ColumnDefinition SharedSizeGroup="C" />
          </Grid.ColumnDefinitions>

          <TextBlock Grid.Column="0" Margin="6,0" Text="{Binding FirstName}" />
          <TextBlock Grid.Column="1" Margin="6,0" Text="{Binding LastName}" />
          <TextBlock Grid.Column="2" Margin="6,0" Text="{Binding Age}" />
          <TextBlock Grid.Column="3" Margin="6,0" Text="{Binding Occupation}" />
        </Grid>
      </DataTemplate>
    </ListBox.ItemTemplate>
  </ListBox>
    
  <!-- Controls may appear in-between Grids with SharedSizeGroups -->
  <Separator />

  <Grid>
    <Grid.ColumnDefinitions>
      <ColumnDefinition SharedSizeGroup="A" />
      <ColumnDefinition SharedSizeGroup="B" />
      <ColumnDefinition Width="*" />
      <ColumnDefinition SharedSizeGroup="C" />
    </Grid.ColumnDefinitions>

    <Button Content="This is the First Name" HorizontalAlignment="Stretch" Grid.Column="0" />
    <Button Content="Last" HorizontalAlignment="Stretch" Grid.Column="1" />
    <Button Content="Age" HorizontalAlignment="Stretch" Grid.Column="2" />
    <Button Content="Occupation" HorizontalAlignment="Stretch" Grid.Column="3" />
  </Grid>

</StackPanel>
```

</TabItem>
<TabItem value="example" label="C#">

```csharp
public record Person(string FirstName, string LastName, int Age, string Occupation);

public partial class MainWindowViewModel : ViewModelBase
{
    public ObservableCollection<Person> People { get; } = new()
    {
        new("Jim", "Smith", 35, "Printed Circuit Board Drafter"),
        new("Charlotte", "O'Shaughnessy-Alejandro", 30, "Librarian"),
        new("Ryan", "Cullen", 40, "Ceramics Instructor"),
        new("Valentina", "Levine", 38, "Oceanologist")
    };
}
```

</TabItem>
</Tabs>

<img src={GridSharedSizeGroupScreenshot} alt="" />

Notice how each column is sized: the first column is sized by the `Button`, the second and fourth are sized 
by the `ListBox` content, and the third takes the remaining space.

## Defining a grid in code

The following example demonstrates how to build a UI similar to that found on the Run dialog available on the Windows Start menu.

<img className="center" src={GridSampleScreenshot} alt="Grid Example App" />

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Grid Background="Gainsboro" 
      HorizontalAlignment="Left" 
      VerticalAlignment="Top" 
      Width="425" 
      Height="165"
      ColumnDefinitions="Auto,*,*,*,*"
      RowDefinitions="Auto,Auto,*,Auto">
    
    <Image Grid.Row="0" Grid.Column="0" Source="{Binding runicon}" />
    
    <TextBlock Grid.Row="0" Grid.Column="1" Grid.ColumnSpan="4" 
               Text="Type the name of a program, folder, document, or Internet resource, and Windows will open it for you." 
               TextWrapping="Wrap" />
               
    <TextBlock Grid.Row="1" Grid.Column="0" Text="Open:" />
    
    <TextBox Grid.Row="1" Grid.Column="1" Grid.ColumnSpan="5" />
    
    <Button Grid.Row="3" Grid.Column="2" Content="OK" Margin="10,0,10,15" />
    
    <Button Grid.Row="3" Grid.Column="3" Content="Cancel" Margin="10,0,10,15" />
    
    <Button Grid.Row="3" Grid.Column="4" Content="Browse ..." Margin="10,0,10,15" />
</Grid>

```

</TabItem>
<TabItem value="cs">

```cs
// Create the Grid.
grid1 = new Grid ();
grid1.Background = Brushes.Gainsboro;
grid1.HorizontalAlignment = HorizontalAlignment.Left;
grid1.VerticalAlignment = VerticalAlignment.Top;
grid1.ShowGridLines = true;
grid1.Width = 425;
grid1.Height = 165;

// Define the Columns.
colDef1 = new ColumnDefinition();
colDef1.Width = new GridLength(1, GridUnitType.Auto);
colDef2 = new ColumnDefinition();
colDef2.Width = new GridLength(1, GridUnitType.Star);
colDef3 = new ColumnDefinition();
colDef3.Width = new GridLength(1, GridUnitType.Star);
colDef4 = new ColumnDefinition();
colDef4.Width = new GridLength(1, GridUnitType.Star);
colDef5 = new ColumnDefinition();
colDef5.Width = new GridLength(1, GridUnitType.Star);
grid1.ColumnDefinitions.Add(colDef1);
grid1.ColumnDefinitions.Add(colDef2);
grid1.ColumnDefinitions.Add(colDef3);
grid1.ColumnDefinitions.Add(colDef4);
grid1.ColumnDefinitions.Add(colDef5);

// Define the Rows.
rowDef1 = new RowDefinition();
rowDef1.Height = new GridLength(1, GridUnitType.Auto);
rowDef2 = new RowDefinition();
rowDef2.Height = new GridLength(1, GridUnitType.Auto);
rowDef3 = new RowDefinition();
rowDef3.Height = new GridLength(1, GridUnitType.Star);
rowDef4 = new RowDefinition();
rowDef4.Height = new GridLength(1, GridUnitType.Auto);
grid1.RowDefinitions.Add(rowDef1);
grid1.RowDefinitions.Add(rowDef2);
grid1.RowDefinitions.Add(rowDef3);
grid1.RowDefinitions.Add(rowDef4);

// Add the Image.
img1 = new Image();
img1.Source = runicon;
Grid.SetRow(img1, 0);
Grid.SetColumn(img1, 0);

// Add the main application dialog.
txt1 = new TextBlock();
txt1.Text = "Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.";
txt1.TextWrapping = TextWrapping.Wrap;
Grid.SetColumnSpan(txt1, 4);
Grid.SetRow(txt1, 0);
Grid.SetColumn(txt1, 1);

// Add the second text cell to the Grid.
txt2 = new TextBlock();
txt2.Text = "Open:";
Grid.SetRow(txt2, 1);
Grid.SetColumn(txt2, 0);

// Add the TextBox control.
tb1 = new TextBox();
Grid.SetRow(tb1, 1);
Grid.SetColumn(tb1, 1);
Grid.SetColumnSpan(tb1, 5);

// Add the buttons.
button1 = new Button();
button2 = new Button();
button3 = new Button();
button1.Content = "OK";
button2.Content = "Cancel";
button3.Content = "Browse ...";
Grid.SetRow(button1, 3);
Grid.SetColumn(button1, 2);
button1.Margin = new Thickness(10, 0, 10, 15);
button2.Margin = new Thickness(10, 0, 10, 15);
button3.Margin = new Thickness(10, 0, 10, 15);
Grid.SetRow(button2, 3);
Grid.SetColumn(button2, 3);
Grid.SetRow(button3, 3);
Grid.SetColumn(button3, 4);

grid1.Children.Add(img1);
grid1.Children.Add(txt1);
grid1.Children.Add(txt2);
grid1.Children.Add(tb1);
grid1.Children.Add(button1);
grid1.Children.Add(button2);
grid1.Children.Add(button3);
```
</TabItem>  

</Tabs>

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Grid).
:::

:::info
View the source code on _GitHub_ [`Grid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Grid.cs)
:::
