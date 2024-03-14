---
description: REFERENCE - Built-in Controls
---

import TabControlZonesScreenshot from '/img/reference/controls/detailed-reference/tabcontrol/tabcontrol-zones.png';
import TabControlNavigationScreenshot from '/img/reference/controls/detailed-reference/tabcontrol/tabcontrol-navigation.gif';

# Tab Control

The tab control allows you to sub-divide a view into tab items.

<img src={TabControlZonesScreenshot} alt="" />

Each tab item has a header and a content zone. The headers are presented in a strip, in the sequence they occur in the XAML. When the user clicks on a tab header, its content becomes visible, and is placed below the tab strip in the content zone of the tab control.

You can compose the UI in both the header and content zones to suit the UI requirements of your _Avalonia UI_ app.

:::info
If you only need the function of the tab headers part of this control, consider using the tab strip instead. See [here](tabstrip.md).
:::

## Examples

This is simple tab example. The tab content is just some text: 

```xml
<TabControl Margin="5">
  <TabItem Header="Tab 1">
    <TextBlock Margin="5">This is tab 1 content</TextBlock>
  </TabItem>
  <TabItem Header="Tab 2">
    <TextBlock Margin="5">This is tab 2 content</TextBlock>
  </TabItem>
  <TabItem Header="Tab 3">
    <TextBlock Margin="5">This is tab 3 content</TextBlock>
  </TabItem>
</TabControl> Some code
```

The tab control even works in the preview pane!

<img src={TabControlNavigationScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/TabControl/).
:::

:::info
View the source code on _GitHub_ [`TabControl.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TabControl.cs)
:::
