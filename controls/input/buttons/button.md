---
id: button
title: Button
description: A clickable control that reacts to pointer input, raises a Click event, and optionally invokes an ICommand.
doc-type: reference
---

import ButtonClickScreenshot from '/img/controls/buttons/button/button-click.gif';

The [`Button`](/api/avalonia/controls/button) control reacts to pointer actions and provides visual feedback in the form of a depressed state when the pointer is down. A pointer-down to pointer-release sequence is interpreted as a click, and you can configure this behavior through the [`ClickMode`](/api/avalonia/controls/clickmode) property.

You can handle a click by subscribing to the `Click` event in code-behind, or by binding an `ICommand` instance to the `Command` property. For guidance on binding to a command, see [Adding interactivity](/docs/input-interaction/adding-interactivity).

## Common properties

| Property           | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `ClickMode`        | Describes how the button should react to clicks.                    |
| `Command`          | An instance of `ICommand` to be invoked when the button is clicked. |
| `CommandParameter` | The parameter passed to the command when it is invoked.             |
| `Content`          | The content to display inside the button. Can be text or any control. |
| [`Flyout`](/api/avalonia/controls/flyout)           | A `Flyout` that opens when the button is clicked.                   |
| `IsPressed`        | Whether the button is currently in a pressed state (read-only).     |
| `IsDefault`        | When `true`, the button is activated when the user presses Enter.   |
| `IsCancel`         | When `true`, the button is activated when the user presses Escape.  |

## Example

This example shows a simple button and a C# code-behind click event handler.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <Button Click="OnClick"
          HorizontalAlignment="Center"
          VerticalAlignment="Center">
    Press Me!
  </Button>
</UserControl>
```

```csharp
public partial class MainView : UserControl
{
    private int _clickCount = 0;

    public void OnClick(object sender, RoutedEventArgs args)
    {
        var btn = (Button)sender;
        btn.Content = $"Clicked: {++_clickCount} times";
    }
}
```

</XamlPreview>

## Binding to a command

The preferred approach in MVVM is to bind the `Command` property to an `ICommand` in your view model:

```xml
<Button Content="Save" Command="{Binding SaveCommand}" />
```

```csharp
[RelayCommand]
private void Save()
{
    _repository.Save(CurrentItem);
}
```

### Command with a parameter

```xml
<Button Content="Delete"
        Command="{Binding DeleteCommand}"
        CommandParameter="{Binding SelectedItem}" />
```

### Disabling the button with `CanExecute`

The button is automatically disabled when the command's `CanExecute` returns `false`:

```csharp
[ObservableProperty]
[NotifyCanExecuteChangedFor(nameof(SaveCommand))]
private string _name = "";

[RelayCommand(CanExecute = nameof(CanSave))]
private void Save() { /* ... */ }

private bool CanSave() => !string.IsNullOrWhiteSpace(Name);
```

## Button with icon

```xml
<Button>
    <StackPanel Orientation="Horizontal" Spacing="6">
        <PathIcon Data="{StaticResource save_regular}" Width="16" />
        <TextBlock Text="Save" VerticalAlignment="Center" />
    </StackPanel>
</Button>
```

## `ClickMode`

The `ClickMode` property controls when the `Click` event fires:

| Value | Description |
|---|---|
| `Release` | Click fires on pointer release (default). |
| `Press` | Click fires on pointer press. |
| `Hover` | Click fires when the pointer enters the button. |

## `IsDefault` and `IsCancel`

You can designate a button as the default action or the cancel action for a window or dialog. When you set `IsDefault` to `true`, the button activates when the user presses **Enter**. When you set `IsCancel` to `true`, the button activates when the user presses **Escape**.

```xml
<StackPanel Orientation="Horizontal" Spacing="8">
  <Button Content="OK" IsDefault="True" Command="{Binding ConfirmCommand}" />
  <Button Content="Cancel" IsCancel="True" Command="{Binding CancelCommand}" />
</StackPanel>
```

## Button with a flyout

You can attach a `Flyout` to a button so that clicking the button opens a popup:

```xml
<Button Content="Options">
  <Button.Flyout>
    <MenuFlyout>
      <MenuItem Header="Cut" />
      <MenuItem Header="Copy" />
      <MenuItem Header="Paste" />
    </MenuFlyout>
  </Button.Flyout>
</Button>
```

## `Click` vs. `PointerPressed`

Always use the `Click` event to determine whether a user has pressed a button, not `PointerPressed`. `Click` is the high-level event specific to `Button`, while `PointerPressed` is a low-level input event that `Button` handles internally (setting `IsHandled` to `true`). Because the event is marked as handled, your application will not receive `PointerPressed` from a `Button` the way it might from other controls.

For a full list of button events, see the [Button events API reference](/api/avalonia/controls/button).

## Keyboard and accessibility

`Button` is focusable by default and participates in tab navigation. When the button has keyboard focus, the user can activate it by pressing **Space** or **Enter**. Screen readers announce the button's `Content` as its accessible name, so make sure you provide meaningful text. If your button contains only an icon, set the `AutomationProperties.Name` attached property so assistive technologies can identify it:

```xml
<Button Command="{Binding SaveCommand}"
        AutomationProperties.Name="Save">
  <PathIcon Data="{StaticResource save_regular}" Width="16" />
</Button>
```

## Styling

`Button` exposes several pseudo-classes you can target in styles:

| Pseudo-class   | Applied when                          |
|----------------|---------------------------------------|
| `:pointerover` | The pointer is hovering over the button. |
| `:pressed`     | The button is being pressed.          |
| `:disabled`    | The button's `IsEnabled` is `false`.  |
| `:focus`       | The button has keyboard focus.        |

```xml
<Style Selector="Button.accent:pointerover">
  <Setter Property="Background" Value="{DynamicResource SystemAccentColorDark1}" />
</Style>
```

## See also

- [Button API reference](/api/avalonia/controls/button)
- [`Button.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Button.cs)
- [RepeatButton](repeatbutton)
- [ToggleButton](togglebutton)
- [SplitButton](splitbutton)
- [HyperlinkButton](hyperlinkbutton)
- [Adding interactivity](/docs/input-interaction/adding-interactivity)
