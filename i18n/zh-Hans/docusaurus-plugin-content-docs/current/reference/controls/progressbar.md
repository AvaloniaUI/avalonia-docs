---
description: REFERENCE - Built-in Controls
---

import ProgressBarScreenshot from '/img/reference/controls/progressbar/progressbar.png';

# Progress Bar

The progress bar presents a value as a proportionately filled bar, with the option to show a caption.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="241">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Minimum</code></td><td>Minimum value.</td></tr><tr><td><code>Maximum</code></td><td>Maximum value.</td></tr><tr><td><code>Value</code></td><td>Current value.</td></tr><tr><td><code>Foreground</code></td><td>The bar color.</td></tr><tr><td><code>ShowProgressText</code></td><td>Determines if the progress bar shows the value as a caption.</td></tr></tbody></table>

:::warning
The progress caption always shows the value with a percentage sign. This is only correct when the maximum to minimum range is 0 to 100.
:::

## Example

```xml
<StackPanel Margin="20">
  <ProgressBar  Margin="0 10" Height="20" 
                Minimum="0" Maximum="100" Value="14"
                ShowProgressText="True"/>
  <ProgressBar  Margin="0 10" Height="20"
                Minimum="0" Maximum="100" Value="92"
                Foreground="Red"
                ShowProgressText="True"/>
</StackPanel>
```

<img src={ProgressBarScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/ProgressBar/).
:::

:::info
View the source code on _GitHub_ [`ProgressBar.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ProgressBar.cs)
:::
