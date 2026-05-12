---
id: financial-chart
title: Financial chart
description: Container chart for financial series such as candlestick and OHLC, with shared axes and price grid rendering.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

`FinancialChart` is the host control for financial series such as `CandlestickSeries` and `OhlcSeries`. It provides the shared price grid, axes, and horizontal category layout used by those series. Compatible overlay series, such as `MovingAverageSeries`, can render in the same date and price coordinate space.

## When to use

- **Financial series hosting**: Combine one or more price-based series in a dedicated chart container.
- **Trading views**: Reuse the shared financial axes and price grid across different series types.
- **Series comparison**: Overlay compatible financial series against the same horizontal axis.

## Code example

### XAML

```xml
<charts:FinancialChart Title="Commodity futures" Height="300">
    <charts:FinancialChart.Series>
        <charts:OhlcSeries ItemsSource="{Binding OhlcData}"
                             DatePath="Date"
                             OpenPath="Open"
                             HighPath="High"
                             LowPath="Low"
                             ClosePath="Close" />
    </charts:FinancialChart.Series>
</charts:FinancialChart>
```

### Data model (C#)

```csharp
using System;

public record FinancialPoint(DateTime Date, double Open, double High, double Low, double Close);

public ObservableCollection<FinancialPoint> OhlcData { get; } = new(GenerateFinancialData(30));

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

Financial series date values can be `DateTime`, `DateTimeOffset`, or a string that can be parsed as a date.

When `HorizontalAxis` is a `DateTimeAxis`, its minimum, maximum, and label formatting are applied to the financial date domain. Financial charts keep equal slot spacing for visible trading periods rather than using elapsed calendar time as the horizontal distance.

Custom overlay series can render in the financial chart coordinate space by implementing `IFinancialChartOverlaySeries`. Implement `IFinancialChartOverlayBoundsProvider` when overlay values should contribute to price-axis bounds. `FinancialOverlayRenderContext` provides the financial data, date-to-index map, visible price bounds, resolved brushes, and helpers such as `TryDateToX`, `ValueToY`, and `TryValueToPoint`.

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `Series` | Content collection of financial series and compatible overlay series rendered in the chart. | Empty collection |
| `HorizontalAxis` | Horizontal axis used for date or category positions. | `null` |
| `VerticalAxis` | Vertical axis used for price values. | `null` |
| `GridLineBrush` | Default brush used for grid lines when an axis does not set its own gridline brush. | `null` |
| `AxisBrush` | Brush used for axis lines and ticks. | `null` |
| `PlotAreaBackground` | Optional background brush for the plot area. | `null` |
| `IsHighlightEnabled` | Enables hover highlighting for financial data points when the series does not enable it directly. | `false` |

## See also

- [Candlestick chart](/controls/data-display/charts/financial/candlestick-chart)
- [OHLC chart](/controls/data-display/charts/financial/ohlc-chart)
- [Trendline chart](/controls/data-display/charts/shared-elements/trendline-chart)
