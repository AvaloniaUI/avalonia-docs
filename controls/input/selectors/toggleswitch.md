---
id: toggleswitch
title: ToggleSwitch
description: A sliding on/off toggle control used for binary settings, with customizable on and off content.
doc-type: reference
---

The [`ToggleSwitch`](/api/avalonia/controls/toggleswitch) control presents a sliding toggle that you can flip between on and off states. It behaves like a [`CheckBox`](/api/avalonia/controls/checkbox) but uses a track-and-thumb visual that feels natural on mobile and touch-first interfaces.

Use `ToggleSwitch` when you need an immediate on/off setting, such as enabling dark mode or toggling notifications. For form fields where users select multiple options from a list, a `CheckBox` is usually a better fit.

## Common properties

You will probably use these properties most often:

| Property      | Type      | Description                                                        |
| ------------- | --------- | ------------------------------------------------------------------ |
| `IsChecked`   | `bool?`   | Gets or sets the current toggle state. `true` is on, `false` is off. |
| `OnContent`   | `object`  | Content displayed when the toggle is on. Defaults to "On".         |
| `OffContent`  | `object`  | Content displayed when the toggle is off. Defaults to "Off".       |
| `KnobTransitions` | `Transitions` | The transitions applied to the knob during state changes.    |

## Events

| Event              | Description                              |
| ------------------ | ---------------------------------------- |
| `IsCheckedChanged` | Raised when the `IsChecked` value changes. |

## Basic example

Place a `ToggleSwitch` in your AXAML and bind `IsChecked` to a Boolean property on your view model:

```xml
<ToggleSwitch IsChecked="{Binding IsEnabled}" />
```

## Custom on/off labels

You can replace the default "On" and "Off" text with your own strings:

```xml
<ToggleSwitch IsChecked="{Binding IsDarkMode}"
              OnContent="Dark"
              OffContent="Light" />
```

## Hiding the labels

Set both content properties to empty strings to show only the sliding toggle:

```xml
<ToggleSwitch IsChecked="{Binding IsActive}"
              OnContent=""
              OffContent="" />
```

This is useful when the surrounding layout already provides a label for the setting.

## Rich content

You can use any controls as the on and off content. The following example pairs a `PathIcon` with a `TextBlock`:

```xml
<ToggleSwitch IsChecked="{Binding NotificationsEnabled}">
    <ToggleSwitch.OnContent>
        <StackPanel Orientation="Horizontal" Spacing="6">
            <PathIcon Data="{StaticResource bell_regular}" Width="14" />
            <TextBlock Text="Enabled" />
        </StackPanel>
    </ToggleSwitch.OnContent>
    <ToggleSwitch.OffContent>
        <StackPanel Orientation="Horizontal" Spacing="6">
            <PathIcon Data="{StaticResource bell_off_regular}" Width="14" />
            <TextBlock Text="Disabled" />
        </StackPanel>
    </ToggleSwitch.OffContent>
</ToggleSwitch>
```

## Binding to a view model

Create Boolean properties in your view model and bind each `ToggleSwitch` to one of them:

```csharp
public partial class SettingsViewModel : ObservableObject
{
    [ObservableProperty]
    private bool _isDarkMode;

    [ObservableProperty]
    private bool _notificationsEnabled = true;

    partial void OnIsDarkModeChanged(bool value)
    {
        // Apply theme change
    }
}
```

```xml
<StackPanel Spacing="12">
    <ToggleSwitch IsChecked="{Binding IsDarkMode}"
                  OnContent="Dark Mode" OffContent="Light Mode" />
    <ToggleSwitch IsChecked="{Binding NotificationsEnabled}"
                  OnContent="Notifications On" OffContent="Notifications Off" />
</StackPanel>
```

Because `ToggleSwitch` uses two-way binding by default, flipping the toggle immediately updates the view model property.

## Settings form pattern

A common layout pairs a description on the left with a label-free `ToggleSwitch` on the right:

```xml
<StackPanel Spacing="16">
    <Grid ColumnDefinitions="*,Auto">
        <StackPanel>
            <TextBlock Text="Auto-save" FontWeight="SemiBold" />
            <TextBlock Text="Save changes automatically"
                       Foreground="Gray" FontSize="12" />
        </StackPanel>
        <ToggleSwitch Grid.Column="1" IsChecked="{Binding AutoSave}"
                      OnContent="" OffContent="" />
    </Grid>

    <Grid ColumnDefinitions="*,Auto">
        <StackPanel>
            <TextBlock Text="Spell check" FontWeight="SemiBold" />
            <TextBlock Text="Check spelling as you type"
                       Foreground="Gray" FontSize="12" />
        </StackPanel>
        <ToggleSwitch Grid.Column="1" IsChecked="{Binding SpellCheck}"
                      OnContent="" OffContent="" />
    </Grid>
</StackPanel>
```

Setting `OnContent` and `OffContent` to empty strings removes the redundant labels because the `TextBlock` elements already describe each setting.

## Choosing between `ToggleSwitch` and `CheckBox`

| Consideration | `ToggleSwitch` | `CheckBox` |
| ------------- | -------------- | ---------- |
| Visual style  | Sliding toggle | Check mark |
| Best suited for | Settings, instant on/off states | Form fields, multi-select lists |
| Three-state support | No | Yes (via `IsThreeState`) |
| Platform feel | Mobile and touch friendly | Traditional desktop |

Choose `ToggleSwitch` when the change takes effect immediately. Choose `CheckBox` when the user must confirm or submit a form before the change is applied.

## See also

- [CheckBox](checkbox)
- [ToggleButton](/controls/input/buttons/togglebutton)
- [RadioButton](/controls/input/selectors/radiobutton)
