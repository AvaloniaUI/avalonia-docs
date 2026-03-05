---
id: toggleswitch
title: ToggleSwitch
---

The `ToggleSwitch` represents a switch that can be toggled between two states (on/off). It is similar to a `CheckBox` but uses a sliding toggle visual that is familiar on mobile platforms.

## Useful Properties

| Property | Type | Description |
|---|---|---|
| `IsChecked` | `bool?` | The current state of the toggle. `true` for on, `false` for off. |
| `OnContent` | `object` | Content displayed when the toggle is on. Default: "On". |
| `OffContent` | `object` | Content displayed when the toggle is off. Default: "Off". |
| `IsCheckedChanged` | `event` | Raised when the toggle state changes. |

## Basic Example

```xml
<ToggleSwitch IsChecked="{Binding IsEnabled}" />
```

## Custom On/Off Labels

Replace the default "On" and "Off" text:

```xml
<ToggleSwitch IsChecked="{Binding IsDarkMode}"
              OnContent="Dark"
              OffContent="Light" />
```

## Without Labels

Set both content properties to empty to show only the toggle:

```xml
<ToggleSwitch IsChecked="{Binding IsActive}"
              OnContent=""
              OffContent="" />
```

## Rich Content

Use complex content for on/off states:

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

## Binding Example

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

## Settings Form Pattern

A common pattern is using `ToggleSwitch` in a settings list:

```xml
<StackPanel Spacing="16">
    <Grid ColumnDefinitions="*,Auto">
        <StackPanel>
            <TextBlock Text="Auto-save" FontWeight="SemiBold" />
            <TextBlock Text="Save changes automatically" Foreground="Gray" FontSize="12" />
        </StackPanel>
        <ToggleSwitch Grid.Column="1" IsChecked="{Binding AutoSave}"
                      OnContent="" OffContent="" />
    </Grid>

    <Grid ColumnDefinitions="*,Auto">
        <StackPanel>
            <TextBlock Text="Spell check" FontWeight="SemiBold" />
            <TextBlock Text="Check spelling as you type" Foreground="Gray" FontSize="12" />
        </StackPanel>
        <ToggleSwitch Grid.Column="1" IsChecked="{Binding SpellCheck}"
                      OnContent="" OffContent="" />
    </Grid>
</StackPanel>
```

## ToggleSwitch vs CheckBox

| Feature | ToggleSwitch | CheckBox |
|---|---|---|
| Visual style | Sliding toggle | Check mark |
| Best for | Settings, on/off states | Form fields, multi-select |
| Three-state | No | Yes (`IsThreeState`) |
| Platform feel | Mobile-friendly | Desktop-native |

## See also

- [CheckBox](/controls/input/selectors/checkbox): Check mark toggle for forms.
- [ToggleButton](/controls/input/buttons/togglebutton): Button that stays pressed.
