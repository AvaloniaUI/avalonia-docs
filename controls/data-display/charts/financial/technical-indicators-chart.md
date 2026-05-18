---
id: technical-indicators-chart
title: Technical indicators for charts
description: Overlays SMA, EMA, WMA, Bollinger Bands, and other technical indicators on Cartesian charts to analyze trends and volatility in financial or time-series data.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Technical indicators are analytical overlays added to a `CartesianChart` to help identify trends, momentum, and volatility in data. They compute derived values from a target series and render the results directly on the chart. Indicators are added to the `TechnicalIndicators` collection on `CartesianChart`.

Indicators follow the target series axis context. This includes continuous horizontal axes and secondary Y-axis scaling when the target series uses `YAxisPosition="Secondary"`.

## When to use
- **Trend analysis**: Smoothing noisy price or sensor data with moving averages, such as simple moving average (SMA), exponential moving average (EMA) or weighted moving average (WMA).
- **Volatility assessment**: Visualizing standard deviation bands around a moving average with Bollinger Bands.
- **Financial charting**: Adding standard technical analysis overlays to candlestick or OHLC charts.

## Code example

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Title="Stock Analysis" Height="400">
    <CartesianChart.Series>
        <CandlestickSeries x:Name="PriceSeries"
                                     ItemsSource="{Binding StockData}"
                                     DatePath="Date"
                                     OpenPath="Open" HighPath="High"
                                     LowPath="Low" ClosePath="Close" />
    </CartesianChart.Series>
    <CartesianChart.TechnicalIndicators>
        <SMAIndicator TargetSeries="{Binding #PriceSeries}"
                               Period="20" Stroke="Orange" StrokeThickness="2" />
        <BollingerBandsIndicator TargetSeries="{Binding #PriceSeries}"
                                          Period="20" StandardDeviations="2"
                                          Stroke="Blue" StrokeThickness="1"
                                          UpperBandStroke="Gray" LowerBandStroke="Gray">
            <BollingerBandsIndicator.BandFill>
                <SolidColorBrush Color="#33808080" />
            </BollingerBandsIndicator.BandFill>
        </BollingerBandsIndicator>
    </CartesianChart.TechnicalIndicators>
</CartesianChart>
```

### Data model (C#)
```csharp
public record StockPoint(string Date, double Open, double High, double Low, double Close);

public ObservableCollection<StockPoint> StockData { get; } = new()
{
    new("Jan", 100, 110, 95, 105),
    new("Feb", 105, 115, 100, 112),
    new("Mar", 112, 120, 108, 118),
    // ...
};
```

## Common properties (`ChartTechnicalIndicator`)

These properties are shared by all technical indicator types.

| Property | Description | Default |
| :--- | :--- | :--- |
| `TargetSeries` | The `CartesianSeries` this indicator is computed from. | `null` |
| `IsVisible` | Whether the indicator is visible. | `true` |
| `Stroke` | Brush used for the main indicator line. | `Blue` |
| `StrokeThickness` | Thickness of the indicator line. | `2.0` |
| `StrokeDashStyle` | Dash style for the indicator line. Type is `DashStyle?`. | `null` |
| `StrokeLineCap` | Line cap style for the indicator line. | `Round` |
| `StrokeLineJoin` | Line join style for the indicator line. | `Round` |
| `Title` | Name shown in the chart legend and tooltips. | Varies by indicator |

## Common properties (`SMAIndicator`)

The simple moving average (SMA) calculates the unweighted mean of the previous *n* data points. It is the basic smoothing technique.

| Property | Description | Default |
| :--- | :--- | :--- |
| `Period` | Number of data points used in the moving average window. | `14` |
| `Title` | Legend and tooltip title. | `"SMA"` |

### XAML

```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Height="250">
    <CartesianChart.Series>
        <LineSeries x:Name="PriceSeries"
                           ItemsSource="{Binding StockData}"
                           ValuePath="Close" />
    </CartesianChart.Series>
    <CartesianChart.TechnicalIndicators>
        <SMAIndicator TargetSeries="{Binding #PriceSeries}"
                             Period="20" Stroke="Orange" StrokeThickness="2" />
    </CartesianChart.TechnicalIndicators>
