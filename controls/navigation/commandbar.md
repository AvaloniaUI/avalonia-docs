---
id: commandbar
title: CommandBar
---

import CommandBarLabelBottomScreenshot from '/img/controls/commandbar/commandbar-label-bottom.png';
import CommandBarLabelRightScreenshot from '/img/controls/commandbar/commandbar-label-right.png';
import CommandBarLabelCollapsedScreenshot from '/img/controls/commandbar/commandbar-label-collapsed.png';
import CommandBarSecondaryCommandsScreenshot from '/img/controls/commandbar/commandbar-secondary-commands.png';
import CommandBarContentScreenshot from '/img/controls/commandbar/commandbar-content.png';
import CommandBarToggleButtonScreenshot from '/img/controls/commandbar/commandbar-toggle-button.png';

A [`CommandBar`](/api/avalonia/controls/commandbar) is a toolbar-style control that displays a row of primary commands and an overflow menu for secondary commands. It is commonly used to surface the most relevant actions for the current context, while keeping less frequently used commands accessible through the overflow ("more") button.

Primary commands appear directly in the bar. When space is limited, commands can automatically move into the overflow area. Secondary commands always appear in the overflow menu.

## ICommandBarElement

Items placed in a `CommandBar` must implement the `ICommandBarElement` interface. Avalonia provides three built-in implementations:

- **`AppBarButton`**: A button with an icon, a label, or both. Supports commands via the `Command` property.
- **`AppBarToggleButton`**: A toggle button that maintains a checked/unchecked state. Useful for toggling options such as bold or italic formatting.
- **[`AppBarSeparator`](/api/avalonia/controls/appbarseparator)**: A visual divider used to group related commands within the bar or the overflow menu.

## CommandBar properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `PrimaryCommands` | `IList<ICommandBarElement>` | Empty | The collection of primary commands displayed directly in the bar. |
| `SecondaryCommands` | `IList<ICommandBarElement>` | Empty | The collection of secondary commands displayed in the overflow menu. |
| `Content` | `object` | `null` | Custom content displayed in the area between primary commands and the overflow button. |
| `DefaultLabelPosition` | `CommandBarDefaultLabelPosition` | `Bottom` | Controls where labels appear relative to icons for all commands in the bar. |
| `IsDynamicOverflowEnabled` | `bool` | `true` | When `true`, primary commands automatically move to the overflow menu if the bar is too narrow to display them all. |
| `OverflowButtonVisibility` | `CommandBarOverflowButtonVisibility` | `Auto` | Controls when the overflow ("more") button is visible. |
| `IsOpen` | `bool` | `false` | Whether the overflow menu is currently open. |
| `IsSticky` | `bool` | `false` | When `true`, the overflow menu stays open until the user explicitly closes it, rather than closing on light dismiss. |
| `HasSecondaryCommands` | `bool` | Read-only | Indicates whether the `SecondaryCommands` collection contains any items. |
| `IsOverflowButtonVisible` | `bool` | Read-only | Indicates whether the overflow button is currently visible, based on `OverflowButtonVisibility` and available commands. |
| `VisiblePrimaryCommands` | `IReadOnlyList<ICommandBarElement>` | Read-only | The subset of primary commands that are currently visible in the bar (not overflowed). |
| `OverflowItems` | `IReadOnlyList<ICommandBarElement>` | Read-only | The combined list of overflowed primary commands and secondary commands shown in the overflow menu. |

## CommandBar events

| Event | Description |
| --- | --- |
| `Opened` | Raised when the overflow menu is opened. |
| `Closed` | Raised when the overflow menu is closed. |
| `Opening` | Raised just before the overflow menu opens. |
| `Closing` | Raised just before the overflow menu closes. Supports cancellation. |

## DefaultLabelPosition values

| Value | Description |
| --- | --- |
| `Bottom` | Labels appear below the icon. This is the default. |
| `Right` | Labels appear to the right of the icon. |
| `Collapsed` | Labels are hidden; only icons are shown. |

## OverflowButtonVisibility values

| Value | Description |
| --- | --- |
| `Auto` | The overflow button is shown automatically when there are secondary commands or overflowed primary commands. |
| `Visible` | The overflow button is always shown. |
| `Collapsed` | The overflow button is always hidden. |

