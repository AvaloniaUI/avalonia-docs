---
description: REFERENCE - Built-in Controls
---

import FlyoutShowAttachedScreenshot from '/img/reference/controls/flyouts/flyout-show-attached.gif';

# Flyout

Flyouts are dismissible containers that can be attached to some classes of 'host' control; although flyouts themselves are not controls. They show when their host control receives the focus, and are hidden again in a number of different ways.

A flyout can contain simple or richer, composed, UI content.

Flyouts can be declared as a resource and shared between two or more host controls in an _Avalonia UI_ app.

## Examples

A flyout is attached to a host control using the host's `Flyout` property. For example:

```xml
<Button Content="Button with Flyout">
  <Button.Flyout >
    <Flyout>This is the button flyout.</Flyout>
  </Button.Flyout>
</Button>
```

:::warning
Only the button and split button controls support the `Flyout` property. You can attach a flyout to other _Avalonia UI_ built-in controls using the `AttachedFlyout` property instead.
:::

For controls that do not have the `Flyout` property, use the `AttachedFlyout` property like this:

```xml
<Border Background="Red" PointerPressed="Border_PointerPressed">
    <FlyoutBase.AttachedFlyout>
        <Flyout>
            <TextBlock Text="Red Rectangle Flyout." />
        </Flyout>
    </FlyoutBase.AttachedFlyout>
</Border>
```

The flyout will not show automatically, it has to be shown from code-behind. For example:

```csharp
public void Border_PointerPressed(object sender, PointerPressedEventArgs args)
{
    var ctl = sender as Control;
    if (ctl != null)
    {
        FlyoutBase.ShowAttachedFlyout(ctl);
    }
}
```

<img src={FlyoutShowAttachedScreenshot} alt="" />

## Useful Properties

You will probably use these properties most often:

| Property    | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| `Placement` | The position where the flyout opens relative to the control to which it is attached. |
| `ShowMode`  | This describes how the flyout shows and hides. See the options below.                |

## Show Mode

This setting describes how the flyout shows and hides:

<table><thead><tr><th width="259">Mode</th><th>Description</th></tr></thead><tbody><tr><td><code>Standard</code></td><td>The flyout shows when the control to which it is attached gets the focus. The flyout hides when the control to which it is attached loses the focus (the user either tabs away or clicks elsewhere). </td></tr><tr><td><code>Transient</code></td><td></td></tr><tr><td><code>TransientWithDismiss OnPointerMoveAway</code></td><td></td></tr></tbody></table>

## Common Methods for all Flyouts

| Property                | Description                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `ShowAt(Control)`       | Shows the Flyout at the specified target                                                |
| `ShowAt(Control, bool)` | Shows the Flyout at the specified target, but places it at the current pointer position |
| `Hide`                  | Hides the Flyout                                                                        |

## Sharing Flyouts

You can share flyouts between two or more elements in your app. For example, to share a flyout from the resources collection of a window:

```xml
<Window.Resources>
    <Flyout x:Key="MySharedFlyout">
        <!-- Flyout content here -->
    </Flyout>
</Window.Resources>

<Button Content="Click me!" Flyout="{StaticResource MySharedFlyout}" />

<Button Content="Now click me!" Flyout="{StaticResource MySharedFlyout}" />
```

## Styling Flyouts

Although flyouts are not themselves controls, their general appearance can be customized by targeting the presenter the `Flyout` uses to display its content. For a normal `Flyout` this is `FlyoutPresenter` and for `MenuFlyout` this is `MenuFlyoutPresenter`. Because flyout presenters are not exposed, special style classes that should pertain to specific flyouts can be passed using the `FlyoutPresenterClasses` property on `FlyoutBase`

```xml
<Style Selector="FlyoutPresenter.mySpecialClass">
    <Setter Property="Background" Value="Red" />
</Style>

<Flyout FlyoutPresenterClasses="mySpecialClass">
    <!-- Flyout content here -->
</Flyout>
```

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Flyout/).
:::

:::info
View the source code on _GitHub_ [`Flyout.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/Flyout.cs)
:::
