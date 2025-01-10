---
description: REFERENCE - Built-in Controls
---

import TabStripNavigation from '/img/reference/controls/tabstrip/tabstrip-navigation.gif';

# TabStrip 选项卡头条带

显示一条选项卡头的条带。您可以将此控件用作水平菜单。

选项卡条由 `<TabStripItem>` 元素组成。这些元素按它们在 XAML 中出现的顺序显示。

## 示例

```xml
<TabStrip Margin="5">
  <TabStripItem>Tab 1</TabStripItem>
  <TabStripItem>Tab 2</TabStripItem>
  <TabStripItem>Tab 3</TabStripItem>
</TabStrip>
```

在 Windows 上运行时，它看起来像这样：

<img src={TabStripNavigation} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](http://reference.avaloniaui.net/api/Avalonia.Controls.Primitives/TabStrip/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`TabStrip.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/TabStrip.cs)
:::