</CartesianChart>
```

## Common properties (`EMAIndicator`)

The exponential moving average (EMA) gives more weight to recent data points, making it more responsive to new information than an SMA.

| Property | Description | Default |
| :--- | :--- | :--- |
| `Period` | Number of data points used in the EMA calculation. | `14` |
| `Title` | Legend and tooltip title. | `"EMA"` |

### XAML

```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Height="250">
    <CartesianChart.Series>
        <LineSeries x:Name="PriceSeries"
                           ItemsSource="{Binding StockData}"
                           ValuePath="Close" />
    </CartesianChart.Series>
    <CartesianChart.TechnicalIndicators>
        <EMAIndicator TargetSeries="{Binding #PriceSeries}"
                             Period="12" Stroke="Green" StrokeThickness="2" />
    </CartesianChart.TechnicalIndicators>
</CartesianChart>
```

## Common properties (`WMAIndicator`)

The weighted moving average (WMA) assigns linearly increasing weights to data points, with the most recent point receiving the highest weight.

| Property | Description | Default |
| :--- | :--- | :--- |
| `Period` | Number of data points used in the WMA calculation. | `14` |
| `Title` | Legend and tooltip title. | `"WMA"` |

### XAML

```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Height="250">
    <CartesianChart.Series>
        <LineSeries x:Name="PriceSeries"
                           ItemsSource="{Binding StockData}"
                           ValuePath="Close" />
    </CartesianChart.Series>
    <CartesianChart.TechnicalIndicators>
        <WMAIndicator TargetSeries="{Binding #PriceSeries}"
                             Period="14" Stroke="Purple" StrokeThickness="2" />
    </CartesianChart.TechnicalIndicators>
</CartesianChart>
```

## Common properties (`BollingerBandsIndicator`)

Bollinger Bands consist of a simple moving average (middle band) and two standard deviation bands (upper and lower). They are used to measure volatility and identify overbought or oversold conditions.

When shown in a chart legend, `BollingerBandsIndicator` creates a line item for the middle SMA and a band item for the upper and lower bands.

| Property | Description | Default |
| :--- | :--- | :--- |
| `Period` | Number of data points for the moving average calculation. | `20` |
| `StandardDeviations` | Number of standard deviations for the upper and lower bands. | `2.0` |
| `UpperBandStroke` | Brush for the upper band line. | `Gray` |
| `LowerBandStroke` | Brush for the lower band line. | `Gray` |
| `BandFill` | Brush used to fill the area between the upper and lower bands. | Semi-transparent `Gray` |
| `Title` | Legend and tooltip title. | `"Bollinger Bands"` |

### XAML
```xml
<CartesianChart xmlns="https://github.com/avaloniaui" Height="250">
    <CartesianChart.Series>
        <LineSeries x:Name="PriceSeries"
                           ItemsSource="{Binding StockData}"
                           ValuePath="Close" />
    </CartesianChart.Series>
    <CartesianChart.TechnicalIndicators>
        <BollingerBandsIndicator TargetSeries="{Binding #PriceSeries}"
                                        Period="20" StandardDeviations="2"
                                        Stroke="Blue" StrokeThickness="1"
                                        UpperBandStroke="LightGray"
                                        LowerBandStroke="LightGray">
            <BollingerBandsIndicator.BandFill>
                <SolidColorBrush Color="#20808080" />
            </BollingerBandsIndicator.BandFill>
        </BollingerBandsIndicator>
    </CartesianChart.TechnicalIndicators>
</CartesianChart>
```

## See also

- [Trendline chart](/controls/data-display/charts/shared-elements/trendline-chart)
- [Line chart](/controls/data-display/charts/cartesian/line-chart)
- [Axis customization](/controls/data-display/charts/shared-elements/axis-customization-chart)
