---
id: population-pyramid-chart
title: Population pyramid chart
description: Shows two population distributions back to back by age band or another ordered category.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Population pyramid charts visualize two opposing distributions, most often male and female populations across age groups.

## When to use

- **Demographic analysis**: Compare age distribution by sex or region.
- **Segment comparison**: Show paired distributions across ordered bands.
- **Planning views**: Surface concentration in younger or older cohorts quickly.

## Code example

### XAML

```xml
<charts:PopulationPyramidChart Title="Age distribution"
                                 Height="350"
                                 ItemsSource="{Binding PopulationData}"
                                 AgeLabelPath="AgeGroup"
                                 MaleValuePath="Male"
                                 FemaleValuePath="Female" />
```

### Data model (C#)

```csharp
public record PopulationBand(string AgeGroup, double Male, double Female);

public ObservableCollection<PopulationBand> PopulationData { get; } = new()
{
    new("0-9", 12, 11),
    new("10-19", 14, 13),
    new("20-29", 16, 17)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of population bands. | `null` |
| `AgeLabelPath` | Path to the band label. | `null` |
| `MaleValuePath` | Path to the left-side population value. | `null` |
| `FemaleValuePath` | Path to the right-side population value. | `null` |
| `MaleBrush` | Brush used for the left-side bars. | `null` |
| `FemaleBrush` | Brush used for the right-side bars. | `null` |
| `BarGap` | Gap between adjacent bars. | `2.0` |
| `ShowLabels` | Whether to show the band labels along the center line. | `true` |
| `LabelFontSize` | Font size used for the band labels. | `10.0` |
| `IsHighlightEnabled` | Enables hover highlighting for population bands. | `false` |

## See also

- [Mirror bar chart](/controls/data-display/charts/comparison/mirror-bar-chart)
- [Tornado chart](/controls/data-display/charts/comparison/tornado-chart)
