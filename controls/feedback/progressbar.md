---
id: progressbar
title: ProgressBar
description: A horizontal or vertical bar that displays a value as a filled proportion, with optional text caption and indeterminate mode for unknown progress.
doc-type: reference
---

The `ProgressBar` presents a value as a proportionately filled bar with the option to show a caption. You can use it to indicate the completion status of long-running operations such as file downloads, installations, or data processing tasks.

## Useful properties

You will probably use these properties most often:

| Property             | Description                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------------|
| `Minimum`            | The minimum value of the range. Defaults to `0`.                                                |
| `Maximum`            | The maximum value of the range. Defaults to `100`.                                              |
| `Value`              | The current value within the range.                                                             |
| `IsIndeterminate`    | When `true`, the bar displays an animated indicator instead of a filled proportion.             |
| `Orientation`        | Sets the bar direction. Use `Horizontal` (default) or `Vertical`.                               |
| `Foreground`         | The brush used to paint the filled portion of the bar.                                          |
| `ShowProgressText`   | When `true`, the progress bar overlays a text caption showing the current progress.             |
| `ProgressTextFormat` | A format string that controls how the progress text is rendered. See the section below.         |

## Example

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Margin="20">
  <ProgressBar  Margin="0 10" Height="20"
                Minimum="0" Maximum="100" Value="14"
                ShowProgressText="True"/>
  <ProgressBar  Margin="0 10" Height="20"
                Minimum="0" Maximum="100" Value="92"
                Foreground="Red"
                ShowProgressText="True"/>
</StackPanel>
```

</XamlPreview>

## Indeterminate mode

When the total amount of work is unknown, set `IsIndeterminate` to `True`. The bar displays a looping animation instead of a filled proportion, signaling that work is in progress without committing to a specific completion percentage.

```xml
<ProgressBar IsIndeterminate="True" Height="20" />
```

This is useful for operations such as connecting to a remote server, waiting for an external process, or loading data of unknown size.

To switch back to determinate mode, set `IsIndeterminate` to `False` and update `Value` as your operation progresses:

```xml
<ProgressBar IsIndeterminate="{Binding IsLoading}"
             Value="{Binding Progress}"
             Minimum="0" Maximum="100"
             Height="20" />
```

## Customizing progress text with `ProgressTextFormat`

By default, `ShowProgressText` displays the percentage completion calculated from
[`Value`](/api/avalonia/controls/primitives/rangebase/value),
[`Minimum`](/api/avalonia/controls/primitives/rangebase/minimum), and
[`Maximum`](/api/avalonia/controls/primitives/rangebase/maximum). You can customize the displayed text by setting `ProgressTextFormat` to a format string. The string is passed to [`string.Format`](https://docs.microsoft.com/en-us/dotnet/api/system.string.format#system-string-format(system-string-system-object())) with the following format items:

| Index | Description                                                                                                    |
|-------|----------------------------------------------------------------------------------------------------------------|
| `0`   | The current `Value`.                                                                                           |
| `1`   | The value expressed as a percentage from 0 to 100 (for example, `Minimum = 0`, `Maximum = 50`, `Value = 25` yields `50`). |
| `2`   | The `Minimum` value.                                                                                           |
| `3`   | The `Maximum` value.                                                                                           |

| Min | Max | Value | `ProgressTextFormat`                | Output                       |
|-----|-----|-------|-------------------------------------|------------------------------|
| 0   | 20  | 17    | `{}{0}/{3} Tasks Complete ({1:0}%)` | `17/20 Tasks Complete (85%)` |

Because `{0}` would appear at the start of the string in this example, you must escape it with a leading `{}`.

## Vertical orientation

You can display the progress bar vertically by setting the `Orientation` property:

```xml
<ProgressBar Orientation="Vertical" Height="200" Width="20"
             Minimum="0" Maximum="100" Value="65"
             ShowProgressText="True" />
```

## Binding to a view model

Bind `Value` to a property in your view model to track progress from an async operation:

```xml
<ProgressBar Minimum="0" Maximum="100"
             Value="{Binding DownloadProgress}"
             ShowProgressText="True"
             ProgressTextFormat="{}{1:0}%" />
```

```csharp
[ObservableProperty]
private double _downloadProgress;

public async Task DownloadFileAsync()
{
    for (int i = 0; i <= 100; i += 10)
    {
        await Task.Delay(500);
        DownloadProgress = i;
    }
}
```

## Styling

You can restyle the `ProgressBar` through theme resources or by targeting its template parts. The control exposes the following key template parts:

| Part name              | Description                                           |
|------------------------|-------------------------------------------------------|
| `PART_Indicator`       | The `Border` element that represents the filled area. |
| `PART_ProgressBarText` | The `TextBlock` that displays the progress caption.   |

To change the track background or indicator color, override the relevant theme resources or set properties directly:

```xml
<ProgressBar Height="20" Value="60" Maximum="100"
             Foreground="Green"
             Background="LightGray" />
```

For more advanced customization, you can provide a complete `ControlTheme`:

```xml
<ProgressBar Height="20" Value="50" Maximum="100">
  <ProgressBar.Styles>
    <Style Selector="ProgressBar /template/ Border#PART_Indicator">
      <Setter Property="CornerRadius" Value="4" />
    </Style>
  </ProgressBar.Styles>
</ProgressBar>
```

## See also

- [Slider](../value-selectors/slider.md)
- [ProgressBar API reference](/api/avalonia/controls/progressbar)
- [`ProgressBar.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ProgressBar.cs)