## AppBarButton properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `Icon` | `IconElement` | `null` | The icon displayed on the button. Typically a `PathIcon`, `SymbolIcon`, or `BitmapIcon`. |
| `Label` | `string` | `null` | The text label for the button. |
| `Command` | `ICommand` | `null` | The command to invoke when the button is clicked. |
| `CommandParameter` | `object` | `null` | The parameter passed to the command. |
| `IsInOverflow` | `bool` | Read-only | Indicates whether the button is currently displayed in the overflow menu. |
| `DynamicOverflowOrder` | `int` | `0` | Controls the order in which primary commands move to overflow when space is limited. Lower values overflow first. |

## AppBarToggleButton properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `Icon` | `IconElement` | `null` | The icon displayed on the toggle button. |
| `Label` | `string` | `null` | The text label for the toggle button. |
| `IsChecked` | `bool` | `false` | Whether the toggle button is currently in the checked state. |
| `Command` | `ICommand` | `null` | The command to invoke when the toggle button is clicked. |
| `CommandParameter` | `object` | `null` | The parameter passed to the command. |
| `IsInOverflow` | `bool` | Read-only | Indicates whether the toggle button is currently displayed in the overflow menu. |
| `DynamicOverflowOrder` | `int` | `0` | Controls the order in which this button moves to overflow. Lower values overflow first. |

## AppBarSeparator

`AppBarSeparator` renders a vertical line (in the primary command area) or a horizontal line (in the overflow menu) to visually group related commands. It has no configurable properties beyond those inherited from `ICommandBarElement`.

## Examples

### Basic CommandBar

A simple command bar with icon buttons:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Add" Icon="{StaticResource AddIcon}" />
        <AppBarButton Label="Edit" Icon="{StaticResource EditIcon}" />
        <AppBarButton Label="Delete" Icon="{StaticResource DeleteIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

### Primary and secondary commands with separators

Use `AppBarSeparator` to group commands, and place less common actions in `SecondaryCommands`:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Cut" Icon="{StaticResource CutIcon}" />
        <AppBarButton Label="Copy" Icon="{StaticResource CopyIcon}" />
        <AppBarButton Label="Paste" Icon="{StaticResource PasteIcon}" />
        <AppBarSeparator />
        <AppBarButton Label="Undo" Icon="{StaticResource UndoIcon}" />
        <AppBarButton Label="Redo" Icon="{StaticResource RedoIcon}" />
    </CommandBar.PrimaryCommands>
    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Select All" />
        <AppBarButton Label="Find and Replace" />
        <AppBarSeparator />
        <AppBarButton Label="Settings" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

<img src={CommandBarSecondaryCommandsScreenshot} alt="CommandBar with secondary commands in the overflow menu" />

### Custom content area

The `Content` property lets you place custom content between the primary commands and the overflow button:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Back" Icon="{StaticResource BackIcon}" />
        <AppBarButton Label="Forward" Icon="{StaticResource ForwardIcon}" />
    </CommandBar.PrimaryCommands>
    <CommandBar.Content>
        <TextBox Watermark="Search..." Width="200" Margin="8,0" />
    </CommandBar.Content>
</CommandBar>
```

<img src={CommandBarContentScreenshot} alt="CommandBar with custom content area" />

### Label positions

Control where labels appear relative to icons using the `DefaultLabelPosition` property.

**Bottom (default):**

```xml
<CommandBar DefaultLabelPosition="Bottom">
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Add" Icon="{StaticResource AddIcon}" />
        <AppBarButton Label="Edit" Icon="{StaticResource EditIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

<img src={CommandBarLabelBottomScreenshot} alt="CommandBar with labels below icons" />

**Right:**

```xml
<CommandBar DefaultLabelPosition="Right">
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Add" Icon="{StaticResource AddIcon}" />
        <AppBarButton Label="Edit" Icon="{StaticResource EditIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

<img src={CommandBarLabelRightScreenshot} alt="CommandBar with labels to the right of icons" />

**Collapsed:**

```xml
<CommandBar DefaultLabelPosition="Collapsed">
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Add" Icon="{StaticResource AddIcon}" />
        <AppBarButton Label="Edit" Icon="{StaticResource EditIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

<img src={CommandBarLabelCollapsedScreenshot} alt="CommandBar with labels hidden" />

### Dynamic overflow

When `IsDynamicOverflowEnabled` is `true` (the default), primary commands that do not fit in the available space automatically move into the overflow menu. Use `DynamicOverflowOrder` to control which commands overflow first:

