---
id: mirror-bar-chart
title: Mirror bar chart
description: Places two bar series back to back around a center line, useful for demographic and side-by-side comparisons.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Mirror bar charts draw two bar series on opposite sides of a center line, so each category can be compared symmetrically.

## When to use

- **Back-to-back comparison**: Compare two populations, regions, or product groups per category.
- **Demographic layouts**: Show opposing distributions, such as male and female by age band.
- **Two-sided ranking**: Contrast paired measures without stacking or grouping bars.

## Code example

### XAML

```xml
<MirrorBarChart xmlns="https://github.com/avaloniaui" Title="Regional comparison"
                         Height="320"
                         ItemsSource="{Binding MirrorData}"
                         LabelPath="Category"
                         LeftValuePath="West"
                         RightValuePath="East"
                         LeftTitle="West"
                         RightTitle="East" />
```

### Data model (C#)

```csharp
public record MirrorBarItem(string Category, double West, double East);

public ObservableCollection<MirrorBarItem> MirrorData { get; } = new()
{
    new("Q1", 22, 18),
    new("Q2", 28, 24),
    new("Q3", 19, 27)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of mirrored comparison items. | `null` |
| `LeftValuePath` | Path to the value rendered on the left side. | `null` |
| `RightValuePath` | Path to the value rendered on the right side. | `null` |
| `LabelPath` | Path to the category label. | `null` |
| `LeftBrush` | Brush used for left bars. | `#E91E63` |
| `RightBrush` | Brush used for right bars. | `#2196F3` |
| `BarHeight` | Bar height as a fraction of the row height. | `0.7` |
| `CenterGap` | Gap between the two mirrored sides. | `40.0` |
| `LeftTitle` | Optional title for the left side. | `null` |
| `RightTitle` | Optional title for the right side. | `null` |
| `IsHighlightEnabled` | Enables hover highlighting for mirrored bars. | `false` |

## See also

- [Population pyramid chart](/controls/data-display/charts/comparison/population-pyramid-chart)
- [Tornado chart](/controls/data-display/charts/comparison/tornado-chart)
