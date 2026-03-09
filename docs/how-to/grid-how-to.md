---
id: grid-how-to
title: "How to: Work with Grid layouts"
description: Row and column definitions, sizing modes, spanning, shared sizing, and responsive Grid patterns.
doc-type: how-to
---

This guide covers common [`Grid`](/api/avalonia/controls/grid) layout scenarios including row and column definitions, sizing modes, spanning, shared sizing, and responsive patterns.

## Row and column definitions

You can define rows and columns using the shorthand syntax:

```xml
<Grid ColumnDefinitions="200,*,Auto" RowDefinitions="Auto,*,Auto">
    <TextBlock Grid.Row="0" Grid.Column="0" Text="Sidebar Header" />
    <ListBox Grid.Row="1" Grid.Column="0" />
    <ContentControl Grid.Row="0" Grid.RowSpan="3" Grid.Column="1"
                    Content="{Binding MainContent}" />
    <TextBlock Grid.Row="2" Grid.Column="0" Grid.ColumnSpan="2"
               Text="Status Bar" />
</Grid>
```

Or use the verbose syntax when you need more control over individual definitions (for example, setting `MinWidth` or `MaxWidth`):

```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="200" />
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="Auto" />
    </Grid.ColumnDefinitions>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto" />
        <RowDefinition Height="*" />
    </Grid.RowDefinitions>
</Grid>
```

:::tip
The shorthand syntax is more concise, but the verbose syntax lets you set additional properties such as `MinWidth`, `MaxWidth`, `MinHeight`, `MaxHeight`, and `SharedSizeGroup` on each definition.
:::

## Sizing modes

### Pixel sizing

Fixed size in device-independent pixels:

```xml
<Grid ColumnDefinitions="200,300">
    <!-- Column 0 is exactly 200px, Column 1 is exactly 300px -->
</Grid>
```

Use pixel sizing when you need a column or row to remain a constant size regardless of its content. This is common for sidebars, toolbars, and icon columns.

### Auto sizing

Sizes the row or column to fit its content:

```xml
<Grid ColumnDefinitions="Auto,*">
    <!-- Column 0 shrinks to fit its content -->
    <TextBlock Grid.Column="0" Text="Label:" />
    <!-- Column 1 fills remaining space -->
    <TextBox Grid.Column="1" Text="{Binding Value}" />
</Grid>
```

:::note
An `Auto` column or row measures all of its children and expands to fit the largest one. If the content grows dynamically (for example, long text loaded at runtime), the column grows too, which can push other columns off-screen. If you need to cap the size, combine `Auto` with `MaxWidth` or `MaxHeight` using the verbose syntax.
:::

### Star sizing

Distributes remaining space proportionally after `Auto` and pixel columns have been measured:

```xml
<Grid ColumnDefinitions="*,2*,*">
    <!-- Column 0: 25% of remaining space (1/4) -->
    <!-- Column 1: 50% of remaining space (2/4) -->
    <!-- Column 2: 25% of remaining space (1/4) -->
</Grid>
```

You can mix star values with other sizing modes. The star proportions apply only to the space left over after fixed and `Auto` columns are allocated:

```xml
<Grid ColumnDefinitions="100,*,2*">
    <!-- Column 0: fixed 100px -->
    <!-- Remaining space split 1:2 between columns 1 and 2 -->
</Grid>
```

### MinWidth and MaxWidth constraints

You can constrain column and row sizes using the verbose syntax:

```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*" MinWidth="200" MaxWidth="400" />
        <ColumnDefinition Width="2*" />
    </Grid.ColumnDefinitions>
</Grid>
```

This is particularly useful for star-sized columns where you want flexible sizing but need to prevent the column from becoming too narrow or too wide. The same approach works for rows using `MinHeight` and `MaxHeight`.

## Row and column spacing

Add uniform spacing between rows and columns with `RowSpacing` and `ColumnSpacing`:

```xml
<Grid ColumnDefinitions="*,*,*" RowDefinitions="Auto,Auto,Auto"
      ColumnSpacing="8" RowSpacing="8">
    <!-- 8px gap between all rows and columns -->
</Grid>
```

