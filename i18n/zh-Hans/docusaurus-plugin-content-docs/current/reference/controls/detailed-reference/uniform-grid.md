---
description: REFERENCE - Built-in Controls
---

import UniformGridFrenchFlagScreenshot from '/img/reference/controls/uniformgrid/uniformgrid-french-flag.png';

# Uniform Grid

The uniform grid divides the available space evenly in both directions, into cells. You can specify how many divisions to use, and these can be different in either direction.

You can then allocate child controls to the cells created, using attached row and column index properties (zero-based).

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Rows</code></td><td>Integer. Sets the number of equal rows in the height.</td></tr><tr><td><code>Columns</code></td><td>Integer. Sets the number of equal columns in the width</td></tr><tr><td><code>Grid.Column</code></td><td>Attached to a child control to set its column index.</td></tr><tr><td><code>Grid.Row</code></td><td>Attached to a child control to set its row index.</td></tr></tbody></table>

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
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Primitives_UniformGrid).
:::

:::info
View the source code on _GitHub_ [`UniformGrid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/UniformGrid.cs)
:::



