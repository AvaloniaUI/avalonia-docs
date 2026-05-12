---
id: contour-plot-chart
title: Contour plot chart
description: Displays 2D scalar fields as contour lines and optional filled bands, useful for surfaces, intensity maps, and interpolation.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Contour plots interpolate values across two spatial dimensions and render the result as isolines, filled regions, or both.

## When to use

- **Surface estimation**: Visualize a scalar field from scattered measurements.
- **Hotspot analysis**: Reveal peaks, valleys, and gradients in two dimensions.
- **Engineering maps**: Show pressure, temperature, or concentration surfaces.

## Code example

### XAML

```xml
<charts:ContourPlot Title="Temperature field"
                              Height="320"
                              ItemsSource="{Binding ContourData}"
                              XPath="X"
                              YPath="Y"
                              ValuePath="Temperature"
                              ContourLevels="10" />
```

### Data model (C#)

```csharp
public record ContourPoint(double X, double Y, double Temperature);

public ObservableCollection<ContourPoint> ContourData { get; } = new()
{
    new(0, 0, 18),
    new(0, 10, 24),
    new(10, 0, 21),
    new(10, 10, 28)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of sampled points. | `null` |
| `XPath` | Path to the X coordinate. | `null` |
| `YPath` | Path to the Y coordinate. | `null` |
| `ValuePath` | Path to the scalar value. | `null` |
| `ContourLevels` | Number of contour levels to compute. | `8` |
| `ShowFill` | Whether to fill the contour regions. | `true` |
| `ShowLines` | Whether to draw contour lines. | `true` |

## See also

- [Hexbin chart](/controls/data-display/charts/engineering/hexbin-chart)
- [Density plot chart](/controls/data-display/charts/statistical/density-plot-chart)
