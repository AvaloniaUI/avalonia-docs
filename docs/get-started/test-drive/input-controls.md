---
id: input-controls
title: Input Controls
---
import useBaseUrl from '@docusaurus/useBaseUrl';

On this page, you will learn how to add input controls and arrange them in a neatly aligned layout. The aim is to add 
numerical inputs with labels and an output control following in the row below. 

To achieve this layout, you will use the built-in `Grid` control to create cells and assign our controls to those cells.

The following picture shows the finished application at runtime with the gridlines showing for layout visualization purposes. Normally, 
these are invisible on a production UI.

<ThemedImage
        alt="Temperature StackPanel"
        className="center"
        sources={{
            light: useBaseUrl('/img/get-started/test-drive/input-controls-light.png'),
            dark: useBaseUrl('/img/get-started/test-drive/input-controls-dark.png'),
        }}
        />

To create a layout using the `Grid` control with 2 columns and 3 rows, follow this procedure:

- Stop the app if it is running.
- Locate the empty line in the XAML between `<Border>` and `<Button>`
- Insert a `<Grid>` tag as shown:

```xml
<StackPanel>
    <Border Margin="5" CornerRadius="10" Background="LightBlue">
        <TextBlock Margin="5"
            HorizontalAlignment="Center"
            FontSize="24"
            Text="Temperature Converter" />
    </Border>
    // highlight-start
    <Grid ShowGridLines="True" Margin="5" 
          ColumnDefinitions="120, 100"
          RowDefinitions="Auto, Auto, Auto">
    </Grid>
    // highlight-end
    <Button HorizontalAlignment="Center">Calculate</Button>
</StackPanel>
```

This assigns the number of rows and columns, their sizes, and makes the gridlines visible. Currently, it will show as a 
straight line because the grid cells are empty. The `Auto` rows size to their content and will have zero height until 
content is added.

- Add `<Label>` and `<TextBox>` (text input) controls to the `Grid`'s children as shown:

```xml
<Grid ShowGridLines="True" Margin="5"
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
    // highlight-start
    <Label Grid.Row="0" Grid.Column="0">Celsius</Label>
    <TextBox Grid.Row="0" Grid.Column="1"/>
    <Label Grid.Row="1" Grid.Column="0">Fahrenheit</Label>
    <TextBox Grid.Row="1"  Grid.Column="1"/>
    // highlight-end
</Grid>
```

To complete the layout, tidy up the alignment of the controls in the `Grid` using their `Margin` property. Also, move 
the `Button` inside the `Grid`.

```xml
<Grid ShowGridLines="True"  Margin="5" 
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
    // highlight-start
    <Label Grid.Row="0" Grid.Column="0" Margin="10">Celsius</Label>
    <TextBox Grid.Row="0" Grid.Column="1" Margin="0 5" Text="0"/>
    <Label Grid.Row="1" Grid.Column="0" Margin="10">Fahrenheit</Label>
    <TextBox Grid.Row="1"  Grid.Column="1" Margin="0 5" Text="0"/>
    <Button Grid.Row="2"  Grid.Column="1">Calculate</Button>
    // highlight-end
</Grid>
```

- Run the app to see the result

:::info
For full information about the complete range of Avalonia built-in controls, and their attributes, see the reference section [here](../../reference/controls/).
:::

On the next page, you will see how to improve your design-time experience by adjusting the size window when it is shown in the preview pane.
