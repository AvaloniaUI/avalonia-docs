---
id: annotations-chart
title: Annotations
description: Adds contextual lines, bands, shapes, and text to charts for highlighting thresholds, milestones, or regions of interest.
doc_type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import chartsFeaturesAnnotation from '/img/controls/charts/charts-annotations.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

Annotations allow you to add context to your charts using lines, bands, shapes, and custom text. They are useful for highlighting thresholds, milestones, or specific regions of interest.

<Image light={chartsFeaturesAnnotation} maxWidth={400} position="center" cornerRadius="true" alt="Chart with annotation overlays including a horizontal threshold line, a shaded comfort zone band, and a custom text label." />

## When to use
- **Thresholds**: Showing a "target" or "limit" line on a performance chart.
- **Milestones**: Marking specific dates of interest on a timeline.
- **Region highlighting**: Shading a "danger zone" or "comfort zone" across a set of values.

## Code example

### XAML
```xml
<controls:CartesianChart Name="ReferenceLinesChart" Height="300">
    <controls:CartesianChart.Annotations>
        <!-- Horizontal Reference Line -->
        <controls:LineAnnotation Value="75" Orientation="Horizontal" Stroke="Red" StrokeThickness="2" Label="Threshold (75)" />
        <!-- Shaded Range -->
        <controls:BandAnnotation FromValue="20" ToValue="26" Orientation="Horizontal" Label="Comfort Zone">
            <controls:BandAnnotation.Fill>
                <SolidColorBrush Color="#32008000" />
            </controls:BandAnnotation.Fill>
        </controls:BandAnnotation>
        <!-- Custom Text -->
        <controls:TextAnnotation X="15" Y="90" Text="High Importance" Foreground="DarkBlue" />
    </controls:CartesianChart.Annotations>
</controls:CartesianChart>
```

### Data model (C#)
```csharp
// Annotations are typically defined in XAML,
// but can be bound to properties for dynamic values.
public double AlertThreshold { get; set; } = 75.0;
```

## Common properties (LineAnnotation)

| Property | Description | Default |
| :--- | :--- | :--- |
| `Value` | The numeric or category value where the line is placed. | `0` |
| `Orientation` | `Horizontal` or `Vertical`. | `Horizontal` |
| `Stroke` | Color of the annotation line. | `Black` |
| `StrokeThickness` | Width of the annotation line. | `1` |
| `Label` | Text displayed next to the line. | `null` |

## Common properties (BandAnnotation)

| Property | Description | Default |
| :--- | :--- | :--- |
| `FromValue` | The starting value of the band. | `0` |
| `ToValue` | The ending value of the band. | `0` |
| `Orientation` | `Horizontal` or `Vertical`. | `Horizontal` |
| `Fill` | The brush used to fill the shaded area. | Semi-transparent |
