---
title: SplitView
description: REFERENCE - Built-in Controls
---

import SplitViewScreenshot from '/img/reference/controls/splitview/splitview.png';
import SplitViewCompactScreenshot from '/img/reference/controls/splitview/splitview-expander.gif';

# SplitView

A `SplitView` presents a container with two parts: the main content zone and a side pane. The main content zone is always visible. The pane can be expanded and collapsed. The collapsed pane can be completely hidden, or left slightly open - with enough space to host some icon buttons for example. 

## Useful Properties

You will probably use these properties most often:

| Property            | Description                                                                      |
| ------------------- | -------------------------------------------------------------------------------- |
| `PanePlacement`     | Sets the position of the pane (left or right).                                   |
| `IsPaneOpen`        | Boolean, default is true. Is the pane in its open state?                         |
| `DisplayMode`       | Controls how the pane is drawn in its open and closed states. See below.         |
| `OpenPaneLength`    | Defines the width of the pane when it is open.                                   |
| `CompactPaneLength` | Defines the width of the pane when it is closed and the display mode is compact. |

The display mode property controls how the pane is drawn in its open and closed states. There are four options:

*   **Overlay**

    The pane is completely hidden until opened. When open, the pane overlays the content area.
*   **Inline**

    The pane is always visible, is a fixed width, and does not overlay the content area. The pane and content areas divide the available screen real estate, but if the container changes width, it is the content zone that resizes.
*   **Compact Overlay**

    A narrow portion of the pane is always visible in this mode, which is just wide enough to show icons. The default closed pane width is 48px, which can be modified with the `CompactPaneLength`property value. If the pane is opened, it will overlay the content area.
*   **Compact Inline**

    A narrow portion of the pane is always visible in this mode, which is just wide enough to show icons. The default closed pane width is 48px, which can be modified with `CompactPaneLength` property value. If the pane is opened, it will reduce the size of the content zone.

## Example

```xml
<SplitView IsPaneOpen="True"
           DisplayMode="Inline"
           OpenPaneLength="300">
    <SplitView.Pane>
        <TextBlock Text="Pane"
                   FontSize="24"
                   VerticalAlignment="Center"
                   HorizontalAlignment="Center"/>
    </SplitView.Pane>

    <Grid>
        <TextBlock Text="Content"
                   FontSize="24"
                   VerticalAlignment="Center"
                   HorizontalAlignment="Center"/>
    </Grid>
</SplitView>
```

The control looks like this, running on Windows:

<img src={SplitViewScreenshot} alt="" />

## Compact Display Mode

You can use the MVVM pattern with the split view control and one of the compact display mode settings to implement a 'tool pane' style UI. There is enough room on the pane when it is closed to display an icon button that opens the pane.

<img src={SplitViewCompactScreenshot} alt="" />

:::info
To learn how to use the split view control in this way, see the guide [here](../../guides/development-guides/how-to-show-and-hide-a-split-view-pane-with-mvvm.md).
:::

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/SplitView/).
:::

:::info
View the source code on _GitHub_ [`SplitView.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SplitView/SplitView.cs)
:::
