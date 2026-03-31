---
id: renko-chart
title: Renko Chart
description: Uses fixed-size bricks to represent price movements, filtering out time and minor volatility to clarify trends and support/resistance levels.
doc_type: reference
tags:
  - accelerate
---

import chartsFinancialRenko from '/img/controls/charts/charts-financial-renko.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Renko charts are made of "bricks" that represent a fixed price movement. A new brick is only added if price moves by the specified brick size, filtering out time and minor volatility.

<Image light={chartsFinancialRenko} maxWidth={400} position="center" cornerRadius="true" alt="Renko chart displaying fixed-size green and red bricks representing price movements above a set threshold." />

## When to Use
- **Support & Resistance**: Identifying clear levels where bricks frequently reverse.
- **Trend Confirmation**: Spotting persistent bullish/bearish brick sequences.
- **Clean Visualization**: Simplifying complex, noisy price data into uniform blocks.

## Code Example

### XAML
```xml
<controls:CartesianChart Title="Fixed-Size Bricks" Height="300">
    <controls:CartesianChart.Series>
        <controls:RenkoSeries ItemsSource="{Binding StockPoints}"
                             ValuePath="Close"
                             BrickSize="5.0" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data Model (C#)
```csharp
public record PriceRecord(double Close);

public ObservableCollection<PriceRecord> StockPoints { get; } = new()
{
    new(150), new(155), new(162), new(158)
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of price data. | `null` |
| `BrickSize` | The price movement required for a new brick. | `1.0` |
| `ValuePath` | Property name for the price value. | `null` |
| `UpBrush` | Color for bullish bricks. | `Green` |
| `DownBrush` | Color for bearish bricks. | `Red` |
