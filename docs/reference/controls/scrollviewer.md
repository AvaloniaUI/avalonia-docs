---
title: ScrollViewer
description: REFERENCE - Built-in Controls
---

import ScrollViewerScreenshot from '/img/reference/controls/scrollviewer/scrollviewer.gif';

# ScrollViewer

The `ScrollViewer` control can have content that is bigger than its content zone, and will can provide scroll bars to move hidden content into view.

A `ScrollViewer` cannot be contained in a control that has infinite height or width (depending on scrolling direction) such as a `StackPanel`. To avoid it, you can either set fixed Height/Width or MaxHeight/MaxWidth or choose another container panel.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="288">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>AllowAutoHide</code></td><td>Boolean, default is true. Sets whether the scroll bar hides itself automatically when the pointer is not over, or it does not have the focus. </td></tr><tr><td><code>ScrollViewer</code>. <code>IsScrollChainingEnabled</code></td><td>Boolean, default is true. Attached to an inner controlSee below for more details. </td></tr></tbody></table>

## Scroll Chaining

If you have a control that can itself scroll (see list below) nested inside a scroll viewer, and the user hits a limit on the control, this property sets whether the outer scroll viewer should continue scrolling or not. You enable or disable this behaviour with an attached property on the inner control, using the format:

`ScrollViewer.IsScrollChainingEnabled=[true|false]`

This attached property is available on these controls:

* Scroll Viewer
* Data Grid
* List Box
* Text Box
* Tree View

## Example

This example creates a stack panel that is bigger than the border it is inside. The scroll viewer automatically creates a vertical scroll bar.

```xml
<Border Background="AliceBlue" Width="300" Height="300">
  <ScrollViewer>
    <StackPanel>
      <TextBlock FontSize="22" Height="100" Background="LightBlue">Block 1</TextBlock>
      <TextBlock FontSize="22" Height="100">Block 2</TextBlock>
      <TextBlock FontSize="22" Height="100" Background="LightBlue">Block 3</TextBlock>
      <TextBlock FontSize="22" Height="100">Block 4</TextBlock>
      <TextBlock FontSize="22" Height="100" Background="LightBlue">Block 5</TextBlock>
    </StackPanel>
  </ScrollViewer>
</Border>
```

<img src={ScrollViewerScreenshot} alt="" />

## More Information

:::info
For the complete API documentation, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/ScrollViewer/).
:::

:::info
View the source code on _GitHub_ [`ScrollViewer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ScrollViewer.cs)
:::

