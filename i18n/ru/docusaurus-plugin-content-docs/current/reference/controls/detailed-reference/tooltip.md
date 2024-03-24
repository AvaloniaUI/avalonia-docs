---
description: REFERENCE - Built-in Controls
---

import ToolTipTextHoverScreenshot from '/img/reference/controls/detailed-reference/tooltip/tooltip-text-hover.gif';
import ToolTipContentScreenshot from '/img/reference/controls/detailed-reference/tooltip/tooltip-content-hover.gif';

# Tool Tip

The tool tip is a popup that shows its content when the user hovers over the 'host' control to which it is attached.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="298">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>ToolTip.Tip</code></td><td>Attached property for the tooltip contents.</td></tr><tr><td><code>ToolTip.Placement</code></td><td>Defines the placement for the tooltip relative to the host or the pointer. Choose from top, bottom, left, right, anchor and gravity, pointer. The default value is pointer which places the tip content at the position where the pointer stops moving.</td></tr><tr><td><code>ToolTip.HorizontalOffset</code></td><td>The tooltip horizontal offset from the placement (default 0).</td></tr><tr><td><code>ToolTip.VerticalOffset</code></td><td>The tooltip vertical offset from the placement (default 20).</td></tr><tr><td><code>ToolTip.ShowDelay</code></td><td>The amount of time the pointer has to be still before the tooltip appears. In microseconds (default 400).</td></tr></tbody></table>

## Examples

This is a simple text-based tooltip, using default values for the placement and delay properties; this rectangle is placed in a window with larger dimensions:

```xml
<Rectangle Fill="Aqua" Height="200" Width="400"
            ToolTip.Tip="This is a rectangle" />
```

<img src={ToolTipTextHoverScreenshot} alt="" />

To provide a richer presentation for a tooltip, use a `<ToolTip.Tip>` element. For example:

```xml
<Rectangle Fill="Aqua" Height="200" Width="400"
    ToolTip.Placement="Bottom">
    <ToolTip.Tip>
      <StackPanel>
        <TextBlock FontSize="16">Rectangle</TextBlock>
        <TextBlock>Some explanation here.</TextBlock>
      </StackPanel>
    </ToolTip.Tip>
</Rectangle>
```

<img src={ToolTipContentScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/ToolTip/).
:::

:::info
View the source code on _GitHub_ [`ToolTip.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ToolTip.cs)
:::
