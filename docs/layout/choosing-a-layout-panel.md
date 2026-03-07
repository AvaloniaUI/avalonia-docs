---
id: choosing-a-layout-panel
title: Choosing a layout panel
description: Compare Avalonia panel controls and choose the right one for your layout scenario.
doc-type: how-to
---

Avalonia provides several panel controls, each designed for a different layout strategy. Choosing the right panel simplifies your XAML, improves performance, and makes your UI easier to maintain. This guide helps you pick the best panel for common scenarios.

## Decision flowchart

Ask yourself these questions in order:

1. **Do you need rows and columns with different sizes?** Use [Grid](#grid).
2. **Do you need a header, footer, or sidebar around a content area?** Use [DockPanel](#dockpanel).
3. **Do you need items stacked in a single direction?** Use [StackPanel](#stackpanel).
4. **Do you need items to wrap to the next line when space runs out?** Use [WrapPanel](#wrappanel).
5. **Do you need items in a uniform grid of equal-sized cells?** Use [UniformGrid](#uniformgrid).
6. **Do you need to position items relative to each other?** Use [RelativePanel](#relativepanel).
7. **Do you need pixel-precise absolute positioning?** Use [Canvas](#canvas).
8. **Do you need to layer children on top of each other?** Use [Panel](#panel).

## Quick comparison

| Panel | Arrangement | Adapts to window size | Best for |
|---|---|---|---|
| [Grid](../controls/layout/panels/grid) | Rows and columns | Yes | Most general-purpose layouts, forms, dashboards |
| [DockPanel](../controls/layout/panels/dockpanel) | Edges (top, bottom, left, right) + fill | Yes | App shells with header, sidebar, and content area |
| [StackPanel](../controls/layout/panels/stackpanel) | Single line (vertical or horizontal) | Partially (stretches perpendicular, scrolls along) | Toolbars, menus, simple lists of controls |
| [WrapPanel](../controls/layout/panels/wrappanel) | Sequential with line wrapping | Yes | Tag clouds, icon grids, responsive item collections |
| [UniformGrid](../controls/layout/panels/uniformgrid) | Equal-sized cells | Yes | Calculator keypads, image galleries, dashboards with equal tiles |
| [RelativePanel](../controls/layout/panels/relativepanel) | Relative to siblings or panel edges | Yes | Adaptive layouts that rearrange based on available space |
| [Canvas](../controls/layout/panels/canvas) | Absolute coordinates | No | Drawing surfaces, diagrams, custom overlays |
| [Panel](../controls/layout/panels/panel) | Layered on top of each other | Yes | Overlays, stacking visuals at the same position |

## Panel details

### Grid

The most versatile panel. Define rows and columns with fixed, proportional (`*`), or automatic (`Auto`) sizing, then place children in specific cells.

```xml
<Grid ColumnDefinitions="200,*" RowDefinitions="Auto,*">
    <TextBlock Grid.Row="0" Grid.Column="0" Text="Label" />
    <TextBox Grid.Row="0" Grid.Column="1" />
    <ListBox Grid.Row="1" Grid.Column="0" Grid.ColumnSpan="2" />
</Grid>
```

**Use when:** You need a structured layout with rows and columns of varying sizes, such as a form, a dashboard, or any layout that mixes fixed and flexible regions.

**Avoid when:** All children are stacked in one direction (use StackPanel) or all cells are the same size (use UniformGrid). Grid is heavier than simpler panels, so prefer a lighter alternative when it fits.

### DockPanel

Docks children to the edges of the panel. The last child fills the remaining space.

```xml
<DockPanel>
    <Menu DockPanel.Dock="Top" />
    <StatusBar DockPanel.Dock="Bottom" />
    <TreeView DockPanel.Dock="Left" Width="200" />
    <ContentControl />  <!-- fills remaining space -->
</DockPanel>
```

**Use when:** You are building an app shell with a fixed header, footer, or sidebar around a central content area.

**Avoid when:** You need children to share space proportionally. DockPanel allocates edge space in declaration order, so earlier children take priority. For proportional splitting, use a Grid.

### StackPanel

Arranges children in a single line, either vertically (default) or horizontally. Children stretch to fill the perpendicular direction.

```xml
<StackPanel Spacing="8">
    <TextBlock Text="Name" />
    <TextBox />
    <TextBlock Text="Email" />
    <TextBox />
    <Button Content="Submit" HorizontalAlignment="Right" />
</StackPanel>
```

**Use when:** You have a short, linear list of controls: a toolbar, a settings form, a group of buttons, or a menu.

**Avoid when:** The list of items might exceed the available space. StackPanel gives children unlimited space in the stacking direction, so it will never trigger scrolling on its own. Wrap it in a `ScrollViewer` if scrolling is needed, or consider an `ItemsControl` with virtualization for large collections.

### WrapPanel

Lays out children left to right (or top to bottom), wrapping to a new line when the edge is reached.

```xml
<WrapPanel ItemSpacing="8" LineSpacing="8">
    <Button Content="One" />
    <Button Content="Two" />
    <Button Content="Three" />
    <Button Content="Four" />
    <Button Content="Five" />
</WrapPanel>
```

**Use when:** You want items to flow and reflow based on available space, like a set of tags, a gallery of thumbnails, or a responsive button bar.

**Avoid when:** You need items to align in a strict row-and-column grid. WrapPanel items on different lines are independent, so columns will not align unless you set a fixed `ItemWidth`.

### UniformGrid

Divides the available space into equal-sized cells. Children fill cells sequentially.

```xml
<UniformGrid Columns="4" ColumnSpacing="4" ItemSpacing="4">
    <Button Content="7" />
    <Button Content="8" />
    <Button Content="9" />
    <Button Content="/" />
    <Button Content="4" />
    <Button Content="5" />
    <Button Content="6" />
    <Button Content="*" />
</UniformGrid>
```

**Use when:** Every item should be the same size, such as a calculator keypad, a color palette, or a dashboard of equal tiles.

**Avoid when:** Items need different sizes. UniformGrid forces all cells to be identical. Use Grid for variable-sized rows and columns.

### RelativePanel

Positions children relative to sibling controls or the panel edges using attached properties.

```xml
<RelativePanel>
    <TextBlock x:Name="TitleText" Text="Title"
               RelativePanel.AlignTopWithPanel="True"
               RelativePanel.AlignLeftWithPanel="True" />
    <TextBox x:Name="SearchBox"
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

**Use when:** You need to describe layout relationships between controls (for example, "place this button below that text box and align it to the right edge"). This is especially useful for adaptive layouts where you change relationships based on available space.

**Avoid when:** A simpler panel handles the job. RelativePanel is flexible but verbose. If your layout fits a Grid or StackPanel, use those instead.

### Canvas

Places children at exact pixel coordinates using `Canvas.Left`, `Canvas.Top`, `Canvas.Right`, and `Canvas.Bottom` attached properties.

```xml
<Canvas>
    <Ellipse Canvas.Left="50" Canvas.Top="30"
             Width="80" Height="80" Fill="Blue" />
    <Rectangle Canvas.Left="150" Canvas.Top="60"
               Width="100" Height="50" Fill="Red" />
</Canvas>
```

**Use when:** You need absolute positioning for drawing surfaces, diagrams, or drag-and-drop scenarios where controls are placed at specific coordinates.

**Avoid when:** You are building a standard application UI. Canvas layouts do not adapt to window resizing, so content can be clipped or leave empty space when the window size changes.

### Panel

The simplest container. All children are layered on top of each other, drawn in declaration order. Use `ZIndex` to control which child appears on top.

```xml
<Panel>
    <Image Source="/bg.png" />
    <TextBlock Text="Overlay text"
               HorizontalAlignment="Center"
               VerticalAlignment="Center" />
</Panel>
```

**Use when:** You want to overlay one control on top of another, such as a watermark over an image or a loading indicator over content.

**Avoid when:** You actually want children side by side or in a sequence. Panel stacks everything at the same position.

## Nesting panels

Complex layouts typically combine multiple panels. Use the simplest panel at each level:

```xml
<DockPanel>
    <!-- App shell: header + sidebar + content -->
    <Menu DockPanel.Dock="Top" />

    <StackPanel DockPanel.Dock="Left" Width="200" Spacing="4">
        <!-- Sidebar: vertical list of navigation items -->
        <Button Content="Home" />
        <Button Content="Settings" />
    </StackPanel>

    <Grid RowDefinitions="*,Auto">
        <!-- Content area: main content + status bar -->
        <ContentControl Grid.Row="0" />
        <TextBlock Grid.Row="1" Text="Ready" />
    </Grid>
</DockPanel>
```

### Performance tips

- Prefer simpler panels when possible. `StackPanel` and `Panel` are lighter than `Grid`.
- Avoid deeply nested panels. If you find yourself nesting more than three levels deep, consider whether a single `Grid` with the right row and column definitions could replace the entire tree.
- For large scrollable lists, use `ItemsRepeater` or `ListBox` with virtualization instead of putting hundreds of controls in a StackPanel inside a ScrollViewer.

## See also

- [Layout](layout) for how the measure and arrange system works.
- [Positioning Controls](positioning-controls) for alignment, margin, and padding.
- [Responsive Layout How-To](/docs/how-to/responsive-layout-how-to) for adaptive layout techniques.
- Individual panel references: [Grid](/controls/layout/panels/grid), [DockPanel](/controls/layout/panels/dockpanel), [StackPanel](/controls/layout/panels/stackpanel), [WrapPanel](/controls/layout/panels/wrappanel), [Canvas](/controls/layout/panels/canvas), [RelativePanel](/controls/layout/panels/relativepanel), [UniformGrid](/controls/layout/panels/uniformgrid), [Panel](/controls/layout/panels/panel).
