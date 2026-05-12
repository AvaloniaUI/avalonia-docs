---
id: flame-graph
title: Flame graph
description: Visualizes hierarchical stack or call data from bottom to top, commonly used for profiling and trace analysis.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Flame graphs display hierarchical cost, duration, or sample data as stacked rectangles, with the root at the bottom and deeper calls above it.

## When to use

- **Profiler output**: Show CPU, memory, or duration hot spots in a call tree.
- **Trace inspection**: Understand where time accumulates in nested operations.
- **Hierarchical cost review**: Compare depth and width across expensive branches.

## Code example

### XAML

```xml
<charts:FlameGraph Title="CPU profile"
                             Height="320"
                             ItemsSource="{Binding StackTraceData}"
                             ValuePath="Duration"
                             LabelPath="MethodName"
                             ChildrenPath="SubCalls" />
```

### Data model (C#)

```csharp
public class FlameNode
{
    public string MethodName { get; set; } = string.Empty;
    public double Duration { get; set; }
    public ObservableCollection<FlameNode> SubCalls { get; set; } = new();
}

public ObservableCollection<FlameNode> StackTraceData { get; } = new()
{
    new FlameNode
    {
        MethodName = "Program.Main",
        Duration = 2000,
        SubCalls =
        {
            new FlameNode
            {
                MethodName = "App.OnFrameworkInitializationCompleted",
                Duration = 1950,
                SubCalls =
                {
                    new FlameNode { MethodName = "App.Initialize", Duration = 50 },
                    new FlameNode { MethodName = "Window.Show", Duration = 100 },
                    new FlameNode { MethodName = "Dispatcher.MainLoop", Duration = 1800 }
                }
            }
        }
    }
};
```

## Common properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | Root collection for the flame graph. | `null` |
| `ValuePath` | Path to the value that controls rectangle width. | `null` |
| `LabelPath` | Path to the item label. | `null` |
| `ChildrenPath` | Path to the child collection. | `null` |

## See also

- [Treemap chart](/controls/data-display/charts/hierarchy/treemap-chart)
- [Flow chart](/controls/data-display/charts/hierarchy/flow-chart)
