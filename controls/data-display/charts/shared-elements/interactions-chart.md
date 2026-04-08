---
id: interactions-chart
title: Zoom and pan
description: Enables users to interactively zoom and pan across chart areas, suitable for exploring high-density or large datasets with mouse, touch, or selection zoom.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsFeaturesZoom from '/img/controls/charts/charts-zoom.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Zoom and pan allow users to explore multi-dimensional or high-resolution datasets by navigating the chart area dynamically.

<Image light={chartsFeaturesZoom} maxWidth={400} position="center" cornerRadius="true" alt="Chart with interactive zoom and pan controls allowing users to focus on specific regions of a dense dataset." />

## When to use
- **Big data visualization**: Exploring line charts with thousands of points.
- **Deep-dive analysis**: Zooming into a specific time window for detailed study.
- **Interactive reports**: Giving users agency to focus on areas of interest.

## Code example

### XAML
```xml
<controls:CartesianChart Name="ZoomPanChartSample"
                        Title="Interactive Chart"
                        Height="350"
                        IsZoomEnabled="True"
                        IsPanEnabled="True"
                        ZoomMode="XY">
    <controls:CartesianChart.Series>
        <controls:LineSeries Title="Price" ItemsSource="{Binding ZoomPanData}" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
// Zoom/Pan typically used with large datasets
public ObservableCollection<double> ZoomPanData { get; } = new();

public void LoadData()
{
    for(int i=0; i<1000; i++) ZoomPanData.Add(Random.Shared.NextDouble() * 100);
}
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `IsZoomEnabled` | Enables the ability to zoom into the chart. | `false` |
| `IsPanEnabled` | Enables the ability to pan (scroll) the chart view. | `false` |
| `ZoomMode` | `X`, `Y`, or `XY` axis zooming. | `XY` |
| `ZoomSensitivity` | Sensitivity of the zoom (0.0 to 1.0). | `0.1` |
| `ShowRangeSelector` | Show a range selector control for zooming. | `true` |

## Interaction controls
- **Mouse Wheel**: Zoom in/out at the cursor position.
- **Ctrl + Drag**: Pan across the chart area.
- **Shift + Drag**: Draw a rectangle to zoom into a specific region.
- **Double Click**: Reset zoom and pan to default view.
*(Note: Supports pinch-to-zoom, mouse wheel, and selection zoom)*
