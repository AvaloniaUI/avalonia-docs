---
id: stackpanel
title: StackPanel
description: A panel that arranges child controls in a single line, either horizontally or vertically.
doc-type: reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [`StackPanel`](/api/avalonia/controls/stackpanel) arranges its child controls by stacking them horizontally or vertically. You will often use a stack panel to arrange a small subsection of your UI on a page.

Inside a `StackPanel`, if you do not set the size property perpendicular to the stack direction on a child control, the child control stretches to fill the available space. For example, in a horizontal orientation, child controls stretch to fill the available height when no explicit `Height` is set.

In the direction of the stack, the `StackPanel` always expands to fit all of its child controls.

:::tip
`StackPanel` does not scroll. If your stacked content may exceed the available space, wrap the `StackPanel` in a `ScrollViewer`.
:::

## Useful properties

You will probably use these properties most often:

| Property      | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| [`Orientation`](/api/avalonia/layout/orientation) | Sets the direction of the stack. Choose from `Horizontal` or `Vertical` (default). |
| `Spacing`     | Creates an even gap between consecutive child controls.                         |
| `HorizontalAlignment` | Controls how the panel itself is positioned horizontally within its parent. |
| `VerticalAlignment`   | Controls how the panel itself is positioned vertically within its parent.   |

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

The following example demonstrates how to use a `StackPanel` to create a set of vertically positioned buttons. For horizontal positioning, set the `Orientation` property to `Horizontal`.

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

```csharp
// Define the StackPanel
var myStackPanel = new StackPanel();
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

## Centering items

To align all children to the center of the stack, set `HorizontalAlignment` to `Center`:

```xml
<StackPanel HorizontalAlignment="Center" Spacing="8">
    <Button Content="Short" />
    <Button Content="A longer button" />
</StackPanel>
```

## Horizontal stack with spacing

You can create a horizontal button bar by setting `Orientation` to `Horizontal` and adding a `Spacing` value:

```xml
<StackPanel Orientation="Horizontal" Spacing="12">
    <Button Content="Save" />
    <Button Content="Cancel" />
</StackPanel>
```

## Practical notes

- **Sizing behavior**: A `StackPanel` does not constrain children in the stacking direction, so each child receives as much space as it requests. If you need children to share space proportionally, consider using a `Grid` instead.
- **Performance**: For lists with many items, prefer `ItemsRepeater` or `ListBox` with virtualization over placing large numbers of controls in a `StackPanel`.
- **Scrolling**: Because `StackPanel` grows to fit all children, it will never clip its content on its own. Wrap it in a `ScrollViewer` when overflow is possible.
- **Reverse order**: `StackPanel` does not support reverse stacking. To reverse the visual order, reverse the order of your child elements or use a custom panel.

## See also

- [StackPanel API reference](/api/avalonia/controls/stackpanel)
- [`StackPanel.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/StackPanel.cs)
- [DockPanel](dockpanel)
- [Grid](grid)
- [WrapPanel](wrappanel)
- [Panel](panel)