:::note
`RowSpacing` and `ColumnSpacing` add space between cells only, not around the outer edges of the grid. If you need outer padding, set `Margin` or `Padding` on the `Grid` itself.
:::

## Spanning rows and columns

Use `Grid.RowSpan` and `Grid.ColumnSpan` to make a control span multiple rows or columns:

```xml
<Grid ColumnDefinitions="200,*" RowDefinitions="Auto,*,Auto">
    <!-- Header spans both columns -->
    <TextBlock Grid.Row="0" Grid.ColumnSpan="2" Text="Header"
               FontSize="20" FontWeight="Bold" />

    <!-- Sidebar spans rows 1 and 2 -->
    <ListBox Grid.Row="1" Grid.Column="0" Grid.RowSpan="2" />

    <!-- Content area -->
    <ContentControl Grid.Row="1" Grid.Column="1" />

    <!-- Footer in column 1 only -->
    <TextBlock Grid.Row="2" Grid.Column="1" Text="Footer" />
</Grid>
```

:::tip
The default value for both `Grid.RowSpan` and `Grid.ColumnSpan` is `1`. If you set a span value larger than the number of remaining rows or columns, the control spans to the edge of the grid without causing an error.
:::

## Default row and column values

When you omit `Grid.Row` or `Grid.Column` on a child control, both default to `0`. This means you can place a single child in a `Grid` without specifying any attached properties:

```xml
<Grid>
    <!-- This control is placed at Row 0, Column 0 by default -->
    <TextBlock Text="Hello" />
</Grid>
```

If you define no `RowDefinitions` or `ColumnDefinitions` at all, the grid creates a single star-sized row and column that fills all available space.

## Form layout

A common pattern for label-value pairs uses an `Auto` column for labels and a star column for inputs:

```xml
<Grid ColumnDefinitions="Auto,*" RowDefinitions="Auto,Auto,Auto,Auto"
      RowSpacing="8" ColumnSpacing="12">
    <TextBlock Grid.Row="0" Grid.Column="0" Text="Name:"
               VerticalAlignment="Center" />
    <TextBox Grid.Row="0" Grid.Column="1" Text="{Binding Name}" />

    <TextBlock Grid.Row="1" Grid.Column="0" Text="Email:"
               VerticalAlignment="Center" />
    <TextBox Grid.Row="1" Grid.Column="1" Text="{Binding Email}" />

    <TextBlock Grid.Row="2" Grid.Column="0" Text="Department:"
               VerticalAlignment="Center" />
    <ComboBox Grid.Row="2" Grid.Column="1" ItemsSource="{Binding Departments}"
              SelectedItem="{Binding Department}" />

    <StackPanel Grid.Row="3" Grid.Column="1" Orientation="Horizontal"
                Spacing="8" HorizontalAlignment="Right">
        <Button Content="Cancel" Command="{Binding CancelCommand}" />
        <Button Content="Save" Command="{Binding SaveCommand}" />
    </StackPanel>
</Grid>
```

Setting `VerticalAlignment="Center"` on the labels keeps them vertically aligned with their corresponding input controls, even when the inputs are taller than the labels.

## SharedSizeGroup

Use `SharedSizeGroup` to align column widths (or row heights) across multiple `Grid` controls. Set the property on individual `ColumnDefinition` or `RowDefinition` elements:

```xml
<StackPanel Grid.IsSharedSizeScope="True" Spacing="4">
    <Grid ShowGridLines="False">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="Auto" SharedSizeGroup="Labels" />
            <ColumnDefinition Width="*" />
        </Grid.ColumnDefinitions>
        <TextBlock Grid.Column="0" Text="Name:" Margin="0,0,8,0" />
        <TextBox Grid.Column="1" Text="{Binding Name}" />
    </Grid>
    <Grid ShowGridLines="False">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="Auto" SharedSizeGroup="Labels" />
            <ColumnDefinition Width="*" />
        </Grid.ColumnDefinitions>
        <TextBlock Grid.Column="0" Text="Email Address:" Margin="0,0,8,0" />
        <TextBox Grid.Column="1" Text="{Binding Email}" />
    </Grid>
</StackPanel>
```

