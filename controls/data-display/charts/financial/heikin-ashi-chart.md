---
id: heikin-ashi-chart
title: Heikin-Ashi chart
description: Modified candlestick chart that uses averaged OHLC values to filter market noise and display trends more clearly than standard candlesticks.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsFinancialHeikinashi from '/img/controls/charts/charts-financial-heikin.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Heikin-Ashi charts are a variation of Japanese candlestick charts. They use a modified formula for open, high, low, and close values to filter out market noise and show trends more clearly.

<Image light={chartsFinancialHeikinashi} maxWidth={400} position="center" cornerRadius="true" alt="Heikin-Ashi chart with smoothed candlesticks using averaged OHLC values to show market trends more clearly." />

## When to use
- **Trend identification**: Finding the beginning and end of a market trend with less volatility.
- **Swing trading**: Identifying pullbacks and reversals in volatile markets.
- **Long-term analysis**: Smoothing out day-to-day price fluctuations for a broader view.

## Code example

### XAML
```xml
<chartsEnterprise:HeikinAshiChart Title="Trend Analysis"
                                  Height="300"
                                  ItemsSource="{Binding StockData}"
                                  OpenPath="Open"
                                  HighPath="High"
                                  LowPath="Low"
                                  ClosePath="Close" />
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
| `ItemsSource` | The data source of price data. | `null` |
| `OpenPath` | Paths of the opening price. | `null` |
| `ClosePath` | Path of the closing price. | `null` |
| `HighPath` | Path of the highest price. | `null` |
| `LowPath` | Path of the lowest price. | `null` |
| `DatePath` | Path of the date or time. | `null` |
| `BullishBrush` | Color for bullish candles. | `0x4C, 0xAF, 0x50` (Green) |
| `BearishBrush` | Color for bearish candles. | `0xF4, 0x43, 0x36` (Red) |
| `CandleWidth` | Width of candles as a proportion of the available slot width. (0 to 1) | 0.7 |
