---
id: hexbin-chart
title: Hexbin chart
description: Aggregates dense 2D point clouds into hexagonal bins, useful for visualizing concentration without overplotting.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Hexbin charts group nearby points into hexagons so dense scatter data remains readable even when thousands of points overlap.

## When to use

- **Dense scatter data**: Replace unreadable point clouds with density bins.
- **Spatial concentration**: Show where observations cluster in two dimensions.
- **Exploratory analysis**: Reveal hotspots and gradients without smoothing the raw data.

## Code example

### XAML

```xml
<charts:HexbinChart Title="Request concentration"
                              Height="320"
                              ItemsSource="{Binding HexbinData}"
                              XPath="X"
                              YPath="Y"
                              HexRadius="16" />
```

### Data model (C#)

```csharp
public record SamplePoint(double X, double Y);

public ObservableCollection<SamplePoint> HexbinData { get; } = new()
{
    new(12, 20),
    new(14, 22),
    new(13, 21),
    new(28, 35)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of X and Y points. | `null` |
| `XPath` | Path to the X value. | `null` |
| `YPath` | Path to the Y value. | `null` |
| `HexRadius` | Radius of each hexagon in pixels. | `20.0` |
| `ColorScale` | Color scale used to encode density. | `Blues` |
| `ShowAxes` | Whether to draw the chart axes. | `true` |

## See also

- [Bubble chart](/controls/data-display/charts/bubble/bubble-chart)
- [Contour plot chart](/controls/data-display/charts/statistical/contour-plot-chart)
