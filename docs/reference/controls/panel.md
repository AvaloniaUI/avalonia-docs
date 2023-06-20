---
description: REFERENCE - Built-in Controls
---

# Panel

The panel is the most basic control that can contain multiple child controls. Child controls are drawn according to their horizontal and vertical alignment properties, and in the sequence that they appear in the XAML. Child controls will overlap if they occupy the same space.&#x20;

{% hint style="info" %}
For a discussion about using other panels, see [here](../../concepts/layout/panels-overview.md).
{% endhint %}

## Example

This example uses some 50% opacities to demonstrate that child controls overlap.

```markup
<Panel Height="300" Width="300">
    <Rectangle Fill="Red" Height="100" VerticalAlignment="Top"/>
    <Rectangle Fill="Blue" Opacity="0.5" Width="100" HorizontalAlignment="Right" />
    <Rectangle Fill="Green" Opacity="0.5" Height="100" VerticalAlignment="Bottom"/>
    <Rectangle Fill="Orange" Width="100" HorizontalAlignment="Left"/>
</Panel>
```

<figure><img src="../../.gitbook/assets/image (7) (1).png" alt=""><figcaption></figcaption></figure>

## Other Panel Controls

There are other more useful panels, that offer better control over the positioning of their child controls:

* Stack Panel
* Dock Panel
* Relative Panel
* Wrap Panel

If you have specific requirements for positioning the child controls in a panel, you can create your own custom control based on the panel.

{% hint style="info" %}
For instructions about how to create a custom panel control, see [here](../../guides/custom-controls/create-a-custom-panel.md).
{% endhint %}

## More Information

{% hint style="info" %}
For the complete API documentation about this control see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Panel/).
{% endhint %}

{% hint style="info" %}
View the source code on GitHub [`Panel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Panel.cs)
{% endhint %}
