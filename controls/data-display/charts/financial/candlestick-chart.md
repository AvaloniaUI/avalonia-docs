---
id: candlestick-chart
title: Candlestick chart
description: Displays open, high, low, and close prices per period using candle-shaped symbols, used for financial market price analysis.
doc_type: reference
tags:
  - accelerate
---

import chartsFinancialCandlestick from '/img/controls/charts/charts-financial-candlestick.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Candlestick charts are used to describe price movements of a security, derivative, or currency over time. Each candle shows the open, high, low, and close prices for a specific period.

<Image light={chartsFinancialCandlestick} maxWidth={400} position="center" cornerRadius="true" alt="Candlestick chart showing OHLC price data with green bullish and red bearish candles over several trading periods." />

## When to use
- **Market Analysis**: Visualizing price volatility and market sentiment.
- **Technical Analysis**: Identifying patterns like hammers, dojis, or engulfing candles.
- **High-Low Tracking**: Showing the full range of price action within a period.

## Code example

### XAML
```xml
<controls:FinancialChart Name="CandlestickChartSample" Title="Stock Price (ACME)" Height="300">
    <controls:FinancialChart.Series>
        <controls:CandlestickSeries ItemsSource="{Binding CandlestickData}"
                                    HighPath="High" LowPath="Low"
                                    OpenPath="Open" ClosePath="Close"
                                    CategoryPath="Date" />
    </controls:FinancialChart.Series>
</controls:FinancialChart>
```

### Data model (C#)
```csharp
public record StockData(DateTime Date, double Open, double High, double Low, double Close);

public ObservableCollection<StockData> CandlestickData { get; } = new()
{
    new(DateTime.Now.AddDays(-5), 150.2, 155.4, 149.8, 153.1),
    new(DateTime.Now.AddDays(-4), 153.1, 158.0, 152.5, 157.2),
    new(DateTime.Now.AddDays(-3), 157.2, 159.5, 156.0, 158.4)
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
| `BullishBrush` | Brush for candles where Close > Open. | `Green` |
| `BearishBrush` | Brush for candles where Close < Open. | `Red` |
