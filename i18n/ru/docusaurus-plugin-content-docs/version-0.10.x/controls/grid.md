---
id: grid
title: Grid
---

import GridSampleScreenshot from '/img/controls/grid/grid_example.png';
import GridAsteriskScreenshot from '/img/controls/grid/grid_asterisk_example.png';
import GridAsteriskButtonsScreenshot from '/img/controls/grid/grid_asterisk_example_buttons.png';
import GridAutoButtonsScreenshot from '/img/controls/grid/grid_auto_example_buttons.png';
import GridVerboseSampleScreenshot from '/img/controls/grid/grid_example_verbose.png';

The `Grid` control is a `Panel` control useful for organizing other controls in columns and rows. `ColumnDefinition` and `RowDefinition` properties are used to define absolute, relative, or proportional row and column geometries for the grid. Each control in the grid will be placed using the `Grid.Column` and `Grid.Row` additional properties. It is also possible to have controls that span multiple rows and/or columns by using the `ColumnSpan` and `RowSpan` properties.

## Reference

[Grid](http://reference.avaloniaui.net/api/Avalonia.Controls/Grid/)

## Source code

[Grid.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Grid.cs)

## Examples

### Grid Using Properties and Spanning Columns

Below is an example that shows:

* Configuring the grid using the ColumnDefinition and GridDefinition properties directly
* How to assign the cell for a given component
* Showing effects of spanning rows/columns

An example of a Grid with 3 equal Rows and 3 Columns with \(1 fixed width\), \(2 grabbing the rest proportionally\) would be:

```markup
<Grid ColumnDefinitions="100,1.5*,4*" RowDefinitions="Auto,Auto,Auto"  Margin="4">
  <TextBlock Text="Col0Row0:" Grid.Row="0" Grid.Column="0"/>
  <TextBlock Text="Col0Row1:" Grid.Row="1" Grid.Column="0"/>
  <TextBlock Text="Col0Row2:" Grid.Row="2" Grid.Column="0"/>
  <CheckBox Content="Col2Row0" Grid.Row="0" Grid.Column="2"/>
  <Button Content="SpansCol1-2Row1-2" Grid.Row="1" Grid.Column="1" Grid.RowSpan="2" Grid.ColumnSpan="2"/>
</Grid>
```

In the above example we have two keywords: __*__ and **Auto**. Here is explanation for them:

* The **"Auto"** keyword is used to have the row or column geometry be determined by the containing control's definitions.
* The __*__ is used for denoting proportional spacing. 

The multiplier used in front of the proportional spacing value is used to figure out the relative size for the proportional columns. All proportional columns fit in the space left behind after all explicit values and "Auto" values are calculated. So for the above example the Column 1 will get 1.5 parts plus Column 2 will get 4 parts of the remainder of the space that Column 0 left. Lastly, the Button itself will fill in from the initial Cell 1,1 over one column and down one row because `Grid.RowSpan` and `Grid.ColumnSpan` are set to occupy two units instead of one.

<img className="center" src={GridSampleScreenshot} alt="Grid Using Properties and Spanning Columns" />

Here is another example showing the difference between those two.

First let's create sample 2x2 grid in our View, we can achieve this simply by writing code looking like this:

```markup
    <Grid ShowGridLines="True">
        <Grid.RowDefinitions>
            <RowDefinition Height="*"></RowDefinition>
            <RowDefinition Height="*"></RowDefinition>
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="*"></ColumnDefinition>
            <ColumnDefinition Width="*"></ColumnDefinition>
        </Grid.ColumnDefinitions>
    </Grid>
```

As you can see we created equal grid, I left `ShowGridLines` parameter set to `True` for better visibility.

<img className="center" src={GridAsteriskScreenshot} alt="Grid Using Asterisk Symbols" />

Now let's fill our grid with some elements, I will fill every field with button, you can use anything you want.

<img className="center" src={GridAsteriskButtonsScreenshot} alt="Grid Using Asterisk Symbols Filled With Buttons" />

Now our View code look's like this:

```markup
    <Grid ShowGridLines="True">
        <Grid.RowDefinitions>
            <RowDefinition Height="*"></RowDefinition>
            <RowDefinition Height="*"></RowDefinition>
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="*"></ColumnDefinition>
            <ColumnDefinition Width="*"></ColumnDefinition>
        </Grid.ColumnDefinitions>

        <Button Grid.Row="0" Grid.Column="0">Some text written on a button</Button>
        <Button Grid.Row="0" Grid.Column="1">Some text written on a button</Button>
        <Button Grid.Row="1" Grid.Column="0">Some text written on a button</Button>
        <Button Grid.Row="1" Grid.Column="1">Some text written on a button</Button>
    </Grid>
```

In this moment our **asterisk** symbols are forcing our grid to become equal, now let's see what will happen when we replace **asterisk** with the **Auto** keyword

<img className="center" src={GridAutoButtonsScreenshot} alt="Grid Using Auto Keyword" />

As you can see our grid become sticky to its content, it is very useful when we have components with variable `Height` property.

This new View code looks like this:

```markup
    <Grid ShowGridLines="True">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"></RowDefinition>
            <RowDefinition Height="Auto"></RowDefinition>
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="Auto"></ColumnDefinition>
            <ColumnDefinition Width="Auto"></ColumnDefinition>
        </Grid.ColumnDefinitions>

        <Button Grid.Row="0" Grid.Column="0">Some text written on a button</Button>
        <Button Grid.Row="0" Grid.Column="1">Some text written on a button</Button>
        <Button Grid.Row="1" Grid.Column="0">Some text written on a button</Button>
        <Button Grid.Row="1" Grid.Column="1">Some text written on a button</Button>
    </Grid>
```

### Using Verbose Row/Column Definitions

For more complex row and column definitions it's possible to explicitly use `Grid.ColumnDefinitions` and `Grid.RowDefinitions` XAML fields to provide access to these additional settings. The below code produces is exactly the same except for the fact we set the minimum width on the second column to be 300.

```markup
<Grid Margin="4">
  <Grid.ColumnDefinitions>
    <ColumnDefinition Width="100" />
    <ColumnDefinition Width="1.5*" MinWidth="300"/>
    <ColumnDefinition Width="4*"/>
  </Grid.ColumnDefinitions>
  <Grid.RowDefinitions>
    <RowDefinition Height="Auto"/>
    <RowDefinition Height="Auto"/>
    <RowDefinition Height="Auto"/>
  </Grid.RowDefinitions>
  <TextBlock Text="Col0Row0:" Grid.Row="0" Grid.Column="0"/>
  <TextBlock Text="Col0Row1:" Grid.Row="1" Grid.Column="0"/>
  <TextBlock Text="Col0Row2:" Grid.Row="2" Grid.Column="0"/>
  <CheckBox Content="Col2Row0" Grid.Row="0" Grid.Column="2"/>
  <Button Content="SpansCol1-2Row1-2" Grid.Row="1" Grid.Column="1" Grid.RowSpan="2" Grid.ColumnSpan="2"/>
</Grid>
```

<img className="center" src={GridVerboseSampleScreenshot} alt="Using Verbose Row/Column Definitions" />

### Common Properties

| Property | Description |
| :--- | :--- |
| `ColumnDefinitions` | A collection of `ColumnDefinition`s describing the width and max or min width of a column |
| `RowDefinitions` | A collection of `RowDefinition`s describing the height and max or min height of a row |
| `Grid.Column` | Attached property to assign a control into a zero based column |
| `Grid.Row` | Attached property to assign a control into a zero based row |
| `Grid.ColumnSpan` | Attached property to define the number of columns a control will span |
| `Grid.RowSpan` | Attached property to define the number of rows a control will span |
