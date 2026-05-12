---
id: bubble-cloud-chart
title: Bubble cloud chart
description: Arranges sized bubbles in an organic packed layout without axes, useful for ranked categories and attention maps.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Bubble cloud charts place bubbles in a clustered, non-axis layout where size carries the main quantitative meaning.

## When to use

- **Category emphasis**: Show which categories dominate without needing precise axes.
- **Attention maps**: Surface important topics, segments, or products in a compact visual.
- **Dashboard tiles**: Add a more organic alternative to bars or tables.

## Code example

### XAML

```xml
<charts:BubbleCloud Title="Topic volume"
                      Height="320"
                      ItemsSource="{Binding Topics}"
                      LabelPath="Name"
                      ValuePath="Count" />
```

### Data model (C#)

```csharp
public record TopicBubble(string Name, double Count);

public ObservableCollection<TopicBubble> Topics { get; } = new()
{
    new("Support", 120),
    new("Billing", 75),
    new("Shipping", 55)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Collection of bubble items. | `null` |
| `LabelPath` | Path to the bubble label. | `null` |
| `ValuePath` | Path to the value used for bubble size. | `null` |
| `MinBubbleSize` | Minimum bubble radius in pixels. | `30.0` |
| `MaxBubbleSize` | Maximum bubble radius in pixels. | `80.0` |
| `IsHighlightEnabled` | Enables hover highlighting for bubbles. | `false` |

## See also

- [Packed bubble chart](/controls/data-display/charts/bubble/packed-bubble-chart)
- [Word cloud chart](/controls/data-display/charts/analytics/word-cloud-chart)
