---
description: REFERENCE - Built-in Controls
---

import SplitViewScreenshot from '/img/reference/controls/splitview/splitview.png';
import SplitViewCompactScreenshot from '/img/reference/controls/splitview/splitview-expander.gif';

# SplitView 分屏视图

分屏视图提供一个包含两个部分的容器：主内容区和侧边面板。主内容区始终可见。面板可以展开和折叠。折叠的面板可以完全隐藏，或留出稍微打开的空间——例如，有足够的空间放置一些图标按钮。

## 常用属性

你可能最常使用这些属性：

| 属性                  | 描述                                                                         |
| ------------------- | ------------------------------------------------------------------------------ |
| `PanePlacement`     | 设置面板的位置（左或右）。                                                      |
| `IsPaneOpen`        | 布尔值，默认为真。面板是否处于打开状态？                                        |
| `DisplayMode`       | 控制面板在打开和关闭状态下的显示方式。请看下文。                                  |
| `OpenPaneLength`    | 定义面板打开时的宽度。                                                          |
| `CompactPaneLength` | 定义面板关闭且显示模式为紧凑时的宽度。                                           |

显示模式属性控制面板在其打开和关闭状态下的绘制方式。有四个选项：

*   **覆盖**

    面板完全隐藏，直到被打开。打开时，面板会覆盖内容区域。
*   **内联**

    面板始终可见，宽度固定，不会覆盖内容区域。面板和内容区域分割可用的屏幕空间，但如果容器宽度变化，调整的是内容区域的大小。
*   **紧凑覆盖**

    在此模式下，面板的窄部分始终可见，宽度足以显示图标。默认的关闭面板宽度为48px，可以通过`CompactPaneLength`属性值修改。如果面板被打开，它将覆盖内容区域。
*   **紧凑内联**

    在此模式下，面板的窄部分始终可见，宽度足以显示图标。默认的关闭面板宽度为48px，可以通过`CompactPaneLength`属性值修改。如果面板被打开，它将减小内容区域的大小。

## 示例

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

控件在Windows上运行时的样子如下：

<img src={SplitViewScreenshot} alt="" />

## 紧凑显示模式

你可以使用MVVM模式与分屏视图控件和某个紧凑显示模式设置一起，实现一个“工具面板”样式的用户界面。当面板关闭时，有足够的空间显示一个打开面板的图标按钮。

<img src={SplitViewCompactScreenshot} alt="" />

:::info
要了解如何以这种方式使用分屏视图控件，请参阅[这里的指南](../../guides/development-guides/how-to-show-and-hide-a-split-view-pane-with-mvvm.md)。
:::

## 更多信息

:::info
有关此控件的完整API文档，请参见[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/SplitView/)。
:::

:::info
在_GitHub_上查看源代码 [`SplitView.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SplitView/SplitView.cs)
:::