```xml
<CommandBar IsDynamicOverflowEnabled="True">
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Important" Icon="{StaticResource StarIcon}" DynamicOverflowOrder="2" />
        <AppBarButton Label="Less Important" Icon="{StaticResource InfoIcon}" DynamicOverflowOrder="0" />
        <AppBarButton Label="Moderate" Icon="{StaticResource EditIcon}" DynamicOverflowOrder="1" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

In this example, "Less Important" overflows first (order 0), then "Moderate" (order 1), and "Important" overflows last (order 2).

### Overflow button visibility

Control when the overflow button appears:

```xml
<!-- Always show the overflow button -->
<CommandBar OverflowButtonVisibility="Visible">
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save" Icon="{StaticResource SaveIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>

<!-- Never show the overflow button -->
<CommandBar OverflowButtonVisibility="Collapsed">
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save" Icon="{StaticResource SaveIcon}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

### Sticky overflow

When `IsSticky` is `true`, the overflow menu remains open until the user explicitly dismisses it. This is useful when multiple selections or interactions within the overflow menu are expected:

```xml
<CommandBar IsSticky="True">
    <CommandBar.SecondaryCommands>
        <AppBarToggleButton Label="Bold" Icon="{StaticResource BoldIcon}" />
        <AppBarToggleButton Label="Italic" Icon="{StaticResource ItalicIcon}" />
        <AppBarToggleButton Label="Underline" Icon="{StaticResource UnderlineIcon}" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

### Controlling overflow programmatically

You can open or close the overflow menu from code by binding to the `IsOpen` property:

```xml
<CommandBar IsOpen="{Binding IsOverflowOpen}">
    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Option A" />
        <AppBarButton Label="Option B" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

```csharp
[ObservableProperty]
private bool _isOverflowOpen;

[RelayCommand]
private void ShowOverflow() => IsOverflowOpen = true;
```

### Responding to events

Handle the `Opened` and `Closed` events to react when the overflow menu state changes:

```csharp
public class MyPageViewModel
{
    public void OnCommandBarOpened(object sender, EventArgs e)
    {
        // The overflow menu was opened
    }

    public void OnCommandBarClosed(object sender, EventArgs e)
    {
        // The overflow menu was closed
    }
}
```

```xml
<CommandBar Opened="OnCommandBarOpened" Closed="OnCommandBarClosed">
    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Help" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

### CommandBar in ContentPage

Use the `TopCommandBar` or `BottomCommandBar` properties of `ContentPage` to attach a `CommandBar` to a page:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="My Page">
    <ContentPage.TopCommandBar>
        <CommandBar>
            <CommandBar.PrimaryCommands>
                <AppBarButton Label="Refresh" Icon="{StaticResource RefreshIcon}" />
                <AppBarButton Label="Filter" Icon="{StaticResource FilterIcon}" />
            </CommandBar.PrimaryCommands>
        </CommandBar>
    </ContentPage.TopCommandBar>

    <TextBlock Text="Page content here" Margin="16" />
</ContentPage>
```

### CommandBar via NavigationPage attached property

You can set a `CommandBar` on a page using the `NavigationPage` attached property, which places the bar within the navigation chrome:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="Details">
    <NavigationPage.CommandBar>
        <CommandBar>
            <CommandBar.PrimaryCommands>
                <AppBarButton Label="Share" Icon="{StaticResource ShareIcon}" />
                <AppBarButton Label="Favorite" Icon="{StaticResource HeartIcon}" />
            </CommandBar.PrimaryCommands>
        </CommandBar>
    </NavigationPage.CommandBar>

    <TextBlock Text="Detail content" Margin="16" />
</ContentPage>
```

### MVVM command binding

Bind `AppBarButton` commands to your view model:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save"
                      Icon="{StaticResource SaveIcon}"
                      Command="{Binding SaveCommand}" />
        <AppBarButton Label="Delete"
                      Icon="{StaticResource DeleteIcon}"
                      Command="{Binding DeleteCommand}"
                      CommandParameter="{Binding SelectedItem}" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

```csharp
[RelayCommand]
private async Task Save()
{
    await _dataService.SaveAsync();
}

[RelayCommand]
private async Task Delete(object item)
{
    await _dataService.DeleteAsync(item);
}
```

### Toggle button state handling

Use `AppBarToggleButton` to create togglable options. Bind the `IsChecked` property to track state:

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <AppBarToggleButton Label="Bold"
                            Icon="{StaticResource BoldIcon}"
                            IsChecked="{Binding IsBold}" />
        <AppBarToggleButton Label="Italic"
                            Icon="{StaticResource ItalicIcon}"
                            IsChecked="{Binding IsItalic}" />
        <AppBarToggleButton Label="Underline"
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

- [ContentPage](contentpage)
- [NavigationPage](navigationpage)
- [CommandBar API reference](/api/avalonia/controls/commandbar)
- [`CommandBar.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CommandBar/CommandBar.cs)
