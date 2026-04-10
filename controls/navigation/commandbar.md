---
title: CommandBar
description: '`CommandBar` is a toolbar that displays a row of command buttons.'
doc-type: reference
---

import CommandBarLabelBottomScreenshot from '/img/controls/commandbar/commandbar-label-bottom.png';
import CommandBarLabelRightScreenshot from '/img/controls/commandbar/commandbar-label-right.png';
import CommandBarLabelCollapsedScreenshot from '/img/controls/commandbar/commandbar-label-collapsed.png';
import CommandBarSecondaryCommandsScreenshot from '/img/controls/commandbar/commandbar-secondary-commands.png';
import CommandBarContentScreenshot from '/img/controls/commandbar/commandbar-content.png';
import CommandBarToggleButtonScreenshot from '/img/controls/commandbar/commandbar-toggle-button.png';

# CommandBar

`CommandBar` is a toolbar that displays a row of primary command buttons with an optional overflow menu for secondary commands. Primary commands are always visible in the bar. Secondary commands appear in a popup revealed by the overflow button (`...`). When `IsDynamicOverflowEnabled` is `true`, primary commands that do not fit in the available width are automatically moved to the overflow.

The items in a `CommandBar` implement the `ICommandBarElement` interface. The built-in implementations are `AppBarButton`, `AppBarToggleButton`, and `AppBarSeparator`.

## CommandBar Properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `PrimaryCommands` | `IList<ICommandBarElement>?` | `null` | Commands displayed directly in the bar. |
| `SecondaryCommands` | `IList<ICommandBarElement>?` | `null` | Commands displayed in the overflow popup. |
| `Content` | `object?` | `null` | Custom content displayed at the leading edge of the bar, before the commands. |
| `DefaultLabelPosition` | `CommandBarDefaultLabelPosition` | `Bottom` | How labels are positioned on all command buttons. See the values table below. |
| `IsDynamicOverflowEnabled` | `bool` | `false` | When `true`, primary commands that do not fit are automatically moved to the overflow popup. |
| `OverflowButtonVisibility` | `CommandBarOverflowButtonVisibility` | `Auto` | Controls when the overflow button is shown. See the values table below. |
| `IsOpen` | `bool` | `false` | Whether the overflow popup is currently open. Bindable. |
| `IsSticky` | `bool` | `false` | When `true`, the overflow popup stays open after a command is invoked. |
| `HasSecondaryCommands` | `bool` | computed | Read-only. `true` when the overflow popup contains at least one command. |
| `IsOverflowButtonVisible` | `bool` | computed | Read-only. `true` when the overflow button is currently rendered. |
| `VisiblePrimaryCommands` | `ReadOnlyObservableCollection<ICommandBarElement>` | computed | Read-only. Primary commands currently visible in the bar (not moved to overflow). |
| `OverflowItems` | `ReadOnlyObservableCollection<ICommandBarElement>` | computed | Read-only. Items currently shown in the overflow popup (secondary commands plus any dynamic overflow items). |

## CommandBar Events

| Event | Description |
| ----- | ----------- |
| `Opening` | Raised when the overflow popup is about to open. |
| `Opened` | Raised when the overflow popup has opened. |
| `Closing` | Raised when the overflow popup is about to close. |
| `Closed` | Raised when the overflow popup has closed. |

## DefaultLabelPosition Values

| Value | Description |
| ----- | ----------- |
| `Bottom` | Default. Label is displayed below the icon. |
| `Right` | Label is displayed to the right of the icon. Useful for wider bars where horizontal space is available. |
| `Collapsed` | No label is shown. Icon only. Add a `ToolTip.Tip` for accessibility. |

## OverflowButtonVisibility Values

| Value | Description |
| ----- | ----------- |
| `Auto` | Default. The overflow button appears only when `SecondaryCommands` is non-empty or dynamic overflow is active. |
| `Visible` | The overflow button is always shown, even when there are no secondary commands. |
| `Collapsed` | The overflow button is never shown. |

## CommandBarButton properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Label` | `string?` | `null` | Text label shown below or beside the icon, depending on `DefaultLabelPosition`. |
| `Icon` | `object?` | `null` | Icon content. Typically a `PathIcon`. |
| `IsCompact` | `bool` | `false` | When `true`, the label is hidden and the button takes less space. Set automatically by `CommandBar`. |
| `LabelPosition` | `CommandBarDefaultLabelPosition` | `Bottom` | Per-button label position override. Set automatically by `CommandBar` from `DefaultLabelPosition`, but can be set manually to override a single button. |
| `DynamicOverflowOrder` | `int` | `0` | Priority for dynamic overflow. Items with a higher value move to overflow first. Items with the same value overflow together. |
| `IsInOverflow` | `bool` | `false` | Read-only. `true` when the button is currently shown in the overflow popup. |

`AppBarButton` also supports `Command`, `CommandParameter`, and the standard `Click` event inherited from `Button`.

