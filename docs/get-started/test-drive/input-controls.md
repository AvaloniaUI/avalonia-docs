---
id: input-controls
title: Input Controls
---

import InputControlsScreenshot from '/img/get-started/test-drive/input-controls.png';

On this page, you will learn how to add some of the Avalonia input controls in a neat layout. The aim is to add a numerical inputs with their associated labels in horizontal rows; with an output control in the row below. 

To achieve this layout, you will use the built-in grid control, and locate label and input controls in its cells.

This picture shows the resulting layout (running) with the gridlines showing. The gridlines are showing for the purpose of visualizing the layout - you would not usually do this on a production UI.

<img className="center" src={InputControlsScreenshot} alt="" />

To create a layout using the grid control, follow this procedure:

- Stop the app if it is running.
- Locate the middle stack panel in the XAML, and delete the tag.
- Insert a `<Grid>` tag as shown:

```xml
<Grid ShowGridLines="True" Margin="5"
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">  
</Grid>
```

This sets out the column and row sizes for the grid (and makes the gridlines visible - although it will show as just a straight line now, as the grid is still empty).

Now add label and input controls to the cells of the grid:

- Add `<Label>` and `<TextBox>` (text input) controls as shown:

```xml
<Grid ShowGridLines="True" Margin="5"
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
   <Label Grid.Row="0" Grid.Column="0">Celsius</Label>
   <TextBox Grid.Row="0" Grid.Column="1"/>
   <Label Grid.Row="1" Grid.Column="0">Fahrenheit</Label>
   <TextBox Grid.Row="1"  Grid.Column="1"/>
</Grid>
```

Finally, you can tidy up the alignment of the controls in the grid using their margin property. Also move the button into the grid, as follows:

- Modify the XAML as shown:

```xml
<Grid ShowGridLines="True"  Margin="5" 
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
     <Label Grid.Row="0" Grid.Column="0" Margin="10">Celsius</Label>
     <TextBox Grid.Row="0" Grid.Column="1" Margin="0 5" Text="0"/>
     <Label Grid.Row="1" Grid.Column="0" Margin="10">Fahrenheit</Label>
     <TextBox Grid.Row="1"  Grid.Column="1" Margin="0 5" Text="0"/>
     <Button Grid.Row="2" Grid.Column="1" Margin="0 5">Calculate</Button>
</Grid>
```

- Run the app to see the result



:::info
For full information about the complete range of Avalonia built-in controls, and their attributes, see the reference section [here](../../reference/controls/).
:::

On the next page, you will see how to improve your design-time experience by adjusting the size window when it is shown in the preview pane.
