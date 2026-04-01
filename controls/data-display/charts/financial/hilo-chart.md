---
id: hilo-chart
title: Hilo chart
description: Displays the high and low prices per period as vertical lines, providing a focused view of price volatility without open or close values.
doc_type: reference
tags:
  - accelerate
---

import chartsFinancialHilo from '/img/controls/charts/charts-financial-hilo.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Hilo charts show the High and Low prices for a given period. By omitting the open and close values, they provide a focused view of the total price volatility and range.

<Image light={chartsFinancialHilo} maxWidth={400} position="center" cornerRadius="true" alt="Hilo chart showing daily price ranges as vertical lines connecting high and low values over a date range." />

## When to use
- **Volatility Analysis**: Emphasizing the spread between the highest and lowest prices.
- **Support and Resistance**: Identifying key price levels where the market struggled to move further.
- **Simplified Trading**: When a cleaner alternative to OHLC or Candlestick charts is preferred.

## Code example

### XAML
```xml
<controls:CartesianChart Name="HiloChartSample" Title="Price Range" Height="300">
    <controls:CartesianChart.HorizontalAxis>
        <controls:DateTimeAxis LabelFormat="MM/dd" Title="Date" />
    </controls:CartesianChart.HorizontalAxis>
    <controls:CartesianChart.VerticalAxis>
        <controls:NumericalAxis LabelFormat="N0" Title="Price" />
    </controls:CartesianChart.VerticalAxis>
    <controls:CartesianChart.Series>
        <controls:HiloSeries ItemsSource="{Binding HiloData}"
                             HighPath="High" LowPath="Low"
                             CategoryPath="Date"
                             Stroke="#2196F3" StrokeThickness="3" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record RangePoint(DateTime Date, double High, double Low);

public ObservableCollection<RangePoint> HiloData { get; } = new()
{
    new(DateTime.Now.AddDays(-3), 155, 148),
    new(DateTime.Now.AddDays(-2), 158, 152),
    new(DateTime.Now.AddDays(-1), 159, 154)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of price data. | `null` |
| `HighPath` | Path to the maximum price property. | `null` |
| `LowPath` | Path to the minimum price property. | `null` |
| `CategoryPath` | Path to the date/category property. | `null` |
| `Stroke` | Color of the vertical range lines. | Theme-dependent |
| `StrokeThickness`| Width of the price lines. | `2` |
