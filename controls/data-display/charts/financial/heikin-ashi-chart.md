---
id: heikin-ashi-chart
title: Heikin-Ashi chart
description: Modified candlestick chart that uses averaged OHLC values to filter market noise and display trends more clearly than standard candlesticks.
doc_type: reference
tags:
  - accelerate
---

import chartsFinancialHeikinashi from '/img/controls/charts/charts-financial-heikin.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Heikin-Ashi charts are a variation of Japanese candlestick charts. They use a modified formula for open, high, low, and close values to filter out market noise and show trends more clearly.

<Image light={chartsFinancialHeikinashi} maxWidth={400} position="center" cornerRadius="true" alt="Heikin-Ashi chart with smoothed candlesticks using averaged OHLC values to show market trends more clearly." />

## When to use
- **Trend Identification**: Finding the beginning and end of a market trend with less volatility.
- **Swing Trading**: Identifying pullbacks and reversals in volatile markets.
- **Long-term Analysis**: Smoothing out day-to-day price fluctuations for a broader view.

## Code example

### XAML
```xml
<controls:CartesianChart Name="HeikinAshiChart" Title="Trend Analysis" Height="300">
    <controls:CartesianChart.Series>
        <controls:HeikinAshiSeries ItemsSource="{Binding StockData}"
                                  OpenPath="Open" HighPath="High"
                                  LowPath="Low" ClosePath="Close" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record StockQuote(DateTime Date, double Open, double High, double Low, double Close);

public ObservableCollection<StockQuote> StockData { get; } = new()
{
    new(DateTime.Now.AddDays(-2), 150, 155, 148, 152),
    new(DateTime.Now.AddDays(-1), 152, 158, 151, 156)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of price data. | `null` |
| `OpenPath` / `ClosePath` | Paths to the price values. | `null` |
| `HighPath` / `LowPath` | Paths to the extent values. | `null` |
| `RisingBrush` | Color for upward "smoothed" candles. | `Green` |
| `FallingBrush` | Color for downward "smoothed" candles. | `Red` |
