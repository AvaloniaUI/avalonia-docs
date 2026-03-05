---
id: grid-how-to
title: "How To: Work with Grid Layouts"
---

This guide covers common Grid layout scenarios: row and column definitions, sizing modes, spanning, shared sizing, and responsive patterns.

## Row and Column Definitions

Define rows and columns using the shorthand syntax:

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

Or using the verbose syntax for more control:

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

## Sizing Modes

### Pixel sizing

Fixed size in device-independent pixels:

```xml
<Grid ColumnDefinitions="200,300">
    <!-- Column 0 is exactly 200px, Column 1 is exactly 300px -->
</Grid>
```

### Auto sizing

Sizes to fit the content:

```xml
<Grid ColumnDefinitions="Auto,*">
    <!-- Column 0 shrinks to fit its content -->
    <TextBlock Grid.Column="0" Text="Label:" />
    <!-- Column 1 fills remaining space -->
    <TextBox Grid.Column="1" Text="{Binding Value}" />
</Grid>
```

### Star sizing

Distributes remaining space proportionally:

```xml
<Grid ColumnDefinitions="*,2*,*">
    <!-- Column 0: 25% of space (1/4) -->
    <!-- Column 1: 50% of space (2/4) -->
    <!-- Column 2: 25% of space (1/4) -->
</Grid>
```

### MinWidth and MaxWidth

Constrain column sizes:

```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*" MinWidth="200" MaxWidth="400" />
        <ColumnDefinition Width="2*" />
    </Grid.ColumnDefinitions>
</Grid>
```

## Row and Column Spacing

Add uniform spacing between rows and columns:

```xml
<Grid ColumnDefinitions="*,*,*" RowDefinitions="Auto,Auto,Auto"
      ColumnSpacing="8" RowSpacing="8">
    <!-- 8px gap between all rows and columns -->
</Grid>
```

## Spanning Rows and Columns

Make a control span multiple rows or columns:

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

## Form Layout

A common pattern for label-value pairs:

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

## SharedSizeGroup

Align column widths across multiple grids:

```xml
<StackPanel Grid.IsSharedSizeScope="True" Spacing="4">
    <Grid ColumnDefinitions="Auto,*" ShowGridLines="False">
        <TextBlock Grid.Column="0" Text="Name:"
                   SharedSizeGroup="Labels" Margin="0,0,8,0" />
        <TextBox Grid.Column="1" Text="{Binding Name}" />
    </Grid>
    <Grid ColumnDefinitions="Auto,*" ShowGridLines="False">
        <TextBlock Grid.Column="0" Text="Email Address:"
                   SharedSizeGroup="Labels" Margin="0,0,8,0" />
        <TextBox Grid.Column="1" Text="{Binding Email}" />
    </Grid>
</StackPanel>
```

Both "Labels" columns will have the same width (the width of the wider label), even though they are in separate `Grid` controls. The parent `StackPanel` sets `Grid.IsSharedSizeScope="True"` to scope the sharing.

## Nested Grids

For complex layouts, nest grids:

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

## Responsive Layout with Grid

Combine Grid with `OnPlatform` or `OnFormFactor` for responsive designs:

```xml
<Grid ColumnDefinitions="{OnFormFactor Desktop='250,*', Mobile='*'}">
    <!-- On desktop: two-column layout -->
    <!-- On mobile: single column (sidebar hidden or in a drawer) -->
</Grid>
```

## Overlapping Content

Place multiple children in the same cell to overlay them:

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

When no `Grid.Row` or `Grid.Column` is specified, children default to row 0, column 0 and stack visually (last child on top).

## See Also

- [Grid Control Reference](/controls/layout/panels/grid): Property tables and full examples.
- [Layout](/docs/layout/layout): Overview of the Avalonia layout system.
- [Positioning Controls](/docs/layout/positioning-controls): Alignment, margin, and padding.
