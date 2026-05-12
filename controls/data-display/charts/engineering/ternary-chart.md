---
id: ternary-chart
title: Ternary chart
description: Plots three-part compositions that sum to a constant. Useful for mixtures, resource splits, and categorical balance.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Ternary charts visualize three-component mixtures where each point represents the relative contribution of A, B, and C.

## When to use

- **Mixture analysis**: Show composition of blends, materials, or resource allocation.
- **Three-way balance**: Compare proportions that always sum to a whole.
- **Scientific classification**: Place samples within a triangular decision space.

## Code example

### XAML

```xml
<charts:TernaryChart Title="Mixture composition"
                               Height="320"
                               ItemsSource="{Binding TernaryData}"
                               APath="Sand"
                               BPath="Silt"
                               CPath="Clay"
                               ALabel="Sand"
                               BLabel="Silt"
                               CLabel="Clay" />
```

### Data model (C#)

```csharp
public record TernaryPoint(double Sand, double Silt, double Clay);

public ObservableCollection<TernaryPoint> TernaryData { get; } = new()
{
    new(60, 25, 15),
    new(35, 45, 20),
    new(20, 30, 50)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of ternary points. | `null` |
| `APath` | Path to the first component value. | `null` |
| `BPath` | Path to the second component value. | `null` |
| `CPath` | Path to the third component value. | `null` |
| `ALabel` | Label for axis A. | `null` |
| `BLabel` | Label for axis B. | `null` |
| `CLabel` | Label for axis C. | `null` |
| `ShowGridLines` | Whether to draw the ternary grid. | `true` |
| `DotSize` | Radius of the plotted points. | `5.0` |

## See also

- [Carpet plot chart](/controls/data-display/charts/engineering/carpet-plot-chart)
- [Parallel coordinates chart](/controls/data-display/charts/statistical/parallel-coordinates-chart)
