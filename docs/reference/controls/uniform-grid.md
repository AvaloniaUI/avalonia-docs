---
title: UniformGrid
description: REFERENCE - Built-in Controls
---

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

<XamlPreview>

```xml
<UniformGrid xmlns="https://github.com/avaloniaui"
             Rows="1" Columns="3"
             ColumnSpacing="10"
             Margin="20">
    <Rectangle Fill="Navy" />
    <Rectangle Fill="White" />
    <Rectangle Fill="Red" />
</UniformGrid>
```

</XamlPreview>

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Primitives_UniformGrid).
:::

:::info
View the source code on _GitHub_ [`UniformGrid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/UniformGrid.cs)
:::



