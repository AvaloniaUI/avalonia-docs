---
id: panel
title: Panel
---

The panel is the most basic control that can contain multiple child controls. Child controls are drawn according to their horizontal and vertical alignment properties, and in the sequence that they appear in the XAML. Child controls will overlap if they occupy the same space.

## Example

This example uses some 50% opacities to demonstrate that child controls overlap.

<XamlPreview>

```xml
<Panel xmlns="https://github.com/avaloniaui"
       Margin="10">
    <Rectangle Fill="Red" Height="100" VerticalAlignment="Top"/>
    <Rectangle Fill="Green" Height="100" VerticalAlignment="Bottom"/>
    <Rectangle Fill="Blue" Width="100" HorizontalAlignment="Right" />
    <Rectangle Fill="Orange" Width="100" HorizontalAlignment="Left"/>
</Panel>
```

</XamlPreview>

## Other panel controls

There are other more useful panels, that offer better control over the positioning of their child controls:

* Stack Panel
* Dock Panel
* Relative Panel
* Wrap Panel

If you have specific requirements for positioning the child controls in a panel, you can create your own custom control based on the panel.

:::info
For instructions about how to create a custom panel control, see [Custom panel](/docs/custom-controls/custom-panel).
:::

## See also

- [Panel API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Panel)
- [`Panel.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Panel.cs)
