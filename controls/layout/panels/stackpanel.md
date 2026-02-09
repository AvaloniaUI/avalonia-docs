---
id: stackpanel
title: StackPanel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# StackPanel

The `StackPanel` arranges its child controls by stacking them horizontally or vertically. The stack panel is often used to arrange a small subsection of the UI on a page.

Inside a stack panel, if the size property perpendicular to the stack on a child control is not set, the child control will stretch to fill the available space. For example in horizontal orientation, the height of child controls will stretch if not set.

In the direction of the stack, the stack panel will always expand to fit all the child controls.

## Useful Properties

You will probably use these properties most often:

| Property      | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| `Orientation` | Sets the direction of the stack. Choose from horizontal or vertical (default). |
| `Spacing`     | Creates an even spacing between the child controls.                            |

## Example

The following XAML shows how to create a vertical stack panel. The result shows the child controls stretched to fit the width, and the overall height of the stack panel equal to the sum of the child control heights.

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Width="200">
    <Rectangle Fill="Red" Height="50"/>
    <Rectangle Fill="Blue" Height="50"/>
    <Rectangle Fill="Green" Height="50"/>
    <Rectangle Fill="Orange" Height="50"/>
</StackPanel>
```

</XamlPreview>

## Defining a StackPanel in code

The following example demonstrates how to use a `StackPanel` to create a set of vertically-positioned buttons. For horizontal positioning, set the `Orientation` property to `Horizontal`.

<img className="center" src={StackPanelSampleScreenshot} alt="StackPanel Example" />

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
 <StackPanel HorizontalAlignment="Center" 
                VerticalAlignment="Top"
                Spacing="25">
        <Button Content="Button 1" />
        <Button Content="Button 2" />
        <Button Content="Button 3" />
    </StackPanel>
```

</TabItem>
<TabItem value="cs">

```cs
// Define the StackPanel
myStackPanel = new StackPanel();
myStackPanel.HorizontalAlignment = HorizontalAlignment.Center;
myStackPanel.VerticalAlignment = VerticalAlignment.Top;
myStackPanel.Spacing = 25;

// Define child content
Button myButton1 = new Button();
myButton1.Content = "Button 1";
Button myButton2 = new Button();
myButton2.Content = "Button 2";
Button myButton3 = new Button();
myButton3.Content = "Button 3";

// Add child elements to the parent StackPanel
myStackPanel.Children.Add(myButton1);
myStackPanel.Children.Add(myButton2);
myStackPanel.Children.Add(myButton3);
```
</TabItem>  

</Tabs>

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_StackPanel).
:::

:::info
View the source code on _GitHub_ [`StackPanel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/StackPanel.cs)
:::
