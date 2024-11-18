---
title: ToggleSplitButton
description: REFERENCE - Built-in Controls
---

# ToggleSplitButton

import ToggleSplitButtonClosedUncheckedScreenshot from '/img/reference/controls/buttons/togglesplitbutton-closed-unchecked.png';
import ToggleSplitButtonClosedCheckedScreenshot from '/img/reference/controls/buttons/togglesplitbutton-closed-checked.png';
import ToggleSplitButtonOpenedCheckedScreenshot from '/img/reference/controls/buttons/togglesplitbutton-opened-checked.png';
import ToggleSplitButtonTextListScreenshot from '/img/reference/controls/buttons/togglesplitbutton-text-list.png';

The `ToggleSplitButton` functions as a [`ToggleButton`](togglebutton) with primary and secondary parts that can each be pressed separately. The primary part behaves like a normal `ToggleButton` and the secondary part opens a [`Flyout`](../flyouts) with additional actions.

:::info
The `ToggleSplitButton` has only two states: checked and unchecked. Indeterminate is not supported like it is with a standard `ToggleButton`. This was done intentionally to match WinUI and restricts the control’s usage. The `ToggleSplitButton` should only be used to turn features on/off. Anything other than that is currently considered poor practice from a usability standpoint.
:::

## Is this the right control?

A `ToggleSplitButton` is a fairly specialized control and its usage should be restricted to where it makes clear sense from a user-standpoint. It is intended to turn a feature on/off while allowing some additional configurations to be specified rather than the default.

Like a [`SplitButton`](../buttons/splitbutton), the most common action should be the default and what is shown in the primary part. However, unlike the `SplitButton`, pressing the primary part will turn this feature on or off instead of simply invoking an action. Additional configurations for the feature should be added to the `Flyout` which is shown when the secondary (drop down) part is pressed.

:::info
Pressing a configuration in the `Flyout` should either (1) turn on the feature with the selected configuration, or (2) change the feature to the selected configuration. Pressing a configuration in the `Flyout` should never turn off the feature – that can only be done by toggling the primary part.
:::

## Common Properties

| Property    | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| `Content`   | The content to display in the primary part                     |
| `Flyout`    | The `Flyout` which shows up when the secondary part is clicked |
| `Command`   | A command to be invoked when the primary button is clicked     |
| `IsChecked` | Gets or sets if the `ToggleSplitButton` is checked             |

## Pseudoclasses

| Pseudoclass    | Description                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:pressed`     | Set when the entire `ToggleSplitButton` is pressed using a keyboard input such as Space or Enter. In this state no distinction is made between primary or secondary parts |
| `:flyout-open` | Set when the `Flyout` is open                                                                                                                                             |
| `:checked`     | Set when the `ToggleSplitButton` is checked. (`IsChecked="true"`)                                                                                                         |

## API Reference

[ToggleSplitButton](http://reference.avaloniaui.net/api/Avalonia.Controls/ToggleSplitButton/)

## Source code

[ToggleSplitButton.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SplitButton/ToggleSplitButton.cs)

## Examples

### Basic example

```xml
<ToggleSplitButton Content="Content"
                   IsChecked="{Binding IsChecked}">
    <ToggleSplitButton.Flyout>
        <MenuFlyout Placement="Bottom">
            <MenuItem Header="Item 1">
                <MenuItem Header="Subitem 1" />
                <MenuItem Header="Subitem 2" />
                <MenuItem Header="Subitem 3" />
            </MenuItem>
            <MenuItem Header="Item 2"
                      InputGesture="Ctrl+A" />
            <MenuItem Header="Item 3" />
        </MenuFlyout>
    </ToggleSplitButton.Flyout>
</ToggleSplitButton>
```

<img src={ToggleSplitButtonClosedUncheckedScreenshot} alt=""/>

_SplitButton (Flyout closed, unchecked)_

<img src={ToggleSplitButtonClosedCheckedScreenshot} alt=""/>

_SplitButton (Flyout closed, checked)_

<img src={ToggleSplitButtonOpenedCheckedScreenshot} alt=""/>

_SplitButton (Flyout opened, checked)_

### Text editor with numbered or bulleted list example

Continuing the text editor example from `SplitButton`, a common use case of the `ToggleSplitButton` is to add bulleted/numbered lists to text. In this example the primary part will toggle the list on/off while the secondary part will open a `Flyout` and allow selecting the bullet or number style.

```xml
<!-- We have the following Icons defined in our Resources -->
<PathGeometry x:Key="IconData.NumberedList"> {{ Path Data }} </PathGeometry>
<PathGeometry x:Key="IconData.BulletedList"> {{ Path Data }} </PathGeometry>
```

```xml
<ToggleSplitButton IsChecked="{Binding TextEditorHasList}">
    <ToggleSplitButton.Content>
        <!-- Note: For this example we keep the content static, but you can use dynamic content -->
        <PathIcon Data="{DynamicResource IconData.BulletedList}" />
    </ToggleSplitButton.Content>
    <ToggleSplitButton.Flyout>
        <Flyout Placement="Bottom">
            <!-- Note: For this example we keep the content static, but you can use dynamic content -->
            <ListBox Height="200" Width="200" >
                <ListBoxItem>
                    <StackPanel Orientation="Horizontal">
                        <PathIcon Data="{DynamicResource IconData.NumberedList}" />
                        <TextBlock Text="Numbered List" />
                    </StackPanel>
                </ListBoxItem>
                <ListBoxItem>
                    <StackPanel Orientation="Horizontal">
                        <PathIcon Data="{DynamicResource IconData.BulletedList}" />
                        <TextBlock Text="Bulleted List" />
                    </StackPanel>
                </ListBoxItem>
            </ListBox>
        </Flyout>
    </ToggleSplitButton.Flyout>
</ToggleSplitButton>
```

<img src={ToggleSplitButtonTextListScreenshot} alt=""/>

_Sample of ToggleSplitButton for toggle text lists on and off and selecting the list format_
