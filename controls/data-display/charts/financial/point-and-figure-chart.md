---
id: point-and-figure-chart
title: Point and figure
description: Uses columns of Xs and Os to represent price movements, filtering out time and focusing on trend reversals.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsFinancialPointandfigure from '/img/controls/charts/charts-financial-point-figure.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Point and Figure (P&F) charts use columns of Xs and Os to represent rising and falling prices. They filter out time and small price changes, focusing solely on pure price movement and trend reversals.

<Image light={chartsFinancialPointandfigure} maxWidth={400} position="center" cornerRadius="true" alt="Point and figure chart with columns of X marks for rising prices and O marks for falling prices filtering out time." />

## When to use
- **Long-term trends**: Visualizing macro-economic or multi-year market shifts.
- **Support/resistance**: Identifying clear supply and demand zones.
- **Price targets**: Using traditional P&F counting methods for price projections.

## Code example

### XAML
```xml
<controls:CartesianChart Title="Xs and Os Chart" Height="400">
    <controls:CartesianChart.Series>
        <controls:PointAndFigureSeries ItemsSource="{Binding Quotes}"
                                      ValuePath="Price"
                                      BoxSize="2.0"
                                      ReversalAmount="3" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record Trade(double Price);

public ObservableCollection<Trade> Quotes { get; } = new()
{
    new(100), new(104), new(101), new(112)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of price data. | `null` |
| `BoxSize` | The price movement represented by one X or O. | `1.0` |
| `ReversalAmount`| Number of boxes required to start a new column. | `3` |
| `XBrush` | Brush for the X marks. | `Green` |
| `OBrush` | Brush for the O marks. | `Red` |
