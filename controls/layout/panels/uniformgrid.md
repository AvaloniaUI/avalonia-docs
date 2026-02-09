---
id: uniformgrid
title: UniformGrid
---

# UniformGrid

The `UniformGrid` divides available space evenly into cells. You can specify how many divisions to use, and these can be different in either direction.

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

## Defining a UniformGrid in code

The following example demonstrates how to define and use a `UniformGrid` with 3 rows and 4 columns and adds 12 rectangles as child elements. Each `Rectangle` is automatically assigned to a cell in the grid in the order they were added.

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<UniformGrid Rows="3" Columns="4">
  <Rectangle Width="50" Height="50" Fill="#330000"/>
  <Rectangle Width="50" Height="50" Fill="#660000"/>
  <Rectangle Width="50" Height="50" Fill="#990000"/>
  <Rectangle Width="50" Height="50" Fill="#CC0000"/>
  <Rectangle Width="50" Height="50" Fill="#FF0000"/>
  <Rectangle Width="50" Height="50" Fill="#FF3300"/>
  <Rectangle Width="50" Height="50" Fill="#FF6600"/>
  <Rectangle Width="50" Height="50" Fill="#FF9900"/>
  <Rectangle Width="50" Height="50" Fill="#FFCC00"/>
  <Rectangle Width="50" Height="50" Fill="#FFFF00"/>
  <Rectangle Width="50" Height="50" Fill="#FFFF33"/>
  <Rectangle Width="50" Height="50" Fill="#FFFF66"/>
</UniformGrid>

```

</TabItem>
<TabItem value="cs">

```cs
// Create the UniformGrid
UniformGrid myUniformGrid = new UniformGrid();
myUniformGrid.Rows = 3;
myUniformGrid.Columns = 4;

// Define the child content
for (int i = 0; i < 12; i++)
{
    Rectangle myRectangle = new Rectangle();
    myRectangle.Fill = new SolidColorBrush(Color.FromRgb((byte)(i * 20), 0, 0));
    myRectangle.Width = 50;
    myRectangle.Height = 50;
    myUniformGrid.Children.Add(myRectangle);
}
```
</TabItem>  

</Tabs>

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Primitives_UniformGrid).
:::

:::info
View the source code on _GitHub_ [`UniformGrid.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/UniformGrid.cs)
:::



