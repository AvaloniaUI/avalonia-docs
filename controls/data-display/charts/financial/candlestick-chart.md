---
id: candlestick-chart
title: Candlestick chart
description: Displays open, high, low, and close prices per period using candle-shaped symbols, used for financial market price analysis.
doc-type: reference
tags:
  - avalonia pro
---

import chartsFinancialCandlestick from '/img/controls/charts/charts-financial-candlestick.png';

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Candlestick charts are used to describe price movements of a security, derivative, or currency over time. Each candle shows the open, high, low, and close prices for a specific period.

<Image light={chartsFinancialCandlestick} maxWidth={400} position="center" cornerRadius="true" alt="Candlestick chart showing OHLC price data with green bullish and red bearish candles over several trading periods." />

## When to use
- **Market analysis**: Visualizing price volatility and market sentiment.
- **Technical analysis**: Identifying patterns like hammers, dojis, or engulfing candles.
- **High-low tracking**: Showing the full range of price action within a period.

## Code example

### XAML
```xml
<charts:FinancialChart Name="CandlestickChartSample" Title="Stock Price (ACME)" Height="300">
    <charts:FinancialChart.Series>
        <charts:CandlestickSeries ItemsSource="{Binding CandlestickData}"
                                    HighPath="High" LowPath="Low"
                                    OpenPath="Open" ClosePath="Close"
                                    DatePath="Date" />
    </charts:FinancialChart.Series>
</charts:FinancialChart>
```

### Data model (C#)
```csharp
using System;

public record FinancialPoint(DateTime Date, double Open, double High, double Low, double Close);

public ObservableCollection<FinancialPoint> CandlestickData { get; } = new(GenerateFinancialData(50));

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
| `ItemsSource` | The collection of financial data points. | `null` |
| `OpenPath` | Path to the 'Open' price property. | `null` |
| `HighPath` | Path to the 'High' price property. | `null` |
| `LowPath` | Path to the 'Low' price property. | `null` |
| `ClosePath` | Path to the 'Close' price property. | `null` |
| `DatePath` | Path to the date or time value used along the horizontal axis. Values can be `DateTime`, `DateTimeOffset`, or parseable date strings. | `null` |
| `UpFill` | Fill brush for candles where `Close >= Open`. | `#4CAF50` |
| `DownFill` | Fill brush for candles where `Close < Open`. | `#F44336` |
| `UpStroke` | Outline brush for candles where `Close >= Open`. | `#4CAF50` |
| `DownStroke` | Outline brush for candles where `Close < Open`. | `#F44336` |
| `CandleWidth` | Width of each candle as a fraction of the available slot. | `0.8` |

## See also

- [Financial chart](/controls/data-display/charts/financial/financial-chart)
- [OHLC chart](/controls/data-display/charts/financial/ohlc-chart)
