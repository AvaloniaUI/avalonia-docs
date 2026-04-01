---
id: range-area-chart
title: Range area chart
description: Displays a filled area connecting high and low values per category, suitable for visualizing uncertainty, price bands, or temperature ranges.
doc_type: reference
tags:
  - accelerate
---

import chartsCartesianRangearea from '/img/controls/charts/charts-cartesian-rangearea.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Range area charts display a filled area connecting two values (high and low) for each category. They are perfect for visualizing uncertainty, price envelopes, or temperature variations.

<Image light={chartsCartesianRangearea} maxWidth={400} position="center" cornerRadius="true" alt="Range area chart with a filled band between high and low temperature values across days of the week." />

## When to use
- **Error margins**: Showing the confidence interval or error range around a mean value.
- **Price envelopes**: Visualizing daily highs and lows in a single series.
- **Temperature ranges**: Showing the minimum and maximum temperature over a period.

## Code example

### XAML
```xml
<controls:CartesianChart Title="Temperature Forecast" Height="250">
     <controls:CartesianChart.Series>
        <controls:RangeAreaSeries Title="Range"
                                ItemsSource="{Binding TempRanges}"
                                HighValuePath="Max"
                                LowValuePath="Min"
                                Fill="#B46495ED" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record TempRange(string Day, double Min, double Max);

public ObservableCollection<TempRange> TempRanges { get; } = new()
{
    new("Mon", 12, 24),
    new("Tue", 15, 28),
    new("Wed", 10, 22),
    new("Thu", 14, 26)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | The name of the series. | `null` |
| `ItemsSource` | The collection of range data points. | `null` |
| `HighValuePath` | Path to the maximum value property. | `null` |
| `LowValuePath` | Path to the minimum value property. | `null` |
| `Fill` | Brush used to fill the area between points. | Theme-dependent |
| `Stroke` | Color of the boundary lines. | `Transparent` |
