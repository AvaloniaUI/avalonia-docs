---
id: smith-chart
title: Smith chart
description: Visualizes complex impedance or admittance on a normalized reflection-coefficient grid for radio frequency and matching analysis.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Smith charts plot normalized resistance and reactance on a specialized circular grid used in radio frequency (RF), antenna, and impedance-matching work.

## When to use

- **RF analysis**: Visualize impedance trajectories across frequency.
- **Matching networks**: Inspect how a design moves toward or away from the center match point.
- **Transmission-line work**: Review complex reflection behavior on a familiar grid.

## Code example

### XAML

```xml
<charts:SmithChart Title="Impedance trace"
                             Height="320"
                             ItemsSource="{Binding ImpedanceData}"
                             ResistancePath="Resistance"
                             ReactancePath="Reactance" />
```

### Data model (C#)

```csharp
public record ImpedancePoint(double Resistance, double Reactance);

public ObservableCollection<ImpedancePoint> ImpedanceData { get; } = new()
{
    new(0.5, -0.3),
    new(0.8, 0.1),
    new(1.2, 0.4)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of impedance points. | `null` |
| `ResistancePath` | Path to the normalized resistance value. | `null` |
| `ReactancePath` | Path to the normalized reactance value. | `null` |
| `StrokeThickness` | Thickness of the plotted trace. | `2.0` |

## See also

- [Polar chart](/controls/data-display/charts/radial/polar-chart)
- [Wind rose chart](/controls/data-display/charts/engineering/wind-rose-chart)
