---
id: kagi-chart
title: Kagi chart
description: Time-independent chart that tracks price movements using vertical lines, changing direction only when price exceeds a set reversal amount.
doc_type: reference
tags:
  - accelerate
---

import chartsFinancialKagi from '/img/controls/charts/charts-financial-kagi.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Kagi charts are time-independent charts that track price movements using vertical lines. They change direction (and line thickness) only when price reaches a certain reversal amount.

<Image light={chartsFinancialKagi} maxWidth={400} position="center" cornerRadius="true" alt="Kagi chart with thick and thin vertical lines changing direction only when price reverses by a set amount." />

## When to use
- **Pure price action**: Focusing on price changes regardless of time or volume.
- **Breakout identification**: Using the "Yang" (thick) and "Yin" (thin) lines to spot reversals.
- **Following trends**: Filtering out small fluctuations that don't meet the reversal threshold.

## Code example

### XAML
```xml
<controls:CartesianChart Title="Price Reversals" Height="300">
    <controls:CartesianChart.Series>
        <controls:KagiSeries ItemsSource="{Binding PriceData}"
                             ValuePath="Price"
                             ReversalAmount="2.5" />
    </controls:CartesianChart.Series>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
public record PricePoint(double Price);

public ObservableCollection<PricePoint> PriceData { get; } = new()
{
    new(100), new(105), new(102), new(110)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of raw price points. | `null` |
| `ValuePath` | Property representing the price. | `null` |
| `ReversalAmount`| Minimum price change required to flip direction. | `1.0` |
| `YangStroke` | Brush for the upward/bullish segments. | `Green` |
| `YinStroke` | Brush for the downward/bearish segments. | `Red` |
