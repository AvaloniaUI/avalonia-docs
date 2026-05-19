---
id: packed-bubble-chart
title: Packed bubble chart
description: Displays sized bubbles packed tightly without axes, useful for proportional category comparisons in a compact area.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Packed bubble charts show category magnitude through bubble size while packing circles tightly into a single frame.

## When to use

- **Part-to-whole views**: Compare categories by size without a bar chart.
- **Compact dashboards**: Fit many categories into a square card.
- **Label-first comparisons**: Keep category names inside the bubbles when space allows.

## Code example

### XAML

```xml
<PackedBubbleChart xmlns="https://github.com/avaloniaui" Title="Segment size"
                            Height="320"
                            ItemsSource="{Binding Segments}"
                            LabelPath="Name"
                            ValuePath="Value"
                            ShowLabels="True" />
```

### Data model (C#)

```csharp
public record SegmentBubble(string Name, double Value);

public ObservableCollection<SegmentBubble> Segments { get; } = new()
{
    new("Desktop", 42),
    new("Mobile", 30),
    new("Web", 18)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of bubble items. | `null` |
| `ValuePath` | Path to the value used for bubble size. | `null` |
| `LabelPath` | Path to the bubble label. | `null` |
| `MinBubbleSize` | Minimum bubble size in pixels. | `20.0` |
| `MaxBubbleSize` | Maximum bubble size in pixels. | `80.0` |
| `ShowLabels` | Whether to draw labels inside bubbles when space allows. | `true` |
| `LabelFontSize` | Base font size for bubble labels. The rendered size is constrained by each bubble radius. | `12.0` |
| `LabelForeground` | Brush used for bubble labels. When `null`, labels use white. | `null` |
| `IsHighlightEnabled` | Enables hover highlighting for bubbles. | `false` |

## See also

- [Bubble cloud chart](/controls/data-display/charts/bubble/bubble-cloud-chart)
- [Bubble chart](/controls/data-display/charts/bubble/bubble-chart)
