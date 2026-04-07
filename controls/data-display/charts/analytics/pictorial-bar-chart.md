---
id: pictorial-bar-chart
title: Pictorial bar chart
description: Uses icons or symbols instead of plain bars, reinforcing the subject matter visually for infographics and thematic reports.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsCartesianPictorial from '/img/controls/charts/charts-cartesian-pictorial.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Pictorial bar charts use recognizable icons or symbols instead of plain bars. They are excellent for infographics where the subject matter (e.g., people, cars, buildings) can be visually reinforced.

<Image light={chartsCartesianPictorial} maxWidth={400} position="center" cornerRadius="true" alt="Pictorial bar chart using repeated icon symbols instead of plain bars to represent category values." />

## When to use
- **Infographics**: Creating high-engagement, thematic reports.
- **Demographic reports**: Using gender or professional icons to represent counts.
- **Public data presentation**: Making dry statistics more accessible through familiar symbols.

## Code example

### XAML
```xml
<controls:CartesianChart Name="PictorialBarChart" Title="Vehicles in X City" Height="300" ShowLegend="True" LegendPosition="Right">
    <controls:CartesianChart.HorizontalAxis>
        <controls:CategoryAxis />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:PictorialBarSeries Title="2023"
                                   ItemsSource="{Binding PictorialBarData}"
                                   ValuePath="Count"
                                   CategoryPath="Category"
                                   Geometry="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"
                                   RenderMode="Repeat"
                                   SymbolSize="20"
                                   SymbolSpacing="5"
                                   Fill="#6495ED" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record PictorialData(string Category, double Count);

public ObservableCollection<PictorialData> PictorialBarData { get; } = new()
{
    new("Sedan", 120),
    new("SUV", 80),
    new("Truck", 45),
    new("Electric", 30)
};
```

## Common properties (PictorialBarSeries)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Geometry` | The SVG/XAML path data for the icon. | `null` |
| `RenderMode` | `Stretch` (one icon) or `Repeat` (many icons). | `Repeat` |
| `SymbolSize` | The size of the icon in pixels. | `24` |
| `SymbolSpacing`| Padding between repeated icons. | `5` |
| `Fill` | Brush used to paint the icons. | Theme-dependent |
