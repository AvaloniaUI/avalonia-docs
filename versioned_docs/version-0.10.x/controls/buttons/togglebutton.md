---
id: togglebutton
title: ToggleButton
---

The `ToggleButton` control is a subclass of the `Button` control that has a built-in `checked` state. This means the button can be checked or unchecked on click by a user. You may change the styling of controls based on whether `ToggleButton` is checked or not by using the `:checked` [pseudoclass.](https://docs.avaloniaui.net/docs/styling/styles#pseudoclasses)

## Source code

[ToggleButton.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/ToggleButton.cs)

## Examples

### Speaker Mute Button

This button will show a muted speaker icon or an un-muted speaker icon based on whether the button is checked or unchecked, which the `ToggleButton` control toggles between when users click on the button.

```markup
<Style Selector="ToggleButton DrawingPresenter.tbchecked">
    <Setter Property="IsVisible" Value="False"/>
</Style>
<Style Selector="ToggleButton:checked DrawingPresenter.tbchecked">
    <Setter Property="IsVisible" Value="True"/>
</Style>
<Style Selector="ToggleButton DrawingPresenter.tbunchecked">
    <Setter Property="IsVisible" Value="True"/>
</Style>
<Style Selector="ToggleButton:checked DrawingPresenter.tbunchecked">
    <Setter Property="IsVisible" Value="False"/>
</Style>
```

The style code above reacts to `ToggleButton`'s `:checked` pseudoclass, so that if the `ToggleButton` is checked, any `DrawingPresenter` with the class `.tbchecked` will be visible, and any `DrawingPresenter` with the class `.tbunchecked` will not be visible.

```markup
<ToggleButton Classes="vtrx" IsChecked="{Binding Path=vtrx.muted}" ToolTip.Tip="stop audio">
    <Panel>
        <DrawingPresenter Drawing="{DynamicResource Icon.Speaker}" Classes="tbunchecked"/>
        <DrawingPresenter Width="14" Height="14" Margin="14,14,0,0" Drawing="{DynamicResource Icon.SpeakerMute}" Classes="tbchecked"/>
    </Panel>
</ToggleButton>
```