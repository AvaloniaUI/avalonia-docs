---
id: adding-some-layout
title: Adding some layout
---

import TemperatureConverterTextOnly from '/img/get-started/temperature-converter-text-only.png';
import TemperatureConverterBlueBorder from '/img/get-started/temperature-converter-blue-border.png';
import TemperatureConverterEmptyGrid from '/img/get-started/temperature-converter-empty-grid.png';
import TemperatureConverterFilledGrid from '/img/get-started/temperature-converter-filled-grid.png';

# Adding some layout

At this point, your temperature converter app has a single button in the center of the window. You cannot add any more elements, because each Avalonia window allows only one control in its content zone. (More on layout zones later, on the next page: [Customizing the Avalonia window](/docs/get-started/starter-tutorial/customizing-the-avalonia-window).)

To place multiple UI elements in the window, you must use a **layout control.**

For more information on layout controls, see the [Layout controls page](/docs/reference/controls/layout-controls).

## Inserting a stack panel

We can use the `StackPanel` layout control to place some text above the button.

1. In the file **MainWindow.axaml**, enclose your `Button` with a `<StackPanel>...</StackPanel>` tag.

```xml
<StackPanel>
	<Button>Calculate</Button>
</StackPanel>
```

2. Add a `TextBlock` above the Button. (You may recall the `TextBlock` tag from the default **MainWindow.axaml**—this control prints text in the window.) Set the attributes of the `TextBlock` as follows:

- `Margin="5"`
- `FontSize="24"`
- `HorizontalAlignment="Center"`
- `Text="Temperature Converter"`

```xml
<StackPanel>
    <TextBlock Margin="5"
               FontSize="24" 
               HorizontalAlignment="Center"
               Text="Temperature Converter">
    </TextBlock>

    <Button HorizontalAlignment="Center">Calculate</Button>
</StackPanel>
```

3. Run the app or check the previewer. You should see the text “Temperature Converter” positioned above the **Calculate** button.

<div className="center" style={{maxWidth:400}}>
<img className="center" src={TemperatureConverterTextOnly} alt="A screenshot showing a work-in-progress app, with text above a button." />
</div>

4. Enclose the `TextBlock` with a `<Border>...</Border>` tag. Set the attributes of the `Border` as follows:

- `Margin="5"`
- `CornerRadius="10"`
- `Background="LightBlue"`

```xml
<StackPanel>
    <Border Margin="5" CornerRadius="10" Background="LightBlue">
        <TextBlock Margin="5"
                   FontSize="24" 
                   HorizontalAlignment="Center"
                   Text="Temperature Converter">
        </TextBlock>
    </Border>

    <Button HorizontalAlignment="Center">Calculate</Button>
</StackPanel>
```

5. Run the app or check the previewer. You should see that the text “Temperature Converter” is now inside a rounded blue box.

<div className="center" style={{maxWidth:400}}>
<img className="center" src={TemperatureConverterBlueBorder} alt="A screenshot showing a work-in-progress app, with text enclosed inside a blue border above a button." />
</div>

:::note
By default, `StackPanel` arranges elements in a vertical stack. You can change this to horizontal by setting the `Orientation` attribute to `Horizontal`.
:::

## Inserting a grid

Next, we’ll add a `Grid` layout control to our temperature converter app. `Grid` creates cells in rows and columns, into which you can place more controls.

1. Stop the app if it is still running.
2. In the file **MainWindow.axaml**, insert a `<Grid>...</Grid>` tag between `</Border>` and `<Button>`.

```xml
<StackPanel>
    <Border Margin="5" CornerRadius="10" Background="LightBlue">
        <TextBlock Margin="5"
            HorizontalAlignment="Center"
            FontSize="24"
            Text="Temperature Converter">
        </TextBlock>
    </Border>
    <Grid ShowGridLines="True" Margin="5" 
          ColumnDefinitions="120, 100"
          RowDefinitions="Auto, Auto">
    </Grid>
    <Button HorizontalAlignment="Center">Calculate</Button>
</StackPanel>
```

We have specified some attributes for the `Grid`:

- It has two columns and two rows.
- Gridlines are visible.
- Cell height automatically scales to match the content. Because the automatic height of an empty cell is zero, the `Grid` currently appears on your previewer as a horizontal straight line.

<div className="center" style={{maxWidth:400}}>
<img className="center" src={TemperatureConverterEmptyGrid} alt="A screenshot showing a work-in-progress app, with a title, a dotted line, and a button." />
</div>

## Inserting controls in the grid

1. Insert `TextBlock` controls in the left cells of the grid, using the `Grid.Row` and `Grid.Column` attributes to assign the target cells. Use these text blocks to fill the cells with the text “Celsius” and “Fahrenheit”.

:::note
The first cell in a row or column of a `Grid` is numbered 0.
:::

```xml
        <Grid ShowGridLines="True" Margin="5" 
              ColumnDefinitions="120, 100"
              RowDefinitions="Auto, Auto">
            <TextBlock Grid.Row="0" Grid.Column="0" Margin="10">Celsius</TextBlock>
            <TextBlock Grid.Row="1" Grid.Column="0" Margin="10">Fahrenheit</TextBlock>
        </Grid>
```

2. Insert `TextBox` controls in the right cells of the grid, again using the `Grid.Row` and `Grid.Column` attributes to assign the target cells. `TextBox` is a control that creates an area for keyboard input.

```xml
        <Grid ShowGridLines="True" Margin="5" 
              ColumnDefinitions="120, 100"
              RowDefinitions="Auto, Auto">
            <TextBlock Grid.Row="0" Grid.Column="0" Margin="10">Celsius</TextBlock>
            <TextBox Grid.Row="0" Grid.Column="1" Margin="0 5" Text="0"/>
            <TextBlock Grid.Row="1" Grid.Column="0" Margin="10">Fahrenheit</TextBlock>
            <TextBox Grid.Row="1" Grid.Column="1" Margin="0 5" Text="0"/>
        </Grid>
```

3. Run the app or check the previewer. You should see your text and input boxes added to the window, within the cells marked by the gridlines.

<div className="center" style={{maxWidth:400}}>
<img className="center" src={TemperatureConverterFilledGrid} alt="A screenshot showing a work-in-progress app, with a title, input boxes in a grid, and a button." />
</div>

On the next page of this tutorial, you will learn how to adjust the size of the app window.