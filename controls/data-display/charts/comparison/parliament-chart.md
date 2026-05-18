---
id: parliament-chart
title: Parliament chart
description: Displays seat distribution in a hemicycle layout, useful for legislative composition and proportional representation.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Parliament charts arrange seats in a semicircle so party representation can be read as both totals and spatial balance.

## When to use

- **Legislative composition**: Show seat distribution by party or bloc.
- **Board representation**: Visualize committee or council membership.
- **Proportional allocation**: Present seat-based outcomes with a familiar hemicycle layout.

## Code example

### XAML

```xml
<ParliamentChart xmlns="https://github.com/avaloniaui" Title="Parliament seats"
                                  Height="320"
                                  TotalSeats="120"
                                  Parties="{Binding Parties}" />
```

### Data model (C#)

```csharp
public ObservableCollection<ParliamentParty> Parties { get; } = new()
{
    new() { Name = "Alliance", Seats = 46, Color = Colors.SteelBlue },
    new() { Name = "Coalition", Seats = 38, Color = Colors.OrangeRed },
    new() { Name = "Green", Seats = 22, Color = Colors.ForestGreen },
    new() { Name = "Independent", Seats = 14, Color = Colors.Gray }
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `TotalSeats` | Total number of seats to draw. | `100` |
| `Rows` | Number of concentric seat rows. | `4` |
| `InnerRadiusFactor` | Inner radius factor for the hemicycle. | `0.4` |
| `SeatGap` | Gap between seats. | `2.0` |
| `StartAngle` | Start angle in degrees for the left edge of the hemicycle. | `180.0` |
| `EndAngle` | End angle in degrees for the right edge of the hemicycle. | `0.0` |
| `Parties` | Collection of `ParliamentParty` items that define seat allocation. | `null` |

## Common properties (`ParliamentParty`)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Name` | Party or bloc name. | `string.Empty` |
| `Seats` | Number of seats assigned to the party. | `0` |
| `Color` | Color used to draw the party's seats. | `Gray` |

## See also

- [Pie chart](/controls/data-display/charts/circular/pie-chart)
- [Mekko chart](/controls/data-display/charts/comparison/mekko-chart)
