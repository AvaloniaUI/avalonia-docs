---
description: REFERENCE - Built-in Controls
---

import ScrollBarScreenshot from '/img/reference/controls/scrollbar/scrollbar.gif';

# ScrollBar 滚动条

滚动条控件可以显示为水平或垂直方向。滚动条的默认值（双精度类型）范围是 0-100。

您可以配置范围以及值的变化方式（小步和大步）。小步可以通过键盘箭头键控制，大步可以通过鼠标点击滚动条轨道，或者通过页面向上和向下键来控制。

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="241">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Orientation</code></td><td>滚动条的方向。</td></tr><tr><td><code>VerticalAlignment</code></td><td>滚动条在其容器中的垂直对齐方式。可选择顶部、底部、居中和拉伸。</td></tr><tr><td><code>HorizontalAlignment</code></td><td>滚动条在其容器中的水平对齐方式。可选择左侧、右侧、居中和拉伸。</td></tr></tbody></table>

:::warning
要创建合理的布局，您需要使用相应的方向和对齐属性。例如，垂直方向与水平对齐相匹配。
:::

## 示例

```xml
<Panel>
  <Border Background="AliceBlue">
    <ScrollBar Visibility="Auto" 
             HorizontalAlignment="Left" 
             Scroll="ScrollHandler"></ScrollBar>
  </Border>
  <TextBlock Name="valueText" Margin="60">0</TextBlock>
</Panel>
```

```csharp title='C#'
using Avalonia.Controls;
using Avalonia.Controls.Primitives;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public void ScrollHandler(object source, ScrollEventArgs args)
        {
            valueText.Text = args.NewValue.ToString();
        }
    }
}
```

通过示例代码，文本块显示滚动条的值。

<img src={ScrollBarScreenshot} alt="" />

## 更多信息

:::info
要查看此控件的完整 API 文档，请参见[这里](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Primitives_ScrollBar)。
:::

:::info
在 _GitHub_ 上查看源代码 [`ScrollBar.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/ScrollBar.cs)
:::