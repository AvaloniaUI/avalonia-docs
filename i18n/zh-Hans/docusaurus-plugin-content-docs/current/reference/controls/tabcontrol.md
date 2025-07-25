---
description: REFERENCE - Built-in Controls
---

import TabControlZonesScreenshot from '/img/reference/controls/tabcontrol/tabcontrol-zones.png';
import TabControlNavigationScreenshot from '/img/reference/controls/tabcontrol/tabcontrol-navigation.gif';

# TabControl 选项卡控件

`TabControl` 允许您将视图细分为选项卡项。

<img src={TabControlZonesScreenshot} alt="" />

每个选项卡项都有一个标题和一个内容区。标题按它们在 XAML 中出现的顺序呈现在一个条带中。当用户点击选项卡标题时，其内容变得可见，并放置在选项卡控件的内容区中，位于选项卡条带下方。

您可以在标题和内容区中组合 UI，以满足 _Avalonia UI_ 应用程序的 UI 要求。

:::info
如果您只需要此控件的选项卡标题部分的功能，请考虑使用选项卡条带。请参见[这里](./tabstrip.md)。
:::

## 示例

这是一个简单的选项卡示例。选项卡内容只是一些文本：

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
</TabControl>
```

选项卡控件甚至可以在预览窗格中工作！

<img src={TabControlNavigationScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TabControl)。
:::

:::info
在 _GitHub_ 上查看源代码 [`TabControl.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TabControl.cs)
:::

