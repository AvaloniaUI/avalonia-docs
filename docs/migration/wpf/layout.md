---
id: layout
title: Layout
description: Layout system differences between WPF and Avalonia panels, sizing, and positioning.
doc-type: migration
---

The layout system in Avalonia is very similar to WPF. If you are familiar with WPF panels and layout concepts, you will feel right at home. There are a few key differences and additions worth noting.

## Panel types

| WPF | Avalonia | Notes |
|---|---|---|
| [`StackPanel`](/api/avalonia/controls/stackpanel) | `StackPanel` | Same. Avalonia adds a `Spacing` property. |
| [`Grid`](/api/avalonia/controls/grid) | `Grid` | Same. Supports shorthand `ColumnDefinitions="Auto,*"`. |
| `DockPanel` | `DockPanel` | Same. `LastChildFill` defaults to `true`. |
| `WrapPanel` | `WrapPanel` | Same. |
| `Canvas` | `Canvas` | Same. |
| `UniformGrid` | `UniformGrid` | Same. |
| `VirtualizingStackPanel` | `VirtualizingStackPanel` | Same concept. |

## Grid shorthand syntax

Avalonia supports inline definition strings for Grid rows and columns, making XAML more concise:

```xml
<!-- WPF verbose -->
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto" />
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="200" />
    </Grid.ColumnDefinitions>
</Grid>

<!-- Avalonia shorthand (also works in WPF .NET 6+) -->
<Grid ColumnDefinitions="Auto,*,200" RowDefinitions="Auto,*" />
```

## Panel vs Grid for layering

Avalonia provides a lightweight `Panel` control that can be used for layering child elements on top of each other. In WPF, developers often use a `Grid` with no rows or columns defined to achieve overlapping content. In Avalonia, prefer `Panel` for this case since it avoids the overhead of the Grid layout engine.

```xml
<!-- WPF approach for layering -->
<Grid>
    <Image Source="background.png" />
    <TextBlock Text="Overlay" />
</Grid>

<!-- Avalonia preferred approach -->
<Panel>
    <Image Source="background.png" />
    <TextBlock Text="Overlay" />
</Panel>
```

## Spacing property

Avalonia's `StackPanel` has a `Spacing` property that eliminates the need to set margins on each child element:

```xml
<!-- Avalonia -->
<StackPanel Spacing="8">
    <Button Content="First" />
    <Button Content="Second" />
</StackPanel>
```

In WPF, you would typically apply margins to each child element to achieve the same result:

```xml
<!-- WPF -->
<StackPanel>
    <Button Content="First" Margin="0,0,0,8" />
    <Button Content="Second" />
</StackPanel>
```

## ScrollViewer differences

`ScrollViewer` works the same way in both frameworks. The `HorizontalScrollBarVisibility` and `VerticalScrollBarVisibility` properties use the same values (`Auto`, `Visible`, `Hidden`, `Disabled`). Default scroll behavior may differ slightly between platforms, so test scrolling on your target platforms.

## Viewbox

`Viewbox` works the same in both frameworks. It stretches or scales its child content to fill the available space.

## Layout rounding

Avalonia uses `UseLayoutRounding` (same as WPF) to snap layout measurements to pixel boundaries. This helps prevent blurry rendering caused by sub-pixel positioning.

## See also

- [Layout](/docs/layout/layout): Avalonia layout system overview.
- [Positioning Controls](/docs/layout/positioning-controls): Margins, alignment, and positioning.
