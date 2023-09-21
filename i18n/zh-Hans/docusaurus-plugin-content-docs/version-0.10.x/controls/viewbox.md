---
id: viewbox
title: Viewbox
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ViewboxScaleUniformBothScreenshot from '/img/controls/viewbox/scale-uniform-both.gif';
import ViewboxScaleUniformFillBothScreenshot from '/img/controls/viewbox/scale-uniformtofill-both.gif';
import ViewboxScaleFillBothScreenshot from '/img/controls/viewbox/scale-fill-both.gif';
import ViewboxScaleNoneBothScreenshot from '/img/controls/viewbox/scale-none-both.gif';

import ViewboxScaleUniformUpOnlyScreenshot from '/img/controls/viewbox/scale-uniform-uponly.gif';
import ViewboxScaleUniformDownOnlyScreenshot from '/img/controls/viewbox/scale-uniform-downonly.gif';

The `Viewbox` is a decorator control which scales its child. It can be used to scale its child to fit the available space.

The `Viewbox` gives its child infinite space in the measure phase. It will constrain either or both sides when arranging it. This depends on the value of the `Stretch`.

To restrict scaling direction one can use `StretchDirection` which can prevent up or down scaling.

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<!-- Ellipse will occupy 50x50px space -->
<Ellipse Width="50" Height="50" Fill="CornflowerBlue" />  

<!-- Ellipse will be scaled to occupy 300x300px space -->
<Viewbox Stretch="Uniform" Width="300" Height="300">
	<Ellipse Width="50" Height="50" Fill="CornflowerBlue" />  
</Viewbox>
```

</TabItem>
<TabItem value="cs">

```cs
// Ellipse will occupy 50x50px space
new Ellipse
{
	Width = 50,
	Height = 50,
	Fill = Brushes.CornflowerBlue
};

// Ellipse will be scaled to occupy 300x300px space
new Viewbox
{
	Stretch = Stretch.Uniform,
	Width = 300,
	Height = 300,
	Child = new Ellipse
	{
		Width = 50,
		Height = 50,
		Fill = Brushes.CornflowerBlue
	}
};
```
</TabItem>  

</Tabs>

### Common Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Stretch` | [Stretch](http://reference.avaloniaui.net/api/Avalonia.Media/Stretch) | Uniform | Determines how child fits into the available space |
| `StretchDirection` | [StretchDirection](http://reference.avaloniaui.net/api/Avalonia.Media/StretchDirection) | Both | Determines in what direction child will be scaled |

### Examples

<table>
  <thead>
    <tr>
      <th><code>Stretch</code>
      </th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Uniform</code>
      </td>
      <td>
        <p></p>
        <p>
          <img src={ViewboxScaleUniformBothScreenshot} alt="" />
        </p>
      </td>
    </tr>
    <tr>
      <td><code>UniformToFill</code>
      </td>
      <td>
        <p></p>
        <p>
          <img src={ViewboxScaleUniformFillBothScreenshot} alt="" />
        </p>
      </td>
    </tr>
    <tr>
      <td><code>Fill</code>
      </td>
      <td>
        <p></p>
        <p>
          <img src={ViewboxScaleFillBothScreenshot} alt="" />
        </p>
      </td>
    </tr>
    <tr>
      <td><code>None</code>
      </td>
      <td>
        <p></p>
        <p>
          <img src={ViewboxScaleNoneBothScreenshot} alt="" />
        </p>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th><code>StretchDirection</code>
      </th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Both</code>
      </td>
      <td>
        <img src={ViewboxScaleUniformBothScreenshot} alt="" />
      </td>
    </tr>
    <tr>
      <td><code>UpOnly</code>
      </td>
      <td >
        <p></p>
        <p>
          <img src={ViewboxScaleUniformUpOnlyScreenshot} alt="" />
        </p>
      </td>
    </tr>
    <tr>
      <td><code>DownOnly</code>
      </td>
      <td>
        <p></p>
        <p>
          <img src={ViewboxScaleUniformDownOnlyScreenshot} alt="" />
        </p>
      </td>
    </tr>
  </tbody>
</table>

### Pseudoclasses

None

### Reference

[Viewbox](http://reference.avaloniaui.net/api/Avalonia.Controls/Viewbox/)

### Source code

[Viewbox.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Viewbox.cs)
