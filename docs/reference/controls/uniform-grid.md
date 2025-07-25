---
title: UniformGrid
description: REFERENCE - Built-in Controls
---

import UniformGridFrenchFlagScreenshot from '/img/reference/controls/uniformgrid/uniformgrid-french-flag.png';

# UniformGrid

The `UniformGrid` divides the available space evenly in both directions, into cells. You can specify how many divisions to use, and these can be different in either direction.

## Useful Properties

You will probably use these properties most often:

<table>
  <thead>
    <tr>
      <th width="261">Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Rows</code></td>
      <td>Integer. Sets the number of equal rows in the height.</td>
    </tr>
    <tr>
      <td><code>Columns</code></td>
      <td>Integer. Sets the number of equal columns in the width</td>
    </tr>
  </tbody>
</table>

## Example

```xml
<UniformGrid Rows="1" Columns="3" Width="300" Height="200">
    <Rectangle Fill="navy" />
    <Rectangle Fill="white" />
    <Rectangle Fill="red" />
</UniformGrid>
```

<img src={UniformGridFrenchFlagScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Primitives_UniformGrid).
:::

:::info
View the source code on _GitHub_ [`UniformGrid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/UniformGrid.cs)
:::



