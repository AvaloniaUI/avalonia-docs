---
description: REFERENCE - Built-in Controls
---

import TabStripNavigation from '/img/reference/controls/tabstrip/tabstrip-navigation.gif';

# TabStrip 选项卡头条带

显示一条选项卡头的条带。您可以将此控件用作水平菜单。

选项卡条由 `<TabItem>` 元素组成。这些元素按它们在 XAML 中出现的顺序显示。

## 有用的属性

您可能最常使用此属性：

<table><thead><tr><th width="244">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>TabItem.Header</code></td><td>选项卡的文本。</td></tr></tbody></table>

## 示例

```xml
<TabStrip Margin="5">
  <TabItem Header="Tab 1"/>
  <TabItem Header="Tab 2"/>
  <TabItem Header="Tab 3"/>
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

