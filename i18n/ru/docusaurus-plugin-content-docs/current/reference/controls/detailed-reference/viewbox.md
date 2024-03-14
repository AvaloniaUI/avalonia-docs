---
description: REFERENCE - Built-in Controls
---

import ViewboxScaleUniformBothScreenshot from '/img/reference/controls/detailed-reference/viewbox/viewbox-scale-uniform-both.gif';
import ViewboxScaleUniformFillBothScreenshot from '/img/reference/controls/detailed-reference/viewbox/viewbox-scale-uniformtofill-both.gif';
import ViewboxScaleFillBothScreenshot from '/img/reference/controls/detailed-reference/viewbox/viewbox-scale-fill-both.gif';
import ViewboxScaleNoneBothScreenshot from '/img/reference/controls/detailed-reference/viewbox/viewbox-scale-none-both.gif';

import ViewboxScaleUniformDownOnlyScreenshot from '/img/reference/controls/detailed-reference/viewbox/viewbox-uniform-downonly.gif';
import ViewboxScaleUniformUpOnlyScreenshot from '/img/reference/controls/detailed-reference/viewbox/viewbox-uniform-uponly.gif';

# Viewbox

The `Viewbox` is a container control which can scale its contents. The way in which the contents are stretched can be defined, as well as when the stretch will occur (stretch direction).

## Useful Properties

You will probably use these properties most often:

| Property           | Default | Description                                                  |
| ------------------ | ------- |--------------------------------------------------------------|
| `Stretch`          | Uniform | Determines how contents are fitted into the available space. |
| `StretchDirection` | Both    | Determines when the scaling occurs.                          |

The values for the `Stretch` property are as follows:

<table><thead><tr><th width="250">Stretch</th><th>Description</th></tr></thead><tbody><tr><td><code>Uniform</code></td><td>(Default) The content is resized to fit in the container's dimensions while preserving its native aspect ratio.</td></tr><tr><td><code>Fill</code></td><td>The content is resized to fill the container's dimensions. The aspect ratio is not preserved.</td></tr><tr><td><code>UniformToFill</code></td><td>The content is resized to completely fill the container while preserving its native aspect ratio. However, a portion of the content may be hidden if the aspect ratio of the content does not match the aspect ratio of the allocated space.</td></tr></tbody></table>

The values for the `StretchDirecton` property are as follows:

| Stretch Directon  | Description                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `UpOnly`          | Only scales the content up when the content is smaller than the available space. If the content is larger, no scaling down is done. |
| `DownOnly`        | Only scales the content down when the content is larger than the available space. If the content is smaller, no scaling up is done. |
| `Both`            | (Default) Always stretches to fit the available space according to the stretch mode.                                                |

### Example

This simple example shows a `Viewbox` scaling up a circle uniformly (both stretch and direction are default).

```xml
<Viewbox Stretch="Uniform" Width="300" Height="300">
   <Ellipse Width="50" Height="50" Fill="CornflowerBlue" />  
</Viewbox>
```

### Demonstrations

The following demonstrations show the different combinations of stretch and stretch direction property settings. This first set shows the effect of the stretch property:

<table><thead><tr><th width="275">Stretch Value</th><th>Demonstration</th></tr></thead><tbody><tr><td><code>Uniform</code></td><td><img src={ViewboxScaleUniformBothScreenshot} alt="" data-size="original"/></td></tr><tr><td><code>UniformToFill</code></td><td><img src={ViewboxScaleUniformFillBothScreenshot} alt="" data-size="original"/></td></tr><tr><td><code>Fill</code></td><td><img src={ViewboxScaleFillBothScreenshot} alt="" data-size="original"/></td></tr><tr><td><code>None</code></td><td><img src={ViewboxScaleNoneBothScreenshot} alt="" data-size="original"/></td></tr></tbody></table>

This set of demonstrations shows the effect of the stretch direction property:

<table><thead><tr><th width="276">Stretch Direction</th><th>Demonstration</th></tr></thead><tbody><tr><td><code>UpOnly</code></td><td><img src={ViewboxScaleUniformUpOnlyScreenshot} alt="" /></td></tr><tr><td><code>DownOnly</code></td><td><img src={ViewboxScaleUniformDownOnlyScreenshot} alt="" /></td></tr></tbody></table>

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Viewbox/).
:::

:::info
View the source code on _GitHub_ [`Viewbox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Viewbox.cs)
:::
