---
id: export-chart
title: Chart export
description: Exports chart controls to PNG or JPEG files, PNG streams, or an interactive save dialog using asynchronous APIs.
doc-type: reference
tags:
  - avalonia pro
---

:::info
[Charts](/controls/data-display/charts) are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

Chart controls inherit export APIs from `ChartBase`. Use `ExportAsync` to render the current chart view to an image file, PNG stream, or save dialog.

## When to use

- **Reports**: Save a chart image for a generated report.
- **User exports**: Let users save the current chart view from an app.
- **Snapshots**: Render chart images for a workflow that needs a bitmap output.

## Code example

### Export to file

```csharp
var result = await chart.ExportAsync("sales-chart.png", width: 1200, height: 800, dpi: 144);

if (!result.Succeeded)
{
    // Use result.Canceled or result.Exception to handle the outcome.
}
```

### Export to stream

```csharp
await using var stream = System.IO.File.Create("sales-chart.png");
var result = await chart.ExportAsync(stream, width: 1200, height: 800);
```

## Methods

| Method | Description | Result |
| :--- | :--- | :--- |
| `ExportAsync(string path, int? width = null, int? height = null, double dpi = 96, CancellationToken cancellationToken = default)` | Exports to a file path. If the path has no extension, `.png` is appended. PNG and JPEG are supported for file export. | `ChartExportResult` |
| `ExportAsync(Stream stream, int? width = null, int? height = null, double dpi = 96, CancellationToken cancellationToken = default)` | Exports a PNG image to a stream. | `ChartExportResult` |
| `ExportAsync(CancellationToken cancellationToken = default)` | Opens a save-file picker and exports to the chosen file. | `ChartExportResult` |

## Result and events

| Member | Description |
| :--- | :--- |
| `ChartExportResult.Succeeded` | `true` when export completed successfully. |
| `ChartExportResult.Canceled` | `true` when export was canceled. |
| `ChartExportResult.Target` | File path or target description, such as `stream`. |
| `ChartExportResult.Exception` | Exception that caused a failed export, if any. |
| `ExportCompleted` | Raised after a successful export. Event data exposes `Result` and `Target`. |
| `ExportFailed` | Raised after a failed export. Event data exposes `Target` and `Exception`. |

## Notes

- `width` and `height` default to the chart bounds. They must resolve to positive values.
- Cancellation returns a canceled `ChartExportResult` and does not raise `ExportFailed`.
- Invalid paths, invalid dimensions, and stream errors return a failed `ChartExportResult` and raise `ExportFailed`.

## See also

- [Interactions](/controls/data-display/charts/shared-elements/interactions-chart)
- [Legend](/controls/data-display/charts/shared-elements/legend-chart)
