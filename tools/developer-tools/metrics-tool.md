---
id: metrics-tool
title: Metrics tool
---

Metrics are numerical measurements reported over time. They are typically used to monitor the health of an app and generate alerts.

Meter providers were introduced with .NET 6. More libraries and parts of .NET itself (such as HttpClient) are starting to support it, providing useful diagnostic measurements.

There are several main types of metric instruments:
- Counter - a measurement representing a single value that can only grow. Typically representing "total" values, like total raised exceptions count.
- UpDownCounter - similar to Counter, but allowing negative increments. For example, Memory Working Set.  
- Histogram - distribution of measurements. Frame render or HTTP request duration is an example. `Developer Tools` also displays useful P50 (median), P90 and P95 percentiles for histograms.
- Gauge - a measurement without historical data. Only displays latest value. **Note**: not supported by `Developer Tools` at the moment.

![Histogram](/img/tools/dev-tools/metrics-histogram.png)

## Disabling/Enabling default sources

By default, `Developer Tools` is configured to only accept `Avalonia` and `System.Runtime` meters providers.

It's possible to disable them or enable another by clicking "+" button.
All instruments are grouped by their meter provider, typically a namespace defining name.

Keep in mind, this list is dynamic. New instruments are added only when provider has pushed at least single measurement. For example, HttpClient (`System.Http` namespace) instruments will be displayed only after the first request.

![Meters Filter](/img/tools/dev-tools/meters-filter.png)

:::note

Note, `Avalonia` meters are available from 11.3.0 version of the framework. And `System.Runtime` only from .NET 9.
If your application doesn't meet neither of these two requirements, by default, you will see empty list of meters.

:::


## Writing custom metric sources


You can follow .NET [Creating metrics](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/metrics-instrumentation) documentation on how to write custom metric sources which then can be previewed in the `Developer Tools` or the official `dotnet-counters` console tool.

Simplest example can be something of sorts:

```csharp
static Meter s_meter = new Meter("SimpleToDoList");
static UpDownCounter<int> s_tasksCount = s_meter.CreateUpDownCounter<int>("tasks.count");
static Counter<int> s_tasksResolved = s_meter.CreateCounter<int>("tasks.resolved.total");

private void OnTaskAdded() => s_tasksCount.Add(1);
private void OnTaskRemoved() => s_tasksCount.Add(-1);
private void OnTaskResolved() => s_tasksResolved.Add(1);
```

Once code has pushed at least one measurement, this `SimpleToDoList` will be visible in the "+" button flyout to be displayed in the tool.