## CommandBarToggleButton properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Label` | `string?` | `null` | Text label. |
| `Icon` | `object?` | `null` | Icon content. Typically a `PathIcon`. |
| `IsChecked` | `bool?` | `false` | Whether the button is in the checked state. Nullable for three-state support. |
| `IsCompact` | `bool` | `false` | When `true`, the label is hidden. |
| `LabelPosition` | `CommandBarDefaultLabelPosition` | `Bottom` | Per-button label position override. Set automatically by `CommandBar` from `DefaultLabelPosition`, but can be set manually to override a single button. |
| `DynamicOverflowOrder` | `int` | `0` | Priority for dynamic overflow. |
| `IsInOverflow` | `bool` | `false` | Read-only. `true` when shown in overflow. |

`AppBarToggleButton` raises `IsCheckedChanged` when its state changes.

## CommandBarSeparator

`CommandBarSeparator` draws a visual divider between groups of commands. It has no label or icon. It implements `ICommandBarElement` so it can be placed in `PrimaryCommands` or `SecondaryCommands`.

## Examples

### Basic CommandBar in XAML

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Add" Icon="{StaticResource AddIcon}" />
        <CommandBarButton Label="Edit" Icon="{StaticResource EditIcon}" />
        <CommandBarButton Label="Delete" Icon="{StaticResource DeleteIcon}" />
    </CommandBar.PrimaryCommands>
    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Export" Click="OnExportClick" />
        <AppBarButton Label="Print"  Click="OnPrintClick" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

### Primary and secondary commands with separators

Use `CommandBarSeparator` to group commands, and place less common actions in `SecondaryCommands`:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Cut" Icon="{StaticResource CutIcon}" />
        <CommandBarButton Label="Copy" Icon="{StaticResource CopyIcon}" />
        <CommandBarButton Label="Paste" Icon="{StaticResource PasteIcon}" />
        <CommandBarSeparator />
        <CommandBarButton Label="Undo" Icon="{StaticResource UndoIcon}" />
        <CommandBarButton Label="Redo" Icon="{StaticResource RedoIcon}" />
    </CommandBar.PrimaryCommands>
    <CommandBar.SecondaryCommands>
        <CommandBarButton Label="Select All" />
        <CommandBarButton Label="Find and Replace" />
        <CommandBarSeparator />
        <CommandBarButton Label="Settings" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

<img src={CommandBarSecondaryCommandsScreenshot} alt="" />

### Custom Content Area

The `Content` property places custom content at the leading edge of the bar, before the commands:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Back" Icon="{StaticResource BackIcon}" />
        <CommandBarButton Label="Forward" Icon="{StaticResource ForwardIcon}" />
    </CommandBar.PrimaryCommands>
    <CommandBar.Content>
        <TextBlock Text="Document Editor"
                   VerticalAlignment="Center"
                   Margin="8,0" />
    </CommandBar.Content>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save"  Click="OnSaveClick" />
        <AppBarButton Label="Undo"  Click="OnUndoClick" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

<img src={CommandBarContentScreenshot} alt="" />

### Label Positions

```xml
<!-- Default: label below icon -->
<CommandBar DefaultLabelPosition="Bottom">
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Add" Icon="{StaticResource AddIcon}" />
        <CommandBarButton Label="Edit" Icon="{StaticResource EditIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>

<!-- Label to the right of the icon -->
<CommandBar DefaultLabelPosition="Right">
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Add" Icon="{StaticResource AddIcon}" />
        <CommandBarButton Label="Edit" Icon="{StaticResource EditIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>

<!-- Icon only, no label -->
<CommandBar DefaultLabelPosition="Collapsed" OverflowButtonVisibility="Collapsed">
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Add" Icon="{StaticResource AddIcon}" />
        <CommandBarButton Label="Edit" Icon="{StaticResource EditIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

When using `Collapsed`, always add `ToolTip.Tip` to preserve accessibility.

<img src={CommandBarLabelBottomScreenshot} alt="" />

<img src={CommandBarLabelRightScreenshot} alt="" />

```xml
<CommandBar IsDynamicOverflowEnabled="True">
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Important" Icon="{StaticResource StarIcon}" DynamicOverflowOrder="2" />
        <CommandBarButton Label="Less Important" Icon="{StaticResource InfoIcon}" DynamicOverflowOrder="0" />
        <CommandBarButton Label="Moderate" Icon="{StaticResource EditIcon}" DynamicOverflowOrder="1" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

In this example, "Less Important" overflows first (order 0), then "Moderate" (order 1), and "Important" overflows last (order 2).

### Dynamic Overflow

Enable `IsDynamicOverflowEnabled` so commands automatically move to overflow when the bar is too narrow. Use `DynamicOverflowOrder` to control which commands move first. Higher values overflow first:

