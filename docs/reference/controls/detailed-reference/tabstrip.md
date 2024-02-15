---
title: TabStrip
description: REFERENCE - Built-in Controls
---

import TabStripNavigation from '/img/reference/controls/detailed-reference/tabstrip/tabstrip-navigation.gif';

# TabStrip

Displays a strip of tab headers. You can use this control as a horizontal menu.

The tab strip is comprised `<TabItem>` elements. These are displayed in the sequence that they appear in the XAML. 

## Useful Property

You will probably use this property most often:

<table><thead><tr><th width="244">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>TabItem.Header</code></td><td>The text for the tab.</td></tr></tbody></table>

## Example

```xml
<TabStrip Margin="5">
  <TabItem Header="Tab 1"/>
  <TabItem Header="Tab 2"/>
  <TabItem Header="Tab 3"/>
</TabStrip>
```

It looks like this running on Windows:

<img src={TabStripNavigation} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls.Primitives/TabStrip/).
:::

:::info
View the source code on _GitHub_ [`TabStrip.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/TabStrip.cs)
:::
