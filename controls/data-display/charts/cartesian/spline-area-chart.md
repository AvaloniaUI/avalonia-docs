---
id: spline-area-chart
title: Spline area chart
description: Displays a filled area beneath a smooth spline curve, combining the visual flow of spline charts with the volume emphasis of area charts.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Spline area charts display a filled area under a smooth interpolated curve. They combine the aesthetic smoothness of spline curves with the volume emphasis of area fills, making trends visually prominent.

## When to use
- **Smooth trends**: Displaying continuous data where smooth interpolation better represents the underlying trend.
- **Volume emphasis**: Highlighting the magnitude of values with the filled area beneath the curve.
- **Time series**: Visualizing data that changes gradually over time, such as revenue or traffic.

## Code example

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Title="Website Traffic" Height="250">
    <CartesianChart.HorizontalAxis>
        <CategoryAxis />
    </CartesianChart.HorizontalAxis>
    <CartesianChart.VerticalAxis>
        <NumericalAxis />
    </CartesianChart.VerticalAxis>
    <CartesianChart.Series>
        <SplineAreaSeries Title="Visitors"
                                   ItemsSource="{Binding SplineAreaSeriesData}"
                                   FillOpacity="0.4"
                                   SplineTension="0.3" />
    </CartesianChart.Series>
</CartesianChart>
```

### Data model (C#)
```csharp
public ObservableCollection<int> SplineAreaSeriesData { get; } = new()
{
    1200, 1400, 1100, 1600, 1800, 1500, 2000
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series shown in the legend. | `null` |
| `ItemsSource` | The collection of data items to display. | `null` |
| `CategoryPath` | Path to the property used for the X-axis. | `null` |
| `ValuePath` | Path to the property used for the Y-axis. | `null` |
| `Fill` | The color/brush used to fill the area. | Theme-dependent |
| `Stroke` | The color of the spline curve outline. | `Transparent` |
| `FillOpacity` | The opacity of the fill area (0.0 to 1.0). | `0.5` |
| `SplineTension` | The tension of the spline curve (0.0 to 1.0). Lower values create sharper curves, higher values create smoother curves. | `0.25` |

## See also

- [Area chart](/controls/data-display/charts/cartesian/area-chart)
- [Spline chart](/controls/data-display/charts/cartesian/spline-chart)
- [Line chart](/controls/data-display/charts/cartesian/line-chart)