```xml
<!-- Always show the overflow button -->
<CommandBar OverflowButtonVisibility="Visible">
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Save" Icon="{StaticResource SaveIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>

<!-- Never show the overflow button -->
<CommandBar OverflowButtonVisibility="Collapsed">
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Save" Icon="{StaticResource SaveIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

### Overflow Button Visibility

```xml
<CommandBar IsSticky="True">
    <CommandBar.SecondaryCommands>
        <CommandBarToggleButton Label="Bold" Icon="{StaticResource BoldIcon}" />
        <CommandBarToggleButton Label="Italic" Icon="{StaticResource ItalicIcon}" />
        <CommandBarToggleButton Label="Underline" Icon="{StaticResource UnderlineIcon}" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

### Controlling overflow programmatically

<!-- Always visible -->
<CommandBar OverflowButtonVisibility="Visible" />

```xml
<CommandBar IsOpen="{Binding IsOverflowOpen}">
    <CommandBar.SecondaryCommands>
        <CommandBarButton Label="Option A" />
        <CommandBarButton Label="Option B" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

### Sticky Overflow Menu

Keep the overflow popup open after the user invokes a command:

```csharp
commandBar.IsSticky = true;
```

### Controlling Overflow Programmatically

```csharp
// Open the overflow popup
commandBar.IsOpen = true;

// Close it
commandBar.IsOpen = false;
```

```xml
<CommandBar Opened="OnCommandBarOpened" Closed="OnCommandBarClosed">
    <CommandBar.SecondaryCommands>
        <CommandBarButton Label="Help" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

### CommandBar in a ContentPage

Place the bar in `ContentPage.TopCommandBar` so it sits above the page content:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.EditorPage"
             Header="Editor">

    <ContentPage.TopCommandBar>
        <CommandBar>
            <CommandBar.PrimaryCommands>
                <CommandBarButton Label="Refresh" Icon="{StaticResource RefreshIcon}" />
                <CommandBarButton Label="Filter" Icon="{StaticResource FilterIcon}" />
            </CommandBar.PrimaryCommands>
            <CommandBar.SecondaryCommands>
                <AppBarButton Label="Find and Replace" Click="OnFindClick" />
                <AppBarButton Label="Export"           Click="OnExportClick" />
            </CommandBar.SecondaryCommands>
        </CommandBar>
    </ContentPage.TopCommandBar>

    <TextBox AcceptsReturn="True" Text="{Binding Content}" />

</ContentPage>
```

### CommandBar via NavigationPage Attached Property

When the page is inside a `NavigationPage`, use `NavigationPage.TopCommandBar` to place the bar inside the navigation bar area:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="Details">
    <NavigationPage.CommandBar>
        <CommandBar>
            <CommandBar.PrimaryCommands>
                <CommandBarButton Label="Share" Icon="{StaticResource ShareIcon}" />
                <CommandBarButton Label="Favorite" Icon="{StaticResource HeartIcon}" />
            </CommandBar.PrimaryCommands>
        </CommandBar>
    </NavigationPage.CommandBar>

</ContentPage>
```

### MVVM command binding

Bind `CommandBarButton` commands to your view model:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <CommandBarButton Label="Save"
                      Icon="{StaticResource SaveIcon}"
                      Command="{Binding SaveCommand}" />
        <CommandBarButton Label="Delete"
                      Icon="{StaticResource DeleteIcon}"
                      Command="{Binding DeleteCommand}"
                      IsEnabled="{Binding HasSelection}">
            <AppBarButton.Icon>
                <PathIcon Data="M19,4H15.5L14.5..." />
            </AppBarButton.Icon>
        </AppBarButton>
    </CommandBar.PrimaryCommands>
</CommandBar>
```

### Toggle Button State Handling

```csharp
private void OnBoldChanged(object? sender, RoutedEventArgs e)
{
    if (sender is AppBarToggleButton btn)
    {
        bool isBold = btn.IsChecked == true;
        ApplyBold(isBold);
    }
}
```

### Toggle button state handling

Use `CommandBarToggleButton` to create togglable options. Bind the `IsChecked` property to track state:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <CommandBarToggleButton Label="Bold"
                            Icon="{StaticResource BoldIcon}"
                            IsChecked="{Binding IsBold}" />
        <CommandBarToggleButton Label="Italic"
                            Icon="{StaticResource ItalicIcon}"
                            IsChecked="{Binding IsItalic}" />
        <CommandBarToggleButton Label="Underline"
                            Icon="{StaticResource UnderlineIcon}"
                            IsChecked="{Binding IsUnderline}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

<img src={CommandBarToggleButtonScreenshot} alt="CommandBar with toggle buttons" />

```csharp
[ObservableProperty]
private bool _isBold;

[ObservableProperty]
private bool _isItalic;

[ObservableProperty]
private bool _isUnderline;
```

## See also

- [API reference](/api/avalonia/controls/commandbar)
- [Source code](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CommandBar/CommandBar.cs)