Both "Labels" columns share the same width (the width of the wider label), even though they belong to separate `Grid` controls. The parent `StackPanel` sets `Grid.IsSharedSizeScope="True"` to define the sharing boundary.

:::note
`SharedSizeGroup` is a property on `ColumnDefinition` and `RowDefinition`, not on the child controls themselves. The group name is a string, and all definitions with the same group name within the same shared-size scope use the same measured size.
:::

## Nested grids

For complex layouts, you can nest grids inside one another. Each inner `Grid` manages its own rows and columns independently:

```xml
<Grid ColumnDefinitions="250,*">
    <!-- Sidebar -->
    <Grid Grid.Column="0" RowDefinitions="Auto,*,Auto">
        <TextBlock Grid.Row="0" Text="Navigation" FontWeight="Bold" />
        <ListBox Grid.Row="1" ItemsSource="{Binding MenuItems}" />
        <Button Grid.Row="2" Content="Settings" />
    </Grid>

    <!-- Main content -->
    <Grid Grid.Column="1" RowDefinitions="Auto,*">
        <TextBlock Grid.Row="0" Text="{Binding Title}" FontSize="24" />
        <ContentControl Grid.Row="1" Content="{Binding CurrentPage}" />
    </Grid>
</Grid>
```

:::tip
Nesting grids is straightforward but adds layout complexity. If your inner grid only needs a simple vertical or horizontal stack, consider using a `StackPanel` or `DockPanel` instead for better readability and performance.
:::

## Responsive layout with Grid

You can combine `Grid` with `OnFormFactor` for responsive designs that adapt column definitions based on the device:

```xml
<Grid ColumnDefinitions="{OnFormFactor Desktop='250,*', Mobile='*'}">
    <!-- On desktop: two-column layout -->
    <!-- On mobile: single column (sidebar hidden or placed in a drawer) -->
</Grid>
```

## Overlapping content

When you place multiple children in the same cell, they overlap visually. The last child in the markup appears on top:

```xml
<Grid>
    <!-- Background image -->
    <Image Source="background.jpg" Stretch="UniformToFill" />

    <!-- Overlay gradient -->
    <Border>
        <Border.Background>
            <LinearGradientBrush StartPoint="0%,0%" EndPoint="0%,100%">
                <GradientStop Color="Transparent" Offset="0.5" />
                <GradientStop Color="#CC000000" Offset="1.0" />
            </LinearGradientBrush>
        </Border.Background>
    </Border>

    <!-- Text on top -->
    <TextBlock Text="Hello World"
               VerticalAlignment="Bottom"
               Margin="16"
               Foreground="White"
               FontSize="24" />
</Grid>
```

When you omit `Grid.Row` and `Grid.Column`, children default to row 0, column 0. You can use `ZIndex` to control stacking order independently of markup order:

```xml
<Grid>
    <Border ZIndex="1" Background="Red" Opacity="0.5" />
    <Border ZIndex="2" Background="Blue" Opacity="0.5" />
    <!-- Blue border appears on top despite any markup order changes -->
</Grid>
```

### Partial overlap with negative margins

To overlap two elements by a specific amount without placing them in the same cell, use a negative margin on the second element:

```xml
<StackPanel Orientation="Horizontal">
    <Border Background="LightBlue" Padding="12">
        <TextBlock Text="First" />
    </Border>
    <Border Background="LightCoral" Padding="12" Margin="-10,0,0,0">
        <TextBlock Text="Second (overlaps by 10px)" />
    </Border>
</StackPanel>
```

The negative left margin pulls the second element 10 pixels to the left, overlapping the first. The second element appears on top because it comes later in the markup. This technique works in any panel, not just `Grid`.

## Debugging grid layouts

Set `ShowGridLines="True"` on your `Grid` to visualize row and column boundaries during development:

```xml
<Grid ColumnDefinitions="Auto,*,200" RowDefinitions="Auto,*"
      ShowGridLines="True">
    <!-- Grid lines appear as dashed lines so you can see each cell -->
</Grid>
```

Remember to remove `ShowGridLines` before shipping your application, as it is intended only as a development aid.

## See also

- [Grid control reference](../../controls/layout/panels/grid)
- [Layout overview](../layout/layout)
- [Positioning controls](../layout/positioning-controls)
