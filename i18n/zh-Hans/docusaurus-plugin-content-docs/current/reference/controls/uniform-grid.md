---
description: REFERENCE - Built-in Controls
---

import UniformGridFrenchFlagScreenshot from '/img/reference/controls/uniformgrid/uniformgrid-french-flag.png';

# UniformGrid 均匀网格

Uniform Grid 将可用空间在两个方向上均匀地划分为单元格。您可以指定使用多少个划分，并且这些划分在两个方向上可以不同。

然后，您可以使用附加的行和列索引属性（从零开始）将子控件分配到创建的单元格中。

## 常用属性

您可能最常使用这些属性：

<table><thead><tr><th width="261">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>Rows</code></td><td>整数。设置高度中相等行的数量。</td></tr><tr><td><code>Columns</code></td><td>整数。设置宽度中相等列的数量。</td></tr><tr><td><code>Grid.Column</code></td><td>附加到子控件以设置其列索引。</td></tr><tr><td><code>Grid.Row</code></td><td>附加到子控件以设置其行索引。</td></tr></tbody></table>

## 示例

```xml
<UniformGrid Rows="1" Columns="3" Width="300" Height="200">
    <Rectangle Fill="navy" Grid.Column="0" Grid.Row="0"/>
    <Rectangle Fill="white" Grid.Column="1" Grid.Row="0"/>
    <Rectangle Fill="red" Grid.Column="2" Grid.Row="0"/>
</UniformGrid>
```

<img src={UniformGridFrenchFlagScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[此处](https://reference.avaloniaui.net/api/Avalonia.Controls.Primitives/UniformGrid/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`UniformGrid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/UniformGrid.cs)
:::

