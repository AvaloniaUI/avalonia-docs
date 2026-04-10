---
id: choosing-a-layout-panel
title: Choosing a layout panel
description: Compare Avalonia panel controls and choose the right one for your layout strategy.
doc-type: how-to
---

Avalonia offers a variety of layout panels that fulfil different UI roles. This guide helps you pick the best panel control for your desired layout strategy.

## Decision flowchart

1. Do you need rows and columns with different sizes? **Use [Grid](#grid)**.
2. Do you need a header, footer, or sidebar around the content area? **Use [DockPanel](#dockpanel)**.
3. Do you need items stacked in a single direction? **Use [StackPanel](#stackpanel)**.
4. Do you need items to wrap to the next line when space runs out? **Use [WrapPanel](#wrappanel)**.
5. Do you need items in a uniform grid of equal-sized cells? **Use [UniformGrid](#uniformgrid)**.
6. Do you need to position items relative to each other? **Use [RelativePanel](#relativepanel)**.
7. Do you need pixel-precise absolute positioning? **Use [Canvas](#canvas)**.
8. Do you need to layer children on top of each other? **Use [Panel](#panel)**.

## Quick comparison

| Panel | Arrangement | Adapts to window size | Best for |
|---|---|---|---|
| [Grid](/controls/layout/panels/grid) | Rows and columns | Yes | Most general-purpose layouts, forms, dashboards |
| [DockPanel](/controls/layout/panels/dockpanel) | Edges (top, bottom, left, right) and fill | Yes | App shells with header, sidebar, and content area |
| [StackPanel](/controls/layout/panels/stackpanel) | Single line (vertical or horizontal) | Partial (stretches perpendicular, scrolls along) | Toolbars, menus, simple series of controls |
| [WrapPanel](/controls/layout/panels/wrappanel) | Sequential with line wrapping | Yes | Tag clouds, icon grids, responsive item collections |
| [UniformGrid](/controls/layout/panels/uniformgrid) | Equal-sized cells | Yes | Calculator keypads, image galleries, dashboards with equal tiles |
| [RelativePanel](/controls/layout/panels/relativepanel) | Relative to siblings or panel edges | Yes | Adaptive layouts that rearrange based on available space |
| [Canvas](/controls/layout/panels/canvas) | Absolute coordinates | No | Drawing surfaces, diagrams, custom overlays |
| [Panel](/controls/layout/panels/panel) | Layered on top of each other | Yes | Overlays, stacking visuals at the same position |

## Grid

A versatile panel suitable for many common layouts. Define rows and columns with fixed, proportional (`*`), or automatic (`Auto`) sizing. Place children in specified target cells.

<XamlPreview>

```xml
<Grid xmlns="https://github.com/avaloniaui"
      ColumnDefinitions="100,*"
      RowDefinitions="Auto,*"
      ShowGridLines="true">
    <TextBlock Grid.Row="0" Grid.Column="0" Text="Label" />
    <TextBox Grid.Row="0" Grid.Column="1" />
    <Button Grid.Row="1" Grid.Column="0" Grid.ColumnSpan="2" HorizontalAlignment="Center">
      Button spanning two columns
    </Button>
</Grid>
```

</XamlPreview>

**Use when:** You need a structured layout with rows and columns of varying sizes, such as a form, dashboard, or any layout that mixes fixed and flexible regions.

**Avoid when:** You need all children to be stacked in one direction (use [`StackPanel`](#stackpanel) instead). You need all cells to be the same size (use [`UniformGrid`](#uniformgrid) instead). Also, `Grid` is heavier than simpler panels, so use a lighter panel type if the complexity of `Grid` isn't needed.

For more information, see the [Grid](/controls/layout/panels/grid) page.

## DockPanel

Docks children to the edges of the panel. The last child fills the remaining space.

<XamlPreview>

```xml
<DockPanel xmlns="https://github.com/avaloniaui">

    <Menu DockPanel.Dock="Top" Background="Gray">
      <MenuItem Header="_File" />
      <MenuItem Header="_Edit" />
    </Menu>

    <TextBlock DockPanel.Dock="Bottom" Background="Lime" Text="Ready" />

    <StackPanel DockPanel.Dock="Right" Width="100">
      <Button Content="Zoom in" />
      <Button Content="Zoom out" />
    </StackPanel>

    <ContentControl Background="Beige" />  <!-- fills remaining space -->

</DockPanel>
```

</XamlPreview>

**Use when:** You are building an app shell with a fixed header, footer, and/or sidebar around a central content area.

**Avoid when:** You need children to share space proportionally (use [`Grid`](#grid) instead). `DockPanel` gives priority to children declared earlier.

For more information, see the [DockPanel](/controls/layout/panels/dockpanel) page.

## StackPanel

Arranges children in a single line, either vertical (default) or horizontal. Children stretch to fill the perpendicular direction.

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Spacing="8">
    <TextBlock Text="Name" />
    <TextBox />
    <TextBlock Text="Email" />
    <TextBox />
    <Button Content="Submit" HorizontalAlignment="Right" />
</StackPanel>
```

</XamlPreview>

**Use when:** You want a short, linear series of controls, such as a toolbar, settings form, or menu.

**Avoid when:** You want a long series of items that exceeds the available space. `StackPanel` gives children unlimited space, and does not trigger scrolling. Consider wrapping in a `ScrollViewer`, or using an `ItemsControl` with virtualization instead.

For more information, see the [StackPanel](/controls/layout/panels/stackpanel) page.

## WrapPanel

Lays out children left to right (or top to bottom), wrapping to a new line on reaching the edge.

<XamlPreview>

```xml
<WrapPanel xmlns="https://github.com/avaloniaui" 
           ItemSpacing="8" LineSpacing="8">
    <Button Content="One" />
    <Button Content="Two" />
    <Button Content="Three" />
    <Button Content="Four" />
    <Button Content="Five" />
</WrapPanel>
```

</XamlPreview>

**Use when:** You want items to flow based on available space, like tags, thumbnails, or a responsive button bar.

**Avoid when:** You need items to align in a strict pattern. `WrapPanel` items on different lines are spaced independently and will not form neat columns.

For more information, see the [WrapPanel](/controls/layout/panels/wrappanel) page.

## UniformGrid

Divides the available space into equal cells. Children fill cells sequentially.

<XamlPreview>

```xml
<UniformGrid xmlns="https://github.com/avaloniaui" 
             Columns="3">
    <Button Content="7" />
    <Button Content="8" />
    <Button Content="9" />
    <Button Content="4" />
    <Button Content="5" />
    <Button Content="6" />
    <Button Content="1" />
    <Button Content="2" />
    <Button Content="3" />
</UniformGrid>
```

</XamlPreview>

**Use when:** Every item should be the same size, such as a calculator keypad, color palette, or dashboard with equal tiles.

**Avoid when:** You need items of different sizes (use [`Grid`](#grid) instead).

For more information, see the [UniformGrid](/controls/layout/panels/uniformgrid) page.

## RelativePanel

Positions children relative to sibling controls or panel edges using attached properties.

<XamlPreview>

```xml
<RelativePanel xmlns="https://github.com/avaloniaui">
    <TextBlock Name="TitleText" Text="Title"
               RelativePanel.AlignTopWithPanel="True"
               RelativePanel.AlignLeftWithPanel="True" />
    <TextBox Name="SearchBox"
             RelativePanel.Below="TitleText"
             RelativePanel.AlignLeftWith="TitleText"
             RelativePanel.AlignRightWithPanel="True"
             Margin="0,8,0,0" />
    <Button Content="Search"
            RelativePanel.Below="SearchBox"
            RelativePanel.AlignRightWithPanel="True"
            Margin="0,8,0,0" />
</RelativePanel>
```

</XamlPreview>

**Use when:** You need to describe layout relationships between controls, e.g., "place this button below that text box and align it to the right edge". This is especially useful for adaptive layouts where you can change relationships based on available space.

**Avoid when:** A simpler panel can create your layout. `RelativePanel` is flexible but verbose. If your layout fits a [`Grid`](#grid) or [`StackPanel`](#stackpanel), use those instead.

For more information, see the [RelativePanel](/controls/layout/panels/relativepanel) page.

## Canvas

Places children at exact pixel coordinates using `Canvas.Left`, `Canvas.Top`, `Canvas.Right`, and `Canvas.Bottom`.

<XamlPreview>

```xml
<Canvas xmlns="https://github.com/avaloniaui">
    <Ellipse Canvas.Left="50" Canvas.Top="30"
             Width="80" Height="80" Fill="Blue" />
    <Rectangle Canvas.Left="150" Canvas.Top="60"
               Width="100" Height="50" Fill="Red" />
</Canvas>
```

</XamlPreview>

**Use when:** You need absolute positioning for a drawing surface or a diagram. You want a drag-and-drop interface that places objects at specific coordinates.

**Avoid when:** You are building a standard application UI. `Canvas` does not adapt to window resizing, so content can be clipped or leave empty space if the window size changes.

For more information, see the [Canvas](/controls/layout/panels/canvas) page.

## Panel

A minimal container that layers children on top of each other, in declaration order. Use `ZIndex` to control which child appears on top.

<XamlPreview>

```xml
<Panel xmlns="https://github.com/avaloniaui">
    <ContentControl Name="BG" Background="Gray" />
    <TextBlock Text="Overlay text"
                HorizontalAlignment="Center"
                VerticalAlignment="Center" />
</Panel>
```

</XamlPreview>

**Use when:** You want to overlay one control on top of another, such as a watermark over an image or a loading indicator over content.

**Avoid when:** You want children side-by-side or in a sequence.

For more information, see the [Panel](/controls/layout/panels/panel) page.

## Nesting panels

For complex layouts, you can combine multiple panels. Nest panels within one another, and use the simplest panel at each level.

<XamlPreview>

```xml
<DockPanel xmlns="https://github.com/avaloniaui">

    <!-- App shell: header + sidebar + content -->
    <Menu DockPanel.Dock="Top"
          Background="Gray">
      <MenuItem Header="_File" />
      <MenuItem Header="_Edit" />
    </Menu>

    <StackPanel DockPanel.Dock="Left"
                Width="100"
                Spacing="4"
                Background="Navy">
        <!-- Sidebar: vertical list of navigation items -->
        <Button Content="Home" />
        <Button Content="Settings" />
    </StackPanel>

    <Grid RowDefinitions="*,Auto">
        <!-- Content area: main content + status bar -->
        <ContentControl Grid.Row="0" />
        <TextBlock Grid.Row="1" Background="Lime" Text="Ready" />
    </Grid>

</DockPanel>
```

</XamlPreview>

### Performance tips

- Prefer simpler panels when possible. [`StackPanel`](#stackpanel) and [`Panel`](#panel) are lighter than [`Grid`](#grid).
- Avoid deeply nested panels. If you find yourself nesting more than three levels deep, consider whether a single [`Grid`](#grid) with the right row and column definitions could replace the entire tree.
- For large scrollable lists, use [`ItemsRepeater`](/controls/data-display/collections/itemsrepeater) or [`ListBox`](/controls/data-display/collections/listbox) with virtualization instead of putting hundreds of controls in a `StackPanel` inside a `ScrollViewer`.

## See also

- [Layout](/docs/layout) for how the measure-and-arrange system works.
- [Positioning controls](positioning-controls) for alignment, margin, and padding.
- [Responsive layout how-to](/docs/how-to/responsive-layout-how-to) for adaptive layout techniques.
- Individual panel references:
  - [Grid](/controls/layout/panels/grid)
  - [DockPanel](/controls/layout/panels/dockpanel)
  - [StackPanel](/controls/layout/panels/stackpanel)
  - [WrapPanel](/controls/layout/panels/wrappanel)
  - [Canvas](/controls/layout/panels/canvas)
  - [RelativePanel](/controls/layout/panels/relativepanel)
  - [UniformGrid](/controls/layout/panels/uniformgrid)
  - [Panel](/controls/layout/panels/panel).
