---
id: heikin-ashi-chart
title: Heikin-Ashi chart
description: Modified candlestick chart that uses averaged OHLC values to filter market noise and display smoothed trend direction compared with standard candlesticks.
doc-type: reference
tags:
  - avalonia pro
---

import chartsFinancialHeikinashi from '/img/controls/charts/charts-financial-heikin.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Heikin-Ashi charts are a variation of Japanese candlestick charts. They use a modified formula for open, high, low, and close values to filter out market noise and show smoothed trend direction.

<Image light={chartsFinancialHeikinashi} maxWidth={400} position="center" cornerRadius="true" alt="Heikin-Ashi chart with smoothed candlesticks using averaged OHLC values to show market trend direction." />

## When to use
- **Trend identification**: Finding the beginning and end of a market trend with less volatility.
- **Swing trading**: Identifying pullbacks and reversals in volatile markets.
- **Long-term analysis**: Smoothing out day-to-day price fluctuations for a broader view.

## Code example

### XAML
```xml
<HeikinAshiChart xmlns="https://github.com/avaloniaui" Name="HeikinAshiChartSample" Title="Smoothed Price Trend" Height="300"
                                              ItemsSource="{Binding HeikinAshiData}"
                                              HighPath="High" LowPath="Low"
                                              OpenPath="Open" ClosePath="Close"
                                              DatePath="Date" />
```

### Data model (C#)
```csharp
using System;

public record FinancialPoint(DateTime Date, double Open, double High, double Low, double Close);

public ObservableCollection<FinancialPoint> HeikinAshiData { get; } = new(GenerateFinancialData(40));

private static IEnumerable<FinancialPoint> GenerateFinancialData(int count)
{
    var date = DateTime.Today.AddDays(-count);
    var price = 100.0;
    var random = new Random(42);

    for (var i = 0; i < count; i++)
    {
        var open = price;
        var close = open + (random.NextDouble() - 0.5) * 5;
        var high = Math.Max(open, close) + random.NextDouble() * 2;
        var low = Math.Min(open, close) - random.NextDouble() * 2;

        yield return new FinancialPoint(date.AddDays(i), open, high, low, close);
        price = close;
    }
}
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The data source of price data. | `null` |
| `OpenPath` | Paths of the opening price. | `null` |
| `ClosePath` | Path of the closing price. | `null` |
| `HighPath` | Path of the highest price. | `null` |
| `LowPath` | Path of the lowest price. | `null` |
| `DatePath` | Path of the date or time value associated with each item. | `null` |
| `BullishBrush` | Color for bullish candles. | `0x4C, 0xAF, 0x50` (Green) |
| `BearishBrush` | Color for bearish candles. | `0xF4, 0x43, 0x36` (Red) |
| `CandleWidth` | Width of candles as a proportion of the available slot width, from `0` to `1`. | `0.7` |
