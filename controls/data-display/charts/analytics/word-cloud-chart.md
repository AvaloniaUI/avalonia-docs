---
id: word-cloud-chart
title: Word cloud
description: Represents text data by varying word size based on frequency or importance, providing a visual summary of qualitative content.
doc_type: reference
tags:
  - accelerate
---

import chartsAnalyticsWordCloud from '/img/controls/charts/charts-analytics-word-cloud.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Word clouds represent text data by varying word size based on frequency or importance. They provide an immediate visual summary of qualitative content or popular topics.

<Image light={chartsAnalyticsWordCloud} maxWidth={400} position="center" cornerRadius="true" alt="Word cloud displaying words at varying font sizes based on frequency, with more prominent words appearing larger." />

## When to use
- **Search Trends**: Visualizing the most common keywords in a query log.
- **Sentiment Analysis**: Highlighting prominent words in customer reviews.
- **Content Summarization**: Showing the main themes of a long article or document.

## Code example

### XAML
```xml
<controls:WordCloudChart Title="Popular Topics" Height="300"
                         ItemsSource="{Binding WordCloudData}"
                         WordPath="Word" WeightPath="Count"/>
```

### Data model (C#)
```csharp
public record WordWeight(string Word, double Count);

public ObservableCollection<WordWeight> WordCloudData { get; } = new()
{
    new("Avalonia", 100),
    new("Charts", 85),
    new("Cross-platform", 70),
    new("Performance", 60),
    new("XAML", 50)
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The collection of word/weight data. | `null` |
| `WordPath` | Property name for the actual text word. | `null` |
| `WeightPath` | Numerical property determining font size. | `null` |
| `MinFontSize` | Smallest font size in pixels. | `10` |
| `MaxFontSize` | Largest font size in pixels. | `40` |
