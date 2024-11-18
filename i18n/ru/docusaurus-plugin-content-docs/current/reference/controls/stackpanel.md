---
description: REFERENCE - Built-in Controls
---

import StackPanelVerticalRectanglesScreenshot from '/img/reference/controls/stackpanel/stackpanel-vertical-rectangles.png';

# Stack Panel

The stack panel arranges its child controls by stacking them horizontally or vertically. The stack panel is often used to arrange a small subsection of the UI on a page.

Inside a stack panel, if the size property perpendicular to the stack on a child control is not set, the child control will stretch to fill the available space. For example in horizontal orientation, the height of child controls will stretch if not set.

In the direction of the stack, the stack panel will always expand to fit all the child controls.

## Useful Properties

You will probably use these properties most often:

| Property      | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| `Orientation` | Sets the direction of the stack. Choose from horizontal or vertical (default). |
| `Spacing`     | Creates an even spacing between the child controls.                            |

## Example

The following XAML shows how to create a vertical stack panel.

```xml
<StackPanel Width="200">
    <Rectangle Fill="Red" Height="50"/>
    <Rectangle Fill="Blue" Height="50"/>
    <Rectangle Fill="Green" Height="100"/>
    <Rectangle Fill="Orange" Height="50"/>
</StackPanel>
```

The result shows the child controls stretched to fit the width, and the overall height of the stack panel equal to the sum of the child control heights.

<img src={StackPanelVerticalRectanglesScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/StackPanel/).
:::

:::info
View the source code on _GitHub_ [`StackPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/StackPanel.cs)
:::
