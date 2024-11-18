---
description: REFERENCE - Pseudoclasses
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CustomPseudoclassScreenshot from '/img/reference/styles/custom-pseudoclass.gif';

# Pseudoclasses

## Overview

Pseudoclasses in Avalonia, similar to those in CSS, are keywords exposed by a `Control` that indicate a distinct control 
state in a convenient way for Style Selectors. These states are used to conditionally style controls. For example, a 
`Button` could have a different appearance while it's being pressed or a TextBox while it is disabled.

Pseudoclass state is tracked by the `Control`'s `PseudoClasses` property. By convention, pseudoclass names begin with 
a `:`, such as `:pointerover` or `:pressed`.

## Selector Usage

The following demonstrates how to apply Bold text to a `CheckBox` when it is checked:

```xml
<Window.Styles>
    <Style Selector="CheckBox:checked">
        <Setter Property="FontWeight" Value="Bold" />
    </Style>
</Window.Styles>

<CheckBox Content="Pseudoselectors" />
```

A `Control` can have multiple pseudoclasses active and you can target multiple pseudoclasses with a Selector. For example:

```xml
<Style Selector="Button.red:focus:pointerover">
```

The selector above targets `Button` controls with the red style class, and that have the `:focus` and the `:pointerover` pseudoclass state.

## General Pseudoclasses

These pseudoclasses are defined by `InputElement` and are accessible on every `Control`:

| Pseudoclass      | Description                                                    |
|:-----------------|----------------------------------------------------------------|
| `:disabled`      | The Control is disabled and cannot be interacted with.         |
| `:pointerover`   | The Pointer is over the Control as determined by hit testing.  |
| `:focus`         | The Control has focus.                                         |
| `:focus-within`  | The Control has focus or contains a descendant that has focus. |
| `:focus-visible` | The Control has focus and should show a visual indicator.      |

## Accessibility

The `PseudoClasses` collection is a `protected` property. This accessibility blocks the external setting of existing and custom 
pseudoclasses via code-behind and attached behavior. As such, customizing must be implemented through inheritance.

## Custom Pseudoclass Example

When creating a custom control, you can define custom pseudoclasses to expose control state. The `[PseudoClasses]` attribute 
provides information about your pseudoclass to the IDE. This behavior is inherited, so the custom control automatically benefits from 
pseudoclasses defined and managed by more primitive controls, such as `InputElement`'s `:pointerover`.

The following example defines and sets pseudoclasses when the pointer is over different regions of a `Button`.

<Tabs>
<TabItem value="cs" label="C# Control" default>

```csharp
[PseudoClasses(":left", ":right", ":middle")]
public class AreaButton : Button
{    
    protected override void OnPointerMoved(PointerEventArgs e)
    {
        base.OnPointerMoved(e);
        var pos = e.GetPosition(this);

        if (pos.X < Bounds.Width * 0.25)
            SetAreaPseudoclasses(true, false, false);
        else if (pos.X > Bounds.Width * 0.75)
            SetAreaPseudoclasses(false, true, false);
        else
            SetAreaPseudoclasses(false, false, true);
    }

    protected override void OnPointerExited(PointerEventArgs e)
    {
        base.OnPointerExited(e);
        SetAreaPseudoclasses(false, false, false);
    }

    private void SetAreaPseudoclasses(bool left, bool right, bool middle)
    {
        PseudoClasses.Set(":left", left);
        PseudoClasses.Set(":right", right);
        PseudoClasses.Set(":middle", middle);
    }
}
```

</TabItem>
<TabItem value="example" label="Example XAML">

```xml
<Window.Styles>
    <Style Selector="local|AreaButton">
        <Setter Property="Content" Value="Testing Area" />
        <Setter Property="MinWidth" Value="200" />

        <Style Selector="^:left">
            <Setter Property="Content" Value="Left" />
        </Style>
        <Style Selector="^:right">
            <Setter Property="Content" Value="Right" />
        </Style>
        <Style Selector="^:middle">
            <Setter Property="Content" Value="Middle" />
        </Style>
    </Style>
</Window.Styles>

<local:AreaButton />
```

</TabItem>
<TabItem value="xaml" label="ControlTheme XAML">

```xml
<ControlTheme
    x:Key="{x:Type local:AreaButton}"
    BasedOn="{StaticResource {x:Type Button}}"
    TargetType="local:AreaButton" />
```

</TabItem>
</Tabs>

<img src={CustomPseudoclassScreenshot} alt="" />

:::warning
`StyleKeyOverride` is used when creating simple, derived controls with the `ControlTheme` defined by their parent. In this 
case since `Button` is a `TemplatedControl`, creating a `ControlTheme` is necessary as the Selector must target `AreaButton` 
for the new pseudoclasses.
:::
