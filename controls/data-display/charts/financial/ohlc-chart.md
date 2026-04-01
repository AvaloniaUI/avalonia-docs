---
id: ohlc-chart
title: OHLC chart
description: Shows open, high, low, and close prices using vertical lines with horizontal ticks, a standard professional visualization for price data.
doc_type: reference
tags:
  - accelerate
---

import chartsFinancialOhlc from '/img/controls/charts/charts-financial-ohlc.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

OHLC charts show the Open, High, Low, and Close prices for a given period. They are similar to candlestick charts but use vertical lines with horizontal ticks to represent the range and opening/closing prices.

<Image light={chartsFinancialOhlc} maxWidth={400} position="center" cornerRadius="true" alt="OHLC chart showing open, high, low, and close prices as vertical lines with horizontal tick marks per period." />

## When to use
- **Trading analysis**: Visualizing price action without the "weight" of candlestick bodies.
- **Market trends**: Spotting trends and price ranges over specific time intervals.
- **Commodity/stock tracking**: Standard professional visualization for price data.

## Code example

### XAML
```xml
<controls:FinancialChart Name="OhlcChartSample" Title="Commodity Futures" Height="300">
    <controls:FinancialChart.Series>
        <controls:OhlcSeries ItemsSource="{Binding OhlcData}"
                             HighPath="High" LowPath="Low"
                             OpenPath="Open" ClosePath="Close"
                             CategoryPath="Date" />
    </controls:FinancialChart.Series>
</controls:FinancialChart>
```

### Data model (C#)
```csharp
public record FinancialPoint(DateTime Date, double Open, double High, double Low, double Close);

public ObservableCollection<FinancialPoint> OhlcData { get; } = new()
{
    new(DateTime.Now.AddDays(-3), 150, 155, 148, 153),
    new(DateTime.Now.AddDays(-2), 153, 158, 152, 157),
    new(DateTime.Now.AddDays(-1), 157, 159, 154, 155)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of financial data points. | `null` |
| `OpenPath` | Path to the 'Open' price property. | `null` |
| `HighPath` | Path to the 'High' price property. | `null` |
| `LowPath` | Path to the 'Low' price property. | `null` |
| `ClosePath` | Path to the 'Close' price property. | `null` |
| `Stroke` | Brush for the tick marks. | Theme-dependent |
| `StrokeThickness`| Thickness of the lines. | `1` |
