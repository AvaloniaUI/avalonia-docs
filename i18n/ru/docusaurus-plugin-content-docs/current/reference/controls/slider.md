---
description: REFERENCE - Built-in Controls
---

import SliderScreenshot from '/img/reference/controls/slider/slider.gif';
import SliderMaxValueScreenshot from '/img/reference/controls/slider/slider-max-value.gif';

# Slider

The slider control presents its numerical value as the relative position of a slider button along the length of a track. The position is relative to maximum and minimum values.

Drag interaction on the slider button can alter the value between the maximum and minimum values. Keyboard and click interactions can also nudge the value.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="197">Property</th><th>Description</th></tr></thead><tbody><tr><td>Maximum</td><td>Sets the maximum value.</td></tr><tr><td>Minimum</td><td>Sets the minimum value.</td></tr></tbody></table>

## Example

In this example the slider value is displayed in the text block below, using binding to a control.

:::info
To review how to bind one control to another, see the guide [here](../../guides/data-binding/binding-to-controls.md).
:::

Here the maximum and minimum values are default (0 and 100 respectively).

```xml
<StackPanel Margin="20">
  <TextBlock Text="{Binding #slider.Value}" 
              HorizontalAlignment="Center"/>
  <Slider x:Name="slider" />
</StackPanel>
```

The slider looks like this on Windows:

<img src={SliderScreenshot} alt="" />

## More Information

For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Slider/).

View the source code on _GitHub_ [`Slider.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Slider.cs)
