---
id: progressbar
title: ProgressBar
---

The `ProgressBar` control allow for showing dynamic progress status.

### Customizing the progress text

When [`ShowProgressText`](http://reference.avaloniaui.net/api/Avalonia.Controls/ProgressBar/590A8B3E) is `true`, text on the progress bar will be displayed.

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/progressbar/progressbar (1).png" alt="Basic Progress Bar" />
  </div>

By default this text shows the percentage completion, according to the [`Value`](http://reference.avaloniaui.net/api/Avalonia.Controls.Primitives/RangeBase/E111DF5B), [`Minimum`](http://reference.avaloniaui.net/api/Avalonia.Controls.Primitives/RangeBase/8F9BD1EA) and [`Maximum`](http://reference.avaloniaui.net/api/Avalonia.Controls.Primitives/RangeBase/C07B22E9). The format of this text can be customised by using the `ProgressTextFormat` property. This expects a string which will be passed to a [`string.Format`](https://docs.microsoft.com/en-us/dotnet/api/system.string.format#system-string-format(system-string-system-object())) call with the value of `ProgressTextFormat` as the format string. The following format items are available at the given indices:

* 0 = Value
* 1 = Value as a Percentage from 0 to 100 (e.g. `Minimum = 0`, `Maximum = 50`, `Value = 25`, then `Percentage = 50`)
* 2 = Minimum
* 3 = Maximum

#### Progress Text Format Example

|Min |Max |Value |Format String                    |Output                       |
|----|----|------|---------------------------------|-----------------------------|
|0   |20  |17    |`{0}/{3} Tasks Complete ({1:0}%)`|`17/20 Tasks Complete (85%)` |

### Reference <a id="reference"></a>

[ProgressBar](http://reference.avaloniaui.net/api/Avalonia.Controls/ProgressBar/)

### Source code <a id="source-code"></a>

[ProgressBar.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ProgressBar.cs)