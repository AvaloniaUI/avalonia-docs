---
description: REFERENCE - Built-in Controls
---

import TransitioningContentControlFadeScreenshot from '/img/reference/controls/transitioningcontentcontrol/transitioningcontentcontrol-fade.webp';
import TransitioningContentControlSlideScreenshot from '/img/reference/controls/transitioningcontentcontrol/transitioningcontentcontrol-slide.webp';

# TransitioningContentControl 切换内容控件

切换内容控件可以使用页面过渡来为内部控件的内容更改添加动画。

您可以使用此控件在幻灯片中显示不同图像的集合。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="332">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Content</code></td><td>要在控件中显示的内容。</td></tr><tr><td><code>TransitioningContentControl.ContentTemplate</code></td><td>用于显示内容的数据模板。</td></tr><tr><td><code>TransitioningContentControl.PageTransition</code></td><td>用于为内容更改添加动画的页面过渡。应用的主题将提供默认的页面过渡。要禁用过渡，请将此属性设置为 null。</td></tr></tbody></table>

## 示例

在此示例中，视图模型包含一个不同图像的集合，以在幻灯片中显示它们。以下 XAML 将使用默认的页面过渡来更改图像（在数据模板中），每当绑定的 `SelectedImage` 属性更改时：

```xml
<TransitioningContentControl Content="{Binding SelectedImage}" >
    <TransitioningContentControl.ContentTemplate>
        <DataTemplate DataType="Bitmap">
            <Image Source="{Binding}" />
        </DataTemplate>
    </TransitioningContentControl.ContentTemplate>
</TransitioningContentControl>
```

<img src={TransitioningContentControlFadeScreenshot} alt="" />

在此示例中，指定了不同的页面过渡以水平滑动图像：

```xml
<TransitioningContentControl Content="{Binding SelectedImage}" >
    <TransitioningContentControl.PageTransition>
        <PageSlide Orientation="Horizontal" Duration="0:00:00.500" />
    </TransitioningContentControl.PageTransition>
    <TransitioningContentControl.ContentTemplate>
        <DataTemplate DataType="Bitmap">
            <Image Source="{Binding}"  />
        </DataTemplate>
    </TransitioningContentControl.ContentTemplate>
</TransitioningContentControl>
```

<img src={TransitioningContentControlSlideScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[此处](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TransitioningContentControl)。
:::

:::info
在 _GitHub_ 上查看源代码 [`TransitioningContentControl.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TransitioningContentControl.cs)
:::

